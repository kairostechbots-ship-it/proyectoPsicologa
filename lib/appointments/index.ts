import { randomUUID } from "node:crypto";
import { and, eq, gt, lt, ne } from "drizzle-orm";
import { getDb } from "../db";
import { appointments, content, patients, services } from "../db/schema";
import { ApiError } from "../api";
import { contactSchema } from "../validators";
import { validateSchedule } from "./schedule";
import { notifyAppointment } from "../email";
type Booking = {
  serviceId: string;
  startsAt: string;
  modality: "presencial" | "online";
  patientId?: string;
  patient?: { name: string; phone: string; email?: string | null };
};
export async function bookingContext(
  input: Pick<Booking, "serviceId" | "startsAt">,
) {
  const db = getDb();
  const [[service], [setting]] = await Promise.all([
    db
      .select()
      .from(services)
      .where(and(eq(services.id, input.serviceId), eq(services.active, true)))
      .limit(1),
    db.select().from(content).where(eq(content.key, "contact")).limit(1),
  ]);
  if (!service) throw new ApiError(422, "Servicio no disponible.");
  if (!setting)
    throw new ApiError(503, "Configura los horarios del consultorio.");
  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(startsAt.getTime() + service.durationMinutes * 60000);
  validateSchedule(startsAt, endsAt, contactSchema.parse(setting.data));
  return { service, startsAt, endsAt };
}
export async function createAppointment(input: Booking, actorId?: string) {
  const db = getDb();
  const { startsAt, endsAt } = await bookingContext(input);
  const [overlap] = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        ne(appointments.status, "cancelled"),
        lt(appointments.startsAt, endsAt),
        gt(appointments.endsAt, startsAt),
      ),
    )
    .limit(1);
  if (overlap) throw new ApiError(409, "El horario ya está ocupado.");
  const id = randomUUID();
  const patientId = input.patientId ?? randomUUID();
  if (input.patientId) {
    const [patient] = await db
      .select({ id: patients.id })
      .from(patients)
      .where(and(eq(patients.id, patientId), eq(patients.active, true)))
      .limit(1);
    if (!patient) throw new ApiError(422, "Paciente no disponible.");
  }
  const insert = db
    .insert(appointments)
    .values({
      id,
      patientId,
      serviceId: input.serviceId,
      startsAt,
      endsAt,
      modality: input.modality,
      createdBy: actorId,
    })
    .returning();
  let created;
  if (input.patient) {
    // Atomic: a conflicting appointment also rolls back the new patient.
    // Never attach public bookings to an existing patient based only on name/phone.
    const [, rows] = await db.batch([
      db.insert(patients).values({ id: patientId, ...input.patient }),
      insert,
    ]);
    created = rows[0];
  } else {
    [created] = await insert;
  }
  const emailNotification = await notifyAppointment({ id, startsAt });
  return { appointment: created, emailNotification };
}
