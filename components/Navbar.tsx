'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

const LOGO_SRC = '/logo.png';

const WHATSAPP_NUMBER = '523311383410';

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola, me gustaría recibir información para agendar una cita.'
)}`;

const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre mí', href: '/quien-soy' },
  { name: 'Psicoterapia', href: '/servicios' },
  { name: 'Medicina Natural', href: '/bienestar-natural' },
  { name: 'Preguntas frecuentes', href: '/faq' },
  { name: 'Contacto', href: '/contacto' },
];

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4 ' +
  'focus-visible:ring-offset-[#FBFAF7]';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1280px)');

    const handleBreakpoint = () => {
      if (desktopQuery.matches) {
        setIsOpen(false);
      }
    };

    handleBreakpoint();

    desktopQuery.addEventListener('change', handleBreakpoint);

    return () => {
      desktopQuery.removeEventListener('change', handleBreakpoint);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegación principal"
        className="
          relative z-10
          border-b border-[#A7B89A]/20
          bg-[#FBFAF7]/95
          shadow-[0_4px_24px_rgba(15,61,74,0.035)]
          backdrop-blur-md
        "
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[88px] items-center justify-between gap-6 xl:h-[96px]">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              aria-label="Erika Pilar, ir al inicio"
              className={`flex shrink-0 items-center rounded-md ${focusStyles}`}
            >
              <Image
                src={LOGO_SRC}
                alt="Erika Pilar — Psicóloga Clínica TCC"
                width={300}
                height={20}
                priority
                className="
                  h-auto
                  w-[200px]
                  object-contain
                  object-left
                  sm:w-[250px]
                  xl:w-[250px]
                "
              />
            </Link>

            {/* Navegación escritorio */}
            <div className="hidden items-center gap-8 xl:flex">
              <ul className="flex items-center gap-7">
                {links.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`
                          group relative
                          inline-flex items-center
                          whitespace-nowrap
                          rounded-sm
                          py-3
                          text-[14px]
                          transition-colors
                          duration-200
                          motion-reduce:transition-none
                          ${focusStyles}
                          ${
                            active
                              ? 'font-semibold text-[#0F3D4A]'
                              : 'font-medium text-[#6E7A73] hover:text-[#0F3D4A]'
                          }
                        `}
                      >
                        {link.name}

                        <span
                          aria-hidden="true"
                          className={`
                            absolute
                            inset-x-0
                            bottom-1
                            mx-auto
                            h-[2px]
                            rounded-full
                            bg-[#D4AF37]
                            transition-all
                            duration-200
                            motion-reduce:transition-none
                            ${
                              active
                                ? 'w-5 opacity-100'
                                : 'w-0 opacity-0'
                            }
                          `}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar cita por WhatsApp, abre una pestaña nueva"
                className={`
                  inline-flex
                  min-h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  whitespace-nowrap
                  rounded-lg
                  bg-[#0F3D4A]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_6px_16px_rgba(15,61,74,0.12)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#164F5E]
                  hover:shadow-[0_8px_20px_rgba(15,61,74,0.16)]
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                  ${focusStyles}
                `}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Solicitar cita
              </a>
            </div>

            {/* Botón menú móvil */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className={`
                inline-flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-[#A7B89A]/30
                bg-white/50
                text-[#0F3D4A]
                transition-colors
                duration-200
                hover:border-[#A7B89A]/60
                hover:bg-[#F2F1EC]
                motion-reduce:transition-none
                xl:hidden
                ${focusStyles}
              `}
            >
              {isOpen ? (
                <X
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              )}
            </button>
          </div>
        </div>

        {/* Navegación móvil */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-navigation"
              id="mobile-navigation"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                overflow-hidden
                border-t
                border-[#A7B89A]/20
                bg-[#FBFAF7]
                xl:hidden
              "
            >
              <div
                className="
                  max-h-[calc(100dvh-5.5rem)]
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  pb-6
                  pt-4
                  sm:px-6
                "
              >
                <ul className="space-y-1">
                  {links.map((link) => {
                    const active = isActive(link.href);

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          aria-current={active ? 'page' : undefined}
                          className={`
                            flex
                            min-h-12
                            items-center
                            justify-between
                            gap-3
                            rounded-lg
                            px-4
                            py-3
                            text-[15px]
                            transition-colors
                            duration-200
                            motion-reduce:transition-none
                            ${focusStyles}
                            ${
                              active
                                ? 'bg-[#A7B89A]/15 font-semibold text-[#0F3D4A]'
                                : 'font-medium text-[#6E7A73] hover:bg-[#F2F1EC] hover:text-[#0F3D4A]'
                            }
                          `}
                        >
                          {link.name}

                          {active && (
                            <span
                              aria-hidden="true"
                              className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-[#D4AF37]
                              "
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 border-t border-[#A7B89A]/20 pt-5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    aria-label="Agendar cita por WhatsApp, abre una pestaña nueva"
                    className={`
                      flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-[#0F3D4A]
                      px-5
                      py-3.5
                      text-[15px]
                      font-semibold
                      text-white
                      shadow-[0_6px_16px_rgba(15,61,74,0.10)]
                      transition-all
                      duration-200
                      hover:bg-[#164F5E]
                      motion-reduce:transition-none
                      ${focusStyles}
                    `}
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />

                    Agendar cita
                  </a>

                  <div className="mt-4 text-center">
                    <p className="text-xs leading-relaxed text-[#6E7A73]">
                      Atención presencial y en línea
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#6E7A73]">
                      Psicología Clínica · TCC
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}