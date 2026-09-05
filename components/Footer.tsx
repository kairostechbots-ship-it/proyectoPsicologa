import {
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const phoneNumber = '+523311383410';

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.'
)}`;

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

export function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[#A7B89A]/20
        bg-[#F7F5EF]
      "
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
        {/* Semicírculo inferior izquierdo */}
        <div
          className="
            absolute
            -bottom-[330px]
            -left-[280px]
            h-[600px]
            w-[600px]
            rounded-full
            border
            border-[#A7B89A]/10
            bg-[#A7B89A]/[0.025]
          "
        />

        {/* Ramita decorativa */}
        <svg
          viewBox="0 0 180 360"
          fill="none"
          className="
            absolute
            -bottom-36
            -left-14
            h-auto
            w-[390px]
            rotate-[18deg]
            text-[#819275]
            opacity-[0.045]
          "
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

        {/* Círculo superior derecho */}
        <div
          className="
            absolute
            -right-[180px]
            -top-[240px]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-[#D4AF37]/[0.07]
          "
        />
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
          pt-16

          sm:px-6

          lg:px-8
          lg:pb-10
          lg:pt-20
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
              className="inline-flex"
            >
              <Image
                src="/logo.png"
                alt="Erika Pilar - Psicóloga Clínica"
                width={260}
                height={90}
                className="
                  h-[68px]
                  w-auto
                  object-contain
                "
              />
            </Link>

            <p
              className="
                mt-6
                max-w-[360px]
                text-[13px]
                leading-7
                text-[#66787C]
              "
            >
              Atención psicológica profesional desde un enfoque
              cognitivo-conductual, en un espacio confidencial, humano y libre
              de juicios.
            </p>

            {/* Frase de marca */}
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
                className="
                  max-w-[300px]
                  font-serif
                  text-[16px]
                  italic
                  leading-6
                  text-[#0F4A55]
                "
              >
                Salud mental basada en evidencia. Atención humana y
                profesional.
              </p>
            </div>
          </div>

          {/* =================================================
              NAVEGACIÓN
          ================================================== */}

          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#9B7A1F]
              "
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
                      className="
                        inline-flex
                        text-[13px]
                        text-[#66787C]
                        transition-colors
                        duration-300
                        hover:text-[#0F4A55]
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* =================================================
              MODALIDADES
          ================================================== */}

          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#9B7A1F]
              "
            >
              Atención
            </p>

            <ul className="mt-6 space-y-5">
              {modalities.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="
                    flex
                    items-center
                    gap-3
                    text-[13px]
                    text-[#66787C]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#A7B89A]/20
                      bg-[#A7B89A]/[0.10]
                      text-[#597060]
                    "
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
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#9B7A1F]
              "
            >
              Contacto
            </p>

            <p
              className="
                mt-6
                max-w-[290px]
                text-[13px]
                leading-6
                text-[#66787C]
              "
            >
              Para solicitar información o conocer disponibilidad, puedes
              comunicarte directamente.
            </p>

            <div className="mt-5 space-y-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar mensaje por WhatsApp"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#A7B89A]/25
                  pb-4
                "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#9B7A1F]
                  "
                  strokeWidth={1.5}
                />

                <span>
                  <span
                    className="
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-[#82918B]
                    "
                  >
                    WhatsApp
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[13px]
                      font-medium
                      text-[#435D61]
                      transition-colors
                      duration-300
                      group-hover:text-[#0F4A55]
                    "
                  >
                    33 1138 3410
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    ml-auto
                    h-4
                    w-4
                    text-[#A7B89A]
                    transition-all
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#9B7A1F]
                  "
                  strokeWidth={1.5}
                />
              </a>

              {/* Teléfono */}
              <a
                href={`tel:${phoneNumber}`}
                aria-label="Llamar al teléfono 33 1138 3410"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#A7B89A]/25
                  pb-4
                  pt-1
                "
              >
                <Phone
                  aria-hidden="true"
                  className="
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#9B7A1F]
                  "
                  strokeWidth={1.5}
                />

                <span>
                  <span
                    className="
                      block
                      text-[9px]
                      uppercase
                      tracking-[0.14em]
                      text-[#82918B]
                    "
                  >
                    Teléfono
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      text-[13px]
                      font-medium
                      text-[#435D61]
                      transition-colors
                      duration-300
                      group-hover:text-[#0F4A55]
                    "
                  >
                    33 1138 3410
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    ml-auto
                    h-4
                    w-4
                    text-[#A7B89A]
                    transition-all
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#9B7A1F]
                  "
                  strokeWidth={1.5}
                />
              </a>

              {/* Ubicación */}
              <div
                className="
                  flex
                  items-start
                  gap-3
                  pt-1
                "
              >
                <MapPin
                  aria-hidden="true"
                  className="
                    mt-0.5
                    h-[18px]
                    w-[18px]
                    shrink-0
                    text-[#9B7A1F]
                  "
                  strokeWidth={1.5}
                />

                <span
                  className="
                    max-w-[230px]
                    text-[12px]
                    leading-5
                    text-[#718083]
                  "
                >
                  Jacarandas 26-52, Prados de la Higuera, Tlajomulco Centro.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BARRA INFERIOR
      ====================================================== */}

      <div
        className="
          relative
          z-10
          border-t
          border-[#A7B89A]/20
          bg-white/20
        "
      >
        <div
          className="
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
            text-[#82918B]

            sm:px-6

            md:flex-row
            md:text-left

            lg:px-8
          "
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
              className="
                transition-colors
                duration-300
                hover:text-[#0F4A55]
              "
            >
              Aviso de privacidad
            </Link>

            <Link
              href="/terminos"
              className="
                transition-colors
                duration-300
                hover:text-[#0F4A55]
              "
            >
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}