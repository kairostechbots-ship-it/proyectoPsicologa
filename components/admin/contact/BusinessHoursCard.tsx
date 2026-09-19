'use client';

import {
  Clock3,
  RotateCcw,
  Save,
} from 'lucide-react';

import type { BusinessHours } from '@/types/contact';

interface BusinessHoursCardProps {
  hours: BusinessHours[];
  onChange: (hours: BusinessHours[]) => void;
  onSave: () => void;
  onReset?: () => void;
}

export function BusinessHoursCard({
  hours,
  onChange,
  onSave,
  onReset,
}: BusinessHoursCardProps) {
  const sortedHours = [...hours].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  /* =========================================================
     ACTIVAR / DESACTIVAR DÍA
  ========================================================= */

  const toggleDay = (id: number) => {
    const updated = hours.map((item) => {
      if (item.id !== id) return item;

      const enabled = !item.enabled;

      return {
        ...item,
        enabled,

        /*
         * Si se activa un día que no tiene horario,
         * colocamos el horario habitual como valor inicial.
         */
        startTime:
          enabled && !item.startTime
            ? '16:00'
            : item.startTime,

        endTime:
          enabled && !item.endTime
            ? '21:00'
            : item.endTime,
      };
    });

    onChange(updated);
  };

  /* =========================================================
     CAMBIAR HORA
  ========================================================= */

  const updateTime = (
    id: number,
    field: 'startTime' | 'endTime',
    value: string,
  ) => {
    const updated = hours.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
          }
        : item,
    );

    onChange(updated);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_35px_rgba(15,61,74,0.025)]
      "
    >
      {/* HEADER */}

      <header
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#A7B89A]/15
          px-5
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#EEF2EC]
              text-[#597060]
            "
          >
            <Clock3
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </span>

          <div>
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#B08B28]
              "
            >
              Disponibilidad habitual
            </p>

            <h2
              className="
                mt-0.5
                font-serif
                text-[19px]
                font-medium
                text-[#0F3D4A]
              "
            >
              Horarios de atención
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                leading-4
                text-[#8A9691]
              "
            >
              Activa los días de atención y establece
              el horario habitual de cada uno.
            </p>
          </div>
        </div>
      </header>

      {/* HORARIOS */}

      <div className="p-4 sm:p-5">
        <div
          className="
            overflow-hidden
            rounded-[14px]
            border
            border-[#A7B89A]/15
          "
        >
          {sortedHours.map((item, index) => (
            <div
              key={item.id}
              className={`
                grid
                gap-3
                bg-white
                px-4
                py-3.5

                sm:grid-cols-[130px_90px_1fr]
                sm:items-center

                ${
                  index !== sortedHours.length - 1
                    ? 'border-b border-[#A7B89A]/15'
                    : ''
                }
              `}
            >
              {/* DÍA */}

              <div>
                <p
                  className={`
                    text-[10px]
                    font-semibold

                    ${
                      item.enabled
                        ? 'text-[#314E53]'
                        : 'text-[#A1ABA6]'
                    }
                  `}
                >
                  {item.day}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7px]
                    text-[#9AA5A0]
                    sm:hidden
                  "
                >
                  {item.enabled
                    ? 'Día de atención'
                    : 'Sin atención'}
                </p>
              </div>

              {/* SWITCH */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <button
                  type="button"
                  role="switch"
                  aria-checked={item.enabled}
                  aria-label={`${
                    item.enabled
                      ? 'Desactivar'
                      : 'Activar'
                  } ${item.day}`}
                  onClick={() =>
                    toggleDay(item.id)
                  }
                  className={`
                    relative
                    h-6
                    w-11
                    shrink-0
                    rounded-full
                    transition-colors

                    ${
                      item.enabled
                        ? 'bg-[#0F3D4A]'
                        : 'bg-[#D8DDD8]'
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all

                      ${
                        item.enabled
                          ? 'left-6'
                          : 'left-1'
                      }
                    `}
                  />
                </button>

                <span
                  className={`
                    hidden
                    text-[7px]
                    font-medium
                    sm:inline

                    ${
                      item.enabled
                        ? 'text-[#60756A]'
                        : 'text-[#A1ABA6]'
                    }
                  `}
                >
                  {item.enabled
                    ? 'Abierto'
                    : 'Cerrado'}
                </span>
              </div>

              {/* HORARIO */}

              <div>
                {item.enabled ? (
                  <div
                    className="
                      flex
                      flex-col
                      gap-2

                      xs:flex-row
                      xs:items-center

                      sm:justify-end
                    "
                  >
                    <TimeField
                      label="Desde"
                      value={item.startTime}
                      onChange={(value) =>
                        updateTime(
                          item.id,
                          'startTime',
                          value,
                        )
                      }
                    />

                    <span
                      className="
                        hidden
                        text-[8px]
                        text-[#A2ACA7]
                        xs:block
                      "
                    >
                      —
                    </span>

                    <TimeField
                      label="Hasta"
                      value={item.endTime}
                      onChange={(value) =>
                        updateTime(
                          item.id,
                          'endTime',
                          value,
                        )
                      }
                    />
                  </div>
                ) : (
                  <p
                    className="
                      text-[8px]
                      text-[#A1ABA6]

                      sm:text-right
                    "
                  >
                    Sin atención
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* NOTA */}

        <div
          className="
            mt-4
            rounded-[11px]
            border
            border-[#D4AF37]/15
            bg-[#FBF9F2]
            px-4
            py-3
          "
        >
          <p
            className="
              text-[7px]
              leading-4
              text-[#8A7C54]
            "
          >
            Estos horarios representan la atención
            habitual del consultorio. La disponibilidad
            de una cita específica se consulta por
            WhatsApp.
          </p>
        </div>

        {/* ACCIONES */}

        <div
          className="
            mt-5
            flex
            flex-col-reverse
            gap-2

            sm:flex-row
            sm:justify-end
          "
        >
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex
                min-h-9
                items-center
                justify-center
                gap-2
                rounded-[10px]
                border
                border-[#A7B89A]/25
                bg-white
                px-4
                text-[8px]
                font-semibold
                text-[#5E7072]
                transition-colors

                hover:bg-[#F6F6F2]
              "
            >
              <RotateCcw
                className="h-3.5 w-3.5"
                strokeWidth={1.5}
              />

              Descartar cambios
            </button>
          )}

          <button
            type="button"
            onClick={onSave}
            className="
              inline-flex
              min-h-9
              items-center
              justify-center
              gap-2
              rounded-[10px]
              bg-[#0F3D4A]
              px-4
              text-[8px]
              font-semibold
              text-white
              transition-colors

              hover:bg-[#174F5D]
            "
          >
            <Save
              className="
                h-3.5
                w-3.5
                text-[#D8BD66]
              "
              strokeWidth={1.5}
            />

            Guardar horarios
          </button>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INPUT DE HORA
========================================================= */

interface TimeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function TimeField({
  label,
  value,
  onChange,
}: TimeFieldProps) {
  return (
    <label
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          w-8
          text-[7px]
          font-medium
          text-[#929E99]

          xs:hidden
        "
      >
        {label}
      </span>

      <input
        type="time"
        required
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-9
          min-w-[120px]
          rounded-[9px]
          border
          border-[#A7B89A]/25
          bg-[#FBFAF7]
          px-3
          text-[9px]
          font-medium
          text-[#435D61]
          outline-none
          transition-colors

          focus:border-[#0F3D4A]/40
          focus:bg-white
          focus:ring-2
          focus:ring-[#0F3D4A]/5
        "
      />
    </label>
  );
}