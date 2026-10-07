import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireUser } from "@/lib/auth/guard";
import { ApiError } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    await requireUser();
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) redirect("/admin/login");
    throw e;
  }
  return <AdminShell>{children}</AdminShell>;
}
