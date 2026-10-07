import { z } from "zod";
import { and, eq, gt, lt, ne } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { appointments, content, services } from "@/lib/db/schema";
import { success, handleApiError, ApiError } from "@/lib/api";
import { contactSchema, idSchema } from "@/lib/validators";
import { validateSchedule, TIME_ZONE } from "@/lib/appointments/schedule";
export async function GET(request: Request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams);
    const { date, serviceId } = z
      .object({ date: z.iso.date(), serviceId: idSchema })
      .parse(params);
    const db = getDb();
    const [[service], [setting]] = await Promise.all([
      db
        .select()
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.active, true)))
        .limit(1),
      db.select().from(content).where(eq(content.key, "contact")).limit(1),
    ]);
    if (!service) throw new ApiError(404, "Servicio no encontrado.");
    if (!setting) throw new ApiError(503, "Horarios no configurados.");
    const contact = contactSchema.parse(setting.data);
    // Consultorio de Jalisco: UTC-06:00, sin cambio estacional.
    const start = new Date(date + "T00:00:00-06:00"),
      end = new Date(start.getTime() + 86400000);
    const busy = await db
      .select({ startsAt: appointments.startsAt, endsAt: appointments.endsAt })
      .from(appointments)
      .where(
        and(
          ne(appointments.status, "cancelled"),
          lt(appointments.startsAt, end),
          gt(appointments.endsAt, start),
        ),
      );
    const slots: string[] = [];
    for (let minute = 0; minute < 1440; minute += 15) {
      const begins = new Date(start.getTime() + minute * 60000),
        finishes = new Date(begins.getTime() + service.durationMinutes * 60000);
      try {
        validateSchedule(begins, finishes, contact);
      } catch {
        continue;
      }
      if (!busy.some((b) => b.startsAt < finishes && b.endsAt > begins))
        slots.push(begins.toISOString());
    }
    return success({ date, serviceId, timeZone: TIME_ZONE, slots });
  } catch (e) {
    return handleApiError(e);
  }
}
