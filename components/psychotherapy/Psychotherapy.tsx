'use client';
import { useSiteData } from '@/components/SiteDataProvider';

import { motion, useReducedMotion } from 'motion/react';

import {
  Baby,
  Brain,
  CircleHelp,
  Clock3,
  HeartHandshake,
  HeartPulse,
  MessageCircle,
  MessageCircleHeart,
  Monitor,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { PsychotherapyPromotionDetail } from '@/components/psychotherapy/PsychotherapyPromotionDetail';




import { getBusinessHoursText } from '@/lib/utils';

import type { Service } from '@/types/psychotherapy';

/* =========================================================
   ICONOS
========================================================= */

const iconMap: Record<string, LucideIcon> = {
  child: Baby,
  brain: Brain,
  users: Users,
  heart: HeartHandshake,
  'heart-pulse': HeartPulse,
  conversation: MessageCircleHeart,
  online: Monitor,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

/* =========================================================
   WHATSAPP
========================================================= */



/* =========================================================
   ANIMACIONES
========================================================= */

const smoothEase = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   SERVICES
========================================================= */

export function Services() {
 const { contact: contactMock, services: mockServices } = useSiteData();
const whatsappUrl = `https://wa.me/${contactMock.whatsapp}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre los servicios de psicoterapia y solicitar una cita.',
)}`;

  const reduceMotion = useReducedMotion();

  /*
   * DATOS TEMPORALES
   *
   * Mientras el backend no esté disponible utilizamos
   * mockServices.
   *
   * Cuando los endpoints estén listos, estos datos serán
   * reemplazados por la información obtenida desde la API.
   */

  const services: Service[] = mockServices
    .filter((service) => service.activo)
    .sort((a, b) => a.orden - b.orden);

  const businessHoursText = getBusinessHoursText(
    contactMock.businessHours,
  );

  return (
    <section
      id="servicios-psicoterapia"
      aria-labelledby="services-title"
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
          DECORACIÓN
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -right-[240px]
            top-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-[#A7B89A]/10
          "
        />

        <div
          className="
            absolute
            -bottom-[300px]
            -left-[260px]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-[#D4AF37]/[0.07]
          "
        />
      </div>

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
   {/* ===================================================
    ENCABEZADO
==================================================== */}

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
      className="
        h-px
        w-8
        bg-[#D4AF37]
      "
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
      Psicología Clínica · Terapia Cognitivo-Conductual
    </p>

    <span
      aria-hidden="true"
      className="
        h-px
        w-8
        bg-[#D4AF37]
      "
    />
  </div>

  <h1
    id="services-title"
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
    Psicoterapia para cada{' '}
    <span className="font-normal italic">
      etapa de la vida.
    </span>
  </h1>

  <p
    className="
      mx-auto
      mt-6
      max-w-[680px]
      text-[14px]
      leading-7
      text-[#718083]
    "
  >
    Atención psicológica con enfoque
    cognitivo-conductual para niños,
    adolescentes, adultos y parejas.
    Consulta presencial en Tlajomulco
    y atención en línea.
  </p>
</motion.div>

        {/* ===================================================
            SIN SERVICIOS
        ==================================================== */}

        {services.length === 0 && (
          <EmptyServices
            reduceMotion={Boolean(reduceMotion)}
          />
        )}

        {/* ===================================================
            SERVICIOS
        ==================================================== */}

        {services.length > 0 && (
          <>
            <div
              className="
                mt-14
                grid
                gap-6
                md:grid-cols-2
              "
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </div>

            {/* ===============================================
                PROMOCIÓN
            ================================================ */}

            <PsychotherapyPromotionDetail />

            {/* ===============================================
                INFORMACIÓN GENERAL / CTA
            ================================================ */}

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
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.1,
                ease: smoothEase,
              }}
              className="
                mt-6
                flex
                flex-col
                gap-6
                rounded-[22px]
                border
                border-[#A7B89A]/20
                bg-[#FBFAF7]
                px-6
                py-6

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-8
                sm:py-7
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#EEF2EC]
                    text-[#597060]
                  "
                >
                  <HeartHandshake
                    aria-hidden="true"
                    className="
                      h-[18px]
                      w-[18px]
                    "
                    strokeWidth={1.5}
                  />
                </span>

                <div>
                  <h3
                    className="
                      font-serif
                      text-[20px]
                      font-medium
                      text-[#0F4A55]
                    "
                  >
                    ¿Tienes dudas sobre el tipo
                    de atención?
                  </h3>

                  <p
                    className="
                      mt-1.5
                      max-w-[620px]
                      text-[12px]
                      leading-6
                      text-[#718083]
                    "
                  >
                    Puedes comunicarte directamente
                    para recibir información sobre
                    los servicios y conocer la
                    disponibilidad de atención.
                  </p>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      font-medium
                      text-[#82918B]
                    "
                  >
                    {contactMock.appointmentRequired &&
                      'Atención con cita previa · '}
                    {businessHoursText}
                  </p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[#0F3D4A]
                  px-6
                  py-3.5
                  text-[12px]
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(15,61,74,0.12)]
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:bg-[#123540]
                "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.7}
                />

                Solicitar información
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

interface ServiceCardProps {
  service: Service;
  index: number;
  reduceMotion: boolean;
}

function ServiceCard({
  service,
  index,
  reduceMotion,
}: ServiceCardProps) {
  const Icon =
    iconMap[service.icono] ??
    CircleHelp;

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion
          ? 0
          : Math.min(index * 0.08, 0.24),
        ease: smoothEase,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-[#A7B89A]/20
        bg-[#FBFAF7]
        p-7
        shadow-[0_10px_35px_rgba(15,61,74,0.045)]
        transition-shadow
        duration-300

        hover:shadow-[0_20px_50px_rgba(15,61,74,0.085)]

        sm:p-8
      "
    >
      {/* Línea superior */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          origin-left
          scale-x-0
          bg-[#D4AF37]
          transition-transform
          duration-500

          group-hover:scale-x-100
        "
      />

      {/* ===================================================
          ICONO
      ==================================================== */}

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-[18px]
          bg-[#E9EFE9]
          text-[#597060]
          transition-all
          duration-300

          group-hover:scale-[1.04]
          group-hover:bg-[#0F4A55]
          group-hover:text-white
        "
      >
        <Icon
          aria-hidden="true"
          className="h-6 w-6"
          strokeWidth={1.45}
        />
      </div>

      {/* ===================================================
          CONTENIDO
      ==================================================== */}

      <div
        className="
          mt-6
          flex
          flex-1
          flex-col
        "
      >
        <h3
          className="
            font-serif
            text-[26px]
            font-medium
            leading-tight
            text-[#0F4A55]
          "
        >
          {service.nombre}
        </h3>

        <p
          className="
            mt-3
            flex-1
            text-[13px]
            leading-6
            text-[#718083]
          "
        >
          {service.descripcion}
        </p>

        {/* =================================================
            MODALIDAD
        ================================================== */}

        {service.modalidad && (
          <div className="mt-5">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#A7B89A]/20
                bg-white/70
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-[#596D65]
              "
            >
              <Monitor
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                "
                strokeWidth={1.5}
              />

              {service.modalidad}
            </span>
          </div>
        )}

        {/* =================================================
            PRECIO + DURACIÓN
        ================================================== */}

        {(service.precio !== undefined ||
          service.duracion) && (
          <div
            className="
              mt-6
              grid
              grid-cols-2
              border-t
              border-[#A7B89A]/20
              pt-5
            "
          >
            {/* PRECIO */}

            {service.precio !== undefined && (
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#82918B]
                  "
                >
                  Consulta
                </p>

                <p
                  className="
                    mt-1.5
                    font-serif
                    text-[23px]
                    font-medium
                    leading-none
                    text-[#0F4A55]
                  "
                >
                  $
                  {service.precio.toLocaleString(
                    'es-MX',
                  )}

                  <span
                    className="
                      ml-1
                      font-sans
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-[#82918B]
                    "
                  >
                    MXN
                  </span>
                </p>
              </div>
            )}

            {/* DURACIÓN */}

            {service.duracion && (
              <div
                className={
                  service.precio !== undefined
                    ? 'border-l border-[#A7B89A]/20 pl-5'
                    : ''
                }
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Clock3
                    aria-hidden="true"
                    className="
                      h-3.5
                      w-3.5
                      text-[#B2943D]
                    "
                    strokeWidth={1.5}
                  />

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#82918B]
                    "
                  >
                    Duración
                  </p>
                </div>

                <p
                  className="
                    mt-1.5
                    text-[12px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  {service.duracion}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

interface EmptyServicesProps {
  reduceMotion: boolean;
}

function EmptyServices({
  reduceMotion,
}: EmptyServicesProps) {
 const { contact: contactMock } = useSiteData();
const whatsappUrl = `https://wa.me/${contactMock.whatsapp}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información sobre los servicios de psicoterapia y solicitar una cita.',
)}`;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 15,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        ease: smoothEase,
      }}
      className="
        mx-auto
        mt-14
        max-w-xl
        rounded-[24px]
        border
        border-[#A7B89A]/20
        bg-[#FBFAF7]
        p-8
        text-center
      "
    >
      <MessageCircleHeart
        aria-hidden="true"
        className="
          mx-auto
          h-8
          w-8
          text-[#597060]
        "
        strokeWidth={1.5}
      />

      <h3
        className="
          mt-4
          font-serif
          text-[22px]
          font-medium
          text-[#0F4A55]
        "
      >
        Información en actualización
      </h3>

      <p
        className="
          mt-2
          text-[12px]
          leading-6
          text-[#718083]
        "
      >
        Puedes comunicarte directamente
        para conocer los servicios y la
        disponibilidad de atención.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#0F3D4A]
          px-5
          py-3
          text-[12px]
          font-semibold
          text-white
          transition-all
          duration-300

          hover:-translate-y-0.5
          hover:bg-[#123540]
        "
      >
        <MessageCircle
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={1.6}
        />

        Consultar por WhatsApp
      </a>
    </motion.div>
  );
}