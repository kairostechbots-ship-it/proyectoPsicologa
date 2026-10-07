import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { content } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { getContent, contentKey } from "@/lib/content";
import { requireUser } from "@/lib/auth/guard";
import { contentSchemas, contentWriteSchema } from "@/lib/validators";
type Context = { params: Promise<{ key: string }> };
export async function GET(_request: Request, { params }: Context) {
  try {
    await requireUser(["admin", "editor"]);
    return success(await getContent((await params).key));
  } catch (e) {
    return handleApiError(e);
  }
}
export async function PUT(request: Request, { params }: Context) {
  try {
    checkOrigin(request);
    await requireUser(["admin", "editor"]);
    const key = contentKey((await params).key);
    const input = contentWriteSchema.parse(await readJson(request));
    const data = contentSchemas[key].parse(input.data);
    const [updated] = await getDb()
      .update(content)
      .set({ data, version: sql`${content.version}+1`, updatedAt: new Date() })
      .where(and(eq(content.key, key), eq(content.version, input.version)))
      .returning();
    if (!updated)
      throw new ApiError(409, "El contenido cambió. Recarga antes de guardar.");
    return success({ data: updated.data, version: updated.version });
  } catch (e) {
    return handleApiError(e);
  }
}
