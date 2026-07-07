'use client';

import { motion } from 'motion/react';
import { Brain, HeartPulse, Flower2, Users } from 'lucide-react';

const services = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Terapia Individual',
    description: 'Espacio personal para abordar ansiedad, depresión, estrés, autoestima y procesos de duelo.',
  },
  {
    icon: <Flower2 className="w-8 h-8" />,
    title: 'Medicina Natural',
    description: 'Alternativas complementarias basadas en herbolaria y terapias holísticas para restaurar el equilibrio físico y emocional.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Terapia de Pareja',
    description: 'Mejora la comunicación, resuelve conflictos y fortalece el vínculo emocional en tu relación.',
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: 'Gestión del Estrés',
    description: 'Técnicas de relajación y mindfulness para aprender a manejar las tensiones del día a día.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#F9FBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[#7D9D85] font-bold tracking-widest text-sm uppercase mb-3">Mis Servicios</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2D3436] mb-4">
            Un Enfoque Integral para tu Salud
          </h3>
          <p className="text-[#636E72] leading-relaxed">
            Soluciones adaptadas a tus necesidades, combinando el cuidado de la mente y el poder de lo natural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F4F7F5] p-8 rounded-[32px] border border-transparent hover:border-[#7D9D85]/20 transition-all group"
            >
              <div className="w-14 h-14 bg-[#E8F0EA] rounded-2xl flex items-center justify-center text-[#4A5D4E] mb-6 group-hover:scale-110 group-hover:bg-[#7D9D85] group-hover:text-white transition-all shadow-sm">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-[#4A5D4E] mb-3">{service.title}</h4>
              <p className="text-sm text-[#636E72] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
