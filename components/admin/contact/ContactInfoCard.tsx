'use client';

import {
  CalendarCheck,
  Edit3,
  MapPin,
  MessageCircle,
  Navigation,
} from 'lucide-react';

import type { ContactInfo } from '@/types/contact';

interface ContactInfoCardProps {
  contact: ContactInfo;
  onEdit: () => void;
}

export function ContactInfoCard({
  contact,
  onEdit,
}: ContactInfoCardProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_35px_rgba(15,61,74,0.025)]
      "
    >
      {/* HEADER */}

      <header
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#A7B89A]/15
          px-5
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#B08B28]
            "
          >
            Datos públicos
          </p>

          <h2
            className="
              mt-0.5
              font-serif
              text-[19px]
              font-medium
              text-[#0F3D4A]
            "
          >
            Información de contacto
          </h2>

          <p
            className="
              mt-1
              text-[8px]
              leading-4
              text-[#8A9691]
            "
          >
            Información que utilizan los visitantes para comunicarse
            y llegar al consultorio.
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="
            inline-flex
            min-h-9
            items-center
            justify-center
            gap-2
            rounded-[10px]
            border
            border-[#0F3D4A]/10
            bg-[#F8F9F6]
            px-4
            text-[8px]
            font-semibold
            text-[#0F3D4A]
            transition-colors

            hover:border-[#0F3D4A]/20
            hover:bg-[#EEF2EC]
          "
        >
          <Edit3
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
          />

          Editar
        </button>
      </header>

      {/* CONTENIDO */}

      <div
        className="
          grid
          gap-3
          p-4

          sm:p-5
          lg:grid-cols-2
        "
      >
        {/* WHATSAPP */}

        <InfoItem
          icon={MessageCircle}
          label="WhatsApp"
          value={contact.phone}
        />

        {/* CITA PREVIA */}

        <InfoItem
          icon={CalendarCheck}
          label="Atención"
          value={
            contact.appointmentRequired
              ? 'Con cita previa'
              : 'Sin cita previa'
          }
        />

        {/* DIRECCIÓN */}

        <div className="lg:col-span-2">
          <InfoItem
            icon={MapPin}
            label="Consultorio"
            value={contact.address}
          />
        </div>

        {/* GOOGLE MAPS */}

        <div className="lg:col-span-2">
          <div
            className="
              flex
              items-start
              gap-3
              rounded-[13px]
              border
              border-[#A7B89A]/15
              bg-[#FBFAF7]
              px-4
              py-3.5
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-[9px]
                bg-[#EEF2EC]
                text-[#597060]
              "
            >
              <Navigation
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </span>

            <div className="min-w-0">
              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#929E99]
                "
              >
                Google Maps
              </p>

              {contact.mapsUrl ? (
                <>
                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-medium
                      text-[#435D61]
                    "
                  >
                    Ubicación configurada
                  </p>

                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-1.5
                      inline-flex
                      items-center
                      gap-1.5
                      text-[8px]
                      font-semibold
                      text-[#B08B28]
                      transition-colors

                      hover:text-[#8F701D]
                    "
                  >
                    <Navigation
                      className="h-3 w-3"
                      strokeWidth={1.6}
                    />

                    Ver ubicación
                  </a>
                </>
              ) : (
                <p
                  className="
                    mt-1
                    text-[9px]
                    text-[#9A817D]
                  "
                >
                  Sin ubicación configurada
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ITEM
========================================================= */

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-[13px]
        border
        border-[#A7B89A]/15
        bg-[#FBFAF7]
        px-4
        py-3.5
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-[9px]
          bg-[#EEF2EC]
          text-[#597060]
        "
      >
        <Icon
          className="h-4 w-4"
          strokeWidth={1.5}
        />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#929E99]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-[9px]
            font-medium
            leading-4
            text-[#435D61]
          "
        >
          {value || 'Sin información'}
        </p>
      </div>
    </div>
  );
}