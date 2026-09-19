'use client';

import { useState } from 'react';
import {
  Clock3,
  MapPin,
  MessageCircle,
} from 'lucide-react';

import { ContactInfoCard } from '@/components/admin/contact/ContactInfoCard';
import { ContactInfoForm } from '@/components/admin/contact/ContactInfoForm';
import { BusinessHoursCard } from '@/components/admin/contact/BusinessHoursCard';

import { contactMock } from '@/data/contact.mock';

import type {
  BusinessHours,
  ContactInfo,
} from '@/types/contact';

/* =========================================================
   HELPERS
========================================================= */

function cloneContact(
  contact: ContactInfo,
): ContactInfo {
  return {
    ...contact,

    businessHours:
      contact.businessHours.map(
        (item) => ({ ...item }),
      ),
  };
}

function countActiveDays(
  hours: BusinessHours[],
) {
  return hours.filter(
    (item) => item.enabled,
  ).length;
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminContactPage() {
  /*
   * Información actualmente guardada.
   *
   * TODO API:
   * Sustituir contactMock por:
   * GET /api/contact
   */
  const [contact, setContact] =
    useState<ContactInfo>(() =>
      cloneContact(contactMock),
    );

  /*
   * Los horarios tienen un estado temporal
   * separado para permitir "Descartar cambios".
   */
  const [
    draftHours,
    setDraftHours,
  ] = useState<BusinessHours[]>(() =>
    contactMock.businessHours.map(
      (item) => ({ ...item }),
    ),
  );

  const [
    contactFormOpen,
    setContactFormOpen,
  ] = useState(false);

  /* =======================================================
     INFORMACIÓN DE CONTACTO
  ======================================================== */

  const handleSaveContact = (
    updatedContact: ContactInfo,
  ) => {
    /*
     * Conservamos los horarios actualmente
     * guardados desde esta página.
     *
     * ContactInfoForm no administra horarios.
     */
    setContact((current) => ({
      ...updatedContact,

      businessHours:
        current.businessHours.map(
          (item) => ({ ...item }),
        ),
    }));

    setContactFormOpen(false);

    /*
     * TODO API:
     *
     * PATCH /api/contact
     *
     * body:
     * {
     *   phone,
     *   whatsapp,
     *   address,
     *   mapsUrl,
     *   appointmentRequired
     * }
     */
  };

  /* =======================================================
     HORARIOS
  ======================================================== */

  const handleSaveHours = () => {
    const cleanHours =
      draftHours.map((item) => ({
        ...item,

        /*
         * Si el día está cerrado, mantenemos
         * las horas vacías en el dato guardado.
         */
        startTime: item.enabled
          ? item.startTime
          : '',

        endTime: item.enabled
          ? item.endTime
          : '',
      }));

    /*
     * Validación básica:
     * los días activos necesitan ambas horas.
     */
    const invalidDay =
      cleanHours.find(
        (item) =>
          item.enabled &&
          (!item.startTime ||
            !item.endTime),
      );

    if (invalidDay) {
      window.alert(
        `Completa el horario de ${invalidDay.day}.`,
      );

      return;
    }

    /*
     * Validamos que la hora final sea
     * posterior a la inicial.
     *
     * En formato HH:mm podemos comparar
     * directamente las cadenas.
     */
    const invalidRange =
      cleanHours.find(
        (item) =>
          item.enabled &&
          item.endTime <=
            item.startTime,
      );

    if (invalidRange) {
      window.alert(
        `Revisa el horario de ${invalidRange.day}. La hora de cierre debe ser posterior a la hora de inicio.`,
      );

      return;
    }

    setContact((current) => ({
      ...current,

      businessHours:
        cleanHours.map(
          (item) => ({ ...item }),
        ),
    }));

    setDraftHours(
      cleanHours.map(
        (item) => ({ ...item }),
      ),
    );

    /*
     * TODO API:
     *
     * PUT /api/contact/business-hours
     *
     * body:
     * {
     *   businessHours: cleanHours
     * }
     */
  };

  const handleResetHours = () => {
    setDraftHours(
      contact.businessHours.map(
        (item) => ({ ...item }),
      ),
    );
  };

  /* =======================================================
     RESUMEN
  ======================================================== */

  const activeDays =
    countActiveDays(
      contact.businessHours,
    );

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1380px]
        space-y-6
      "
    >
      {/* ===================================================
          ENCABEZADO
      ==================================================== */}

      <section>
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#B08B28]
          "
        >
          Información
        </p>

        <h1
          className="
            mt-1
            font-serif
            text-[28px]
            font-medium
            tracking-[-0.02em]
            text-[#0F3D4A]

            sm:text-[32px]
          "
        >
          Contacto y horarios
        </h1>

        <p
          className="
            mt-1
            max-w-[650px]
            text-[10px]
            leading-5
            text-[#7D8B8D]
          "
        >
          Administra los datos de
          contacto, ubicación del
          consultorio y horarios
          habituales de atención.
        </p>
      </section>

      {/* ===================================================
          RESUMEN
      ==================================================== */}

      <section
        className="
          grid
          gap-3

          sm:grid-cols-3
        "
      >
        <SummaryCard
          icon={MessageCircle}
          label="WhatsApp"
          value={contact.phone}
        />

        <SummaryCard
          icon={Clock3}
          label="Días de atención"
          value={`${activeDays} ${
            activeDays === 1
              ? 'día'
              : 'días'
          }`}
        />

        <SummaryCard
          icon={MapPin}
          label="Consultorio"
          value={
            contact.mapsUrl
              ? 'Ubicación configurada'
              : 'Sin ubicación'
          }
        />
      </section>

      {/* ===================================================
          INFORMACIÓN
      ==================================================== */}

      <ContactInfoCard
        contact={contact}
        onEdit={() =>
          setContactFormOpen(true)
        }
      />

      {/* ===================================================
          HORARIOS
      ==================================================== */}

      <BusinessHoursCard
        hours={draftHours}
        onChange={setDraftHours}
        onSave={handleSaveHours}
        onReset={handleResetHours}
      />

      {/* ===================================================
          AVISO
      ==================================================== */}

      <div
        className="
          rounded-[14px]
          border
          border-[#D4AF37]/15
          bg-[#FBF9F2]
          px-4
          py-3
        "
      >
        <p
          className="
            text-[8px]
            leading-4
            text-[#8A7C54]
          "
        >
          Los cambios realizados
          actualmente se conservan solo
          durante esta sesión del
          administrador. Cuando se
          conecte la API, esta información
          podrá almacenarse de forma
          permanente.
        </p>
      </div>

      {/* ===================================================
          MODAL CONTACTO
      ==================================================== */}

      <ContactInfoForm
        contact={contact}
        open={contactFormOpen}
        onClose={() =>
          setContactFormOpen(false)
        }
        onSave={handleSaveContact}
      />
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-[14px]
        border
        border-[#A7B89A]/15
        bg-white
        px-4
        py-3.5
        shadow-[0_8px_25px_rgba(15,61,74,0.02)]
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
            mt-0.5
            truncate
            text-[10px]
            font-semibold
            text-[#314E53]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}