'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  Heart,
  Activity,
  Check,
} from 'lucide-react';

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#F1F4EE]';

export function TCCSection() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 16,
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
      scale: 0.97,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      aria-labelledby="tcc-title"
      className="
        relative overflow-hidden
        bg-[#F1F4EE]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          DECORACIÓN DE FONDO
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Luz */}
        <div
          className="
            absolute
            -left-40 top-[-100px]
            h-[420px] w-[420px]
            rounded-full
            bg-white/45
            blur-[100px]
          "
        />

        {/* Círculo decorativo */}
        <div
          className="
            absolute
            -right-24 bottom-[-160px]
            h-[380px] w-[380px]
            rounded-full
            border border-[#A7B89A]/20
          "
        />

        {/* Arco dorado muy sutil */}
        <svg
          viewBox="0 0 300 300"
          fill="none"
          className="
            absolute
            -right-24 bottom-[-120px]
            h-[330px] w-[330px]
            text-[#D4AF37]
            opacity-20
          "
        >
          <path
            d="M25 250C85 130 155 72 277 38"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="
          relative z-10
          mx-auto max-w-7xl
          px-5 sm:px-6 lg:px-8
        "
      >
        <div
          className="
            grid items-center
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* =================================================
              CONTENIDO
          ================================================== */}
          <motion.div
            variants={reduceMotion ? {} : container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={item}
              className="flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#D4AF37]"
              />

              <p
                className="
                  text-[10px]
                  font-semibold uppercase
                  tracking-[0.18em]
                  text-[#52665A]
                  sm:text-[11px]
                "
              >
                Terapia Cognitivo-Conductual
              </p>
            </motion.div>

            {/* Título */}
            <motion.h2
              variants={item}
              id="tcc-title"
              className="
                mt-5
                max-w-xl
                font-serif
                text-[38px]
                font-medium
                leading-[1.08]
                tracking-[-0.025em]
                text-[#0F3D4A]
                sm:text-[48px]
                lg:text-[54px]
              "
            >
              Comprender también es
              <span className="italic font-normal">
                {' '}parte del proceso.
              </span>
            </motion.h2>

            {/* Texto */}
            <motion.p
              variants={item}
              className="
                mt-6
                max-w-xl
                text-base leading-7
                text-[#657175]
                sm:text-[17px]
                sm:leading-8
              "
            >
              La Terapia Cognitivo-Conductual es un enfoque basado en
              evidencia que permite explorar la relación entre lo que
              pensamos, sentimos y hacemos.
            </motion.p>

            <motion.p
              variants={item}
              className="
                mt-4
                max-w-xl
                text-base leading-7
                text-[#657175]
              "
            >
              A partir de esta comprensión, el proceso terapéutico busca
              desarrollar estrategias y herramientas que respondan a tus
              necesidades y objetivos personales.
            </motion.p>

            {/* Principios */}
            <motion.div
              variants={item}
              className="mt-7 space-y-3"
            >
              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-5 w-5
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-[#0F3D4A]
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3"
                    strokeWidth={2}
                  />
                </span>

                <p className="text-sm leading-6 text-[#52665A]">
                  Un proceso centrado en tus necesidades y objetivos.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-5 w-5
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-[#0F3D4A]
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3"
                    strokeWidth={2}
                  />
                </span>

                <p className="text-sm leading-6 text-[#52665A]">
                  Estrategias que pueden aplicarse también fuera de consulta.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex h-5 w-5
                    shrink-0
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-[#0F3D4A]
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3"
                    strokeWidth={2}
                  />
                </span>

                <p className="text-sm leading-6 text-[#52665A]">
                  Acompañamiento profesional, colaborativo y sin juicios.
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-8"
            >
              <Link
                href="/servicios"
                className={`
                  group
                  inline-flex min-h-11
                  items-center gap-2
                  py-2
                  text-sm font-semibold
                  text-[#0F3D4A]
                  transition-colors
                  hover:text-[#174F5D]
                  ${focusStyles}
                `}
              >
                Conocer mi enfoque terapéutico

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-4 w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.8}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* =================================================
              VISUAL TCC
          ================================================== */}
          <motion.div
            variants={reduceMotion ? {} : visual}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[570px]
            "
          >
            <div
              className="
                relative
                aspect-square
                w-full
              "
            >
              {/* Círculo exterior */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[82%] w-[82%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-[#0F3D4A]/10
                "
              />

              {/* Círculo interior */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[53%] w-[53%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-[#D4AF37]/20
                "
              />

              {/* Líneas de conexión */}
              <svg
                aria-hidden="true"
                viewBox="0 0 500 500"
                fill="none"
                className="
                  absolute inset-0
                  h-full w-full
                "
              >
                <path
                  d="M250 126L130 330"
                  stroke="#A7B89A"
                  strokeWidth="1.3"
                  strokeDasharray="5 7"
                />

                <path
                  d="M250 126L370 330"
                  stroke="#A7B89A"
                  strokeWidth="1.3"
                  strokeDasharray="5 7"
                />

                <path
                  d="M130 330L370 330"
                  stroke="#A7B89A"
                  strokeWidth="1.3"
                  strokeDasharray="5 7"
                />
              </svg>

              {/* =========================
                  PENSAMIENTOS
              ========================== */}
              <div
                className="
                  absolute
                  left-1/2 top-[8%]
                  w-[180px]
                  -translate-x-1/2
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    border border-[#A7B89A]/30
                    bg-white
                    text-[#0F3D4A]
                    shadow-[0_10px_30px_rgba(15,61,74,0.05)]
                  "
                >
                  <Brain
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.5}
                  />
                </div>

                <p
                  className="
                    mt-3
                    font-serif
                    text-[22px]
                    text-[#0F3D4A]
                  "
                >
                  Pensamientos
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#657175]
                  "
                >
                  Cómo interpretamos lo que vivimos
                </p>
              </div>

              {/* =========================
                  EMOCIONES
              ========================== */}
              <div
                className="
                  absolute
                  bottom-[8%] left-[2%]
                  w-[180px]
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    border border-[#A7B89A]/30
                    bg-white
                    text-[#0F3D4A]
                    shadow-[0_10px_30px_rgba(15,61,74,0.05)]
                  "
                >
                  <Heart
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.5}
                  />
                </div>

                <p
                  className="
                    mt-3
                    font-serif
                    text-[22px]
                    text-[#0F3D4A]
                  "
                >
                  Emociones
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#657175]
                  "
                >
                  Lo que sentimos ante esas experiencias
                </p>
              </div>

              {/* =========================
                  CONDUCTAS
              ========================== */}
              <div
                className="
                  absolute
                  bottom-[8%] right-[2%]
                  w-[180px]
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    border border-[#A7B89A]/30
                    bg-white
                    text-[#0F3D4A]
                    shadow-[0_10px_30px_rgba(15,61,74,0.05)]
                  "
                >
                  <Activity
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.5}
                  />
                </div>

                <p
                  className="
                    mt-3
                    font-serif
                    text-[22px]
                    text-[#0F3D4A]
                  "
                >
                  Conductas
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#657175]
                  "
                >
                  Cómo respondemos y actuamos
                </p>
              </div>

              {/* Centro */}
              <div
                className="
                  absolute
                  left-1/2 top-[52%]
                  flex h-[118px] w-[118px]
                  -translate-x-1/2
                  -translate-y-1/2
                  flex-col
                  items-center justify-center
                  rounded-full
                  bg-[#0F3D4A]
                  text-center text-white
                  shadow-[0_18px_40px_rgba(15,61,74,0.12)]
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold uppercase
                    tracking-[0.18em]
                    text-[#D4AF37]
                  "
                >
                  Proceso
                </span>

                <span
                  className="
                    mt-1
                    font-serif
                    text-[22px]
                    leading-none
                  "
                >
                  terapéutico
                </span>
              </div>

              {/* Detalles dorados */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[14%] top-[18%]
                  h-2 w-2
                  rounded-full
                  bg-[#D4AF37]/70
                "
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-[23%] left-[27%]
                  h-1.5 w-1.5
                  rounded-full
                  bg-[#D4AF37]/60
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}