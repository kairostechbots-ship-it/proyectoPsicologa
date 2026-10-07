import { hash } from "bcryptjs";
import { asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { success, handleApiError, readJson, checkOrigin } from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { userSchema, listSchema } from "@/lib/validators";
const fields = {
  id: users.id,
  name: users.name,
  email: users.email,
  role: users.role,
  active: users.active,
};
export async function GET(request: Request) {
  try {
    await requireUser(["admin"]);
    const p = listSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    return success(
      await getDb()
        .select(fields)
        .from(users)
        .orderBy(asc(users.name))
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
    await requireUser(["admin"]);
    const { password, ...input } = userSchema.parse(await readJson(request));
    const [data] = await getDb()
      .insert(users)
      .values({ ...input, passwordHash: await hash(password, 12) })
      .returning(fields);
    return success(data, 201);
  } catch (e) {
    return handleApiError(e);
  }
}
