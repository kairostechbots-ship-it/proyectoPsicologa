import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/guard";
import { getGoogleAuthorizationUrl } from "@/lib/google-calendar/oauth";

export const runtime = "nodejs";

export async function POST() {
  try {
    await requireUser(["admin"]);

    const state = randomBytes(32).toString("hex");

    const authorizationUrl = getGoogleAuthorizationUrl(state);

    const response = NextResponse.json({
      success: true,
      url: authorizationUrl,
    });

    response.cookies.set("google_calendar_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/admin/google-calendar",
      maxAge: 600,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "No se pudo iniciar la conexión con Google." },
      { status: 500 },
    );
  }
}