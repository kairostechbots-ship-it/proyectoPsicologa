'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ChevronDown,
  MessageCircle,
} from 'lucide-react';

import type { FAQ, FAQCategory } from '@/types/faq';

interface FAQListProps {
  faqs: FAQ[];
}

type FilterValue = 'all' | FAQCategory;

const filters: {
  label: string;
  value: FilterValue;
}[] = [
  {
    label: 'Todas',
    value: 'all',
  },
  {
    label: 'Psicoterapia',
    value: 'psicoterapia',
  },
  {
    label: 'Medicina Natural',
    value: 'medicina-natural',
  },
];

const categoryLabels: Record<FAQCategory, string> = {
  general: 'Información general',
  psicoterapia: 'Psicoterapia',
  'medicina-natural': 'Medicina Natural',
};

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, estuve revisando las preguntas frecuentes de tu página y tengo una duda: '
)}`;

export function FAQList({ faqs }: FAQListProps) {
  const reduceMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] =
    useState<FilterValue>('all');

  const [openId, setOpenId] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs
      .filter((faq) => faq.active)
      .filter((faq) => {
        if (activeFilter === 'all') {
          return true;
        }

        return faq.category === activeFilter;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [faqs, activeFilter]);

  const handleFilterChange = (filter: FilterValue) => {
    setActiveFilter(filter);
    setOpenId(null);
  };

  const toggleFaq = (id: number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        bg-[#FBFAF7]
        py-20

        sm:py-24

        lg:scroll-mt-28
        lg:py-28
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
          -right-44
          top-20
          h-[360px]
          w-[360px]
          rounded-full
          border
          border-[#A7B89A]/10

          lg:h-[460px]
          lg:w-[460px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-48
          -left-48
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#A7B89A]/[0.04]

          lg:h-[500px]
          lg:w-[500px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
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
                  y: 18,
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
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#52665A]

                sm:text-[11px]
              "
            >
              Preguntas frecuentes
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />
          </div>

          {/* Título */}
          <h1
            id="faq-title"
            className="
              mt-5
              font-serif
              text-[39px]
              font-medium
              leading-[1.07]
              tracking-[-0.035em]
              text-[#0F3D4A]

              sm:text-[48px]

              lg:text-[56px]
            "
          >
            Resolvemos algunas de tus{' '}
            <span className="font-normal italic">
              dudas.
            </span>
          </h1>

          {/* Descripción */}
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-[15px]
              leading-7
              text-[#657175]

              sm:text-[17px]
              sm:leading-8
            "
          >
            Encuentra información sobre la atención, psicoterapia y Medicina
            Natural antes de solicitar una cita.
          </p>
        </motion.div>

        {/* =====================================================
            FILTROS
        ====================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-9
            flex
            flex-wrap
            justify-center
            gap-2

            sm:mt-10
          "
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleFilterChange(filter.value)}
                aria-pressed={isActive}
                className={`
                  min-h-10
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  transition-all
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0F3D4A]
                  focus-visible:ring-offset-2

                  ${
                    isActive
                      ? `
                        border-[#0F3D4A]
                        bg-[#0F3D4A]
                        text-white
                      `
                      : `
                        border-[#A7B89A]/30
                        bg-white/70
                        text-[#52665A]
                        hover:border-[#0F3D4A]/25
                        hover:bg-white
                        hover:text-[#0F3D4A]
                      `
                  }
                `}
              >
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        {/* =====================================================
            ACORDEÓN
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-12
            max-w-4xl
            overflow-hidden
            rounded-[26px]
            border
            border-[#A7B89A]/20
            bg-white

            sm:mt-14
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.article
                  key={faq.id}
                  layout={!reduceMotion}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -6,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                  }}
                  className={`
                    relative

                    ${
                      index !== filteredFaqs.length - 1
                        ? 'border-b border-[#A7B89A]/20'
                        : ''
                    }
                  `}
                >
                  {/* Pregunta */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="
                      group
                      flex
                      w-full
                      items-start
                      gap-4
                      px-5
                      py-6
                      text-left

                      transition-colors
                      duration-200

                      hover:bg-[#FBFAF7]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-[#0F3D4A]

                      sm:gap-6
                      sm:px-7
                      sm:py-7
                    "
                  >
                    {/* Número */}
                    <span
                      aria-hidden="true"
                      className="
                        mt-1
                        shrink-0
                        font-serif
                        text-[17px]
                        text-[#D4AF37]/75
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Texto */}
                    <div className="min-w-0 flex-1">
                      <span
                        className="
                          block
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[#8A968F]
                        "
                      >
                        {categoryLabels[faq.category]}
                      </span>

                      <h2
                        className="
                          mt-2
                          pr-2
                          font-serif
                          text-[20px]
                          font-medium
                          leading-snug
                          text-[#0F3D4A]

                          sm:text-[23px]
                        "
                      >
                        {faq.question}
                      </h2>
                    </div>

                    {/* Icono */}
                    <span
                      className={`
                        mt-2
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#A7B89A]/25
                        bg-[#FBFAF7]
                        text-[#52665A]
                        transition-all
                        duration-300

                        group-hover:border-[#D4AF37]/35

                        ${
                          isOpen
                            ? 'rotate-180 bg-[#A7B89A]/10'
                            : ''
                        }
                      `}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.6}
                      />
                    </span>
                  </button>

                  {/* Respuesta */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        animate={{
                          height: 'auto',
                          opacity: 1,
                        }}
                        exit={
                          reduceMotion
                            ? undefined
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        transition={{
                          height: {
                            duration: reduceMotion ? 0 : 0.32,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: reduceMotion ? 0 : 0.22,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className="
                            pb-7
                            pl-[61px]
                            pr-6

                            sm:pb-8
                            sm:pl-[82px]
                            sm:pr-16
                          "
                        >
                          <div
                            className="
                              border-l-2
                              border-[#D4AF37]/40
                              pl-4

                              sm:pl-5
                            "
                          >
                            <p
                              className="
                                max-w-2xl
                                text-sm
                                leading-7
                                text-[#657175]

                                sm:text-[15px]
                              "
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </AnimatePresence>

          {/* Sin resultados */}
          {filteredFaqs.length === 0 && (
            <div className="px-6 py-14 text-center">
              <p className="text-sm text-[#657175]">
                No hay preguntas disponibles en esta categoría por el momento.
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            ¿NO ENCONTRASTE TU RESPUESTA?
        ====================================================== */}

        <motion.div
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
            amount: 0.3,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            mt-10
            max-w-4xl
            overflow-hidden
            rounded-[26px]
            border
            border-[#A7B89A]/20
            bg-white
            px-6
            py-8
            text-center
            shadow-[0_10px_35px_rgba(15,61,74,0.035)]

            sm:mt-12
            sm:px-10
            sm:py-10
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
              h-52
              w-52
              rounded-full
              bg-[#A7B89A]/[0.06]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-16
              -left-14
              h-36
              w-36
              rounded-full
              border
              border-[#D4AF37]/10
            "
          />

          <div className="relative z-10">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#B08B28]
              "
            >
              ¿Tienes otra pregunta?
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-[28px]
                font-medium
                leading-tight
                text-[#0F3D4A]

                sm:text-[32px]
              "
            >
              ¿No encontraste tu respuesta?
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                leading-7
                text-[#657175]

                sm:text-[15px]
              "
            >
              Escríbeme directamente para resolver tus dudas sobre psicoterapia,
              Medicina Natural, modalidad de atención o disponibilidad de citas.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                inline-flex
                min-h-[50px]
                items-center
                justify-center
                gap-2.5
                rounded-xl
                bg-[#0F3D4A]
                px-6
                py-3
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
                focus-visible:ring-offset-[#FBFAF7]
              "
            >
              <MessageCircle
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                strokeWidth={1.7}
              />

              Hacer una pregunta
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}