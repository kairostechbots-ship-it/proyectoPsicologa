import type { CalendarEvent } from '@/types/calendar';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'demo-1',
    calendarEventId: 'google-demo-1',
    title: 'Consulta presencial',
    start: '2026-09-18T16:00:00-06:00',
    end: '2026-09-18T17:00:00-06:00',
    type: 'presencial',
  },
  {
    id: 'demo-2',
    calendarEventId: 'google-demo-2',
    title: 'Psicoterapia',
    start: '2026-09-18T18:00:00-06:00',
    end: '2026-09-18T19:00:00-06:00',
    type: 'presencial',
  },
  {
    id: 'demo-3',
    calendarEventId: 'google-demo-3',
    title: 'Consulta en línea',
    start: '2026-09-19T17:30:00-06:00',
    end: '2026-09-19T18:30:00-06:00',
    type: 'online',
  },
  {
    id: 'demo-4',
    calendarEventId: 'google-demo-4',
    title: 'Consulta',
    start: '2026-09-22T16:00:00-06:00',
    end: '2026-09-22T17:00:00-06:00',
    type: 'presencial',
  },
];