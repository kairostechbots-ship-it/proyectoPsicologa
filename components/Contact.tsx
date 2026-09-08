'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  Clock3,
  MapPin,
  MessageCircle,
  Navigation,
} from 'lucide-react';

const whatsappNumber = '523311393410';

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre la atención psicológica y consultar disponibilidad.'
)}`;

const mapsUrl = 'https://maps.app.goo.gl/pWGLETvUZ9ChCHft8';

const mapEmbedUrl =
  'https://www.google.com/maps?q=C.%20Jacarand%C3%A1%2026%2C%20Prados%20de%20la%20Higuera%2C%2045640%20Tlajomulco%20de%20Z%C3%BA%C3%B1iga%2C%20Jalisco&output=embed';

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        bg-white
        py-20

        sm:py-24

        lg:scroll-mt-28
        lg:py-28
      "
    >
      {/* =====================================================
          DECORACIÓN
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Círculo superior derecho */}
        <div
          className="
            absolute
            -right-[220px]
            top-[80px]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-[#A7B89A]/10

            lg:h-[520px]
            lg:w-[520px]
          "
        />

        {/* Forma inferior izquierda */}
        <div
          className="
            absolute
            -bottom-[220px]
            -left-[200px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#A7B89A]/[0.045]

            lg:h-[520px]
            lg:w-[520px]
          "
        />

        {/* Línea dorada */}
        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="
            absolute
            -left-24
            top-28
            h-[260px]
            w-[260px]
            text-[#D4AF37]
            opacity-[0.10]

            lg:left-0
            lg:h-[360px]
            lg:w-[360px]
          "
        >
          <path
            d="M34 353C89 222 181 103 354 40"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1240px]
          px-5

          sm:px-6

          lg:px-8
        "
      >
        {/* =====================================================
            ENCABEZADO
        ====================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease,
          }}
          className="
            mx-auto
            max-w-[760px]
            text-center
          "
        >
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#596D65]
              "
            >
              Contacto
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />
          </div>

          <h2
            id="contact-title"
            className="
              mt-6
              font-serif
              text-[40px]
              font-medium
              leading-[1.1]
              tracking-[-0.03em]
              text-[#0F4A55]

              sm:text-[48px]
            "
          >
            Estamos aquí para{' '}
            <span className="font-normal italic">
              escucharte.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-[650px]
              text-[14px]
              leading-7
              text-[#718083]
            "
          >
            Si deseas solicitar información, resolver alguna duda o consultar
            disponibilidad, puedes comunicarte directamente por WhatsApp.
          </p>
        </motion.div>

        {/* =====================================================
            INFORMACIÓN + MAPA
        ====================================================== */}

        <div
          className="
            mt-14
            grid
            gap-8

            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-stretch
            lg:gap-10
          "
        >
          {/* =================================================
              INFORMACIÓN
          ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease,
            }}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[#A7B89A]/20
              bg-[#FBFAF7]
              p-7
              shadow-[0_12px_40px_rgba(15,61,74,0.04)]

              sm:p-8

              lg:p-10
            "
          >
            {/* Decoración interna */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-52
                w-52
                rounded-full
                bg-[#A7B89A]/[0.07]
              "
            />

            <div className="relative z-10">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#B08B28]
                "
              >
                Atención directa
              </p>

              <h3
                className="
                  mt-3
                  font-serif
                  text-[29px]
                  font-medium
                  leading-tight
                  text-[#0F4A55]

                  sm:text-[32px]
                "
              >
                Información de contacto
              </h3>

              <p
                className="
                  mt-3
                  max-w-md
                  text-sm
                  leading-7
                  text-[#718083]
                "
              >
                La atención se realiza con cita previa. Puedes escribir por
                WhatsApp para consultar disponibilidad antes de acudir.
              </p>

              {/* ===============================================
                  DATOS
              ================================================ */}

              <div className="mt-8 space-y-7">
                {/* WhatsApp */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 4,
                        }
                  }
                  className="
                    group
                    flex
                    items-start
                    gap-4
                  "
                >
                  <span
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#E9EFE9]
                      text-[#52665A]
                      transition-colors

                      group-hover:bg-[#0F4A55]
                      group-hover:text-white
                    "
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#82918B]
                      "
                    >
                      WhatsApp
                    </p>

                    <p
                      className="
                        mt-1
                        text-[16px]
                        font-semibold
                        text-[#0F4A55]
                      "
                    >
                      33 1139 3410
                    </p>

                    <p className="mt-1 text-xs text-[#82918B]">
                      Escríbeme para consultar disponibilidad.
                    </p>
                  </div>
                </motion.a>

                {/* Dirección */}
                <motion.a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 4,
                        }
                  }
                  className="
                    group
                    flex
                    items-start
                    gap-4
                  "
                >
                  <span
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#E9EFE9]
                      text-[#52665A]
                      transition-colors

                      group-hover:bg-[#0F4A55]
                      group-hover:text-white
                    "
                  >
                    <MapPin
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#82918B]
                      "
                    >
                      Consultorio
                    </p>

                    <p
                      className="
                        mt-1
                        max-w-[330px]
                        text-sm
                        font-medium
                        leading-6
                        text-[#0F4A55]
                      "
                    >
                      C. Jacarandá 26, Centro, Fraccionamiento Prados de la
                      Higuera, 45640 Tlajomulco de Zúñiga, Jalisco.
                    </p>
                  </div>
                </motion.a>

                {/* Horario */}
                <div className="flex items-start gap-4">
                  <span
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#E9EFE9]
                      text-[#52665A]
                    "
                  >
                    <Clock3
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#82918B]
                      "
                    >
                      Horario
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-semibold
                        text-[#0F4A55]
                      "
                    >
                      Lunes a viernes
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#82918B]">
                      4:00 pm a 9:00 pm · Atención con cita previa.
                    </p>
                  </div>
                </div>
              </div>

              {/* ===============================================
                  BOTONES
              ================================================ */}

              <div
                className="
                  mt-9
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:flex-wrap
                "
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    bg-[#0F4A55]
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(15,74,85,0.10)]
                    transition-all
                    duration-200

                    hover:-translate-y-0.5
                    hover:bg-[#174F5D]
                  "
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.7}
                  />

                  Enviar WhatsApp
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    border
                    border-[#0F4A55]/15
                    bg-white/60
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-[#0F4A55]
                    transition-colors

                    hover:border-[#0F4A55]/30
                    hover:bg-white
                  "
                >
                  <Navigation
                    aria-hidden="true"
                    className="h-[17px] w-[17px]"
                    strokeWidth={1.6}
                  />

                  Cómo llegar
                </a>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              MAPA
          ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="
              relative
              min-h-[390px]
              overflow-hidden
              rounded-[28px]
              border
              border-[#A7B89A]/20
              bg-[#FBFAF7]
              shadow-[0_12px_40px_rgba(15,61,74,0.05)]

              sm:min-h-[470px]

              lg:min-h-full
            "
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio de Erika Pilar"
              className="
                absolute
                inset-0
                h-full
                w-full
              "
            />

            {/* Etiqueta sobre mapa */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-4
                left-4
                right-4

                sm:bottom-5
                sm:left-5
                sm:right-auto
              "
            >
              <div
                className="
                  inline-flex
                  max-w-[330px]
                  items-center
                  gap-3
                  rounded-[16px]
                  border
                  border-white/60
                  bg-white/90
                  px-4
                  py-3
                  shadow-[0_10px_30px_rgba(15,61,74,0.10)]
                  backdrop-blur-sm
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E9EFE9]
                    text-[#52665A]
                  "
                >
                  <MapPin
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.6}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#82918B]
                    "
                  >
                    Consultorio
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      font-semibold
                      leading-5
                      text-[#0F4A55]
                    "
                  >
                    Prados de la Higuera · Tlajomulco
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}