'use client';

import {
  ArrowDown,
  ArrowUp,
  Edit3,
  Eye,
  EyeOff,
} from 'lucide-react';

import type {
  FAQ,
  FAQCategory,
} from '@/types/faq';

interface FAQAdminCardProps {
  faq: FAQ;

  isFirst?: boolean;
  isLast?: boolean;

  onEdit: (faq: FAQ) => void;
  onToggleActive: (id: number) => void;

  onMoveUp?: (id: number) => void;
  onMoveDown?: (id: number) => void;
}

const categoryLabels: Record<
  FAQCategory,
  string
> = {
  general: 'General',
  psicoterapia: 'Psicoterapia',
  'medicina-natural':
    'Medicina Natural',
};

const categoryClasses: Record<
  FAQCategory,
  string
> = {
  general:
    'bg-[#F2F1EC] text-[#687578]',

  psicoterapia:
    'bg-[#0F3D4A]/[0.07] text-[#0F3D4A]',

  'medicina-natural':
    'bg-[#A7B89A]/[0.15] text-[#52665A]',
};

export function FAQAdminCard({
  faq,
  isFirst = false,
  isLast = false,
  onEdit,
  onToggleActive,
  onMoveUp,
  onMoveDown,
}: FAQAdminCardProps) {
  return (
    <article
      className={`
        rounded-[18px]
        border
        bg-white
        px-5
        py-4
        transition-all

        ${
          faq.active
            ? `
              border-[#A7B89A]/20
              shadow-[0_6px_24px_rgba(15,61,74,0.025)]
            `
            : `
              border-[#A7B89A]/15
              opacity-70
            `
        }
      `}
    >
      {/* ===============================================
          HEADER
      ================================================ */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {/* CATEGORÍA */}

          <span
            className={`
              rounded-full
              px-2.5
              py-1
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.12em]

              ${categoryClasses[faq.category]}
            `}
          >
            {categoryLabels[faq.category]}
          </span>

          {/* ESTADO */}

          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              px-2.5
              py-1
              text-[7px]
              font-semibold

              ${
                faq.active
                  ? `
                    border-[#A7B89A]/20
                    bg-[#A7B89A]/[0.08]
                    text-[#52665A]
                  `
                  : `
                    border-[#D9DEDA]
                    bg-[#F6F6F2]
                    text-[#8A9691]
                  `
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full

                ${
                  faq.active
                    ? 'bg-[#7D9870]'
                    : 'bg-[#A8B0AC]'
                }
              `}
            />

            {faq.active
              ? 'Visible'
              : 'Oculta'}
          </span>
        </div>

        {/* ORDEN */}

        <span
          className="
            text-[7px]
            font-semibold
            text-[#A0AAA5]
          "
        >
          Orden {faq.displayOrder}
        </span>
      </div>

      {/* ===============================================
          CONTENIDO
      ================================================ */}

      <div className="mt-4">
        <h3
          className="
            font-serif
            text-[18px]
            font-medium
            leading-snug
            text-[#0F3D4A]

            sm:text-[19px]
          "
        >
          {faq.question}
        </h3>

        <p
          className="
            mt-2
            text-[9px]
            leading-[1.7]
            text-[#718083]

            sm:text-[10px]
          "
        >
          {faq.answer}
        </p>
      </div>

      {/* ===============================================
          FOOTER
      ================================================ */}

      <div
        className="
          mt-4
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
          border-t
          border-[#A7B89A]/15
          pt-3
        "
      >
        {/* ORDEN */}

        <div
          className="
            flex
            items-center
            gap-1.5
          "
        >
          <button
            type="button"
            disabled={isFirst}
            onClick={() =>
              onMoveUp?.(faq.id)
            }
            aria-label="Mover pregunta hacia arriba"
            title="Mover hacia arriba"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-[9px]
              border
              border-[#A7B89A]/20
              bg-white
              text-[#718083]
              transition-colors

              hover:bg-[#F6F6F2]
              hover:text-[#0F3D4A]

              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowUp
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
            />
          </button>

          <button
            type="button"
            disabled={isLast}
            onClick={() =>
              onMoveDown?.(faq.id)
            }
            aria-label="Mover pregunta hacia abajo"
            title="Mover hacia abajo"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-[9px]
              border
              border-[#A7B89A]/20
              bg-white
              text-[#718083]
              transition-colors

              hover:bg-[#F6F6F2]
              hover:text-[#0F3D4A]

              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowDown
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* ACCIONES */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={() =>
              onToggleActive(faq.id)
            }
            className="
              inline-flex
              min-h-8
              items-center
              justify-center
              gap-1.5
              rounded-[9px]
              border
              border-[#A7B89A]/20
              bg-white
              px-3
              text-[8px]
              font-semibold
              text-[#657175]
              transition-colors

              hover:bg-[#F6F6F2]
            "
          >
            {faq.active ? (
              <EyeOff
                className="h-3 w-3"
                strokeWidth={1.5}
              />
            ) : (
              <Eye
                className="h-3 w-3"
                strokeWidth={1.5}
              />
            )}

            {faq.active
              ? 'Ocultar'
              : 'Mostrar'}
          </button>

          <button
            type="button"
            onClick={() =>
              onEdit(faq)
            }
            className="
              inline-flex
              min-h-8
              min-w-[86px]
              items-center
              justify-center
              gap-1.5
              rounded-[9px]
              bg-[#0F3D4A]
              px-3
              text-[8px]
              font-semibold
              text-white
              transition-colors

              hover:bg-[#174F5D]
            "
          >
            <Edit3
              className="
                h-3
                w-3
                text-[#D8BD66]
              "
              strokeWidth={1.5}
            />

            Editar
          </button>
        </div>
      </div>
    </article>
  );
}