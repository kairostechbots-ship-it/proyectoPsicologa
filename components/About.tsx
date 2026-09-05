'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  Brain,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   FORMACIÓN
========================================================= */

const psychologyTraining = [
  {
    title: 'Licenciatura en Psicología Clínica',
  },
  {
    title: 'Sexualidad Humana',
    institution: 'Universidad de Guadalajara · UDG',
  },
  {
    title: 'Acompañamiento en el Duelo',
    institution: 'Centro San Camilo',
  },
  {
    title: 'Prevención y Tratamiento de Adicciones',
    institution: 'CECAJ / CONADIC',
  },
  {
    title: 'Desarrollo Cristiano Integral',
    institution: 'UNIVA',
  },
];

const complementaryTraining = [
  {
    title: 'Enfermería General',
    institution: 'IMSS',
  },
  {
    title: 'Lic. Terapeuta en Medicina Natural',
    institution: 'ITEMN',
  },
  {
    title: 'Terapia Floral y Acupuntura',
  },
  {
    title: 'Medicina Tradicional China y Fitoterapia',
  },
  {
    title: 'Biomagnetismo',
    institution: 'CUAM',
  },
  {
    title: 'Geriatría y Medicina Integradora',
    institution: 'INMENAC',
  },
];

/* =========================================================
   EXPERIENCIA CLÍNICA
========================================================= */

const clinicalAreas = [
  'Ansiedad',
  'Depresión',
  'Duelo y pérdidas',
  'Conductas autodestructivas',
  'Prevención y tratamiento de adicciones',
  'Situaciones de violencia',
];

