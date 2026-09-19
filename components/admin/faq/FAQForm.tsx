'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  Eye,
  EyeOff,
  Save,
  X,
} from 'lucide-react';

import type {
  FAQ,
  FAQCategory,
} from '@/types/faq';

/* =========================================================
   PROPS
========================================================= */

interface FAQFormProps {
  faq: FAQ | null;
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSave: (faq: FAQ) => void;
}

/* =========================================================
   DATOS INICIALES
========================================================= */

const emptyFAQ: FAQ = {
  id: 0,
  question: '',
  answer: '',
  category: 'general',
  active: true,
  displayOrder: 1,
};

const categoryOptions: {
  value: FAQCategory;
  label: string;
}[] = [
  {
    value: 'general',
    label: 'General',
  },
  {
    value: 'psicoterapia',
    label: 'Psicoterapia',
  },
  {
    value: 'medicina-natural',
    label: 'Medicina Natural',
  },
];

/* =========================================================
   COMPONENTE
========================================================= */

export function FAQForm({
  faq,
  open,
  mode,
  onClose,
  onSave,
}: FAQFormProps) {
  const [formData, setFormData] =
    useState<FAQ>({
      ...emptyFAQ,
    });

  /* =======================================================
     CARGAR DATOS
  ======================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    if (
      mode === 'edit' &&
      faq
    ) {
      setFormData({
        ...faq,
      });

      return;
    }

    setFormData({
      ...emptyFAQ,
    });
  }, [
    open,
    mode,
    faq,
  ]);

  if (!open) {
    return null;
  }

  /* =======================================================
     GUARDAR
  ======================================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const question =
      formData.question.trim();

    const answer =
      formData.answer.trim();

    if (
      !question ||
      !answer
    ) {
      return;
    }

    onSave({
      ...formData,
      question,
      answer,
    });
  };

  /* =======================================================
     RENDER
  ======================================================== */

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
              Preguntas frecuentes
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
                ? 'Agregar pregunta'
                : 'Editar pregunta'}
            </h2>

            <p
              className="
                mt-1
                text-[9px]
                leading-4
                text-[#7D8B8D]
              "
            >
              {mode === 'create'
                ? 'Agrega una nueva pregunta y respuesta al sitio.'
                : 'Modifica la información de esta pregunta frecuente.'}
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
              px-5
              py-5
            "
          >
            <div className="space-y-5">

              {/* ===========================================
                  PREGUNTA
              ============================================ */}

              <div>
                <label
                  htmlFor="faq-question"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Pregunta
                </label>

                <textarea
                  id="faq-question"
                  required
                  rows={2}
                  value={formData.question}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      question:
                        event.target.value,
                    })
                  }
                  placeholder="Ej. ¿Cuánto dura una sesión?"
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

              {/* ===========================================
                  RESPUESTA
              ============================================ */}

              <div>
                <label
                  htmlFor="faq-answer"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Respuesta
                </label>

                <textarea
                  id="faq-answer"
                  required
                  rows={6}
                  value={formData.answer}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      answer:
                        event.target.value,
                    })
                  }
                  placeholder="Escribe la respuesta que aparecerá en el sitio."
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

              {/* ===========================================
                  CATEGORÍA
              ============================================ */}

              <div>
                <label
                  htmlFor="faq-category"
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Categoría
                </label>

                <select
                  id="faq-category"
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({
                      ...formData,

                      category:
                        event.target
                          .value as FAQCategory,
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
                  {categoryOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ),
                  )}
                </select>

                <p
                  className="
                    mt-1.5
                    text-[7px]
                    leading-3
                    text-[#A0AAA5]
                  "
                >
                  La categoría permite
                  filtrar las preguntas en
                  la página pública.
                </p>
              </div>

              {/* ===========================================
                  VISIBILIDAD
              ============================================ */}

              <div
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
                        formData.active
                          ? 'bg-[#A7B89A]/12 text-[#52665A]'
                          : 'bg-[#F2F1EC] text-[#8A9691]'
                      }
                    `}
                  >
                    {formData.active ? (
                      <Eye
                        className="h-4 w-4"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <EyeOff
                        className="h-4 w-4"
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
                        leading-4
                        text-[#9AA49F]
                      "
                    >
                      {formData.active
                        ? 'La pregunta se mostrará públicamente.'
                        : 'La pregunta permanecerá oculta.'}
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

              {mode === 'create'
                ? 'Agregar pregunta'
                : 'Guardar cambios'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}