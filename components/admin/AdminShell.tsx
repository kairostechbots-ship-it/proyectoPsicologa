'use client';

import { useState } from 'react';

import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({
  children,
}: AdminShellProps) {
  /*
   * Menú móvil.
   */
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  /*
   * Sidebar de escritorio.
   *
   * false = 280px
   * true  = 80px
   */
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

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
          setSidebarCollapsed((previous) => !previous)
        }
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
        {/* Header */}

        <AdminHeader
          onOpenMenu={() =>
            setMobileMenuOpen(true)
          }
        />

        {/* Página */}

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
        </main>
      </div>
    </div>
  );
}