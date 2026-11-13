
import { eq, asc } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { services, faqs } from "@/lib/db/schema";
import { getContent } from "@/lib/content";
import { success, handleApiError, ApiError } from "@/lib/api";
import { serviceView } from "@/lib/service-view";

/* =========================================================
   DIAGNÓSTICO SEGURO
========================================================= */

function obtenerCodigo(valor: unknown): string | null {
  if (
    valor &&
    typeof valor === "object" &&
    "code" in valor &&
    typeof valor.code === "string"
  ) {
    return valor.code;
  }

  return null;
}

function obtenerCausa(valor: unknown): unknown {
  if (
    valor &&
    typeof valor === "object" &&
    "cause" in valor
  ) {
    return valor.cause;
  }

  return undefined;
}

function obtenerSourceError(valor: unknown): unknown {
  if (
    valor &&
    typeof valor === "object" &&
    "sourceError" in valor
  ) {
    return valor.sourceError;
  }

  return undefined;
}

function clasificarError(valor: unknown): string | null {
  if (!(valor instanceof Error)) return null;

  const mensaje = valor.message.toLowerCase();

  if (
    mensaje.includes("fetch failed") ||
    mensaje.includes("failed to fetch")
  ) {
    return "FETCH_FAILED";
  }

  if (
    mensaje.includes("authentication failed") ||
    mensaje.includes("password authentication")
  ) {
    return "AUTH_FAILED";
  }

  if (
    mensaje.includes("relation") &&
    mensaje.includes("does not exist")
  ) {
    return "RELATION_NOT_FOUND";
  }

  if (
    mensaje.includes("column") &&
    mensaje.includes("does not exist")
  ) {
    return "COLUMN_NOT_FOUND";
  }

  if (
    mensaje.includes("connection") ||
    mensaje.includes("connect")
  ) {
    return "CONNECTION_ERROR";
  }

  if (mensaje.includes("timeout")) {
    return "TIMEOUT";
  }

  return "OTRO_ERROR";
}

function obtenerDiagnostico(error: unknown) {
  const causa = obtenerCausa(error);
  const sourceError = obtenerSourceError(causa);
  const causaInterna = obtenerCausa(sourceError);

  return {
    tipo: error instanceof Error ? error.name : typeof error,
    codigo: obtenerCodigo(error),
    clasificacion: clasificarError(error),

    causaTipo:
      causa instanceof Error ? causa.name : typeof causa,
    causaCodigo: obtenerCodigo(causa),
    causaClasificacion: clasificarError(causa),

    sourceErrorTipo:
      sourceError instanceof Error
        ? sourceError.name
        : typeof sourceError,
    sourceErrorCodigo: obtenerCodigo(sourceError),
    sourceErrorClasificacion: clasificarError(sourceError),

    causaInternaCodigo: obtenerCodigo(causaInterna),
    causaInternaClasificacion:
      clasificarError(causaInterna),
  };
}

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
      diagnosticar("contact", () =>
        getContent("contact", true)
      ),

      diagnosticar("profile", () =>
        getContent("profile", true)
      ),

      diagnosticar("natural-medicine", () =>
        getContent("natural-medicine", true)
      ),

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

      diagnosticar("services", async () =>
        getDb()
          .select()
          .from(services)
          .where(eq(services.active, true))
          .orderBy(asc(services.displayOrder))
          .limit(100)
      ),

      diagnosticar("faqs", async () =>
        getDb()
          .select()
          .from(faqs)
          .where(eq(faqs.active, true))
          .orderBy(asc(faqs.displayOrder))
          .limit(100)
      ),
    ]);

    const respuesta = {
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

    console.info("[API SITE] Consultas completadas", {
      servicios: serviceRows.length,
      preguntasFrecuentes: faqRows.length,
    });

    return success(respuesta);
  } catch (error) {
    console.error(
      "[API SITE] Solicitud fallida",
      obtenerDiagnostico(error)
    );

    return handleApiError(error);
  }
}
