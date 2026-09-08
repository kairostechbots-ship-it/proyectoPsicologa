'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowDown,
  MessageCircle,
} from 'lucide-react';

import type { NaturalMedicineConsultation } from '@/types/natural-medicine';

interface NaturalMedicineHeroProps {
  consultation: NaturalMedicineConsultation;
}

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre la consulta de Medicina Natural.'
)}`;

const ease = [0.22, 1, 0.36, 1] as const;

export function NaturalMedicineHero({
  consultation,
}: NaturalMedicineHeroProps) {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease,
      },
    },
  };

  return (
    <section
      aria-labelledby="natural-medicine-hero-title"
      className="
        relative
        overflow-hidden
        bg-[#FBFAF7]
        px-5
        pb-12
        pt-12

        sm:px-6
        sm:pb-14
        sm:pt-16

        lg:px-8
        lg:pb-16
        lg:pt-20
      "
    >
      {/* =====================================================
          DECORACIÓN
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Forma salvia grande */}
        <div
          className="
            absolute
            -right-[190px]
            top-[-120px]
            h-[390px]
            w-[390px]
            rounded-full
            bg-[#A7B89A]/10

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

        {/* Línea dorada */}
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
          grid
          max-w-7xl
          gap-10

          lg:grid-cols-[1.05fr_0.95fr]
          lg:items-center
          lg:gap-16

          xl:gap-24
        "
      >
        {/* =================================================
            COLUMNA PRINCIPAL
        ================================================== */}

        <motion.div
          variants={
            reduceMotion
              ? {}
              : {
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.09,
                    },
                  },
                }
          }
          initial="hidden"
          animate="show"
          className="relative z-20"
        >
          {/* Eyebrow */}
          <motion.div
            variants={reduceMotion ? {} : item}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-px w-7 shrink-0 bg-[#D4AF37] sm:w-9"
            />

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#596D65]

                sm:text-[11px]
                sm:tracking-[0.2em]
              "
            >
              Medicina Natural · Otra área de atención
            </p>
          </motion.div>

          {/* Título */}
          <motion.h1
            variants={reduceMotion ? {} : item}
            id="natural-medicine-hero-title"
            className="
              mt-5
              max-w-[680px]
              font-serif
              text-[39px]
              font-medium
              leading-[1.04]
              tracking-[-0.035em]
              text-[#0F4A55]

              min-[390px]:text-[42px]

              sm:text-[52px]

              lg:text-[62px]

              xl:text-[68px]
            "
          >
            Una alternativa para el{' '}
            <span className="relative inline-block font-normal italic">
              bienestar integral.

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-[72%]
                  bg-[#D4AF37]/60
                "
              />
            </span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            variants={reduceMotion ? {} : item}
            className="
              mt-6
              max-w-[590px]
              text-[15px]
              leading-7
              text-[#66787C]

              sm:text-[17px]
              sm:leading-8
            "
          >
            Erika también brinda atención en Medicina Natural mediante
            distintas técnicas seleccionadas de acuerdo con las necesidades
            de cada persona.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={reduceMotion ? {} : item}
            className="
              mt-8
              flex
              flex-col
              gap-3

              min-[440px]:flex-row
              min-[440px]:items-center
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
                rounded-[11px]
                bg-[#0F4A55]
                px-6
                text-[14px]
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(15,74,85,0.12)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#153F48]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F4A55]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#FBFAF7]
              "
            >
              <MessageCircle
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                strokeWidth={1.7}
              />

              Solicitar información
            </a>

            <Link
              href="#tecnicas-medicina-natural"
              className="
                group
                inline-flex
                min-h-[52px]
                items-center
                justify-center
                gap-2
                rounded-[11px]
                border
                border-[#0F4A55]/15
                px-6
                text-[14px]
                font-semibold
                text-[#0F4A55]
                transition-colors

                hover:border-[#0F4A55]/30
                hover:bg-white/60

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F4A55]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#FBFAF7]
              "
            >
              Conocer las técnicas

              <ArrowDown
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-y-0.5
                "
                strokeWidth={1.7}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* =================================================
            VISUAL BOTÁNICO
        ================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.15,
            ease,
          }}
          className="
            relative
            mx-auto
            flex
            h-[230px]
            w-full
            max-w-[380px]
            items-center
            justify-center

            sm:h-[310px]
            sm:max-w-[460px]

            lg:h-[440px]
            lg:max-w-none
          "
        >
          {/* Forma orgánica */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[200px]
              w-[200px]
              -translate-x-1/2
              -translate-y-1/2
              rotate-[8deg]
              rounded-[43%_57%_46%_54%/57%_44%_56%_43%]
              bg-[#A7B89A]/14

              sm:h-[270px]
              sm:w-[270px]

              lg:h-[380px]
              lg:w-[380px]
            "
          />

          {/* Círculo fino */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[170px]
              w-[170px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#D4AF37]/20

              sm:h-[230px]
              sm:w-[230px]

              lg:h-[320px]
              lg:w-[320px]
            "
          />

          {/* Rama */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 360"
            fill="none"
            className="
              relative
              z-10
              h-auto
              w-[115px]
              rotate-[-12deg]
              text-[#71856D]
              opacity-[0.72]

              sm:w-[155px]

              lg:w-[205px]
            "
          >
            <g
              stroke="currentColor"
              strokeWidth="1.15"
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
            aria-hidden="true"
            className="
              absolute
              right-[20%]
              top-[20%]
              h-2
              w-2
              rounded-full
              bg-[#D4AF37]/70
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[20%]
              left-[20%]
              h-1.5
              w-1.5
              rounded-full
              bg-[#D4AF37]/55
            "
          />
        </motion.div>
      </div>
    </section>
  );
}