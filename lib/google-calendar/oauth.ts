import { google } from "googleapis";

export const GOOGLE_CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.calendarlist.readonly",
];

export function getGoogleOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALENDAR_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "Faltan variables de entorno para Google Calendar.",
    );
  }

  return new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri,
  );
}

export function getGoogleAuthorizationUrl(state: string) {
  const oauth = getGoogleOAuthClient();

  return oauth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_CALENDAR_SCOPES,
    state,
  });
}