'use client';

import {
  Eye,
  EyeOff,
  Save,
  X,
} from 'lucide-react';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import type { Promotion } from '@/types/promotion';

interface PromotionFormProps {
  promotion: Promotion | null;
  open: boolean;
  onClose: () => void;
  onSave: (promotion: Promotion) => void;
}

export function PromotionForm({
  promotion,
  open,
  onClose,
  onSave,
}: PromotionFormProps) {
  const [formData, setFormData] =
    useState<Promotion | null>(null);

  useEffect(() => {
    if (open && promotion) {
      setFormData({
        ...promotion,
      });
    }
  }, [open, promotion]);

  if (!open || !formData) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!formData.nombre.trim()) {
      return;
    }

    if (!formData.descripcion.trim()) {
      return;
    }

    onSave({
      ...formData,
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      frecuencia: formData.frecuencia.trim(),
      condiciones: formData.condiciones.trim(),
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
          max-w-[580px]
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
              Promoción
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[24px]
                font-medium
                leading-tight
                text-[#0F3D4A]
              "
            >
              Editar promoción
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              Modifica la información que se muestra
              en el sitio web.
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

        {/* FORMULARIO */}

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
              overflow-y-auto
              overscroll-contain
              px-5
              py-5
            "
          >
            <div className="space-y-4">

              {/* NOMBRE */}

              <div>
                <label
                  htmlFor="promotion-name"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Nombre
                </label>

                <input
                  id="promotion-name"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      nombre: event.target.value,
                    })
                  }
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

                    focus:border-[#0F3D4A]/40
                    focus:ring-2
                    focus:ring-[#0F3D4A]/5
                  "
                />
              </div>

              {/* DESCRIPCIÓN */}

              <div>
                <label
                  htmlFor="promotion-description"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Descripción
                </label>

                <textarea
                  id="promotion-description"
                  required
                  rows={4}
                  value={formData.descripcion}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      descripcion: event.target.value,
                    })
                  }
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

                    focus:border-[#0F3D4A]/40
                    focus:ring-2
                    focus:ring-[#0F3D4A]/5
                  "
                />
              </div>

              {/* SESIONES + PRECIO */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  sm:grid-cols-2
                "
              >
                <div>
                  <label
                    htmlFor="promotion-sessions"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Número de sesiones
                  </label>

                  <input
                    id="promotion-sessions"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={formData.sesiones}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        sesiones: Number(
                          event.target.value,
                        ),
                      })
                    }
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

                      focus:border-[#0F3D4A]/40
                      focus:ring-2
                      focus:ring-[#0F3D4A]/5
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="promotion-price"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Precio del paquete
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

                      focus-within:border-[#0F3D4A]/40
                      focus-within:ring-2
                      focus-within:ring-[#0F3D4A]/5
                    "
                  >
                    <div
                      className="
                        flex
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        border-r
                        border-[#A7B89A]/15
                        bg-[#F6F6F2]
                        text-[10px]
                        font-semibold
                        text-[#52665A]
                      "
                    >
                      $
                    </div>

                    <input
                      id="promotion-price"
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={formData.precio}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          precio: Number(
                            event.target.value,
                          ),
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
                        shrink-0
                        items-center
                        border-l
                        border-[#A7B89A]/15
                        bg-[#F6F6F2]
                        px-3
                        text-[8px]
                        font-semibold
                        text-[#8A9691]
                      "
                    >
                      MXN
                    </div>
                  </div>
                </div>
              </div>

              {/* FRECUENCIA */}

              <div>
                <label
                  htmlFor="promotion-frequency"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Frecuencia
                </label>

                <input
                  id="promotion-frequency"
                  type="text"
                  required
                  value={formData.frecuencia}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      frecuencia: event.target.value,
                    })
                  }
                  placeholder="Ej. 1 sesión por semana"
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

              {/* EXCLUSIÓN */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-3
                  rounded-[12px]
                  border
                  border-[#A7B89A]/20
                  bg-white
                  px-4
                  py-3
                "
              >
                <input
                  type="checkbox"
                  checked={
                    formData.excluyeTerapiaPareja
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      excluyeTerapiaPareja:
                        event.target.checked,
                    })
                  }
                  className="
                    mt-0.5
                    h-4
                    w-4
                    accent-[#0F3D4A]
                  "
                />

                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Excluir terapia de pareja
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      leading-4
                      text-[#9AA49F]
                    "
                  >
                    La promoción no se mostrará como
                    aplicable a terapia de pareja.
                  </p>
                </div>
              </label>

              {/* CONDICIONES */}

              <div>
                <label
                  htmlFor="promotion-conditions"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Condiciones
                </label>

                <textarea
                  id="promotion-conditions"
                  rows={3}
                  value={formData.condiciones}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      condiciones: event.target.value,
                    })
                  }
                  placeholder="Escribe las condiciones de la promoción."
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

              {/* VISIBILIDAD */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-[12px]
                  border
                  border-[#A7B89A]/20
                  bg-white
                  px-4
                  py-3
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
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-[9px]

                      ${
                        formData.activo
                          ? 'bg-[#A7B89A]/12 text-[#52665A]'
                          : 'bg-[#F2F1EC] text-[#8A9691]'
                      }
                    `}
                  >
                    {formData.activo ? (
                      <Eye
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <EyeOff
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Visible en el sitio
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[8px]
                        text-[#9AA49F]
                      "
                    >
                      {formData.activo
                        ? 'La promoción se muestra públicamente.'
                        : 'La promoción está oculta.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.activo}
                  aria-label="Cambiar visibilidad de la promoción"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      activo: !formData.activo,
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
                      formData.activo
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
                        formData.activo
                          ? 'left-[21px]'
                          : 'left-[3px]'
                      }
                    `}
                  />
                </button>
              </div>
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