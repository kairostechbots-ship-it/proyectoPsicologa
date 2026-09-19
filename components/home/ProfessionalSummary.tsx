'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const credentials = [
  'Psicóloga Clínica',
  'Especializada en Terapia Cognitivo-Conductual',
  'Atención presencial y en línea',
];

export function ProfessionalSummary() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="professional-summary-title"
      className="
        relative overflow-hidden
        bg-[#FBFAF7]
        py-20 sm:py-24 lg:py-28
      "
    >
      {/* Decoración */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Luz suave */}
        <div
          className="
            absolute
            -left-48 bottom-[-160px]
            h-[430px] w-[430px]
            rounded-full
            bg-[#A7B89A]/10
            blur-[100px]
          "
        />

        {/* Línea dorada */}
        <svg
          viewBox="0 0 500 180"
          fill="none"
          className="
            absolute
            right-[-100px] top-8
            hidden w-[500px]
            text-[#D4AF37]
            opacity-[0.12]
            lg:block
          "
        >
          <path
            d="M20 150C155 47 302 30 480 84"
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
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-20
            xl:gap-28
          "
        >
          {/* =====================================================
              COMPOSICIÓN VISUAL
          ====================================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -24,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease,
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[500px]
              lg:mx-0
            "
          >
            <div
              className="
                relative
                min-h-[480px]
                overflow-hidden
                rounded-[42px]
                border border-[#A7B89A]/20
                bg-[#EEF2EA]
                px-8 py-10
                sm:min-h-[540px]
                sm:px-11 sm:py-12
              "
            >
              {/* Círculo grande */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-32 -top-32
                  h-[360px] w-[360px]
                  rounded-full
                  border border-[#A7B89A]/30
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-20 -top-20
                  h-[260px] w-[260px]
                  rounded-full
                  border border-[#D4AF37]/20
                "
              />

              {/* Número */}
              <div className="relative">
                <p
                  className="
                    font-serif
                    text-[120px]
                    font-medium
                    leading-[0.85]
                    tracking-[-0.07em]
                    text-[#0F3D4A]
                    sm:text-[155px]
                  "
                >
                  22
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#D4AF37]" />

                  <p
                    className="
                      text-[10px]
                      font-semibold uppercase
                      tracking-[0.2em]
                      text-[#52665A]
                    "
                  >
                    años de trayectoria
                  </p>
                </div>
              </div>

              {/* Frase */}
              <blockquote
                className="
                  relative
                  mt-16
                  max-w-[330px]
                  font-serif
                  text-[27px]
                  font-normal
                  italic
                  leading-[1.35]
                  text-[#0F3D4A]
                  sm:mt-20
                  sm:text-[31px]
                "
              >
                “Un espacio seguro, confidencial y libre de juicios.”
              </blockquote>

              {/* Firma / nombre */}
              <div className="relative mt-9">
                <span
                  aria-hidden="true"
                  className="
                    block h-px w-16
                    bg-[#A7B89A]/60
                  "
                />

                <p
                  className="
                    mt-4
                    text-sm font-medium
                    text-[#52665A]
                  "
                >
                  Erika Pilar
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-semibold uppercase
                    tracking-[0.17em]
                    text-[#7C8881]
                  "
                >
                  Psicóloga Clínica · TCC
                </p>
              </div>

              {/* Rama muy discreta */}
              <svg
                aria-hidden="true"
                viewBox="0 0 180 360"
                fill="none"
                className="
                  pointer-events-none
                  absolute
                  -bottom-20 -right-10
                  h-auto w-44
                  rotate-[-14deg]
                  text-[#819275]
                  opacity-[0.13]
                  sm:w-52
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

              {/* Punto dorado */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-[22%] right-[17%]
                  h-2 w-2
                  rounded-full
                  bg-[#D4AF37]/70
                "
              />
            </div>
          </motion.div>

          {/* =====================================================
              INFORMACIÓN SOBRE ERIKA
          ====================================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease,
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
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
                Sobre mí
              </p>
            </div>

            {/* Título */}
            <h2
              id="professional-summary-title"
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
              Experiencia profesional con un acompañamiento{' '}
              <span className="italic font-normal">
                cercano y humano.
              </span>
            </h2>

            {/* Presentación */}
            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-7
                text-[#657175]
                sm:text-[17px]
                sm:leading-8
              "
            >
              Soy Erika Pilar, Psicóloga Clínica especializada en Terapia
              Cognitivo-Conductual. A lo largo de mi trayectoria he
              acompañado a personas en diferentes etapas de su vida,
              brindando atención profesional y personalizada.
            </p>

            <p
              className="
                mt-4
                max-w-xl
                text-base
                leading-7
                text-[#657175]
              "
            >
              Mi propósito es ofrecer un espacio de escucha, respeto y
              confianza, en el que podamos trabajar de manera colaborativa
              de acuerdo con tus necesidades y objetivos personales.
            </p>

            {/* Credenciales */}
            <div
              className="
                mt-8
                border-y border-[#A7B89A]/25
                py-6
              "
            >
              <div className="space-y-4">
                {credentials.map((credential) => (
                  <div
                    key={credential}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="
                        mt-0.5
                        flex h-5 w-5
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-[#EEF2EA]
                        text-[#0F3D4A]
                      "
                    >
                      <Check
                        aria-hidden="true"
                        className="h-3 w-3"
                        strokeWidth={2}
                      />
                    </span>

                    <p
                      className="
                        text-sm
                        leading-6
                        text-[#52665A]
                      "
                    >
                      {credential}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/quien-soy"
              className="
                group
                mt-8
                inline-flex min-h-11
                items-center gap-2
                py-2
                text-sm font-semibold
                text-[#0F3D4A]
                transition-colors
                hover:text-[#52665A]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F3D4A]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#FBFAF7]
              "
            >
              Conocer más sobre Erika

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
        </div>
      </div>
    </section>
  );
}