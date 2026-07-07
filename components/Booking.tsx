'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, Calendar } from 'lucide-react';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

export function Booking() {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success

  // Simple mocked calendar days
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section id="booking" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[#7D9D85] font-bold tracking-widest text-sm uppercase mb-3">Tu Espacio</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2D3436] mb-4">
            Agenda tu Cita
          </h3>
          <p className="text-[#636E72] leading-relaxed">
            Selecciona el día y la hora que mejor se adapten a tu horario. El sistema es rápido, seguro y confidencial.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-[#7D9D85]/10 shadow-2xl flex flex-col overflow-hidden">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Calendar Mock */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-[#7D9D85]/10">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-serif text-2xl text-[#2D3436]">Octubre 2026</h4>
                  <div className="flex gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><ChevronLeft className="w-5 h-5"/></button>
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><ChevronRight className="w-5 h-5"/></button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2 text-sm">
                  {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                    <div key={d} className="font-bold text-[#7D9D85] py-2">{d}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty days for offset */}
                  <div className="p-2"></div>
                  <div className="p-2"></div>
                  <div className="p-2"></div>
                  
                  {days.map(day => {
                    const isSelected = selectedDate === day;
                    const isPast = day < 10; // Mock past days
                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          py-2 rounded-lg text-sm transition-all text-center
                          ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#E8F0EA] text-[#2D3436]'}
                          ${isSelected ? 'bg-[#7D9D85] font-bold text-white shadow-lg hover:bg-[#6A8971]' : ''}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Mock */}
              <div className="p-8 bg-gray-50/50">
                <h4 className="font-bold text-[#2D3436] text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#7D9D85]" />
                  Horarios Disponibles
                </h4>
                
                {selectedDate ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 mb-4">Para el {selectedDate} de Octubre:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-3 px-4 rounded-xl border text-sm transition-all
                            ${selectedTime === time 
                              ? 'border-[#7D9D85] bg-white text-[#7D9D85] shadow-sm font-bold' 
                              : 'border-[#E0E0E0] bg-white text-gray-400 hover:border-[#7D9D85] hover:text-[#7D9D85]'}
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <button 
                      disabled={!selectedTime}
                      onClick={() => setStep(2)}
                      className={`
                        w-full mt-8 py-4 rounded-2xl font-bold transition-all
                        ${selectedTime 
                          ? 'bg-[#7D9D85] text-white hover:bg-[#6A8971] shadow-xl shadow-[#7D9D85]/20' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                      `}
                    >
                      Continuar
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Selecciona un día en el calendario
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12"
            >
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-[#7D9D85] hover:text-[#6A8971] mb-6 flex items-center gap-1 font-bold"
              >
                <ChevronLeft className="w-4 h-4" /> Volver al calendario
              </button>
              
              <h4 className="text-3xl font-serif text-[#2D3436] mb-6">Completa tus datos</h4>
              
              <div className="bg-[#E8F0EA] p-4 rounded-2xl mb-8 flex items-center gap-3 text-[#4A5D4E]">
                <Calendar className="w-5 h-5" />
                <span>Cita para el <strong>{selectedDate} de Octubre</strong> a las <strong>{selectedTime}</strong></span>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#636E72] mb-2">Nombre completo</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="Ej. Ana Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#636E72] mb-2">Teléfono (WhatsApp)</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="Ej. 555 123 4567" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#636E72] mb-2">Motivo de consulta (opcional)</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="Puedes compartir brevemente qué te trae por aquí..."></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-[#7D9D85] text-white rounded-2xl font-bold hover:bg-[#6A8971] transition-all shadow-xl shadow-[#7D9D85]/20"
                >
                  Confirmar Reserva
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#E8F0EA] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#7D9D85]" />
              </div>
              <h4 className="text-3xl font-serif text-[#2D3436] mb-4">¡Reserva Confirmada!</h4>
              <p className="text-[#636E72] mb-8 max-w-md mx-auto">
                Tu cita para el <strong>{selectedDate} de Octubre a las {selectedTime}</strong> ha sido agendada con éxito. Te hemos enviado un mensaje de confirmación por WhatsApp.
              </p>
              <button 
                onClick={() => { setStep(1); setSelectedTime(null); }}
                className="px-8 py-4 bg-gray-100 text-[#2D3436] rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Volver al inicio
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
