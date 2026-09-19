'use client';

import {
  Baby,
  Brain,
  Edit3,
  Eye,
  EyeOff,
  Monitor,
  Sparkles,
  Users,
} from 'lucide-react';

import type { Service } from '@/types/psychotherapy';

interface PsychotherapyServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onToggleActive: (service: Service) => void;
}

/* =========================================================
   ICONO DEL SERVICIO
========================================================= */

function ServiceIcon({
  icon,
}: {
  icon: string;
}) {
  const className = 'h-5 w-5';

  switch (icon) {
    case 'child':
      return (
        <Baby
          className={className}
          strokeWidth={1.5}
        />
      );

    case 'sparkles':
      return (
        <Sparkles
          className={className}
          strokeWidth={1.5}
        />
      );

    case 'brain':
      return (
        <Brain
          className={className}
          strokeWidth={1.5}
        />
      );

    case 'users':
      return (
        <Users
          className={className}
          strokeWidth={1.5}
        />
      );

    default:
      return (
        <Brain
          className={className}
          strokeWidth={1.5}
        />
      );
  }
}

/* =========================================================
   CARD
========================================================= */

export function PsychotherapyServiceCard({
  service,
  onEdit,
  onToggleActive,
}: PsychotherapyServiceCardProps) {
  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(15,61,74,0.025)]
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-[0_14px_35px_rgba(15,61,74,0.06)]

        ${
          service.activo
            ? 'border-[#A7B89A]/20'
            : 'border-[#A7B89A]/10 opacity-70'
        }
      `}
    >
      {/* =====================================================
          CABECERA
      ====================================================== */}

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
            min-w-0
            items-start
            gap-3
          "
        >
          {/* Icono */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[14px]
              bg-[#A7B89A]/10
              text-[#52665A]
            "
          >
            <ServiceIcon icon={service.icono} />
          </div>

          {/* Nombre */}

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#B08B28]
              "
            >
              Psicoterapia
            </p>

            <h3
              className="
                mt-1
                font-serif
                text-[21px]
                font-medium
                leading-tight
                text-[#0F3D4A]
              "
            >
              {service.nombre}
            </h3>
          </div>
        </div>

        {/* Estado */}

        <div
          className={`
            flex
            shrink-0
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1.5
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.1em]

            ${
              service.activo
                ? 'bg-[#A7B89A]/12 text-[#52665A]'
                : 'bg-[#E8E8E4] text-[#8A9691]'
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full

              ${
                service.activo
                  ? 'bg-[#6F8A65]'
                  : 'bg-[#A0AAA5]'
              }
            `}
          />

          {service.activo
            ? 'Activo'
            : 'Inactivo'}
        </div>
      </div>

      {/* =====================================================
          DESCRIPCIÓN
      ====================================================== */}

      <p
        className="
          mt-5
          min-h-[60px]
          text-[11px]
          leading-5
          text-[#718083]
        "
      >
        {service.descripcion}
      </p>

      {/* =====================================================
          INFORMACIÓN DEL SERVICIO
      ====================================================== */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-2
        "
      >
        {/* Precio */}

        <span
          className="
            rounded-full
            bg-[#F6F6F2]
            px-3
            py-1.5
            text-[9px]
            font-semibold
            text-[#435D61]
          "
        >
          {service.precio !== undefined
            ? `$${service.precio.toLocaleString(
                'es-MX',
              )} MXN`
            : 'Precio no definido'}
        </span>

        {/* Duración */}

        {service.duracion && (
          <span
            className="
              rounded-full
              bg-[#F6F6F2]
              px-3
              py-1.5
              text-[9px]
              font-medium
              text-[#718083]
            "
          >
            {service.duracion}
          </span>
        )}

        {/* Modalidad */}

        {service.modalidad && (
          <span
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              bg-[#F6F6F2]
              px-3
              py-1.5
              text-[9px]
              font-medium
              text-[#718083]
            "
          >
            <Monitor
              className="h-3 w-3"
              strokeWidth={1.5}
            />

            {service.modalidad}
          </span>
        )}
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

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
        {/* Orden */}

        <p
          className="
            text-[9px]
            text-[#9AA49F]
          "
        >
          Orden de aparición:{' '}

          <span className="font-semibold">
            {service.orden}
          </span>
        </p>

        {/* Acciones */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {/* Activar / desactivar */}

          <button
            type="button"
            onClick={() =>
              onToggleActive(service)
            }
            title={
              service.activo
                ? 'Ocultar del sitio'
                : 'Mostrar en el sitio'
            }
            aria-label={
              service.activo
                ? `Ocultar ${service.nombre}`
                : `Mostrar ${service.nombre}`
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#A7B89A]/20
              text-[#718083]
              transition-colors

              hover:bg-[#F6F6F2]
              hover:text-[#0F3D4A]
            "
          >
            {service.activo ? (
              <Eye
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            ) : (
              <EyeOff
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            )}
          </button>

          {/* Editar */}

          <button
            type="button"
            onClick={() =>
              onEdit(service)
            }
            className="
              inline-flex
              min-h-9
              items-center
              gap-2
              rounded-xl
              bg-[#0F3D4A]
              px-4
              text-[10px]
              font-semibold
              text-white
              transition-colors

              hover:bg-[#174F5D]
            "
          >
            <Edit3
              className="
                h-3.5
                w-3.5
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