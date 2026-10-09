"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/http";
import { reportSave } from "@/components/admin/SaveStatus";

import type { CalendarEvent } from "@/types/calendar";

function getCalendarRange() {
  const now = new Date();

  return {
    from: new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      1,
    ),

    to: new Date(
      now.getFullYear(),
      now.getMonth() + 9,
      1,
    ),
  };
}

function mergeCalendarEvents(
  internalEvents: CalendarEvent[],
  googleEvents: CalendarEvent[],
) {
  /*
   * Más adelante las citas creadas por nuestro sistema
   * también existirán en Google Calendar.
   *
   * Cuando tengan calendarEventId evitaremos mostrarlas
   * dos veces.
   */

  const internalGoogleIds = new Set(
    internalEvents
      .map((event) => event.calendarEventId)
      .filter(
        (id): id is string =>
          Boolean(id),
      ),
  );

  const externalGoogleEvents =
    googleEvents.filter(
      (event) =>
        !event.calendarEventId ||
        !internalGoogleIds.has(
          event.calendarEventId,
        ),
    );

  return [
    ...internalEvents,
    ...externalGoogleEvents,
  ].sort(
    (a, b) =>
      new Date(a.start).getTime() -
      new Date(b.start).getTime(),
  );
}

export function useCalendar() {
  const [events, setEvents] =
    useState<CalendarEvent[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const { from, to } =
          getCalendarRange();

        const query =
          new URLSearchParams({
            from: from.toISOString(),
            to: to.toISOString(),
          }).toString();

        /*
         * Cargamos ambas fuentes en paralelo:
         *
         * 1. Citas internas del sistema.
         * 2. Eventos del Google Calendar conectado.
         */

        const [
          internalEvents,
          googleEvents,
        ] = await Promise.all([
          apiFetch<CalendarEvent[]>(
            `/api/admin/calendar?${query}`,
          ),

          apiFetch<CalendarEvent[]>(
            `/api/admin/google-calendar/events?${query}`,
          ),
        ]);

        if (!mounted) {
          return;
        }

        setEvents(
          mergeCalendarEvents(
            internalEvents,
            googleEvents,
          ),
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "No se pudo cargar la agenda.";

        reportSave(message, true);
      }
    };

    void load();

    window.addEventListener(
      "appointments_updated",
      load,
    );

    const interval = window.setInterval(
      load,
      60_000,
    );

    return () => {
      mounted = false;

      window.clearInterval(interval);

      window.removeEventListener(
        "appointments_updated",
        load,
      );
    };
  }, []);

  return events;
}