'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto dura una sesión de psicoterapia?',
    answer:
      'Cada sesión tiene una duración aproximada de 55 a 60 minutos.',
  },
  {
    question: '¿La atención puede ser presencial o en línea?',
    answer:
      'Sí. La psicoterapia puede realizarse de manera presencial o en línea, de acuerdo con la modalidad acordada previamente.',
  },
  {
    question: '¿Cuál es el costo de la psicoterapia?',
    answer:
      'La sesión individual tiene un costo de $400 MXN y la terapia de pareja de $500 MXN.',
  },
  {
    question: '¿Cómo puedo solicitar una cita?',
    answer:
      'Puedes comunicarte directamente por WhatsApp. Ahí podrás solicitar información y acordar la disponibilidad, modalidad, día y horario de tu cita.',
  },
  {
    question: '¿En qué horarios se brinda atención?',
    answer:
      'La atención es de lunes a viernes, de 4:00 pm a 9:00 pm, con cita previa.',
  },
  {
    question: '¿Dónde se encuentra el consultorio?',
    answer:
      'La atención presencial se brinda en Jacarandas 26-52, Prados de la Higuera, Tlajomulco Centro.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          DECORACIÓN MUY SUTIL
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[190px]
          top-[80px]
          h-[380px]
          w-[380px]
          rounded-full
          border
          border-[#A7B89A]/10
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
        <div
          className="
            grid
            gap-14
            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-20
          "
        >
          {/* =================================================
              COLUMNA IZQUIERDA
          ================================================== */}

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
              amount: 0.3,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease,
            }}
            className="lg:pt-4"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-9 bg-[#D4AF37]"
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#596D65]
                  sm:text-[11px]
                "
              >
                Preguntas frecuentes
              </p>
            </div>

            {/* Título */}
            <h2
              id="faq-title"
              className="
                mt-8
                max-w-[470px]
                font-serif
                text-[42px]
                font-medium
                leading-[1.08]
                tracking-[-0.03em]
                text-[#0F4A55]
                sm:text-[50px]
                lg:text-[54px]
              "
            >
              Antes de comenzar,{' '}
              <span className="font-normal italic">
                quizá quieras saber…
              </span>
            </h2>

            {/* Texto */}
            <p
              className="
                mt-6
                max-w-[430px]
                text-[15px]
                leading-7
                text-[#687A7D]
                sm:text-[16px]
              "
            >
              Aquí encontrarás respuesta a algunas de las dudas más comunes
              antes de iniciar un proceso de psicoterapia.
            </p>

            {/* Detalle */}
            <div
              aria-hidden="true"
              className="
                mt-10
                hidden
                h-px
                w-24
                bg-[#A7B89A]/40
                lg:block
              "
            />
          </motion.div>

          {/* =================================================
              ACORDEÓN
          ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
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
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="
              border-t
              border-[#A7B89A]/30
            "
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-content-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={faq.question}
                  className="
                    border-b
                    border-[#A7B89A]/30
                  "
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-8
                      py-6
                      text-left
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#0F4A55]/30
                      focus-visible:ring-offset-4
                    "
                  >
                    <div className="flex items-start gap-5 sm:gap-7">
                      {/* Número */}
                      <span
                        className="
                          mt-[3px]
                          shrink-0
                          font-serif
                          text-[13px]
                          italic
                          text-[#B2943D]
                        "
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Pregunta */}
                      <span
                        className={`
                          font-serif
                          text-[19px]
                          leading-snug
                          transition-colors
                          duration-300
                          sm:text-[21px]
                          ${
                            isOpen
                              ? 'text-[#0F4A55]'
                              : 'text-[#354F54] group-hover:text-[#0F4A55]'
                          }
                        `}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Icono */}
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? 'bg-[#0F4A55] text-white'
                            : 'bg-[#F0F3EE] text-[#0F4A55] group-hover:bg-[#E8EEE7]'
                        }
                      `}
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={`
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          ${isOpen ? 'rotate-180' : ''}
                        `}
                        strokeWidth={1.6}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
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
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease,
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className="
                            max-w-[680px]
                            pb-7
                            pl-[45px]
                            pr-14
                            text-[14px]
                            leading-7
                            text-[#687A7D]
                            sm:pl-[56px]
                            sm:text-[15px]
                          "
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}