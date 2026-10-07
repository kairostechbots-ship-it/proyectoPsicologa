"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/http";
interface Summary {
  services: unknown[];
  faqs: unknown[];
  naturalMedicine: { techniques: unknown[] };
}
const links = [
  ["psicoterapia", "Servicios"],
  ["medicina-natural", "Medicina natural"],
  ["promocion", "Promoción"],
  ["perfil", "Perfil profesional"],
  ["contacto", "Contacto y horarios"],
  ["faq", "Preguntas frecuentes"],
];
export default function AdminPage() {
  const [summary, setSummary] = useState<Summary | null>(null),
    [user, setUser] = useState<{ name: string; role: string } | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    Promise.all([
      apiFetch<Summary>("/api/site"),
      apiFetch<{ name: string; role: string }>("/api/auth/me"),
    ])
      .then(([s, u]) => {
        setSummary(s);
        setUser(u);
      })
      .catch((e) => setError(e.message));
  }, []);
  return (
    <div className="space-y-8 pb-10">
      <header>
        <p className="text-sm text-slate-500">Panel administrativo</p>
        <h1 className="mt-2 font-serif text-4xl text-[#0F3D4A]">
          Hola{user ? ", " + user.name : ""}.
        </h1>
        <p className="mt-3">
          Administra el consultorio y la información del sitio.
        </p>
      </header>
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}
      {summary && (
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            [summary.services.length, "Servicios activos"],
            [summary.naturalMedicine.techniques.length, "Técnicas activas"],
            [summary.faqs.length, "Preguntas publicadas"],
          ].map(([count, label]) => (
            <div className="rounded-2xl bg-white p-6 shadow-sm" key={label}>
              <p className="text-3xl text-[#0F3D4A]">{count}</p>
              <p>{label}</p>
            </div>
          ))}
        </section>
      )}
      <nav className="grid gap-4 sm:grid-cols-2">
        {user?.role !== "editor" && (
          <>
            <Link
              className="rounded-2xl bg-[#0F3D4A] p-6 text-white"
              href="/admin/pacientes"
            >
              Pacientes y citas
            </Link>
            <Link className="rounded-2xl bg-white p-6" href="/admin/agenda">
              Agenda del consultorio
            </Link>
          </>
        )}
        {user?.role !== "receptionist" &&
          links.map(([path, label]) => (
            <Link
              key={path}
              className="rounded-2xl bg-white p-6"
              href={"/admin/" + path}
            >
              {label}
            </Link>
          ))}
        {user?.role === "admin" && (
          <Link className="rounded-2xl bg-white p-6" href="/admin/usuarios">
            Usuarios internos
          </Link>
        )}
      </nav>
    </div>
  );
}
