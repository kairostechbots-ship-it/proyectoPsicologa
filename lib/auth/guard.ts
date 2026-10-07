import { eq } from "drizzle-orm";
import { auth } from "./server";
import { getDb } from "../db";
import { users } from "../db/schema";
import { ApiError } from "../api";
export type Role = "admin" | "receptionist" | "editor";
export async function requireUser(roles?: readonly Role[]) {
  const session = await auth();
  if (!session?.user?.id) throw new ApiError(401, "Inicia sesión.");
  const [user] = await getDb()
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      active: users.active,
      sessionVersion: users.sessionVersion,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);
  if (
    !user?.active ||
    user.sessionVersion !==
      (session as typeof session & { sessionVersion?: number }).sessionVersion
  )
    throw new ApiError(401, "Sesión no válida.");
  if (roles && !roles.includes(user.role))
    throw new ApiError(403, "No tienes permiso para esta operación.");
  return user;
}
