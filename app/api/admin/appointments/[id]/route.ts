import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import {
  success,
  handleApiError,
  readJson,
  checkOrigin,
  ApiError,
} from "@/lib/api";
import { requireUser } from "@/lib/auth/guard";
import { appointmentPatchSchema, idSchema } from "@/lib/validators";
import { bookingContext } from "@/lib/appointments";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(request);
    await requireUser(["admin", "receptionist"]);
    const id = idSchema.parse((await params).id),
      input = appointmentPatchSchema.parse(await readJson(request));
    const [current] = await getDb()
      .select()
      .from(appointments)
      .where(eq(appointments.id, id));
    if (!current) throw new ApiError(404, "Cita no encontrada.");
    if (input.status === "pending" || input.status === "confirmed")
      await bookingContext({
        serviceId: current.serviceId,
        startsAt: current.startsAt.toISOString(),
      });
    const [data] = await getDb()
      .update(appointments)
      .set(input)
      .where(eq(appointments.id, id))
      .returning();
    return success(data);
  } catch (e) {
    return handleApiError(e);
  }
}
