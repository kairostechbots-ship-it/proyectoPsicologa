import { getDb } from "@/lib/db";
import { visitorQuestions } from "@/lib/db/schema";
import { success, handleApiError, readJson, checkOrigin } from "@/lib/api";
import { questionSchema } from "@/lib/validators";
import { consumeRateLimit, requestIdentifier } from "@/lib/rate-limit";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await consumeRateLimit("question:" + requestIdentifier(request), 5, 3600);
    const input = questionSchema.parse(await readJson(request));
    const [data] = await getDb()
      .insert(visitorQuestions)
      .values(input)
      .returning({ id: visitorQuestions.id, status: visitorQuestions.status });
    return success(data, 201);
  } catch (e) {
    return handleApiError(e);
  }
}
