'use client';
import { useSiteData } from '@/components/SiteDataProvider';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Clock3,
  MessageCircle,
  Monitor,
  MapPin,
} from 'lucide-react';


import { getBusinessHoursText } from '@/lib/utils';



const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#FBFAF7]';

export function Hero() {
 const { contact: contactMock } = useSiteData();
const whatsappUrl = `https://wa.me/${contactMock.whatsapp}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.',
)}`;

  const reduceMotion = useReducedMotion();

  const businessHoursText = getBusinessHoursText(
    contactMock.businessHours,
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const visual = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const bottom = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="
        relative
        overflow-hidden
        bg-[#FBFAF7]
        pb-12
        pt-28

        sm:pb-14
        sm:pt-32

        lg:pb-16
        lg:pt-40
      "
    >
      {/* =====================================================
          DECORACIÓN GENERAL
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            -right-[190px]
            top-[-120px]
            h-[390px]
            w-[390px]
            rounded-full
            bg-[#A7B89A]/[0.055]

            sm:h-[480px]
            sm:w-[480px]

            lg:-right-[150px]
            lg:top-[-180px]
            lg:h-[720px]
            lg:w-[720px]
          "
        />

        <div
          className="
            absolute
            -bottom-[180px]
            -left-[190px]
            h-[340px]
            w-[340px]
            rounded-full
            border
            border-[#A7B89A]/15
          "
        />

        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="
            absolute
            -right-20
            top-8
            h-[260px]
            w-[260px]
            text-[#D4AF37]
            opacity-[0.18]

            lg:right-8
            lg:top-12
            lg:h-[480px]
            lg:w-[480px]
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
          max-w-7xl
          px-5

          sm:px-6

          lg:px-8
        "
      >
        <div
          className="
            grid
            min-w-0
            grid-cols-1
            items-center
            gap-8

            sm:gap-10

            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-14

            xl:gap-20
          "
        >
          {/* =====================================================
              COLUMNA IZQUIERDA
          ====================================================== */}

          <motion.div
            variants={reduceMotion ? {} : container}
            initial="hidden"
            animate="show"
            className="min-w-0 w-full max-w-2xl"
          >
            <motion.div
              variants={reduceMotion ? {} : item}
              className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#D4AF37]"
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  leading-5
                  tracking-[0.17em]
                  text-[#0F3D4A]

                  sm:text-[11px]
                "
              >
                Psicóloga Clínica · Terapia Cognitivo-Conductual
              </p>
            </motion.div>

            {/* =================================================
                H1 PRINCIPAL
            ================================================== */}

            <motion.h1
              
              
variants={reduceMotion ? {} : item}
id="hero-title"
className="
  font-serif
  text-[clamp(2rem,8.5vw,2.5rem)]
  font-medium
  leading-[1.10]
  tracking-[-0.03em]
  text-[#0F3D4A]

  sm:text-[54px]

  xl:text-[62px]
"

            >
             Un espacio para comprender lo que sientes y encontrar nuevas

              <span className="whitespace-normal lg:whitespace-nowrap">
               {' '}
                <span className="relative font-normal italic lg:inline-block">
                  formas de afrontarlo.

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 14"
                    preserveAspectRatio="none"
                    className="
                      absolute
                      -bottom-2
                      left-0
                      h-3
                      w-full
                      text-[#D4AF37]/45
                    "
                  >
                    <motion.path
                      d="M4 10 Q145 0 296 9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={
                        reduceMotion
                          ? {
                              pathLength: 1,
                              opacity: 1,
                            }
                          : {
                              pathLength: 0,
                              opacity: 0,
                            }
                      }
                      animate={{
                        pathLength: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.8,
                        delay: reduceMotion ? 0 : 0.5,
                        ease: 'easeOut',
                      }}
                    />
                  </svg>
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={reduceMotion ? {} : item}
              className="
                mt-8
                text-sm
                font-semibold
                tracking-wide
                text-[#52665A]
              "
            >
              Salud mental basada en evidencia
            </motion.p>

            <motion.p
              variants={reduceMotion ? {} : item}
              className="
                mt-4
                max-w-xl
                text-base
                leading-7
                text-[#657175]

                sm:text-lg
                sm:leading-8
              "
            >
              Atención psicológica para niños, adolescentes, adultos y parejas, con un enfoque profesional, cercano y adaptado a las necesidades de cada persona.
            </motion.p>

            {/* =================================================
                CTAs
            ================================================== */}

            <motion.div
              variants={reduceMotion ? {} : item}
              className="
                mt-8
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
                aria-label="Solicitar cita por WhatsApp"
                className={`
                  inline-flex
                  min-h-14
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  bg-[#0F3D4A]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_20px_rgba(15,61,74,0.12)]
                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-[#174F5D]
                  hover:shadow-[0_10px_24px_rgba(15,61,74,0.15)]

                  motion-reduce:transform-none

                  ${focusStyles}
                `}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />

                Solicitar cita
              </a>

              <Link
                href="/psychotherapy"
                className={`
                  inline-flex
                  min-h-14
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#0F3D4A]/15
                  bg-transparent
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#0F3D4A]
                  transition-colors
                  duration-200

                  hover:border-[#A7B89A]/60
                  hover:bg-white/70

                  ${focusStyles}
                `}
              >
                Conocer mi enfoque

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </Link>
            </motion.div>

            <motion.p
              variants={reduceMotion ? {} : item}
              className="
                mt-4
                text-xs
                leading-6
                text-[#657175]
              "
            >
              Escríbeme para resolver tus dudas y consultar disponibilidad.
            </motion.p>

            {/* =================================================
                CONFIANZA
            ================================================== */}

            <motion.div
              variants={reduceMotion ? {} : item}
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-3
                text-sm
                text-[#657175]
              "
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]"
                />

                <span>
                  <strong className="font-semibold text-[#0F3D4A]">
                    +22 años
                  </strong>{' '}
                  de trayectoria
                </span>
              </div>

              <span
                aria-hidden="true"
                className="
                  hidden
                  h-4
                  w-px
                  bg-[#A7B89A]/40

                  sm:block
                "
              />

              <div className="flex items-center gap-2">
                <Monitor
                  aria-hidden="true"
                  className="h-4 w-4 text-[#52665A]"
                  strokeWidth={1.6}
                />

                <span>Presencial y en línea</span>
              </div>
            </motion.div>
          </motion.div>

         
{/* =====================================================
    COLUMNA DERECHA — ILUSTRACIÓN EDITORIAL
===================================================== */}

<motion.div
  variants={reduceMotion ? {} : visual}
  initial="hidden"
  animate="show"
  className="
    relative
    hidden
    mx-auto
    min-w-0
    w-full
    max-w-[360px]

    sm:max-w-[460px]

    lg:block
    lg:max-w-[590px]
    lg:-translate-x-4

    xl:max-w-[640px]
    xl:-translate-x-6
  "
>
  <div
    className="
      relative
      isolate
      aspect-[1/1.03]
      w-full
    "
  >
    {/* Círculo grande de fondo */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-[15%]
        top-[5%]
        h-[90%]
        w-[90%]
        rounded-full
        bg-[#A7B89A]/[0.055]
      "
    />

    {/* Forma orgánica secundaria */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        right-[-5%]
        top-[18%]
        h-[68%]
        w-[76%]
        rotate-[12deg]
        rounded-[48%_52%_46%_54%/55%_43%_57%_45%]
        bg-[#A7B89A]/[0.055]
        blur-[3px]
      "
    />

    {/* Ilustración principal */}
    <Image
      src="/images/Perfil botánico en acuarela y oro.png"
      width={1254}
      height={1254}
      sizes="(max-width: 639px) min(360px, 90vw), (max-width: 1023px) 460px, 50vw"
      priority
      alt="Ilustración de un perfil humano rodeado de hojas y curvas doradas."
      className="
  relative
  z-10
  h-full
  w-full
  lg:scale-[1.15]
  lg:translate-x-[15%]
  lg:-translate-y-[5%]
  object-contain
  mix-blend-multiply
  opacity-[0.96]
  select-none

      "
      draggable={false}
    />

    {/* Detalle decorativo dorado */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        right-[9%]
        top-[12%]
        z-20
        h-[7px]
        w-[7px]
        rounded-full
        bg-[#D4AF37]/60
      "
    />

    {/* Punto decorativo inferior */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        bottom-[12%]
        left-[10%]
        z-20
        h-[5px]
        w-[5px]
        rounded-full
        bg-[#D4AF37]/50
      "
    />
  </div>
</motion.div>
</div>

        {/* =====================================================
            HORARIO Y UBICACIÓN
        ====================================================== */}

        <motion.div
          variants={reduceMotion ? {} : bottom}
          initial="hidden"
          animate="show"
          className="
            mt-11
            flex
            flex-col
            gap-3
            border-t
            border-[#A7B89A]/25
            pt-5
            text-sm
            leading-6
            text-[#657175]

            sm:flex-row
            sm:items-center
            sm:gap-5

            lg:mt-14
          "
        >
          <div className="flex items-start gap-3">
            <Clock3
              aria-hidden="true"
              className="
                mt-1
                h-4
                w-4
                shrink-0
                text-[#52665A]
              "
              strokeWidth={1.7}
            />

            <p>
              <span className="font-semibold text-[#0F3D4A]">
                {businessHoursText}
              </span>

              {contactMock.appointmentRequired && (
                <span className="ml-2">
                  Atención con cita previa.
                </span>
              )}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              hidden
              h-4
              w-px
              bg-[#A7B89A]/35

              sm:block
            "
          />

          <a
            href={contactMock.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              pl-7
              transition-colors
              hover:text-[#0F3D4A]

              sm:pl-0
            "
          >
            <MapPin
              aria-hidden="true"
              className="h-4 w-4 text-[#52665A]"
              strokeWidth={1.7}
            />

            <span>Tlajomulco Centro</span>
          </a>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#A7B89A]/25
          to-transparent
        "
      />
    </section>
  );
}