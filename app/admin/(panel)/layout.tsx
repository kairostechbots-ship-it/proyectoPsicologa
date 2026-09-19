import type { ReactNode } from 'react';

import { AdminShell } from '@/components/admin/AdminShell';

interface AdminPanelLayoutProps {
  children: ReactNode;
}

export default function AdminPanelLayout({
  children,
}: AdminPanelLayoutProps) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}