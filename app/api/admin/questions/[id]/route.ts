import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { visitorQuestions } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { questionPatchSchema, idSchema } from "@/lib/validators";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(request);
    await requireUser(["admin", "editor"]);
    const id = idSchema.parse((await params).id),
      input = questionPatchSchema.parse(await readJson(request));
    const [data] = await getDb()
      .update(visitorQuestions)
      .set(input)
      .where(eq(visitorQuestions.id, id))
      .returning();
    if (!data) throw new ApiError(404, "Pregunta no encontrada.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
