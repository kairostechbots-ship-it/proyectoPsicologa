import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/guard";
import { getActiveGoogleConnection } from "@/lib/google-calendar/calendar";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireUser(["admin"]);

    const connection = await getActiveGoogleConnection();

    return NextResponse.json({
      connected: Boolean(connection),
      googleEmail: connection?.googleEmail ?? null,
      connectedAt: connection?.createdAt ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo consultar Google Calendar." },
      { status: 500 },
    );
  }
}