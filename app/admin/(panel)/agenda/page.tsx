'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CalendarDays,
  Check,
  Cloud,
  Loader2,
  Unplug,
} from 'lucide-react';

import { AdminCalendar } from '@/components/admin/agenda/AdminCalendar';
import { AppointmentDetail } from '@/components/admin/agenda/AppointmentDetail';
import { UpcomingAppointments } from '@/components/admin/agenda/UpcomingAppointments';

import { useCalendar } from '@/hooks/use-calendar';
import type { CalendarEvent } from '@/types/calendar';

interface GoogleCalendarStatus {
  connected: boolean;
  googleEmail: string | null;
  connectedAt: string | null;
}

export default function AgendaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * =========================================================
   * FUENTE DE EVENTOS
   * =========================================================
   *
   * Por ahora mantenemos useCalendar().
   *
   * Primero vamos a comprobar que OAuth con Google Calendar
   * funcione correctamente.
   *
   * Después sustituiremos esta fuente por las citas reales
   * obtenidas desde nuestro backend.
   */

  const events: CalendarEvent[] = useCalendar();

  /*
   * =========================================================
   * EVENTO SELECCIONADO
   * =========================================================
   */

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  /*
   * =========================================================
   * GOOGLE CALENDAR
   * =========================================================
   */

  const [googleStatus, setGoogleStatus] =
    useState<GoogleCalendarStatus>({
      connected: false,
      googleEmail: null,
      connectedAt: null,
    });

  const [loadingGoogleStatus, setLoadingGoogleStatus] =
    useState(true);

  const [connectingGoogle, setConnectingGoogle] =
    useState(false);

  const [disconnectingGoogle, setDisconnectingGoogle] =
    useState(false);

  const [googleMessage, setGoogleMessage] =
    useState<string | null>(null);

  /*
   * =========================================================
   * CONSULTAR ESTADO DE GOOGLE CALENDAR
   * =========================================================
   */

  const loadGoogleStatus = async () => {
    try {
      setLoadingGoogleStatus(true);

      const response = await fetch(
        '/api/admin/google-calendar/status',
        {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
        },
      );

      if (!response.ok) {
        throw new Error(
          'No se pudo consultar Google Calendar.',
        );
      }

      const data =
        (await response.json()) as GoogleCalendarStatus;

      setGoogleStatus(data);
    } catch (error) {
      console.error(
        'Error consultando Google Calendar:',
        error,
      );

      setGoogleStatus({
        connected: false,
        googleEmail: null,
        connectedAt: null,
      });
    } finally {
      setLoadingGoogleStatus(false);
    }
  };

  useEffect(() => {
    void loadGoogleStatus();
  }, []);

  /*
   * =========================================================
   * RESULTADO DEL CALLBACK OAUTH
   * =========================================================
   */

  useEffect(() => {
    const result = searchParams.get('googleCalendar');

    if (!result) {
      return;
    }

    if (result === 'connected') {
      setGoogleMessage(
        'Google Calendar se conectó correctamente.',
      );

      void loadGoogleStatus();
    }

    if (result === 'error') {
      setGoogleMessage(
        'No se pudo conectar Google Calendar.',
      );
    }

    if (result === 'invalid_state') {
      setGoogleMessage(
        'La autorización de Google no pudo validarse. Intenta nuevamente.',
      );
    }

    if (result === 'missing_refresh_token') {
      setGoogleMessage(
        'Google no devolvió el permiso necesario para mantener la conexión.',
      );
    }

    /*
     * Limpiamos el parámetro para evitar que el mensaje
     * vuelva a aparecer al refrescar la página.
     */

    router.replace('/admin/agenda', {
      scroll: false,
    });
  }, [searchParams, router]);

  /*
   * =========================================================
   * CONECTAR GOOGLE CALENDAR
   * =========================================================
   */

  const handleConnectGoogle = async () => {
    try {
      setConnectingGoogle(true);
      setGoogleMessage(null);

      const response = await fetch(
        '/api/admin/google-calendar/connect',
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(
          data.error ||
            'No se pudo iniciar la conexión con Google.',
        );
      }

      /*
       * Salimos temporalmente del panel y enviamos al usuario
       * a la pantalla oficial de autorización de Google.
       */
      window.location.href = data.url;
    } catch (error) {
      console.error(
        'Error conectando Google Calendar:',
        error,
      );

      setGoogleMessage(
        'No se pudo iniciar la conexión con Google Calendar.',
      );

      setConnectingGoogle(false);
    }
  };

  /*
   * =========================================================
   * DESCONECTAR GOOGLE CALENDAR
   * =========================================================
   */

  const handleDisconnectGoogle = async () => {
    const confirmed = window.confirm(
      '¿Deseas desconectar Google Calendar del panel?',
    );

    if (!confirmed) {
      return;
    }

    try {
      setDisconnectingGoogle(true);
      setGoogleMessage(null);

      const response = await fetch(
        '/api/admin/google-calendar/disconnect',
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            'No se pudo desconectar Google Calendar.',
        );
      }

      setGoogleStatus({
        connected: false,
        googleEmail: null,
        connectedAt: null,
      });

      setGoogleMessage(
        'Google Calendar fue desconectado.',
      );
    } catch (error) {
      console.error(
        'Error desconectando Google Calendar:',
        error,
      );

      setGoogleMessage(
        'No se pudo desconectar Google Calendar.',
      );
    } finally {
      setDisconnectingGoogle(false);
    }
  };

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
            sm:items-start
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
              GOOGLE CALENDAR
          ================================================== */}

          <div className="flex flex-col items-start gap-2 sm:items-end">
            {loadingGoogleStatus ? (
              <div
                className="
                  inline-flex
                  w-fit
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
                <Loader2
                  aria-hidden="true"
                  className="
                    h-3.5
                    w-3.5
                    animate-spin
                    text-[#9A7A28]
                  "
                  strokeWidth={1.5}
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    text-[#806A32]
                  "
                >
                  Consultando Google Calendar
                </span>
              </div>
            ) : googleStatus.connected ? (
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <div
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-[#7B9A84]/20
                    bg-[#7B9A84]/[0.07]
                    px-4
                    py-2.5
                  "
                >
                  <Cloud
                    aria-hidden="true"
                    className="
                      h-3.5
                      w-3.5
                      text-[#587660]
                    "
                    strokeWidth={1.5}
                  />

                  <span
                    className="
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-[#587660]
                    "
                  >
                    <Check
                      aria-hidden="true"
                      className="h-2.5 w-2.5 text-white"
                      strokeWidth={2}
                    />
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-semibold
                      text-[#4D6654]
                    "
                  >
                    Google Calendar conectado
                  </span>
                </div>

                {googleStatus.googleEmail && (
                  <span
                    className="
                      max-w-[260px]
                      truncate
                      text-[9px]
                      text-[#8A9692]
                    "
                  >
                    {googleStatus.googleEmail}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleDisconnectGoogle}
                  disabled={disconnectingGoogle}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    text-[9px]
                    font-medium
                    text-[#8A9692]
                    transition-colors
                    hover:text-[#0F4A55]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {disconnectingGoogle ? (
                    <Loader2
                      className="h-3 w-3 animate-spin"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Unplug
                      className="h-3 w-3"
                      strokeWidth={1.5}
                    />
                  )}

                  Desconectar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleConnectGoogle}
                disabled={connectingGoogle}
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-[#D4AF37]/20
                  bg-[#D4AF37]/[0.05]
                  px-4
                  py-2.5
                  transition
                  hover:border-[#D4AF37]/35
                  hover:bg-[#D4AF37]/[0.09]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {connectingGoogle ? (
                  <Loader2
                    aria-hidden="true"
                    className="
                      h-3.5
                      w-3.5
                      animate-spin
                      text-[#9A7A28]
                    "
                    strokeWidth={1.5}
                  />
                ) : (
                  <Cloud
                    aria-hidden="true"
                    className="
                      h-3.5
                      w-3.5
                      text-[#9A7A28]
                    "
                    strokeWidth={1.5}
                  />
                )}

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
                  {connectingGoogle
                    ? 'Conectando...'
                    : 'Conectar Google Calendar'}
                </span>
              </button>
            )}
          </div>
        </section>

        {/* =====================================================
            MENSAJE GOOGLE CALENDAR
        ====================================================== */}

        {googleMessage && (
          <div
            className="
              mt-4
              rounded-xl
              border
              border-[#DCE4DF]
              bg-white
              px-4
              py-3
              text-[11px]
              leading-5
              text-[#61706B]
            "
          >
            {googleMessage}
          </div>
        )}

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
          <AdminCalendar
            events={events}
            onSelectEvent={setSelectedEvent}
          />

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