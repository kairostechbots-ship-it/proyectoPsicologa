import { success, handleApiError } from "@/lib/api";
import { getContent } from "@/lib/content";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  try {
    return success((await getContent((await params).key, true)).data);
  } catch (e) {
    return handleApiError(e);
  }
}
