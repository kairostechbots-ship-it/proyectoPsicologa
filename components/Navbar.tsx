'use client';

import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

const links = [
  { name: 'Inicio', href: '#home' },
  { name: 'Quién Soy', href: '#about' },
  { name: 'Servicios', href: '#services' },
  { name: 'Dudas Frecuentes', href: '#faq' },
  { name: 'Contacto', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/50 backdrop-blur-md border-b border-[#7D9D85]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7D9D85] flex items-center justify-center text-white shadow-lg">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#4A5D4E]">Psic. Jazmin</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-[#636E72] hover:text-[#7D9D85] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/reservar"
              className="px-5 py-2.5 bg-[#7D9D85] text-white text-sm font-bold rounded-2xl hover:bg-[#6A8971] transition shadow-md shadow-[#7D9D85]/20"
            >
              Agendar Cita
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#636E72] hover:text-[#7D9D85] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#7D9D85]/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-[#636E72] hover:text-[#7D9D85] hover:bg-[#E8F0EA]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/reservar"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-[#7D9D85] text-white text-base font-bold rounded-2xl hover:bg-[#6A8971] transition shadow-md shadow-[#7D9D85]/20"
                >
                  Agendar Cita
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
