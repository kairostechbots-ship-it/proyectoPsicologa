'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  CalendarCheck,
  MapPin,
  MessageCircle,
  Navigation,
  Save,
  X,
} from 'lucide-react';

import type { ContactInfo } from '@/types/contact';

interface ContactInfoFormProps {
  contact: ContactInfo;
  open: boolean;
  onClose: () => void;
  onSave: (contact: ContactInfo) => void;
}

export function ContactInfoForm({
  contact,
  open,
  onClose,
  onSave,
}: ContactInfoFormProps) {
  const [formData, setFormData] =
    useState<ContactInfo>(contact);

  useEffect(() => {
    if (!open) return;

    setFormData({
      ...contact,
      businessHours: contact.businessHours.map(
        (item) => ({ ...item }),
      ),
    });
  }, [contact, open]);

  if (!open) return null;

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    onSave({
      ...formData,
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp
        .replace(/\D/g, '')
        .trim(),
      address: formData.address.trim(),
      mapsUrl: formData.mapsUrl.trim(),
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#0F3D4A]/20
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          flex
          max-h-[88vh]
          w-full
          max-w-[620px]
          flex-col
          overflow-hidden
          rounded-[22px]
          border
          border-[#A7B89A]/20
          bg-[#FBFAF7]
          shadow-[0_24px_70px_rgba(15,61,74,0.16)]
        "
      >
        {/* HEADER */}

        <header
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-4
            border-b
            border-[#A7B89A]/15
            bg-white
            px-5
            py-4
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#B08B28]
              "
            >
              Datos públicos
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[23px]
                font-medium
                text-[#0F3D4A]
              "
            >
              Editar información de contacto
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                leading-4
                text-[#8A9691]
              "
            >
              Modifica los datos que se muestran
              a los visitantes del sitio.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-[#A7B89A]/20
              text-[#718083]
              transition-colors

              hover:bg-[#F2F1EC]
            "
          >
            <X
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
            />
          </button>
        </header>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            flex
            min-h-0
            flex-1
            flex-col
          "
        >
          <div
            className="
              min-h-0
              flex-1
              space-y-5
              overflow-y-auto
              px-5
              py-5
            "
          >
            {/* TELÉFONO + WHATSAPP */}

            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <FormField
                icon={MessageCircle}
                label="Teléfono visible"
                description="Así aparecerá escrito en el sitio."
              >
                <input
                  required
                  type="text"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phone: event.target.value,
                    })
                  }
                  placeholder="33 1139 3410"
                  className={inputClassName}
                />
              </FormField>

              <FormField
                icon={MessageCircle}
                label="Número de WhatsApp"
                description="Incluye código de país. Solo números."
              >
                <input
                  required
                  inputMode="numeric"
                  type="text"
                  value={formData.whatsapp}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      whatsapp:
                        event.target.value.replace(
                          /\D/g,
                          '',
                        ),
                    })
                  }
                  placeholder="523311393410"
                  className={inputClassName}
                />
              </FormField>
            </div>

            {/* DIRECCIÓN */}

            <FormField
              icon={MapPin}
              label="Dirección del consultorio"
              description="Dirección que se mostrará públicamente."
            >
              <textarea
                required
                rows={4}
                value={formData.address}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    address: event.target.value,
                  })
                }
                placeholder="Escribe la dirección completa..."
                className={`
                  ${inputClassName}
                  min-h-[100px]
                  resize-none
                  py-3
                  leading-5
                `}
              />
            </FormField>

            {/* MAPS */}

            <FormField
              icon={Navigation}
              label="Enlace de Google Maps"
              description="Enlace que abrirá la ubicación cuando el visitante seleccione “Cómo llegar”."
            >
              <input
                required
                type="url"
                value={formData.mapsUrl}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    mapsUrl: event.target.value,
                  })
                }
                placeholder="https://maps.app.goo.gl/..."
                className={inputClassName}
              />

              {formData.mapsUrl && (
                <a
                  href={formData.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-1.5
                    text-[8px]
                    font-semibold
                    text-[#B08B28]

                    hover:text-[#8F701D]
                  "
                >
                  <Navigation
                    className="h-3 w-3"
                    strokeWidth={1.6}
                  />

                  Probar enlace
                </a>
              )}
            </FormField>

            {/* CITA PREVIA */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                rounded-[13px]
                border
                border-[#A7B89A]/20
                bg-white
                px-4
                py-4
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
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
                  <CalendarCheck
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Atención con cita previa
                  </p>

                  <p
                    className="
                      mt-0.5
                      max-w-[350px]
                      text-[7px]
                      leading-4
                      text-[#929E99]
                    "
                  >
                    Si está activo, el sitio indicará
                    que es necesario solicitar cita
                    antes de acudir.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={
                  formData.appointmentRequired
                }
                onClick={() =>
                  setFormData({
                    ...formData,
                    appointmentRequired:
                      !formData.appointmentRequired,
                  })
                }
                className={`
                  relative
                  h-6
                  w-11
                  shrink-0
                  rounded-full
                  transition-colors

                  ${
                    formData.appointmentRequired
                      ? 'bg-[#0F3D4A]'
                      : 'bg-[#D8DDD8]'
                  }
                `}
              >
                <span
                  className={`
                    absolute
                    top-1
                    h-4
                    w-4
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-all

                    ${
                      formData.appointmentRequired
                        ? 'left-6'
                        : 'left-1'
                    }
                  `}
                />
              </button>
            </div>

            {/* NOTA MAPA */}

            <div
              className="
                rounded-[11px]
                border
                border-[#D4AF37]/15
                bg-[#FBF9F2]
                px-4
                py-3
              "
            >
              <p
                className="
                  text-[7px]
                  leading-4
                  text-[#8A7C54]
                "
              >
                El mapa que aparece dentro del sitio
                utiliza una configuración interna.
                El enlace de Google Maps se utiliza
                para que los visitantes puedan abrir
                la ubicación y obtener indicaciones.
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <footer
            className="
              flex
              shrink-0
              flex-col-reverse
              gap-2
              border-t
              border-[#A7B89A]/15
              bg-white
              px-5
              py-3.5

              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                min-h-9
                rounded-[10px]
                border
                border-[#A7B89A]/25
                px-4
                text-[9px]
                font-semibold
                text-[#5E7072]

                hover:bg-[#F6F6F2]
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                inline-flex
                min-h-9
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-[#0F3D4A]
                px-4
                text-[9px]
                font-semibold
                text-white

                hover:bg-[#174F5D]
              "
            >
              <Save
                className="
                  h-3.5
                  w-3.5
                  text-[#D8BD66]
                "
                strokeWidth={1.5}
              />

              Guardar cambios
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   CAMPO
========================================================= */

interface FormFieldProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  children: React.ReactNode;
}

function FormField({
  icon: Icon,
  label,
  description,
  children,
}: FormFieldProps) {
  return (
    <div>
      <div
        className="
          mb-1.5
          flex
          items-center
          gap-2
        "
      >
        <Icon
          className="
            h-3.5
            w-3.5
            text-[#6E8176]
          "
          strokeWidth={1.5}
        />

        <label
          className="
            text-[9px]
            font-semibold
            text-[#435D61]
          "
        >
          {label}
        </label>
      </div>

      {description && (
        <p
          className="
            mb-2
            text-[7px]
            leading-4
            text-[#929E99]
          "
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
}

/* =========================================================
   ESTILO INPUT
========================================================= */

const inputClassName = `
  h-10
  w-full
  rounded-[10px]
  border
  border-[#A7B89A]/25
  bg-white
  px-3.5
  text-[10px]
  text-[#314E53]
  outline-none
  transition-colors

  placeholder:text-[#ABB5B0]

  focus:border-[#0F3D4A]/40
  focus:ring-2
  focus:ring-[#0F3D4A]/5
`;