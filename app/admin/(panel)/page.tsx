import {
  ArrowRight,
  CalendarDays,
  CircleHelp,
  Clock3,
  Gift,
  Leaf,
  MapPin,
  Stethoscope,
} from 'lucide-react';

import Link from 'next/link';

/* =========================================================
   DATOS DEL DASHBOARD
   Por ahora provienen del contenido actual del sitio.
   Después podrán venir de la API.
========================================================= */

const contentSummary = [
  {
    title: 'Psicoterapia',
    value: '4',
    label: 'servicios publicados',
    href: '/admin/psicoterapia',
    icon: Stethoscope,
  },
  {
    title: 'Medicina Natural',
    value: '9',
    label: 'técnicas publicadas',
    href: '/admin/medicina-natural',
    icon: Leaf,
  },
  {
    title: 'Preguntas frecuentes',
    value: '16',
    label: 'preguntas publicadas',
    href: '/admin/faq',
    icon: CircleHelp,
  },
];

const quickLinks = [
  {
    title: 'Editar psicoterapia',
    href: '/admin/psicoterapia',
    icon: Stethoscope,
  },
  {
    title: 'Editar Medicina Natural',
    href: '/admin/medicina-natural',
    icon: Leaf,
  },
  {
    title: 'Editar promoción',
    href: '/admin/promocion',
    icon: Gift,
  },
  {
    title: 'Contacto y horarios',
    href: '/admin/contacto',
    icon: MapPin,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function AdminPage() {
  return (
    <div className="pb-10">
      {/* =====================================================
          BIENVENIDA
      ====================================================== */}

      <section>
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#B08B28]
          "
        >
          Panel administrativo
        </p>

        <div
          className="
            mt-3
            flex
            flex-col
            gap-5

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <h2
              className="
                font-serif
                text-[32px]
                font-medium
                tracking-[-0.03em]
                text-[#0F3D4A]

                sm:text-[38px]
              "
            >
              Hola, Erika.
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-[#718083]
              "
            >
              Administra el contenido de tu sitio web y consulta tu agenda
              desde un solo lugar.
            </p>
          </div>

          <Link
            href="/admin/agenda"
            className="
              inline-flex
              min-h-11
              w-fit
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0F3D4A]
              px-5
              text-[12px]
              font-semibold
              text-white
              shadow-[0_8px_20px_rgba(15,61,74,0.08)]

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:bg-[#174F5D]
            "
          >
            <CalendarDays
              aria-hidden="true"
              className="h-4 w-4 text-[#D8BD66]"
              strokeWidth={1.6}
            />

            Ver mi agenda
          </Link>
        </div>
      </section>

      {/* =====================================================
          RESUMEN DE CONTENIDO
      ====================================================== */}

      <section
        aria-labelledby="content-summary-title"
        className="mt-9"
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <h3
              id="content-summary-title"
              className="
                text-[13px]
                font-semibold
                text-[#435D61]
              "
            >
              Contenido del sitio
            </h3>

            <p
              className="
                mt-1
                text-[11px]
                text-[#8A9691]
              "
            >
              Resumen del contenido publicado actualmente.
            </p>
          </div>
        </div>

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4

            md:grid-cols-3
          "
        >
          {contentSummary.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#A7B89A]/20
                  bg-white
                  p-5
                  shadow-[0_10px_30px_rgba(15,61,74,0.025)]

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-[#A7B89A]/40
                  hover:shadow-[0_14px_35px_rgba(15,61,74,0.05)]

                  sm:p-6
                "
              >
                {/* Decoración */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-[#A7B89A]/[0.06]
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#A7B89A]/10
                      text-[#52665A]
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <ArrowRight
                    aria-hidden="true"
                    className="
                      h-4
                      w-4
                      text-[#A7B89A]

                      transition-transform
                      duration-200

                      group-hover:translate-x-1
                    "
                    strokeWidth={1.5}
                  />
                </div>

                <div className="relative z-10 mt-6">
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#8A9691]
                    "
                  >
                    {item.title}
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-baseline
                      gap-2
                    "
                  >
                    <span
                      className="
                        font-serif
                        text-[34px]
                        leading-none
                        text-[#0F3D4A]
                      "
                    >
                      {item.value}
                    </span>

                    <span
                      className="
                        text-[11px]
                        text-[#718083]
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <p
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-[11px]
                      font-semibold
                      text-[#52665A]

                      transition-colors

                      group-hover:text-[#0F3D4A]
                    "
                  >
                    Administrar

                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          AGENDA + PROMOCIÓN
      ====================================================== */}

      <section
        className="
          mt-6
          grid
          grid-cols-1
          gap-5

          xl:grid-cols-[1.5fr_0.8fr]
        "
      >
        {/* =================================================
            AGENDA
        ================================================== */}

        <article
          className="
            overflow-hidden
            rounded-[22px]
            border
            border-[#A7B89A]/20
            bg-white
            shadow-[0_10px_30px_rgba(15,61,74,0.025)]
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-[#A7B89A]/15
              px-5
              py-5

              sm:px-6
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#0F3D4A]
                  text-[#D8BD66]
                "
              >
                <CalendarDays
                  aria-hidden="true"
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <h3
                  className="
                    text-[13px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Próximas citas
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-[#8A9691]
                  "
                >
                  Agenda de Google Calendar
                </p>
              </div>
            </div>

            <Link
              href="/admin/agenda"
              className="
                hidden
                items-center
                gap-1.5
                text-[11px]
                font-semibold
                text-[#52665A]

                transition-colors

                hover:text-[#0F3D4A]

                sm:flex
              "
            >
              Ver agenda

              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            </Link>
          </div>

          {/* Estado pendiente de integración */}

          <div
            className="
              flex
              min-h-[260px]
              items-center
              justify-center
              px-6
              py-10
            "
          >
            <div
              className="
                mx-auto
                max-w-[400px]
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#A7B89A]/10
                  text-[#52665A]
                "
              >
                <CalendarDays
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={1.4}
                />
              </div>

              <h4
                className="
                  mt-5
                  font-serif
                  text-[20px]
                  text-[#0F3D4A]
                "
              >
                Tu agenda aparecerá aquí
              </h4>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-[330px]
                  text-[12px]
                  leading-5
                  text-[#7A8783]
                "
              >
                Las próximas citas se mostrarán automáticamente cuando Google
                Calendar esté conectado.
              </p>

              <Link
                href="/admin/agenda"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold
                  text-[#52665A]

                  hover:text-[#0F3D4A]
                "
              >
                Ir a Mi agenda

                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
              </Link>
            </div>
          </div>
        </article>

        {/* =================================================
            PROMOCIÓN
        ================================================== */}

        <article
          className="
            relative
            overflow-hidden
            rounded-[22px]
            bg-[#0F3D4A]
            p-6
            text-white
            shadow-[0_12px_35px_rgba(15,61,74,0.08)]
          "
        >
          {/* Decoración */}

          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              border
              border-white/[0.07]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-20
              -left-20
              h-48
              w-48
              rounded-full
              bg-[#A7B89A]/[0.06]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              h-full
              flex-col
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/[0.08]
                  text-[#D8BD66]
                "
              >
                <Gift
                  aria-hidden="true"
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.5}
                />
              </div>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.06]
                  px-3
                  py-1.5
                  text-[9px]
                  font-semibold
                  text-white/75
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#D8BD66]
                  "
                />

                Activa
              </span>
            </div>

            <div className="mt-8">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#D8BD66]
                "
              >
                Promoción actual
              </p>

              <h3
                className="
                  mt-3
                  font-serif
                  text-[27px]
                  leading-tight
                  text-white
                "
              >
                Paquete de psicoterapia
              </h3>

              <p
                className="
                  mt-3
                  text-[12px]
                  leading-5
                  text-white/55
                "
              >
                10 sesiones de psicoterapia individual.
              </p>
            </div>

            <div
              className="
                mt-8
                border-t
                border-white/10
                pt-5
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  text-white/35
                "
              >
                Precio del paquete
              </p>

              <p
                className="
                  mt-1
                  font-serif
                  text-[30px]
                  text-white
                "
              >
                $3,600

                <span
                  className="
                    ml-1
                    font-sans
                    text-[9px]
                    text-white/40
                  "
                >
                  MXN
                </span>
              </p>
            </div>

            <Link
              href="/admin/promocion"
              className="
                mt-auto
                inline-flex
                items-center
                gap-2
                pt-7
                text-[11px]
                font-semibold
                text-[#E5CF80]

                transition-colors

                hover:text-white
              "
            >
              Administrar promoción

              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            </Link>
          </div>
        </article>
      </section>

      {/* =====================================================
          ACCESOS RÁPIDOS
      ====================================================== */}

      <section className="mt-6">
        <div>
          <h3
            className="
              text-[13px]
              font-semibold
              text-[#435D61]
            "
          >
            Accesos rápidos
          </h3>

          <p
            className="
              mt-1
              text-[11px]
              text-[#8A9691]
            "
          >
            Ve directamente a las secciones que utilizas con mayor frecuencia.
          </p>
        </div>

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2

            xl:grid-cols-4
          "
        >
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  flex
                  min-h-[76px]
                  items-center
                  gap-3
                  rounded-[16px]
                  border
                  border-[#A7B89A]/20
                  bg-white
                  px-4
                  py-4

                  transition-all
                  duration-200

                  hover:border-[#A7B89A]/40
                  hover:shadow-[0_8px_25px_rgba(15,61,74,0.035)]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#A7B89A]/10
                    text-[#52665A]
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </div>

                <span
                  className="
                    min-w-0
                    flex-1
                    text-[11px]
                    font-semibold
                    text-[#52665A]

                    transition-colors

                    group-hover:text-[#0F3D4A]
                  "
                >
                  {item.title}
                </span>

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-[#A7B89A]

                    transition-transform

                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          NOTA AGENDA
      ====================================================== */}

      <div
        className="
          mt-6
          flex
          items-start
          gap-3
          rounded-[16px]
          border
          border-[#D4AF37]/15
          bg-[#D4AF37]/[0.035]
          px-4
          py-4
        "
      >
        <Clock3
          aria-hidden="true"
          className="
            mt-0.5
            h-4
            w-4
            shrink-0
            text-[#B08B28]
          "
          strokeWidth={1.5}
        />

        <p
          className="
            text-[10px]
            leading-5
            text-[#74817D]
          "
        >
          La agenda se mostrará únicamente dentro del panel administrativo y
          será sincronizada con Google Calendar.
        </p>
      </div>
    </div>
  );
}