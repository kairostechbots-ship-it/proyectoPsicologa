'use client';

import {
  Baby,
  Brain,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import type { Service } from '@/types/psychotherapy';

interface PsychotherapyServiceFormProps {
  service: Service | null;
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSave: (service: Service) => void;
}

const iconOptions = [
  {
    value: 'child',
    label: 'Infantil',
    icon: Baby,
  },
  {
    value: 'brain',
    label: 'Individual',
    icon: Brain,
  },
  {
    value: 'users',
    label: 'Pareja / grupo',
    icon: Users,
  },
  {
    value: 'sparkles',
    label: 'Bienestar',
    icon: Sparkles,
  },
];

const emptyService: Service = {
  id: 0,
  tipo: 'psicoterapia',
  slug: '',
  nombre: '',
  descripcion: '',
  icono: 'brain',
  modalidad: 'Presencial y en línea',
  precio: 400,
  duracion: '55–60 min',
  activo: true,
  orden: 1,
};

export function PsychotherapyServiceForm({
  service,
  open,
  mode,
  onClose,
  onSave,
}: PsychotherapyServiceFormProps) {
  const [formData, setFormData] =
    useState<Service>(emptyService);

  /* =========================================================
     CARGAR INFORMACIÓN
  ========================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === 'edit' && service) {
      setFormData({
        ...service,
      });

      return;
    }

    setFormData({
      ...emptyService,
    });
  }, [open, mode, service]);

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
    });
  };

  const isCreate = mode === 'create';

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
        {/* =================================================
            HEADER
        ================================================== */}

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
              Psicoterapia
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
              {isCreate
                ? 'Nuevo servicio'
                : 'Editar servicio'}
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              {isCreate
                ? 'Agrega un nuevo servicio de psicoterapia al sitio web.'
                : 'Modifica la información que se mostrará en el sitio web.'}
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

        {/* =================================================
            FORMULARIO
        ================================================== */}

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

              {/* =============================================
                  NOMBRE
              ============================================== */}

              <div>
                <label
                  htmlFor="nombre"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Nombre del servicio
                </label>

                <input
                  id="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      nombre: event.target.value,
                    })
                  }
                  placeholder="Ej. Psicoterapia familiar"
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
                    transition

                    placeholder:text-[#A0AAA5]

                    focus:border-[#0F3D4A]/40
                    focus:ring-2
                    focus:ring-[#0F3D4A]/5
                  "
                />
              </div>

              {/* =============================================
                  DESCRIPCIÓN
              ============================================== */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <label
                    htmlFor="descripcion"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Descripción
                  </label>

                  <span
                    className="
                      text-[8px]
                      text-[#9AA49F]
                    "
                  >
                    {formData.descripcion.length}{' '}
                    caracteres
                  </span>
                </div>

                <textarea
                  id="descripcion"
                  required
                  rows={4}
                  value={formData.descripcion}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      descripcion:
                        event.target.value,
                    })
                  }
                  placeholder="Describe brevemente este servicio."
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
                    transition

                    placeholder:text-[#A0AAA5]

                    focus:border-[#0F3D4A]/40
                    focus:ring-2
                    focus:ring-[#0F3D4A]/5
                  "
                />
              </div>

              {/* =============================================
                  ICONO
              ============================================== */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Icono
                </p>

                <div
                  className="
                    mt-1.5
                    grid
                    grid-cols-2
                    gap-2

                    sm:grid-cols-4
                  "
                >
                  {iconOptions.map((option) => {
                    const Icon = option.icon;

                    const selected =
                      formData.icono ===
                      option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            icono:
                              option.value,
                          })
                        }
                        className={`
                          flex
                          min-h-[66px]
                          flex-col
                          items-center
                          justify-center
                          gap-1.5
                          rounded-[10px]
                          border
                          px-2
                          py-2
                          transition-all

                          ${
                            selected
                              ? `
                                border-[#0F3D4A]/35
                                bg-[#0F3D4A]/[0.05]
                                text-[#0F3D4A]
                              `
                              : `
                                border-[#A7B89A]/20
                                bg-white
                                text-[#7A8983]

                                hover:border-[#A7B89A]/40
                                hover:bg-[#F8F8F4]
                              `
                          }
                        `}
                      >
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.5}
                        />

                        <span
                          className="
                            text-center
                            text-[8px]
                            font-medium
                            leading-3
                          "
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =============================================
                  PRECIO + DURACIÓN
              ============================================== */}

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
                    htmlFor="precio"
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
                      id="precio"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.precio ?? ''}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          precio:
                            event.target.value === ''
                              ? undefined
                              : Number(
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

                <div>
                  <label
                    htmlFor="duracion"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Duración
                  </label>

                  <input
                    id="duracion"
                    type="text"
                    value={formData.duracion ?? ''}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        duracion:
                          event.target.value,
                      })
                    }
                    placeholder="Ej. 55–60 min"
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
              </div>

              {/* =============================================
                  MODALIDAD
              ============================================== */}

              <div>
                <label
                  htmlFor="modalidad"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Modalidad
                </label>

                <select
                  id="modalidad"
                  value={formData.modalidad ?? ''}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      modalidad:
                        event.target.value,
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
                >
                  <option value="">
                    Sin especificar
                  </option>

                  <option value="Presencial">
                    Presencial
                  </option>

                  <option value="En línea">
                    En línea
                  </option>

                  <option value="Presencial y en línea">
                    Presencial y en línea
                  </option>
                </select>
              </div>

              {/* =============================================
                  VISIBILIDAD
              ============================================== */}

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
                        ? 'El servicio se muestra públicamente.'
                        : 'El servicio está oculto.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.activo}
                  aria-label="Cambiar visibilidad"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      activo:
                        !formData.activo,
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

          {/* =================================================
              FOOTER
          ================================================== */}

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

              {isCreate
                ? 'Crear servicio'
                : 'Guardar cambios'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}