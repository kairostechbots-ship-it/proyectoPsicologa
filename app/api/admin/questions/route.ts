import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { visitorQuestions } from "@/lib/db/schema";
import { success, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { listSchema } from "@/lib/validators";
export async function GET(request: Request) {
  try {
    await requireUser(["admin", "editor"]);
    const p = listSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    return success(
      await getDb()
        .select()
        .from(visitorQuestions)
        .orderBy(desc(visitorQuestions.createdAt))
        .limit(p.limit)
        .offset(p.offset),
    );
  } catch (e) {
    return handleApiError(e);
  }
}
