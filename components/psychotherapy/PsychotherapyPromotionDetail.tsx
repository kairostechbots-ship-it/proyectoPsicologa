'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  MessageCircle,
  PackageCheck,
} from 'lucide-react';

import { contactMock } from '@/data/contact.mock';
import { mockPromotion } from '@/data/promotion.mock';

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function PsychotherapyPromotionDetail() {
  const reduceMotion = useReducedMotion();

  const promotion = mockPromotion;

  if (!promotion.activo) {
    return null;
  }

  const promotionWhatsappUrl = `https://wa.me/${contactMock.whatsapp}?text=${encodeURIComponent(
    `Hola, me gustaría recibir información sobre la promoción del paquete de ${promotion.sesiones} sesiones de psicoterapia.`,
  )}`;

  return (
    <motion.div
      id="promocion"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
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
        duration: reduceMotion ? 0 : 0.65,
        ease: smoothEase,
      }}
      className="
        relative
        mt-10
        overflow-hidden
        rounded-[28px]
        bg-[#0F4A55]
        px-6
        py-8
        shadow-[0_18px_50px_rgba(15,74,85,0.12)]

        sm:px-8
        sm:py-9

        lg:px-10
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
          -right-24
          -top-28
          h-64
          w-64
          rounded-full
          border
          border-white/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          right-[18%]
          h-56
          w-56
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
          top-7
          h-2
          w-2
          rounded-full
          bg-[#D4AF37]/70

          sm:right-10
          sm:top-9
        "
      />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

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
        "
      >
        {/* ===================================================
            INFORMACIÓN
        ==================================================== */}

        <div
          className="
            flex
            max-w-[760px]
            items-start
            gap-4

            sm:gap-5
          "
        >
          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.09]
              text-[#D8E1D5]
            "
          >
            <PackageCheck
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={1.5}
            />
          </span>

          <div>
            {/* Etiqueta */}

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
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D4AF37]
                "
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#E1C66D]
                "
              >
                Promoción
              </p>
            </div>

            {/* Título */}

            <h3
              className="
                mt-4
                font-serif
                text-[26px]
                font-medium
                leading-tight
                text-white

                sm:text-[30px]
              "
            >
              Paquete de{' '}
              <span
                className="
                  font-normal
                  italic
                  text-[#E7D99B]
                "
              >
                {promotion.sesiones} sesiones
              </span>
            </h3>

            {/* Descripción */}

            <p
              className="
                mt-3
                max-w-[620px]
                text-[12px]
                leading-6
                text-white/65

                sm:text-[13px]
              "
            >
              {promotion.descripcion}
            </p>

            {/* Características */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-x-5
                gap-y-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-medium
                  text-white/75
                "
              >
                {promotion.sesiones} sesiones
              </span>

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

            {/* Condiciones */}

            {promotion.condiciones && (
              <p
                className="
                  mt-4
                  text-[10px]
                  leading-5
                  text-white/45
                "
              >
                {promotion.condiciones}
              </p>
            )}
          </div>
        </div>

        {/* ===================================================
            PRECIO + CTA
        ==================================================== */}

        <div
          className="
            border-t
            border-white/10
            pt-7

            lg:min-w-[240px]
            lg:border-l
            lg:border-t-0
            lg:pl-10
            lg:pt-0
            lg:text-right
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

          <p
            className="
              mt-2
              font-serif
              text-[38px]
              font-medium
              leading-none
              text-white
            "
          >
            ${promotion.precio.toLocaleString('es-MX')}

            <span
              className="
                ml-1
                font-sans
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white/45
              "
            >
              MXN
            </span>
          </p>

          <a
            href={promotionWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-white
              px-5
              py-3
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
            <MessageCircle
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.6}
            />

            Consultar promoción
          </a>
        </div>
      </div>
    </motion.div>
  );
}