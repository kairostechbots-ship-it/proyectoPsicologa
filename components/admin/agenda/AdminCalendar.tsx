'use client';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import type { CalendarEvent } from '@/types/calendar';

interface AdminCalendarProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
}

const DAYS = [
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
  'Dom',
];

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function eventDateKey(value: string) {
  const date = new Date(value);

  return dateKey(date);
}

function formatEventTime(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function AdminCalendar({
  events,
  onSelectEvent,
}: AdminCalendarProps) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    dateKey(today)
  );

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Convertimos domingo 0 a domingo 6
    const firstWeekDay = (firstDay.getDay() + 6) % 7;

    const totalCurrentMonthDays = lastDay.getDate();

    const previousMonthLastDay = new Date(
      year,
      month,
      0
    ).getDate();

    const cells: {
      date: Date;
      currentMonth: boolean;
    }[] = [];

    // Días del mes anterior
    for (let i = firstWeekDay - 1; i >= 0; i--) {
      cells.push({
        date: new Date(
          year,
          month - 1,
          previousMonthLastDay - i
        ),
        currentMonth: false,
      });
    }

    // Mes actual
    for (let day = 1; day <= totalCurrentMonthDays; day++) {
      cells.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    // Completar hasta 42 celdas
    let nextMonthDay = 1;

    while (cells.length < 42) {
      cells.push({
        date: new Date(
          year,
          month + 1,
          nextMonthDay++
        ),
        currentMonth: false,
      });
    }

    return cells;
  }, [currentDate]);

  const goPreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(now.getFullYear(), now.getMonth(), 1)
    );

    setSelectedDate(dateKey(now));
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_30px_rgba(15,61,74,0.025)]
      "
    >
      {/* ================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#A7B89A]/15
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between

          lg:px-6
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#B08B28]
            "
          >
            Calendario
          </p>

          <h2
            className="
              mt-1
              font-serif
              text-[25px]
              text-[#0F3D4A]
            "
          >
            {MONTHS[currentDate.getMonth()]}{' '}
            {currentDate.getFullYear()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToday}
            className="
              h-9
              rounded-xl
              border
              border-[#A7B89A]/20
              bg-white
              px-4
              text-[10px]
              font-semibold
              text-[#52665A]

              transition-colors

              hover:bg-[#F7F6F1]
              hover:text-[#0F3D4A]
            "
          >
            Hoy
          </button>

          <button
            type="button"
            onClick={goPreviousMonth}
            aria-label="Mes anterior"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#A7B89A]/20
              text-[#52665A]

              transition-colors

              hover:bg-[#F7F6F1]
            "
          >
            <ChevronLeft
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </button>

          <button
            type="button"
            onClick={goNextMonth}
            aria-label="Mes siguiente"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-[#A7B89A]/20
              text-[#52665A]

              transition-colors

              hover:bg-[#F7F6F1]
            "
          >
            <ChevronRight
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* ================================================
          CALENDARIO
      ================================================= */}

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Días de semana */}

          <div className="grid grid-cols-7">
            {DAYS.map((day) => (
              <div
                key={day}
                className="
                  border-b
                  border-r
                  border-[#A7B89A]/10
                  bg-[#FAFAF7]
                  px-3
                  py-3
                  text-center
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#8A9691]

                  last:border-r-0
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* Días */}

          <div className="grid grid-cols-7">
            {calendarDays.map(
              ({ date, currentMonth }) => {
                const key = dateKey(date);

                const isToday =
                  key === dateKey(today);

                const isSelected =
                  key === selectedDate;

                const dayEvents = events
                  .filter(
                    (event) =>
                      eventDateKey(event.start) === key
                  )
                  .sort(
                    (a, b) =>
                      new Date(a.start).getTime() -
                      new Date(b.start).getTime()
                  );

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      setSelectedDate(key)
                    }
                    className={`
                      relative
                      min-h-[125px]
                      border-b
                      border-r
                      border-[#A7B89A]/10
                      p-2
                      text-left
                      align-top

                      transition-colors

                      hover:bg-[#F8F8F4]

                      ${
                        !currentMonth
                          ? 'bg-[#FBFBF9]'
                          : 'bg-white'
                      }

                      ${
                        isSelected
                          ? 'bg-[#A7B89A]/[0.06]'
                          : ''
                      }
                    `}
                  >
                    {/* Número */}

                    <span
                      className={`
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        text-[10px]
                        font-semibold

                        ${
                          isToday
                            ? `
                                bg-[#0F3D4A]
                                text-white
                              `
                            : currentMonth
                              ? 'text-[#52665A]'
                              : 'text-[#B9C0BC]'
                        }
                      `}
                    >
                      {date.getDate()}
                    </span>

                    {/* Eventos */}

                    <div className="mt-2 space-y-1">
                      {dayEvents
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectEvent?.(event);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key === 'Enter' ||
                                e.key === ' '
                              ) {
                                e.preventDefault();
                                e.stopPropagation();
                                onSelectEvent?.(event);
                              }
                            }}
                            className="
                              truncate
                              rounded-md
                              border
                              border-[#A7B89A]/15
                              bg-[#A7B89A]/10
                              px-2
                              py-1.5
                              text-[9px]
                              font-medium
                              text-[#435D61]

                              transition-colors

                              hover:bg-[#A7B89A]/20
                            "
                          >
                            <span
                              className="
                                mr-1
                                text-[#B08B28]
                              "
                            >
                              {formatEventTime(
                                event.start
                              )}
                            </span>

                            {event.title}
                          </div>
                        ))}

                      {dayEvents.length > 3 && (
                        <p
                          className="
                            px-1
                            pt-1
                            text-[8px]
                            font-semibold
                            text-[#8A9691]
                          "
                        >
                          +{dayEvents.length - 3} más
                        </p>
                      )}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}