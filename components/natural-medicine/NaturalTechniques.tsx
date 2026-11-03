'use client';
import { useEffect, useId, useRef, useState } from 'react';
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
  ArrowLeft,
  type LucideIcon,
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

const iconMap: Record<string, LucideIcon> = {
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
  const [flipped, setFlipped] = useState(false);
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldMoveFocus = useRef(false);
  const detailsId = useId();
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!shouldMoveFocus.current) return;
    shouldMoveFocus.current = false;
    const button = flipped ? backButtonRef.current : frontButtonRef.current;
    button?.focus({ preventScroll: true });
    if (flipped && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [flipped]);

  function turnCard(nextFlipped: boolean) {
    shouldMoveFocus.current = true;
    setFlipped(nextFlipped);
  }

  return (
    <article
      className="relative min-w-0 [perspective:1200px] sm:h-[440px]"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && flipped) {
          event.preventDefault();
          turnCard(false);
        }
      }}
    >
      <div
        className="relative w-full [transform-style:preserve-3d] sm:h-full"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: reduceMotion ? 'none' : 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          inert={flipped}
          aria-hidden={flipped}
          className={`${flipped ? 'absolute inset-0' : 'relative'} flex min-h-[240px] flex-col rounded-[22px] border border-[#A7B89A]/25 bg-[#FBFAF7] p-5 shadow-[0_12px_40px_rgba(15,61,74,0.035)] [backface-visibility:hidden] sm:absolute sm:inset-0 sm:min-h-0 sm:rounded-[26px] sm:p-7`}
        >
          <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-0">
            <span className="order-2 text-[11px] font-semibold tracking-[0.2em] text-[#80651D] sm:order-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="order-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A7B89A]/10 text-[#52665A] sm:order-2 sm:mt-5 sm:h-12 sm:w-12">
              <Icon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.35} />
            </span>
          </div>
          <h2 className="mt-3 break-words font-serif text-[24px] leading-tight text-[#0F3D4A] sm:mt-5 sm:text-[25px]">
            {technique.name}
          </h2>
          <p className="mt-2 min-h-0 whitespace-pre-line break-words text-sm leading-6 text-[#526368] sm:mt-3 sm:overflow-y-auto">
            {technique.shortDescription}
          </p>
          <div className="mt-auto shrink-0 pt-3 sm:pt-5">
            <button
              ref={frontButtonRef}
              type="button"
              aria-expanded={flipped}
              aria-controls={detailsId}
              aria-label={`Ver información sobre ${technique.name}`}
              onClick={() => turnCard(true)}
              className="inline-flex min-h-11 items-center gap-3 rounded-lg text-sm font-semibold text-[#52665A] hover:text-[#0F3D4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF7]"
            >
              Ver información
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          id={detailsId}
          inert={!flipped}
          aria-hidden={!flipped}
          className={`${flipped ? 'relative h-[clamp(420px,70svh,520px)]' : 'absolute inset-0'} flex min-w-0 flex-col rounded-[22px] border border-[#0F3D4A] bg-[#0F3D4A] p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] sm:absolute sm:inset-0 sm:h-full sm:rounded-[26px] sm:p-7`}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/20 pb-3">
            <h2 id={titleId} className="min-w-0 break-words font-serif text-[22px] leading-tight">{technique.name}</h2>
            <button
              ref={backButtonRef}
              type="button"
              aria-label={`Volver al frente de la tarjeta de ${technique.name}`}
              onClick={() => turnCard(false)}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#E5CF80] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CF80]"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Volver
            </button>
          </div>
          <div
            ref={scrollRef}
            role="region"
            aria-labelledby={titleId}
            tabIndex={flipped ? 0 : -1}
            className="my-4 min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-md pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CF80]"
          >
            <p className="whitespace-pre-line break-words text-sm leading-6 text-white/85">{technique.description}</p>
            {technique.benefits && technique.benefits.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/85 marker:text-[#E5CF80]">
                {technique.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            )}
          </div>
          <div className="shrink-0 border-t border-white/20 pt-3">
            <p className="text-xs text-white/85">Consulta de Medicina Natural{consultation.appointmentRequired ? ' · Previa cita' : ''}</p>
            <p className="mt-1 font-serif text-2xl">${consultation.price} <span className="font-sans text-sm">MXN</span></p>
            <a
              href={getTechniqueWhatsappUrl(technique.name, contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-[#E5CF80] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5CF80]"
            >
              Consultar por WhatsApp
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NATURAL TECHNIQUES
========================================================= */

export function NaturalTechniques({
  consultation,
}: NaturalTechniquesProps) {
  const { contact } = useSiteData();
  const generalWhatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
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

        py-8

        sm:py-16

        lg:scroll-mt-28
        lg:py-20
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
          max-w-7xl
          px-4

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
    mt-4 sm:mt-6
    font-serif
    text-[32px]
    font-medium
    leading-[1.1]
    tracking-[-0.03em]
    text-[#0F4A55]

    sm:text-[48px]
  "
>
  <span className="sm:hidden">Consulta de </span>
  <span className="hidden sm:inline">Técnicas disponibles en la consulta de </span>
  <span className="font-normal italic">
    Medicina Natural.
  </span>
</h1>

<p
  className="
    mx-auto
    mt-4 sm:mt-6
    max-w-[680px]
    text-base
    leading-7
    text-[#526368]
  "
>
  <span className="sm:hidden">Explora las técnicas disponibles. Abre cada tarjeta para conocer sus detalles antes de solicitar una cita.</span>
  <span className="hidden sm:inline">Conoce las distintas técnicas disponibles dentro de la consulta de
  Medicina Natural y consulta la información general de cada una antes
  de solicitar una cita.</span>
</p>

         
        </motion.div>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div
          className="
            mt-7 sm:mt-10
            grid
            items-start
            grid-cols-1
            gap-4

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

    {/* CTA GENERAL */}
<motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: reduceMotion ? 0 : 0.6,
    ease: smoothEase,
  }}
  className="
    relative mt-10 overflow-hidden rounded-[28px]
    bg-[#0F3D4A] px-6 py-8
    sm:mt-12 sm:px-10
    lg:flex lg:items-center lg:justify-between lg:gap-8
  "
>
  <div
    aria-hidden="true"
    className="
      pointer-events-none absolute -right-20 -top-24
      h-64 w-64 rounded-full border border-white/10
    "
  />

  <div className="relative z-10 max-w-2xl">
    <p
      className="
        text-[10px] font-semibold uppercase
        tracking-[0.18em] text-[#E5CF80]
      "
    >
      Consulta de Medicina Natural
    </p>

    <h2
      className="
        mt-3 font-serif text-[29px] font-medium
        leading-tight text-[#FBFAF7] sm:text-[34px]
      "
    >
      ¿Te gustaría recibir más información?
    </h2>

    <p
      className="
        mt-3 max-w-xl text-sm leading-6
        text-[#DCE5E2] sm:text-[15px] sm:leading-7
      "
    >
      Puedes comunicarte directamente por WhatsApp para resolver tus
      dudas y consultar disponibilidad.
    </p>

    <div
      className="
        mt-4 flex flex-wrap items-center
        gap-x-4 gap-y-2 text-sm text-[#DCE5E2]
      "
    >
      <span>
        Consulta:{' '}
        <strong className="font-semibold text-[#FBFAF7]">
          ${consultation.price} MXN
        </strong>
      </span>

      {consultation.appointmentRequired && (
        <>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#E5CF80]"
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
        inline-flex min-h-14 w-full items-center justify-center
        gap-2.5 rounded-xl bg-[#FBFAF7] px-6 py-3.5
        text-sm font-semibold text-[#0F3D4A]
        transition-colors duration-200
        hover:bg-[#E9EFE9]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#E5CF80] focus-visible:ring-offset-4
        focus-visible:ring-offset-[#0F3D4A]
        motion-reduce:transition-none
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
            text-sm
            leading-6
            text-[#52665A]
          "
        >
          La Medicina Natural se presenta como un área de atención independiente
          de la psicoterapia y no sustituye la valoración, diagnóstico o
          tratamiento médico.
        </p>
      </div>
    </section>
  );
}