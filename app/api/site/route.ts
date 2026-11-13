
import { eq, asc } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { services, faqs } from "@/lib/db/schema";
import { getContent } from "@/lib/content";
import { success, handleApiError, ApiError } from "@/lib/api";
import { serviceView } from "@/lib/service-view";

/* =========================================================
   DIAGNÓSTICO DE ERRORES
   ========================================================= */

/**
 * Obtiene el código de error sin exponer información
 * sensible de la base de datos.
 */
function obtenerCodigo(error: unknown): string | null {
  if (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return null;
}

/**
 * Extrae información segura del error y sus causas.
 *
 * No registra:
 * - Contraseñas
 * - DATABASE_URL
 * - Consultas SQL completas
 * - Información de pacientes
 * - Tokens de autenticación
 */
function obtenerDiagnostico(error: unknown) {
  const principal =
    error instanceof Error ? error : null;

  const causa = principal?.cause;

  const causaInterna =
    causa instanceof Error ? causa.cause : undefined;

  return {
    tipo: principal?.name ?? typeof error,

    codigo: obtenerCodigo(error),

    causaTipo:
      causa instanceof Error
        ? causa.name
        : causa === null || causa === undefined
          ? null
          : typeof causa,

    causaCodigo: obtenerCodigo(causa),

    causaInternaTipo:
      causaInterna instanceof Error
        ? causaInterna.name
        : causaInterna === null || causaInterna === undefined
          ? null
          : typeof causaInterna,

    causaInternaCodigo: obtenerCodigo(causaInterna),
  };
}

/**
 * Ejecuta una operación e identifica si falla.
 *
 * Conserva el resultado original.
 * No modifica los datos ni las consultas.
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
    console.error(`[API SITE] ERROR: ${nombre}`, {
      ...obtenerDiagnostico(error),
      duracionMs: Date.now() - inicio,
    });

    throw error;
  }
}

/* =========================================================
   GET /api/site
   ========================================================= */

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
      /* CONTACTO */
      diagnosticar("contact", () =>
        getContent("contact", true)
      ),

      /* PERFIL PROFESIONAL */
      diagnosticar("profile", () =>
        getContent("profile", true)
      ),

      /* MEDICINA NATURAL */
      diagnosticar("natural-medicine", () =>
        getContent("natural-medicine", true)
      ),

      /* PROMOCIÓN */
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

      /* SERVICIOS */
      diagnosticar("services", async () => {
        const db = getDb();

        return db
          .select()
          .from(services)
          .where(eq(services.active, true))
          .orderBy(asc(services.displayOrder))
          .limit(100);
      }),

      /* PREGUNTAS FRECUENTES */
      diagnosticar("faqs", async () => {
        const db = getDb();

        return db
          .select()
          .from(faqs)
          .where(eq(faqs.active, true))
          .orderBy(asc(faqs.displayOrder))
          .limit(100);
      }),
    ]);

    /* =====================================================
       RESPUESTA ORIGINAL DEL SITIO
       ===================================================== */

    const response = {
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
    };

    console.info(
      "[API SITE] Respuesta construida correctamente",
      {
        totalServicios: serviceRows.length,
        totalFaqs: faqRows.length,
      }
    );

    return success(response);
  } catch (error) {
    console.error(
      "[API SITE] La solicitud no pudo completarse",
      obtenerDiagnostico(error)
    );

    return handleApiError(error);
  }
}
