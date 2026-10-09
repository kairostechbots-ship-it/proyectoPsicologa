import { randomUUID } from "node:crypto";
import {
  and,
  eq,
  gt,
  lt,
  ne,
} from "drizzle-orm";

import { getDb } from "../db";

import {
  appointments,
  content,
  patients,
  services,
} from "../db/schema";

import { ApiError } from "../api";
import { contactSchema } from "../validators";
import { validateSchedule } from "./schedule";
import { notifyAppointment } from "../email";

import {
  createGoogleAppointmentEvent,
  hasGoogleCalendarConflict,
} from "../google-calendar/calendar";

/* =========================================================
 * TYPES
 * =========================================================
 */

type Booking = {
  serviceId: string;
  startsAt: string;
  modality:
    | "presencial"
    | "online";

  patientId?: string;

  patient?: {
    name: string;
    phone: string;
    email?: string | null;
  };
};

/* =========================================================
 * CONTEXTO DE RESERVACIÓN
 * =========================================================
 */

export async function bookingContext(
  input: Pick<
    Booking,
    "serviceId" | "startsAt"
  >,
) {
  const db = getDb();

  const [[service], [setting]] =
    await Promise.all([
      db
        .select()
        .from(services)
        .where(
          and(
            eq(
              services.id,
              input.serviceId,
            ),
            eq(
              services.active,
              true,
            ),
          ),
        )
        .limit(1),

      db
        .select()
        .from(content)
        .where(
          eq(
            content.key,
            "contact",
          ),
        )
        .limit(1),
    ]);

  if (!service) {
    throw new ApiError(
      422,
      "Servicio no disponible.",
    );
  }

  if (!setting) {
    throw new ApiError(
      503,
      "Configura los horarios del consultorio.",
    );
  }

  const startsAt =
    new Date(input.startsAt);

  const endsAt =
    new Date(
      startsAt.getTime() +
        service.durationMinutes *
          60000,
    );

  validateSchedule(
    startsAt,
    endsAt,
    contactSchema.parse(
      setting.data,
    ),
  );

  return {
    service,
    startsAt,
    endsAt,
  };
}

/* =========================================================
 * CREAR CITA
 * =========================================================
 */

export async function createAppointment(
  input: Booking,
  actorId?: string,
) {
  const db = getDb();

  const {
    service,
    startsAt,
    endsAt,
  } = await bookingContext(input);

  /* =======================================================
   * 1. VALIDAR TRASLAPE EN POSTGRESQL
   * =======================================================
   */

  const [overlap] =
    await db
      .select({
        id: appointments.id,
      })
      .from(appointments)
      .where(
        and(
          ne(
            appointments.status,
            "cancelled",
          ),

          lt(
            appointments.startsAt,
            endsAt,
          ),

          gt(
            appointments.endsAt,
            startsAt,
          ),
        ),
      )
      .limit(1);

  if (overlap) {
    throw new ApiError(
      409,
      "El horario ya está ocupado.",
    );
  }

  /* =======================================================
   * 2. VALIDAR GOOGLE CALENDAR
   * =======================================================
   *
   * Esto permite que compromisos personales
   * registrados directamente en Google
   * también bloqueen la agenda.
   */

  let googleConflict = false;

  try {
    googleConflict =
      await hasGoogleCalendarConflict({
        startsAt,
        endsAt,
      });
  } catch (error) {
    /*
     * Decisión de disponibilidad:
     *
     * Si Google falla temporalmente,
     * mantenemos PostgreSQL como fuente
     * principal y permitimos continuar.
     *
     * No hacemos caer todo el sistema
     * únicamente porque Google no respondió.
     */
    console.error(
      "No se pudo validar disponibilidad en Google Calendar:",
      error,
    );
  }

  if (googleConflict) {
    throw new ApiError(
      409,
      "Ese horario está ocupado en la agenda.",
    );
  }

  /* =======================================================
   * 3. PREPARAR CITA Y PACIENTE
   * =======================================================
   */

  const id =
    randomUUID();

  const patientId =
    input.patientId ??
    randomUUID();

  /*
   * Si recibimos un paciente existente,
   * comprobamos que siga disponible.
   */
  if (input.patientId) {
    const [patient] =
      await db
        .select({
          id: patients.id,
        })
        .from(patients)
        .where(
          and(
            eq(
              patients.id,
              patientId,
            ),

            eq(
              patients.active,
              true,
            ),
          ),
        )
        .limit(1);

    if (!patient) {
      throw new ApiError(
        422,
        "Paciente no disponible.",
      );
    }
  }

  /* =======================================================
   * 4. CREAR CITA EN POSTGRESQL
   * =======================================================
   */

  const insert =
    db
      .insert(appointments)
      .values({
        id,

        patientId,

        serviceId:
          input.serviceId,

        startsAt,

        endsAt,

        modality:
          input.modality,

        createdBy:
          actorId,
      })
      .returning();

  let created;

  if (input.patient) {
    /*
     * Si se está creando también al
     * paciente, ambos inserts se ejecutan
     * juntos.
     */
    const [, rows] =
      await db.batch([
        db
          .insert(patients)
          .values({
            id: patientId,
            ...input.patient,
          }),

        insert,
      ]);

    created =
      rows[0];
  } else {
    [created] =
      await insert;
  }

  /* =======================================================
   * 5. SINCRONIZAR CON GOOGLE CALENDAR
   * =======================================================
   */

  try {
    /*
     * Si el paciente acaba de crearse,
     * ya tenemos su nombre.
     */
    let patientName =
      input.patient?.name;

    /*
     * Si seleccionamos un paciente
     * existente, consultamos su nombre.
     */
    if (!patientName) {
      const [patient] =
        await db
          .select({
            name:
              patients.name,
          })
          .from(patients)
          .where(
            eq(
              patients.id,
              patientId,
            ),
          )
          .limit(1);

      patientName =
        patient?.name;
    }

    /*
     * Creamos el evento en Google.
     */
    const googleEvent =
      await createGoogleAppointmentEvent({
        appointmentId:
          id,

        patientName:
          patientName ||
          "Paciente",

        serviceName:
          service.name,

        startsAt,

        endsAt,

        modality:
          input.modality,
      });

    /*
     * Guardamos el ID del evento de Google
     * dentro de nuestra cita.
     */
    if (googleEvent?.id) {
      const [updatedAppointment] =
        await db
          .update(
            appointments,
          )
          .set({
            googleEventId:
              googleEvent.id,
          })
          .where(
            eq(
              appointments.id,
              id,
            ),
          )
          .returning();

      if (
        updatedAppointment
      ) {
        created =
          updatedAppointment;
      }
    }
  } catch (error) {
    /*
     * Google es una sincronización
     * secundaria.
     *
     * Si falla después de crear la cita,
     * NO eliminamos la cita de PostgreSQL.
     */
    console.error(
      "No se pudo sincronizar la cita con Google Calendar:",
      error,
    );
  }

  /* =======================================================
   * 6. NOTIFICACIÓN
   * =======================================================
   */

  const emailNotification =
    await notifyAppointment({
      id,
      startsAt,
    });

  /* =======================================================
   * 7. RESPUESTA
   * =======================================================
   */

  return {
    appointment:
      created,

    emailNotification,
  };
}