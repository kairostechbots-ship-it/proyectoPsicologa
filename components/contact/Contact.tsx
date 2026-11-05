'use client';

import Image from 'next/image';

import {
  useRef,
  useState,
  type MouseEvent,
} from 'react';

import {
  motion,
  useReducedMotion,
} from 'motion/react';

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Expand,
  MapPin,
  MessageCircle,
  Navigation,
  X,
} from 'lucide-react';

import type { ContactInfo } from '@/types/contact';

interface ContactProps {
  contact: ContactInfo;
}

const ease = [0.22, 1, 0.36, 1] as const;

const consultorioPhotos = [
  {
    src: '/images/consultorio-plantas.png ',
    alt: 'Sofá y sillón del consultorio de Erika Pilar.',
  },
  {
    src: '/images/consultorio-sofa.png',
    alt: 'Sillón junto a las plantas del consultorio de Erika Pilar.',
  },
];

const focusClasses =
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-[#0F4A55] focus-visible:ring-offset-4';

function formatTime(time: string) {
  if (!time) return '';

  const [hours, minutes] = time.split(':').map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return '';
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(date)
    .replace('a. m.', 'am')
    .replace('p. m.', 'pm');
}

function getBusinessHours(contact: ContactInfo) {
  const enabledDays = [...contact.businessHours]
    .filter((item) => item.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (!enabledDays.length) {
    return ['Horario por confirmar'];
  }

  const firstDay = enabledDays[0];

  const sameSchedule = enabledDays.every(
    (item) =>
      item.startTime === firstDay.startTime &&
      item.endTime === firstDay.endTime,
  );

  // Agrupa únicamente la semana laboral completa.
  // Para otros días muestra cada horario y evita sugerir días no disponibles.
  const normalizedDays = enabledDays.map((item) =>
    item.day
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase(),
  );

  const weekdays = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
  ];

  const fullWorkweek =
    normalizedDays.length === weekdays.length &&
    weekdays.every((day, index) => normalizedDays[index] === day);

  if (sameSchedule && fullWorkweek) {
    return [
      `Lunes a viernes · ${formatTime(firstDay.startTime)} a ${formatTime(
        firstDay.endTime,
      )}`,
    ];
  }

  return enabledDays.map(
    (item) =>
      `${item.day} · ${formatTime(item.startTime)} a ${formatTime(
        item.endTime,
      )}`,
  );
}

function ConsultorioGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflow = useRef<string | null>(null);

  const currentPhoto = consultorioPhotos[selectedPhoto];

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  function openPhoto(
    index: number,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) return;

    setSelectedPhoto(index);
    triggerRef.current = event.currentTarget;

    dialog.showModal();

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function closePhoto() {
    dialogRef.current?.close();
  }

  function changePhoto(direction: number) {
    setSelectedPhoto(
      (current) =>
        (current + direction + consultorioPhotos.length) %
        consultorioPhotos.length,
    );
  }

  return (
    <section
      aria-labelledby="consultorio-gallery-title"
      className="mt-12 border-t border-[#A7B89A]/25 pt-10 sm:mt-16 sm:pt-12"
    >
      <div className="mx-auto max-w-[650px] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#80651D]">
          Atención presencial
        </p>

        <h2
          id="consultorio-gallery-title"
          className="mt-3 font-serif text-[30px] font-medium leading-tight tracking-[-0.02em] text-[#0F4A55] sm:text-[38px]"
        >
          Conoce el consultorio
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#526368] sm:text-base sm:leading-7">
          Un vistazo al espacio donde se realizan las sesiones
          presenciales en Tlajomulco.
        </p>
      </div>

      {/* Computadora: ambas fotografías visibles. */}
      <div className="mt-7 hidden gap-4 md:grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {consultorioPhotos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={(event) => openPhoto(index, event)}
            aria-label={`Ampliar foto: ${photo.alt}`}
            aria-haspopup="dialog"
            className={`group relative h-[260px] overflow-hidden rounded-[20px] bg-[#E9EFE9] text-left lg:h-[310px] ${focusClasses}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                index === 0
                  ? '(min-width: 1280px) 680px, 55vw'
                  : '(min-width: 1280px) 520px, 45vw'
              }
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#0F4A55] shadow-sm"
            >
              <Expand className="h-4 w-4" strokeWidth={1.7} />
            </span>
          </button>
        ))}
      </div>

      {/* Celular: fotografía principal y selector de miniaturas. */}
      <div className="mt-6 md:hidden">
        <button
          type="button"
          onClick={(event) => openPhoto(selectedPhoto, event)}
          aria-label={`Ampliar foto: ${currentPhoto.alt}`}
          aria-haspopup="dialog"
          className={`relative block aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#E9EFE9] ${focusClasses}`}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            sizes="(max-width: 767px) 100vw, 700px"
            className="object-cover"
          />

          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0F4A55]"
          >
            <Expand className="h-4 w-4" strokeWidth={1.7} />
          </span>
        </button>

        <div
          aria-label="Seleccionar foto del consultorio"
          className="mt-4 flex justify-center gap-3"
        >
          {consultorioPhotos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(index)}
              aria-label={`Mostrar foto ${index + 1}: ${photo.alt}`}
              aria-pressed={selectedPhoto === index}
              className={`relative h-[58px] w-[86px] overflow-hidden rounded-[10px] border-2 bg-[#E9EFE9] ${
                selectedPhoto === index
                  ? 'border-[#A88A32]'
                  : 'border-transparent'
              } ${focusClasses}`}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="86px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-xs leading-5 text-[#526368]">
          2 fotos · Toca la imagen para ampliarla
        </p>
      </div>

      {/* El diálogo nativo mantiene el foco dentro y permite cerrar con Escape. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="consultorio-photo-title"
        onClose={() => {
          restoreScroll();
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePhoto();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            changePhoto(1);
          }

          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changePhoto(-1);
          }
        }}
        className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-24px)] max-w-[1100px] overflow-y-auto rounded-[20px] border border-white/20 bg-[#FBFAF7] p-0 text-[#0F4A55] shadow-2xl backdrop:bg-black/75"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <h3
            id="consultorio-photo-title"
            className="font-serif text-xl"
          >
            Consultorio de Erika Pilar
          </h3>

          <button
            type="button"
            autoFocus
            onClick={closePhoto}
            aria-label="Cerrar fotografía"
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[#E9EFE9] ${focusClasses}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative h-[min(58dvh,600px)] min-h-[200px] bg-[#E9EFE9]">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => changePhoto(-1)}
            aria-label="Ver fotografía anterior"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#A7B89A]/40 hover:bg-[#E9EFE9] ${focusClasses}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <p
            role="status"
            className="text-center text-sm text-[#526368]"
          >
            Foto {selectedPhoto + 1} de {consultorioPhotos.length}
          </p>

          <button
            type="button"
            onClick={() => changePhoto(1)}
            aria-label="Ver fotografía siguiente"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#A7B89A]/40 hover:bg-[#E9EFE9] ${focusClasses}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </dialog>
    </section>
  );
}

export function Contact({ contact }: ContactProps) {
  const reduceMotion = useReducedMotion();

  const businessHours = getBusinessHours(contact);

  const mapEmbedUrl =
    contact.mapsUrl.trim().replace(/\/$/, '') ===
    'https://maps.app.goo.gl/RJdeFB5AXkLH7mPL7'
      ? 'https://maps.google.com/maps?q=20.4595885,-103.4391654&z=17&output=embed'
      : contact.mapEmbedUrl;

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    'Hola, me gustaría recibir información sobre la atención psicológica y consultar disponibilidad.',
  )}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 overflow-hidden bg-white py-14 sm:py-16 lg:scroll-mt-28 lg:py-20"
    >
      {/* Decoración */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-[220px] top-[80px] h-[420px] w-[420px] rounded-full border border-[#A7B89A]/10 lg:h-[520px] lg:w-[520px]" />

        <div className="absolute -bottom-[220px] -left-[200px] h-[420px] w-[420px] rounded-full bg-[#A7B89A]/[0.045] lg:h-[520px] lg:w-[520px]" />

        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="absolute -left-24 top-28 h-[260px] w-[260px] text-[#D4AF37] opacity-10 lg:left-0 lg:h-[360px] lg:w-[360px]"
        >
          <path
            d="M34 353C89 222 181 103 354 40"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease,
          }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-[#D4AF37]"
            />

            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#596D65]">
              Contacto y ubicación
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-[#D4AF37]"
            />
          </div>

          <h1
            id="contact-title"
            className="mt-6 font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.03em] text-[#0F4A55] sm:text-[48px]"
          >
            Consultorio y atención en{' '}
            <span className="font-normal italic">
              Tlajomulco.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[680px] text-base leading-7 text-[#526368]">
            Consulta la ubicación del consultorio, horarios de
            atención y disponibilidad. Si deseas solicitar una cita
            de psicoterapia o resolver alguna duda, puedes
            comunicarte directamente por WhatsApp.
          </p>
        </motion.div>

        {/* Información y mapa */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease,
            }}
            className="relative overflow-hidden rounded-[28px] border border-[#A7B89A]/20 bg-[#FBFAF7] p-6 shadow-[0_12px_40px_rgba(15,61,74,0.04)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#A7B89A]/[0.07]"
            />

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#80651D]">
                Atención directa
              </p>

              <h2 className="mt-3 font-serif text-[26px] font-medium leading-tight text-[#0F4A55] sm:text-[29px]">
                Información de contacto
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#526368]">
                La atención se realiza con cita previa. Puedes
                escribir por WhatsApp para consultar disponibilidad
                antes de acudir.
              </p>

              <div className="mt-8 space-y-6">
                {/* WhatsApp */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className={`group flex items-start gap-4 rounded-sm ${focusClasses}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9EFE9] text-[#52665A] transition-colors group-hover:bg-[#0F4A55] group-hover:text-white">
                    <MessageCircle
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div className="min-w-0 break-words">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#53665C]">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-base font-semibold text-[#0F4A55]">
                      {contact.phone}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#53665C]">
                      Escríbeme para consultar disponibilidad.
                    </p>
                  </div>
                </motion.a>

                {/* Dirección */}
                <motion.a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className={`group flex items-start gap-4 rounded-sm ${focusClasses}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9EFE9] text-[#52665A] transition-colors group-hover:bg-[#0F4A55] group-hover:text-white">
                    <MapPin
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div className="min-w-0 break-words">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#53665C]">
                      Consultorio
                    </p>

                    <p className="mt-1 max-w-[330px] text-sm font-medium leading-6 text-[#0F4A55]">
                      {contact.address}
                    </p>

                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold leading-5 text-[#80651D]">
                      <Navigation
                        aria-hidden="true"
                        className="h-3 w-3 shrink-0"
                        strokeWidth={1.7}
                      />
                      Ver ubicación en Google Maps
                    </p>
                  </div>
                </motion.a>

                {/* Horario */}
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9EFE9] text-[#52665A]">
                    <Clock3
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>

                  <div className="min-w-0 break-words">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#53665C]">
                      Horario
                    </p>

                    <div className="mt-1 space-y-1">
                      {businessHours.map((schedule) => (
                        <p
                          key={schedule}
                          className="text-sm font-medium leading-6 text-[#0F4A55]"
                        >
                          {schedule}
                        </p>
                      ))}
                    </div>

                    {contact.appointmentRequired && (
                      <p className="mt-1 text-xs leading-5 text-[#53665C]">
                        Atención con cita previa.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0F4A55] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,74,85,0.10)] transition-colors hover:bg-[#174F5D] ${focusClasses}`}
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-[18px] w-[18px] shrink-0"
                    strokeWidth={1.7}
                  />
                  Enviar WhatsApp
                </a>

                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl border border-[#0F4A55]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#0F4A55] transition-colors hover:border-[#0F4A55]/30 hover:bg-white ${focusClasses}`}
                >
                  <Navigation
                    aria-hidden="true"
                    className="h-[17px] w-[17px] shrink-0"
                    strokeWidth={1.6}
                  />
                  Cómo llegar
                </a>
              </div>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-[#A7B89A]/20 bg-[#FBFAF7] shadow-[0_12px_40px_rgba(15,61,74,0.05)] sm:min-h-[380px] lg:min-h-full"
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio de Erika Pilar"
              className="absolute inset-0 h-full w-full"
            />

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto">
              <div className="inline-flex max-w-[350px] items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,61,74,0.10)] backdrop-blur-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9EFE9] text-[#52665A]">
                  <MapPin
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.6}
                  />
                </span>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#53665C]">
                    Consultorio
                  </p>

                  <p className="mt-0.5 text-xs font-semibold leading-5 text-[#0F4A55]">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Galería debajo de la información y del mapa */}
        <ConsultorioGallery />
      </div>
    </section>
  );
}