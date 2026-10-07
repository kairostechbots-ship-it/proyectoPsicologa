import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { success, handleApiError, ApiError } from "@/lib/api";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const [data] = await getDb()
      .select()
      .from(services)
      .where(and(eq(services.slug, slug), eq(services.active, true)))
      .limit(1);
    if (!data) throw new ApiError(404, "Servicio no encontrado.");
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
