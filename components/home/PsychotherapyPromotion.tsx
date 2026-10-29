'use client';
import { useSiteData } from '@/components/SiteDataProvider';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

import {
  ArrowRight,
  CalendarDays,
  PackageCheck,
} from 'lucide-react';



const smoothEase = [0.22, 1, 0.36, 1] as const;

export function PsychotherapyPromotion() {
  const { promotion } = useSiteData();


  const reduceMotion = useReducedMotion();

  /* =========================================================
     PROMOCIÓN INACTIVA
  ========================================================= */

  if (!promotion?.activo) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-promotion-title"
      className="
        relative
        overflow-hidden
        bg-white
        pt-8 pb-14
        sm:pt-8 sm:pb-16
        lg:pt-10 lg:pb-20
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
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
            ease: smoothEase,
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-[#0F4A55]
            px-6
            py-8
            shadow-[0_20px_55px_rgba(15,74,85,0.12)]

            sm:px-9
            sm:py-10

            lg:px-12
            lg:py-10
          "
        >
          {/* =========================================
              DECORACIÓN
          ========================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-28
              -top-32
              h-72
              w-72
              rounded-full
              border
              border-white/[0.07]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-36
              right-[20%]
              h-64
              w-64
              rounded-full
              border
              border-[#D4AF37]/10
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-8
              top-8
              h-2
              w-2
              rounded-full
              bg-[#D4AF37]/80

              sm:right-10
              sm:top-10
            "
          />

          {/* =========================================
              CONTENIDO
          ========================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-8

              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-10
            "
          >
            {/* =======================================
                IZQUIERDA
            ======================================== */}

            <div className="min-w-0 flex-1 lg:max-w-[690px]">

              {/* ETIQUETA */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#D4AF37]/30
                  bg-[#D4AF37]/[0.08]
                  px-3
                  py-1.5
                "
              >
                <PackageCheck
                  aria-hidden="true"
                  className="
                    h-3.5
                    w-3.5
                    text-[#E1C66D]
                  "
                  strokeWidth={1.6}
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#E1C66D]
                  "
                >
                  Promoción de psicoterapia
                </span>
              </div>

              {/* =====================================
                  TÍTULO
              ====================================== */}

              <h2
                id="home-promotion-title"
                className="
                  mt-5
                  max-w-[620px]
                  font-serif
                  text-[31px]
                  font-medium
                  leading-[1.12]
                  tracking-[-0.02em]
                  text-white

                  sm:text-[38px]

                  lg:text-[42px]
                "
              >
                Da continuidad a tu proceso con{' '}
                <span
                  className="
                    font-normal
                    italic
                    text-[#E7D99B]
                  "
                >
                  {promotion.sesiones} sesiones.
                </span>
              </h2>

              {/* =====================================
                  DESCRIPCIÓN
              ====================================== */}

              <p
                className="
                  mt-4
                  max-w-[610px]
                  text-sm
                  leading-6
                  text-[#D0DAD6]

                  sm:text-sm
                "
              >
                {promotion.descripcion}
              </p>

              {/* =====================================
                  INFORMACIÓN
              ====================================== */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-3
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-[#D8E1DF]
                  "
                >
                  <CalendarDays
                    aria-hidden="true"
                    className="
                      h-3.5
                      w-3.5
                      text-[#D8E1D5]
                    "
                    strokeWidth={1.5}
                  />

                  {promotion.frecuencia}
                </span>

                {promotion.excluyeTerapiaPareja && (
                  <>
                    <span
                      aria-hidden="true"
                      className="
                        hidden
                        h-4
                        w-px
                        bg-white/15

                        sm:block
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        text-[#D8E1DF]
                      "
                    >
                      Excepto terapia de pareja
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* =========================================
                PRECIO + ENLACE
            ========================================== */}

            <div
              className="
                border-t
                border-white/10
                pt-7

                lg:w-[255px]
                lg:shrink-0
                lg:border-l
                lg:border-t-0
                lg:pl-10
                lg:pt-0
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-[#C4D4D4]
                "
              >
                {promotion.nombre}
              </p>

              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-end
                  gap-2
                "
              >
                <p
                  className="
                    font-serif
                    text-[39px]
                    font-medium
                    leading-none
                    text-white

                    sm:text-[43px]
                  "
                >
                  $
                  {promotion.precio.toLocaleString(
                    'es-MX',
                  )}
                </p>

                <span
                  className="
                    mb-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[#C4D4D4]
                  "
                >
                  MXN
                </span>
              </div>

              <Link
                href="/psychotherapy#promocion"
                className="
                  mt-6
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#0F4A55]
                  transition-all
                  duration-300

                  hover:-translate-y-0.5 motion-reduce:transform-none
                  hover:bg-[#F7F5EF]

                  min-h-12
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#E7D99B]
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#0F4A55]
                  lg:w-auto
                "
              >
                Ver detalles y condiciones

                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={1.7}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}