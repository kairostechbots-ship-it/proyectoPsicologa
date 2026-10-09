
'use client';

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Pencil,
  Plus,
  UserRound,
  Video,
} from 'lucide-react';

import type {
  Appointment,
  Patient,
  Service,
} from './PatientDialogs';

/* =========================================================
   PROPS
========================================================= */

interface PatientDetailProps {
  patient: Patient;
  appointments: Appointment[];
  services: Service[];
  busy: boolean;
  onBack: () => void;
  onNewAppointment: () => void;
  onReschedule: (appointment: Appointment) => void;
  onStatusChange: (
    appointmentId: string,
    status: string,
  ) => void;
}

/* =========================================================
   COMPONENTE
========================================================= */

export function PatientDetail({
  patient,
  appointments,
  services,
  busy,
  onBack,
  onNewAppointment,
  onReschedule,
  onStatusChange,
}: PatientDetailProps) {
  /* =======================================================
     CITAS ORDENADAS
  ======================================================= */

  const sortedAppointments = [...appointments].sort(
    (a, b) =>
      new Date(b.startsAt).getTime() -
      new Date(a.startsAt).getTime(),
  );

  const now = Date.now();

  /* =======================================================
     PRÓXIMA CITA
  ======================================================= */

  const nextAppointment =
    [...appointments]
      .filter(
        (appointment) =>
          new Date(appointment.startsAt).getTime() >= now &&
          appointment.status !== 'cancelled' &&
          appointment.status !== 'completed',
      )
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() -
          new Date(b.startsAt).getTime(),
      )[0] ?? null;

  /* =======================================================
     SERVICIO
  ======================================================= */

  function getServiceName(serviceId?: string | null) {
    if (!serviceId) return 'Servicio';

    return (
      services.find(
        (service) => service.id === serviceId,
      )?.name ?? 'Servicio'
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="space-y-6 pb-10">
      {/* ===================================================
          VOLVER
      =================================================== */}

      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex items-center gap-2
          text-[11px] font-semibold
          text-[#667A76] transition
          hover:text-[#0F3D4A]
        "
      >
        <ArrowLeft
          className="h-4 w-4"
          strokeWidth={1.6}
        />

        Volver a pacientes
      </button>

      {/* ===================================================
          DATOS DEL PACIENTE
      =================================================== */}

      <div
        className="
          overflow-hidden rounded-2xl
          border border-[#E3E9E4]
          bg-white
          shadow-[0_8px_30px_rgba(15,61,74,0.04)]
        "
      >
        <div
          className="
            flex flex-col gap-5 p-6
            md:flex-row md:items-center
            md:justify-between
          "
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}

            <div
              className="
                flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-2xl bg-[#EEF3EC]
                text-[#60775D]
              "
            >
              <UserRound
                className="h-6 w-6"
                strokeWidth={1.4}
              />
            </div>

            {/* Información */}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  className="
                    font-serif text-2xl
                    text-[#0F3D4A]
                    sm:text-3xl
                  "
                >
                  {patient.name}
                </h1>

                <span
                  className={`
                    rounded-full px-2.5 py-1
                    text-[9px] font-semibold

                    ${
                      patient.active
                        ? 'bg-[#EAF2E9] text-[#60765C]'
                        : 'bg-[#F1F2F2] text-[#7D8888]'
                    }
                  `}
                >
                  {patient.active
                    ? 'Activo'
                    : 'Inactivo'}
                </span>
              </div>

              <div
                className="
                  mt-3 flex flex-wrap
                  gap-x-5 gap-y-2
                "
              >
                <span className="text-[11px] text-[#71817E]">
                  {patient.phone}
                </span>

                {patient.email && (
                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[11px] text-[#71817E]
                    "
                  >
                    <Mail
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />

                    {patient.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Nueva cita */}

          <button
            type="button"
            onClick={onNewAppointment}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-[#0F3D4A] px-5
              text-[11px] font-semibold
              text-white transition
              hover:bg-[#174F5D]
            "
          >
            <Plus className="h-4 w-4" />

            Nueva cita
          </button>
        </div>
      </div>

      {/* ===================================================
          PRÓXIMA CITA
      =================================================== */}

      <section
        className="
          rounded-2xl border border-[#E3E9E4]
          bg-white p-5 sm:p-6
        "
      >
        {/* Header */}

        <div className="mb-5 flex items-center justify-between">
          <div>
            <p
              className="
                text-[9px] font-semibold uppercase
                tracking-[0.16em] text-[#A7B89A]
              "
            >
              Seguimiento
            </p>

            <h2
              className="
                mt-1 font-serif text-xl
                text-[#0F3D4A]
              "
            >
              Próxima cita
            </h2>
          </div>

          <CalendarDays
            className="h-5 w-5 text-[#A7B89A]"
            strokeWidth={1.4}
          />
        </div>

        {/* Cita */}

        {nextAppointment ? (
          <div
            className="
              rounded-xl border border-[#E6ECE7]
              bg-[#F8FAF7] p-5
            "
          >
            <div
              className="
                flex flex-col gap-4
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >
              {/* Información */}

              <div>
                <p
                  className="
                    text-[13px] font-semibold
                    capitalize text-[#31555B]
                  "
                >
                  {formatDate(nextAppointment.startsAt)}
                </p>

                <div className="mt-2 flex flex-wrap gap-4">
                  {/* Hora */}

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[11px] text-[#71817E]
                    "
                  >
                    <Clock3 className="h-3.5 w-3.5" />

                    {formatTime(nextAppointment.startsAt)}
                  </span>

                  {/* Modalidad */}

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[11px] text-[#71817E]
                    "
                  >
                    {nextAppointment.modality ===
                    'online' ? (
                      <Video className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}

                    {nextAppointment.modality ===
                    'online'
                      ? 'En línea'
                      : 'Presencial'}
                  </span>
                </div>

                {/* Servicio */}

                <p className="mt-3 text-[11px] text-[#71817E]">
                  {getServiceName(
                    nextAppointment.serviceId,
                  )}
                </p>
              </div>

              {/* Acciones */}

              <div
                className="
                  flex flex-wrap items-center
                  gap-3
                "
              >
                <StatusBadge
                  status={nextAppointment.status}
                />

                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    onReschedule(nextAppointment)
                  }
                  className="
                    inline-flex items-center
                    gap-1.5 rounded-xl
                    border border-[#DCE5DF]
                    bg-white px-3 py-2
                    text-[10px] font-semibold
                    text-[#536A6E]
                    transition

                    hover:border-[#A7B89A]
                    hover:text-[#0F3D4A]

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Pencil
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                  />

                  Reprogramar
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Sin próxima cita */

          <div
            className="
              rounded-xl border border-dashed
              border-[#DCE5DF] py-8 text-center
            "
          >
            <CalendarDays
              className="
                mx-auto h-7 w-7
                text-[#B3BFBB]
              "
              strokeWidth={1.3}
            />

            <p
              className="
                mt-3 text-[11px] font-semibold
                text-[#61736F]
              "
            >
              No hay una próxima cita programada.
            </p>

            <button
              type="button"
              onClick={onNewAppointment}
              className="
                mt-3 text-[10px] font-semibold
                text-[#0F3D4A] underline
                decoration-[#A7B89A]
                underline-offset-4
              "
            >
              Registrar una cita
            </button>
          </div>
        )}
      </section>

      {/* ===================================================
          HISTORIAL
      =================================================== */}

      <section
        className="
          overflow-hidden rounded-2xl
          border border-[#E3E9E4]
          bg-white
        "
      >
        {/* Header */}

        <div
          className="
            border-b border-[#EDF0ED]
            p-5 sm:p-6
          "
        >
          <p
            className="
              text-[9px] font-semibold uppercase
              tracking-[0.16em] text-[#A7B89A]
            "
          >
            Paciente
          </p>

          <h2
            className="
              mt-1 font-serif text-xl
              text-[#0F3D4A]
            "
          >
            Historial de citas
          </h2>
        </div>

        {/* Lista */}

        {sortedAppointments.length > 0 ? (
          <div className="divide-y divide-[#EDF0ED]">
            {sortedAppointments.map(
              (appointment) => (
                <div
                  key={appointment.id}
                  className="
                    flex flex-col gap-4
                    px-5 py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-6
                  "
                >
                  {/* Información */}

                  <div className="flex gap-4">
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl bg-[#F3F6F1]
                        text-[#6F826A]
                      "
                    >
                      <CalendarDays
                        className="h-4 w-4"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-[12px] font-semibold
                          capitalize text-[#36585D]
                        "
                      >
                        {formatDate(
                          appointment.startsAt,
                        )}
                      </p>

                      <div
                        className="
                          mt-1.5 flex flex-wrap
                          gap-x-4 gap-y-1
                        "
                      >
                        <span className="text-[10px] text-[#7C8B88]">
                          {formatTime(
                            appointment.startsAt,
                          )}
                        </span>

                        <span className="text-[10px] text-[#7C8B88]">
                          {getServiceName(
                            appointment.serviceId,
                          )}
                        </span>

                        {appointment.modality && (
                          <span
                            className="
                              text-[10px]
                              text-[#7C8B88]
                            "
                          >
                            {appointment.modality ===
                            'online'
                              ? 'En línea'
                              : 'Presencial'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}

                  <div
                    className="
                      flex flex-wrap
                      items-center gap-3
                    "
                  >
                    <StatusBadge
                      status={appointment.status}
                    />

                    {/* Reprogramar solamente citas activas */}

                    {appointment.status !==
                      'cancelled' &&
                      appointment.status !==
                        'completed' && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            onReschedule(
                              appointment,
                            )
                          }
                          className="
                            inline-flex items-center
                            gap-1.5 rounded-xl
                            border border-[#DCE5DF]
                            bg-white px-3 py-2
                            text-[10px] font-semibold
                            text-[#536A6E]
                            transition

                            hover:border-[#A7B89A]
                            hover:bg-[#F8FAF7]
                            hover:text-[#0F3D4A]

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          <Pencil
                            className="h-3.5 w-3.5"
                            strokeWidth={1.5}
                          />

                          Reprogramar
                        </button>
                      )}

                    {/* Estado */}

                    <select
                      value={appointment.status}
                      disabled={busy}
                      onChange={(event) =>
                        onStatusChange(
                          appointment.id,
                          event.target.value,
                        )
                      }
                      className="
                        rounded-xl border
                        border-[#DCE5DF]
                        bg-white px-3 py-2
                        text-[10px] font-medium
                        text-[#536A6E]
                        outline-none
                      "
                    >
                      <option value="pending">
                        Pendiente
                      </option>

                      <option value="confirmed">
                        Confirmada
                      </option>

                      <option value="cancelled">
                        Cancelada
                      </option>

                      <option value="completed">
                        Completada
                      </option>
                    </select>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          /* Sin historial */

          <div className="py-12 text-center">
            <CalendarDays
              className="
                mx-auto h-7 w-7
                text-[#B3BFBB]
              "
              strokeWidth={1.3}
            />

            <p
              className="
                mt-3 text-[11px]
                text-[#82918E]
              "
            >
              Todavía no hay citas registradas para este
              paciente.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const info = getAppointmentStatus(status);

  return (
    <span
      className={`
        inline-flex w-fit rounded-full
        px-2.5 py-1 text-[9px]
        font-semibold ${info.className}
      `}
    >
      {info.label}
    </span>
  );
}

/* =========================================================
   STATUS
========================================================= */

function getAppointmentStatus(status: string) {
  switch (status) {
    case 'confirmed':
      return {
        label: 'Confirmada',
        className:
          'bg-[#E8F2EA] text-[#58705B]',
      };

    case 'cancelled':
      return {
        label: 'Cancelada',
        className:
          'bg-[#FCECEC] text-[#A25555]',
      };

    case 'completed':
      return {
        label: 'Completada',
        className:
          'bg-[#EEF0F0] text-[#657376]',
      };

    default:
      return {
        label: 'Pendiente',
        className:
          'bg-[#FFF5DD] text-[#987426]',
      };
  }
}

/* =========================================================
   FORMATO DE FECHA
========================================================= */

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    'es-MX',
    {
      timeZone: 'America/Mexico_City',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  );
}

/* =========================================================
   FORMATO DE HORA
========================================================= */

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString(
    'es-MX',
    {
      timeZone: 'America/Mexico_City',
      hour: 'numeric',
      minute: '2-digit',
    },
  );
}