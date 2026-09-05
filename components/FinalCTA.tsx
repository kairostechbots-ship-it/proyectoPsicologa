'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Clock3,
  MapPin,
  Monitor,
} from 'lucide-react';

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.'
)}`;

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="
        relative
        overflow-hidden
        bg-[#0F3D4A]
        py-20
        sm:py-24
        lg:py-28
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
        {/* Círculo decorativo superior */}
        <div
          className="
            absolute
            -right-[220px]
            -top-[300px]
            h-[600px]
            w-[600px]
            rounded-full
            border
            border-white/[0.06]
          "
        />

        {/* Círculo interior */}
        <div
          className="
            absolute
            -right-[120px]
            -top-[210px]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-[#D4AF37]/[0.08]
          "
        />

        {/* Ramita decorativa */}
        <svg
          viewBox="0 0 180 360"
          fill="none"
          className="
            absolute
            -bottom-24
            right-[2%]
            h-auto
            w-[280px]
            rotate-[-18deg]
            text-[#A7B89A]
            opacity-[0.09]

            sm:w-[350px]
            lg:-bottom-36
            lg:right-[4%]
            lg:w-[470px]
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
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1180px]
          px-5
          sm:px-6
          lg:px-8
        "
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
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
            duration: reduceMotion ? 0 : 0.75,
            ease,
          }}
          className="
            mx-auto
            max-w-[900px]
            text-center
          "
        >
          {/* Eyebrow */}
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-[#D4AF37]
              "
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#C8D2CC]
                sm:text-[11px]
              "
            >
              Dar el primer paso
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-[#D4AF37]
              "
            />
          </div>

          {/* Título */}
          <h2
            id="final-cta-title"
            className="
              mx-auto
              mt-8
              max-w-[850px]
              font-serif
              text-[42px]
              font-medium
              leading-[1.08]
              tracking-[-0.035em]
              text-[#F7F4EC]

              sm:text-[52px]
              lg:text-[62px]
            "
          >
            Tu proceso puede comenzar{' '}
            <span className="font-normal italic text-[#DCE4DC]">
              con una conversación.
            </span>
          </h2>

          {/* Texto */}
          <p
            className="
              mx-auto
              mt-7
              max-w-[680px]
              text-[15px]
              leading-7
              text-[#D0DAD6]
              sm:text-[16px]
            "
          >
            Si deseas recibir información o conocer la disponibilidad para
            iniciar un proceso de terapia, puedes comunicarte directamente
            por WhatsApp.
          </p>

          {/* =================================================
              CTA
          ================================================== */}

          <div
            className="
              mt-9
              flex
              justify-center
            "
          >
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                min-h-[58px]
                items-center
                justify-center
                gap-7
                rounded-[11px]
                bg-[#F7F4EC]
                px-8
                text-[14px]
                font-semibold
                text-[#0F3D4A]
                shadow-[0_14px_35px_rgba(0,0,0,0.10)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-white
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.15)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#D4AF37]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#0F3D4A]
              "
            >
              Solicitar cita por WhatsApp

              <ArrowRight
                aria-hidden="true"
                className="
                  h-[18px]
                  w-[18px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                strokeWidth={1.7}
              />
            </Link>
          </div>

          {/* =================================================
              INFORMACIÓN RÁPIDA
          ================================================== */}

          <div
            className="
              mx-auto
              mt-12
              grid
              max-w-[780px]
              gap-5
              border-t
              border-white/[0.12]
              pt-7

              sm:grid-cols-3
              sm:gap-0
            "
          >
            {/* Modalidad */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                px-5
              "
            >
              <Monitor
                aria-hidden="true"
                className="
                  h-[18px]
                  w-[18px]
                  shrink-0
                  text-[#D4AF37]
                "
                strokeWidth={1.5}
              />

              <span
                className="
                  text-[12px]
                  text-[#D0DAD6]
                  sm:text-[13px]
                "
              >
                Presencial y en línea
              </span>
            </div>

            {/* Horario */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                px-5

                sm:border-x
                sm:border-white/[0.10]
              "
            >
              <Clock3
                aria-hidden="true"
                className="
                  h-[18px]
                  w-[18px]
                  shrink-0
                  text-[#D4AF37]
                "
                strokeWidth={1.5}
              />

              <span
                className="
                  text-[12px]
                  text-[#D0DAD6]
                  sm:text-[13px]
                "
              >
                Lun–Vie · 4:00–9:00 pm
              </span>
            </div>

            {/* Ubicación */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                px-5
              "
            >
              <MapPin
                aria-hidden="true"
                className="
                  h-[18px]
                  w-[18px]
                  shrink-0
                  text-[#D4AF37]
                "
                strokeWidth={1.5}
              />

              <span
                className="
                  text-[12px]
                  text-[#D0DAD6]
                  sm:text-[13px]
                "
              >
                Tlajomulco Centro
              </span>
            </div>
          </div>

          {/* Nota */}
          <p
            className="
              mt-6
              text-[10px]
              tracking-[0.04em]
              text-white/40
            "
          >
            Atención con cita previa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}