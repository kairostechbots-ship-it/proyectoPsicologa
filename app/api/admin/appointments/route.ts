import { and, desc, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { success, handleApiError, readJson, checkOrigin } from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { adminBookingSchema, idSchema, listSchema } from "@/lib/validators";
import { createAppointment } from "@/lib/appointments";
export async function GET(request: Request) {
  try {
    await requireUser(["admin", "receptionist"]);
    const p = listSchema
      .extend({
        patientId: idSchema.optional(),
        from: z.iso.datetime({ offset: true }).optional(),
        to: z.iso.datetime({ offset: true }).optional(),
      })
      .parse(Object.fromEntries(new URL(request.url).searchParams));
    return success(
      await getDb()
        .select()
        .from(appointments)
        .where(
          and(
            p.patientId ? eq(appointments.patientId, p.patientId) : undefined,
            p.from ? gte(appointments.startsAt, new Date(p.from)) : undefined,
            p.to ? lte(appointments.startsAt, new Date(p.to)) : undefined,
          ),
        )
        .orderBy(desc(appointments.startsAt))
        .limit(p.limit)
        .offset(p.offset),
    );
  } catch (e) {
    return handleApiError(e);
  }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const user = await requireUser(["admin", "receptionist"]);
    const input = adminBookingSchema.parse(await readJson(request));
    return success(await createAppointment(input, user.id), 201);
  } catch (e) {
    return handleApiError(e);
  }
}
