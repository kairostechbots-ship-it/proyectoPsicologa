import { z } from "zod";

import { requireUser } from "@/lib/auth/guard";
import { handleApiError, success } from "@/lib/api";
import { getAuthorizedGoogleCalendar } from "@/lib/google-calendar/calendar";

import type {
  CalendarEvent,
  CalendarEventType,
} from "@/types/calendar";

export const runtime = "nodejs";

const querySchema = z
  .object({
    from: z.iso.datetime({ offset: true }),
    to: z.iso.datetime({ offset: true }),
  })
  .refine(
    ({ from, to }) => {
      const start = new Date(from);
      const end = new Date(to);

      return (
        end > start &&
        end.getTime() - start.getTime() <=
          366 * 24 * 60 * 60 * 1000
      );
    },
    {
      message: "El rango máximo permitido es de un año.",
    },
  );

function getEventType(
  event: {
    location?: string | null;
    hangoutLink?: string | null;
  },
): CalendarEventType {
  if (event.hangoutLink) {
    return "online";
  }

  if (event.location) {
    return "presencial";
  }

  return "otro";
}

export async function GET(request: Request) {
  try {
    await requireUser(["admin", "receptionist"]);

    const params = querySchema.parse(
      Object.fromEntries(
        new URL(request.url).searchParams,
      ),
    );

    const googleCalendar =
      await getAuthorizedGoogleCalendar();

    /*
     * Si todavía no existe una cuenta conectada,
     * simplemente devolvemos una agenda de Google vacía.
     */
    if (!googleCalendar) {
      return success([]);
    }

    const { calendar, connection } = googleCalendar;

    const response = await calendar.events.list({
      calendarId: connection.calendarId,
      timeMin: params.from,
      timeMax: params.to,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 2500,
    });

    const events: CalendarEvent[] = (
      response.data.items ?? []
    )
      .filter(
        (event) =>
          event.status !== "cancelled" &&
          event.id &&
          event.start &&
          event.end,
      )
      .map((event) => {
        const allDay =
          Boolean(event.start?.date) &&
          !event.start?.dateTime;

        const start =
          event.start?.dateTime ??
          event.start?.date ??
          "";

        const end =
          event.end?.dateTime ??
          event.end?.date ??
          "";

        return {
          id: `google:${event.id}`,
          calendarEventId: event.id ?? undefined,

          title:
            event.summary?.trim() ||
            "Evento de Google Calendar",

          start,
          end,

          type: getEventType({
            location: event.location,
            hangoutLink: event.hangoutLink,
          }),

          location:
            event.location ?? undefined,

          description:
            event.description ?? undefined,

          meetingUrl:
            event.hangoutLink ?? undefined,

          allDay,
        };
      });

    return success(events);
  } catch (error) {
    return handleApiError(error);
  }
}