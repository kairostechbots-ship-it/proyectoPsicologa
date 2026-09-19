'use client';

import {
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import type {
  NaturalTechnique,
} from '@/types/natural-medicine';

interface NaturalTechniqueFormProps {
  technique: NaturalTechnique | null;
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSave: (technique: NaturalTechnique) => void;
}

function createEmptyTechnique(): NaturalTechnique {
  return {
    id: 0,
    slug: '',
    name: '',
    shortDescription: '',
    description: '',
    benefits: [''],
    featured: false,
    active: true,
    displayOrder: 1,
  };
}

export function NaturalTechniqueForm({
  technique,
  open,
  mode,
  onClose,
  onSave,
}: NaturalTechniqueFormProps) {
  const [formData, setFormData] =
    useState<NaturalTechnique>(
      createEmptyTechnique(),
    );

  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && technique) {
      setFormData({
        ...technique,
        benefits: technique.benefits
          ? [...technique.benefits]
          : [],
      });

      return;
    }

    setFormData(createEmptyTechnique());
  }, [open, mode, technique]);

  if (!open) {
    return null;
  }

  /* =========================================================
     BENEFICIOS
  ========================================================= */

  const handleBenefitChange = (
    index: number,
    value: string,
  ) => {
    const benefits = [
      ...(formData.benefits ?? []),
    ];

    benefits[index] = value;

    setFormData({
      ...formData,
      benefits,
    });
  };

  const handleAddBenefit = () => {
    setFormData({
      ...formData,
      benefits: [
        ...(formData.benefits ?? []),
        '',
      ],
    });
  };

  const handleRemoveBenefit = (
    index: number,
  ) => {
    const benefits = (
      formData.benefits ?? []
    ).filter(
      (_, benefitIndex) =>
        benefitIndex !== index,
    );

    setFormData({
      ...formData,
      benefits,
    });
  };

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

    const description =
      formData.description.trim();

    if (
      !name ||
      !shortDescription ||
      !description
    ) {
      return;
    }

    const benefits = (
      formData.benefits ?? []
    )
      .map((benefit) => benefit.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      name,
      shortDescription,
      description,
      benefits,
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
        if (
          event.target === event.currentTarget
        ) {
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
              Medicina Natural
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
              {mode === 'create'
                ? 'Agregar técnica'
                : 'Editar técnica'}
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              Administra la información que
              aparecerá en la tarjeta de la
              técnica.
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
            <div className="space-y-6">

              {/* ===========================================
                  INFORMACIÓN PRINCIPAL
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
                    Información principal
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      leading-4
                      text-[#8A9691]
                    "
                  >
                    Esta información aparece
                    inicialmente en la tarjeta.
                  </p>
                </div>

                <div className="mt-4 space-y-4">

                  {/* NOMBRE */}

                  <div>
                    <label
                      htmlFor="technique-name"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Nombre
                    </label>

                    <input
                      id="technique-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          name:
                            event.target.value,
                        })
                      }
                      placeholder="Ej. Acupuntura"
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

                  {/* DESCRIPCIÓN BREVE */}

                  <div>
                    <label
                      htmlFor="technique-short-description"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Descripción breve
                    </label>

                    <textarea
                      id="technique-short-description"
                      required
                      rows={3}
                      value={
                        formData.shortDescription
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          shortDescription:
                            event.target.value,
                        })
                      }
                      placeholder="Descripción que se mostrará inicialmente."
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
                  INFORMACIÓN DETALLADA
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
                    Información detallada
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      leading-4
                      text-[#8A9691]
                    "
                  >
                    Se muestra cuando el visitante
                    consulta más información de la
                    técnica.
                  </p>
                </div>

                <div className="mt-4 space-y-4">

                  {/* DESCRIPCIÓN COMPLETA */}

                  <div>
                    <label
                      htmlFor="technique-description"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Descripción completa
                    </label>

                    <textarea
                      id="technique-description"
                      required
                      rows={4}
                      value={
                        formData.description
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          description:
                            event.target.value,
                        })
                      }
                      placeholder="Información detallada de la técnica."
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

                  {/* BENEFICIOS */}

                  <div>
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[9px]
                            font-semibold
                            text-[#435D61]
                          "
                        >
                          Beneficios
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[8px]
                            text-[#9AA49F]
                          "
                        >
                          Puedes agregar o eliminar
                          elementos.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={
                          handleAddBenefit
                        }
                        className="
                          inline-flex
                          h-8
                          shrink-0
                          items-center
                          justify-center
                          gap-1.5
                          rounded-[9px]
                          border
                          border-[#A7B89A]/25
                          bg-white
                          px-3
                          text-[8px]
                          font-semibold
                          text-[#52665A]
                          transition-colors

                          hover:bg-[#F2F1EC]
                        "
                      >
                        <Plus
                          className="h-3 w-3"
                          strokeWidth={1.7}
                        />

                        Agregar
                      </button>
                    </div>

                    <div className="mt-3 space-y-2">
                      {(formData.benefits ?? [])
                        .map(
                          (
                            benefit,
                            index,
                          ) => (
                            <div
                              key={index}
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <input
                                type="text"
                                value={benefit}
                                onChange={(
                                  event,
                                ) =>
                                  handleBenefitChange(
                                    index,
                                    event
                                      .target
                                      .value,
                                  )
                                }
                                placeholder={`Beneficio ${
                                  index + 1
                                }`}
                                className="
                                  h-10
                                  min-w-0
                                  flex-1
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

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveBenefit(
                                    index,
                                  )
                                }
                                aria-label={`Eliminar beneficio ${
                                  index + 1
                                }`}
                                className="
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-[10px]
                                  border
                                  border-[#A7B89A]/20
                                  bg-white
                                  text-[#9A7770]
                                  transition-colors

                                  hover:border-[#C9A39A]/30
                                  hover:bg-[#FAF5F3]
                                  hover:text-[#855F57]
                                "
                              >
                                <Trash2
                                  className="h-3.5 w-3.5"
                                  strokeWidth={1.5}
                                />
                              </button>
                            </div>
                          ),
                        )}

                      {(formData.benefits ?? [])
                        .length === 0 && (
                        <div
                          className="
                            rounded-[10px]
                            border
                            border-dashed
                            border-[#A7B89A]/25
                            bg-[#F8F8F5]
                            px-4
                            py-4
                            text-center
                          "
                        >
                          <p
                            className="
                              text-[8px]
                              text-[#8A9691]
                            "
                          >
                            No hay beneficios
                            registrados.
                          </p>

                          <button
                            type="button"
                            onClick={
                              handleAddBenefit
                            }
                            className="
                              mt-2
                              text-[8px]
                              font-semibold
                              text-[#0F3D4A]
                            "
                          >
                            + Agregar beneficio
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* ===========================================
                  CONFIGURACIÓN
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
                    Configuración
                  </p>
                </div>

                <div className="mt-4 space-y-3">

                  {/* ORDEN */}

                  <div>
                    <label
                      htmlFor="technique-order"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Orden de aparición
                    </label>

                    <input
                      id="technique-order"
                      type="number"
                      min="1"
                      step="1"
                      value={
                        formData.displayOrder
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          displayOrder:
                            Math.max(
                              1,
                              Number(
                                event.target
                                  .value,
                              ) || 1,
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
                            formData.active
                              ? 'bg-[#A7B89A]/12 text-[#52665A]'
                              : 'bg-[#F2F1EC] text-[#8A9691]'
                          }
                        `}
                      >
                        {formData.active ? (
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
                          {formData.active
                            ? 'La técnica se muestra públicamente.'
                            : 'La técnica está oculta.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={
                        formData.active
                      }
                      onClick={() =>
                        setFormData({
                          ...formData,
                          active:
                            !formData.active,
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
                          formData.active
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
                            formData.active
                              ? 'left-[21px]'
                              : 'left-[3px]'
                          }
                        `}
                      />
                    </button>
                  </div>
                </div>
              </section>
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

              {mode === 'create'
                ? 'Agregar técnica'
                : 'Guardar cambios'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}