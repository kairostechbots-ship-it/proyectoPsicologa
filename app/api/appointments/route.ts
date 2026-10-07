import { success, handleApiError, readJson, checkOrigin } from "@/lib/api";
import { bookingSchema } from "@/lib/validators";
import { createAppointment } from "@/lib/appointments";
import { consumeRateLimit, requestIdentifier } from "@/lib/rate-limit";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await consumeRateLimit(
      "booking-ip:" + requestIdentifier(request),
      10,
      3600,
    );
    const input = bookingSchema.parse(await readJson(request));
    await consumeRateLimit("booking-phone:" + input.patient.phone, 5, 86400);
    const result = await createAppointment(input);
    return success(
      {
        id: result.appointment.id,
        status: result.appointment.status,
        startsAt: result.appointment.startsAt,
        emailNotification: result.emailNotification,
      },
      201,
    );
  } catch (e) {
    return handleApiError(e);
  }
}
