'use client';

import {
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Monitor,
  X,
} from 'lucide-react';

import type { CalendarEvent } from '@/types/calendar';

interface AppointmentDetailProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

export function AppointmentDetail({
  event,
  onClose,
}: AppointmentDetailProps) {
  if (!event) {
    return null;
  }

  const isOnline = event.type === 'online';
  const isPresential = event.type === 'presencial';

  return (
    <>
      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <button
        type="button"
        aria-label="Cerrar detalle de la cita"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[60]
          bg-[#071E24]/35
          backdrop-blur-[2px]
        "
      />

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          z-[70]
          flex
          items-center
          justify-center
          p-4
          pointer-events-none

          sm:p-6
        "
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-detail-title"
          className="
            pointer-events-auto
            relative
            w-full
            max-w-[500px]
            overflow-hidden
            rounded-[24px]
            border
            border-[#A7B89A]/20
            bg-white
            shadow-[0_25px_80px_rgba(15,61,74,0.18)]
          "
        >
          {/* =================================================
              CABECERA
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              bg-[#0F3D4A]
              px-6
              pb-6
              pt-6
              text-white
            "
          >
            {/* Decoración */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-20
                h-48
                w-48
                rounded-full
                border
                border-white/[0.07]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-20
                -left-16
                h-40
                w-40
                rounded-full
                bg-[#A7B89A]/[0.06]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#D8BD66]
                  "
                >
                  Detalle de la cita
                </p>

                <h2
                  id="appointment-detail-title"
                  className="
                    mt-3
                    font-serif
                    text-[27px]
                    font-medium
                    leading-tight
                    text-white
                  "
                >
                  {event.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  text-white/65

                  transition-colors

                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>

          {/* =================================================
              INFORMACIÓN
          ================================================== */}

          <div className="px-6 py-6">
            <div className="space-y-5">
              {/* Fecha */}

              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#A7B89A]/10
                    text-[#52665A]
                  "
                >
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#9A7A28]
                    "
                  >
                    Fecha
                  </p>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      capitalize
                      leading-5
                      text-[#435D61]
                    "
                  >
                    {formatFullDate(event.start)}
                  </p>
                </div>
              </div>

              {/* Horario */}

              {!event.allDay && (
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#A7B89A]/10
                      text-[#52665A]
                    "
                  >
                    <Clock3
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#9A7A28]
                      "
                    >
                      Horario
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        text-[#435D61]
                      "
                    >
                      {formatTime(event.start)} – {formatTime(event.end)}
                    </p>
                  </div>
                </div>
              )}

              {/* Modalidad */}

              {(isOnline || isPresential) && (
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#A7B89A]/10
                      text-[#52665A]
                    "
                  >
                    {isOnline ? (
                      <Monitor
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <MapPin
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#9A7A28]
                      "
                    >
                      Modalidad
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        text-[#435D61]
                      "
                    >
                      {isOnline ? 'En línea' : 'Presencial'}
                    </p>
                  </div>
                </div>
              )}

              {/* Ubicación */}

              {event.location && (
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#A7B89A]/10
                      text-[#52665A]
                    "
                  >
                    <MapPin
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-[#9A7A28]
                      "
                    >
                      Ubicación
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        leading-5
                        text-[#435D61]
                      "
                    >
                      {event.location}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                DESCRIPCIÓN
            ================================================== */}

            {event.description && (
              <div
                className="
                  mt-6
                  border-t
                  border-[#A7B89A]/15
                  pt-5
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#9A7A28]
                  "
                >
                  Información del evento
                </p>

                <p
                  className="
                    mt-2
                    text-[11px]
                    leading-5
                    text-[#718083]
                  "
                >
                  {event.description}
                </p>
              </div>
            )}

            {/* =================================================
                GOOGLE MEET
            ================================================== */}

            {event.meetingUrl && (
              <div
                className="
                  mt-6
                  border-t
                  border-[#A7B89A]/15
                  pt-5
                "
              >
                <a
                  href={event.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0F3D4A]
                    px-5
                    text-[11px]
                    font-semibold
                    text-white

                    transition-all

                    hover:bg-[#174F5D]

                    sm:w-auto
                  "
                >
                  <Monitor
                    aria-hidden="true"
                    className="h-4 w-4 text-[#D8BD66]"
                    strokeWidth={1.5}
                  />

                  Abrir videollamada

                  <ExternalLink
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            )}

            {/* =================================================
                CERRAR
            ================================================== */}

            <div
              className="
                mt-6
                flex
                justify-end
                border-t
                border-[#A7B89A]/15
                pt-5
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  min-h-10
                  rounded-xl
                  border
                  border-[#A7B89A]/25
                  px-5
                  text-[11px]
                  font-semibold
                  text-[#52665A]

                  transition-colors

                  hover:bg-[#F7F6F1]
                  hover:text-[#0F3D4A]
                "
              >
                Cerrar
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}