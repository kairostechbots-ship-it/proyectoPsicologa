import { eq, asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services as table } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import {
  serviceSchema as inputSchema,
  idSchema,
  listSchema,
} from "@/lib/validators";

export async function GET(request: Request) {
  try {
    await requireUser(["admin", "editor"]);
    const p = listSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    return success(
      await getDb()
        .select()
        .from(table)
        .orderBy(asc(table.displayOrder))
        .limit(p.limit)
        .offset(p.offset),
    );
  } catch (e) {
    return handleApiError(e);
  }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const user = await requireUser(["admin", "editor"]);
    const input = inputSchema.parse(await readJson(request));
    const [data] = await getDb().insert(table).values(input).returning();
    return success(data, 201);
  } catch (e) {
    return handleApiError(e);
  }
}
