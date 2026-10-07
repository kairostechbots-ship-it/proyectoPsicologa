import { ApiError } from "../api";
import type { ContactInfo } from "@/types/contact";
export const TIME_ZONE = "America/Mexico_City";
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
export function localParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (key: string) => parts.find((p) => p.type === key)!.value;
  return {
    date: get("year") + "-" + get("month") + "-" + get("day"),
    time: get("hour") + ":" + get("minute"),
  };
}
export function validateSchedule(
  startsAt: Date,
  endsAt: Date,
  contact: ContactInfo,
  now = new Date(),
) {
  if (!Number.isFinite(startsAt.getTime()) || startsAt <= now)
    throw new ApiError(422, "Elige una fecha futura.");
  if (startsAt.getTime() - now.getTime() > 180 * 86400000)
    throw new ApiError(422, "Puedes reservar hasta 180 días por adelantado.");
  if (startsAt.getUTCSeconds() || startsAt.getUTCMilliseconds())
    throw new ApiError(422, "La hora debe tener precisión de minutos.");
  const start = localParts(startsAt),
    end = localParts(endsAt);
  const day = days[new Date(start.date + "T12:00:00Z").getUTCDay()];
  const hours = contact.businessHours.find((h) => h.day === day);
  if (
    start.date !== end.date ||
    !hours?.enabled ||
    start.time < hours.startTime ||
    end.time > hours.endTime
  ) {
    throw new ApiError(422, "La cita está fuera del horario de atención.");
  }
}
