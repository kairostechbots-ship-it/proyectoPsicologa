'use client';

import type {
  FormEvent,
  ReactNode,
} from 'react';

import {
  AlertTriangle,
  CalendarClock,
  UserRound,
  X,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  active: boolean;
}

export interface Service {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  serviceId?: string | null;
  startsAt: string;
  status: string;
  modality?: string | null;
}

/* =========================================================
   ESTILOS
========================================================= */

const inputClass = `
  w-full rounded-xl
  border border-[#DCE5DF]
  bg-white
  px-4 py-3
  text-[13px]
  text-[#264A50]
  outline-none
  transition
  placeholder:text-[#9AA8A4]
  focus:border-[#A7B89A]
  focus:ring-4
  focus:ring-[#A7B89A]/10
`;

const labelClass = `
  mb-2 block
  text-[10px]
  font-semibold uppercase
  tracking-[0.14em]
  text-[#6E7A73]
`;

/* =========================================================
   NUEVO PACIENTE
========================================================= */

export function PatientDialog({
  busy,
  onClose,
  onSubmit,
}: {
  busy: boolean;

  onClose: () => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
}) {
  return (
    <Dialog
      title="Nuevo paciente"
      eyebrow="Pacientes"
      onClose={onClose}
    >
      <form
        onSubmit={onSubmit}
        className="p-6"
      >
        <fieldset
          disabled={busy}
          className="
            space-y-5
            disabled:opacity-60
          "
        >
          <div>
            <label
              htmlFor="patient-name"
              className={labelClass}
            >
              Nombre completo
            </label>

            <input
              id="patient-name"
              name="name"
              className={inputClass}
              placeholder="Nombre del paciente"
              required
              maxLength={160}
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="patient-phone"
              className={labelClass}
            >
              Teléfono
            </label>

            <input
              id="patient-phone"
              name="phone"
              className={inputClass}
              placeholder="33 0000 0000"
              required
            />
          </div>

          <div>
            <label
              htmlFor="patient-email"
              className={labelClass}
            >
              Correo electrónico
            </label>

            <input
              id="patient-email"
              name="email"
              type="email"
              className={inputClass}
              placeholder="Opcional"
            />
          </div>

          <DialogActions
            busy={busy}
            submitLabel="Guardar paciente"
            onClose={onClose}
          />
        </fieldset>
      </form>
    </Dialog>
  );
}

/* =========================================================
   NUEVA CITA
========================================================= */

