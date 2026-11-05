
'use client';

import { useEffect, useRef, type ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Gift,
  House,
  Leaf,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  role: string | null;
}

interface MenuItem {
  label: string;
  href: string;
  icon: ElementType;
  roles: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'MI ESPACIO',
    items: [
      {
        label: 'Inicio',
        href: '/admin',
        icon: House,
        roles: ['admin', 'editor', 'receptionist'],
      },
      {
        label: 'Mi agenda',
        href: '/admin/agenda',
        icon: CalendarDays,
        roles: ['admin', 'receptionist'],
      },
      {
        label: 'Pacientes y citas',
        href: '/admin/pacientes',
        icon: Users,
        roles: ['admin', 'receptionist'],
      },
    ],
  },
  {
    title: 'MI PÁGINA WEB',
    items: [
      {
        label: 'Psicoterapia',
        href: '/admin/psicoterapia',
        icon: Stethoscope,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Medicina natural',
        href: '/admin/medicina-natural',
        icon: Leaf,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Sobre mí',
        href: '/admin/perfil',
        icon: UserRound,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Preguntas frecuentes',
        href: '/admin/faq',
        icon: CircleHelp,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Promoción',
        href: '/admin/promocion',
        icon: Gift,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Contacto y horarios',
        href: '/admin/contacto',
        icon: MapPin,
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    title: 'CONFIGURACIÓN',
    items: [
      {
        label: 'Cuenta y seguridad',
        href: '/admin/cuenta',
        icon: ShieldCheck,
        roles: ['admin'],
      },
    ],
  },
];

const focusClasses =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#D8BD66] focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[#0F3D4A]';

export function AdminSidebar({
  mobileOpen,
  onClose,
  collapsed,
  onToggleCollapse,
  role,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sidebarRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Evitar que el menú móvil cerrado reciba foco.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');

    const sync = () => {
      if (sidebarRef.current) {
        sidebarRef.current.inert =
          !media.matches && !mobileOpen;
      }
    };

    sync();
    media.addEventListener('change', sync);

    return () => {
      media.removeEventListener('change', sync);
    };
  }, [mobileOpen]);

  // Accesibilidad y control del menú móvil.
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    const media = window.matchMedia('(min-width: 1024px)');

    if (!media.matches) {
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    }

    const handleKey = (event: KeyboardEvent) => {
      if (media.matches) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const elements = Array.from(
        sidebarRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      ).filter((element) => element.getClientRects().length > 0);

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleResize = () => {
      document.body.style.overflow = media.matches
        ? oldOverflow
        : 'hidden';
    };

    document.addEventListener('keydown', handleKey);
    media.addEventListener('change', handleResize);

    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKey);
      media.removeEventListener('change', handleResize);
      previous?.focus();
    };
  }, [mobileOpen, onClose]);

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const visibleSections = menuSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!role) {
          return item.href === '/admin';
        }

        return item.roles.includes(role);
      }),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      {/* FONDO OSCURO EN MÓVIL */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#071E24]/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* MENÚ LATERAL */}
      <aside
        ref={sidebarRef}
        id="admin-navigation"
        aria-label="Menú de administración"
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] max-w-[calc(100vw-24px)]
          flex-col
          bg-[#0F3D4A] text-white
          shadow-[10px_0_40px_rgba(15,61,74,0.12)]
          transition-[width,transform] duration-300 ease-in-out
          motion-reduce:transition-none
          lg:translate-x-0

          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}

          ${
            collapsed
              ? 'lg:w-[80px]'
              : 'lg:w-[280px]'
          }
        `}
      >
        {/* LOGOTIPO */}
        <div
          className={`
            relative flex min-h-[94px] shrink-0
            items-center border-b border-white/10
            px-5
            ${collapsed ? 'lg:justify-center lg:px-3' : ''}
          `}
        >
          <Link
            href="/admin"
            onClick={onClose}
            title={collapsed ? 'Ir al inicio' : undefined}
            className={`
              flex min-w-0 items-center gap-3 rounded-xl
              ${focusClasses}
            `}
          >
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                overflow-hidden rounded-2xl
                bg-[#FBFAF7] p-1
              "
            >
              <Image
                src="/03-isotipo.png"
                alt="Erika Pilar"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div
              className={`
                min-w-0
                ${collapsed ? 'lg:hidden' : ''}
              `}
            >
              <p className="truncate font-serif text-[21px] leading-tight text-white">
                Erika Pilar
              </p>

              <p className="mt-1 text-[11px] font-medium tracking-wide text-[#C5D4D2]">
                Mi espacio de trabajo
              </p>
            </div>
          </Link>

          {/* CONTRAER MENÚ */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={
              collapsed ? 'Expandir menú' : 'Contraer menú'
            }
            title={
              collapsed ? 'Expandir menú' : 'Contraer menú'
            }
            className={`
              absolute top-1/2 hidden h-8 w-8
              -translate-y-1/2 items-center justify-center
              rounded-full border border-white/20
              bg-[#174F5D] text-white
              transition-colors hover:bg-[#286476]
              lg:flex
              ${focusClasses}
              ${collapsed ? '-right-4' : 'right-2'}
            `}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* CERRAR EN MÓVIL */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className={`
              absolute right-4 top-1/2 flex h-10 w-10
              -translate-y-1/2 items-center justify-center
              rounded-xl text-white
              hover:bg-white/10
              lg:hidden
              ${focusClasses}
            `}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* NAVEGACIÓN */}
        <nav
          aria-label="Secciones del administrador"
          className={`
            min-h-0 flex-1 overflow-x-hidden
            overflow-y-auto py-6
            ${collapsed ? 'px-3' : 'px-3'}
          `}
        >
          <div className="space-y-7">
            {visibleSections.map((section) => (
              <div key={section.title}>
                {/* TÍTULO DEL GRUPO */}
                <p
                  className={`
                    mb-3 px-3 text-[11px] font-bold
                    uppercase tracking-[0.15em]
                    text-[#C5D4D2]
                    ${collapsed ? 'lg:hidden' : ''}
                  `}
                >
                  {section.title}
                </p>

                <div className="space-y-1.5">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        title={
                          collapsed ? item.label : undefined
                        }
                        aria-label={
                          collapsed ? item.label : undefined
                        }
                        aria-current={
                          active ? 'page' : undefined
                        }
                        className={`
                          group relative flex min-h-[48px]
                          items-center gap-3 rounded-xl
                          px-3 py-2.5
                          text-[14px] font-medium
                          transition-colors duration-200
                          ${focusClasses}

                          ${
                            collapsed
                              ? 'lg:justify-center lg:px-0'
                              : ''
                          }

                          ${
                            active
                              ? `
                                bg-[#E9EEE7]
                                !text-[#0F3D4A]
                                shadow-sm
                              `
                              : `
                                bg-transparent
                                !text-[#E4EDEB]
                                hover:bg-[#FBFAF7]
                                hover:!text-[#0F3D4A]
                                focus-visible:bg-[#FBFAF7]
                                focus-visible:!text-[#0F3D4A]
                              `
                          }
                        `}
                      >
                        {/* ICONO */}
                        <Icon
                          aria-hidden="true"
                          strokeWidth={1.8}
                          className={`
                            h-[19px] w-[19px] shrink-0
                            transition-colors duration-200

                            ${
                              active
                                ? 'text-[#B08B28]'
                                : `
                                  text-[#C5D4D2]
                                  group-hover:text-[#0F3D4A]
                                  group-focus-visible:text-[#0F3D4A]
                                `
                            }
                          `}
                        />

                        {/* TEXTO */}
                        <span
                          className={`
                            min-w-0 flex-1
                            whitespace-nowrap
                            ${collapsed ? 'lg:hidden' : ''}
                          `}
                        >
                          {item.label}
                        </span>

                        {/* INDICADOR ACTIVO */}
                        {active && (
                          <span
                            aria-hidden="true"
                            className={`
                              h-1.5 w-1.5 shrink-0
                              rounded-full bg-[#B08B28]
                              ${collapsed ? 'lg:hidden' : ''}
                            `}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* PARTE INFERIOR */}
        <div className="shrink-0 space-y-3 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title={
              collapsed ? 'Ver mi página web' : undefined
            }
            aria-label={
              collapsed ? 'Ver mi página web' : undefined
            }
            className={`
              group flex min-h-[48px] items-center
              gap-3 rounded-xl border border-white/15
              bg-white/10 px-3 py-2.5
              text-sm font-semibold
              !text-white
              transition-colors duration-200
              hover:bg-[#FBFAF7]
              hover:!text-[#0F3D4A]
              focus-visible:bg-[#FBFAF7]
              focus-visible:!text-[#0F3D4A]
              ${collapsed ? 'lg:justify-center lg:px-0' : ''}
              ${focusClasses}
            `}
          >
            <ExternalLink
              aria-hidden="true"
              className="
                h-5 w-5 shrink-0 text-white
                group-hover:text-[#0F3D4A]
                group-focus-visible:text-[#0F3D4A]
              "
            />

            <span
              className={`
                whitespace-nowrap
                ${collapsed ? 'lg:hidden' : ''}
              `}
            >
              Ver mi página web
            </span>
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            className={`
              hidden min-h-[40px] w-full items-center
              gap-3 rounded-xl px-3
              text-sm text-[#C5D4D2]
              transition-colors
              hover:bg-white/10 hover:text-white
              lg:flex
              ${collapsed ? 'lg:justify-center lg:px-0' : ''}
              ${focusClasses}
            `}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronLeft className="h-4 w-4 shrink-0" />
            )}

            {!collapsed && <span>Ocultar menú</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
