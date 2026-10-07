import { eq, asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services, faqs } from "@/lib/db/schema";
import { getContent } from "@/lib/content";
import { success, handleApiError, ApiError } from "@/lib/api";
import { serviceView } from "@/lib/service-view";
export async function GET() {
  try {
    const [contact, profile, naturalMedicine, promotion, serviceRows, faqRows] =
      await Promise.all([
        getContent("contact", true),
        getContent("profile", true),
        getContent("natural-medicine", true),
        getContent("promotion", true).catch((e) => {
          if (e instanceof ApiError && e.status === 404) return null;
          throw e;
        }),
        getDb()
          .select()
          .from(services)
          .where(eq(services.active, true))
          .orderBy(asc(services.displayOrder))
          .limit(100),
        getDb()
          .select()
          .from(faqs)
          .where(eq(faqs.active, true))
          .orderBy(asc(faqs.displayOrder))
          .limit(100),
      ]);
    return success({
      chatEnabled: Boolean(process.env.GEMINI_API_KEY),
      contact: contact.data,
      profile: profile.data,
      naturalMedicine: naturalMedicine.data,
      promotion: promotion?.data ?? null,
      services: serviceRows.map((s, i) =>
        serviceView(
          { ...s, type: s.type as "psicoterapia" | "medicina-natural" },
          i + 1,
        ),
      ),
      faqs: faqRows.map((q, i) => ({ ...q, id: i + 1 })),
    });
  } catch (e) {
    return handleApiError(e);
  }
}
