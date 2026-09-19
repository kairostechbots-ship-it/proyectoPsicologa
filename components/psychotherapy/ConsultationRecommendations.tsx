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
      'Si cancelas una cita, podrás comunicarte nuevamente cuando desees solicitar una nueva. Por protocolo profesional, no se realizará seguimiento para reagendarla.',
    icon: CalendarClock,
  },
  {
    id: 5,
    title: 'Pago por transferencia',
    description:
      'Si eliges realizar tu pago mediante transferencia, deberá quedar cubierto antes de tu cita.',
    icon: CreditCard,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export function ConsultationRecommendations() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="recommendations-title"
      className="
        relative
        overflow-hidden
        bg-[#FBFAF7]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* Decoración */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[230px]
          top-[10%]
          h-[430px]
          w-[430px]
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
          -bottom-[250px]
          -right-[220px]
          h-[450px]
          w-[450px]
          rounded-full
          border
          border-[#D4AF37]/[0.08]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1120px]
          px-5
          sm:px-6
          lg:px-8
        "
      >
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
            duration: reduceMotion ? 0 : 0.65,
            ease: smoothEase,
          }}
          className="mx-auto max-w-[720px] text-center"
        >
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
              Antes de tu consulta
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#D4AF37]"
            />
          </div>

          <h2
            id="recommendations-title"
            className="
              mt-6
              font-serif
              text-[38px]
              font-medium
              leading-[1.1]
              tracking-[-0.03em]
              text-[#0F4A55]

              sm:text-[46px]
            "
          >
            Algunas recomendaciones para{' '}
            <span className="font-normal italic">
              tu cita.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[610px]
              text-[14px]
              leading-7
              text-[#718083]
            "
          >
            Ten en cuenta estas indicaciones para aprovechar mejor el
            tiempo destinado a tu sesión.
          </p>
        </motion.div>

        {/* Recomendaciones */}
        <div
          className="
            mx-auto
            mt-14
            max-w-[900px]
            border-t
            border-[#A7B89A]/25
          "
        >
          {recommendations.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.id}
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
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion
                    ? 0
                    : Math.min(index * 0.06, 0.24),
                  ease: smoothEase,
                }}
                className="
                  group
                  grid
                  grid-cols-[auto_1fr]
                  gap-4
                  border-b
                  border-[#A7B89A]/25
                  py-6

                  sm:grid-cols-[60px_210px_1fr]
                  sm:items-center
                  sm:gap-6
                  sm:py-7
                "
              >
                {/* Número / icono */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E9EFE9]
                    text-[#597060]
                    transition-all
                    duration-300

                    group-hover:bg-[#0F4A55]
                    group-hover:text-white
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Título */}
                <div>
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#B2943D]
                    "
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3
                    className="
                      mt-1
                      font-serif
                      text-[19px]
                      font-medium
                      leading-snug
                      text-[#0F4A55]
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Descripción */}
                <p
                  className="
                    col-start-2
                    text-[12px]
                    leading-6
                    text-[#718083]

                    sm:col-start-auto
                    sm:text-[13px]
                  "
                >
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Nota final */}
        <p
          className="
            mx-auto
            mt-8
            max-w-[620px]
            text-center
            text-[11px]
            leading-5
            text-[#82918B]
          "
        >
          Si tienes alguna duda antes de asistir, puedes comunicarte
          directamente para recibir información.
        </p>
      </div>
    </section>
  );
}