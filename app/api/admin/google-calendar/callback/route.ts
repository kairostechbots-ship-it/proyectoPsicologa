import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { google } from "googleapis";

import { getDb } from "@/lib/db";
import { googleCalendarConnections } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth/guard";

import { encryptToken } from "@/lib/google-calendar/crypto";
import { getGoogleOAuthClient } from "@/lib/google-calendar/oauth";

export const runtime = "nodejs";

function redirectToAgenda(
  request: NextRequest,
  result: string,
) {
  const url = new URL("/admin/agenda", request.url);

  url.searchParams.set("googleCalendar", result);

  const response = NextResponse.redirect(url);

  response.cookies.delete("google_calendar_oauth_state");

  return response;
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser(["admin"]);

    const params = request.nextUrl.searchParams;

    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    const cookieStore = await cookies();

    const storedState = cookieStore.get(
      "google_calendar_oauth_state",
    )?.value;

    if (error || !code || !state || !storedState) {
      return redirectToAgenda(request, "error");
    }

    if (state !== storedState) {
      return redirectToAgenda(request, "invalid_state");
    }

    const oauth = getGoogleOAuthClient();

    const { tokens } = await oauth.getToken(code);

    if (!tokens.refresh_token) {
      return redirectToAgenda(request, "missing_refresh_token");
    }

    oauth.setCredentials(tokens);

    const calendar = google.calendar({
      version: "v3",
      auth: oauth,
    });

    const calendarInfo = await calendar.calendarList.get({
      calendarId: "primary",
    });

    const googleEmail =
      calendarInfo.data.id ?? null;

    const db = getDb();

    // Desactivamos conexiones anteriores para que sólo
    // la conexión recién autorizada quede activa.
    await db
      .update(googleCalendarConnections)
      .set({
        active: false,
        updatedAt: new Date(),
      });

    await db.insert(googleCalendarConnections).values({
      userId: user.id,
      googleEmail,
      calendarId: "primary",
      refreshToken: encryptToken(tokens.refresh_token),
      active: true,
    });

    return redirectToAgenda(request, "connected");
  } catch (error) {
    console.error("Google Calendar OAuth callback:", error);

    return redirectToAgenda(request, "error");
  }
}