import { success, handleApiError } from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
export async function GET() {
  try {
    return success(await requireUser());
  } catch (e) {
    return handleApiError(e);
  }
}