const people = [
  {
    label: 'Niños',
    icon: UserRound,
  },
  {
    label: 'Adolescentes',
    icon: UserRound,
  },
  {
    label: 'Jóvenes',
    icon: UserRound,
  },
  {
    label: 'Adultos',
    icon: UserRound,
  },
  {
    label: 'Parejas',
    icon: UsersRound,
  },
];

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* =====================================================
          PRESENTACIÓN
      ====================================================== */}

      <section
        id="about"
        aria-labelledby="about-title"
        className="
          relative
          overflow-hidden
          bg-[#FBFAF7]
          py-20
          sm:py-24
          lg:py-28
        "
      >
        {/* DECORACIÓN */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          {/* Semicírculo superior izquierdo */}
          <div
            className="
              absolute
              -left-[280px]
              -top-[250px]
              h-[540px]
              w-[540px]
              rounded-full
              border
              border-[#A7B89A]/10
            "
          />

          {/* Semicírculo inferior derecho */}
          <div
            className="
              absolute
              -right-[260px]
              bottom-[-300px]
              h-[540px]
              w-[540px]
              rounded-full
              border
              border-[#D4AF37]/[0.07]
            "
          />

          {/* Ramita */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 360"
            fill="none"
            className="
              absolute
              -bottom-24
              -left-10
              h-auto
              w-[280px]
              rotate-[12deg]
              text-[#819275]
              opacity-[0.07]

              sm:w-[340px]

              lg:-bottom-32
              lg:left-[2%]
              lg:w-[430px]
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

        {/* CONTENIDO */}
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
          <div
            className="
              grid
              gap-14
              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
              lg:gap-20
            "
          >
            {/* =================================================
                IZQUIERDA
            ================================================== */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -25,
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
                duration: reduceMotion ? 0 : 0.75,
                ease,
              }}
            >
              {/* Etiqueta */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#D4AF37]/25
                  bg-white/55
                  px-4
                  py-2
                  backdrop-blur-sm
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#D4AF37]
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.23em]
                    text-[#0F4A55]
                  "
                >
                  Sobre mí
                </span>
              </div>

              {/* Título */}
              <h1
                id="about-title"
                className="
                  mt-9
                  max-w-[550px]
                  font-serif
                  text-[44px]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-[#0F4A55]

                  sm:text-[52px]
                  lg:text-[60px]
                "
              >
                Comprender lo que vives es el{' '}
                <span className="font-normal italic">
                  primer paso
                </span>{' '}
                para transformarlo.
              </h1>

              {/* Datos */}
              <div
                className="
                  mt-10
                  grid
                  max-w-[520px]
                  grid-cols-2
                  gap-6
                  border-t
                  border-[#A7B89A]/25
                  pt-8
                "
              >
                <div>
                  <p
                    className="
                      font-serif
                      text-[45px]
                      leading-none
                      text-[#0F4A55]
                      sm:text-[50px]
                    "
                  >
                    +22
                  </p>

                  <p
                    className="
                      mt-3
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#718079]
                    "
                  >
                    Años de trayectoria
                  </p>
                </div>

                <div
                  className="
                    border-l
                    border-[#A7B89A]/20
                    pl-6
                  "
                >
                  <p
                    className="
                      font-serif
                      text-[45px]
                      leading-none
                      text-[#0F4A55]
                      sm:text-[50px]
                    "
                  >
                    TCC
                  </p>

                  <p
                    className="
                      mt-3
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#718079]
                    "
                  >
                    Enfoque terapéutico
                  </p>
                </div>
              </div>

              {/* Estrella */}
              <div
                aria-hidden="true"
                className="mt-10"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-[#D4AF37] opacity-45"
                >
                  <path
                    d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </motion.div>

            {/* =================================================
                DERECHA
            ================================================== */}

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
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.08,
                ease,
              }}
              className="
                relative
                rounded-[30px]
                border
                border-[#A7B89A]/20
                bg-white/55
                p-7
                shadow-[0_20px_60px_rgba(15,61,74,0.035)]
                backdrop-blur-sm

                sm:p-10
                lg:p-12
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-12
                  top-0
                  h-[2px]
                  w-14
                  bg-[#D4AF37]
                "
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#82918B]
                "
              >
                Psicóloga Clínica
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[34px]
                  font-medium
                  leading-tight
                  text-[#0F4A55]
                  sm:text-[40px]
                "
              >
                Hola, soy{' '}
                <span className="font-normal italic">
                  Erika Pilar.
                </span>
              </h2>

              {/* Biografía */}
              <div
                className="
                  mt-7
                  space-y-5
                  text-[15px]
                  leading-7
                  text-[#66787C]
                "
              >
                <p>
                  Soy Licenciada en Psicología Clínica, especializada en{' '}
                  <strong className="font-semibold text-[#435D61]">
                    Terapia Cognitivo-Conductual (TCC)
                  </strong>
                  , con experiencia en diagnóstico, tratamiento psicológico
                  clínico y psicoterapia.
                </p>

                <p>
                  Mi enfoque está centrado en tus necesidades y metas
                  personales. A través de un acompañamiento profesional,
                  trabajamos en el desarrollo de herramientas que te permitan
                  comprender y afrontar de una mejor manera las situaciones
                  que estás viviendo.
                </p>

                <p>
                  Mi objetivo es ofrecerte un espacio seguro, confidencial y
                  libre de juicios, donde puedas expresar lo que estás
                  sintiendo y trabajar en tu bienestar emocional desde una
                  atención humana y profesional.
                </p>
              </div>

              {/* Valores */}
              <div
                className="
                  mt-9
                  grid
                  gap-5
                  border-t
                  border-[#A7B89A]/20
                  pt-7
                  sm:grid-cols-2
                "
              >
                <div className="flex items-start gap-3">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EEF2EC]
                      text-[#597060]
                    "
                  >
                    <HeartHandshake
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div>
                    <p className="font-serif text-[16px] text-[#0F4A55]">
                      Atención humana
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#7A898B]">
                      Acompañamiento cercano y respetuoso.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EEF2EC]
                      text-[#597060]
                    "
                  >
                    <ShieldCheck
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div>
                    <p className="font-serif text-[16px] text-[#0F4A55]">
                      Confidencialidad
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#7A898B]">
                      Un espacio profesional y libre de juicios.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORMACIÓN + EXPERIENCIA
      ====================================================== */}

      <section
        aria-labelledby="training-title"
        className="
          relative
          overflow-hidden
          bg-white
          py-20
          sm:py-24
          lg:py-28
        "
      >
        {/* Círculo decorativo */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[300px]
            top-[5%]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-[#A7B89A]/[0.07]
          "
        />

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
          {/* =================================================
              FORMACIÓN
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
              grid
              gap-7
              border-b
              border-[#A7B89A]/20
              pb-10

              lg:grid-cols-[0.8fr_1.2fr]
              lg:items-end
            "
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-9 bg-[#D4AF37]" />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-[#596D65]
                  "
                >
                  Trayectoria
                </p>
              </div>

              <h2
                id="training-title"
                className="
                  mt-6
                  max-w-[540px]
                  font-serif
                  text-[39px]
                  font-medium
                  leading-[1.1]
                  tracking-[-0.03em]
                  text-[#0F4A55]

                  sm:text-[47px]
                "
              >
                Una formación construida{' '}
                <span className="font-normal italic">
                  a lo largo del tiempo.
                </span>
              </h2>
            </div>

            <p
              className="
                max-w-[570px]
                text-[14px]
                leading-7
                text-[#718083]

                lg:justify-self-end
              "
            >
              Mi preparación profesional se ha enriquecido con formación en
              distintas áreas relacionadas con la salud mental, el
              acompañamiento y el bienestar.
            </p>
          </motion.div>

          {/* Tarjetas formación */}
          <div
            className="
              mt-12
              grid
              gap-8
              lg:grid-cols-2
              lg:gap-10
            "
          >
            {/* PSICOLOGÍA */}
            <motion.article
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
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease,
              }}
              className="
                rounded-[24px]
                border
                border-[#A7B89A]/20
                bg-[#FBFAF7]
                p-7
                sm:p-9
              "
            >
              <div className="flex items-center gap-4">
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E9EFE9]
                    text-[#526D5B]
                  "
                >
                  <Brain
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.5}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#9B7A1F]
                    "
                  >
                    Área principal
                  </p>

                  <h3 className="mt-1 font-serif text-[23px] text-[#0F4A55]">
                    Psicología y acompañamiento
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                {psychologyTraining.map(
                  ({ title, institution }, index) => (
                    <div
                      key={title}
                      className={`
                        flex
                        gap-4
                        py-4
                        ${
                          index !== 0
                            ? 'border-t border-[#A7B89A]/15'
                            : ''
                        }
                      `}
                    >
                      <span
                        className="
                          mt-[8px]
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#D4AF37]
                        "
                      />

                      <div>
                        <p
                          className="
                            text-[14px]
                            font-medium
                            leading-6
                            text-[#435D61]
                          "
                        >
                          {title}
                        </p>

                        {institution && (
                          <p
                            className="
                              mt-1
                              text-[11px]
                              leading-5
                              text-[#82918B]
                            "
                          >
                            {institution}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.article>

            {/* COMPLEMENTARIA */}
            <motion.article
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
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.08,
                ease,
              }}
              className="
                rounded-[24px]
                border
                border-[#D4AF37]/15
                bg-[#F8F6F0]
                p-7
                sm:p-9
              "
            >
              <div className="flex items-center gap-4">
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EEEBDD]
                    text-[#7A765B]
                  "
                >
                  <Leaf
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.5}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#9B7A1F]
                    "
                  >
                    Otras áreas
                  </p>

                  <h3 className="mt-1 font-serif text-[23px] text-[#0F4A55]">
                    Formación complementaria
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                {complementaryTraining.map(
                  ({ title, institution }, index) => (
                    <div
                      key={title}
                      className={`
                        flex
                        gap-4
                        py-4
                        ${
                          index !== 0
                            ? 'border-t border-[#A7B89A]/15'
                            : ''
                        }
                      `}
                    >
                      <span
                        className="
                          mt-[8px]
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-[#D4AF37]
                        "
                      />

                      <div>
                        <p
                          className="
                            text-[14px]
                            font-medium
                            leading-6
                            text-[#435D61]
                          "
                        >
                          {title}
                        </p>

                        {institution && (
                          <p
                            className="
                              mt-1
                              text-[11px]
                              leading-5
                              text-[#82918B]
                            "
                          >
                            {institution}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.article>
          </div>

          {/* Nota medicina natural */}
          <div
            className="
              mt-9
              flex
              items-start
              gap-3
            "
          >
            <Sparkles
              aria-hidden="true"
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                text-[#B2943D]
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[800px]
                text-[11px]
                leading-5
                text-[#82918B]
              "
            >
              La Medicina Natural se presenta como un área de atención
              independiente de la psicoterapia y no sustituye la valoración,
              diagnóstico o tratamiento médico.
            </p>
          </div>

          {/* =================================================
              EXPERIENCIA CLÍNICA
          ================================================== */}

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
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease,
            }}
            className="
              mt-20
              border-t
              border-[#A7B89A]/20
              pt-16
              sm:mt-24
              sm:pt-20
            "
          >
            <div
              className="
                grid
                gap-12
                lg:grid-cols-[0.85fr_1.15fr]
                lg:gap-20
              "
            >
              {/* Texto */}
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-9 bg-[#D4AF37]" />

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.24em]
                      text-[#596D65]
                    "
                  >
                    Experiencia clínica
                  </p>
                </div>

                <h2
                  className="
                    mt-6
                    max-w-[500px]
                    font-serif
                    text-[38px]
                    font-medium
                    leading-[1.12]
                    tracking-[-0.03em]
                    text-[#0F4A55]
                    sm:text-[45px]
                  "
                >
                  Acompañamiento en diferentes{' '}
                  <span className="font-normal italic">
                    etapas y situaciones.
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    max-w-[520px]
                    text-[14px]
                    leading-7
                    text-[#718083]
                  "
                >
                  A lo largo de mi trayectoria he acompañado distintos
                  procesos emocionales y psicológicos, adaptando la atención
                  a las necesidades particulares de cada persona.
                </p>

                {/* Violencia */}
                <div
                  className="
                    mt-8
                    border-l-2
                    border-[#D4AF37]/70
                    pl-5
                  "
                >
                  <p
                    className="
                      font-serif
                      text-[18px]
                      leading-7
                      text-[#0F4A55]
                    "
                  >
                    Especial atención al acompañamiento de personas que han
                    vivido situaciones de violencia.
                  </p>

                  <p
                    className="
                      mt-2
                      text-[12px]
                      leading-5
                      text-[#82918B]
                    "
                  >
                    Con una perspectiva sensible a las experiencias y
                    necesidades de cada persona.
                  </p>
                </div>
              </div>

              {/* Áreas */}
              <div
                className="
                  grid
                  content-start
                  gap-x-10
                  sm:grid-cols-2
                "
              >
                {clinicalAreas.map((area, index) => (
                  <div
                    key={area}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      border-b
                      border-[#A7B89A]/20
                      py-5
                    "
                  >
                    <span
                      className="
                        font-serif
                        text-[11px]
                        italic
                        text-[#B2943D]
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p
                      className="
                        text-[14px]
                        font-medium
                        text-[#435D61]
                        transition-colors
                        duration-300
                        group-hover:text-[#0F4A55]
                      "
                    >
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                A QUIÉN ATIENDE
            ================================================== */}

            <div
              className="
                mt-14
                grid
                gap-7
                border-t
                border-[#A7B89A]/20
                pt-10

                lg:grid-cols-[0.28fr_0.72fr]
                lg:items-center
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#9B7A1F]
                  "
                >
                  Atención psicológica
                </p>

                <h3
                  className="
                    mt-2
                    font-serif
                    text-[24px]
                    text-[#0F4A55]
                  "
                >
                  ¿A quién acompaño?
                </h3>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  lg:justify-end
                "
              >
                {people.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-full
                      border
                      border-[#A7B89A]/20
                      bg-[#FBFAF7]
                      px-4
                      py-2.5
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="
                        h-3.5
                        w-3.5
                        text-[#597060]
                      "
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        text-[11px]
                        font-medium
                        text-[#5F7275]
                      "
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}