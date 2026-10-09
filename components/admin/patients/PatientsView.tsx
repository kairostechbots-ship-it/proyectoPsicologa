'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import Link from 'next/link';

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Plus,
  Search,
  UserRound,
  Users,
} from 'lucide-react';

import { apiFetch } from '@/lib/http';

import { PatientDetail } from './PatientDetail';

import {
  AppointmentDialog,
  PatientDialog,
  RescheduleAppointmentDialog,
  type Appointment,
  type Patient,
  type Service,
} from './PatientDialogs';

const PAGE_SIZE = 100;

const inputClass = `
  w-full rounded-xl border border-[#DCE5DF]
  bg-white px-4 py-3
  text-[13px] text-[#264A50]
  outline-none transition
  placeholder:text-[#9AA8A4]
  focus:border-[#A7B89A]
  focus:ring-4 focus:ring-[#A7B89A]/10
`;

export function PatientsView() {
  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [services, setServices] =
    useState<Service[]>([]);

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [
    selectedPatientId,
    setSelectedPatientId,
  ] = useState('');

  const [query, setQuery] =
    useState('');

  const [page, setPage] =
    useState(0);

  const [
    loadingPatients,
    setLoadingPatients,
  ] = useState(true);

  const [
    loadingAppointments,
    setLoadingAppointments,
  ] = useState(false);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState('');

  const [
    dialogError,
    setDialogError,
  ] = useState('');

  const [
    patientDialogOpen,
    setPatientDialogOpen,
  ] = useState(false);

  const [
    appointmentDialogOpen,
    setAppointmentDialogOpen,
  ] = useState(false);

  const [
    appointmentPatientId,
    setAppointmentPatientId,
  ] = useState('');

  const [
    rescheduleAppointment,
    setRescheduleAppointment,
  ] = useState<Appointment | null>(
    null,
  );

  /* =========================================================
     CARGAR PACIENTES
  ========================================================= */

  const loadPatients =
    useCallback(async () => {
      setLoadingPatients(true);

      try {
        const patientList =
          await apiFetch<Patient[]>(
            `/api/admin/patients?limit=${PAGE_SIZE}&offset=${
              page * PAGE_SIZE
            }`,
          );

        setPatients(patientList);
        setError('');

        return patientList;
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : 'No se pudieron cargar los pacientes.',
        );

        return [];
      } finally {
        setLoadingPatients(false);
      }
    }, [page]);

  /* =========================================================
     CARGAR CITAS DE UN PACIENTE
  ========================================================= */

  const loadPatientAppointments =
    useCallback(
      async (patientId: string) => {
        if (!patientId) {
          setAppointments([]);

          return [];
        }

        setLoadingAppointments(true);

        try {
          const appointmentList =
            await apiFetch<
              Appointment[]
            >(
              `/api/admin/appointments?limit=100&patientId=${encodeURIComponent(
                patientId,
              )}`,
            );

          setAppointments(
            appointmentList,
          );

          return appointmentList;
        } finally {
          setLoadingAppointments(
            false,
          );
        }
      },
      [],
    );

  /* =========================================================
     CARGA INICIAL DE PACIENTES
  ========================================================= */

  useEffect(() => {
    void loadPatients();
  }, [loadPatients]);

  /* =========================================================
     SERVICIOS

     Se cargan aparte.
     NO bloquean la carga de pacientes.
  ========================================================= */

  useEffect(() => {
    let active = true;

    apiFetch<Service[]>(
      '/api/services',
    )
      .then((serviceList) => {
        if (!active) return;

        setServices(serviceList);
      })
      .catch((e) => {
        console.error(
          'No se pudieron cargar los servicios:',
          e,
        );
      });

    return () => {
      active = false;
    };
  }, []);

  /* =========================================================
     CITAS DEL PACIENTE

     Ya NO cargamos todas las citas
     cuando entramos al módulo.

     Solo cuando abrimos un paciente.
  ========================================================= */

  useEffect(() => {
    if (!selectedPatientId) {
      setAppointments([]);

      return;
    }

    void loadPatientAppointments(
      selectedPatientId,
    ).catch((e) => {
      setError(
        e instanceof Error
          ? e.message
          : 'No se pudieron cargar las citas del paciente.',
      );
    });
  }, [
    selectedPatientId,
    loadPatientAppointments,
  ]);

  /* =========================================================
     OPERACIONES
  ========================================================= */

  async function runAction(
    action: () => Promise<unknown>,
    options?: {
      errorTarget?:
        | 'page'
        | 'dialog';

      refreshPatients?: boolean;

      refreshAppointments?: boolean;
    },
  ) {
    if (busy) return false;

    const errorTarget =
      options?.errorTarget ??
      'page';

    setBusy(true);

    if (
      errorTarget === 'dialog'
    ) {
      setDialogError('');
    } else {
      setError('');
    }

    try {
      await action();

      const refreshes: Promise<unknown>[] =
        [];

      if (
        options?.refreshPatients
      ) {
        refreshes.push(
          loadPatients(),
        );
      }

      if (
        options?.refreshAppointments &&
        selectedPatientId
      ) {
        refreshes.push(
          loadPatientAppointments(
            selectedPatientId,
          ),
        );
      }

      if (refreshes.length) {
        await Promise.all(
          refreshes,
        );
      }

      window.dispatchEvent(
        new Event(
          'appointments_updated',
        ),
      );

      return true;
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : 'No se pudo guardar la información.';

      if (
        errorTarget === 'dialog'
      ) {
        setDialogError(message);
      } else {
        setError(message);
      }

      return false;
    } finally {
      setBusy(false);
    }
  }

  /* =========================================================
     CREAR PACIENTE
  ========================================================= */

  function createPatient(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const data =
      new FormData(form);

    void runAction(
      async () => {
        await apiFetch(
          '/api/admin/patients',
          {
            method: 'POST',

            body: JSON.stringify({
              name:
                data.get('name'),

              phone:
                data.get('phone'),

              email:
                data.get('email'),
            }),
          },
        );

        form.reset();

        setPatientDialogOpen(
          false,
        );
      },
      {
        refreshPatients: true,
      },
    );
  }

  /* =========================================================
     CREAR CITA
  ========================================================= */

  function createAppointment(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const data =
      new FormData(form);

    const patientId =
      selectedPatientId ||
      appointmentPatientId ||
      String(
        data.get('patientId') ||
          '',
      );

    const serviceId =
      String(
        data.get('serviceId') ||
          '',
      );

    const startsAt =
      String(
        data.get('startsAt') ||
          '',
      );

    const modality =
      String(
        data.get('modality') ||
          '',
      );

    if (!patientId) {
      setDialogError(
        'Selecciona un paciente.',
      );

      return;
    }

    if (!serviceId) {
      setDialogError(
        'Selecciona un servicio.',
      );

      return;
    }

    if (!startsAt) {
      setDialogError(
        'Selecciona la fecha y hora.',
      );

      return;
    }

    if (
      modality !==
        'presencial' &&
      modality !== 'online'
    ) {
      setDialogError(
        'Selecciona una modalidad válida.',
      );

      return;
    }

    void runAction(
      async () => {
        await apiFetch(
          '/api/admin/appointments',
          {
            method: 'POST',

            body: JSON.stringify({
              patientId,
              serviceId,

              startsAt:
                `${startsAt}:00-06:00`,

              modality,
            }),
          },
        );

        form.reset();

        setAppointmentPatientId(
          '',
        );

        setAppointmentDialogOpen(
          false,
        );

        setDialogError('');
      },
      {
        errorTarget: 'dialog',

        refreshAppointments:
          Boolean(
            selectedPatientId,
          ),
      },
    );
  }

  /* =========================================================
     CAMBIAR ESTADO DE CITA
  ========================================================= */

  function updateAppointmentStatus(
    appointmentId: string,
    status: string,
  ) {
    void runAction(
      () =>
        apiFetch(
          `/api/admin/appointments/${appointmentId}`,
          {
            method: 'PATCH',

            body: JSON.stringify({
              status,
            }),
          },
        ),
      {
        refreshAppointments: true,
      },
    );
  }

  /* =========================================================
     REPROGRAMAR CITA
  ========================================================= */

  function rescheduleAppointmentSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      !rescheduleAppointment
    ) {
      return;
    }

    const data =
      new FormData(
        event.currentTarget,
      );

    const startsAt =
      String(
        data.get('startsAt') ||
          '',
      );

    const serviceId =
      String(
        data.get('serviceId') ||
          '',
      );

    const modality =
      String(
        data.get('modality') ||
          '',
      );

    if (!serviceId) {
      setDialogError(
        'Selecciona un servicio.',
      );

      return;
    }

    if (!startsAt) {
      setDialogError(
        'Selecciona la nueva fecha y hora.',
      );

      return;
    }

    if (
      modality !==
        'presencial' &&
      modality !== 'online'
    ) {
      setDialogError(
        'Selecciona una modalidad válida.',
      );

      return;
    }

    const appointmentId =
      rescheduleAppointment.id;

    void runAction(
      async () => {
        await apiFetch(
          `/api/admin/appointments/${appointmentId}`,
          {
            method: 'PATCH',

            body: JSON.stringify({
              serviceId,

              startsAt:
                `${startsAt}:00-06:00`,

              modality,
            }),
          },
        );

        setRescheduleAppointment(
          null,
        );

        setDialogError('');
      },
      {
        errorTarget: 'dialog',

        refreshAppointments: true,
      },
    );
  }

  /* =========================================================
     DATOS CALCULADOS
  ========================================================= */

  const filteredPatients =
    useMemo(() => {
      const search =
        query
          .trim()
          .toLowerCase();

      if (!search) {
        return patients;
      }

      return patients.filter(
        (patient) => {
          return (
            patient.name
              .toLowerCase()
              .includes(search) ||
            patient.phone
              .toLowerCase()
              .includes(search) ||
            patient.email
              ?.toLowerCase()
              .includes(search)
          );
        },
      );
    }, [patients, query]);

  const selectedPatient =
    patients.find(
      (patient) =>
        patient.id ===
        selectedPatientId,
    ) ?? null;

  const selectedPatientAppointments =
    useMemo(() => {
      if (!selectedPatientId) {
        return [];
      }

      return appointments.filter(
        (appointment) =>
          appointment.patientId ===
          selectedPatientId,
      );
    }, [
      appointments,
      selectedPatientId,
    ]);

  const activePatients =
    useMemo(
      () =>
        patients.filter(
          (patient) =>
            patient.active,
        ).length,
      [patients],
    );

  /* =========================================================
     DETALLE DEL PACIENTE
  ========================================================= */

  if (selectedPatient) {
    return (
      <>
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        {loadingAppointments ? (
          <PatientDetailLoading
            patientName={
              selectedPatient.name
            }
          />
        ) : (
          <PatientDetail
            patient={
              selectedPatient
            }
            appointments={
              selectedPatientAppointments
            }
            services={services}
            busy={busy}
            onBack={() => {
              setDialogError('');

              setRescheduleAppointment(
                null,
              );

              setSelectedPatientId(
                '',
              );

              setAppointments([]);
            }}
            onNewAppointment={() => {
              setDialogError('');

              setAppointmentPatientId(
                selectedPatient.id,
              );

              setAppointmentDialogOpen(
                true,
              );
            }}
            onReschedule={(
              appointment,
            ) => {
              setDialogError('');

              setRescheduleAppointment(
                appointment,
              );
            }}
            onStatusChange={
              updateAppointmentStatus
            }
          />
        )}

        {appointmentDialogOpen && (
          <AppointmentDialog
            busy={busy}
            error={dialogError}
            patients={patients}
            services={services}
            patientId={
              selectedPatient.id
            }
            lockedPatient
            onPatientChange={() =>
              undefined
            }
            onClose={() => {
              setDialogError('');

              setAppointmentDialogOpen(
                false,
              );

              setAppointmentPatientId(
                '',
              );
            }}
            onSubmit={
              createAppointment
            }
          />
        )}

        {rescheduleAppointment && (
          <RescheduleAppointmentDialog
            busy={busy}
            error={dialogError}
            appointment={
              rescheduleAppointment
            }
            services={services}
            onClose={() => {
              setDialogError('');

              setRescheduleAppointment(
                null,
              );
            }}
            onSubmit={
              rescheduleAppointmentSubmit
            }
          />
        )}
      </>
    );
  }

  /* =========================================================
     LISTADO GENERAL
  ========================================================= */

  return (
    <section className="space-y-7 pb-10">
      <header
        className="
          flex flex-col gap-5
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-semibold uppercase
              tracking-[0.18em]
              text-[#A7B89A]
            "
          >
            Consultorio
          </p>

         

          <p
            className="
              mt-3 max-w-2xl
              text-[13px]
              leading-6
              text-[#6E7A73]
            "
          >
            Consulta tus pacientes y
            registra sus próximas citas
            desde un mismo lugar.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/agenda"
            className="
              inline-flex h-11
              items-center
              justify-center gap-2
              rounded-xl
              border
              border-[#DCE5DF]
              bg-white px-4
              text-[11px]
              font-semibold
              text-[#526A6E]
              transition
              hover:border-[#A7B89A]
              hover:bg-[#F9FBF8]
            "
          >
            <CalendarDays
              className="h-4 w-4"
              strokeWidth={1.5}
            />

            Ver agenda
          </Link>

          <button
            type="button"
            onClick={() => {
              setDialogError('');

              setAppointmentPatientId(
                '',
              );

              setAppointmentDialogOpen(
                true,
              );
            }}
            className="
              inline-flex h-11
              items-center
              justify-center gap-2
              rounded-xl
              border
              border-[#A7B89A]
              bg-[#F6F9F4]
              px-4
              text-[11px]
              font-semibold
              text-[#526A55]
              transition
              hover:bg-[#EEF4EA]
            "
          >
            <CalendarDays
              className="h-4 w-4"
              strokeWidth={1.6}
            />

            Nueva cita
          </button>

          <button
            type="button"
            onClick={() =>
              setPatientDialogOpen(
                true,
              )
            }
            className="
              inline-flex h-11
              items-center
              justify-center gap-2
              rounded-xl
              bg-[#0F3D4A]
              px-5
              text-[11px]
              font-semibold
              text-white
              transition
              hover:bg-[#174F5D]
            "
          >
            <Plus className="h-4 w-4" />

            Nuevo paciente
          </button>
        </div>
      </header>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <div
        className="
          grid gap-4
          sm:grid-cols-2
        "
      >
        <SummaryCard
          icon={
            <Users
              className="h-5 w-5"
              strokeWidth={1.5}
            />
          }
          value={patients.length}
          label="Pacientes en esta página"
        />

        <SummaryCard
          icon={
            <UserRound
              className="h-5 w-5"
              strokeWidth={1.5}
            />
          }
          value={activePatients}
          label="Pacientes activos"
          gold
        />
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border border-[#E4E9E5]
          bg-white
          shadow-[0_8px_30px_rgba(15,61,74,0.04)]
        "
      >
        <div
          className="
            border-b
            border-[#EDF0ED]
            p-5
          "
        >
          <div className="relative max-w-md">
            <Search
              className="
                absolute left-4
                top-1/2
                h-4 w-4
                -translate-y-1/2
                text-[#91A19D]
              "
              strokeWidth={1.6}
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value,
                )
              }
              placeholder="Buscar por nombre, teléfono o correo..."
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {loadingPatients ? (
          <PatientsLoading />
        ) : (
          <>
            {/* DESKTOP */}

            <div className="hidden md:block">
              <div
                className="
                  grid
                  grid-cols-[1.4fr_1fr_1fr_100px_24px]
                  gap-4
                  border-b
                  border-[#EDF0ED]
                  bg-[#FAFBF9]
                  px-6 py-3
                "
              >
                <TableTitle>
                  Paciente
                </TableTitle>

                <TableTitle>
                  Teléfono
                </TableTitle>

                <TableTitle>
                  Correo
                </TableTitle>

                <TableTitle>
                  Estado
                </TableTitle>

                <span />
              </div>

              {filteredPatients.length >
              0 ? (
                filteredPatients.map(
                  (patient) => (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => {
                        setError('');

                        setDialogError(
                          '',
                        );

                        setAppointments(
                          [],
                        );

                        setSelectedPatientId(
                          patient.id,
                        );
                      }}
                      className="
                        grid w-full
                        grid-cols-[1.4fr_1fr_1fr_100px_24px]
                        items-center
                        gap-4
                        border-b
                        border-[#F0F2F0]
                        px-6 py-4
                        text-left
                        transition
                        last:border-b-0
                        hover:bg-[#FAFCF9]
                      "
                    >
                      <div
                        className="
                          flex min-w-0
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex h-9 w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#EEF3EC]
                            text-[#647A60]
                          "
                        >
                          <UserRound
                            className="h-4 w-4"
                            strokeWidth={
                              1.5
                            }
                          />
                        </div>

                        <p
                          className="
                            truncate
                            text-[12px]
                            font-semibold
                            text-[#294F55]
                          "
                        >
                          {patient.name}
                        </p>
                      </div>

                      <p
                        className="
                          truncate
                          text-[11px]
                          text-[#657773]
                        "
                      >
                        {patient.phone}
                      </p>

                      <p
                        className="
                          truncate
                          text-[11px]
                          text-[#657773]
                        "
                      >
                        {patient.email ||
                          '—'}
                      </p>

                      <PatientStatus
                        patient={
                          patient
                        }
                      />

                      <ChevronRight
                        className="
                          h-4 w-4
                          text-[#A4B0AD]
                        "
                      />
                    </button>
                  ),
                )
              ) : (
                <EmptyPatients />
              )}
            </div>

            {/* MÓVIL */}

            <div
              className="
                divide-y
                divide-[#EDF0ED]
                md:hidden
              "
            >
              {filteredPatients.length >
              0 ? (
                filteredPatients.map(
                  (patient) => (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => {
                        setError('');

                        setDialogError(
                          '',
                        );

                        setAppointments(
                          [],
                        );

                        setSelectedPatientId(
                          patient.id,
                        );
                      }}
                      className="
                        flex w-full
                        items-center
                        gap-3 p-4
                        text-left
                      "
                    >
                      <div
                        className="
                          flex h-10 w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#EEF3EC]
                          text-[#647A60]
                        "
                      >
                        <UserRound
                          className="h-4 w-4"
                          strokeWidth={
                            1.5
                          }
                        />
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <p
                          className="
                            truncate
                            text-[12px]
                            font-semibold
                            text-[#294F55]
                          "
                        >
                          {patient.name}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-[#7B8A87]
                          "
                        >
                          {patient.phone}
                        </p>
                      </div>

                      <ChevronRight
                        className="
                          h-4 w-4
                          text-[#A4B0AD]
                        "
                      />
                    </button>
                  ),
                )
              ) : (
                <EmptyPatients />
              )}
            </div>
          </>
        )}

        <div
          className="
            flex items-center
            justify-between
            border-t
            border-[#EDF0ED]
            px-5 py-4
          "
        >
          <button
            type="button"
            disabled={
              page === 0 ||
              loadingPatients
            }
            onClick={() =>
              setPage(
                (current) =>
                  current - 1,
              )
            }
            className="
              inline-flex
              items-center gap-1
              text-[10px]
              font-semibold
              text-[#526A6E]
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronLeft className="h-4 w-4" />

            Anterior
          </button>

          <span
            className="
              text-[10px]
              text-[#879591]
            "
          >
            Página {page + 1}
          </span>

          <button
            type="button"
            disabled={
              patients.length <
                PAGE_SIZE ||
              loadingPatients
            }
            onClick={() =>
              setPage(
                (current) =>
                  current + 1,
              )
            }
            className="
              inline-flex
              items-center gap-1
              text-[10px]
              font-semibold
              text-[#526A6E]
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            Siguiente

            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {patientDialogOpen && (
        <PatientDialog
          busy={busy}
          onClose={() =>
            setPatientDialogOpen(
              false,
            )
          }
          onSubmit={
            createPatient
          }
        />
      )}

      {appointmentDialogOpen && (
        <AppointmentDialog
          busy={busy}
          error={dialogError}
          patients={patients}
          services={services}
          patientId={
            appointmentPatientId
          }
          onPatientChange={
            setAppointmentPatientId
          }
          onClose={() => {
            setDialogError('');

            setAppointmentDialogOpen(
              false,
            );

            setAppointmentPatientId(
              '',
            );
          }}
          onSubmit={
            createAppointment
          }
        />
      )}
    </section>
  );
}

/* =========================================================
   TABLE TITLE
========================================================= */

function TableTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p
      className="
        text-[9px]
        font-semibold uppercase
        tracking-[0.13em]
        text-[#8A9995]
      "
    >
      {children}
    </p>
  );
}

/* =========================================================
   ESTADO
========================================================= */

function PatientStatus({
  patient,
}: {
  patient: Patient;
}) {
  return (
    <span
      className={`
        w-fit rounded-full
        px-2.5 py-1
        text-[9px]
        font-semibold

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
  );
}

/* =========================================================
   RESUMEN
========================================================= */

function SummaryCard({
  icon,
  value,
  label,
  gold = false,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  gold?: boolean;
}) {
  return (
    <div
      className="
        flex items-center
        gap-4 rounded-2xl
        border border-[#E4E9E5]
        bg-white p-5
      "
    >
      <div
        className={`
          flex h-11 w-11
          items-center
          justify-center
          rounded-xl

          ${
            gold
              ? 'bg-[#F7F0DE] text-[#9A7B35]'
              : 'bg-[#EEF3EC] text-[#667B61]'
          }
        `}
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-2xl
            font-medium
            text-[#0F3D4A]
          "
        >
          {value}
        </p>

        <p
          className="
            text-[11px]
            text-[#7C8D89]
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING PACIENTES
========================================================= */

function PatientsLoading() {
  return (
    <div
      className="
        flex min-h-56
        items-center
        justify-center
        px-6 py-14
      "
    >
      <div className="text-center">
        <LoaderCircle
          className="
            mx-auto h-6 w-6
            animate-spin
            text-[#78907A]
          "
          strokeWidth={1.5}
        />

        <p
          className="
            mt-3
            text-[11px]
            font-semibold
            text-[#526A6E]
          "
        >
          Cargando pacientes...
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING DETALLE
========================================================= */

function PatientDetailLoading({
  patientName,
}: {
  patientName: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-[#E4E9E5]
        bg-white
        px-6 py-16
        text-center
      "
    >
      <LoaderCircle
        className="
          mx-auto h-6 w-6
          animate-spin
          text-[#78907A]
        "
        strokeWidth={1.5}
      />

      <p
        className="
          mt-3
          text-[12px]
          font-semibold
          text-[#526A6E]
        "
      >
        Cargando citas de{' '}
        {patientName}...
      </p>
    </div>
  );
}

/* =========================================================
   VACÍO
========================================================= */

function EmptyPatients() {
  return (
    <div className="px-6 py-14 text-center">
      <Users
        className="
          mx-auto h-8 w-8
          text-[#B7C2BE]
        "
        strokeWidth={1.3}
      />

      <p
        className="
          mt-3 text-[12px]
          font-semibold
          text-[#526A6E]
        "
      >
        No encontramos pacientes
      </p>

      <p
        className="
          mt-1 text-[11px]
          text-[#8B9996]
        "
      >
        Intenta con otra búsqueda o
        registra un nuevo paciente.
      </p>
    </div>
  );
}

/* =========================================================
   ERROR GENERAL
========================================================= */

function ErrorMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="
        rounded-xl
        border border-red-100
        bg-red-50
        px-4 py-3
        text-[12px]
        text-red-700
      "
    >
      {children}
    </div>
  );
}