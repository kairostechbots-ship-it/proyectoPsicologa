'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto dura una sesión típica?',
    answer: 'Cada sesión tiene una duración aproximada de 50 a 60 minutos, dependiendo de las necesidades específicas del momento.'
  },
  {
    question: '¿Cómo funciona la terapia de medicina natural?',
    answer: 'Es un enfoque complementario donde evaluamos tus hábitos, emociones y síntomas físicos para recomendar tratamientos basados en herbolaria, nutrición y técnicas de relajación, siempre respetando tu proceso médico tradicional.'
  },
  {
    question: '¿Las consultas pueden ser en línea?',
    answer: 'Sí, ofrezco la modalidad de consulta en línea a través de videollamada para que puedas recibir atención desde la comodidad de tu hogar.'
  },
  {
    question: '¿Qué necesito para mi primera cita?',
    answer: 'Solo necesitas un dispositivo con cámara y micrófono (si es online), un espacio tranquilo donde te sientas cómodo/a, y disposición para platicar sobre lo que te trajo a buscar apoyo.'
  },
  {
    question: '¿Cuáles son las formas de pago?',
    answer: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y pagos en efectivo (en consultas presenciales). Los detalles se proporcionan al agendar.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#F9FBFA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#7D9D85] font-bold tracking-widest text-sm uppercase mb-3">Respuestas Rápidas</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2D3436] mb-4">
            Dudas Frecuentes
          </h3>
          <p className="text-[#636E72] leading-relaxed">
            Información que te ayudará a sentirte más seguro antes de nuestra primera sesión.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-[#7D9D85]/10 rounded-2xl overflow-hidden bg-white hover:border-[#7D9D85]/30 transition-colors shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-[#4A5D4E]">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#7D9D85] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-[#636E72] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
