import { Resend } from "resend";
export async function notifyAppointment(input: {
  id: string;
  email?: string | null;
  startsAt: Date;
}) {
  const key = process.env.RESEND_API_KEY,
    from = process.env.RESEND_FROM,
    to = process.env.CLINIC_NOTIFICATION_EMAIL;
  if (!key || !from || !to) return { status: "not_configured" as const };
  try {
    const result = await new Resend(key).emails.send(
      {
        from,
        to,
        subject: "Nueva solicitud de cita",
        text:
          "Se recibió una solicitud de cita para " +
          input.startsAt.toISOString() +
          ". Referencia: " +
          input.id +
          ". Consulta los detalles en el panel privado.",
      },
      { idempotencyKey: "appointment-" + input.id },
    );
    return { status: result.error ? ("failed" as const) : ("sent" as const) };
  } catch {
    return { status: "failed" as const };
  }
}
