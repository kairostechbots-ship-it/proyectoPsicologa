'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CalendarDays,
  Flower2,
  Leaf,
  Sprout,
  Waves,
} from 'lucide-react';

import type { NaturalMedicineConsultation } from '@/types/natural-medicine';

interface NaturalMedicinePreviewProps {
  consultation: NaturalMedicineConsultation;
}

const techniqueIcons = [Leaf, Flower2, Sprout, Waves];

const ease = [0.22, 1, 0.36, 1] as const;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(price);

const additionalTechniques = [
  'Medicina China',
  'Flores de Bach',
  'Naturismo',
  'Desintoxicación orgánica',
  'Nutrición funcional',
  'Reflexología podal',
];

export function NaturalMedicinePreview({
  consultation,
}: NaturalMedicinePreviewProps) {
  const reduceMotion = useReducedMotion();

  const visibleTechniques = consultation.techniques
    .filter((technique) => technique.active && technique.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 4);

  return (
    <section
      id="medicina-natural"
      aria-labelledby="natural-medicine-title"
      className="
        relative
        overflow-hidden
        bg-[#FBFAF7]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          DECORACIÓN GENERAL
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
        {/* Semicírculo superior derecho */}
        <div
          className="
            absolute
            -right-[150px]
            -top-[180px]
            h-[460px]
            w-[460px]
            rounded-full
            border
            border-[#A7B89A]/15
            bg-[#A7B89A]/[0.08]
          "
        />

        {/* Semicírculo inferior izquierdo */}
        <div
          className="
            absolute
            -bottom-[210px]
            -left-[190px]
            h-[430px]
            w-[430px]
            rounded-full
            border
            border-[#A7B89A]/15
            bg-[#A7B89A]/[0.07]
          "
        />
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
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

            lg:grid-cols-[0.92fr_0.34fr_1.08fr]
            lg:gap-7

            xl:grid-cols-[0.95fr_0.38fr_1.1fr]
            xl:gap-9
          "
        >
          {/* =================================================
              COLUMNA IZQUIERDA
          ================================================== */}

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
            className="relative z-20"
          >
            {/* Etiqueta */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-9 bg-[#C89F36]"
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.23em]
                  text-[#596D65]
                  sm:text-[11px]
                "
              >
                Medicina Natural · Otra área de atención
              </p>
            </div>

            {/* Título */}
            <h2
              id="natural-medicine-title"
              className="
                mt-9
                max-w-[600px]
                font-serif
                text-[43px]
                font-medium
                leading-[1.06]
                tracking-[-0.035em]
                text-[#0F4A55]

                sm:text-[52px]
                lg:text-[55px]
                xl:text-[62px]
              "
            >
              Una alternativa para el{' '}
              <span className="font-normal italic">
                bienestar integral.
              </span>
            </h2>

            {/* Descripción */}
            <p
              className="
                mt-7
                max-w-[560px]
                text-[16px]
                leading-8
                text-[#66787C]
                sm:text-[17px]
              "
            >
              Erika también brinda atención en Medicina Natural mediante
              distintas técnicas seleccionadas de acuerdo con las necesidades
              de cada persona.
            </p>

            {/* Precio y cita */}
            <div
              className="
                mt-9
                flex
                max-w-[540px]
                items-stretch
                border-t
                border-[#A7B89A]/30
                pt-6
              "
            >
              {/* Precio */}
              <div className="min-w-[145px] pr-10">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#82918B]
                  "
                >
                  Consulta
                </p>

                <p
                  className="
                    mt-2
                    font-serif
                    text-[30px]
                    leading-none
                    text-[#0F4A55]
                  "
                >
                  {formatPrice(consultation.price)}
                </p>
              </div>

              {/* Cita */}
              {consultation.appointmentRequired && (
                <div
                  className="
                    border-l
                    border-[#A7B89A]/30
                    pl-10
                  "
                >
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#82918B]
                    "
                  >
                    Atención
                  </p>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-3
                      text-[15px]
                      text-[#244F56]
                    "
                  >
                    <CalendarDays
                      aria-hidden="true"
                      className="h-[21px] w-[21px]"
                      strokeWidth={1.5}
                    />

                    Previa cita
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/medicina-natural"
              className="
                group
                mt-10
                inline-flex
                min-h-[56px]
                items-center
                justify-center
                gap-8
                rounded-[11px]
                bg-[#0F4A55]
                px-7
                text-[15px]
                font-semibold
                text-white
                shadow-[0_10px_25px_rgba(15,74,85,0.12)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#153F48]
                hover:shadow-[0_14px_30px_rgba(15,74,85,0.16)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F4A55]
                focus-visible:ring-offset-4
              "
            >
              Conocer Medicina Natural

              <ArrowRight
                aria-hidden="true"
                className="
                  h-5
                  w-5
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                strokeWidth={1.6}
              />
            </Link>
          </motion.div>

          {/* =================================================
              RAMITA CENTRAL
              Grande, estática y tenue
          ================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              relative
              z-10
              hidden
              h-[600px]
              lg:block
            "
          >
            <svg
              viewBox="0 0 180 360"
              fill="none"
              className="
                absolute
                left-1/2
                top-1/2
                h-auto
                w-[300px]
                -translate-x-1/2
                -translate-y-1/2
                rotate-[-14deg]
                text-[#819275]
                opacity-[0.20]

                xl:w-[345px]
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
          </div>

          {/* =================================================
              COLUMNA DERECHA
          ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 24,
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
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="relative z-20"
          >
            {/* Encabezado */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#C89F36]"
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.23em]
                  text-[#596D65]
                  sm:text-[11px]
                "
              >
                Técnicas de Medicina Natural
              </p>
            </div>

            {/* =================================================
                4 TÉCNICAS DESTACADAS
            ================================================== */}

            {visibleTechniques.length > 0 ? (
              <div
                className="
                  mt-8
                  grid
                  gap-5
                  sm:grid-cols-2
                "
              >
                {visibleTechniques.map((technique, index) => {
                  const Icon =
                    techniqueIcons[index % techniqueIcons.length];

                  return (
                    <motion.article
                      key={technique.id}
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
                        amount: 0.25,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.55,
                        delay: reduceMotion
                          ? 0
                          : 0.15 + index * 0.09,
                        ease,
                      }}
                      className="
                        min-h-[190px]
                        rounded-[18px]
                        border
                        border-[#A7B89A]/20
                        bg-white/75
                        p-6
                        shadow-[0_12px_30px_rgba(15,61,74,0.035)]
                        backdrop-blur-[2px]
                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:border-[#A7B89A]/40
                        hover:bg-white
                        hover:shadow-[0_18px_35px_rgba(15,61,74,0.065)]
                      "
                    >
                      {/* Icono */}
                      <div
                        className="
                          flex
                          h-[54px]
                          w-[54px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[#EEF2EC]
                          text-[#0F4A55]
                        "
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-[23px] w-[23px]"
                          strokeWidth={1.45}
                        />
                      </div>

                      {/* Nombre */}
                      <h3
                        className="
                          mt-5
                          font-serif
                          text-[22px]
                          font-medium
                          leading-tight
                          text-[#0F4A55]
                        "
                      >
                        {technique.name}
                      </h3>

                      {/* Descripción */}
                      <p
                        className="
                          mt-2
                          max-w-[250px]
                          text-[13px]
                          leading-[1.65]
                          text-[#607579]
                        "
                      >
                        {technique.shortDescription}
                      </p>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <p className="mt-8 text-sm text-[#657175]">
                Próximamente encontrarás aquí las técnicas disponibles.
              </p>
            )}

            {/* =================================================
                RESTO DE TÉCNICAS
            ================================================== */}

            <div className="mt-7">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#82918B]
                "
              >
                También disponible
              </p>

              <div
                className="
                  mt-3
                  flex
                  max-w-[620px]
                  flex-wrap
                  items-center
                  gap-x-2
                  gap-y-1
                "
              >
                {additionalTechniques.map((technique, index) => (
                  <div
                    key={technique}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="
                          text-[13px]
                          text-[#D4AF37]
                        "
                      >
                        ·
                      </span>
                    )}

                    <span
                      className="
                        text-[13px]
                        leading-6
                        text-[#607579]
                      "
                    >
                      {technique}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                AVISO
            ================================================== */}

            <div
              className="
                mt-6
                border-t
                border-[#A7B89A]/25
                pt-5
              "
            >
              <p
                className="
                  max-w-[620px]
                  text-[11px]
                  leading-5
                  text-[#78888A]
                "
              >
                Los servicios de Medicina Natural se ofrecen de manera
                independiente a la psicoterapia y no sustituyen la valoración,
                diagnóstico o tratamiento médico.
              </p>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            RAMITA DECORATIVA MÓVIL
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-12
            lg:hidden
          "
        >
          <svg
            viewBox="0 0 180 360"
            fill="none"
            className="
              h-auto
              w-56
              rotate-[-14deg]
              text-[#819275]
              opacity-[0.10]
              sm:w-64
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
        </div>
      </div>
    </section>
  );
}