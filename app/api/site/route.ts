
import { eq, asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services, faqs } from "@/lib/db/schema";
import { getContent } from "@/lib/content";
import { success, handleApiError, ApiError } from "@/lib/api";
import { serviceView } from "@/lib/service-view";

/**
 * DIAGNÓSTICO TEMPORAL
 *
 * Identifica qué operación falla en producción.
 *
 * No imprime datos personales, contraseñas,
 * cadenas de conexión ni contenido de la BD.
 */
async function diagnosticar<T>(
  nombre: string,
  operacion: () => Promise<T>
): Promise<T> {
  const inicio = Date.now();

  try {
    const resultado = await operacion();

    console.info(`[API SITE] OK: ${nombre}`, {
      duracionMs: Date.now() - inicio,
    });

    return resultado;
  } catch (error) {
    let tipo = "Unknown";
    let codigo = "SIN_CODIGO";

    if (error instanceof Error) {
      tipo = error.name;
    }

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      typeof error.code === "string"
    ) {
      codigo = error.code;
    }

    console.error(`[API SITE] ERROR: ${nombre}`, {
      tipo,
      codigo,
      duracionMs: Date.now() - inicio,
    });

    throw error;
  }
}

/**
 * GET /api/site
 *
 * Obtiene la información pública del sitio:
 * - Contacto
 * - Perfil profesional
 * - Medicina natural
 * - Promoción
 * - Servicios activos
 * - Preguntas frecuentes
 */
export async function GET() {
  console.info("[API SITE] Iniciando consultas");

  try {
    const [
      contact,
      profile,
      naturalMedicine,
      promotion,
      serviceRows,
      faqRows,
    ] = await Promise.all([
      // CONTACTO
      diagnosticar("contact", () =>
        getContent("contact", true)
      ),

      // PERFIL PROFESIONAL
      diagnosticar("profile", () =>
        getContent("profile", true)
      ),

      // MEDICINA NATURAL
      diagnosticar("natural-medicine", () =>
        getContent("natural-medicine", true)
      ),

      // PROMOCIÓN
      diagnosticar("promotion", () =>
        getContent("promotion", true).catch((error) => {
          if (
            error instanceof ApiError &&
            error.status === 404
          ) {
            return null;
          }

          throw error;
        })
      ),

      // SERVICIOS ACTIVOS
      diagnosticar("services", () =>
        getDb()
          .select()
          .from(services)
          .where(eq(services.active, true))
          .orderBy(asc(services.displayOrder))
          .limit(100)
      ),

      // PREGUNTAS FRECUENTES
      diagnosticar("faqs", () =>
        getDb()
          .select()
          .from(faqs)
          .where(eq(faqs.active, true))
          .orderBy(asc(faqs.displayOrder))
          .limit(100)
      ),
    ]);

    console.info(
      "[API SITE] Todas las consultas finalizaron correctamente"
    );

    return success({
      chatEnabled: Boolean(process.env.GEMINI_API_KEY),

      contact: contact.data,

      profile: profile.data,

      naturalMedicine: naturalMedicine.data,

      promotion: promotion?.data ?? null,

      services: serviceRows.map((service, index) =>
        serviceView(
          {
            ...service,
            type: service.type as
              | "psicoterapia"
              | "medicina-natural",
          },
          index + 1
        )
      ),

      faqs: faqRows.map((faq, index) => ({
        ...faq,
        id: index + 1,
      })),
    });
  } catch (error) {
    console.error(
      "[API SITE] La solicitud no pudo completarse",
      {
        tipo:
          error instanceof Error
            ? error.name
            : typeof error,
      }
    );

    return handleApiError(error);
  }
}
