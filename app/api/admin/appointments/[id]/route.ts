import {
  and,
  eq,
  gt,
  lt,
  ne,
} from "drizzle-orm";

import { getDb } from "@/lib/db";

import {
  appointments,
  patients,
} from "@/lib/db/schema";

import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";

import { requireUser } from "@/lib/auth/guard";

import {
  appointmentPatchSchema,
  idSchema,
} from "@/lib/validators";

import {
  bookingContext,
} from "@/lib/appointments";

import {
  cancelGoogleAppointmentEvent,
  createGoogleAppointmentEvent,
  hasGoogleCalendarConflict,
  updateGoogleAppointmentEvent,
} from "@/lib/google-calendar/calendar";

/* =========================================================
 * PATCH
 * =========================================================
 */

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    /* =====================================================
     * SEGURIDAD
     * =====================================================
     */

    checkOrigin(request);

    await requireUser([
      "admin",
      "receptionist",
    ]);

    const id = idSchema.parse(
      (await params).id,
    );

    const input =
      appointmentPatchSchema.parse(
        await readJson(request),
      );

    const db = getDb();

    /* =====================================================
     * 1. OBTENER CITA ACTUAL
     * =====================================================
     */

    const [current] =
      await db
        .select()
        .from(appointments)
        .where(
          eq(
            appointments.id,
            id,
          ),
        )
        .limit(1);

    if (!current) {
      throw new ApiError(
        404,
        "Cita no encontrada.",
      );
    }

    /* =====================================================
     * 2. CALCULAR NUEVOS VALORES
     * =====================================================
     */

    const nextServiceId =
      input.serviceId ??
      current.serviceId;

    /*
     * El validator recibe startsAt como
     * string ISO, pero Drizzle trabaja
     * con Date.
     */
    const nextStartsAt =
      input.startsAt
        ? new Date(
            input.startsAt,
          )
        : current.startsAt;

    const nextModality:
      | "presencial"
      | "online" =
      input.modality ??
      (
        current.modality ===
        "online"
          ? "online"
          : "presencial"
      );

    const nextStatus =
      input.status ??
      current.status;

    /* =====================================================
     * 3. VALIDAR SERVICIO Y HORARIO
     * =====================================================
     *
     * También obtenemos el nuevo endsAt
     * de acuerdo con la duración actual
     * del servicio.
     */

    const {
      service,
      startsAt,
      endsAt,
    } =
      await bookingContext({
        serviceId:
          nextServiceId,

        startsAt:
          nextStartsAt.toISOString(),
      });

    /* =====================================================
     * 4. VALIDAR DISPONIBILIDAD
     * =====================================================
     *
     * Si estamos cancelando no necesitamos
     * validar disponibilidad.
     */

    if (
      nextStatus !==
      "cancelled"
    ) {
      /* ===================================================
       * 4.1 POSTGRESQL
       * ===================================================
       *
       * Buscamos otra cita que intersecte
       * con el horario.
       *
       * Excluimos esta misma cita.
       */

      const [overlap] =
        await db
          .select({
            id:
              appointments.id,
          })
          .from(
            appointments,
          )
          .where(
            and(
              ne(
                appointments.id,
                id,
              ),

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

      /* ===================================================
       * 4.2 GOOGLE CALENDAR
       * ===================================================
       *
       * También comprobamos compromisos
       * creados directamente en Google.
       *
       * MUY IMPORTANTE:
       *
       * excluimos current.googleEventId
       * para que la cita no detecte su
       * propio evento como conflicto.
       */

      let googleConflict =
        false;

      try {
        googleConflict =
          await hasGoogleCalendarConflict({
            startsAt,
            endsAt,

            excludeGoogleEventId:
              current.googleEventId,
          });
      } catch (error) {
        /*
         * PostgreSQL continúa siendo la
         * fuente principal.
         *
         * Si Google tiene una falla
         * temporal, no dejamos inutilizable
         * todo el módulo de citas.
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
    }

    /* =====================================================
     * 5. ACTUALIZAR POSTGRESQL
     * =====================================================
     */

    const [data] =
      await db
        .update(
          appointments,
        )
        .set({
          status:
            nextStatus,

          serviceId:
            nextServiceId,

          startsAt,

          endsAt,

          modality:
            nextModality,
        })
        .where(
          eq(
            appointments.id,
            id,
          ),
        )
        .returning();

    /* =====================================================
     * 6. CANCELACIÓN
     * =====================================================
     */

    if (
      nextStatus ===
      "cancelled"
    ) {
      /*
       * Si existe un evento de Google,
       * intentamos eliminarlo.
       */
      if (
        current.googleEventId
      ) {
        try {
          const cancelled =
            await cancelGoogleAppointmentEvent(
              current.googleEventId,
            );

          /*
           * Si Google confirma que el evento
           * fue eliminado —o ya no existía—
           * quitamos la referencia local.
           */
          if (cancelled) {
            const [updated] =
              await db
                .update(
                  appointments,
                )
                .set({
                  googleEventId:
                    null,
                })
                .where(
                  eq(
                    appointments.id,
                    id,
                  ),
                )
                .returning();

            return success(
              updated ??
                data,
            );
          }
        } catch (error) {
          /*
           * La cancelación en PostgreSQL
           * ya ocurrió.
           *
           * Un fallo de Google no debe
           * revertirla.
           */
          console.error(
            "La cita fue cancelada en el sistema, pero no se pudo eliminar de Google Calendar:",
            error,
          );
        }
      }

      return success(data);
    }

    /* =====================================================
     * 7. OBTENER PACIENTE
     * =====================================================
     */

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
            current.patientId,
          ),
        )
        .limit(1);

    /* =====================================================
     * 8. SINCRONIZAR CON GOOGLE
     * =====================================================
     */

    try {
      /*
       * ===================================================
       * CASO A
       * ===================================================
       *
       * La cita ya tiene un evento asociado
       * en Google Calendar.
       */

      if (
        current.googleEventId
      ) {
        const updated =
          await updateGoogleAppointmentEvent(
            current.googleEventId,
            {
              appointmentId:
                id,

              patientName:
                patient?.name ??
                "Paciente",

              serviceName:
                service.name,

              startsAt,

              endsAt,

              modality:
                nextModality,
            },
          );

        /*
         * El ID existía en nuestra BD,
         * pero Google respondió 404.
         *
         * Eso puede ocurrir si Erika eliminó
         * manualmente el evento desde Google.
         *
         * Lo recreamos.
         */

        if (!updated) {
          const googleEvent =
            await createGoogleAppointmentEvent(
              {
                appointmentId:
                  id,

                patientName:
                  patient?.name ??
                  "Paciente",

                serviceName:
                  service.name,

                startsAt,

                endsAt,

                modality:
                  nextModality,
              },
            );

          /*
           * Guardamos el nuevo ID.
           */
          if (
            googleEvent?.id
          ) {
            const [
              updatedAppointment,
            ] =
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

            return success(
              updatedAppointment ??
                data,
            );
          }
        }
      }

      /*
       * ===================================================
       * CASO B
       * ===================================================
       *
       * La cita existe en PostgreSQL pero
       * todavía no tiene evento de Google.
       *
       * Esto también recupera citas creadas
       * mientras Google estaba desconectado.
       */

      else {
        const googleEvent =
          await createGoogleAppointmentEvent(
            {
              appointmentId:
                id,

              patientName:
                patient?.name ??
                "Paciente",

              serviceName:
                service.name,

              startsAt,

              endsAt,

              modality:
                nextModality,
            },
          );

        if (
          googleEvent?.id
        ) {
          const [
            updatedAppointment,
          ] =
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

          return success(
            updatedAppointment ??
              data,
          );
        }
      }
    } catch (error) {
      /*
       * Google Calendar es secundario.
       *
       * La modificación ya quedó guardada
       * en PostgreSQL.
       *
       * Si Google falla en este punto,
       * conservamos la modificación local.
       */
      console.error(
        "La cita fue actualizada en el sistema, pero no se pudo sincronizar con Google Calendar:",
        error,
      );
    }

    /* =====================================================
     * 9. RESPUESTA
     * =====================================================
     */

    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}