
'use client';

import { useSiteData } from '@/components/SiteDataProvider';

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

// =====================================================
// TIPOS
// =====================================================

interface FooterProps {
  variant?: 'light' | 'dark';
}

// =====================================================
// NAVEGACIÓN
// =====================================================

const footerLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre mí', href: '/quien-soy' },
  { name: 'Psicoterapia', href: '/psychotherapy' },
  { name: 'Medicina Natural', href: '/medicina-natural' },
  { name: 'Preguntas frecuentes', href: '/faq' },
  { name: 'Contacto', href: '/contacto' },
];

const modalities = [
  { name: 'Terapia presencial', icon: HeartHandshake },
  { name: 'Terapia en línea', icon: Monitor },
  { name: 'Terapia de pareja', icon: Users },
];

// =====================================================
// COMPONENTE FOOTER
// =====================================================

export function Footer({
  variant = 'dark',
}: FooterProps) {
  const { contact } = useSiteData();

  const isDark = variant === 'dark';

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hola, me gustaría recibir información para solicitar una cita.'
  )}`;

  // =====================================================
  // COLORES SEGÚN VARIANTE
  // =====================================================

  const background = isDark
    ? 'bg-[#0F3D4A] text-white'
    : 'bg-[#F7F5EF] text-[#0F3D4A]';

  const headingColor = isDark
    ? 'text-[#D8BD66]'
    : 'text-[#9B7A1F]';

  const bodyColor = isDark
    ? 'text-white/70'
    : 'text-[#63777A]';

  const secondaryColor = isDark
    ? 'text-white/45'
    : 'text-[#82918B]';

  const strongColor = isDark
    ? 'text-white/90'
    : 'text-[#0F3D4A]';

  const borderColor = isDark
    ? 'border-white/15'
    : 'border-[#A7B89A]/25';

  const iconCircle = isDark
    ? 'bg-white/[0.09] text-[#E3E9E6]'
    : 'bg-[#A7B89A]/15 text-[#597060]';

  const hoverColor = isDark
    ? 'hover:text-[#E2C66E]'
    : 'hover:text-[#0F3D4A]';

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <footer
      className={`
        relative
        isolate
        overflow-hidden
        ${background}
      `}
    >
      {/* =====================================================
          DECORACIÓN DE FONDO
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Círculo superior derecho */}
        <div
          className={`
            absolute
            -right-[180px]
            -top-[230px]
            h-[430px]
            w-[430px]
            rounded-full
            border
            ${
              isDark
                ? 'border-[#D4AF37]/10'
                : 'border-[#D4AF37]/15'
            }
          `}
        />

        {/* Segundo arco */}
        <div
          className={`
            absolute
            -right-[105px]
            -top-[175px]
            h-[350px]
            w-[350px]
            rounded-full
            border
            ${
              isDark
                ? 'border-white/[0.05]'
                : 'border-[#71856D]/10'
            }
          `}
        />

        {/* Círculo inferior izquierdo */}
        <div
          className={`
            absolute
            -bottom-[320px]
            -left-[240px]
            h-[520px]
            w-[520px]
            rounded-full
            border
            ${
              isDark
                ? 'border-white/[0.05]'
                : 'border-[#71856D]/10'
            }
          `}
        />

        {/* Ramita decorativa */}
        <svg
          viewBox="0 0 180 360"
          fill="none"
          className={`
            absolute
            -bottom-24
            -left-16
            w-[250px]
            rotate-[12deg]
            sm:w-[300px]
            lg:-bottom-36
            lg:-left-12
            lg:w-[360px]
            ${
              isDark
                ? 'text-[#A7B89A] opacity-[0.12]'
                : 'text-[#71856D] opacity-[0.10]'
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

        {/* Puntos dorados */}
        <span
          className="
            absolute
            right-[5%]
            top-[24%]
            h-2
            w-2
            rounded-full
            bg-[#D4AF37]/70
          "
        />

        <span
          className="
            absolute
            bottom-[27%]
            left-[2%]
            h-1.5
            w-1.5
            rounded-full
            bg-[#D4AF37]/55
          "
        />
      </div>

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1320px]
          px-6
          py-12
          sm:px-8
          lg:px-10
          lg:py-12
        "
      >
        <div
          className="
            grid
            gap-x-10
            gap-y-10
            sm:grid-cols-2
            lg:grid-cols-[1.4fr_0.7fr_0.9fr_1.2fr]
            lg:gap-x-12
          "
        >
          {/* =================================================
              IDENTIDAD
          ================================================= */}

          <div>
            <Link
              href="/"
              aria-label="Ir a la página de inicio"
              className="inline-flex max-w-full"
            >
              <Image
                src={
                  isDark
                    ? '/Logotipo.png'
                    : '/logo.png'
                }
                alt="Erika Pilar - Psicóloga Clínica"
                width={290}
                height={100}
                className="
                  h-auto
                  w-full
                  max-w-[280px]
                  object-contain
                "
              />
            </Link>

            <p
              className={`
                mt-5
                max-w-[345px]
                text-[13px]
                leading-[1.75]
                ${bodyColor}
              `}
            >
              Atención psicológica presencial y en línea,
              con enfoque cognitivo-conductual y
              acompañamiento profesional para distintas
              etapas de la vida.
            </p>

            {/* Frase de marca */}
            <div
              className="
                mt-5
                flex
                items-start
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-[12px]
                  h-px
                  w-7
                  shrink-0
                  bg-[#D4AF37]
                "
              />

              <p
                className={`
                  max-w-[320px]
                  font-serif
                  text-[17px]
                  italic
                  leading-[1.45]
                  sm:text-[18px]
                  ${strongColor}
                `}
              >
                Salud mental basada en evidencia.
                Atención humana y profesional.
              </p>
            </div>
          </div>

          {/* =================================================
              EXPLORAR
          ================================================= */}

          <div>
            <h2
              className={`
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                ${headingColor}
              `}
            >
              Explorar
            </h2>

            <nav
              aria-label="Navegación del pie de página"
              className="mt-6"
            >
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                        inline-block
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
          ================================================= */}

          <div>
            <h2
              className={`
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                ${headingColor}
              `}
            >
              Atención
            </h2>

            <ul className="mt-6 space-y-4">
              {modalities.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${iconCircle}
                    `}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-[17px] w-[17px]"
                      strokeWidth={1.5}
                    />
                  </span>

                  <span
                    className={`
                      text-[13px]
                      leading-5
                      ${bodyColor}
                    `}
                  >
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              CONTACTO
          ================================================= */}

          <div>
            <h2
              className={`
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                ${headingColor}
              `}
            >
              Contacto
            </h2>

            <p
              className={`
                mt-6
                max-w-[320px]
                text-[13px]
                leading-[1.7]
                ${bodyColor}
              `}
            >
              Para solicitar información o conocer
              disponibilidad, puedes comunicarte
              directamente por WhatsApp.
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
                  pb-3
                  ${borderColor}
                `}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#D8BD66]
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
                    WhatsApp
                  </span>

                  <span
                    className={`
                      mt-1
                      block
                      text-[13px]
                      font-medium
                      transition-colors
                      ${strongColor}
                      ${hoverColor}
                    `}
                  >
                    {contact.phone}
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-[#A7B89A]/70
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </a>

              {/* Dirección */}
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver ubicación del consultorio"
                className={`
                  group
                  flex
                  items-start
                  gap-3
                  border-b
                  pb-3
                  ${borderColor}
                `}
              >
                <MapPin
                  aria-hidden="true"
                  className="
                    mt-1
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#D8BD66]
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
                      text-[12px]
                      leading-[1.65]
                      transition-colors
                      ${bodyColor}
                      ${hoverColor}
                    `}
                  >
                    {contact.address}
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0
                    text-[#A7B89A]/70
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </a>

              {/* Cómo llegar */}
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar al consultorio"
                className={`
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  transition-colors
                  ${bodyColor}
                  ${hoverColor}
                `}
              >
                <Navigation
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    text-[#D8BD66]
                  "
                  strokeWidth={1.5}
                />

                Cómo llegar

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 opacity-60"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BARRA INFERIOR
      ===================================================== */}

      <div
        className={`
          relative
          z-10
          border-t
          ${borderColor}
          ${
            isDark
              ? 'bg-black/[0.04]'
              : 'bg-white/20'
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1320px]
            flex-col
            items-center
            justify-center
            gap-3
            px-6
            py-4
            sm:px-8
            lg:px-10
          "
        >
          <p
            className={`
              text-center
              text-[11px]
              leading-5
              ${secondaryColor}
            `}
          >
            © {new Date().getFullYear()} Erika Pilar.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
