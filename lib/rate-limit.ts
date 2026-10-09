import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";

import { getDb } from "./db";
import { rateLimits } from "./db/schema";
import { ApiError } from "./api";

/**
 * Rate limit persistente.
 *
 * - Guarda únicamente un hash del identificador.
 * - Funciona entre distintas instancias de Vercel.
 * - Si la infraestructura del rate limiter falla temporalmente,
 *   no bloquea el acceso legítimo al sistema.
 */
export async function consumeRateLimit(
  identifier: string,
  limit: number,
  seconds: number,
) {
  const key = createHash("sha256")
    .update(identifier)
    .digest("hex");

  try {
    const [row] = await getDb()
      .insert(rateLimits)
      .values({
        key,
        count: 1,
        expiresAt: new Date(Date.now() + seconds * 1000),
      })
      .onConflictDoUpdate({
        target: rateLimits.key,
        set: {
          count: sql<number>`
            CASE
              WHEN ${rateLimits.expiresAt} <= now()
                THEN 1
              ELSE ${rateLimits.count} + 1
            END
          `,
          expiresAt: sql`
            CASE
              WHEN ${rateLimits.expiresAt} <= now()
                THEN now() + (${seconds} * interval '1 second')
              ELSE ${rateLimits.expiresAt}
            END
          `,
        },
      })
      .returning({
        count: rateLimits.count,
        expiresAt: rateLimits.expiresAt,
      });

    if (!row) {
      console.error(
        "[rate-limit] La operación no devolvió ningún registro.",
      );
      return;
    }

    if (row.count > limit) {
      throw new ApiError(
        429,
        "Demasiadas solicitudes. Intenta nuevamente más tarde.",
      );
    }
  } catch (error) {
    // El 429 sí debe propagarse.
    if (error instanceof ApiError) {
      throw error;
    }

    // Un fallo de Neon/rate_limits no debe dejar fuera
    // a un usuario legítimo del panel administrativo.
    console.error(
      "[rate-limit] No se pudo registrar el intento. Se permitirá continuar.",
      error,
    );
  }
}

export function requestIdentifier(request: Request) {
  /**
   * Vercel controla este header en producción.
   * En desarrollo utilizamos "local".
   */
  if (process.env.VERCEL) {
    return (
      request.headers
        .get("x-vercel-forwarded-for")
        ?.split(",")[0]
        ?.trim() ?? "unknown"
    );
  }

  return "local";
}