'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  CalendarCheck,
  Clock3,
  Save,
  X,
} from 'lucide-react';

import type {
  NaturalMedicineConsultation,
} from '@/types/natural-medicine';

interface NaturalConsultationFormProps {
  consultation: NaturalMedicineConsultation;
  open: boolean;
  onClose: () => void;
  onSave: (
    consultation: NaturalMedicineConsultation,
  ) => void;
}

export function NaturalConsultationForm({
  consultation,
  open,
  onClose,
  onSave,
}: NaturalConsultationFormProps) {
  const [formData, setFormData] =
    useState<NaturalMedicineConsultation>({
      ...consultation,
    });

  useEffect(() => {
    if (!open) return;

    setFormData({
      ...consultation,
      techniques: consultation.techniques,
    });
  }, [open, consultation]);

  if (!open) {
    return null;
  }

  /* =========================================================
     GUARDAR
  ========================================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const name = formData.name.trim();
    const shortDescription =
      formData.shortDescription.trim();

    if (!name || !shortDescription) {
      return;
    }

    onSave({
      ...formData,
      name,
      shortDescription,
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
          max-h-[86vh]
          w-full
          max-w-[560px]
          flex-col
          overflow-hidden
          rounded-[22px]
          border
          border-[#A7B89A]/20
          bg-[#FBFAF7]
          shadow-[0_24px_70px_rgba(15,61,74,0.16)]
        "
      >
        {/* ===============================================
            HEADER
        ================================================ */}

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
              Medicina Natural
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[24px]
                font-medium
                text-[#0F3D4A]
              "
            >
              Editar consulta
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              Modifica la información general
              de la consulta de Medicina Natural.
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
              bg-[#FBFAF7]
              text-[#718083]
              transition-colors

              hover:bg-[#F2F1EC]
              hover:text-[#0F3D4A]
            "
          >
            <X
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
            />
          </button>
        </header>

        {/* ===============================================
            FORM
        ================================================ */}

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
            {/* ===========================================
                INFORMACIÓN GENERAL
            ============================================ */}

            <section>
              <div
                className="
                  border-b
                  border-[#A7B89A]/15
                  pb-3
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold
                    text-[#0F3D4A]
                  "
                >
                  Información general
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    leading-4
                    text-[#8A9691]
                  "
                >
                  Esta información se utiliza en
                  la sección pública de Medicina
                  Natural.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {/* NOMBRE */}

                <div>
                  <label
                    htmlFor="consultation-name"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Nombre de la consulta
                  </label>

                  <input
                    id="consultation-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
                    placeholder="Consulta de Medicina Natural"
                    className="
                      mt-1.5
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

                      placeholder:text-[#A0AAA5]

                      focus:border-[#0F3D4A]/40
                      focus:ring-2
                      focus:ring-[#0F3D4A]/5
                    "
                  />
                </div>

                {/* DESCRIPCIÓN */}

                <div>
                  <label
                    htmlFor="consultation-description"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Descripción
                  </label>

                  <textarea
                    id="consultation-description"
                    required
                    rows={4}
                    value={formData.shortDescription}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        shortDescription:
                          event.target.value,
                      })
                    }
                    placeholder="Describe brevemente la consulta."
                    className="
                      mt-1.5
                      w-full
                      resize-none
                      rounded-[10px]
                      border
                      border-[#A7B89A]/25
                      bg-white
                      px-3.5
                      py-3
                      text-[10px]
                      leading-5
                      text-[#314E53]
                      outline-none

                      placeholder:text-[#A0AAA5]

                      focus:border-[#0F3D4A]/40
                      focus:ring-2
                      focus:ring-[#0F3D4A]/5
                    "
                  />
                </div>
              </div>
            </section>

            {/* ===========================================
                DATOS DE LA CONSULTA
            ============================================ */}

            <section>
              <div
                className="
                  border-b
                  border-[#A7B89A]/15
                  pb-3
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold
                    text-[#0F3D4A]
                  "
                >
                  Datos de la consulta
                </p>
              </div>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-4

                  sm:grid-cols-2
                "
              >
                {/* PRECIO */}

                <div>
                  <label
                    htmlFor="consultation-price"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Precio
                  </label>

                  <div
                    className="
                      mt-1.5
                      flex
                      h-10
                      overflow-hidden
                      rounded-[10px]
                      border
                      border-[#A7B89A]/25
                      bg-white
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        border-r
                        border-[#A7B89A]/20
                        bg-[#F7F7F3]
                        px-3
                        text-[10px]
                        font-semibold
                        text-[#52665A]
                      "
                    >
                      $
                    </div>

                    <input
                      id="consultation-price"
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={formData.price}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          price:
                            Number(
                              event.target.value,
                            ) || 0,
                        })
                      }
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-3
                        text-[10px]
                        text-[#314E53]
                        outline-none
                      "
                    />

                    <div
                      className="
                        flex
                        items-center
                        border-l
                        border-[#A7B89A]/20
                        bg-[#F7F7F3]
                        px-3
                        text-[7px]
                        font-semibold
                        text-[#8A9691]
                      "
                    >
                      MXN
                    </div>
                  </div>
                </div>

                {/* DURACIÓN */}

                <div>
                  <label
                    htmlFor="consultation-duration"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Duración
                  </label>

                  <div
                    className="
                      mt-1.5
                      flex
                      h-10
                      overflow-hidden
                      rounded-[10px]
                      border
                      border-[#A7B89A]/25
                      bg-white
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        border-r
                        border-[#A7B89A]/20
                        bg-[#F7F7F3]
                        px-3
                      "
                    >
                      <Clock3
                        className="
                          h-3.5
                          w-3.5
                          text-[#718083]
                        "
                        strokeWidth={1.5}
                      />
                    </div>

                    <input
                      id="consultation-duration"
                      type="number"
                      min="1"
                      step="1"
                      value={
                        formData.durationMinutes ?? ''
                      }
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setFormData({
                          ...formData,
                          durationMinutes:
                            value === ''
                              ? null
                              : Number(value),
                        });
                      }}
                      placeholder="Sin definir"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-3
                        text-[10px]
                        text-[#314E53]
                        outline-none

                        placeholder:text-[#A0AAA5]
                      "
                    />

                    <div
                      className="
                        flex
                        items-center
                        border-l
                        border-[#A7B89A]/20
                        bg-[#F7F7F3]
                        px-3
                        text-[7px]
                        font-semibold
                        text-[#8A9691]
                      "
                    >
                      MIN
                    </div>
                  </div>

                  <p
                    className="
                      mt-1.5
                      text-[7px]
                      leading-3
                      text-[#A0AAA5]
                    "
                  >
                    Déjalo vacío si la duración
                    todavía no está definida.
                  </p>
                </div>
              </div>
            </section>

            {/* ===========================================
                CITA PREVIA
            ============================================ */}

            <section
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-[13px]
                border
                border-[#A7B89A]/20
                bg-white
                px-4
                py-3.5
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]

                    ${
                      formData.appointmentRequired
                        ? 'bg-[#A7B89A]/12 text-[#52665A]'
                        : 'bg-[#F2F1EC] text-[#8A9691]'
                    }
                  `}
                >
                  <CalendarCheck
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Requiere cita previa
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      leading-4
                      text-[#9AA49F]
                    "
                  >
                    {formData.appointmentRequired
                      ? 'Se mostrará “Previa cita” en el sitio.'
                      : 'No se mostrará el indicador de cita previa.'}
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
                  h-[22px]
                  w-10
                  shrink-0
                  rounded-full
                  transition-colors

                  ${
                    formData.appointmentRequired
                      ? 'bg-[#0F3D4A]'
                      : 'bg-[#D9DEDA]'
                  }
                `}
              >
                <span
                  className={`
                    absolute
                    top-[3px]
                    h-4
                    w-4
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-all

                    ${
                      formData.appointmentRequired
                        ? 'left-[21px]'
                        : 'left-[3px]'
                    }
                  `}
                />
              </button>
            </section>
          </div>

          {/* ===============================================
              FOOTER
          ================================================ */}

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
              sm:items-center
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
                bg-white
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