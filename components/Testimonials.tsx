'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María G.',
    text: 'La Dra. Jazmin me ayudó muchísimo a entender el origen de mi ansiedad. Su enfoque que combina terapia y opciones naturales fue exactamente lo que necesitaba para recuperar mi equilibrio.',
    role: 'Paciente',
  },
  {
    name: 'Carlos y Elena',
    text: 'Acudimos a terapia de pareja con muchas dudas, pero desde la primera sesión nos hizo sentir escuchados y sin juicios. Nos ha dado herramientas invaluables para mejorar nuestra comunicación.',
    role: 'Pacientes de Pareja',
  },
  {
    name: 'Laura M.',
    text: 'Un espacio verdaderamente seguro. Me sentí cómoda desde el primer momento. La atención es empática y súper profesional.',
    role: 'Paciente',
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#F7F5F0] border-t border-[#7895A3]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[#7895A3] font-bold tracking-widest text-sm uppercase mb-3">Lo que dicen los clientes</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#37454A] mb-4">
            Testimonios de Pacientes
          </h3>
          <p className="text-[#636E72] leading-relaxed">
            Experiencias de quienes han confiado en mi acompañamiento para mejorar su bienestar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-[#7895A3]/10 shadow-sm hover:shadow-xl hover:shadow-[#7895A3]/5 transition-all relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#D9E6DF] group-hover:text-[#7895A3]/20 transition-colors" />
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[#636E72] leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div>
                <h4 className="font-bold text-[#37454A]">{testimonial.name}</h4>
                <p className="text-sm text-[#7895A3]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
