'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';


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
        errorTarget: 'dialog',
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
     LISTADO GENERAL · NUEVA EXPERIENCIA
  ========================================================= */

  function openPatient(patientId: string) {
    setError('');
    setDialogError('');
    setAppointments([]);
    setSelectedPatientId(patientId);
  }

  function openNewAppointment() {
    setDialogError('');
    setAppointmentPatientId('');
    setAppointmentDialogOpen(true);
  }

  return (
    <section className="mx-auto max-w-[1240px] space-y-6 pb-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#916E25]">Consultorio</p>
          <h2 className="mt-1 font-serif text-[27px] text-[#0F3D4A] sm:text-[32px]">Mis pacientes</h2>
          <p className="mt-1 text-sm text-[#526368]">Busca un paciente o registra una nueva cita.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={openNewAppointment} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#C8D5CB] bg-white px-4 text-sm font-semibold text-[#0F3D4A] hover:bg-[#EDF2ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D4A]">
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Nueva cita
          </button>
          <button type="button" onClick={() => { setDialogError(''); setPatientDialogOpen(true); }} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0F3D4A] px-5 text-sm font-semibold text-white hover:bg-[#174F5D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8BD66]">
            <Plus className="h-4 w-4" aria-hidden="true" /> Nuevo paciente
          </button>
        </div>
      </header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <section aria-labelledby="patient-list-heading" className="overflow-hidden rounded-[24px] border border-[#DFE7DF] bg-white shadow-[0_10px_30px_rgba(15,61,74,0.035)]">
        <div className="flex flex-col gap-4 border-b border-[#E8EDE8] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 id="patient-list-heading" className="font-serif text-2xl text-[#0F3D4A]">Lista de pacientes</h3>
            <p className="mt-1 text-sm text-[#647572]">
              {loadingPatients ? 'Consultando pacientes…' : `${patients.length} ${patients.length === 1 ? 'paciente en esta página' : 'pacientes en esta página'} · ${activePatients} activos`}
            </p>
          </div>
          <div className="w-full lg:max-w-[390px]">
            <label htmlFor="buscar-paciente" className="mb-2 block text-sm font-medium text-[#435D61]">Buscar paciente</label>
            <div className="relative">
              <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667D76]" />
              <input id="buscar-paciente" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre, teléfono o correo" className={`${inputClass} min-h-12 pl-12 text-sm`} />
            </div>
          </div>
        </div>

        {query.trim() && (
          <p className="border-b border-[#E8EDE8] bg-[#F8F8F4] px-5 py-3 text-xs leading-5 text-[#536A65] sm:px-6">
            Mostrando coincidencias de la página {page + 1}. Para buscar en otra página, usa los controles inferiores.
          </p>
        )}

        {loadingPatients ? <PatientsLoading /> : filteredPatients.length ? (
          <div className="divide-y divide-[#E8EDE8]">
            {filteredPatients.map((patient) => (
              <button type="button" key={patient.id} onClick={() => openPatient(patient.id)} className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-[#F6F8F4] focus-visible:bg-[#F6F8F4] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0F3D4A] sm:gap-4 sm:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3EC] text-[#52665A]"><UserRound className="h-5 w-5" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold text-[#0F3D4A]">{patient.name}</span>
                  <span className="mt-1 block text-sm text-[#637571]">{patient.phone}</span>
                  {patient.email && <span className="mt-0.5 block truncate text-xs text-[#74837F]">{patient.email}</span>}
                </span>
                <span className="hidden shrink-0 sm:block"><PatientStatus patient={patient} /></span>
                <span className="hidden text-sm font-semibold text-[#0F3D4A] lg:block">Ver ficha</span>
                <ChevronRight className="h-5 w-5 shrink-0 text-[#607E78] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : <EmptyPatients />}

        {(page > 0 || patients.length === PAGE_SIZE) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EDE8] bg-[#FAFAF7] px-4 py-4 sm:px-6">
          <button type="button" disabled={page === 0 || loadingPatients} onClick={() => setPage((current) => current - 1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#D5E0D8] bg-white px-4 text-sm font-semibold text-[#0F3D4A] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" />Anterior</button>
          <span className="text-sm font-medium text-[#536A65]">Página {page + 1}</span>
          <button type="button" disabled={patients.length < PAGE_SIZE || loadingPatients} onClick={() => setPage((current) => current + 1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#D5E0D8] bg-white px-4 text-sm font-semibold text-[#0F3D4A] disabled:cursor-not-allowed disabled:opacity-40">Siguiente<ChevronRight className="h-4 w-4" /></button>
        </div>
        )}
      </section>

      {patientDialogOpen && (
        <PatientDialog busy={busy} error={dialogError} onClose={() => { if (busy) return; setDialogError(''); setPatientDialogOpen(false); }} onSubmit={createPatient} />
      )}

      {appointmentDialogOpen && (
        <AppointmentDialog busy={busy} error={dialogError} patients={patients} services={services} patientId={appointmentPatientId} onPatientChange={setAppointmentPatientId} onClose={() => { if (busy) return; setDialogError(''); setAppointmentDialogOpen(false); setAppointmentPatientId(''); }} onSubmit={createAppointment} />
      )}
    </section>
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