'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background blobs instead of full image */}
      <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-[#7D9D85] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#7D9D85] opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0EA] text-[#4A5D4E] rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7D9D85] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7D9D85]"></span>
            </span>
            Agenda Abierta para Consultas
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-[#2D3436] leading-tight">
            Encuentra el equilibrio entre tu <span className="text-[#7D9D85] italic">Mente y Cuerpo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#636E72] leading-relaxed max-w-2xl mx-auto">
            Acompañamiento profesional en salud mental y terapias de medicina natural para un bienestar integral. Un espacio seguro, confidencial y empático.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link 
              href="/reservar"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#7D9D85] text-white font-bold rounded-2xl shadow-xl shadow-[#7D9D85]/20 hover:bg-[#6A8971] hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Agendar Primera Cita
            </Link>
            
            <Link 
              href="#services"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-white border border-[#E0E0E0] text-[#2D3436] rounded-2xl font-bold hover:bg-gray-50 transition-all"
            >
              Conocer Servicios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
