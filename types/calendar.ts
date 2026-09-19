// types/calendar.ts

/**
 * Evento normalizado que utilizará el frontend.
 *
 * La integración con Google Calendar deberá transformar
 * los eventos recibidos a esta estructura.
 */
export interface CalendarEvent {
  /**
   * Identificador interno del evento.
   */
  id: string;

  /**
   * Identificador original del evento en Google Calendar.
   * Será útil cuando se realice la integración.
   */
  calendarEventId?: string;

  /**
   * Título que aparecerá en la agenda.
   */
  title: string;

  /**
   * Fecha y hora de inicio en formato ISO.
   *
   * Ejemplo:
   * 2026-09-18T16:00:00-06:00
   */
  start: string;

  /**
   * Fecha y hora de finalización en formato ISO.
   */
  end: string;

  /**
   * Tipo general de cita/evento.
   */
  type?: CalendarEventType;

  /**
   * Ubicación del evento cuando exista.
   */
  location?: string;

  /**
   * Descripción general proveniente del calendario.
   *
   * No debe utilizarse para almacenar información clínica.
   */
  description?: string;

  /**
   * Enlace para una reunión virtual cuando Google Calendar
   * proporcione uno.
   */
  meetingUrl?: string;

  /**
   * Indica si el evento dura todo el día.
   */
  allDay?: boolean;
}

/**
 * Tipos de evento utilizados únicamente para presentación
 * dentro del panel administrativo.
 */
export type CalendarEventType =
  | 'presencial'
  | 'online'
  | 'otro';