import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { getDb } from "./db";
import { rateLimits } from "./db/schema";
import { ApiError } from "./api";
// Persistent across Vercel instances. Store hashes rather than IP/email values.
export async function consumeRateLimit(
  identifier: string,
  limit: number,
  seconds: number,
) {
  const key = createHash("sha256").update(identifier).digest("hex");
  const [row] = await getDb()
    .insert(rateLimits)
    .values({ key, count: 1, expiresAt: new Date(Date.now() + seconds * 1000) })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN ${rateLimits.expiresAt} <= now() THEN 1 ELSE ${rateLimits.count} + 1 END`,
        expiresAt: sql`CASE WHEN ${rateLimits.expiresAt} <= now() THEN now() + ${seconds} * interval '1 second' ELSE ${rateLimits.expiresAt} END`,
      },
    })
    .returning();
  if (row.count > limit)
    throw new ApiError(429, "Demasiadas solicitudes. Intenta más tarde.");
}
export function requestIdentifier(request: Request) {
  // Vercel overwrites this header. Other hosts must configure a trusted proxy.
  return process.env.VERCEL
    ? (request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown")
    : "local";
}
