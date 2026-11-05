'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CalendarDays, ChevronDown, LogOut, Menu, UserRound } from 'lucide-react';
import { logout } from '@/lib/auth';

interface AdminHeaderProps {
  onOpenMenu: () => void;
  mobileMenuOpen?: boolean;
  account?: { name: string; role: string } | null;
}

const pages: Record<string, { title: string; description: string }> = {
  '/admin': { title: 'Inicio', description: 'Tu espacio para gestionar el consultorio y la página web.' },
  '/admin/agenda': { title: 'Mi agenda', description: 'Consulta y organiza tus próximas citas.' },
  '/admin/pacientes': { title: 'Pacientes y citas', description: 'Consulta los pacientes registrados y sus citas.' },
  '/admin/psicoterapia': { title: 'Psicoterapia', description: 'Actualiza tus servicios, precios y modalidades.' },
  '/admin/medicina-natural': { title: 'Medicina natural', description: 'Modifica la información de tus técnicas.' },
  '/admin/perfil': { title: 'Sobre mí', description: 'Edita tu presentación y trayectoria profesional.' },
  '/admin/faq': { title: 'Preguntas frecuentes', description: 'Actualiza las respuestas para tus visitantes.' },
  '/admin/promocion': { title: 'Promoción', description: 'Configura la promoción de tu página web.' },
  '/admin/contacto': { title: 'Contacto y horarios', description: 'Revisa teléfono, ubicación y horarios de atención.' },
  '/admin/cuenta': { title: 'Cuenta y seguridad', description: 'Administra los datos de acceso.' },
  '/admin/usuarios': { title: 'Usuarios internos', description: 'Administra los accesos del equipo.' },
};

const roleNames: Record<string, string> = {
  admin: 'Administración',
  editor: 'Edición de contenidos',
  receptionist: 'Recepción',
};

export function AdminHeader({ onOpenMenu, mobileMenuOpen = false, account = null }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const currentPath = Object.keys(pages).sort((a, b) => b.length - a.length)
    .find(path => pathname === path || (path !== '/admin' && pathname.startsWith(`${path}/`)));
  const current = pages[currentPath ?? '/admin'];
  const canSeeAgenda = account?.role === 'admin' || account?.role === 'receptionist';
  const roleLabel = account?.role ? (roleNames[account.role] ?? 'Mi cuenta') : 'Mi cuenta';

  useEffect(() => { setProfileOpen(false); setLogoutError(''); }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    const closeOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false);
    };
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        profileButtonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('mousedown', closeOutside);
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [profileOpen]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError('');
    try {
      await logout();
      router.replace('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('No fue posible cerrar la sesión.', error);
      setLogoutError('No se pudo cerrar sesión. Inténtalo otra vez.');
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#A7B89A]/25 bg-[#FBFAF7]/95 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[84px] lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button type="button" onClick={onOpenMenu} aria-label="Abrir menú" aria-expanded={mobileMenuOpen}
            aria-controls="admin-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#A7B89A]/35 bg-white text-[#0F3D4A] hover:bg-[#E9EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F4A55] lg:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-[#80651D] sm:block">Panel de administración</p>
            <p className="truncate font-serif text-[23px] leading-tight text-[#0F3D4A] sm:mt-0.5 sm:text-[27px]">{current.title}</p>
            <p className="mt-1 hidden truncate text-xs text-[#526368] xl:block">{current.description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {canSeeAgenda && pathname !== '/admin/agenda' && (
            <Link href="/admin/agenda" className="hidden min-h-11 items-center gap-2 rounded-xl border border-[#A7B89A]/35 bg-white px-4 text-sm font-medium text-[#0F3D4A] hover:bg-[#E9EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F4A55] sm:inline-flex">
              <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
              Mi agenda
            </Link>
          )}

          <div ref={profileRef} className="relative">
            <button ref={profileButtonRef} type="button" aria-label="Opciones de mi cuenta" aria-haspopup="true"
              aria-controls="admin-account-options" aria-expanded={profileOpen} onClick={() => setProfileOpen(open => !open)}
              className="flex min-h-11 items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-[#E9EFE9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F4A55] sm:gap-3 sm:px-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9EFE9] text-[#0F3D4A]">
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="hidden max-w-[150px] text-left md:block">
                <span className="block truncate text-sm font-semibold text-[#0F3D4A]">{account?.name ?? 'Mi cuenta'}</span>
                <span className="block truncate text-xs text-[#526368]">{roleLabel}</span>
              </span>
              <ChevronDown className={`hidden h-4 w-4 text-[#526368] transition-transform sm:block ${profileOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {profileOpen && (
              <div id="admin-account-options" className="absolute right-0 top-[calc(100%+10px)] z-50 w-[260px] max-w-[calc(100vw-32px)] rounded-2xl border border-[#A7B89A]/35 bg-white p-2 shadow-[0_18px_50px_rgba(24,67,57,0.14)]">
                <div className="border-b border-[#A7B89A]/20 px-3 py-3">
                  <p className="break-words text-sm font-semibold text-[#0F3D4A]">{account?.name ?? 'Mi cuenta'}</p>
                  <p className="mt-1 text-xs text-[#526368]">{roleLabel}</p>
                </div>
                <button type="button" disabled={loggingOut} onClick={handleLogout}
                  className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-[#96524D] hover:bg-[#FFF3F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F4A55] disabled:cursor-not-allowed disabled:opacity-50">
                  <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
                  {loggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
                </button>
                {logoutError && <p role="alert" className="px-3 py-2 text-xs leading-5 text-[#96524D]">{logoutError}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
