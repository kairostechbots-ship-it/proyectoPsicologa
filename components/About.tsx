'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/psychologist/800/1000"
                alt="Retrato de la profesional"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 w-48 h-48 bg-[#E8F0EA] rounded-full border border-[#7D9D85]/20 flex items-center justify-center p-6 shadow-xl hidden sm:flex">
              <p className="text-center font-serif text-[#4A5D4E] italic text-lg leading-snug">
                &quot;Cuidar tu mente es el primer paso para sanar tu vida.&quot;
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-[#7D9D85] font-bold tracking-widest text-sm uppercase">Quién Soy</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2D3436]">
              Hola, soy Jazmin. <br/> Tu bienestar es mi prioridad.
            </h3>
            
            <div className="space-y-4 text-[#636E72] leading-relaxed">
              <p>
                Con años de experiencia en psicología clínica y una profunda vocación por ayudar a los demás, mi enfoque se centra en crear un ambiente de confianza, empatía y total confidencialidad.
              </p>
              <p>
                Creo firmemente en un enfoque integral de la salud. Por ello, combino la psicoterapia basada en evidencia con alternativas de medicina natural para tratar no solo los síntomas, sino el origen de tu malestar emocional y físico.
              </p>
              <p>
                Mi objetivo es acompañarte a descubrir tus propias herramientas, brindándote un espacio seguro donde puedas sentirte escuchado y comprendido, libre de juicios.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div>
                <p className="text-3xl font-serif text-[#7D9D85] mb-1">+5</p>
                <p className="text-sm text-[#636E72]">Años de experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#7D9D85] mb-1">Integral</p>
                <p className="text-sm text-[#636E72]">Psicología + Naturista</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-lg font-bold text-[#4A5D4E] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                Formación Académica
              </h4>
              <ul className="space-y-3 text-[#636E72] text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7D9D85] mt-1.5 shrink-0"></div>
                  <div>
                    <strong>Licenciatura en Psicología</strong><br/>
                    Universidad Nacional Autónoma de México (UNAM)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7D9D85] mt-1.5 shrink-0"></div>
                  <div>
                    <strong>Diplomado en Medicina Natural y Terapias Holísticas</strong><br/>
                    Instituto de Salud Integral
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7D9D85] mt-1.5 shrink-0"></div>
                  <div className="text-[#4A5D4E] bg-[#E8F0EA] px-3 py-1.5 rounded-lg inline-block mt-1">
                    <strong>Cédula Profesional:</strong> 12345678
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
