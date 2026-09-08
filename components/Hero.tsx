'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  MessageCircle,
  Monitor,
  MapPin,
} from 'lucide-react';

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.'
)}`;

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#FBFAF7]';

export function Hero() {
  const reduceMotion = useReducedMotion();

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
        {/* Forma salvia grande superior derecha */}
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

        {/* Círculo inferior izquierdo */}
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

        {/* Línea dorada decorativa */}
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
            items-center
            gap-14

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
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={reduceMotion ? {} : item}
              className="mb-6 flex items-center gap-3"
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

            {/* Título */}
            <motion.h1
              variants={reduceMotion ? {} : item}
              id="hero-title"
              className="
                font-serif
                text-[43px]
                font-medium
                leading-[1.06]
                tracking-[-0.035em]
                text-[#0F3D4A]

                sm:text-[58px]

                xl:text-[70px]
              "
            >
              Atención humana
              <br />

              <span className="whitespace-nowrap">
                y{' '}
                <span className="relative inline-block font-normal italic">
                  profesional

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

            {/* Frase de marca */}
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

            {/* Descripción */}
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
              Te acompaño a comprender lo que estás viviendo y a desarrollar
              herramientas para tu bienestar, en un espacio confidencial,
              profesional y libre de juicios.
            </motion.p>

            {/* CTAs */}
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
                href="/servicios"
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

            {/* Confianza */}
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
              COLUMNA DERECHA — COMPOSICIÓN BOTÁNICA
          ====================================================== */}

          <motion.div
            variants={reduceMotion ? {} : visual}
            initial="hidden"
            animate="show"
            className="
              relative
              hidden
              w-full
              max-w-[590px]

              lg:block
              lg:-translate-x-4

              xl:-translate-x-6
            "
          >
            <div className="relative aspect-[1/0.92]">
              {/* Semicírculo / forma exterior derecha */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-[48%]
                  top-[-22%]
                  h-[125%]
                  w-[125%]
                  rounded-full
                  bg-[#A7B89A]/[0.055]
                "
              />

              {/* Forma orgánica salvia */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[78%]
                  w-[68%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-[6deg]
                  rounded-[43%_57%_46%_54%/57%_44%_56%_43%]
                  bg-[#A7B89A]/[0.13]
                "
              />

              {/* Segunda forma tenue */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-[24%]
                  top-[18%]
                  h-[62%]
                  w-[58%]
                  rotate-[-7deg]
                  rounded-[55%_45%_52%_48%/45%_57%_43%_55%]
                  border
                  border-[#A7B89A]/15
                "
              />

              {/* Arco dorado */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 500"
                fill="none"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[88%]
                  w-[74%]
                  -translate-x-1/2
                  -translate-y-1/2
                  text-[#D4AF37]
                  opacity-[0.45]
                "
              >
                <path
                  d="M65 445C90 320 138 198 322 55"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Rama lineal */}
              <svg
                aria-hidden="true"
                viewBox="0 0 180 360"
                fill="none"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-auto
                  w-[42%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rotate-[-8deg]
                  text-[#71856D]
                  opacity-[0.72]
                "
              >
                <g
                  stroke="currentColor"
                  strokeWidth="1.2"
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

              {/* Círculo dorado */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  right-[15%]
                  top-[17%]
                  h-[88px]
                  w-[88px]
                  rounded-full
                  border
                  border-[#D4AF37]/25
                "
              >
                <span
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-2
                    w-2
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#D4AF37]/65
                  "
                />
              </div>

              {/* Punto dorado inferior */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-[18%]
                  left-[19%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]/55
                "
              />
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            HORARIO
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
                Lunes a viernes
              </span>{' '}
              de 4:00 pm a 9:00 pm.
              <span className="ml-2">Atención con cita previa.</span>
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

          <div className="flex items-center gap-2 pl-7 sm:pl-0">
            <MapPin
              aria-hidden="true"
              className="h-4 w-4 text-[#52665A]"
              strokeWidth={1.7}
            />

            <span>Tlajomulco Centro</span>
          </div>
        </motion.div>
      </div>

      {/* Línea inferior */}
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