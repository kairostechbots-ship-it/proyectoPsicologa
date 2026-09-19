import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { BusinessHours } from "@/types/contact"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* =========================================================
   BUSINESS HOURS
========================================================= */

export function formatBusinessTime(time: string) {
  if (!time) return ""

  const [hours, minutes] = time.split(":").map(Number)

  const period = hours >= 12 ? "pm" : "am"
  const formattedHours = hours % 12 || 12

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`
}

export function getBusinessHoursText(
  businessHours: BusinessHours[],
) {
  const enabledDays = [...businessHours]
    .filter((item) => item.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  if (enabledDays.length === 0) {
    return "Horario por confirmar"
  }

  const firstDay = enabledDays[0]
  const lastDay = enabledDays[enabledDays.length - 1]

  const sameSchedule = enabledDays.every(
    (item) =>
      item.startTime === firstDay.startTime &&
      item.endTime === firstDay.endTime,
  )

  if (!sameSchedule) {
    return "Consulta los horarios disponibles por WhatsApp"
  }

  const dayText =
    enabledDays.length === 1
      ? firstDay.day
      : `${firstDay.day} a ${lastDay.day}`

  return `${dayText} · ${formatBusinessTime(
    firstDay.startTime,
  )} a ${formatBusinessTime(firstDay.endTime)}`
}