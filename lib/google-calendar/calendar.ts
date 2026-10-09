import { eq } from "drizzle-orm";
import { google } from "googleapis";

import { getDb } from "@/lib/db";
import { googleCalendarConnections } from "@/lib/db/schema";

import { decryptToken } from "./crypto";
import { getGoogleOAuthClient } from "./oauth";

/* =========================================================
 * CONEXIÓN
 * =========================================================
 */

export async function getActiveGoogleConnection() {
  const [connection] = await getDb()
    .select()
    .from(googleCalendarConnections)
    .where(eq(googleCalendarConnections.active, true))
    .limit(1);

  return connection ?? null;
}

export async function getAuthorizedGoogleCalendar() {
  const connection =
    await getActiveGoogleConnection();

  if (!connection) {
    return null;
  }

  const oauth = getGoogleOAuthClient();

  oauth.setCredentials({
    refresh_token: decryptToken(
      connection.refreshToken,
    ),
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth,
  });

  return {
    calendar,
    connection,
  };
}

/* =========================================================
 * TYPES
 * =========================================================
 */

type GoogleAppointmentEventInput = {
  appointmentId: string;
  patientName: string;
  serviceName: string;
  startsAt: Date;
  endsAt: Date;
  modality: "presencial" | "online";
};

type GoogleCalendarConflictInput = {
  startsAt: Date;
  endsAt: Date;

  /*
   * Se utiliza al reprogramar.
   *
   * Evita que la cita detecte su propio
   * evento de Google como un conflicto.
   */
  excludeGoogleEventId?: string | null;
};

/* =========================================================
 * VALIDAR DISPONIBILIDAD
 * =========================================================
 */

export async function hasGoogleCalendarConflict(
  input: GoogleCalendarConflictInput,
) {
  const googleCalendar =
    await getAuthorizedGoogleCalendar();

  /*
   * Si todavía no hay una cuenta conectada,
   * Google Calendar no participa en la
   * validación.
   */
  if (!googleCalendar) {
    return false;
  }

  const { calendar, connection } =
    googleCalendar;

  /*
   * Consultamos los eventos que intersectan
   * exactamente con el rango de la cita.
   *
   * No usamos únicamente freebusy porque
   * necesitamos conocer el ID del evento
   * para poder excluir el evento de la propia
   * cita durante una reprogramación.
   */
  const response =
    await calendar.events.list({
      calendarId:
        connection.calendarId,

      timeMin:
        input.startsAt.toISOString(),

      timeMax:
        input.endsAt.toISOString(),

      singleEvents: true,

      orderBy: "startTime",

      showDeleted: false,

      maxResults: 50,
    });

  const events =
    response.data.items ?? [];

  for (const event of events) {
    /*
     * REPROGRAMACIÓN:
     *
     * Ignoramos el evento de Google que
     * pertenece a la cita que estamos
     * modificando.
     */
    if (
      input.excludeGoogleEventId &&
      event.id ===
        input.excludeGoogleEventId
    ) {
      continue;
    }

    /*
     * Un evento cancelado no debe bloquear.
     */
    if (
      event.status === "cancelled"
    ) {
      continue;
    }

    /*
     * Google permite marcar un evento como
     * "transparente".
     *
     * Ese tipo de evento significa que la
     * persona sigue disponible, por lo que
     * no bloqueamos el horario.
     */
    if (
      event.transparency ===
      "transparent"
    ) {
      continue;
    }

    /*
     * Eventos normales y eventos de día
     * completo devueltos dentro del rango
     * bloquean la disponibilidad.
     */
    return true;
  }

  return false;
}

/* =========================================================
 * CREAR EVENTO
 * =========================================================
 */

export async function createGoogleAppointmentEvent(
  input: GoogleAppointmentEventInput,
) {
  const googleCalendar =
    await getAuthorizedGoogleCalendar();

  if (!googleCalendar) {
    return null;
  }

  const { calendar, connection } =
    googleCalendar;

  const response =
    await calendar.events.insert({
      calendarId:
        connection.calendarId,

      requestBody: {
        summary:
          `${input.patientName} - ${input.serviceName}`,

        description:
          input.modality === "online"
            ? "Cita · Modalidad en línea"
            : "Cita · Modalidad presencial",

        start: {
          dateTime:
            input.startsAt.toISOString(),

          timeZone:
            "America/Mexico_City",
        },

        end: {
          dateTime:
            input.endsAt.toISOString(),

          timeZone:
            "America/Mexico_City",
        },

        extendedProperties: {
          private: {
            source:
              "erika-pilar-panel",

            appointmentId:
              input.appointmentId,
          },
        },
      },
    });

  return response.data;
}

/* =========================================================
 * ACTUALIZAR EVENTO
 * =========================================================
 */

export async function updateGoogleAppointmentEvent(
  googleEventId: string,
  input: GoogleAppointmentEventInput,
) {
  const googleCalendar =
    await getAuthorizedGoogleCalendar();

  if (!googleCalendar) {
    return false;
  }

  const { calendar, connection } =
    googleCalendar;

  try {
    await calendar.events.patch({
      calendarId:
        connection.calendarId,

      eventId:
        googleEventId,

      requestBody: {
        summary:
          `${input.patientName} - ${input.serviceName}`,

        description:
          input.modality === "online"
            ? "Cita · Modalidad en línea"
            : "Cita · Modalidad presencial",

        start: {
          dateTime:
            input.startsAt.toISOString(),

          timeZone:
            "America/Mexico_City",
        },

        end: {
          dateTime:
            input.endsAt.toISOString(),

          timeZone:
            "America/Mexico_City",
        },

        extendedProperties: {
          private: {
            source:
              "erika-pilar-panel",

            appointmentId:
              input.appointmentId,
          },
        },
      },
    });

    return true;
  } catch (error: any) {
    /*
     * Si el evento ya no existe en Google,
     * regresamos false.
     *
     * El endpoint podrá recrearlo.
     */
    if (
      error?.code === 404 ||
      error?.response?.status === 404
    ) {
      return false;
    }

    throw error;
  }
}

/* =========================================================
 * CANCELAR EVENTO
 * =========================================================
 */

export async function cancelGoogleAppointmentEvent(
  googleEventId: string,
) {
  const googleCalendar =
    await getAuthorizedGoogleCalendar();

  if (!googleCalendar) {
    return false;
  }

  const { calendar, connection } =
    googleCalendar;

  try {
    await calendar.events.delete({
      calendarId:
        connection.calendarId,

      eventId:
        googleEventId,
    });

    return true;
  } catch (error: any) {
    /*
     * Si Google dice que ya no existe,
     * para nosotros ya está cancelado.
     */
    if (
      error?.code === 404 ||
      error?.response?.status === 404
    ) {
      return true;
    }

    throw error;
  }
}