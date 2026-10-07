import { beforeEach, describe, it, expect, vi } from "vitest";
const mocks = vi.hoisted(() => ({ auth: vi.fn(), rows: vi.fn() }));
vi.mock("../lib/auth/server", () => ({ auth: mocks.auth }));
vi.mock("../lib/db", () => ({
  getDb: () => ({
    select: () => ({ from: () => ({ where: () => ({ limit: mocks.rows }) }) }),
  }),
}));
import { requireUser } from "../lib/auth/guard";
describe("autorización", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.auth.mockResolvedValue({ user: { id: "id" }, sessionVersion: 1 });
    mocks.rows.mockResolvedValue([
      { id: "id", role: "editor", active: true, sessionVersion: 1 },
    ]);
  });
  it("rechaza visitantes", async () => {
    mocks.auth.mockResolvedValue(null);
    await expect(requireUser()).rejects.toMatchObject({ status: 401 });
  });
  it("rechaza roles sin permiso", async () => {
    await expect(requireUser(["admin"])).rejects.toMatchObject({ status: 403 });
  });
  it("rechaza cuentas desactivadas", async () => {
    mocks.rows.mockResolvedValue([{ active: false }]);
    await expect(requireUser()).rejects.toMatchObject({ status: 401 });
  });
  it("revoca sesiones al cambiar versión", async () => {
    mocks.rows.mockResolvedValue([{ active: true, sessionVersion: 2 }]);
    await expect(requireUser()).rejects.toMatchObject({ status: 401 });
  });
  it("permite un rol autorizado", async () => {
    await expect(requireUser(["editor"])).resolves.toMatchObject({
      role: "editor",
    });
  });
});
