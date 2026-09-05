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
    hidden: { opacity: 0, y: 14 },
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
    hidden: { opacity: 0, y: 18 },
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
    hidden: { opacity: 0, y: 8 },
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
        relative overflow-hidden bg-[#FBFAF7]
        pb-12 pt-28
        sm:pb-14 sm:pt-32
        lg:pb-16 lg:pt-40
      "
    >
      {/* Fondo muy sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute -right-32 top-20
            h-[420px] w-[420px]
            rounded-full bg-[#A7B89A]/10 blur-[100px]
            sm:h-[520px] sm:w-[520px]
          "
        />

        <div
          className="
            absolute -left-40 bottom-[-12rem]
            h-[360px] w-[360px]
            rounded-full bg-[#D4AF37]/[0.04]
            blur-[100px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className="
            grid items-center gap-14
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
              variants={item}
              className="mb-6 flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#D4AF37]"
              />

              <p
                className="
                  text-[10px] font-semibold uppercase
                  leading-5 tracking-[0.17em]
                  text-[#0F3D4A]
                  sm:text-[11px]
                "
              >
                Psicóloga Clínica · Terapia Cognitivo-Conductual
              </p>
            </motion.div>

            {/* Título */}
            <motion.h1
              variants={item}
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
                <span className="relative inline-block italic font-normal">
                  profesional

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 14"
                    preserveAspectRatio="none"
                    className="
                      absolute -bottom-2 left-0
                      h-3 w-full
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
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      animate={{ pathLength: 1, opacity: 1 }}
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
              variants={item}
              className="
                mt-8
                text-sm font-semibold
                tracking-wide text-[#52665A]
              "
            >
              Salud mental basada en evidencia
            </motion.p>

            {/* Descripción */}
            <motion.p
              variants={item}
              className="
                mt-4 max-w-xl
                text-base leading-7
                text-[#657175]
                sm:text-lg sm:leading-8
              "
            >
              Te acompaño a comprender lo que estás viviendo y a desarrollar
              herramientas para tu bienestar, en un espacio confidencial,
              profesional y libre de juicios.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="
                mt-8 flex flex-col gap-3
                sm:flex-row sm:flex-wrap
              "
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solicitar cita por WhatsApp"
                className={`
                  inline-flex min-h-14
                  items-center justify-center
                  gap-2.5 rounded-xl
                  bg-[#0F3D4A]
                  px-6 py-3.5
                  text-sm font-semibold text-white
                  shadow-[0_8px_20px_rgba(15,61,74,0.12)]
                  transition-all duration-200
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
                  inline-flex min-h-14
                  items-center justify-center
                  gap-2 rounded-xl
                  border border-[#0F3D4A]/15
                  bg-transparent
                  px-5 py-3.5
                  text-sm font-semibold text-[#0F3D4A]
                  transition-colors duration-200
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
              variants={item}
              className="mt-4 text-xs leading-6 text-[#657175]"
            >
              Escríbeme para resolver tus dudas y consultar disponibilidad.
            </motion.p>

            {/* Confianza */}
            <motion.div
              variants={item}
              className="
                mt-7 flex flex-wrap
                items-center gap-x-5 gap-y-3
                text-sm text-[#657175]
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
                className="hidden h-4 w-px bg-[#A7B89A]/40 sm:block"
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
              COLUMNA DERECHA — COMPOSICIÓN EDITORIAL
          ====================================================== */}
         {/* =====================================================
    COLUMNA DERECHA — COMPOSICIÓN BOTÁNICA
====================================================== */}
<motion.div
  variants={reduceMotion ? {} : visual}
  initial="hidden"
  animate="show"
className="
  relative
  hidden w-full max-w-[590px]
  lg:block
  lg:-translate-x-6
  xl:-translate-x-8
"
>
  <div className="relative aspect-[1/0.92]">
    {/* Forma orgánica principal */}
    <div
      aria-hidden="true"
      className="
        absolute
        left-[12%] top-[4%]
        h-[88%] w-[72%]
        rotate-[3deg]
        rounded-[48%_52%_45%_55%/42%_38%_62%_58%]
        border border-[#A7B89A]/20
        bg-[#A7B89A]/[0.09]
      "
    />

    {/* Segunda forma muy tenue para dar profundidad */}
    <div
      aria-hidden="true"
      className="
        absolute
        right-[7%] top-[22%]
        h-[48%] w-[44%]
        rounded-full
        bg-[#F2F1EC]/70
        blur-[1px]
      "
    />

    {/* Arco dorado exterior */}
    <svg
      aria-hidden="true"
      viewBox="0 0 560 500"
      fill="none"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="
          M108 445
          C174 373 218 300 245 223
          C268 157 282 101 301 46
        "
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>

    {/* Rama botánica */}
    <svg
      aria-hidden="true"
      viewBox="0 0 560 500"
      fill="none"
      className="
        absolute
        left-[3%] top-[-1%]
        h-[104%] w-[104%]
      "
    >
      {/* Tallo principal */}
      <path
        d="
          M123 449
          C170 394 203 338 230 278
          C257 218 276 151 286 73
        "
        stroke="#718371"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.82"
      />

      {/* Hoja inferior izquierda */}
      <path
        d="
          M171 369
          C116 369 76 340 61 297
          C112 294 158 321 171 369Z
        "
        fill="#A7B89A"
        fillOpacity="0.62"
      />

      <path
        d="M166 364C136 338 104 317 69 304"
        stroke="#718371"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Hoja inferior derecha */}
      <path
        d="
          M204 319
          C258 322 301 296 320 253
          C267 247 220 273 204 319Z
        "
        fill="#708271"
        fillOpacity="0.56"
      />

      <path
        d="M211 313C243 289 278 270 310 259"
        stroke="#5D7162"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Hoja media izquierda */}
      <path
        d="
          M238 258
          C188 247 158 214 152 173
          C199 177 233 210 238 258Z
        "
        fill="#A7B89A"
        fillOpacity="0.7"
      />

      <path
        d="M232 251C206 222 184 201 159 182"
        stroke="#718371"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Hoja media derecha */}
      <path
        d="
          M261 200
          C307 194 341 163 352 123
          C307 122 269 154 261 200Z
        "
        fill="#728673"
        fillOpacity="0.62"
      />

      <path
        d="M268 194C296 168 320 148 344 131"
        stroke="#607461"
        strokeWidth="1"
        opacity="0.65"
      />

      {/* Hoja superior izquierda */}
      <path
        d="
          M283 138
          C244 119 226 84 234 52
          C273 67 294 102 283 138Z
        "
        fill="#A7B89A"
        fillOpacity="0.6"
      />

      <path
        d="M279 131C263 103 249 80 239 60"
        stroke="#718371"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Hoja superior derecha pequeña */}
      <path
        d="
          M287 105
          C316 95 337 73 341 48
          C311 52 290 76 287 105Z
        "
        fill="#708271"
        fillOpacity="0.46"
      />
    </svg>

    {/* Círculo dorado */}
    <div
      aria-hidden="true"
      className="
        absolute
        right-[12%] top-[19%]
        h-24 w-24
        rounded-full
        border border-[#D4AF37]/25
      "
    >
      <span
        className="
          absolute
          left-1/2 top-1/2
          h-2 w-2
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[#D4AF37]/70
        "
      />
    </div>

    {/* Línea decorativa pequeña */}
   
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
            flex flex-col gap-3
            border-t border-[#A7B89A]/25
            pt-5
            text-sm leading-6 text-[#657175]
            sm:flex-row sm:items-center
            sm:gap-5
            lg:mt-14
          "
        >
          <div className="flex items-start gap-3">
            <Clock3
              aria-hidden="true"
              className="
                mt-1 h-4 w-4
                shrink-0 text-[#52665A]
              "
              strokeWidth={1.7}
            />

            <p>
              <span className="font-semibold text-[#0F3D4A]">
                Lunes a viernes
              </span>{' '}
              de 4:00 pm a 9:00 pm.
              <span className="ml-2">
                Atención con cita previa.
              </span>
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              hidden h-4 w-px
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

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 h-px
          bg-gradient-to-r
          from-transparent
          via-[#A7B89A]/25
          to-transparent
        "
      />
    </section>
  );
}