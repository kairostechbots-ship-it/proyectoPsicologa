'use client';

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Gift,
  LayoutDashboard,
  Leaf,
  MapPin,
  Stethoscope,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* =========================================================
   TIPOS
========================================================= */

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
  icon: React.ElementType;
  roles?: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

/* =========================================================
   MENÚ
========================================================= */

const menuSections: MenuSection[] = [
  {
    title: 'General',
    items: [
      {
        label: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
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
    title: 'Contenido',
    items: [
      {
        label: 'Psicoterapia',
        href: '/admin/psicoterapia',
        icon: Stethoscope,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Promoción',
        href: '/admin/promocion',
        icon: Gift,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Medicina Natural',
        href: '/admin/medicina-natural',
        icon: Leaf,
        roles: ['admin', 'editor'],
      },
      {
        label: 'Preguntas frecuentes',
        href: '/admin/faq',
        icon: CircleHelp,
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    title: 'Información',
    items: [
      {
        label: 'Perfil profesional',
        href: '/admin/perfil',
        icon: UserRound,
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
  title: 'Cuenta',
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

/* =========================================================
   COMPONENTE
========================================================= */

export function AdminSidebar({
  mobileOpen,
  onClose,
  collapsed,
  onToggleCollapse,
  role,
}: AdminSidebarProps) {
  const pathname = usePathname();

  /* =========================================================
     ESTADO ACTIVO
  ========================================================= */

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }

    return pathname.startsWith(href);
  };

  /* =========================================================
     FILTRAR MENÚ POR ROL
  ========================================================= */

  const visibleSections = menuSections
    .map((section) => ({
      ...section,

      items: section.items.filter((item) => {
        /*
         * Mientras el usuario todavía se está cargando,
         * mostramos únicamente Dashboard.
         */
        if (!role) {
          return item.href === '/admin';
        }

        if (!item.roles) {
          return true;
        }

        return item.roles.includes(role);
      }),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      {/* =====================================================
          OVERLAY MÓVIL
      ====================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-[#071E24]/45
            backdrop-blur-[2px]

            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-[280px]
          flex-col
          bg-[#0F3D4A]
          text-white
          shadow-[10px_0_40px_rgba(15,61,74,0.08)]

          transition-[width,transform]
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          lg:translate-x-0

          ${
            collapsed
              ? 'lg:w-[80px]'
              : 'lg:w-[280px]'
          }
        `}
      >
        {/* ===================================================
            LOGO / PERFIL
        ==================================================== */}

        <div
          className={`
            relative
            flex
            min-h-[92px]
            items-center
            border-b
            border-white/[0.07]

            transition-all
            duration-300

            ${
              collapsed
                ? 'lg:justify-center lg:px-3'
                : 'px-5'
            }
          `}
        >
          {/* Logo + nombre */}

          <Link
            href="/admin"
            onClick={onClose}
            className={`
              flex
              min-w-0
              items-center

              ${
                collapsed
                  ? 'lg:justify-center'
                  : 'gap-3'
              }
            `}
          >
            {/* Logo */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-white
              "
            >
              <Image
                src="/03-isotipo.png"
                alt="Erika Pilar"
                width={44}
                height={44}
                className="
                  h-full
                  w-full
                  object-contain
                  p-1
                "
                priority
              />
            </div>

            {/* Nombre */}

            <div
              className={`
                min-w-0
                transition-all
                duration-200

                ${
                  collapsed
                    ? `
                        lg:pointer-events-none
                        lg:absolute
                        lg:opacity-0
                      `
                    : 'opacity-100'
                }
              `}
            >
              <p
                className="
                  truncate
                  font-serif
                  text-[18px]
                  leading-tight
                  text-white
                "
              >
                Erika Pilar
              </p>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-white/45
                "
              >
                Administradora
              </p>
            </div>
          </Link>

          {/* =================================================
              FLECHA CONTRAER / EXPANDIR
          ================================================== */}

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={
              collapsed
                ? 'Expandir menú'
                : 'Contraer menú'
            }
            title={
              collapsed
                ? 'Expandir menú'
                : 'Contraer menú'
            }
            className={`
              absolute
              top-1/2
              hidden
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.09]
              bg-[#0F3D4A]
              text-white/50
              shadow-[0_4px_14px_rgba(0,0,0,0.10)]

              transition-all
              duration-200

              hover:border-white/[0.16]
              hover:bg-[#174F5D]
              hover:text-[#D8BD66]

              lg:flex

              ${
                collapsed
                  ? '-right-4'
                  : 'right-3'
              }
            `}
          >
            {collapsed ? (
              <ChevronRight
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            ) : (
              <ChevronLeft
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            )}
          </button>

          {/* =================================================
              CERRAR MÓVIL
          ================================================== */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="
              absolute
              right-4
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-white/55

              transition-colors

              hover:bg-white/[0.07]
              hover:text-white

              lg:hidden
            "
          >
            <X
              className="h-[18px] w-[18px]"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* ===================================================
            NAVEGACIÓN
        ==================================================== */}

        <nav
          className={`
            flex-1
            overflow-x-hidden
            overflow-y-auto
            py-5

            transition-all
            duration-300

            ${
              collapsed
                ? 'lg:px-3'
                : 'px-4'
            }
          `}
        >
          <div className="space-y-6">
            {visibleSections.map((section) => (
              <div key={section.title}>
                {/* Título de sección */}

                <div
                  className={`
                    mb-2
                    h-[17px]
                    overflow-hidden

                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? `
                            lg:mb-1
                            lg:h-0
                            lg:opacity-0
                          `
                        : 'opacity-100'
                    }
                  `}
                >
                  <p
                    className="
                      px-3
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    {section.title}
                  </p>
                </div>

                {/* Opciones */}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(
                      item.href,
                    );

                    const Icon = item.icon;

                    return (
                      <div
                        key={item.href}
                        className="relative"
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-label={
                            collapsed
                              ? item.label
                              : undefined
                          }
                          className={`
                            group
                            relative
                            flex
                            min-h-[44px]
                            items-center
                            rounded-xl

                            transition-all
                            duration-200

                            ${
                              collapsed
                                ? `
                                    lg:justify-center
                                    lg:px-0
                                  `
                                : 'gap-3 px-3'
                            }

                            ${
                              active
                                ? `
                                    bg-white/[0.09]
                                    text-white
                                  `
                                : `
                                    text-white/58
                                    hover:bg-white/[0.05]
                                    hover:text-white
                                  `
                            }
                          `}
                        >
                          {/* Indicador activo */}

                          {active && (
                            <span
                              className={`
                                absolute
                                top-1/2
                                h-5
                                w-[2px]
                                -translate-y-1/2
                                rounded-full
                                bg-[#D8BD66]

                                ${
                                  collapsed
                                    ? 'lg:-left-3'
                                    : '-left-4'
                                }
                              `}
                            />
                          )}

                          {/* Icono */}

                          <Icon
                            className={`
                              h-[17px]
                              w-[17px]
                              shrink-0

                              ${
                                active
                                  ? 'text-[#D8BD66]'
                                  : `
                                      text-white/48
                                      group-hover:text-white/80
                                    `
                              }
                            `}
                            strokeWidth={1.5}
                          />

                          {/* Nombre */}

                          <span
                            className={`
                              whitespace-nowrap
                              text-[11px]
                              font-medium

                              transition-all
                              duration-200

                              ${
                                collapsed
                                  ? `
                                      lg:pointer-events-none
                                      lg:absolute
                                      lg:opacity-0
                                    `
                                  : 'opacity-100'
                              }
                            `}
                          >
                            {item.label}
                          </span>

                          {/* =====================================
                              TOOLTIP CUANDO ESTÁ COLAPSADO
                          ====================================== */}

                          {collapsed && (
                            <span
                              className="
                                pointer-events-none
                                absolute
                                left-[58px]
                                top-1/2
                                z-[100]
                                hidden
                                -translate-y-1/2
                                whitespace-nowrap
                                rounded-lg
                                border
                                border-[#A7B89A]/15
                                bg-white
                                px-3
                                py-2
                                text-[10px]
                                font-semibold
                                text-[#435D61]
                                opacity-0
                                shadow-[0_10px_30px_rgba(15,61,74,0.14)]

                                transition-opacity

                                group-hover:opacity-100

                                lg:block
                              "
                            >
                              {item.label}

                              <span
                                className="
                                  absolute
                                  -left-1
                                  top-1/2
                                  h-2
                                  w-2
                                  -translate-y-1/2
                                  rotate-45
                                  border-b
                                  border-l
                                  border-[#A7B89A]/15
                                  bg-white
                                "
                              />
                            </span>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* ===================================================
            PARTE INFERIOR
        ==================================================== */}

        <div
          className={`
            border-t
            border-white/[0.07]
            p-4

            ${
              collapsed
                ? 'lg:px-3'
                : ''
            }
          `}
        >
          {/* Ver sitio web */}

          <Link
            href="/"
            target="_blank"
            aria-label={
              collapsed
                ? 'Ver sitio web'
                : undefined
            }
            className={`
              group
              relative
              flex
              min-h-[42px]
              items-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.03]
              text-white/55

              transition-colors

              hover:bg-white/[0.07]
              hover:text-white

              ${
                collapsed
                  ? `
                      lg:justify-center
                      lg:px-0
                    `
                  : 'gap-3 px-3'
              }
            `}
          >
            <ExternalLink
              className="
                h-4
                w-4
                shrink-0
              "
              strokeWidth={1.5}
            />

            <span
              className={`
                whitespace-nowrap
                text-[10px]
                font-medium

                transition-all
                duration-200

                ${
                  collapsed
                    ? `
                        lg:pointer-events-none
                        lg:absolute
                        lg:opacity-0
                      `
                    : 'opacity-100'
                }
              `}
            >
              Ver sitio web
            </span>

            {/* Tooltip */}

            {collapsed && (
              <span
                className="
                  pointer-events-none
                  absolute
                  left-[58px]
                  top-1/2
                  z-[100]
                  hidden
                  -translate-y-1/2
                  whitespace-nowrap
                  rounded-lg
                  border
                  border-[#A7B89A]/15
                  bg-white
                  px-3
                  py-2
                  text-[10px]
                  font-semibold
                  text-[#435D61]
                  opacity-0
                  shadow-[0_10px_30px_rgba(15,61,74,0.14)]

                  transition-opacity

                  group-hover:opacity-100

                  lg:block
                "
              >
                Ver sitio web
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}