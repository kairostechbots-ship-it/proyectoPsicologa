'use client';

import { useEffect, useState } from 'react';

import { apiFetch } from '@/lib/http';

import { SaveStatus } from './SaveStatus';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminShellProps {
  children: React.ReactNode;
}

interface CurrentUser {
  name: string;
  role: string;
}

export function AdminShell({
  children,
}: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  /* =========================================================
     USUARIO AUTENTICADO
  ========================================================= */

  useEffect(() => {
    apiFetch<CurrentUser>('/api/auth/me')
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F2]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() =>
          setSidebarCollapsed(
            (previous) => !previous,
          )
        }
        role={user?.role ?? null}
      />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div
        className={`
          min-h-screen

          transition-[padding]
          duration-300
          ease-in-out

          ${
            sidebarCollapsed
              ? 'lg:pl-[80px]'
              : 'lg:pl-[280px]'
          }
        `}
      >
        <AdminHeader
          onOpenMenu={() =>
            setMobileMenuOpen(true)
          }
        />

        <main
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-5
            py-7

            sm:px-6
            sm:py-8

            lg:px-8
            lg:py-9
          "
        >
          {children}

          <SaveStatus />
        </main>
      </div>
    </div>
  );
}