'use client';

import { useState } from 'react';
import {
  CalendarDays,
  Cloud,
} from 'lucide-react';

import { AdminCalendar } from '@/components/admin/agenda/AdminCalendar';
import { AppointmentDetail } from '@/components/admin/agenda/AppointmentDetail';
import { UpcomingAppointments } from '@/components/admin/agenda/UpcomingAppointments';

import { useCalendar } from '@/hooks/use-calendar';
import type { CalendarEvent } from '@/types/calendar';

export default function AgendaPage() {
  /*
   * =========================================================
   * FUENTE DE EVENTOS
   * =========================================================
   *
   * Actualmente utilizamos información mock únicamente
   * para desarrollar y probar el frontend.
   *
   * INTEGRACIÓN FUTURA:
   *
   * Esta fuente deberá sustituirse por los eventos obtenidos
   * desde el backend conectado con Google Calendar.
   *
   * La integración deberá entregar:
   *
   * CalendarEvent[]
   *
   * De esta manera los componentes visuales de la agenda
   * no necesitarán modificarse.
   */

  const events: CalendarEvent[] = useCalendar();

  /*
   * Evento seleccionado.
   *
   * Se utiliza para mostrar AppointmentDetail.
   */
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  return (
    <>
      <div className="pb-10">

        {/* =====================================================
            ENCABEZADO DE LA SECCIÓN
        ====================================================== */}

        <section
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Información */}

          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <CalendarDays
                aria-hidden="true"
                className="
                  h-3.5
                  w-3.5
                  text-[#B08B28]
                "
                strokeWidth={1.5}
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#B08B28]
                "
              >
                Agenda personal
              </p>
            </div>

            <p
              className="
                mt-2
                max-w-2xl
                text-[12px]
                leading-5
                text-[#718083]
              "
            >
              Consulta y revisa tus próximas citas y eventos.
            </p>
          </div>

          {/* =================================================
              ESTADO GOOGLE CALENDAR
          ================================================== */}

          <div
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2.5
              rounded-full
              border
              border-[#D4AF37]/20
              bg-[#D4AF37]/[0.05]
              px-4
              py-2.5
            "
          >
            <Cloud
              aria-hidden="true"
              className="
                h-3.5
                w-3.5
                text-[#9A7A28]
              "
              strokeWidth={1.5}
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#B08B28]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                text-[#806A32]
              "
            >
              Agenda del consultorio
            </span>
          </div>
        </section>

        {/* =====================================================
            CALENDARIO + PRÓXIMAS CITAS
        ====================================================== */}

        <section
          className="
            mt-6
            grid
            grid-cols-1
            gap-5

            xl:grid-cols-[minmax(0,1fr)_320px]
          "
        >
          {/* Calendario */}

          <AdminCalendar
            events={events}
            onSelectEvent={setSelectedEvent}
          />

          {/* Próximas citas */}

          <UpcomingAppointments
            events={events}
            onSelectEvent={setSelectedEvent}
          />
        </section>

        {/* =====================================================
            INDICADOR TEMPORAL DE DESARROLLO
        ====================================================== */}

        <div
          className="
            mt-3
            flex
            justify-end
          "
        >
          <span
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-[#A0AAA5]
            "
          >
            Datos de demostración
          </span>
        </div>
      </div>

      {/* =====================================================
          DETALLE DE CITA
      ====================================================== */}

      <AppointmentDetail
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}