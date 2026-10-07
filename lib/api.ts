import { NextResponse } from "next/server";
import { ZodError } from "zod";
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function apiError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { error: { message, ...(details ? { details } : {}) } },
    { status },
  );
}
export function success(data: unknown, status = 200) {
  return NextResponse.json(
    { data },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
export function handleApiError(error: unknown) {
  if (error instanceof ApiError) return apiError(error.message, error.status);
  if (error instanceof ZodError)
    return apiError("Revisa los datos enviados.", 422, error.flatten());
  if (error instanceof SyntaxError) return apiError("JSON inválido.", 400);
  const cause = error as { code?: string; cause?: { code?: string } };
  const code = cause?.cause?.code ?? cause?.code;
  if (["23505", "23P01"].includes(code ?? ""))
    return apiError("Registro duplicado u horario ocupado.", 409);
  if (code === "23503")
    return apiError("La referencia no existe o el registro está en uso.", 409);
  // Never log input, query parameters, connection strings, or patient information.
  console.error("API failure", {
    type: error instanceof Error ? error.name : "unknown",
  });
  return apiError("No se pudo completar la operación.", 500);
}
export async function readJson(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 131072)
    throw new ApiError(413, "Solicitud demasiado grande.");
  const body = await request.text();
  if (Buffer.byteLength(body) > 131072)
    throw new ApiError(413, "Solicitud demasiado grande.");
  return JSON.parse(body);
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== new URL(request.url).origin &&
    origin !== process.env.APP_URL
  ) {
    throw new ApiError(403, "Origen no permitido.");
  }
}
