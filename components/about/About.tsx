
'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import {
  Brain,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';

import type { ProfessionalProfile } from '@/types/profile';

const ease = [0.22, 1, 0.36, 1] as const;

interface AboutProps {
  profile: ProfessionalProfile;
}

const valueIcons = [HeartHandshake, ShieldCheck];

const patientIcons: Record<string, React.ElementType> = {
  Niños: UserRound,
  Adolescentes: UserRound,
  Jóvenes: UserRound,
  Adultos: UserRound,
  Parejas: UsersRound,
};

export function About({ profile }: AboutProps) {
  const reduceMotion = useReducedMotion();

  // DATOS ACTIVOS
  const psychologyTraining = [...profile.psychologyTraining]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const complementaryTraining = [...profile.complementaryTraining]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const clinicalAreas = [...profile.clinicalAreas]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const patientGroups = [...profile.patientGroups]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const values = [...profile.values]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const animation = (direction: 'up' | 'left' | 'right' = 'up', delay = 0) => {
    const initialPosition =
      direction === 'left'
        ? { opacity: 0, x: -25 }
        : direction === 'right'
          ? { opacity: 0, x: 25 }
          : { opacity: 0, y: 25 };

    return {
      initial: reduceMotion ? false : initialPosition,
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, amount: 0.15 },
      transition: {
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease,
      },
    };
  };

  return (
    <>
{/* =====================================================
    PRESENTACIÓN: FOTOGRAFÍA + BIOGRAFÍA
====================================================== */}
<section
  id="about"
  aria-labelledby="about-title"
  className="relative isolate overflow-hidden bg-[#FBFAF7] py-20 sm:py-24 lg:py-28"
>
  {/* DECORACIÓN GENERAL */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute -left-[280px] -top-[250px] h-[540px] w-[540px] rounded-full border border-[#A7B89A]/10" />

    <div className="absolute -right-[260px] bottom-[-300px] h-[540px] w-[540px] rounded-full border border-[#D4AF37]/[0.07]" />

    <div className="absolute -right-40 top-0 h-[620px] w-[620px] rounded-full bg-[#E9EDE3]/25 blur-[100px]" />

    {/* RAMITA DECORATIVA IZQUIERDA */}
    <svg
      viewBox="0 0 180 360"
      fill="none"
      className="absolute -bottom-24 -left-10 h-auto w-[280px] rotate-[12deg] text-[#819275] opacity-[0.07] sm:w-[340px] lg:-bottom-32 lg:left-[2%] lg:w-[430px]"
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

  {/* CONTENEDOR PRINCIPAL */}
  <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
    <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">

      {/* =================================================
          IZQUIERDA: FOTOGRAFÍA ORGÁNICA
      ================================================== */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, x: -25 }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.75,
          ease,
        }}
        className="relative mx-auto w-full max-w-[480px] py-10 lg:py-12"
      >
        {/* FONDO ORGÁNICO */}
        <div className="relative">

          {/* ARCO DETRÁS DE LA FOTOGRAFÍA */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[5%] bottom-[1%] top-[6%] rounded-t-[48%] rounded-b-[34%] bg-[#EBE7DA]"
          />

          {/* HALO SUAVE */}
          <div
            aria-hidden="true"
            className="absolute -inset-5 -z-10 rounded-full bg-[#E6EBDC]/45 blur-3xl"
          />

          {/* RAMITA SUPERIOR DERECHA */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 360"
            fill="none"
            className="pointer-events-none absolute -right-8 -top-10 z-0 h-[220px] w-[110px] rotate-[24deg] text-[#8A9F87] opacity-40 sm:-right-12"
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
            </g>
          </svg>

          {/* PUNTO VERDE */}
          <span
            aria-hidden="true"
            className="absolute -left-3 top-[7%] z-20 h-5 w-5 rounded-full bg-[#84A089] sm:-left-6"
          />

          {/* FOTOGRAFÍA */}
          <div className="relative z-10 aspect-[4/4.9] overflow-hidden rounded-t-[48%] rounded-b-[30px] bg-[#EBE7DA]">
            <Image
              src="/images/erika-pilar.png"
              alt={`Retrato profesional de ${profile.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-top"
            />
          </div>

          {/* ==================================
              TARJETA FLOTANTE: EXPERIENCIA
          ================================== */}
          <div className="absolute -bottom-7 -left-2 z-30 rounded-[20px] border border-[#DDE6D9] bg-[#FFFDF9]/95 px-4 py-4 shadow-[0_16px_40px_rgba(48,65,50,0.12)] backdrop-blur-md sm:-left-7 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9F0E7] text-[#66876E]">
                <HeartHandshake
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <p className="font-serif text-[29px] leading-none text-[#0F4A55]">
                  +{profile.yearsExperience}
                </p>

                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#64766A]">
                  Años de trayectoria
                </p>
              </div>
            </div>
          </div>

          {/* ==================================
              TARJETA FLOTANTE: TCC
          ================================== */}
          <div className="absolute -right-2 bottom-[17%] z-30 rounded-full border border-[#E0E5DC] bg-[#FFFDF9]/95 px-4 py-3 shadow-[0_12px_32px_rgba(48,65,50,0.10)] backdrop-blur-md sm:-right-6 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F0E7] text-[#65866C]">
                <Brain
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <p className="font-serif text-[18px] leading-none text-[#0F4A55]">
                  {profile.therapeuticApproach}
                </p>

                <p className="mt-1 text-[9px] tracking-[0.08em] text-[#78877B]">
                  Enfoque terapéutico
                </p>
              </div>
            </div>
          </div>

          {/* PUNTO DORADO */}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 right-[13%] z-20 h-5 w-5 rounded-full bg-[#C9AD7E]"
          />
        </div>
      </motion.div>

      {/* =================================================
          DERECHA: BIOGRAFÍA ORIGINAL
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
        {/* LÍNEA DORADA SUPERIOR */}
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

        {/* TÍTULO PROFESIONAL */}
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#53665C]
          "
        >
          {profile.professionalTitle}
        </p>

        {/* NOMBRE */}
        <h1
          id="about-title"
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
            {profile.name}.
          </span>
        </h1>

        {/* BIOGRAFÍA COMPLETA */}
        <div
          className="
            mt-7
            space-y-5
            text-[15px]
            leading-7
            text-[#66787C]
          "
        >
          {profile.biography.map(
            (paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ),
          )}
        </div>

        {/* VALORES PROFESIONALES */}
        {values.length > 0 && (
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
            {values.map((value, index) => {
              const Icon =
                valueIcons[index] ??
                HeartHandshake;

              return (
                <div
                  key={value.id}
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
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
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div>
                    <p
                      className="
                        font-serif
                        text-[16px]
                        text-[#0F4A55]
                      "
                    >
                      {value.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        leading-5
                        text-[#7A898B]
                      "
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  </div>
</section>


     

{/* ==========================================
    FORMACIÓN + EXPERIENCIA CLÍNICA
========================================== */}
<section
  aria-labelledby="training-title"
  className="relative overflow-hidden bg-[#FAF9F6] py-20 sm:py-24 lg:py-28"
>
  {/* Decoración de fondo */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute -right-[250px] -top-[180px] h-[550px] w-[550px] rounded-full border border-[#A7B89A]/15" />
    <div className="absolute -left-[260px] bottom-[5%] h-[500px] w-[500px] rounded-full border border-[#D4AF37]/10" />
  </div>

  <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">

    {/* ======================================
        ENCABEZADO DE FORMACIÓN
    ====================================== */}
    <motion.div
      {...animation()}
      className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16"
    >
      <div>
      <div className="flex items-center gap-4">
        <span className="h-px w-9 bg-[#C6AA65]" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#718575]">
          Trayectoria profesional
        </p>
        
      </div>
      

      <h2
        id="training-title"
        className="mt-6 max-w-[530px] font-serif text-[39px] leading-[1.12] tracking-[-0.03em] text-[#0F4A55] sm:text-[47px]"
      >
        Preparación y experiencia{' '}
        <span className="font-normal italic text-[#79957D]">
          al servicio de tu bienestar.
        </span>
      </h2>
      </div>

      <p className="max-w-[560px] text-[14px] leading-7 text-[#657678] lg:justify-self-end">
        Mi preparación profesional se ha enriquecido con formación
        en distintas áreas relacionadas con la salud mental,
        el acompañamiento y el bienestar.
      </p>
    </motion.div>

    {/* ======================================
        TARJETAS DE FORMACIÓN
    ====================================== */}
    <div className="mt-14 grid items-stretch gap-7 lg:grid-cols-2 lg:gap-8">

      {/* FORMACIÓN EN PSICOLOGÍA */}
      <motion.article
        {...animation()}
        className="group relative overflow-hidden rounded-[28px] border border-[#E3E9E1] bg-white p-7 shadow-[0_15px_50px_rgba(15,61,74,0.035)] sm:p-9"
      >
        {/* Acento superior */}
        <div className="absolute left-9 top-0 h-[3px] w-16 rounded-b-full bg-[#9BAF97]" />

        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-[#EDF3EA] text-[#66846D]">
            <Brain
              aria-hidden="true"
              className="h-6 w-6"
              strokeWidth={1.4}
            />
          </span>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#9A813F]">
              Área principal
            </p>

            <h3 className="mt-2 font-serif text-[26px] leading-tight text-[#0F4A55] sm:text-[29px]">
              Psicología y acompañamiento
            </h3>
          </div>
        </div>

        {/* Estudios */}
        <div className="mt-9">
          {psychologyTraining.map(
            ({ id, title, institution }, index) => (
              <div
                key={id}
                className={`flex items-start gap-4 py-5 ${
                  index !== 0
                    ? 'border-t border-[#E9EDE7]'
                    : ''
                }`}
              >
                <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDF3EA]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#739178]" />
                </span>

                <div className="min-w-0">
                  <p className="text-[14px] font-medium leading-6 text-[#405C5E]">
                    {title}
                  </p>

                  {institution && (
                    <p className="mt-1.5 text-[12px] leading-5 text-[#7A8986]">
                      {institution}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </motion.article>

      {/* FORMACIÓN COMPLEMENTARIA */}
      <motion.article
        {...animation('up', 0.08)}
        className="group relative overflow-hidden rounded-[28px] border border-[#DFE8DC] bg-[#EDF2EA] p-7 sm:p-9"
      >
        {/* Decoración orgánica */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[250px] w-[250px] rounded-full border border-[#A7BAA3]/20"
        />

        <div className="absolute left-9 top-0 h-[3px] w-16 rounded-b-full bg-[#C8AD69]" />

        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-white/75 text-[#708B70]">
            <Leaf
              aria-hidden="true"
              className="h-6 w-6"
              strokeWidth={1.4}
            />
          </span>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#9A813F]">
              Otras áreas
            </p>

            <h3 className="mt-2 font-serif text-[26px] leading-tight text-[#0F4A55] sm:text-[29px]">
              Formación complementaria
            </h3>
          </div>
        </div>

        {/* Estudios */}
        <div className="relative mt-9">
          {complementaryTraining.map(
            ({ id, title, institution }, index) => (
              <div
                key={id}
                className={`flex items-start gap-4 py-5 ${
                  index !== 0
                    ? 'border-t border-[#CEDDCD]/60'
                    : ''
                }`}
              >
                <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9EAA82]" />
                </span>

                <div className="min-w-0">
                  <p className="text-[14px] font-medium leading-6 text-[#405C5E]">
                    {title}
                  </p>

                  {institution && (
                    <p className="mt-1.5 text-[12px] leading-5 text-[#718477]">
                      {institution}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </motion.article>
    </div>

    {/* ======================================
        NOTA DE MEDICINA NATURAL
    ====================================== */}
    <div className="mt-8 flex items-start gap-3 rounded-[18px] border border-[#E9E6D9] bg-[#F6F3EB] px-5 py-4">
      <Leaf aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#A89154]" strokeWidth={1.5} />
      <p className="max-w-[900px] text-[12px] leading-6 text-[#66766E]">
        La Medicina Natural se presenta como un área de atención independiente de la psicoterapia y no sustituye la valoración, diagnóstico o tratamiento médico.
      </p>
    </div>
   

    {/* ======================================
        EXPERIENCIA CLÍNICA
    ====================================== */}
    <div className="mt-24 border-t border-[#DDE5DA] pt-20 sm:mt-28">

      {/* ENCABEZADO */}
      <motion.div
        {...animation()}
        className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16"
      >
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-9 bg-[#C6AA65]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-[#718575]">
              Experiencia clínica
            </p>
          </div>

          <h2 className="mt-6 max-w-[530px] font-serif text-[39px] leading-[1.12] tracking-[-0.03em] text-[#0F4A55] sm:text-[47px]">
            Acompañamiento en diferentes{' '}
            <span className="italic text-[#79957D]">
              etapas y situaciones.
            </span>
          </h2>
        </div>

        <p className="max-w-[560px] text-[14px] leading-7 text-[#657678] lg:justify-self-end">
          A lo largo de mi experiencia profesional he acompañado
          a personas que enfrentan diversas dificultades
          emocionales y psicológicas, ofreciendo una atención
          adaptada a sus necesidades, circunstancias y objetivos
          terapéuticos.
        </p>
      </motion.div>

      {/* ======================================
          ÁREAS DE EXPERIENCIA
      ====================================== */}
      {clinicalAreas.length > 0 && (
        <motion.div
          {...animation()}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {clinicalAreas.map((area) => (
            <div
              key={area.id}
              className="group flex min-h-[86px] items-center gap-4 rounded-[18px] border border-[#E3E9E1] bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A7BCA5] hover:shadow-[0_12px_30px_rgba(15,61,74,0.05)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF3EA] text-[#6C8B72]">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </span>

              <p className="text-[13px] font-medium leading-5 text-[#435D61]">
                {area.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ======================================
          EXPERIENCIA EN VIOLENCIA
      ====================================== */}
      {(profile.violenceTitle || profile.violenceDescription) && (
        <motion.div
          {...animation()}
          className="relative mt-12 overflow-hidden rounded-[25px] border border-[#DFE7DD] bg-[#EDF2EA] p-7 sm:p-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-32 h-[300px] w-[300px] rounded-full border border-[#A7B89A]/25"
          />

          <div className="relative flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/75 text-[#698870]">
              <HeartHandshake
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={1.5}
              />
            </span>

            <div className="max-w-[850px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#799071]">
                Experiencia profesional
              </p>

              <h3 className="mt-2 font-serif text-[22px] leading-7 text-[#0F4A55] sm:text-[26px]">
                {profile.violenceTitle}
              </h3>

              <p className="mt-3 text-[13px] leading-7 text-[#617671]">
                {profile.violenceDescription}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================
          ¿A QUIÉN ACOMPAÑO?
      ====================================== */}
      {patientGroups.length > 0 && (
        <motion.div
          {...animation()}
          className="mt-16 border-t border-[#DDE5DA] pt-12"
        >
          <div className="grid gap-7 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-[#9A813F]">
                Atención psicológica
              </p>

              <h3 className="mt-3 font-serif text-[29px] text-[#0F4A55]">
                ¿A quién acompaño?
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {patientGroups.map((patientGroup) => {
                const Icon =
                  patientIcons[patientGroup.name] ?? UserRound;

                return (
                  <div
                    key={patientGroup.id}
                    className="inline-flex items-center gap-3 rounded-full border border-[#DCE6D9] bg-white px-5 py-3 shadow-[0_5px_20px_rgba(15,61,74,0.025)]"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 text-[#718F75]"
                      strokeWidth={1.5}
                    />

                    <span className="text-[12px] font-medium text-[#526A65]">
                      {patientGroup.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  </div>
</section>

    </>
  );
}
