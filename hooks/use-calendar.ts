"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/http";
import { reportSave } from "@/components/admin/SaveStatus";
import type { CalendarEvent } from "@/types/calendar";
export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  useEffect(() => {
    const load = () => {
      const now = new Date(),
        from = new Date(now.getFullYear(), now.getMonth() - 3, 1),
        to = new Date(now.getFullYear(), now.getMonth() + 9, 1);
      apiFetch<CalendarEvent[]>(
        "/api/admin/calendar?" +
          new URLSearchParams({
            from: from.toISOString(),
            to: to.toISOString(),
          }),
      )
        .then(setEvents)
        .catch((e) => reportSave(e.message, true));
    };
    load();
    window.addEventListener("appointments_updated", load);
    const interval = setInterval(load, 60000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("appointments_updated", load);
    };
  }, []);
  return events;
}
