import {
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Monitor,
  Navigation,
  Users,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  variant?: 'light' | 'dark';
}

const whatsappNumber = '523311393410';

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.'
)}`;

const mapsUrl = 'https://maps.app.goo.gl/pWGLETvUZ9ChCHft8';

const footerLinks = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Sobre mí',
    href: '/quien-soy',
  },
  {
    name: 'Psicoterapia',
    href: '/servicios',
  },
  {
    name: 'Medicina Natural',
    href: '/medicina-natural',
  },
  {
    name: 'Preguntas frecuentes',
    href: '/faq',
  },
  {
    name: 'Contacto',
    href: '/contacto',
  },
];

const modalities = [
  {
    name: 'Terapia presencial',
    icon: HeartHandshake,
  },
  {
    name: 'Terapia en línea',
    icon: Monitor,
  },
  {
    name: 'Terapia de pareja',
    icon: Users,
  },
];

export function Footer({
  variant = 'dark',
}: FooterProps) {
  const isDark = variant === 'dark';

  const footerBackground = isDark
    ? 'bg-[#0F3D4A] text-white'
    : 'bg-[#F7F5EF] text-[#66787C] border-t border-[#A7B89A]/20';

  const headingColor = isDark
    ? 'text-[#D8BD66]'
    : 'text-[#9B7A1F]';

  const bodyColor = isDark
    ? 'text-white/60'
    : 'text-[#66787C]';

  const secondaryColor = isDark
    ? 'text-white/35'
    : 'text-[#82918B]';

  const strongColor = isDark
    ? 'text-white/85'
    : 'text-[#435D61]';

  const borderColor = isDark
    ? 'border-white/10'
    : 'border-[#A7B89A]/25';

  const iconCircle = isDark
    ? 'border-white/10 bg-white/[0.04] text-[#A7B89A]'
    : 'border-[#A7B89A]/20 bg-[#A7B89A]/[0.10] text-[#597060]';

  const hoverColor = isDark
    ? 'hover:text-white'
    : 'hover:text-[#0F4A55]';

  return (
    <footer
      className={`
        relative
        overflow-hidden
        ${footerBackground}
      `}
    >
      {/* =====================================================
          DECORACIÓN
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Círculo inferior izquierdo */}
        <div
          className={`
            absolute
            -bottom-[280px]
            -left-[230px]
            h-[500px]
            w-[500px]
            rounded-full
            border

            ${
              isDark
                ? 'border-white/[0.04]'
                : 'border-[#A7B89A]/10'
            }
          `}
        />

        {/* Círculo superior derecho */}
        <div
          className={`
            absolute
            -right-[170px]
            -top-[220px]
            h-[380px]
            w-[380px]
            rounded-full
            border

            ${
              isDark
                ? 'border-[#D4AF37]/[0.06]'
                : 'border-[#D4AF37]/[0.08]'
            }
          `}
        />

        {/* Punto dorado */}
        <span
          className={`
            absolute
            right-[12%]
            top-[28%]
            h-1.5
            w-1.5
            rounded-full

            ${
              isDark
                ? 'bg-[#D4AF37]/35'
                : 'bg-[#D4AF37]/45'
            }
          `}
        />

        {/* Ramita decorativa */}
        <svg
          viewBox="0 0 180 360"
          fill="none"
          className={`
            absolute
            -bottom-28
            -left-10
            h-auto
            w-[260px]
            rotate-[16deg]

            sm:w-[320px]

            lg:-bottom-36
            lg:-left-8
            lg:w-[390px]

            ${
              isDark
                ? 'text-[#A7B89A] opacity-[0.07]'
                : 'text-[#71856D] opacity-[0.08]'
            }
          `}
        >
          <g
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M51 344C72 299 94 254 103 202C113 151 115 96 110 28" />

            <path d="M111 80C91 65 91 40 110 18C121 39 122 61 111 80Z" />

            <path d="M113 125C132 111 148 87 144 64C124 75 111 101 113 125Z" />

            <path d="M110 151C87 140 66 120 65 96C89 103 107 126 110 151Z" />

            <path d="M103 197C126 190 150 170 153 147C127 153 110 172 103 197Z" />

            <path d="M96 222C72 211 52 193 48 168C73 174 91 198 96 222Z" />

            <path d="M81 267C105 264 131 249 137 226C111 228 91 245 81 267Z" />
          </g>
        </svg>
      </div>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1240px]
          px-5
          pb-10
          pt-14

          sm:px-6

          lg:px-8
          lg:pb-10
          lg:pt-16
        "
      >
        <div
          className="
            grid
            gap-12

            md:grid-cols-2

            lg:grid-cols-[1.25fr_0.65fr_0.85fr_1.05fr]
            lg:gap-12
          "
        >
          {/* =================================================
              IDENTIDAD
          ================================================== */}

          <div>
            <Link
              href="/"
              aria-label="Ir a la página de inicio"
              className={`
                inline-flex

                ${
                  isDark
                    ? 'rounded-[16px] bg-white px-4 py-3'
                    : ''
                }
              `}
            >
              <Image
                src="/logo.png"
                alt="Erika Pilar - Psicóloga Clínica"
                width={260}
                height={90}
                className={`
                  w-auto
                  object-contain

                  ${
                    isDark
                      ? 'h-[60px]'
                      : 'h-[68px]'
                  }
                `}
              />
            </Link>

            <p
              className={`
                mt-6
                max-w-[360px]
                text-[13px]
                leading-7

                ${bodyColor}
              `}
            >
              Atención psicológica profesional desde un enfoque
              cognitivo-conductual, en un espacio confidencial, humano y libre
              de juicios.
            </p>

            <div
              className="
                mt-7
                flex
                items-start
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-[10px]
                  h-px
                  w-7
                  shrink-0
                  bg-[#D4AF37]
                "
              />

              <p
                className={`
                  max-w-[300px]
                  font-serif
                  text-[16px]
                  italic
                  leading-6

                  ${
                    isDark
                      ? 'text-white/90'
                      : 'text-[#0F4A55]'
                  }
                `}
              >
                Salud mental basada en evidencia. Atención humana y
                profesional.
              </p>
            </div>
          </div>

          {/* =================================================
              EXPLORAR
          ================================================== */}

          <div>
            <p
              className={`
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]

                ${headingColor}
              `}
            >
              Explorar
            </p>

            <nav
              aria-label="Navegación del pie de página"
              className="mt-6"
            >
              <ul className="space-y-3.5">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`
                        inline-flex
                        text-[13px]
                        transition-colors
                        duration-300

                        ${bodyColor}
                        ${hoverColor}
                      `}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* =================================================
              ATENCIÓN
          ================================================== */}

          <div>
            <p
              className={`
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]

                ${headingColor}
              `}
            >
              Atención
            </p>

            <ul className="mt-6 space-y-5">
              {modalities.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className={`
                    flex
                    items-center
                    gap-3
                    text-[13px]

                    ${bodyColor}
                  `}
                >
                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border

                      ${iconCircle}
                    `}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-[15px] w-[15px]"
                      strokeWidth={1.5}
                    />
                  </span>

                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              CONTACTO
          ================================================== */}

          <div>
            <p
              className={`
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]

                ${headingColor}
              `}
            >
              Contacto
            </p>

            <p
              className={`
                mt-6
                max-w-[290px]
                text-[13px]
                leading-6

                ${bodyColor}
              `}
            >
              Para solicitar información o conocer disponibilidad, puedes
              comunicarte directamente por WhatsApp.
            </p>

            <div className="mt-5 space-y-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar mensaje por WhatsApp"
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  border-b
                  pb-4

                  ${borderColor}
                `}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#D4AF37]
                  "
                  strokeWidth={1.5}
                />

                <span>
                  <span
                    className={`
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.14em]

                      ${secondaryColor}
                    `}
                  >
                    WhatsApp
                  </span>

                  <span
                    className={`
                      mt-1
                      block
                      text-[13px]
                      font-medium
                      transition-colors
                      duration-300

                      ${strongColor}
                      ${hoverColor}
                    `}
                  >
                    33 1139 3410
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className={`
                    ml-auto
                    h-4
                    w-4
                    transition-all
                    duration-300

                    ${
                      isDark
                        ? 'text-white/25'
                        : 'text-[#A7B89A]'
                    }

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#D4AF37]
                  `}
                  strokeWidth={1.5}
                />
              </a>

              {/* Ubicación */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver ubicación del consultorio en Google Maps"
                className={`
                  group
                  flex
                  items-start
                  gap-3
                  border-b
                  pb-4
                  pt-1

                  ${borderColor}
                `}
              >
                <MapPin
                  aria-hidden="true"
                  className="
                    mt-0.5
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#D4AF37]
                  "
                  strokeWidth={1.5}
                />

                <span className="min-w-0 flex-1">
                  <span
                    className={`
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.14em]

                      ${secondaryColor}
                    `}
                  >
                    Consultorio
                  </span>

                  <span
                    className={`
                      mt-1
                      block
                      max-w-[230px]
                      text-[12px]
                      leading-5
                      transition-colors
                      duration-300

                      ${
                        isDark
                          ? 'text-white/55 group-hover:text-white/85'
                          : 'text-[#718083] group-hover:text-[#0F4A55]'
                      }
                    `}
                  >
                    C. Jacarandá 26, Prados de la Higuera, 45640 Tlajomulco de
                    Zúñiga, Jalisco.
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className={`
                    ml-auto
                    mt-1
                    h-4
                    w-4
                    shrink-0
                    transition-all
                    duration-300

                    ${
                      isDark
                        ? 'text-white/25'
                        : 'text-[#A7B89A]'
                    }

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#D4AF37]
                  `}
                  strokeWidth={1.5}
                />
              </a>

              {/* Cómo llegar */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex
                  items-center
                  gap-2
                  pt-1
                  text-[12px]
                  font-semibold
                  transition-colors

                  ${bodyColor}
                  ${hoverColor}
                `}
              >
                <Navigation
                  aria-hidden="true"
                  className="h-4 w-4 text-[#D4AF37]"
                  strokeWidth={1.5}
                />

                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BARRA INFERIOR
      ====================================================== */}

      <div
        className={`
          relative
          z-10
          border-t

          ${
            isDark
              ? 'border-white/[0.08] bg-black/[0.035]'
              : 'border-[#A7B89A]/20 bg-white/20'
          }
        `}
      >
        <div
          className={`
            mx-auto
            flex
            max-w-[1240px]
            flex-col
            items-center
            justify-between
            gap-4
            px-5
            py-5
            text-center
            text-[10px]

            ${
              isDark
                ? 'text-white/35'
                : 'text-[#82918B]'
            }

            sm:px-6

            md:flex-row
            md:text-left

            lg:px-8
          `}
        >
          <p>
            © {new Date().getFullYear()} Erika Pilar. Todos los derechos
            reservados.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-2
            "
          >
            <Link
              href="/privacidad"
              className={`
                transition-colors
                duration-300

                ${
                  isDark
                    ? 'hover:text-white/75'
                    : 'hover:text-[#0F4A55]'
                }
              `}
            >
              Aviso de privacidad
            </Link>

            <Link
              href="/terminos"
              className={`
                transition-colors
                duration-300

                ${
                  isDark
                    ? 'hover:text-white/75'
                    : 'hover:text-[#0F4A55]'
                }
              `}
            >
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}