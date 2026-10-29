'use client';

import { useSiteData } from '@/components/SiteDataProvider';
import { motion, useReducedMotion } from 'motion/react';
import { CalendarDays, MessageCircle, PackageCheck } from 'lucide-react';

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function PsychotherapyPromotionDetail() {
  const { contact, promotion } = useSiteData();
  const reduceMotion = useReducedMotion();

  if (!promotion?.activo) {
    return null;
  }

  const promotionWhatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hola, me gustaría recibir información sobre el paquete de ${promotion.sesiones} sesiones de psicoterapia y sus condiciones.`,
  )}`;

  return (
    <motion.section
      id="promocion"
      aria-labelledby="promotion-detail-title"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: smoothEase }}
      className="relative mt-10 scroll-mt-28 overflow-hidden rounded-[28px] bg-[#0F4A55] px-6 py-7 shadow-[0_18px_50px_rgba(15,74,85,0.12)] sm:px-8 sm:py-8 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full border border-white/[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-[18%] h-56 w-56 rounded-full border border-[#D4AF37]/10"
      />

      <div className="relative z-10 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E7D99B]"
            >
              <PackageCheck className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <p className="text-[11px] font-semibold uppercase leading-5 tracking-[0.16em] text-[#E7D99B]">
              Promoción de psicoterapia
            </p>
          </div>

          <h2
            id="promotion-detail-title"
            className="mt-4 font-serif text-[28px] font-medium leading-tight text-white sm:text-[34px]"
          >
            Paquete de{' '}
            <span className="font-normal italic text-[#E7D99B]">
              {promotion.sesiones} sesiones
            </span>
          </h2>

          <p className="mt-3 max-w-[640px] text-sm leading-6 text-[#D8E3DF]">
            {promotion.descripcion}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm leading-6 text-[#D8E3DF]">
            <p className="inline-flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#E7D99B]"
                strokeWidth={1.5}
              />
              {promotion.frecuencia}
            </p>
            {promotion.excluyeTerapiaPareja && (
              <p>Excepto terapia de pareja</p>
            )}
          </div>

          {/* Se conservan las condiciones capturadas en el administrador. */}
          {promotion.condiciones && (
            <div className="mt-5 border-t border-white/20 pt-4">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Condiciones del paquete
              </h3>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-[#D8E3DF]">
                {promotion.condiciones}
              </p>
            </div>
          )}
        </div>

        <div className="min-w-0 border-t border-white/20 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <p className="text-sm leading-6 text-[#D8E3DF]">
            {promotion.nombre}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[#D8E3DF]">
            Precio total del paquete
          </p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-white">
            <span className="font-serif text-[40px] font-medium leading-tight">
              ${promotion.precio.toLocaleString('es-MX')}
            </span>
            <span className="text-xs font-medium text-[#D8E3DF]">MXN</span>
          </p>

          <a
            href={promotionWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar paquete por WhatsApp, abre una pestaña nueva"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0F4A55] transition-colors hover:bg-[#F7F5EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7D99B] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0F4A55]"
          >
            <MessageCircle
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              strokeWidth={1.6}
            />
            Consultar paquete
          </a>
        </div>
      </div>
    </motion.section>
  );
}
