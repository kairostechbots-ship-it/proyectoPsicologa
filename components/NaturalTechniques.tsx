'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  CircleDot,
  Flower2,
  Footprints,
  Leaf,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import type {
  NaturalMedicineConsultation,
  NaturalTechnique,
} from '@/types/natural-medicine';

interface NaturalTechniquesProps {
  consultation: NaturalMedicineConsultation;
}

const iconMap: Record<string, React.ElementType> = {
  biomagnetismo: CircleDot,
  acupuntura: Sparkles,
  fitoterapia: Leaf,
  auriculoterapia: Activity,
  'medicina-china': Sparkles,
  'flores-de-bach': Flower2,
  naturismo: Leaf,
  'desintoxicacion-organica': Sparkles,
  'nutricion-funcional': Leaf,
  'reflexologia-podal': Footprints,
};

function getTechniqueWhatsappUrl(techniqueName: string) {
  const message =
    `Hola, me gustaría recibir información sobre ${techniqueName} ` +
    'dentro de la consulta de Medicina Natural.';

  return `https://wa.me/523311383410?text=${encodeURIComponent(message)}`;
}

const generalWhatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre la consulta de Medicina Natural.'
)}`;

function TechniqueCard({
  technique,
  index,
  consultation,
}: {
  technique: NaturalTechnique;
  index: number;
  consultation: NaturalMedicineConsultation;
}) {
  const [flipped, setFlipped] = useState(false);

  const Icon = iconMap[technique.slug] ?? Leaf;

  const toggleCard = () => {
    setFlipped((current) => !current);
  };

  return (
    <div
      className="
        group
        relative
        h-[340px]
        w-full
        [perspective:1200px]

        sm:h-[360px]
      "
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`
          relative
          h-full
          w-full
          transition-transform
          duration-700
          [transform-style:preserve-3d]

          ${
            flipped
              ? '[transform:rotateY(180deg)]'
              : '[transform:rotateY(0deg)]'
          }
        `}
      >
        {/* =====================================================
            FRENTE
        ====================================================== */}

        <article
          className="
            absolute
            inset-0
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-[26px]
            border
            border-[#A7B89A]/25
            bg-[#FBFAF7]
            p-6
            shadow-[0_12px_40px_rgba(15,61,74,0.035)]
            [backface-visibility:hidden]

            sm:p-7
          "
        >
          {/* Decoración */}
          <div
            aria-hidden="true"
            className="
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-[#A7B89A]/[0.08]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              right-8
              top-8
              h-16
              w-16
              rounded-full
              border
              border-[#D4AF37]/15
            "
          />

          {/* Número y botón */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              className="
                text-[10px]
                font-semibold
                tracking-[0.2em]
                text-[#B08B28]
              "
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleCard();
              }}
              aria-label={`Ver información sobre ${technique.name}`}
              className="
                relative
                z-20
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#A7B89A]/25
                bg-white/70
                text-[#52665A]
                transition-colors

                hover:border-[#D4AF37]/40
                hover:text-[#0F3D4A]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F3D4A]
              "
            >
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Icono */}
          <div
            className="
              relative
              z-10
              mt-8
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#A7B89A]/10
              text-[#52665A]
            "
          >
            <Icon
              aria-hidden="true"
              className="h-6 w-6"
              strokeWidth={1.35}
            />
          </div>

          {/* Contenido */}
          <div className="relative z-10 mt-auto">
            <h3
              className="
                font-serif
                text-[28px]
                font-medium
                leading-tight
                tracking-[-0.025em]
                text-[#0F3D4A]
              "
            >
              {technique.name}
            </h3>

            <p
              className="
                mt-3
                line-clamp-2
                text-sm
                leading-6
                text-[#657175]
              "
            >
              {technique.shortDescription}
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-[#52665A]
              "
            >
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#D4AF37]"
              />

              Ver información
            </div>
          </div>
        </article>

        {/* =====================================================
            REVERSO
        ====================================================== */}

        <article
          className="
            absolute
            inset-0
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-[26px]
            bg-[#0F3D4A]
            p-6
            text-white
            shadow-[0_16px_45px_rgba(15,61,74,0.14)]
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]

            sm:p-7
          "
        >
          {/* Decoraciones */}
          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              border
              border-white/[0.07]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-24
              -left-16
              h-48
              w-48
              rounded-full
              bg-[#A7B89A]/[0.08]
            "
          />

          {/* Cabecera */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#D8BD66]
                "
              >
                Medicina Natural
              </p>

              <h3
                className="
                  mt-2
                  font-serif
                  text-[27px]
                  font-medium
                  leading-tight
                  tracking-[-0.02em]
                  text-white
                "
              >
                {technique.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                toggleCard();
              }}
              aria-label="Volver al frente de la tarjeta"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                text-white/70
                transition-colors

                hover:bg-white/10
                hover:text-white

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/60
              "
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Descripción */}
          <p
            className="
              relative
              z-10
              mt-5
              text-sm
              leading-6
              text-white/70
            "
          >
            {technique.shortDescription}
          </p>

          {/* Datos de consulta */}
          <div
            className="
              relative
              z-10
              mt-auto
              border-t
              border-white/10
              pt-5
            "
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/45
                  "
                >
                  Consulta de Medicina Natural
                </p>

                <p
                  className="
                    mt-1
                    font-serif
                    text-[28px]
                    text-white
                  "
                >
                  ${consultation.price}

                  <span
                    className="
                      ml-1
                      font-sans
                      text-[10px]
                      font-medium
                      tracking-wide
                      text-white/50
                    "
                  >
                    MXN
                  </span>
                </p>
              </div>

              {consultation.appointmentRequired && (
                <span
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.06]
                    px-3
                    py-1.5
                    text-[10px]
                    font-medium
                    text-white/65
                  "
                >
                  Previa cita
                </span>
              )}
            </div>

            <a
              href={getTechniqueWhatsappUrl(technique.name)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-xs
                font-semibold
                text-[#E5CF80]
                transition-colors

                hover:text-white

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/60
              "
            >
              Consultar por esta técnica

              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5"
                strokeWidth={1.6}
              />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export function NaturalTechniques({
  consultation,
}: NaturalTechniquesProps) {
  const reduceMotion = useReducedMotion();

  const techniques = consultation.techniques
    .filter((technique) => technique.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
   <section
  id="tecnicas-medicina-natural"
  aria-labelledby="natural-techniques-title"
  className="
    relative
    scroll-mt-24
    overflow-hidden
    bg-white

    pb-20
    pt-28

    sm:pb-24
    sm:pt-32

    lg:scroll-mt-28
    lg:pb-28
    lg:pt-[104px]
  "
>
      {/* =====================================================
          DECORACIÓN DE FONDO
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-48
          top-20
          h-96
          w-96
          rounded-full
          border
          border-[#A7B89A]/10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-32
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#A7B89A]/[0.035]
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
        {/* =====================================================
            ENCABEZADO
        ====================================================== */}

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
            amount: 0.25,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            max-w-[760px]
            text-center
          "
        >
          {/* Etiqueta superior */}
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#596D65]
              "
            >
              Técnicas disponibles
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />
          </div>

          {/* Título */}
          <h2
            id="natural-techniques-title"
            className="
              mt-6
              font-serif
              text-[40px]
              font-medium
              leading-[1.1]
              tracking-[-0.03em]
              text-[#0F4A55]

              sm:text-[48px]
            "
          >
            Conoce las técnicas de{' '}
            <span className="font-normal italic">
              Medicina Natural.
            </span>
          </h2>

          {/* Descripción */}
          <p
            className="
              mx-auto
              mt-6
              max-w-[650px]
              text-[14px]
              leading-7
              text-[#718083]
            "
          >
            Explora las diferentes técnicas disponibles dentro de la consulta y
            conoce más información sobre cada una.
          </p>
        </motion.div>

        {/* =====================================================
            GRID DE TARJETAS
        ====================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2
            sm:gap-6

            lg:grid-cols-3
          "
        >
          {techniques.map((technique, index) => (
            <motion.div
              key={technique.id}
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
                amount: 0.15,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : (index % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TechniqueCard
                technique={technique}
                index={index}
                consultation={consultation}
              />
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            CTA GENERAL
        ====================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
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
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[28px]
            bg-[#F7F5EF]
            px-6
            py-8

            sm:mt-16
            sm:px-10
            sm:py-10

            lg:flex
            lg:items-center
            lg:justify-between
            lg:gap-12
          "
        >
          {/* Decoración */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#A7B89A]/15
            "
          />

          <div className="relative z-10 max-w-2xl">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#B08B28]
              "
            >
              Consulta de Medicina Natural
            </p>

            <h3
              className="
                mt-3
                font-serif
                text-[29px]
                font-medium
                leading-tight
                text-[#0F3D4A]

                sm:text-[34px]
              "
            >
              ¿Te gustaría recibir más información?
            </h3>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-[#657175]

                sm:text-[15px]
                sm:leading-7
              "
            >
              Puedes comunicarte directamente por WhatsApp para resolver tus
              dudas y consultar disponibilidad.
            </p>

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                text-sm
                text-[#52665A]
              "
            >
              <span>
                Consulta:{' '}
                <strong className="font-semibold text-[#0F3D4A]">
                  ${consultation.price} MXN
                </strong>
              </span>

              {consultation.appointmentRequired && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#D4AF37]"
                  />

                  <span>Previa cita</span>
                </>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-7 shrink-0 lg:mt-0">
            <a
              href={generalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                min-h-14
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[#0F3D4A]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(15,61,74,0.10)]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:bg-[#174F5D]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0F3D4A]
                focus-visible:ring-offset-4

                sm:w-auto
              "
            >
              <MessageCircle
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={1.7}
              />

              Solicitar información
            </a>
          </div>
        </motion.div>

        {/* =====================================================
            ACLARACIÓN
        ====================================================== */}

        <p
          className="
            mx-auto
            mt-6
            max-w-3xl
            text-center
            text-[11px]
            leading-5
            text-[#7A8580]

            sm:text-xs
          "
        >
          
        </p>
      </div>
    </section>
  );
}