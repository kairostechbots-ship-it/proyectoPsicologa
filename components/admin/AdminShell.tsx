'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { apiFetch } from '@/lib/http';
import { SaveStatus } from './SaveStatus';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminShellProps { children: ReactNode; }
interface CurrentUser { name: string; role: string; }

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    let active = true;
    apiFetch<CurrentUser>('/api/auth/me')
      .then(currentUser => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); });
    return () => { active = false; };
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#37454A]">
      <a href="#admin-main" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-[#0F3D4A] shadow-lg focus:not-sr-only">
        Ir al contenido
      </a>
      <AdminSidebar
        mobileOpen={mobileMenuOpen}
        onClose={closeMenu}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(previous => !previous)}
        role={user?.role ?? null}
      />
      <div className={`min-h-screen min-w-0 transition-[padding] duration-300 ease-in-out motion-reduce:transition-none ${sidebarCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`}>
        <AdminHeader
          onOpenMenu={() => setMobileMenuOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          account={user}
        />
        <main id="admin-main" tabIndex={-1} className="mx-auto w-full max-w-[1500px] scroll-mt-28 px-4 py-6 focus:outline-none sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          {children}
          <SaveStatus />
        </main>
      </div>
    </div>
  );
}
