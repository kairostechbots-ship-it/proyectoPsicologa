'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Phone, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const AVAILABLE_TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function ReservarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Confirmation
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Terapia Individual',
    mode: 'En línea'
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfDay(monthStart);
  
  // Adjust to start on Monday for Spanish calendar
  const startDateAdjusted = subDaysFromStart(startDate);
  
  function subDaysFromStart(date: Date) {
    const day = date.getDay();
    const diff = day === 0 ? 6 : day - 1; // 0 is Sunday, make Monday the first day
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - diff);
    return newDate;
  }

  const daysInMonth = eachDayOfInterval({
    start: startDateAdjusted,
    end: addDays(startDateAdjusted, 41) // 6 weeks
  });

  const handleDateSelect = (date: Date) => {
    // Prevent selecting past dates or Sundays
    if (isBefore(date, startOfDay(new Date())) || date.getDay() === 0) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for the panel
    try {
      const savedApts = JSON.parse(localStorage.getItem('chatbot_appointments') || '[]');
      savedApts.push({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: formData.type,
        mode: formData.mode,
        date: selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '',
        time: selectedTime,
      });
      localStorage.setItem('chatbot_appointments', JSON.stringify(savedApts));
      
      // Dispatch event for panel
      window.dispatchEvent(new Event('appointments_updated'));
      
      setStep(3);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBFA] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#7D9D85] hover:text-[#4A5D4E] transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-[#2D3436] mb-4">Agendar Cita</h1>
          <p className="text-[#636E72] max-w-2xl mx-auto">
            Selecciona el día y la hora que mejor se adapte a ti para tu sesión.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-[#7D9D85]/10 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-[#E8F0EA] h-2 w-full">
            <motion.div 
              className="bg-[#7D9D85] h-full"
              initial={{ width: '33%' }}
              animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                  {/* Calendar Section */}
                  <div>
                    <h2 className="text-xl font-bold text-[#2D3436] mb-6 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-[#7D9D85]" />
                      Selecciona un día
                    </h2>
                    
                    <div className="bg-[#F9FBFA] rounded-2xl p-6 border border-[#E0E0E0]">
                      <div className="flex justify-between items-center mb-6">
                        <button onClick={prevMonth} className="p-2 hover:bg-[#E8F0EA] rounded-full text-[#4A5D4E] transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-[#2D3436] capitalize">
                          {format(currentDate, 'MMMM yyyy', { locale: es })}
                        </span>
                        <button onClick={nextMonth} className="p-2 hover:bg-[#E8F0EA] rounded-full text-[#4A5D4E] transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                          <div key={day} className="text-xs font-bold text-[#7D9D85] py-2">{day}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {daysInMonth.map((date, i) => {
                          const isSelected = selectedDate && isSameDay(date, selectedDate);
                          const isPast = isBefore(date, startOfDay(new Date()));
                          const isSunday = date.getDay() === 0; // 0 is Sunday
                          const isDisabled = isPast || isSunday;

                          return (
                            <button
                              key={i}
                              disabled={isDisabled}
                              onClick={() => handleDateSelect(date)}
                              className={`
                                aspect-square rounded-full flex items-center justify-center text-sm transition-all
                                ${!isSameMonth(date, currentDate) ? 'text-gray-300' : 'text-[#2D3436]'}
                                ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#E8F0EA] cursor-pointer'}
                                ${isSelected ? 'bg-[#7D9D85] text-white hover:bg-[#6A8971] font-bold shadow-md' : ''}
                                ${isToday(date) && !isSelected ? 'border border-[#7D9D85] text-[#7D9D85] font-bold' : ''}
                              `}
                            >
                              {format(date, 'd')}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Selection Section */}
                  <div>
                    <h2 className="text-xl font-bold text-[#2D3436] mb-6 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-[#7D9D85]" />
                      Horarios disponibles
                    </h2>

                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {AVAILABLE_TIMES.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-3 px-4 rounded-xl text-sm font-medium transition-all text-center border
                              ${selectedTime === time 
                                ? 'bg-[#7D9D85] border-[#7D9D85] text-white shadow-md' 
                                : 'bg-white border-[#E0E0E0] text-[#2D3436] hover:border-[#7D9D85] hover:text-[#7D9D85]'
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#F9FBFA] border border-[#E0E0E0] rounded-2xl p-8 text-center h-[300px] flex flex-col items-center justify-center">
                        <Calendar className="w-12 h-12 text-[#E0E0E0] mb-4" />
                        <p className="text-[#636E72]">Selecciona un día en el calendario para ver los horarios disponibles.</p>
                      </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-[#E0E0E0] flex justify-end">
                      <button
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(2)}
                        className="px-8 py-3 bg-[#2D3436] text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-2xl mx-auto"
                >
                  <h2 className="text-2xl font-bold text-[#2D3436] mb-2 flex items-center gap-3">
                    <User className="w-6 h-6 text-[#7D9D85]" />
                    Tus Datos
                  </h2>
                  <p className="text-[#636E72] mb-8">
                    Completando estos datos confirmaremos tu cita para el <strong className="text-[#4A5D4E]">{selectedDate && format(selectedDate, "d 'de' MMMM", { locale: es })} a las {selectedTime}</strong>.
                  </p>

                  <form onSubmit={handleBookAppointment} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#2D3436] mb-2">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition-all bg-[#F9FBFA] focus:bg-white"
                          placeholder="Ej. Ana García"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[#2D3436] mb-2">Teléfono (WhatsApp)</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition-all bg-[#F9FBFA] focus:bg-white"
                            placeholder="Ej. 55 1234 5678"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#2D3436] mb-2">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition-all bg-[#F9FBFA] focus:bg-white"
                            placeholder="tucorreo@ejemplo.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-[#2D3436] mb-2">Tipo de Terapia</label>
                        <select 
                          value={formData.type}
                          onChange={e => setFormData({...formData, type: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition-all bg-[#F9FBFA] focus:bg-white"
                        >
                          <option>Terapia Individual</option>
                          <option>Terapia de Pareja</option>
                          <option>Terapia Familiar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#2D3436] mb-2">Modalidad</label>
                        <select 
                          value={formData.mode}
                          onChange={e => setFormData({...formData, mode: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition-all bg-[#F9FBFA] focus:bg-white"
                        >
                          <option>En línea</option>
                          <option>Presencial</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-[#E0E0E0] mt-8">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[#636E72] hover:text-[#2D3436] font-medium transition-colors px-4 py-2"
                      >
                        Atrás
                      </button>
                      <button 
                        type="submit"
                        className="px-8 py-3 bg-[#7D9D85] text-white rounded-xl font-bold hover:bg-[#6A8971] transition-colors shadow-lg"
                      >
                        Confirmar Cita
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-[#E8F0EA] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-[#7D9D85]" />
                  </div>
                  <h2 className="text-3xl font-serif text-[#2D3436] mb-4">¡Cita Confirmada!</h2>
                  <p className="text-[#636E72] max-w-md mx-auto mb-8 text-lg">
                    Hola {formData.name}, hemos agendado tu cita para el <strong className="text-[#4A5D4E]">{selectedDate && format(selectedDate, "d 'de' MMMM yyyy", { locale: es })}</strong> a las <strong className="text-[#4A5D4E]">{selectedTime}</strong>.
                  </p>
                  
                  <div className="bg-[#F9FBFA] border border-[#E0E0E0] rounded-2xl p-6 max-w-sm mx-auto mb-10 text-left">
                    <h3 className="font-bold text-[#2D3436] mb-4 border-b border-[#E0E0E0] pb-2">Resumen</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#636E72]">Tipo:</span>
                        <span className="font-medium text-[#2D3436]">{formData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#636E72]">Modalidad:</span>
                        <span className="font-medium text-[#2D3436]">{formData.mode}</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/" className="inline-block px-8 py-3 bg-[#2D3436] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg">
                    Volver al inicio
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
