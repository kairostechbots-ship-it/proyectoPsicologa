'use client';

import {
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
  ArrowRight,
} from 'lucide-react';

import type { CalendarEvent } from '@/types/calendar';

interface UpcomingAppointmentsProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
}

function formatDate(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
    .format(date)
    .replace('.', '');
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function UpcomingAppointments({
  events,
  onSelectEvent,
}: UpcomingAppointmentsProps) {
  const upcomingEvents = [...events]
    .filter((event) => new Date(event.end).getTime() >= Date.now())
    .sort(
      (a, b) =>
        new Date(a.start).getTime() -
        new Date(b.start).getTime()
    )
    .slice(0, 5);

  return (
    <aside
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_30px_rgba(15,61,74,0.025)]
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-[#A7B89A]/15
          px-5
          py-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#0F3D4A]
              text-[#D8BD66]
            "
          >
            <CalendarDays
              className="h-[18px] w-[18px]"
              strokeWidth={1.5}
            />
          </div>

          <div>
            <h2
              className="
                text-[13px]
                font-semibold
                text-[#435D61]
              "
            >
              Próximas citas
            </h2>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[#8A9691]
              "
            >
              Eventos próximos en tu agenda
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}

      <div className="p-4">
        {upcomingEvents.length === 0 ? (
          <div
            className="
              flex
              min-h-[260px]
              flex-col
              items-center
              justify-center
              px-4
              text-center
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#A7B89A]/10
                text-[#52665A]
              "
            >
              <CalendarDays
                className="h-5 w-5"
                strokeWidth={1.5}
              />
            </div>

            <p
              className="
                mt-4
                font-serif
                text-[18px]
                text-[#0F3D4A]
              "
            >
              Sin próximas citas
            </p>

            <p
              className="
                mt-2
                max-w-[240px]
                text-[10px]
                leading-5
                text-[#8A9691]
              "
            >
              Cuando existan eventos próximos en la agenda,
              aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onSelectEvent?.(event)}
                className="
                  group
                  w-full
                  rounded-[16px]
                  border
                  border-transparent
                  px-3
                  py-3.5
                  text-left

                  transition-all
                  duration-200

                  hover:border-[#A7B89A]/20
                  hover:bg-[#F8F8F4]
                "
              >
                {/* Fecha */}

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#B08B28]
                  "
                >
                  {formatDate(event.start)}
                </p>

                {/* Título */}

                <div
                  className="
                    mt-2
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <p
                    className="
                      text-[12px]
                      font-semibold
                      leading-5
                      text-[#435D61]
                    "
                  >
                    {event.title}
                  </p>

                  <ArrowRight
                    className="
                      mt-0.5
                      h-3.5
                      w-3.5
                      shrink-0
                      text-[#A7B89A]

                      transition-transform

                      group-hover:translate-x-0.5
                    "
                    strokeWidth={1.5}
                  />
                </div>

                {/* Hora */}

                <div
                  className="
                    mt-2.5
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-[#7A8783]
                    "
                  >
                    <Clock3
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />

                    {formatTime(event.start)}
                    {' – '}
                    {formatTime(event.end)}
                  </span>

                  {event.type === 'online' && (
                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        text-[#7A8783]
                      "
                    >
                      <Monitor
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                      />

                      En línea
                    </span>
                  )}

                  {event.type === 'presencial' && (
                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        text-[#7A8783]
                      "
                    >
                      <MapPin
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                      />

                      Presencial
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Integración */}

      <div
        className="
          border-t
          border-[#A7B89A]/15
          bg-[#FAFAF7]
          px-5
          py-3.5
        "
      >
        <p
          className="
            text-[9px]
            leading-4
            text-[#929D98]
          "
        >
          La información de esta sección será obtenida desde
          Google Calendar cuando la integración esté disponible.
        </p>
      </div>
    </aside>
  );
}