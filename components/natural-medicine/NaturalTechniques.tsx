'use client';
import { useSiteData } from '@/components/SiteDataProvider';

import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  CircleDot,
  Flower2,
  Footprints,
  Leaf,
  MessageCircle,
  Sparkles,
} from 'lucide-react';



import type {
  NaturalMedicineConsultation,
  NaturalTechnique,
} from '@/types/natural-medicine';

/* =========================================================
   TIPOS
========================================================= */

interface NaturalTechniquesProps {
  consultation: NaturalMedicineConsultation;
}

interface TechniqueCardProps {
  technique: NaturalTechnique;
  index: number;
  consultation: NaturalMedicineConsultation;
}

/* =========================================================
   ICONOS
========================================================= */

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

/* =========================================================
   WHATSAPP
========================================================= */

function getTechniqueWhatsappUrl(techniqueName: string, whatsapp: string) {
  const message =
    `Hola, me gustaría recibir información sobre ${techniqueName} ` +
    'dentro de la consulta de Medicina Natural.';

  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    message,
  )}`;
}



/* =========================================================
   ANIMACIÓN
========================================================= */

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   TARJETA
========================================================= */

function TechniqueCard({
  technique,
  index,
  consultation,
}: TechniqueCardProps) {
  const { contact } = useSiteData();
  const Icon = iconMap[technique.slug] ?? Leaf;

  return (
    <details className="group rounded-[26px] border border-[#A7B89A]/25 bg-[#FBFAF7] shadow-[0_12px_40px_rgba(15,61,74,0.035)] open:bg-[#0F3D4A] open:text-white">
      <summary className="relative cursor-pointer list-none rounded-[26px] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 sm:p-7 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#80651D] group-open:text-[#E5CF80]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 text-[#52665A] transition-transform group-open:rotate-90 group-open:text-white motion-reduce:transition-none" />
        </span>
        <span className="mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#A7B89A]/10 text-[#52665A] group-open:text-[#E5CF80]">
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.35} />
        </span>
        <span className="mt-8 block font-serif text-[27px] leading-tight text-[#0F3D4A] group-open:text-white">
          {technique.name}
        </span>
        <span className="mt-3 block text-sm leading-6 text-[#526368] group-open:text-white/85">
          {technique.shortDescription}
        </span>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#52665A] group-open:text-[#E5CF80]">
          <span className="group-open:hidden">Ver información sobre {technique.name}</span>
          <span className="hidden group-open:inline">Cerrar información sobre {technique.name}</span>
        </span>
      </summary>

      <div className="px-6 pb-7 sm:px-7">
        <h3 className="sr-only">Información sobre {technique.name}</h3>
        <p className="text-sm leading-7 text-white/85">{technique.description}</p>
        {technique.benefits && technique.benefits.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/85 marker:text-[#E5CF80]">
            {technique.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        )}
        <div className="mt-6 border-t border-white/20 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/85">Consulta de Medicina Natural</p>
          <p className="mt-2 font-serif text-3xl">${consultation.price} <span className="font-sans text-sm">MXN</span></p>
          {consultation.appointmentRequired && <p className="mt-2 text-sm text-white/85">Previa cita</p>}
          <a
            href={getTechniqueWhatsappUrl(technique.name, contact.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-[#E5CF80] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F3D4A]"
          >
            Consultar por esta técnica
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </details>
  );
}

/* =========================================================
   NATURAL TECHNIQUES
========================================================= */

export function NaturalTechniques({
  consultation,
}: NaturalTechniquesProps) {
 const { contact: contactMock } = useSiteData();
const generalWhatsappUrl = `https://wa.me/${contactMock.whatsapp}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre la consulta de Medicina Natural.'
)}`;

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
        pt-[104px]

        sm:pb-24
        sm:pt-[104px]

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
            ease: smoothEase,
          }}
          className="
            mx-auto
            max-w-[760px]
            text-center
          "
        >
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

          <h1
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
  Técnicas disponibles en la consulta de{' '}
  <span className="font-normal italic">
    Medicina Natural.
  </span>
</h1>

<p
  className="
    mx-auto
    mt-6
    max-w-[680px]
    text-[14px]
    leading-7
    text-[#526368]
  "
>
  Conoce las distintas técnicas disponibles dentro de la consulta de
  Medicina Natural y consulta la información general de cada una antes
  de solicitar una cita.
</p>

         
        </motion.div>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div
          className="
            mt-14
            grid
            items-start
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
                ease: smoothEase,
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
            ease: smoothEase,
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
                text-[#80651D]
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
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-[#D4AF37]
                    "
                  />

                  <span>Previa cita</span>
                </>
              )}
            </div>
          </div>

          <div
            className="
              relative
              z-10
              mt-7
              shrink-0

              lg:mt-0
            "
          >
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