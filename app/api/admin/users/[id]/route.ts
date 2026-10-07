import { hash } from "bcryptjs";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { userSchema, idSchema } from "@/lib/validators";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(request);
    const actor = await requireUser(["admin"]);
    const id = idSchema.parse((await params).id),
      { password, ...input } = userSchema
        .partial()
        .parse(await readJson(request));
    if (
      id === actor.id &&
      (input.active === false || (input.role && input.role !== "admin"))
    )
      throw new ApiError(
        422,
        "No puedes desactivar ni quitar permisos a tu propia cuenta.",
      );
    const [data] = await getDb()
      .update(users)
      .set({
        ...input,
        ...(password ? { passwordHash: await hash(password, 12) } : {}),
        sessionVersion: sql`${users.sessionVersion}+1`,
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        active: users.active,
      });
    if (!data) throw new ApiError(404, "Usuario no encontrado.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
