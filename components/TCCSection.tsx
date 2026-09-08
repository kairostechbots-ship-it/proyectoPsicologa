'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  Heart,
  Activity,
  Check,
  type LucideIcon,
} from 'lucide-react';

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#F1F4EE]';

const smoothEase = [0.22, 1, 0.36, 1] as const;

const tccElements = [
  {
    title: 'Pensamientos',
    description: 'Cómo interpretamos lo que vivimos',
    icon: Brain,
  },
  {
    title: 'Emociones',
    description: 'Lo que sentimos ante esas experiencias',
    icon: Heart,
  },
  {
    title: 'Conductas',
    description: 'Cómo respondemos y actuamos',
    icon: Activity,
  },
];

export function TCCSection() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  };

  const visual = {
    hidden: {
      opacity: 0,
      scale: 0.97,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: smoothEase,
      },
    },
  };

  return (
    <section
      aria-labelledby="tcc-title"
      className="
        relative
        overflow-hidden
        bg-[#F1F4EE]
        py-14
        sm:py-18
        lg:py-28
      "
    >
      {/* =====================================================
          DECORACIÓN
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-40
            top-[-100px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-white/45
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -bottom-[160px]
            -right-24
            h-[380px]
            w-[380px]
            rounded-full
            border
            border-[#A7B89A]/20
          "
        />

        <svg
          viewBox="0 0 300 300"
          fill="none"
          className="
            absolute
            -bottom-[120px]
            -right-24
            h-[330px]
            w-[330px]
            text-[#D4AF37]
            opacity-20
          "
        >
          <path
            d="M25 250C85 130 155 72 277 38"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* =====================================================
          CONTENIDO GENERAL
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            gap-12

            sm:gap-14

            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-center
            lg:gap-20

            xl:gap-28
          "
        >
          {/* =================================================
              TEXTO
          ================================================== */}

          <motion.div
            variants={reduceMotion ? {} : container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={item}
              className="flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#D4AF37] sm:w-8"
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#52665A]

                  sm:text-[11px]
                  sm:tracking-[0.18em]
                "
              >
                Terapia Cognitivo-Conductual
              </p>
            </motion.div>

            {/* Título */}
            <motion.h2
              variants={item}
              id="tcc-title"
              className="
                mt-5
                max-w-xl
                font-serif
                text-[34px]
                font-medium
                leading-[1.08]
                tracking-[-0.025em]
                text-[#0F3D4A]

                sm:text-[44px]

                lg:text-[54px]
              "
            >
              Comprender también es{' '}
              <span className="font-normal italic">
                parte del proceso.
              </span>
            </motion.h2>

            {/* Texto */}
            <motion.p
              variants={item}
              className="
                mt-5
                max-w-xl
                text-[15px]
                leading-7
                text-[#657175]

                sm:mt-6
                sm:text-[17px]
                sm:leading-8
              "
            >
              La Terapia Cognitivo-Conductual es un enfoque basado en
              evidencia que permite explorar la relación entre lo que
              pensamos, sentimos y hacemos.
            </motion.p>

            <motion.p
              variants={item}
              className="
                mt-4
                max-w-xl
                text-[15px]
                leading-7
                text-[#657175]

                sm:text-base
              "
            >
              A partir de esta comprensión, el proceso terapéutico busca
              desarrollar estrategias y herramientas que respondan a tus
              necesidades y objetivos personales.
            </motion.p>

            {/* Principios */}
            <motion.div
              variants={item}
              className="mt-6 space-y-3 sm:mt-7"
            >
              <Principle>
                Un proceso centrado en tus necesidades y objetivos.
              </Principle>

              <Principle>
                Estrategias que pueden aplicarse también fuera de consulta.
              </Principle>

              <Principle>
                Acompañamiento profesional, colaborativo y sin juicios.
              </Principle>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={item}
              className="mt-7 sm:mt-8"
            >
              <Link
                href="/psicoterapia"
                className={`
                  group
                  inline-flex
                  min-h-11
                  items-center
                  gap-2
                  py-2
                  text-[13px]
                  font-semibold
                  text-[#0F3D4A]
                  transition-colors
                  hover:text-[#174F5D]
                  sm:text-sm
                  ${focusStyles}
                `}
              >
                Conocer mi enfoque terapéutico

                <ArrowRight
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.8}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* =================================================
              VISUAL
          ================================================== */}

          <motion.div
            variants={reduceMotion ? {} : visual}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="w-full"
          >
            {/* ===============================================
                MOBILE + TABLET
            ================================================ */}

            <div className="lg:hidden">
              <MobileTCCVisual />
            </div>

            {/* ===============================================
                DESKTOP
            ================================================ */}

            <div
              className="
                relative
                mx-auto
                hidden
                w-full
                max-w-[570px]
                lg:block
              "
            >
              <DesktopTCCVisual />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRINCIPIO
========================================================= */

function Principle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
          text-[#0F3D4A]
        "
      >
        <Check
          aria-hidden="true"
          className="h-3 w-3"
          strokeWidth={2}
        />
      </span>

      <p className="text-[13px] leading-6 text-[#52665A] sm:text-sm">
        {children}
      </p>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileTCCVisual() {
  return (
    <div
      className="
        relative
        mx-auto
        max-w-[430px]
        rounded-[28px]
        border
        border-[#A7B89A]/20
        bg-white/35
        px-5
        py-7
        sm:px-7
        sm:py-8
      "
    >
      {/* Detalle dorado */}
      <span
        aria-hidden="true"
        className="
          absolute
          right-7
          top-6
          h-2
          w-2
          rounded-full
          bg-[#D4AF37]/60
        "
      />

      {/* Centro / introducción */}
      <div className="text-center">
        <div
          className="
            mx-auto
            flex
            h-[112px]
            w-[112px]
            flex-col
            items-center
            justify-center
            rounded-full
            bg-[#0F3D4A]
            text-center
            text-white
            shadow-[0_14px_35px_rgba(15,61,74,0.12)]
          "
        >
          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#D4AF37]
            "
          >
            Proceso
          </span>

          <span
            className="
              mt-1
              font-serif
              text-[20px]
              leading-none
            "
          >
            terapéutico
          </span>
        </div>

        <p
          className="
            mx-auto
            mt-4
            max-w-[280px]
            text-[11px]
            leading-5
            text-[#718079]
          "
        >
          Pensamientos, emociones y conductas se relacionan entre sí.
        </p>
      </div>

      {/* Línea central */}
      <div
        aria-hidden="true"
        className="
          mx-auto
          mt-5
          h-7
          w-px
          bg-[#A7B89A]/45
        "
      />

      {/* Elementos */}
      <div className="space-y-0">
        {tccElements.map((element, index) => (
          <div key={element.title}>
            <MobileTCCItem {...element} />

            {index < tccElements.length - 1 && (
              <div
                aria-hidden="true"
                className="
                  ml-[25px]
                  h-6
                  w-px
                  bg-[#A7B89A]/35
                "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE ITEM
========================================================= */

interface MobileTCCItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function MobileTCCItem({
  title,
  description,
  icon: Icon,
}: MobileTCCItemProps) {
  return (
    <div
      className="
        grid
        grid-cols-[52px_1fr]
        items-center
        gap-4
      "
    >
      <div
        className="
          flex
          h-[52px]
          w-[52px]
          items-center
          justify-center
          rounded-full
          border
          border-[#A7B89A]/30
          bg-white
          text-[#0F3D4A]
          shadow-[0_8px_24px_rgba(15,61,74,0.05)]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-5 w-5"
          strokeWidth={1.5}
        />
      </div>

      <div className="min-w-0">
        <h3
          className="
            font-serif
            text-[21px]
            leading-tight
            text-[#0F3D4A]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[11px]
            leading-5
            text-[#657175]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopTCCVisual() {
  return (
    <div className="relative aspect-square w-full">
      {/* Círculo exterior */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          h-[82%]
          w-[82%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#0F3D4A]/10
        "
      />

      {/* Círculo interior */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          h-[53%]
          w-[53%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#D4AF37]/20
        "
      />

      {/* Conexiones */}
      <svg
        aria-hidden="true"
        viewBox="0 0 500 500"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M250 126L130 330"
          stroke="#A7B89A"
          strokeWidth="1.3"
          strokeDasharray="5 7"
        />

        <path
          d="M250 126L370 330"
          stroke="#A7B89A"
          strokeWidth="1.3"
          strokeDasharray="5 7"
        />

        <path
          d="M130 330L370 330"
          stroke="#A7B89A"
          strokeWidth="1.3"
          strokeDasharray="5 7"
        />
      </svg>

      {/* Pensamientos */}
      <DesktopTCCItem
        icon={Brain}
        title="Pensamientos"
        description="Cómo interpretamos lo que vivimos"
        className="
          left-1/2
          top-[8%]
          -translate-x-1/2
        "
      />

      {/* Emociones */}
      <DesktopTCCItem
        icon={Heart}
        title="Emociones"
        description="Lo que sentimos ante esas experiencias"
        className="
          bottom-[8%]
          left-[2%]
        "
      />

      {/* Conductas */}
      <DesktopTCCItem
        icon={Activity}
        title="Conductas"
        description="Cómo respondemos y actuamos"
        className="
          bottom-[8%]
          right-[2%]
        "
      />

      {/* Centro */}
      <div
        className="
          absolute
          left-1/2
          top-[52%]
          flex
          h-[118px]
          w-[118px]
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          items-center
          justify-center
          rounded-full
          bg-[#0F3D4A]
          text-center
          text-white
          shadow-[0_18px_40px_rgba(15,61,74,0.12)]
        "
      >
        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#D4AF37]
          "
        >
          Proceso
        </span>

        <span
          className="
            mt-1
            font-serif
            text-[22px]
            leading-none
          "
        >
          terapéutico
        </span>
      </div>

      {/* Detalles */}
      <span
        aria-hidden="true"
        className="
          absolute
          right-[14%]
          top-[18%]
          h-2
          w-2
          rounded-full
          bg-[#D4AF37]/70
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[23%]
          left-[27%]
          h-1.5
          w-1.5
          rounded-full
          bg-[#D4AF37]/60
        "
      />
    </div>
  );
}

/* =========================================================
   DESKTOP ITEM
========================================================= */

interface DesktopTCCItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className: string;
}

function DesktopTCCItem({
  title,
  description,
  icon: Icon,
  className,
}: DesktopTCCItemProps) {
  return (
    <div
      className={`
        absolute
        w-[180px]
        text-center
        ${className}
      `}
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-[#A7B89A]/30
          bg-white
          text-[#0F3D4A]
          shadow-[0_10px_30px_rgba(15,61,74,0.05)]
        "
      >
        <Icon
          aria-hidden="true"
          className="h-6 w-6"
          strokeWidth={1.5}
        />
      </div>

      <p
        className="
          mt-3
          font-serif
          text-[22px]
          text-[#0F3D4A]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1
          text-xs
          leading-5
          text-[#657175]
        "
      >
        {description}
      </p>
    </div>
  );
}