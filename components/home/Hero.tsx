'use client';

import { useSiteData } from '@/components/SiteDataProvider';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Clock3,
  MapPin,
  MessageCircle,
  Monitor,
  ShieldCheck,
  Sprout,
} from 'lucide-react';

import { getBusinessHoursText } from '@/lib/utils';

const HERO_IMAGE = '/images/hero-erika-editorial.png';

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#FBFAF7]';

const iconStyles =
  'flex h-12 w-12 shrink-0 items-center justify-center ' +
  'rounded-full bg-[#A7B89A]/20 text-[#688371]';

const infoStyles =
  'flex min-w-0 items-center gap-4 ' +
  'lg:border-l lg:border-[#A7B89A]/30 lg:pl-5 ' +
  'lg:first:border-l-0 lg:first:pl-0';

export function Hero() {
  const { contact } = useSiteData();
  const reduceMotion = useReducedMotion();

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hola, me gustaría recibir información para solicitar una cita.',
  )}`;

  const businessHoursText = getBusinessHoursText(
    contact.businessHours,
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="
        relative isolate
        overflow-hidden
        bg-[#FBFAF7]
        scroll-mt-24
      "
    >
      {/* ÁREA PRINCIPAL */}
      <div className="relative">
        {/*
          Conserva la imagen completa, incluyendo las hojas.

          No aplicar:
          - object-cover
          - scale
          - translate
          - overflow-hidden en esta columna
        */}
        <motion.div
  initial={reduceMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: reduceMotion ? 0 : 0.65 }}
  className="
    pointer-events-none
    absolute inset-y-0 right-0
    hidden w-[60%]
    lg:block
  "
>
  <Image
    src={HERO_IMAGE}
    alt="Erika Pilar en su consultorio"
    fill
    priority
    sizes="(min-width: 1024px) 60vw, 1px"
    className="object-contain object-right-top"
    draggable={false}
  />
</motion.div>

        {/* MISMO CONTENEDOR QUE EL NAVBAR */}
        <div
          className="
            relative z-10
            mx-auto max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="
  flex w-full flex-col items-start
  py-12

  sm:py-16

  lg:min-h-[40vw]
  lg:w-[45%]
  lg:justify-center
  lg:py-10
"
          >
            {/* ETIQUETA */}
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#D9AF64]"
              />

              <span
                className="
                  text-[11px]
                  font-semibold uppercase
                  leading-5 tracking-[0.13em]
                  text-[#839788]
                  xl:text-xs
                "
              >
                Psicóloga Clínica · TCC
              </span>
            </div>

            {/* TÍTULO */}
            <h1
              id="hero-title"
              className="
                max-w-[560px]
                font-serif font-medium
                text-[clamp(2.5rem,7vw,3.5rem)]
                leading-[1.09]
                tracking-[-0.04em]
                text-[#0F3D4A]

                lg:text-[clamp(2.65rem,4vw,4rem)]
              "
            >
              <span className="block">
                Un espacio para
              </span>

              <span className="block">
                comprender
              </span>

              <span className="relative inline-block font-normal italic">
                lo que sientes.

                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="
                    absolute -bottom-2 right-0
                    h-3 w-[55%]
                    text-[#D9AF64]
                  "
                >
                  <path
                    d="M4 9 Q145 1 296 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  <path
                    d="M14 11 Q155 5 288 11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                </svg>
              </span>
            </h1>

            {/* DESCRIPCIÓN */}
            <p
              className="
                mt-8 max-w-[425px]
                text-base leading-[1.65]
                text-[#62716B]
                xl:mt-9 xl:text-[17px]
              "
            >
              Atención psicológica para niños, adolescentes,
              adultos y parejas, con un enfoque profesional,
              cercano y basado en evidencia.
            </p>

            {/* BOTONES */}
            <div
              className="
                mt-8
                flex w-full flex-col
                items-start gap-4

                sm:w-auto
                sm:flex-row sm:flex-wrap
                sm:items-center sm:gap-x-6
              "
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex min-h-[52px]
                  w-full items-center justify-center
                  gap-2
                  rounded-[20px]
                  bg-[#0F3D4A]
                  px-6 py-3.5
                  text-sm font-semibold text-white
                  transition-colors
                  hover:bg-[#174F5D]
                  sm:w-auto
                  ${focusStyles}
                `}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  strokeWidth={1.8}
                />

                Agendar por WhatsApp
              </a>

              <Link
                href="/psychotherapy"
                className={`
                  group inline-flex min-h-11
                  items-center gap-3
                  text-sm font-semibold
                  text-[#0F3D4A]
                  ${focusStyles}
                `}
              >
                <span className="border-b border-[#D9AF64] pb-1">
                  Conocer mi enfoque
                </span>

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-4 w-4 shrink-0
                    transition-transform
                    group-hover:translate-x-1
                    motion-reduce:transform-none
                  "
                />
              </Link>
            </div>

            {/* CONFIANZA */}
            <div
              className="
                mt-8 flex max-w-[395px]
                items-start gap-3
              "
            >
              <ShieldCheck
                aria-hidden="true"
                className="
                  mt-0.5 h-6 w-6
                  shrink-0 text-[#729080]
                "
                strokeWidth={1.5}
              />

              <p className="text-sm leading-[1.55] text-[#718078]">
                Un acompañamiento respetuoso, confidencial
                y adaptado a tus necesidades.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FRANJA INFERIOR */}
      <div
        className="
          relative z-20
          border-t border-[#A7B89A]/20
          bg-[#FBFAF7]
        "
      >
        <div
          className="
            mx-auto grid max-w-7xl
            grid-cols-1 gap-6
            px-4 py-6

            sm:grid-cols-2 sm:px-6

            lg:grid-cols-[0.85fr_1fr_0.95fr_1.4fr]
            lg:gap-5 lg:px-8
          "
        >
          {/* EXPERIENCIA */}
          <div className={infoStyles}>
            <span aria-hidden="true" className={iconStyles}>
              <Sprout
                className="h-6 w-6"
                strokeWidth={1.6}
              />
            </span>

            <p className="text-sm leading-6 text-[#62716B]">
              <strong className="block font-semibold text-[#0F3D4A]">
                +22 años
              </strong>

              de trayectoria
            </p>
          </div>

          {/* MODALIDAD */}
          <div className={infoStyles}>
            <span aria-hidden="true" className={iconStyles}>
              <Monitor
                className="h-6 w-6"
                strokeWidth={1.6}
              />
            </span>

            <p className="text-sm leading-6 text-[#62716B]">
              Atención presencial
              <span className="block">y en línea</span>
            </p>
          </div>

          {/* UBICACIÓN */}
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${infoStyles}
              text-sm text-[#62716B]
              transition-colors
              hover:text-[#0F3D4A]
              ${focusStyles}
            `}
          >
            <span aria-hidden="true" className={iconStyles}>
              <MapPin
                className="h-6 w-6"
                strokeWidth={1.6}
              />
            </span>

            <span>Tlajomulco Centro</span>
          </a>

          {/* HORARIOS */}
          <div className={infoStyles}>
            <span aria-hidden="true" className={iconStyles}>
              <Clock3
                className="h-6 w-6"
                strokeWidth={1.6}
              />
            </span>

            <div className="min-w-0 text-sm leading-6 text-[#62716B]">
              <p>{businessHoursText}</p>

              {contact.appointmentRequired && (
                <p className="text-xs text-[#7A8780]">
                  Atención con cita previa
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}