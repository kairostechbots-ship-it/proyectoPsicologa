import { eq, asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { notes as table } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import {
  noteSchema as inputSchema,
  idSchema,
  listSchema,
} from "@/lib/validators";

type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, { params }: Context) {
  try {
    await requireUser(["admin"]);
    const id = idSchema.parse((await params).id);
    const [data] = await getDb()
      .select()
      .from(table)
      .where(eq(table.id, id))
      .limit(1);
    if (!data) throw new ApiError(404, "Registro no encontrado.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
export async function PATCH(request: Request, { params }: Context) {
  try {
    checkOrigin(request);
    await requireUser(["admin"]);
    const id = idSchema.parse((await params).id);
    const input = inputSchema.partial().parse(await readJson(request));
    if (!Object.keys(input).length)
      throw new ApiError(422, "Envía al menos un campo.");
    const [data] = await getDb()
      .update(table)
      .set(input)
      .where(eq(table.id, id))
      .returning();
    if (!data) throw new ApiError(404, "Registro no encontrado.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
export async function DELETE(request: Request, { params }: Context) {
  try {
    checkOrigin(request);
    await requireUser(["admin"]);
    const id = idSchema.parse((await params).id);
    const [data] = await getDb()
      .delete(table)
      .where(eq(table.id, id))
      .returning({ id: table.id });
    if (!data) throw new ApiError(404, "Registro no encontrado.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
