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
 const { promotion: mockPromotion } = useSiteData();


  const reduceMotion = useReducedMotion();

  /*
   * DATOS TEMPORALES
   *
   * Mientras no exista el backend utilizamos
   * mockPromotion como fuente de información.
   *
   * Posteriormente será sustituido por los datos
   * obtenidos desde la API.
   */
  const promotion = mockPromotion;

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
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-[1240px]
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
            lg:py-11
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
              lg:gap-12
            "
          >
            {/* =======================================
                IZQUIERDA
            ======================================== */}

            <div className="max-w-[690px]">

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
                Continúa tu proceso con un paquete de{' '}
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
                  text-[12px]
                  leading-6
                  text-white/65

                  sm:text-[13px]
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
                    text-[10px]
                    font-medium
                    text-white/75
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
                        text-[10px]
                        font-medium
                        text-white/75
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

                lg:min-w-[255px]
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
                  text-white/45
                "
              >
                {promotion.nombre}
              </p>

              <div
                className="
                  mt-2
                  flex
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
                    text-white/45
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
                  text-[11px]
                  font-semibold
                  text-[#0F4A55]
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:bg-[#F7F5EF]

                  lg:w-auto
                "
              >
                Conocer la promoción

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