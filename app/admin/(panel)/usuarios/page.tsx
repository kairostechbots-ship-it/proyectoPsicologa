"use client";
import { useEffect, useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/http";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const load = () =>
    apiFetch<User[]>("/api/admin/users?limit=100").then(setUsers);
  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    try {
      await apiFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      form.reset();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }
  async function change(user: User, patch: Partial<User>) {
    setBusy(true);
    setError("");
    try {
      await apiFetch("/api/admin/users/" + user.id, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="space-y-6">
      <h1 className="text-3xl">Usuarios internos</h1>
      {error && (
        <p role="alert" className="text-red-700">
          {error}
        </p>
      )}
      <form onSubmit={save}>
        <fieldset
          disabled={busy}
          className="flex flex-wrap gap-3 rounded-xl bg-white p-5"
        >
          <input
            className="rounded border p-2"
            name="name"
            placeholder="Nombre"
            aria-label="Nombre"
            required
          />
          <input
            className="rounded border p-2"
            name="email"
            placeholder="Correo"
            aria-label="Correo"
            type="email"
            required
          />
          <input
            className="rounded border p-2"
            name="password"
            placeholder="Contraseña: mínimo 12 caracteres"
            aria-label="Contraseña"
            type="password"
            minLength={12}
            maxLength={72}
            required
            autoComplete="new-password"
          />
          <select className="rounded border p-2" name="role" aria-label="Rol">
            <option value="editor">Edición</option>
            <option value="receptionist">Recepción</option>
            <option value="admin">Administración</option>
          </select>
          <button className="rounded border p-2">Crear usuario</button>
        </fieldset>
      </form>
      {users.map((u) => (
        <article
          key={u.id}
          className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-4"
        >
          <div className="flex-1">
            <h2>{u.name}</h2>
            <p>{u.email}</p>
          </div>
          <select
            aria-label={"Rol de " + u.name}
            disabled={busy}
            value={u.role}
            onChange={(e) => void change(u, { role: e.target.value })}
          >
            <option value="editor">Edición</option>
            <option value="receptionist">Recepción</option>
            <option value="admin">Administración</option>
          </select>
          <button
            disabled={busy}
            onClick={() => void change(u, { active: !u.active })}
          >
            {u.active ? "Desactivar" : "Activar"}
          </button>
        </article>
      ))}
    </section>
  );
}
