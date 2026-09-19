'use client';

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
} from 'lucide-react';

interface ProfileItemCardProps {
  title: string;
  subtitle?: string;
  active: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onEdit: () => void;
  onToggle: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function ProfileItemCard({
  title,
  subtitle,
  active,
  isFirst = false,
  isLast = false,
  onEdit,
  onToggle,
  onMoveUp,
  onMoveDown,
}: ProfileItemCardProps) {
  return (
    <article
      className={`
        rounded-[14px]
        border
        bg-white
        p-4
        transition-all

        ${
          active
            ? 'border-[#A7B89A]/20'
            : 'border-[#A7B89A]/15 opacity-65'
        }
      `}
    >
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* INFORMACIÓN */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className="
                font-serif
                text-[16px]
                font-medium
                leading-5
                text-[#0F3D4A]
              "
            >
              {title}
            </h3>

            <span
              className={`
                rounded-full
                px-2
                py-1
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.1em]

                ${
                  active
                    ? 'bg-[#EDF3EC] text-[#597060]'
                    : 'bg-[#F1F1EE] text-[#929B97]'
                }
              `}
            >
              {active ? 'Visible' : 'Oculto'}
            </span>
          </div>

          {subtitle && (
            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#82918B]
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* ACCIONES */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
          "
        >
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst || !onMoveUp}
            aria-label="Mover arriba"
            title="Mover arriba"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#A7B89A]/20
              text-[#718083]
              transition-colors

              hover:bg-[#F6F7F3]
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
            onClick={onMoveDown}
            disabled={isLast || !onMoveDown}
            aria-label="Mover abajo"
            title="Mover abajo"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#A7B89A]/20
              text-[#718083]
              transition-colors

              hover:bg-[#F6F7F3]
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

          <button
            type="button"
            onClick={onToggle}
            aria-label={
              active
                ? 'Ocultar elemento'
                : 'Mostrar elemento'
            }
            title={
              active
                ? 'Ocultar'
                : 'Mostrar'
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#A7B89A]/20
              text-[#718083]
              transition-colors

              hover:bg-[#F6F7F3]
              hover:text-[#0F3D4A]
            "
          >
            {active ? (
              <Eye
                className="h-3.5 w-3.5"
                strokeWidth={1.5}
              />
            ) : (
              <EyeOff
                className="h-3.5 w-3.5"
                strokeWidth={1.5}
              />
            )}
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="
              ml-1
              inline-flex
              min-h-8
              min-w-[82px]
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
            <Pencil
              className="h-3 w-3"
              strokeWidth={1.5}
            />

            Editar
          </button>
        </div>
      </div>
    </article>
  );
}