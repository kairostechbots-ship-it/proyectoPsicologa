"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/http";
interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  active: boolean;
}
interface Service {
  id: string;
  name: string;
}
interface Appointment {
  id: string;
  patientId: string;
  startsAt: string;
  status: string;
}
interface Note {
  id: string;
  body: string;
}
interface Message {
  id: string;
  body: string;
  direction: string;
  read: boolean;
}
interface PatientForm {
  id: string;
  title: string;
  status: string;
  answers: Record<string, string>;
}
type Detail = Note | Message | PatientForm;
export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]),
    [services, setServices] = useState<Service[]>([]),
    [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState(""),
    [details, setDetails] = useState<Detail[]>([]),
    [kind, setKind] = useState<"notes" | "messages" | "forms">("notes");
  const [role, setRole] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [page, setPage] = useState(0),
    [query, setQuery] = useState("");
  const fetchLists = useCallback(
    () =>
      Promise.all([
        apiFetch<Patient[]>(
          "/api/admin/patients?limit=100&offset=" + page * 100,
        ),
        apiFetch<Service[]>("/api/services"),
        apiFetch<Appointment[]>(
          "/api/admin/appointments?limit=100" +
            (selected ? "&patientId=" + selected : ""),
        ),
      ]),
    [page, selected],
  );
  const applyLists = useCallback(
    ([p, s, a]: [Patient[], Service[], Appointment[]]) => {
      setPatients(p);
      setServices(s);
      setAppointments(a);
    },
    [],
  );
  const load = () => fetchLists().then(applyLists);
  useEffect(() => {
    let active = true;
    fetchLists()
      .then((data) => {
        if (active) applyLists(data);
      })
      .catch((e) => setError(e.message));
    return () => {
      active = false;
    };
  }, [fetchLists, applyLists]);
  useEffect(() => {
    apiFetch<{ role: string }>("/api/auth/me")
      .then((u) => {
        setRole(u.role);
        if (u.role !== "admin") setKind("messages");
      })
      .catch((e) => setError(e.message));
  }, []);
  async function loadDetails() {
    if (selected)
      setDetails(
        await apiFetch<Detail[]>(
          "/api/admin/" + kind + "?limit=100&patientId=" + selected,
        ),
      );
    else setDetails([]);
  }
  useEffect(() => {
    if (!selected) return;
    let active = true;
    apiFetch<Detail[]>(
      "/api/admin/" + kind + "?limit=100&patientId=" + selected,
    )
      .then((data) => {
        if (active) setDetails(data);
      })
      .catch((e) => setError(e.message));
    return () => {
      active = false;
    };
  }, [selected, kind]);
  async function perform(action: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
      await loadDetails();
      window.dispatchEvent(new Event("appointments_updated"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }
  function createPatient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget,
      d = new FormData(form);
    void perform(async () => {
      await apiFetch("/api/admin/patients", {
        method: "POST",
        body: JSON.stringify({
          name: d.get("name"),
          phone: d.get("phone"),
          email: d.get("email"),
        }),
      });
      form.reset();
    });
  }
  function createAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const d = new FormData(event.currentTarget);
    void perform(() =>
      apiFetch("/api/admin/appointments", {
        method: "POST",
        body: JSON.stringify({
          patientId: selected,
          serviceId: d.get("serviceId"),
          startsAt: d.get("startsAt") + ":00-06:00",
          modality: d.get("modality"),
        }),
      }),
    );
  }
  function createDetail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget,
      d = new FormData(form);
    const data =
      kind === "forms"
        ? { patientId: selected, title: d.get("body") }
        : { patientId: selected, body: d.get("body") };
    void perform(async () => {
      await apiFetch("/api/admin/" + kind, {
        method: "POST",
        body: JSON.stringify(data),
      });
      form.reset();
    });
  }
  const style = "rounded-lg border border-slate-300 bg-white px-3 py-2";
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Pacientes y citas</h1>
        <p className="mt-2">Horarios del consultorio: America/Mexico_City.</p>
        <Link href="/admin/agenda" className="underline">
          Ver agenda
        </Link>
      </header>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}
      {busy && <p role="status">Guardando…</p>}
      <fieldset disabled={busy} className="space-y-6 disabled:opacity-60">
        <form
          onSubmit={createPatient}
          className="flex flex-wrap gap-3 rounded-xl bg-white p-5"
        >
          <h2 className="w-full text-xl">Nuevo paciente</h2>
          <input
            className={style}
            name="name"
            aria-label="Nombre"
            placeholder="Nombre"
            required
            maxLength={160}
          />
          <input
            className={style}
            name="phone"
            aria-label="Teléfono"
            placeholder="Teléfono"
            required
          />
          <input
            className={style}
            name="email"
            aria-label="Correo"
            placeholder="Correo opcional"
            type="email"
          />
          <button className={style}>Guardar paciente</button>
        </form>
        <div className="space-y-3">
          <input
            className={style}
            aria-label="Filtrar pacientes de esta página"
            placeholder="Filtrar esta página"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className={style + " ml-3"}
            aria-label="Paciente"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setDetails([]);
            }}
          >
            <option value="">Selecciona un paciente</option>
            {patients
              .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.phone}
                  {!p.active ? " (inactivo)" : ""}
                </option>
              ))}
          </select>
          <div className="flex gap-4">
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </button>
            <span>Página {page + 1}</span>
            <button
              disabled={patients.length < 100}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
        {selected && (
          <>
            <form
              onSubmit={createAppointment}
              className="flex flex-wrap gap-3 rounded-xl bg-white p-5"
            >
              <h2 className="w-full text-xl">Solicitar cita</h2>
              <select
                className={style}
                name="serviceId"
                aria-label="Servicio"
                required
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                className={style}
                type="datetime-local"
                name="startsAt"
                aria-label="Fecha y hora"
                required
              />
              <select className={style} name="modality" aria-label="Modalidad">
                <option value="presencial">Presencial</option>
                <option value="online">En línea</option>
              </select>
              <button className={style}>Guardar solicitud</button>
            </form>
            <section className="space-y-3 rounded-xl bg-white p-5">
              <h2 className="text-xl">Citas recientes del paciente</h2>
              {appointments
                .filter((a) => a.patientId === selected)
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-wrap items-center gap-4 border-b py-3"
                  >
                    <span>
                      {new Date(a.startsAt).toLocaleString("es-MX", {
                        timeZone: "America/Mexico_City",
                      })}
                    </span>
                    <select
                      className={style}
                      aria-label="Estado de la cita"
                      value={a.status}
                      onChange={(e) =>
                        void perform(() =>
                          apiFetch("/api/admin/appointments/" + a.id, {
                            method: "PATCH",
                            body: JSON.stringify({ status: e.target.value }),
                          }),
                        )
                      }
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                      <option value="completed">Completada</option>
                    </select>
                  </div>
                ))}
            </section>
            <section className="space-y-3 rounded-xl bg-white p-5">
              <select
                className={style}
                aria-label="Información del paciente"
                value={kind}
                onChange={(e) => {
                  setKind(e.target.value as typeof kind);
                  setDetails([]);
                }}
              >
                {role === "admin" && (
                  <option value="notes">Notas clínicas</option>
                )}
                <option value="messages">Registro de mensajes</option>
                {role === "admin" && <option value="forms">Formularios</option>}
              </select>
              {kind === "messages" && (
                <p>
                  Registro interno de comunicaciones. Para contactar al
                  paciente, utiliza sus datos de contacto.
                </p>
              )}
              <form onSubmit={createDetail} className="flex gap-3">
                <textarea
                  className={style + " flex-1"}
                  name="body"
                  aria-label={
                    kind === "forms" ? "Título del formulario" : "Contenido"
                  }
                  placeholder={
                    kind === "forms" ? "Título del formulario" : "Contenido"
                  }
                  required
                  maxLength={kind === "forms" ? 160 : 10000}
                />
                <button className={style}>Agregar</button>
              </form>
              {details.map((item) => (
                <article key={item.id} className="space-y-2 border-b py-3">
                  <p className="whitespace-pre-wrap">
                    {"title" in item ? item.title : item.body}
                  </p>
                  {"status" in item && (
                    <>
                      <p>
                        {item.status === "completed"
                          ? "Completado"
                          : "Pendiente"}
                      </p>
                      <button
                        className={style}
                        onClick={() =>
                          void perform(() =>
                            apiFetch("/api/admin/forms/" + item.id, {
                              method: "PATCH",
                              body: JSON.stringify({
                                status:
                                  item.status === "completed"
                                    ? "pending"
                                    : "completed",
                              }),
                            }),
                          )
                        }
                      >
                        Cambiar estado
                      </button>
                    </>
                  )}
                  <button
                    className={style}
                    onClick={() => {
                      if (window.confirm("¿Eliminar este registro?"))
                        void perform(() =>
                          apiFetch("/api/admin/" + kind + "/" + item.id, {
                            method: "DELETE",
                          }),
                        );
                    }}
                  >
                    Eliminar
                  </button>
                </article>
              ))}
            </section>
          </>
        )}
      </fieldset>
    </section>
  );
}
