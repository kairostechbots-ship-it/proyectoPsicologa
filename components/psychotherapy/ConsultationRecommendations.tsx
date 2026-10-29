'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  Bell,
  CalendarClock,
  Clock3,
  CreditCard,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Condiciones conservadas del componente proporcionado.
const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Llega puntualmente',
    description:
      'Procura llegar puntual a tu cita, ya que el tiempo de sesión comienza a partir de la hora acordada.',
    icon: Clock3,
  },
  {
    id: 2,
    title: 'Asiste en condiciones adecuadas',
    description:
      'Evita asistir bajo los efectos de alcohol u otras sustancias para poder llevar a cabo la sesión adecuadamente.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: 'Al llegar a tu cita',
    description:
      'Al llegar a la hora asignada puedes tocar el timbre sin problema.',
    icon: Bell,
  },
  {
    id: 4,
    title: 'Cancelación y seguimiento',
    description:
      'Puedes cancelar o solicitar un cambio de cita con al menos 24 horas de anticipación, sujeto a disponibilidad. Si no asistes y no avisas, será necesario pagar por adelantado para reservar una nueva sesión.',
    icon: CalendarClock,
  },
  {
    id: 5,
    title: 'Pago por transferencia',
    description:
      'Si realizas tu pago por transferencia bancaria, te pedimos efectuarlo antes de tu cita para facilitar la confirmación de tu sesión.',
    icon: CreditCard,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function ConsultationRecommendations() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="recommendations-title"
      className="relative overflow-hidden bg-[#FBFAF7] py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 top-[10%] h-[430px] w-[430px] rounded-full border border-[#A7B89A]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 -right-56 h-[450px] w-[450px] rounded-full border border-[#D4AF37]/[0.08]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: smoothEase }}
          className="mx-auto max-w-[720px] text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#D4AF37]" />
            <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-[#52665A] sm:text-[11px]">
              Antes de tu consulta
            </p>
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#D4AF37]" />
          </div>

          <h2
            id="recommendations-title"
            className="mt-5 font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.025em] text-[#0F3D4A] sm:text-[42px] lg:text-[46px]"
          >
            Prepárate para <span className="font-normal italic">tu cita.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[610px] text-base leading-7 text-[#526368]">
            Revisa las recomendaciones de llegada, cancelación y pago antes de asistir.
          </p>
        </motion.div>

        <div className="mx-auto mt-9 max-w-[980px] border-t border-[#A7B89A]/30 sm:mt-10">
          {recommendations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
                  ease: smoothEase,
                }}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-[#A7B89A]/30 py-5 md:grid-cols-[44px_210px_minmax(0,1fr)] md:items-center md:gap-5 md:py-6"
              >
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EFE9] text-[#597060]"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <span aria-hidden="true" className="text-[10px] font-semibold tracking-[0.15em] text-[#80651C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 font-serif text-[20px] font-medium leading-snug text-[#0F3D4A]">
                    {item.title}
                  </h3>
                </div>
                <p className="col-start-2 min-w-0 text-sm leading-6 text-[#526368] md:col-start-auto">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-[620px] text-center text-sm leading-6 text-[#53665C]">
          Si tienes alguna duda antes de asistir, puedes comunicarte directamente para recibir información.
        </p>
      </div>
    </section>
  );
}
