import { and, eq, gte, lt, ne, asc } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { appointments, patients } from "@/lib/db/schema";
import { success, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
export async function GET(request: Request) {
  try {
    await requireUser(["admin", "receptionist"]);
    const p = z
      .object({
        from: z.iso.datetime({ offset: true }),
        to: z.iso.datetime({ offset: true }),
      })
      .refine(
        (v) =>
          new Date(v.to) > new Date(v.from) &&
          new Date(v.to).getTime() - new Date(v.from).getTime() <=
            366 * 86400000,
        "Máximo un año.",
      )
      .parse(Object.fromEntries(new URL(request.url).searchParams));
    const rows = await getDb()
      .select({
        id: appointments.id,
        title: patients.name,
        start: appointments.startsAt,
        end: appointments.endsAt,
        type: appointments.modality,
      })
      .from(appointments)
      .innerJoin(patients, eq(appointments.patientId, patients.id))
      .where(
        and(
          ne(appointments.status, "cancelled"),
          gte(appointments.startsAt, new Date(p.from)),
          lt(appointments.startsAt, new Date(p.to)),
        ),
      )
      .orderBy(asc(appointments.startsAt))
      .limit(2000);
    return success(rows);
  } catch (e) {
    return handleApiError(e);
  }
}
