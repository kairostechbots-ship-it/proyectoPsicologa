import { eq, asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services as table } from "@/lib/db/schema";
import { success, handleApiError } from "@/lib/api";
export async function GET() {
  try {
    return success(
      await getDb()
        .select()
        .from(table)
        .where(eq(table.active, true))
        .orderBy(asc(table.displayOrder))
        .limit(100),
    );
  } catch (e) {
    return handleApiError(e);
  }
}
