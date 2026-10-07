import { beforeAll, afterAll, describe, it, expect, vi } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";
import { ApiError } from "../lib/api";
const access = vi.hoisted(() => ({ requireUser: vi.fn() }));
let db: ReturnType<typeof drizzle>;
vi.mock("../lib/db", () => ({ getDb: () => db }));
vi.mock("../lib/auth/guard", () => ({ requireUser: access.requireUser }));
import { POST, GET } from "../app/api/admin/services/route";
import { GET as getOne } from "../app/api/admin/services/[id]/route";
import { consumeRateLimit } from "../lib/rate-limit";
const pg = new PGlite();
const patientId = "11111111-1111-4111-8111-111111111111";
let serviceId: string;
beforeAll(async () => {
  await pg.exec(readFileSync("drizzle/0000_cute_reaper.sql", "utf8"));
  db = drizzle(pg);
  await pg.query("INSERT INTO patients(id,name,phone) VALUES ($1,$2,$3)", [
    patientId,
    "Paciente prueba",
    "5512345678",
  ]);
  access.requireUser.mockResolvedValue({
    id: "22222222-2222-4222-8222-222222222222",
    role: "admin",
  });
}, 30000);
afterAll(async () => {
  await pg.close();
});
describe("rutas con PostgreSQL", () => {
  it("crea un servicio validado y lo consulta", async () => {
    const response = await POST(
      new Request("http://localhost/api/admin/services", {
        method: "POST",
        body: JSON.stringify({
          slug: "individual",
          name: "Individual",
          description: "Consulta de prueba",
          type: "psicoterapia",
          priceCents: 40000,
          durationMinutes: 60,
        }),
      }),
    );
    expect(response.status).toBe(201);
    const { data } = await response.json();
    serviceId = data.id;
    const list = await GET(new Request("http://localhost/api/admin/services"));
    expect((await list.json()).data).toHaveLength(1);
  });
  it("rechaza entrada inválida sin insertar", async () => {
    const response = await POST(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify({ name: "x" }),
      }),
    );
    expect(response.status).toBe(422);
  });
  it("devuelve 404 para un recurso ausente", async () => {
    expect(
      (
        await getOne(new Request("http://localhost"), {
          params: Promise.resolve({
            id: "33333333-3333-4333-8333-333333333333",
          }),
        })
      ).status,
    ).toBe(404);
  });
  it("no consulta datos cuando el guard rechaza la sesión", async () => {
    access.requireUser.mockRejectedValueOnce(new ApiError(401, "Sin sesión"));
    expect((await GET(new Request("http://localhost"))).status).toBe(401);
    access.requireUser.mockRejectedValueOnce(new ApiError(403, "Sin permiso"));
    expect((await GET(new Request("http://localhost"))).status).toBe(403);
  });
});
describe("restricciones de citas", () => {
  const insert = (start: string, end: string, status = "pending") =>
    pg.query(
      "INSERT INTO appointments(patient_id,service_id,starts_at,ends_at,status) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [patientId, serviceId, start, end, status],
    );
  it("impide traslapes y permite citas adyacentes", async () => {
    await insert("2026-12-07T16:00:00-06:00", "2026-12-07T17:00:00-06:00");
    await expect(
      insert("2026-12-07T16:30:00-06:00", "2026-12-07T17:30:00-06:00"),
    ).rejects.toMatchObject({ code: "23P01" });
    await expect(
      insert("2026-12-07T17:00:00-06:00", "2026-12-07T18:00:00-06:00"),
    ).resolves.toBeDefined();
  });
  it("libera un espacio cancelado pero impide reactivarlo si ya está ocupado", async () => {
    const canceled = await insert(
      "2026-12-08T16:00:00-06:00",
      "2026-12-08T17:00:00-06:00",
      "cancelled",
    );
    await insert("2026-12-08T16:00:00-06:00", "2026-12-08T17:00:00-06:00");
    await expect(
      pg.query("UPDATE appointments SET status='confirmed' WHERE id=$1", [
        (canceled.rows[0] as { id: string }).id,
      ]),
    ).rejects.toMatchObject({ code: "23P01" });
  });
  it("revierte el paciente cuando falla la reserva en una transacción", async () => {
    const other = "44444444-4444-4444-8444-444444444444";
    await expect(
      pg.transaction(async (tx) => {
        await tx.query(
          "INSERT INTO patients(id,name,phone) VALUES ($1,$2,$3)",
          [other, "Otra persona", "5511111111"],
        );
        await tx.query(
          "INSERT INTO appointments(patient_id,service_id,starts_at,ends_at) VALUES ($1,$2,$3,$4)",
          [
            other,
            serviceId,
            "2026-12-07T16:30:00-06:00",
            "2026-12-07T17:30:00-06:00",
          ],
        );
      }),
    ).rejects.toMatchObject({ code: "23P01" });
    expect(
      (await pg.query("SELECT id FROM patients WHERE id=$1", [other])).rows,
    ).toHaveLength(0);
  });
});
describe("límite persistente", () => {
  it("rechaza exceso de solicitudes y permite un periodo nuevo", async () => {
    await consumeRateLimit("test", 2, 3600);
    await consumeRateLimit("test", 2, 3600);
    await expect(consumeRateLimit("test", 2, 3600)).rejects.toMatchObject({
      status: 429,
    });
    const [row] = await db.select().from(schema.rateLimits);
    await db
      .update(schema.rateLimits)
      .set({ expiresAt: new Date(0) })
      .where(eq(schema.rateLimits.key, row.key));
    await expect(consumeRateLimit("test", 2, 3600)).resolves.toBeUndefined();
  });
});
