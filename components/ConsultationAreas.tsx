'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  CloudRain,
  HeartCrack,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const areas = [
  {
    title: 'Ansiedad',
    description:
      'Acompañamiento para comprender pensamientos, emociones y respuestas que pueden estar afectando tu bienestar.',
    icon: Brain,
  },
  {
    title: 'Depresión',
    description:
      'Un espacio profesional para trabajar emociones, pensamientos y conductas que interfieren en tu vida cotidiana.',
    icon: CloudRain,
  },
  {
    title: 'Duelo y pérdidas',
    description:
      'Acompañamiento respetuoso para transitar procesos de pérdida, cambio y adaptación.',
    icon: HeartCrack,
  },
  {
    title: 'Adicciones',
    description:
      'Prevención y acompañamiento psicológico ante problemáticas relacionadas con conductas adictivas.',
    icon: Sparkles,
  },
  {
    title: 'Experiencias de violencia',
    description:
      'Atención confidencial y profesional para personas que han vivido experiencias de violencia.',
    icon: ShieldCheck,
  },
  {
    title: 'Pareja y relaciones',
    description:
      'Un espacio para trabajar comunicación, conflictos y dinámicas que afectan la relación.',
    icon: UsersRound,
  },
];

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-white';

export function ConsultationAreas() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      aria-labelledby="consultation-areas-title"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Decoración muy sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute -right-32 top-20
            h-[340px] w-[340px]
            rounded-full
            bg-[#A7B89A]/[0.06]
            blur-[100px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            ENCABEZADO
        ====================================================== */}
        <div
          className="
            grid gap-8
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#D4AF37]"
              />

              <p
                className="
                  text-[10px] font-semibold uppercase
                  tracking-[0.18em]
                  text-[#52665A]
                  sm:text-[11px]
                "
              >
                Psicoterapia
              </p>
            </div>

            <h2
              id="consultation-areas-title"
              className="
                mt-5 max-w-xl
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
              ¿En qué puedo{' '}
              <span className="italic font-normal">
                acompañarte?
              </span>
            </h2>
          </div>
          {/* Rama botánica decorativa */}
<svg
  aria-hidden="true"
  viewBox="0 0 180 360"
  fill="none"
  focusable="false"
  className="
    pointer-events-none
    absolute
    -bottom-20 -right-8
    hidden h-auto w-44
    rotate-[-18deg]
    text-[#819275]
    opacity-[0.10]
    md:block
    lg:-right-5 lg:w-52
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

          <div className="max-w-xl lg:justify-self-end">
            <p
              className="
                text-base leading-7
                text-[#657175]
                sm:text-[17px] sm:leading-8
              "
            >
              Cada proceso comienza en un lugar diferente. La terapia puede
              ayudarte a comprender lo que estás viviendo y a desarrollar
              herramientas para afrontar distintas situaciones de tu vida.
            </p>
          </div>
        </div>

        {/* =====================================================
            ÁREAS
        ====================================================== */}
        <motion.div
          variants={reduceMotion ? {} : container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-14
            grid
            border-y border-[#A7B89A]/25
            sm:grid-cols-2
            lg:mt-16
            lg:grid-cols-3
          "
        >
          {areas.map(({ title, description, icon: Icon }, index) => {
            const isLastColumn = (index + 1) % 3 === 0;

            return (
              <motion.article
                key={title}
                variants={reduceMotion ? {} : item}
                className={`
                  group relative
                  min-h-[230px]
                  border-b border-[#A7B89A]/25
                  px-1 py-8
                  transition-colors duration-300
                  sm:px-7
                  lg:px-8 lg:py-9
                  lg:hover:bg-[#FBFAF7]
                  ${
                    !isLastColumn
                      ? 'lg:border-r lg:border-[#A7B89A]/25'
                      : ''
                  }
                  ${
                    index >= 3
                      ? 'lg:border-b-0'
                      : ''
                  }
                `}
              >
                {/* Número editorial */}
                <span
                  aria-hidden="true"
                  className="
                    absolute right-5 top-7
                    font-serif text-sm
                    text-[#A7B89A]
                    sm:right-7
                  "
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icono */}
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    bg-[#F2F1EC]
                    text-[#0F3D4A]
                    transition-colors duration-300
                    group-hover:bg-[#A7B89A]/20
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Contenido */}
                <h3
                  className="
                    mt-6
                    font-serif
                    text-[24px]
                    font-medium
                    leading-tight
                    text-[#0F3D4A]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-3 max-w-[330px]
                    text-sm leading-6
                    text-[#657175]
                  "
                >
                  {description}
                </p>

                {/* Línea dorada */}
                <div
                  aria-hidden="true"
                  className="
                    mt-6
                    h-px w-8
                    bg-[#D4AF37]/70
                    transition-all duration-300
                    group-hover:w-12
                  "
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* =====================================================
            CIERRE
        ====================================================== */}
        <div
          className="
            mt-9
            flex flex-col gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-2xl
              text-sm leading-6
              text-[#657175]
            "
          >
            Cada situación es diferente. El acompañamiento se adapta a tus
            necesidades, objetivos y proceso personal.
          </p>

          <Link
            href="/servicios"
            className={`
              group
              inline-flex min-h-11
              shrink-0 items-center
              gap-2
              self-start
              rounded-lg
              px-1 py-2
              text-sm font-semibold
              text-[#0F3D4A]
              transition-colors
              hover:text-[#174F5D]
              sm:self-auto
              ${focusStyles}
            `}
          >
            Conocer la psicoterapia

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-1
              "
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}