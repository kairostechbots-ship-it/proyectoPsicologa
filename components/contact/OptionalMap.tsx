'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface OptionalMapProps {
  embedUrl: string;
  mapsUrl: string;
  address: string;
}

export function OptionalMap({ embedUrl, mapsUrl, address }: OptionalMapProps) {
  const [enabled, setEnabled] = useState(false);
  const descriptionId = useId();
  const loadButton = useRef<HTMLButtonElement>(null);
  const hideButton = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (enabled ? hideButton : loadButton).current?.focus({ preventScroll: true });
  }, [enabled]);

  function toggleMap(nextEnabled: boolean) {
    moveFocus.current = true;
    setEnabled(nextEnabled);
  }

  return (
    <div className="absolute inset-0">
      {enabled ? (
        <>
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer"
            title="Ubicación del consultorio de Erika Pilar en Google Maps"
            className="h-full w-full"
          />
          <button
            ref={hideButton}
            type="button"
            onClick={() => toggleMap(false)}
            className="absolute right-4 top-4 min-h-11 rounded-lg border border-[#A7B89A]/30 bg-white px-4 text-sm font-semibold text-[#0F3D4A] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-2"
          >
            Ocultar mapa
          </button>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-start overflow-y-auto px-6 py-8 text-center sm:px-10">
          <MapPin aria-hidden="true" className="mb-4 h-8 w-8 shrink-0 text-[#52665A]" strokeWidth={1.5} />
          <h3 className="font-serif text-2xl text-[#0F3D4A]">Ubicación del consultorio</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#526368]">{address}</p>
          <p id={descriptionId} className="mt-4 max-w-md text-sm leading-6 text-[#526368]">
            Al cargar el mapa, su navegador se conectará con Google. Este servicio puede utilizar cookies y recibir datos de su conexión, como su dirección IP.
          </p>
          <button
            ref={loadButton}
            type="button"
            aria-describedby={descriptionId}
            onClick={() => toggleMap(true)}
            className="mt-5 min-h-11 shrink-0 rounded-xl bg-[#0F3D4A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#174E5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A] focus-visible:ring-offset-4"
          >
            Cargar mapa de Google
          </button>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 text-sm text-[#52665A]">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A]">Abrir Google Maps</a>
            <Link href="/cookies" className="inline-flex min-h-11 items-center rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A]">Política de cookies</Link>
          </div>
        </div>
      )}
    </div>
  );
}
