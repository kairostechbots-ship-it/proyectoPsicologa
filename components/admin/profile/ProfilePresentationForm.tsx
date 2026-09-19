'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  Save,
  X,
} from 'lucide-react';

import type { ProfessionalProfile } from '@/types/profile';

interface ProfilePresentationFormProps {
  profile: ProfessionalProfile;
  open: boolean;
  onClose: () => void;
  onSave: (profile: ProfessionalProfile) => void;
}

export function ProfilePresentationForm({
  profile,
  open,
  onClose,
  onSave,
}: ProfilePresentationFormProps) {
  const [formData, setFormData] =
    useState<ProfessionalProfile>(profile);

  useEffect(() => {
    if (!open) {
      return;
    }

    setFormData({
      ...profile,
      biography: [...profile.biography],
    });
  }, [open, profile]);

  if (!open) {
    return null;
  }

  /* =========================================================
     BIOGRAFÍA
  ========================================================= */

  const updateBiography = (
    index: number,
    value: string,
  ) => {
    const biography = [
      ...formData.biography,
    ];

    biography[index] = value;

    setFormData({
      ...formData,
      biography,
    });
  };

  /* =========================================================
     GUARDAR
  ========================================================= */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const heroTitle =
      formData.heroTitle.trim();

    const heroHighlight =
      formData.heroHighlight.trim();

    if (
      !formData.name.trim() ||
      !formData.professionalTitle.trim() ||
      !heroTitle ||
      !formData.therapeuticApproach.trim()
    ) {
      return;
    }

    /*
      El texto destacado debe existir dentro del título.
      Si no coincide, lo dejamos vacío para evitar que el
      sitio público intente destacar una frase inexistente.
    */
    const validHighlight =
      heroHighlight &&
      heroTitle
        .toLocaleLowerCase('es')
        .includes(
          heroHighlight.toLocaleLowerCase('es'),
        )
        ? heroHighlight
        : '';

    onSave({
      ...formData,

      name: formData.name.trim(),

      professionalTitle:
        formData.professionalTitle.trim(),

      therapeuticApproach:
        formData.therapeuticApproach.trim(),

      heroTitle,

      heroHighlight: validHighlight,

      biography: formData.biography
        .map((paragraph) =>
          paragraph.trim(),
        )
        .filter(Boolean),
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
          event.target ===
          event.currentTarget
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
        {/* ===================================================
            HEADER
        ==================================================== */}

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
              Perfil profesional
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
              Editar presentación
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              Esta información aparece en la sección
              “Quién soy” del sitio.
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

        {/* ===================================================
            FORM
        ==================================================== */}

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
              px-5
              py-5
            "
          >
            <div className="space-y-6">
              {/* =============================================
                  DATOS PROFESIONALES
              ============================================== */}

              <section>
                <div
                  className="
                    mb-4
                    border-b
                    border-[#A7B89A]/15
                    pb-2.5
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#B08B28]
                    "
                  >
                    Información profesional
                  </p>
                </div>

                <div
                  className="
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Nombre
                    </label>

                    <input
                      id="profile-name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          name:
                            event.target.value,
                        })
                      }
                      placeholder="Erika Pilar"
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
                      htmlFor="professional-title"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Título profesional
                    </label>

                    <input
                      id="professional-title"
                      required
                      type="text"
                      value={
                        formData.professionalTitle
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          professionalTitle:
                            event.target.value,
                        })
                      }
                      placeholder="Psicóloga Clínica"
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
                      htmlFor="years-experience"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Años de trayectoria
                    </label>

                    <input
                      id="years-experience"
                      required
                      type="number"
                      min={0}
                      max={99}
                      value={
                        formData.yearsExperience
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          yearsExperience:
                            Number(
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
                      htmlFor="therapeutic-approach"
                      className="
                        text-[9px]
                        font-semibold
                        text-[#435D61]
                      "
                    >
                      Enfoque terapéutico
                    </label>

                    <input
                      id="therapeutic-approach"
                      required
                      type="text"
                      value={
                        formData.therapeuticApproach
                      }
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          therapeuticApproach:
                            event.target.value,
                        })
                      }
                      placeholder="TCC"
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
                </div>
              </section>

              {/* =============================================
                  FRASE PRINCIPAL
              ============================================== */}

              <section>
                <div
                  className="
                    mb-4
                    border-b
                    border-[#A7B89A]/15
                    pb-2.5
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#B08B28]
                    "
                  >
                    Mensaje principal
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="hero-title"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Frase de presentación
                  </label>

                  <textarea
                    id="hero-title"
                    required
                    rows={3}
                    value={formData.heroTitle}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        heroTitle:
                          event.target.value,
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

                <div className="mt-4">
                  <label
                    htmlFor="hero-highlight"
                    className="
                      text-[9px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Texto destacado
                  </label>

                  <input
                    id="hero-highlight"
                    type="text"
                    value={
                      formData.heroHighlight
                    }
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        heroHighlight:
                          event.target.value,
                      })
                    }
                    placeholder="primer paso"
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

                  <p
                    className="
                      mt-1.5
                      text-[7px]
                      leading-3
                      text-[#A0AAA5]
                    "
                  >
                    Escribe una parte exacta de la frase
                    anterior. Esa parte aparecerá en cursiva.
                  </p>
                </div>
              </section>

              {/* =============================================
                  BIOGRAFÍA
              ============================================== */}

              <section>
                <div
                  className="
                    mb-4
                    border-b
                    border-[#A7B89A]/15
                    pb-2.5
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#B08B28]
                    "
                  >
                    Biografía
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.biography.map(
                    (paragraph, index) => (
                      <div key={index}>
                        <label
                          htmlFor={`biography-${index}`}
                          className="
                            text-[9px]
                            font-semibold
                            text-[#435D61]
                          "
                        >
                          Párrafo {index + 1}
                        </label>

                        <textarea
                          id={`biography-${index}`}
                          rows={4}
                          value={paragraph}
                          onChange={(event) =>
                            updateBiography(
                              index,
                              event.target.value,
                            )
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
                    ),
                  )}
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
                transition-colors

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
                transition-colors

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