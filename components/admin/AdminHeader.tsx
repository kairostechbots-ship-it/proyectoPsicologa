'use client';

import {
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
} from 'lucide-react';

import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { logout, getCurrentUser } from '@/lib/auth';

interface AdminHeaderProps {
  onOpenMenu: () => void;
}

const pageTitles: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  '/admin': {
    title: 'Dashboard',
    description: 'Resumen general de tu sitio web.',
  },
  '/admin/agenda': {
    title: 'Mi agenda',
    description:
      'Consulta tus próximas citas y eventos.',
  },
  '/admin/psicoterapia': {
    title: 'Psicoterapia',
    description:
      'Administra los servicios de psicoterapia.',
  },
  '/admin/promocion': {
    title: 'Promoción',
    description:
      'Administra la promoción disponible en el sitio.',
  },
  '/admin/medicina-natural': {
    title: 'Medicina Natural',
    description:
      'Administra las técnicas y su información.',
  },
  '/admin/faq': {
    title: 'Preguntas frecuentes',
    description:
      'Administra las preguntas y respuestas del sitio.',
  },
  '/admin/perfil': {
    title: 'Perfil profesional',
    description:
      'Administra la información profesional de Erika.',
  },
  '/admin/contacto': {
    title: 'Contacto y horarios',
    description:
      'Administra los datos de contacto y atención.',
  },
};

export function AdminHeader({
  onOpenMenu,
}: AdminHeaderProps) {
  const [account, setAccount] = useState<{name:string;role:string}|null>(null);
  useEffect(() => { getCurrentUser().then(setAccount); }, []);
  const pathname = usePathname();
  const router = useRouter();

  const profileRef =
    useRef<HTMLDivElement>(null);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const currentPage =
    pageTitles[pathname] ??
    pageTitles['/admin'];

  /*
   * =========================================================
   * CERRAR MENÚ AL HACER CLIC FUERA
   * =========================================================
   */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node,
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  /*
   * =========================================================
   * CERRAR MENÚ AL CAMBIAR DE PÁGINA
   * =========================================================
   */

  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setProfileOpen(false);
  }

  /*
   * =========================================================
   * CERRAR SESIÓN
   * =========================================================
   */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logout();

      router.replace('/admin/login');
      router.refresh();
    } catch (error) {
      console.error(
        'No fue posible cerrar la sesión.',
        error,
      );

      setLoggingOut(false);
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-[#A7B89A]/15
        bg-[#FBFAF7]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          min-h-[82px]
          items-center
          justify-between
          gap-4
          px-5

          sm:px-6

          lg:px-8
        "
      >
        {/* ===============================================
            IZQUIERDA
        ================================================ */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-4
          "
        >
          {/* Menú móvil */}

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#A7B89A]/20
              bg-white
              text-[#0F3D4A]

              transition-all
              duration-200

              hover:border-[#A7B89A]/40
              hover:bg-[#F7F5EF]

              lg:hidden
            "
          >
            <Menu
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.6}
            />
          </button>

          {/* Título */}

          <div className="min-w-0">
            <h1
              className="
                truncate
                font-serif
                text-[22px]
                font-medium
                leading-tight
                tracking-[-0.02em]
                text-[#0F3D4A]

                sm:text-[25px]
              "
            >
              {currentPage.title}
            </h1>

            <p
              className="
                mt-1
                hidden
                truncate
                text-[11px]
                text-[#7B8884]

                sm:block
              "
            >
              {currentPage.description}
            </p>
          </div>
        </div>

        {/* ===============================================
            DERECHA
        ================================================ */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          {/* Agenda */}

          <Link
            href="/admin/agenda"
            aria-label="Ir a mi agenda"
            className="
              hidden
              h-10
              items-center
              gap-2
              rounded-xl
              border
              border-[#A7B89A]/20
              bg-white
              px-4
              text-[11px]
              font-semibold
              text-[#52665A]

              transition-all
              duration-200

              hover:border-[#A7B89A]/40
              hover:text-[#0F3D4A]

              sm:flex
            "
          >
            <CalendarDays
              aria-hidden="true"
              className="
                h-4
                w-4
                text-[#B08B28]
              "
              strokeWidth={1.5}
            />

            Mi agenda
          </Link>

          {/* =============================================
              PERFIL
          ============================================== */}

          <div
            ref={profileRef}
            className="
              relative
              border-l
              border-[#A7B89A]/20
              pl-3

              sm:pl-4
            "
          >
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  (current) => !current,
                )
              }
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="
                group
                flex
                items-center
                gap-3
                rounded-xl

                transition-colors
              "
            >
              {/* Nombre */}

              <div
                className="
                  hidden
                  text-right

                  md:block
                "
              >
                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#435D61]
                  "
                >{account?.name ?? 'Mi cuenta'}</p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-[#89938F]
                  "
                >{account?.role === 'admin' ? 'Administración' : account?.role === 'editor' ? 'Edición' : 'Recepción'}</p>
              </div>

              {/* Avatar */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#A7B89A]/20
                  bg-[#A7B89A]/10
                  text-[#52665A]

                  transition-all
                  duration-200

                  group-hover:border-[#A7B89A]/40
                  group-hover:bg-[#A7B89A]/15
                  group-hover:text-[#0F3D4A]
                "
              >
                <UserRound
                  aria-hidden="true"
                  className="
                    h-[18px]
                    w-[18px]
                  "
                  strokeWidth={1.5}
                />
              </div>

              {/* Flecha */}

              <ChevronDown
                aria-hidden="true"
                className={`
                  hidden
                  h-3.5
                  w-3.5
                  text-[#89938F]

                  transition-transform
                  duration-200

                  sm:block

                  ${
                    profileOpen
                      ? 'rotate-180'
                      : ''
                  }
                `}
                strokeWidth={1.5}
              />
            </button>

            {/* ===========================================
                MENÚ PERFIL
            ============================================ */}

            {profileOpen && (
              <div
                role="menu"
                className="
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  z-50
                  w-[210px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#A7B89A]/20
                  bg-white
                  p-2
                  shadow-[0_18px_50px_rgba(15,61,74,0.14)]
                "
              >
                {/* Información */}

                <div
                  className="
                    border-b
                    border-[#A7B89A]/15
                    px-3
                    py-3
                  "
                >
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      text-[#435D61]
                    "
                  >{account?.name ?? 'Mi cuenta'}</p>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      text-[#89938F]
                    "
                  >{account?.role === 'admin' ? 'Administración' : account?.role === 'editor' ? 'Edición' : 'Recepción'}</p>
                </div>

                {/* Cerrar sesión */}

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-[10px]
                    font-medium
                    text-[#7A5656]

                    transition-colors

                    hover:bg-[#B76E6E]/[0.07]
                    hover:text-[#9A5151]

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <LogOut
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      shrink-0
                    "
                    strokeWidth={1.5}
                  />

                  {loggingOut
                    ? 'Cerrando sesión...'
                    : 'Cerrar sesión'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}