export function AppointmentDialog({
  busy,
  error,
  patients,
  services,
  patientId,
  lockedPatient = false,
  onPatientChange,
  onClose,
  onSubmit,
}: {
  busy: boolean;

  error?: string;

  patients: Patient[];

  services: Service[];

  patientId: string;

  lockedPatient?: boolean;

  onPatientChange: (
    value: string,
  ) => void;

  onClose: () => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
}) {
  const patient =
    patients.find(
      (item) =>
        item.id === patientId,
    );

  return (
    <Dialog
      title="Nueva cita"
      eyebrow="Agenda"
      onClose={onClose}
    >
      <form
        onSubmit={onSubmit}
        className="p-6"
      >
        <fieldset
          disabled={busy}
          className="
            space-y-5
            disabled:opacity-60
          "
        >
          {/* PACIENTE */}

          <div>
            <label
              htmlFor="appointment-patient"
              className={labelClass}
            >
              Paciente
            </label>

            {lockedPatient &&
            patient ? (
              <>
                <input
                  type="hidden"
                  name="patientId"
                  value={patient.id}
                />

                <div
                  className="
                    flex items-center
                    gap-3
                    rounded-xl
                    border
                    border-[#DCE5DF]
                    bg-[#F8FAF7]
                    px-4 py-3
                  "
                >
                  <UserRound
                    className="
                      h-4 w-4
                      text-[#74877F]
                    "
                    strokeWidth={
                      1.5
                    }
                  />

                  <span
                    className="
                      text-[12px]
                      font-semibold
                      text-[#405F64]
                    "
                  >
                    {patient.name}
                  </span>
                </div>
              </>
            ) : (
              <select
                id="appointment-patient"
                name="patientId"
                className={
                  inputClass
                }
                value={patientId}
                onChange={(
                  event,
                ) =>
                  onPatientChange(
                    event.target
                      .value,
                  )
                }
                required
              >
                <option value="">
                  Selecciona un
                  paciente
                </option>

                {patients
                  .filter(
                    (item) =>
                      item.active,
                  )
                  .map(
                    (item) => (
                      <option
                        key={
                          item.id
                        }
                        value={
                          item.id
                        }
                      >
                        {
                          item.name
                        }{' '}
                        ·{' '}
                        {
                          item.phone
                        }
                      </option>
                    ),
                  )}
              </select>
            )}
          </div>

          {/* SERVICIO */}

          <div>
            <label
              htmlFor="appointment-service"
              className={labelClass}
            >
              Servicio
            </label>

            <select
              id="appointment-service"
              name="serviceId"
              className={
                inputClass
              }
              required
            >
              <option value="">
                Selecciona un
                servicio
              </option>

              {services.map(
                (service) => (
                  <option
                    key={
                      service.id
                    }
                    value={
                      service.id
                    }
                  >
                    {
                      service.name
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          {/* FECHA */}

          <div>
            <label
              htmlFor="appointment-date"
              className={labelClass}
            >
              Fecha y hora
            </label>

            <input
              id="appointment-date"
              name="startsAt"
              type="datetime-local"
              className={
                inputClass
              }
              required
            />
          </div>

          {/* MODALIDAD */}

          <div>
            <label
              htmlFor="appointment-modality"
              className={labelClass}
            >
              Modalidad
            </label>

            <select
              id="appointment-modality"
              name="modality"
              className={
                inputClass
              }
              defaultValue="presencial"
            >
              <option value="presencial">
                Presencial
              </option>

              <option value="online">
                En línea
              </option>
            </select>
          </div>

          {/* ERROR DENTRO DEL MODAL */}

          {error && (
            <DialogError>
              {error}
            </DialogError>
          )}

          <DialogActions
            busy={busy}
            submitLabel="Guardar cita"
            onClose={onClose}
          />
        </fieldset>
      </form>
    </Dialog>
  );
}

/* =========================================================
   REPROGRAMAR CITA
========================================================= */

export function RescheduleAppointmentDialog({
  busy,
  error,
  appointment,
  services,
  onClose,
  onSubmit,
}: {
  busy: boolean;

  error?: string;

  appointment: Appointment;

  services: Service[];

  onClose: () => void;

  onSubmit: (
    event: FormEvent<HTMLFormElement>,
  ) => void;
}) {
  return (
    <Dialog
      title="Reprogramar cita"
      eyebrow="Agenda"
      onClose={onClose}
    >
      <form
        onSubmit={onSubmit}
        className="p-6"
      >
        <fieldset
          disabled={busy}
          className="
            space-y-5
            disabled:opacity-60
          "
        >
          {/* SERVICIO */}

          <div>
            <label
              htmlFor="reschedule-service"
              className={labelClass}
            >
              Servicio
            </label>

            <select
              id="reschedule-service"
              name="serviceId"
              className={
                inputClass
              }
              defaultValue={
                appointment.serviceId ??
                ''
              }
              required
            >
              <option value="">
                Selecciona un
                servicio
              </option>

              {services.map(
                (service) => (
                  <option
                    key={
                      service.id
                    }
                    value={
                      service.id
                    }
                  >
                    {
                      service.name
                    }
                  </option>
                ),
              )}
            </select>
          </div>

          {/* FECHA */}

          <div>
            <label
              htmlFor="reschedule-date"
              className={labelClass}
            >
              Nueva fecha y hora
            </label>

            <input
              id="reschedule-date"
              name="startsAt"
              type="datetime-local"
              className={
                inputClass
              }
              defaultValue={toLocalDateTimeInput(
                appointment.startsAt,
              )}
              required
            />

            <p
              className="
                mt-2
                text-[10px]
                leading-5
                text-[#8A9995]
              "
            >
              La duración se
              ajustará
              automáticamente de
              acuerdo con el
              servicio
              seleccionado.
            </p>
          </div>

          {/* MODALIDAD */}

          <div>
            <label
              htmlFor="reschedule-modality"
              className={labelClass}
            >
              Modalidad
            </label>

            <select
              id="reschedule-modality"
              name="modality"
              className={
                inputClass
              }
              defaultValue={
                appointment.modality ===
                'online'
                  ? 'online'
                  : 'presencial'
              }
            >
              <option value="presencial">
                Presencial
              </option>

              <option value="online">
                En línea
              </option>
            </select>
          </div>

          {/* INFORMACIÓN */}

          <div
            className="
              rounded-xl
              border
              border-[#E5EBE6]
              bg-[#F8FAF7]
              px-4 py-3
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  mt-0.5
                  flex h-8 w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EEF3EC]
                  text-[#667B61]
                "
              >
                <CalendarClock
                  className="h-4 w-4"
                  strokeWidth={
                    1.5
                  }
                />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#405F64]
                  "
                >
                  Reprogramación
                  de cita
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-5
                    text-[#7B8A87]
                  "
                >
                  Al guardar, la
                  nueva fecha
                  también se
                  actualizará en
                  la agenda
                  vinculada con
                  Google Calendar.
                </p>
              </div>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <DialogError>
              {error}
            </DialogError>
          )}

          <DialogActions
            busy={busy}
            submitLabel="Guardar cambios"
            onClose={onClose}
          />
        </fieldset>
      </form>
    </Dialog>
  );
}

/* =========================================================
   DIALOG BASE
========================================================= */

function Dialog({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;

  eyebrow: string;

  onClose: () => void;

  children: ReactNode;
}) {
  return (
    <div
      className="
        fixed inset-0
        z-[200]
        flex items-center
        justify-center
        bg-[#071E24]/40
        p-4
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          max-h-[calc(100vh-2rem)]
          w-full max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            sticky top-0
            z-10
            flex items-center
            justify-between
            bg-[#0F3D4A]
            px-6 py-5
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#D8BD66]
              "
            >
              {eyebrow}
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-xl
                text-white
              "
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="
              flex h-9 w-9
              items-center
              justify-center
              rounded-full
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* =========================================================
   ALERTA DENTRO DEL MODAL
========================================================= */

function DialogError({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="
        rounded-xl
        border border-red-200
        bg-red-50
        px-4 py-3
      "
    >
      <div
        className="
          flex items-start
          gap-3
        "
      >
        <div
          className="
            mt-0.5
            flex h-8 w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-red-100
            text-red-600
          "
        >
          <AlertTriangle
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[11px]
              font-semibold
              text-red-700
            "
          >
            No se pudo guardar
          </p>

          <p
            className="
              mt-1
              text-[11px]
              leading-5
              text-red-600
            "
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACCIONES
========================================================= */

function DialogActions({
  busy,
  submitLabel,
  onClose,
}: {
  busy: boolean;

  submitLabel: string;

  onClose: () => void;
}) {
  return (
    <div
      className="
        flex justify-end
        gap-3
        border-t
        border-[#EDF0ED]
        pt-5
      "
    >
      <button
        type="button"
        onClick={onClose}
        disabled={busy}
        className="
          h-10
          rounded-xl
          border
          border-[#DCE5DF]
          px-4
          text-[11px]
          font-semibold
          text-[#60716D]
          transition
          hover:bg-[#F8FAF7]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Cancelar
      </button>

      <button
        type="submit"
        disabled={busy}
        className="
          h-10
          rounded-xl
          bg-[#0F3D4A]
          px-5
          text-[11px]
          font-semibold
          text-white
          transition
          hover:bg-[#174F5D]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {busy
          ? 'Guardando...'
          : submitLabel}
      </button>
    </div>
  );
}

/* =========================================================
   DATETIME LOCAL
========================================================= */

function toLocalDateTimeInput(
  value: string,
) {
  const date =
    new Date(value);

  const formatter =
    new Intl.DateTimeFormat(
      'en-CA',
      {
        timeZone:
          'America/Mexico_City',

        year: 'numeric',

        month: '2-digit',

        day: '2-digit',

        hour: '2-digit',

        minute: '2-digit',

        hourCycle: 'h23',
      },
    );

  const parts =
    formatter.formatToParts(
      date,
    );

  const getPart = (
    type: Intl.DateTimeFormatPartTypes,
  ) =>
    parts.find(
      (part) =>
        part.type === type,
    )?.value ?? '';

  const year =
    getPart('year');

  const month =
    getPart('month');

  const day =
    getPart('day');

  const hour =
    getPart('hour');

  const minute =
    getPart('minute');

  return `${year}-${month}-${day}T${hour}:${minute}`;
}