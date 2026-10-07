import { describe, it, expect } from "vitest";
import { handleApiError, ApiError, checkOrigin, readJson } from "../lib/api";
describe("respuestas de API", () => {
  it("devuelve 404 cuando no existe", () =>
    expect(handleApiError(new ApiError(404, "No existe")).status).toBe(404));
  it("mapea exclusión de horarios a 409", () =>
    expect(handleApiError({ cause: { code: "23P01" } }).status).toBe(409));
  it("oculta detalles de errores internos", async () =>
    expect(
      JSON.stringify(await handleApiError(new Error("secret")).json()),
    ).not.toContain("secret"));
  it("rechaza JSON inválido", async () => {
    try {
      await readJson(
        new Request("http://localhost", { method: "POST", body: "{" }),
      );
    } catch (e) {
      expect(handleApiError(e).status).toBe(400);
    }
  });
  it("rechaza escrituras de otro origen", () =>
    expect(() =>
      checkOrigin(
        new Request("http://localhost", {
          headers: { origin: "https://otro.example" },
        }),
      ),
    ).toThrow());
});
