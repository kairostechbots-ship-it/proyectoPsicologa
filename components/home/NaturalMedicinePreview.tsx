'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CalendarDays, Leaf } from 'lucide-react';

import type { NaturalMedicineConsultation } from '@/types/natural-medicine';

interface NaturalMedicinePreviewProps {
  consultation: NaturalMedicineConsultation;
}

const ease = [0.22, 1, 0.36, 1] as const;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(price);

export function NaturalMedicinePreview({
  consultation,
}: NaturalMedicinePreviewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="medicina-natural"
      aria-labelledby="natural-medicine-title"
      className="relative overflow-hidden bg-[#FBFAF7] py-12 sm:py-14 lg:py-16 scroll-mt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-[#A7B89A]/20 bg-[#A7B89A]/[0.06]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-[#C89F36]"
              />
              <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-[#52665A] sm:text-[11px]">
                Otra área de atención
              </p>
            </div>

            <h2
              id="natural-medicine-title"
              className="mt-4 font-serif text-[32px] font-medium leading-[1.12] tracking-[-0.025em] text-[#0F3D4A] sm:text-[38px] lg:text-[42px]"
            >
              Medicina <span className="font-normal italic">Natural</span>
            </h2>

            <p className="mt-4 max-w-[590px] text-base leading-7 text-[#60716D]">
              También ofrezco atención en Medicina Natural, como un área
              independiente de la psicoterapia. Puedes conocer las técnicas
              disponibles y sus características en su página.
            </p>

            <Link
              href="/medicina-natural"
              className="group mt-5 inline-flex min-h-11 max-w-full items-center gap-3 rounded-sm py-2 text-sm font-semibold text-[#0F3D4A] transition-colors hover:text-[#174F5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF7]"
            >
              <span>Conocer Medicina Natural</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                strokeWidth={1.7}
              />
            </Link>
          </div>

          {/* Información breve; el catálogo permanece en su página. */}
          <div className="min-w-0 rounded-[24px] border border-[#A7B89A]/30 bg-[#EEF2EA]/70 p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#52665A]"
              >
                <Leaf className="h-5 w-5" strokeWidth={1.5} />
              </span>

              <div className="min-w-0">
                <p className="text-sm leading-6 text-[#52665A]">
                  Consulta de Medicina Natural
                </p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[#0F3D4A]">
                  <span className="font-serif text-[34px] leading-tight">
                    {formatPrice(consultation.price)}
                  </span>
                  <span className="text-xs font-medium">MXN</span>
                </p>
              </div>
            </div>

            {consultation.appointmentRequired && (
              <p className="mt-5 flex items-center gap-2 border-t border-[#A7B89A]/30 pt-4 text-sm leading-6 text-[#52665A]">
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.6}
                />
                Atención con cita previa
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
