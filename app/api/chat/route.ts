import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { getContent } from "@/lib/content";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { bookingSchema } from "@/lib/validators";
import { createAppointment } from "@/lib/appointments";
import { consumeRateLimit, requestIdentifier } from "@/lib/rate-limit";
const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        content: z.string().trim().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await consumeRateLimit("chat:" + requestIdentifier(request), 30, 3600);
    if (!process.env.GEMINI_API_KEY)
      throw new ApiError(
        503,
        "El chat no está disponible. Puedes contactarnos por WhatsApp.",
      );
    const { messages } = inputSchema.parse(await readJson(request));
    const [catalog, profile, contact] = await Promise.all([
      getDb()
        .select({
          id: services.id,
          name: services.name,
          modality: services.modality,
        })
        .from(services)
        .where(eq(services.active, true))
        .limit(100),
      getContent("profile", true),
      getContent("contact", true),
    ]);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      contents: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction:
          "Eres el asistente del consultorio. Responde en español y ayuda con información y solicitudes de cita. No des diagnósticos ni solicites historias clínicas. Datos actuales: " +
          JSON.stringify({
            profile: profile.data,
            contact: contact.data,
            services: catalog,
          }) +
          ". Hoy es " +
          new Date().toISOString() +
          ". Zona America/Mexico_City. Para solicitar una cita pide nombre, teléfono, servicio, fecha, hora y modalidad. Confirma los datos y pide aceptación antes de llamar bookAppointment. Usa serviceId del catálogo y startsAt ISO con zona -06:00. No inventes datos ni afirmes que guardaste, confirmaste o enviaste recordatorios. La herramienta registra solicitudes pendientes; el consultorio confirma posteriormente.",
        tools: [
          {
            functionDeclarations: [
              {
                name: "bookAppointment",
                description:
                  "Registra una solicitud de cita pendiente después de la aceptación expresa del usuario.",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    phone: { type: Type.STRING },
                    email: { type: Type.STRING },
                    serviceId: { type: Type.STRING },
                    startsAt: { type: Type.STRING },
                    modality: {
                      type: Type.STRING,
                      enum: ["presencial", "online"],
                    },
                  },
                  required: [
                    "name",
                    "phone",
                    "serviceId",
                    "startsAt",
                    "modality",
                  ],
                },
              },
            ],
          },
        ],
      },
    });
    const call = response.functionCalls?.find(
      (c) => c.name === "bookAppointment",
    );
    if (call) {
      const args = call.args ?? {};
      const input = bookingSchema.parse({
        patient: { name: args.name, phone: args.phone, email: args.email },
        serviceId: args.serviceId,
        startsAt: args.startsAt,
        modality: args.modality,
      });
      await consumeRateLimit("booking-phone:" + input.patient.phone, 5, 86400);
      const result = await createAppointment(input);
      return success({
        text:
          "Tu solicitud quedó registrada y está pendiente de confirmación del consultorio. Referencia: " +
          result.appointment.id,
        action: "book_appointment",
        appointmentId: result.appointment.id,
      });
    }
    return success({
      text: response.text || "¿Qué información necesitas del consultorio?",
    });
  } catch (e) {
    return handleApiError(e);
  }
}
