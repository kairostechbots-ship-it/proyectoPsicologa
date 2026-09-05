'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  MessageCircle,
  HeartHandshake,
} from 'lucide-react';

const whatsappUrl = `https://wa.me/523311383410?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para solicitar una cita.'
)}`;

const steps = [
  {
    number: '01',
    title: 'Escríbeme por WhatsApp',
    description:
      'Cuéntame que te gustaría recibir información para iniciar un proceso de terapia.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Revisamos disponibilidad',
    description:
      'Acordamos el día, horario y modalidad de atención que mejor se adapte a tus posibilidades.',
    icon: CalendarCheck,
  },
  {
    number: '03',
    title: 'Comenzamos tu proceso',
    description:
      'Una vez acordada tu cita, recibirás las indicaciones necesarias para tu primera sesión.',
    icon: HeartHandshake,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AppointmentSteps() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="como-solicitar-cita"
      aria-labelledby="appointment-steps-title"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Decoración ambiental */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute -right-40 top-0
            h-[380px] w-[380px]
            rounded-full
            bg-[#A7B89A]/10
            blur-[100px]
          "
        />

        {/* Arco decorativo muy sutil */}
        <svg
          viewBox="0 0 300 300"
          fill="none"
          className="
            absolute
            -bottom-32 -left-24
            hidden h-[340px] w-[340px]
            text-[#D4AF37]
            opacity-[0.10]
            md:block
          "
        >
          <path
            d="M26 264C79 143 160 70 278 35"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Encabezado */}
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
            duration: reduceMotion ? 0 : 0.6,
            ease,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />

            <p
              className="
                text-[10px]
                font-semibold uppercase
                tracking-[0.18em]
                text-[#52665A]
                sm:text-[11px]
              "
            >
              Tu primer paso
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />
          </div>

          <h2
            id="appointment-steps-title"
            className="
              font-serif
              text-[38px]
              font-medium
              leading-[1.08]
              tracking-[-0.025em]
              text-[#0F3D4A]
              sm:text-[48px]
              lg:text-[54px]
            "
          >
            Comenzar puede ser{' '}
            <span className="italic font-normal">
              más sencillo de lo que parece.
            </span>
          </h2>

          <p
            className="
              mx-auto mt-6
              max-w-xl
              text-base leading-7
              text-[#657175]
              sm:text-[17px]
              sm:leading-8
            "
          >
            Si estás considerando iniciar terapia, puedes solicitar
            información directamente por WhatsApp. El proceso comienza
            con una conversación.
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Línea de conexión */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-[16%] right-[16%]
              top-8
              hidden
              md:block
            "
          >
            <div className="h-px w-full bg-[#A7B89A]/35" />
          </div>

          <div
            className="
              relative z-10
              grid gap-10
              md:grid-cols-3
              md:gap-8
            "
          >
            {steps.map(
              ({ number, title, description, icon: Icon }, index) => (
                <motion.article
                  key={number}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 24,
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
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion ? 0 : index * 0.12,
                    ease,
                  }}
                  className="relative text-center"
                >
                  {/* Icono */}
                  <div
                    className="
                      relative z-10
                      mx-auto
                      flex h-16 w-16
                      items-center justify-center
                      rounded-full
                      border border-[#A7B89A]/25
                      bg-[#FBFAF7]
                      text-[#0F3D4A]
                      shadow-[0_8px_24px_rgba(15,61,74,0.05)]
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Número */}
                  <p
                    className="
                      mt-6
                      text-[10px]
                      font-semibold uppercase
                      tracking-[0.2em]
                      text-[#B18D24]
                    "
                  >
                    Paso {number}
                  </p>

                  <h3
                    className="
                      mt-3
                      font-serif
                      text-[23px]
                      font-medium
                      text-[#0F3D4A]
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mx-auto mt-3
                      max-w-[270px]
                      text-sm
                      leading-6
                      text-[#657175]
                    "
                  >
                    {description}
                  </p>
                </motion.article>
              )
            )}
          </div>
        </div>

        {/* CTA */}
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
            amount: 0.4,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            delay: reduceMotion ? 0 : 0.15,
            ease,
          }}
          className="
            mt-14
            flex flex-col
            items-center
            lg:mt-16
          "
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar cita por WhatsApp"
            className="
              group
              inline-flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0F3D4A]
              px-7 py-3.5
              text-sm font-semibold
              text-white
              shadow-[0_8px_22px_rgba(15,61,74,0.12)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#174F5D]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0F3D4A]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-white
              sm:w-auto
            "
          >
            Solicitar cita por WhatsApp

            <ArrowRight
              aria-hidden="true"
              className="
                h-4 w-4
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
              strokeWidth={1.8}
            />
          </a>

          <p
            className="
              mt-4
              max-w-md
              text-center
              text-xs
              leading-5
              text-[#788184]
            "
          >
            La cita queda confirmada una vez acordados el día y horario
            directamente con Erika.
          </p>
        </motion.div>
      </div>
    </section>
  );
}