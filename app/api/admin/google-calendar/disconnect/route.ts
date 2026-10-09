import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { requireUser } from "@/lib/auth/guard";
import { getDb } from "@/lib/db";
import { googleCalendarConnections } from "@/lib/db/schema";

export const runtime = "nodejs";

export async function POST() {
  try {
    await requireUser(["admin"]);

    await getDb()
      .delete(googleCalendarConnections)
      .where(eq(googleCalendarConnections.active, true));

    return NextResponse.json({
      success: true,
      connected: false,
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo desconectar Google Calendar." },
      { status: 500 },
    );
  }
}