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

import type { ProfileValue } from '@/types/profile';

interface ProfileValueFormProps {
  value: ProfileValue | null;
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSave: (value: ProfileValue) => void;
}

const emptyValue: ProfileValue = {
  id: 0,
  title: '',
  description: '',
  active: true,
  displayOrder: 1,
};

export function ProfileValueForm({
  value,
  open,
  mode,
  onClose,
  onSave,
}: ProfileValueFormProps) {
  const [formData, setFormData] =
    useState<ProfileValue>(emptyValue);

  useEffect(() => {
    if (!open) return;

    setFormData(
      value
        ? { ...value }
        : { ...emptyValue },
    );
  }, [value, open]);

  if (!open) return null;

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const title =
      formData.title.trim();

    const description =
      formData.description.trim();

    if (!title || !description) {
      return;
    }

    onSave({
      ...formData,
      title,
      description,
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
          w-full
          max-w-[520px]
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
                text-[23px]
                font-medium
                text-[#0F3D4A]
              "
            >
              {mode === 'create'
                ? 'Agregar valor'
                : 'Editar valor'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-[#A7B89A]/20
              text-[#718083]

              hover:bg-[#F2F1EC]
            "
          >
            <X
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
            />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div
            className="
              space-y-5
              px-5
              py-5
            "
          >
            {/* NOMBRE */}

            <div>
              <label
                htmlFor="value-title"
                className="
                  text-[9px]
                  font-semibold
                  text-[#435D61]
                "
              >
                Nombre
              </label>

              <input
                id="value-title"
                required
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    title:
                      event.target.value,
                  })
                }
                placeholder="Ej. Atención humana"
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
                htmlFor="value-description"
                className="
                  text-[9px]
                  font-semibold
                  text-[#435D61]
                "
              >
                Descripción
              </label>

              <textarea
                id="value-description"
                required
                rows={3}
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
                placeholder="Ej. Acompañamiento cercano y respetuoso."
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

            {/* VISIBILIDAD */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-5
                rounded-[12px]
                border
                border-[#A7B89A]/20
                bg-white
                px-4
                py-3
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
                  Mostrar en el sitio
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7px]
                    text-[#929E99]
                  "
                >
                  El valor puede ocultarse sin eliminarlo.
                </p>
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
                  h-6
                  w-11
                  shrink-0
                  rounded-full
                  transition-colors

                  ${
                    formData.active
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
                      formData.active
                        ? 'left-6'
                        : 'left-1'
                    }
                  `}
                />
              </button>
            </div>
          </div>

          {/* FOOTER */}

          <footer
            className="
              flex
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

              {mode === 'create'
                ? 'Agregar'
                : 'Guardar cambios'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}