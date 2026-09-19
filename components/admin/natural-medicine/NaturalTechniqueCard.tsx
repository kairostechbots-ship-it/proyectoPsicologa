'use client';

import {
  Activity,
  CircleDot,
  Edit3,
  Eye,
  EyeOff,
  Flower2,
  Footprints,
  Leaf,
  Sparkles,
  Star,
} from 'lucide-react';

import type { NaturalTechnique } from '@/types/natural-medicine';

interface NaturalTechniqueCardProps {
  technique: NaturalTechnique;
  onEdit: (technique: NaturalTechnique) => void;
  onToggleActive: (id: number) => void;
}

const iconMap: Record<
  string,
  React.ElementType
> = {
  biomagnetismo: CircleDot,
  acupuntura: Sparkles,
  fitoterapia: Leaf,
  auriculoterapia: Activity,
  'flores-de-bach': Flower2,
  naturismo: Leaf,
  'desintoxicacion-organica': Sparkles,
  'nutricion-funcional': Leaf,
  'reflexologia-podal': Footprints,
};

export function NaturalTechniqueCard({
  technique,
  onEdit,
  onToggleActive,
}: NaturalTechniqueCardProps) {
  const Icon =
    iconMap[technique.slug] ?? Leaf;

  return (
    <article
      className="
        relative
        flex
        h-full
        flex-col
        rounded-[20px]
        border
        border-[#A7B89A]/20
        bg-white
        p-5
        shadow-[0_8px_28px_rgba(15,61,74,0.035)]
      "
    >
      {/* ===============================================
          CABECERA
      ================================================ */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-[12px]
            bg-[#EEF2EC]
            text-[#52665A]
          "
        >
          <Icon
            className="h-[18px] w-[18px]"
            strokeWidth={1.5}
          />
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-end
            gap-1.5
          "
        >
          {technique.featured && (
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-[#D4AF37]/10
                px-2.5
                py-1
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-[#A07D20]
              "
            >
              <Star
                className="h-2.5 w-2.5"
                strokeWidth={1.6}
              />

              Destacada
            </span>
          )}

          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-2.5
              py-1
              text-[7px]
              font-semibold

              ${
                technique.active
                  ? 'bg-[#A7B89A]/15 text-[#52665A]'
                  : 'bg-[#F2F1EC] text-[#8A9691]'
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full

                ${
                  technique.active
                    ? 'bg-[#7D9870]'
                    : 'bg-[#A8B0AC]'
                }
              `}
            />

            {technique.active
              ? 'Visible'
              : 'Oculta'}
          </span>
        </div>
      </div>

      {/* ===============================================
          CONTENIDO
      ================================================ */}

      <div className="mt-5 flex flex-1 flex-col">
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#B08B28]
          "
        >
          Técnica {String(
            technique.displayOrder,
          ).padStart(2, '0')}
        </p>

        <h3
          className="
            mt-2
            font-serif
            text-[23px]
            font-medium
            leading-tight
            text-[#0F3D4A]
          "
        >
          {technique.name}
        </h3>

        <p
          className="
            mt-2.5
            line-clamp-3
            text-[10px]
            leading-5
            text-[#718083]
          "
        >
          {technique.shortDescription}
        </p>

        {/* BENEFICIOS */}

        {technique.benefits &&
          technique.benefits.length > 0 && (
            <p
              className="
                mt-4
                text-[8px]
                font-medium
                text-[#8A9691]
              "
            >
              {technique.benefits.length}{' '}
              {technique.benefits.length === 1
                ? 'beneficio registrado'
                : 'beneficios registrados'}
            </p>
          )}

        {/* ===============================================
            ACCIONES
        ================================================ */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[#A7B89A]/15
            pt-4
          "
        >
          <button
            type="button"
            onClick={() =>
              onToggleActive(technique.id)
            }
            className="
              inline-flex
              h-9
              items-center
              gap-2
              rounded-[10px]
              border
              border-[#A7B89A]/20
              bg-[#FBFAF7]
              px-3
              text-[8px]
              font-semibold
              text-[#657175]
              transition-colors

              hover:bg-[#F2F1EC]
              hover:text-[#0F3D4A]
            "
          >
            {technique.active ? (
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

            {technique.active
              ? 'Ocultar'
              : 'Mostrar'}
          </button>

          <button
            type="button"
            onClick={() =>
              onEdit(technique)
            }
            className="
              inline-flex
              h-9
              min-w-[92px]
              items-center
              justify-center
              gap-2
              rounded-[10px]
              bg-[#0F3D4A]
              px-4
              text-[8px]
              font-semibold
              text-white
              transition-all

              hover:bg-[#174F5D]
            "
          >
            <Edit3
              className="
                h-3.5
                w-3.5
                text-[#D8BD66]
              "
              strokeWidth={1.6}
            />

            Editar
          </button>
        </div>
      </div>
    </article>
  );
}