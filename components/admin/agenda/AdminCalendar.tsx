'use client';

import { ChevronLeft, ChevronRight, CalendarDays, Clock3 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { CalendarEvent } from '@/types/calendar';

interface Props {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
}

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B08B28] focus-visible:ring-offset-2';

function keyFor(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function hour(value: string) {
  return new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export function AdminCalendar({ events, onSelectEvent }: Props) {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selected, setSelected] = useState(() => keyFor(new Date()));
  const todayKey = keyFor(new Date());

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const time = new Date(event.start);
      if (Number.isNaN(time.getTime())) continue;
      const key = keyFor(time);
      map.set(key, [...(map.get(key) ?? []), event]);
    }
    for (const group of map.values()) group.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstOffset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const days = new Date(year, monthIndex + 1, 0).getDate();
    const cellCount = Math.ceil((firstOffset + days) / 7) * 7;
    return Array.from({ length: cellCount }, (_, i) => new Date(year, monthIndex, i - firstOffset + 1));
  }, [month]);

  const selectedEvents = byDay.get(selected) ?? [];
  const selectedDate = new Date(`${selected}T12:00:00`);
  const selectedLabel = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(selectedDate);
  const moveMonth = (offset: number) => setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  const goToday = () => {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelected(keyFor(now));
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-[24px] border border-[#E1E7DF] bg-white shadow-[0_12px_36px_rgba(15,61,74,0.035)]" aria-label="Calendario mensual">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E9EDE7] px-5 py-5 sm:px-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#987625]">Tu calendario</p>
          <h2 className="mt-1 font-serif text-[26px] capitalize text-[#0F3D4A] sm:text-[30px]">{months[month.getMonth()]} {month.getFullYear()}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={goToday} className={`min-h-11 rounded-xl border border-[#DDE5DB] px-4 text-sm font-semibold text-[#0F3D4A] hover:bg-[#F2F5EF] ${focus}`}>Hoy</button>
          <button type="button" aria-label="Mes anterior" onClick={() => moveMonth(-1)} className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDE5DB] text-[#0F3D4A] hover:bg-[#F2F5EF] ${focus}`}><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Mes siguiente" onClick={() => moveMonth(1)} className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDE5DB] text-[#0F3D4A] hover:bg-[#F2F5EF] ${focus}`}><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-[#E9EDE7] bg-[#FBFAF7]">
        {DAYS.map(d => <span key={d} className="py-3 text-center text-[11px] font-semibold text-[#64756E]">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-px bg-[#E9EDE7]">
        {cells.map(date => {
          const key = keyFor(date);
          const count = byDay.get(key)?.length ?? 0;
          const isCurrentMonth = date.getMonth() === month.getMonth();
          const isSelected = key === selected;
          const isToday = key === todayKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSelected(key);
                if (!isCurrentMonth) setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
              }}
              aria-pressed={isSelected}
              aria-label={`${new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)}. ${count} ${count === 1 ? 'evento' : 'eventos'}`}
              className={`relative flex min-h-[68px] flex-col items-center justify-center gap-1 bg-white p-1 transition-colors hover:bg-[#F3F5EF] sm:min-h-[86px] ${focus} ${isSelected ? '!bg-[#E9EEE7]' : ''} ${!isCurrentMonth ? 'opacity-40' : ''}`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${isToday ? 'bg-[#0F3D4A] text-white' : isSelected ? 'bg-[#D4DEC9] text-[#0F3D4A]' : 'text-[#435D61]'}`}>{date.getDate()}</span>
              {count > 0 ? <span className="flex items-center gap-1 text-[10px] font-semibold text-[#0F3D4A]"><span className="h-1.5 w-1.5 rounded-full bg-[#B08B28]" />{count}</span> : <span className="h-[14px]" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div className="border-t border-[#E5EBE3] bg-[#FBFAF7] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#987625]">Día seleccionado</p>
            <h3 className="mt-1 text-base font-semibold capitalize text-[#0F3D4A]">{selectedLabel}</h3>
          </div>
          <span className="rounded-full bg-[#E9EEE7] px-3 py-1.5 text-xs font-semibold text-[#0F3D4A]">{selectedEvents.length} {selectedEvents.length === 1 ? 'evento' : 'eventos'}</span>
        </div>
        {selectedEvents.length === 0 ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-[#64756E]"><CalendarDays className="h-4 w-4" />No hay eventos para este día.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {selectedEvents.map(event => (
              <button key={event.id} type="button" onClick={() => onSelectEvent?.(event)} disabled={!onSelectEvent} className={`flex w-full items-center gap-3 rounded-xl border border-[#E1E7DF] bg-white px-4 py-3 text-left hover:border-[#A7B89A] hover:bg-[#F5F7F2] disabled:cursor-default ${focus}`}>
                <Clock3 className="h-4 w-4 shrink-0 text-[#987625]" />
                <span className="min-w-0 flex-1 text-sm font-medium text-[#0F3D4A]">{event.title}</span>
                <span className="shrink-0 text-xs text-[#52665A]">{event.allDay ? 'Todo el día' : hour(event.start)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
