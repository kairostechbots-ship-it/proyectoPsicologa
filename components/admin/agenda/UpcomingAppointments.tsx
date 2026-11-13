'use client';

import { CalendarDays, Clock3, MapPin, Monitor, ArrowRight } from 'lucide-react';
import type { CalendarEvent } from '@/types/calendar';

interface Props {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
}
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08B28] focus-visible:ring-offset-2';
function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(value)).replace(/\./g, '');
}
function formatTime(value: string) {
  return new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}
export function UpcomingAppointments({ events, onSelectEvent }: Props) {
  const now = Date.now();
  const upcoming = [...events]
    .filter(event => new Date(event.end).getTime() >= now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  return (
    <aside className="flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E1E7DF] bg-white shadow-[0_12px_36px_rgba(15,61,74,0.035)]" aria-label="Próximos eventos">
      <div className="flex items-center gap-3 border-b border-[#E9EDE7] px-5 py-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F3D4A] text-[#D8BD66]"><CalendarDays className="h-5 w-5" /></div>
        <div><h2 className="text-base font-semibold text-[#0F3D4A]">Próximos eventos</h2><p className="mt-1 text-xs text-[#64756E]">Los siguientes en tu agenda</p></div>
      </div>
      {upcoming.length === 0 ? (
        <div className="flex min-h-[230px] flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2EA] text-[#52665A]"><CalendarDays className="h-6 w-6" /></div>
          <p className="mt-4 font-serif text-xl text-[#0F3D4A]">Sin eventos próximos</p>
          <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#64756E]">Cuando haya eventos en la fuente mostrada, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-2 p-3">
          {upcoming.map(event => (
            <button key={event.id} type="button" onClick={() => onSelectEvent?.(event)} disabled={!onSelectEvent} className={`group w-full rounded-xl border border-transparent p-3.5 text-left transition-colors hover:border-[#DCE5D8] hover:bg-[#F7F8F4] disabled:cursor-default ${focus}`}>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#987625]">{formatDate(event.start)}</p>
              <div className="mt-2 flex items-start justify-between gap-2"><p className="text-sm font-semibold leading-5 text-[#0F3D4A]">{event.title}</p><ArrowRight className="h-4 w-4 shrink-0 text-[#738B81] transition-transform group-hover:translate-x-1" /></div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#64756E]">
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{event.allDay ? 'Todo el día' : `${formatTime(event.start)} – ${formatTime(event.end)}`}</span>
                {event.type === 'online' && <span className="inline-flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5" />En línea</span>}
                {event.type === 'presencial' && <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />Presencial</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
