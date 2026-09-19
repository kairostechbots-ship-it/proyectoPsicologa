'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  CalendarCheck,
  Clock3,
  Edit3,
  Leaf,
  Plus,
} from 'lucide-react';

import { NaturalConsultationForm } from '@/components/admin/natural-medicine/NaturalConsultationForm';
import { NaturalTechniqueCard } from '@/components/admin/natural-medicine/NaturalTechniqueCard';
import { NaturalTechniqueForm } from '@/components/admin/natural-medicine/NaturalTechniqueForm';

import { naturalMedicineMock } from '@/data/natural-medicine.mock';

import type {
  NaturalMedicineConsultation,
  NaturalTechnique,
} from '@/types/natural-medicine';

/* =========================================================
   HELPERS
========================================================= */

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* =========================================================
   PAGE
========================================================= */

export default function NaturalMedicinePage() {
  /* =======================================================
     ESTADO GENERAL
  ======================================================== */

  const [consultation, setConsultation] =
    useState<NaturalMedicineConsultation>({
      ...naturalMedicineMock,

      techniques:
        naturalMedicineMock.techniques.map(
          (technique) => ({
            ...technique,

            benefits: technique.benefits
              ? [...technique.benefits]
              : [],
          }),
        ),
    });

  /* =======================================================
     FORMULARIO DE TÉCNICA
  ======================================================== */

  const [
    selectedTechnique,
    setSelectedTechnique,
  ] =
    useState<NaturalTechnique | null>(
      null,
    );

  const [
    techniqueFormOpen,
    setTechniqueFormOpen,
  ] = useState(false);

  const [
    techniqueFormMode,
    setTechniqueFormMode,
  ] =
    useState<'create' | 'edit'>(
      'create',
    );

  /* =======================================================
     FORMULARIO DE CONSULTA
  ======================================================== */

  const [
    consultationFormOpen,
    setConsultationFormOpen,
  ] = useState(false);

  /* =======================================================
     TÉCNICAS ORDENADAS
  ======================================================== */

  const techniques = useMemo(
    () =>
      [...consultation.techniques].sort(
        (a, b) =>
          a.displayOrder -
          b.displayOrder,
      ),
    [consultation.techniques],
  );

  /* =======================================================
     RESUMEN
  ======================================================== */

  const activeTechniques =
    techniques.filter(
      (technique) =>
        technique.active,
    ).length;

  const inactiveTechniques =
    techniques.length -
    activeTechniques;

  /* =======================================================
     AGREGAR TÉCNICA
  ======================================================== */

  const handleAddTechnique = () => {
    setSelectedTechnique(null);

    setTechniqueFormMode(
      'create',
    );

    setTechniqueFormOpen(true);
  };

  /* =======================================================
     EDITAR TÉCNICA
  ======================================================== */

  const handleEditTechnique = (
    technique: NaturalTechnique,
  ) => {
    setSelectedTechnique({
      ...technique,

      benefits: technique.benefits
        ? [...technique.benefits]
        : [],
    });

    setTechniqueFormMode(
      'edit',
    );

    setTechniqueFormOpen(true);
  };

  /* =======================================================
     CERRAR FORMULARIO DE TÉCNICA
  ======================================================== */

  const handleCloseTechniqueForm =
    () => {
      setTechniqueFormOpen(
        false,
      );

      setSelectedTechnique(
        null,
      );
    };

  /* =======================================================
     GUARDAR TÉCNICA
  ======================================================== */

  const handleSaveTechnique = (
    technique: NaturalTechnique,
  ) => {
    /* -----------------------------------------------------
       EDITAR
    ------------------------------------------------------ */

    if (
      techniqueFormMode ===
      'edit'
    ) {
      setConsultation(
        (
          currentConsultation,
        ) => ({
          ...currentConsultation,

          techniques:
            currentConsultation.techniques.map(
              (
                currentTechnique,
              ) =>
                currentTechnique.id ===
                technique.id
                  ? {
                      ...technique,

                      /*
                       * Conservamos el slug.
                       *
                       * Cambiar el nombre desde
                       * el administrador no debe
                       * cambiar automáticamente
                       * un identificador que
                       * pudiera utilizar después
                       * una API o una URL.
                       */
                      slug:
                        currentTechnique.slug,

                      benefits:
                        technique.benefits
                          ? [
                              ...technique.benefits,
                            ]
                          : [],
                    }
                  : currentTechnique,
            ),
        }),
      );

      /*
       * INTEGRACIÓN FUTURA
       *
       * PATCH
       * /natural-medicine/techniques/:id
       */

      handleCloseTechniqueForm();

      return;
    }

    /* -----------------------------------------------------
       CREAR
    ------------------------------------------------------ */

    setConsultation(
      (
        currentConsultation,
      ) => {
        const nextId =
          currentConsultation
            .techniques.length > 0
            ? Math.max(
                ...currentConsultation.techniques.map(
                  (item) =>
                    item.id,
                ),
              ) + 1
            : 1;

        const nextOrder =
          currentConsultation
            .techniques.length > 0
            ? Math.max(
                ...currentConsultation.techniques.map(
                  (item) =>
                    item.displayOrder,
                ),
              ) + 1
            : 1;

        const newTechnique: NaturalTechnique =
          {
            ...technique,

            id: nextId,

            slug:
              createSlug(
                technique.name,
              ),

            /*
             * Las nuevas técnicas
             * aparecen al final.
             */
            displayOrder:
              nextOrder,

            benefits:
              technique.benefits
                ? [
                    ...technique.benefits,
                  ]
                : [],
          };

        return {
          ...currentConsultation,

          techniques: [
            ...currentConsultation.techniques,

            newTechnique,
          ],
        };
      },
    );

    /*
     * INTEGRACIÓN FUTURA
     *
     * POST
     * /natural-medicine/techniques
     */

    handleCloseTechniqueForm();
  };

  /* =======================================================
     ACTIVAR / DESACTIVAR TÉCNICA
  ======================================================== */

  const handleToggleActive = (
    techniqueId: number,
  ) => {
    setConsultation(
      (
        currentConsultation,
      ) => ({
        ...currentConsultation,

        techniques:
          currentConsultation.techniques.map(
            (technique) =>
              technique.id ===
              techniqueId
                ? {
                    ...technique,

                    active:
                      !technique.active,
                  }
                : technique,
          ),
      }),
    );

    /*
     * INTEGRACIÓN FUTURA
     *
     * PATCH
     * /natural-medicine/techniques/:id/status
     */
  };

  /* =======================================================
     GUARDAR CONSULTA
  ======================================================== */

  const handleSaveConsultation = (
    updatedConsultation:
      NaturalMedicineConsultation,
  ) => {
    setConsultation(
      (
        currentConsultation,
      ) => ({
        ...updatedConsultation,

        /*
         * Editar los datos generales
         * nunca debe sustituir las
         * técnicas que ya tenemos en
         * el estado.
         */
        techniques:
          currentConsultation.techniques,
      }),
    );

    setConsultationFormOpen(
      false,
    );

    /*
     * INTEGRACIÓN FUTURA
     *
     * PATCH
     * /natural-medicine/consultation/:id
     */
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <div className="pb-10">

        {/* =================================================
            INTRO
        ================================================== */}

        <section
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Leaf
                className="
                  h-3.5
                  w-3.5
                  text-[#B08B28]
                "
                strokeWidth={1.5}
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#B08B28]
                "
              >
                Contenido del sitio
              </p>
            </div>

            <p
              className="
                mt-2
                max-w-2xl
                text-[12px]
                leading-5
                text-[#718083]
              "
            >
              Administra la consulta y
              las técnicas de Medicina
              Natural disponibles en el
              sitio web.
            </p>
          </div>

          {/* AGREGAR TÉCNICA */}

          <button
            type="button"
            onClick={
              handleAddTechnique
            }
            className="
              inline-flex
              h-[38px]
              items-center
              justify-center
              gap-2
              self-start
              rounded-[12px]
              bg-[#0F3D4A]
              px-4
              text-[9px]
              font-semibold
              text-white
              shadow-[0_5px_15px_rgba(15,61,74,0.08)]
              transition-all

              hover:-translate-y-0.5
              hover:bg-[#174F5D]

              sm:self-auto
            "
          >
            <Plus
              className="
                h-3.5
                w-3.5
                text-[#D8BD66]
              "
              strokeWidth={1.7}
            />

            Agregar técnica
          </button>
        </section>

        {/* =================================================
            INFORMACIÓN DE LA CONSULTA
        ================================================== */}

        <section
          className="
            mt-6
            rounded-[20px]
            border
            border-[#A7B89A]/20
            bg-white
            px-5
            py-5
            shadow-[0_8px_28px_rgba(15,61,74,0.025)]

            sm:px-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* =============================================
                INFORMACIÓN
            ============================================== */}

            <div
              className="
                flex
                min-w-0
                items-start
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-[13px]
                  bg-[#EEF2EC]
                  text-[#52665A]
                "
              >
                <Leaf
                  className="
                    h-5
                    w-5
                  "
                  strokeWidth={1.5}
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#B08B28]
                  "
                >
                  Consulta
                </p>

                <h2
                  className="
                    mt-1
                    font-serif
                    text-[22px]
                    font-medium
                    leading-tight
                    text-[#0F3D4A]
                  "
                >
                  {
                    consultation.name
                  }
                </h2>

                <p
                  className="
                    mt-1.5
                    max-w-[680px]
                    text-[10px]
                    leading-5
                    text-[#718083]
                  "
                >
                  {
                    consultation.shortDescription
                  }
                </p>
              </div>
            </div>

            {/* =============================================
                DATOS
            ============================================== */}

            <div
              className="
                flex
                shrink-0
                flex-wrap
                items-center
                gap-3

                lg:justify-end
              "
            >
              {/* PRECIO */}

              <div
                className="
                  min-h-[42px]
                  rounded-[12px]
                  bg-[#F6F6F2]
                  px-4
                  py-2
                "
              >
                <p
                  className="
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#8A9691]
                  "
                >
                  Precio
                </p>

                <p
                  className="
                    mt-0.5
                    font-serif
                    text-[18px]
                    leading-none
                    text-[#0F3D4A]
                  "
                >
                  $
                  {consultation.price.toLocaleString(
                    'es-MX',
                  )}

                  <span
                    className="
                      ml-1
                      font-sans
                      text-[7px]
                      font-semibold
                      text-[#8A9691]
                    "
                  >
                    MXN
                  </span>
                </p>
              </div>

              {/* DURACIÓN */}

              {consultation.durationMinutes !==
                null && (
                <div
                  className="
                    flex
                    min-h-[42px]
                    items-center
                    gap-2
                    rounded-[12px]
                    border
                    border-[#A7B89A]/20
                    px-3.5
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

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      text-[#52665A]
                    "
                  >
                    {
                      consultation.durationMinutes
                    }{' '}
                    min
                  </span>
                </div>
              )}

              {/* CITA PREVIA */}

              {consultation.appointmentRequired && (
                <div
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    gap-2
                    rounded-[12px]
                    border
                    border-[#A7B89A]/20
                    px-3.5
                    text-[8px]
                    font-semibold
                    text-[#52665A]
                  "
                >
                  <CalendarCheck
                    className="
                      h-3.5
                      w-3.5
                    "
                    strokeWidth={1.5}
                  />

                  Previa cita
                </div>
              )}

              {/* EDITAR CONSULTA */}

              <button
                type="button"
                onClick={() =>
                  setConsultationFormOpen(
                    true,
                  )
                }
                className="
                  inline-flex
                  min-h-[42px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[12px]
                  border
                  border-[#A7B89A]/20
                  bg-white
                  px-4
                  text-[8px]
                  font-semibold
                  text-[#435D61]
                  transition-colors

                  hover:bg-[#F6F6F2]
                "
              >
                <Edit3
                  className="
                    h-3.5
                    w-3.5
                  "
                  strokeWidth={1.5}
                />

                Editar consulta
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            RESUMEN
        ================================================== */}

        <section
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {/* VISIBLES */}

          <div
            className="
              rounded-full
              border
              border-[#A7B89A]/20
              bg-white
              px-3.5
              py-2
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-semibold
                text-[#52665A]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#7D9870]
                "
              />

              {activeTechniques}{' '}
              visibles
            </span>
          </div>

          {/* OCULTAS */}

          <div
            className="
              rounded-full
              border
              border-[#A7B89A]/20
              bg-white
              px-3.5
              py-2
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-semibold
                text-[#8A9691]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#A8B0AC]
                "
              />

              {inactiveTechniques}{' '}
              ocultas
            </span>
          </div>

          {/* TOTAL */}

          <p
            className="
              ml-auto
              hidden
              text-[8px]
              text-[#A0AAA5]

              sm:block
            "
          >
            {techniques.length}{' '}
            técnicas registradas
          </p>
        </section>

        {/* =================================================
            GRID
        ================================================== */}

        {techniques.length > 0 ? (
          <section
            className="
              mt-4
              grid
              grid-cols-1
              gap-4

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {techniques.map(
              (technique) => (
                <NaturalTechniqueCard
                  key={
                    technique.id
                  }
                  technique={
                    technique
                  }
                  onEdit={
                    handleEditTechnique
                  }
                  onToggleActive={
                    handleToggleActive
                  }
                />
              ),
            )}
          </section>
        ) : (
          /* ===============================================
              EMPTY STATE
          ================================================ */

          <section
            className="
              mt-5
              rounded-[20px]
              border
              border-dashed
              border-[#A7B89A]/30
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#EEF2EC]
                text-[#52665A]
              "
            >
              <Leaf
                className="
                  h-5
                  w-5
                "
                strokeWidth={1.5}
              />
            </div>

            <h3
              className="
                mt-4
                font-serif
                text-[20px]
                text-[#0F3D4A]
              "
            >
              No hay técnicas
              registradas
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-[9px]
                leading-5
                text-[#8A9691]
              "
            >
              Agrega la primera
              técnica de Medicina
              Natural para comenzar
              a mostrarla en el
              sitio.
            </p>

            <button
              type="button"
              onClick={
                handleAddTechnique
              }
              className="
                mt-5
                inline-flex
                h-9
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-[#0F3D4A]
                px-4
                text-[8px]
                font-semibold
                text-white
              "
            >
              <Plus
                className="
                  h-3.5
                  w-3.5
                  text-[#D8BD66]
                "
                strokeWidth={1.6}
              />

              Agregar técnica
            </button>
          </section>
        )}

        {/* =================================================
            AVISO
        ================================================== */}

        <p
          className="
            mt-4
            text-right
            text-[8px]
            leading-4
            text-[#A0AAA5]
          "
        >
          Los cambios realizados
          actualmente son de
          demostración y no se
          guardan permanentemente.
        </p>
      </div>

      {/* ===================================================
          FORMULARIO TÉCNICA
      ==================================================== */}

      <NaturalTechniqueForm
        technique={
          selectedTechnique
        }
        open={
          techniqueFormOpen
        }
        mode={
          techniqueFormMode
        }
        onClose={
          handleCloseTechniqueForm
        }
        onSave={
          handleSaveTechnique
        }
      />

      {/* ===================================================
          FORMULARIO CONSULTA
      ==================================================== */}

      <NaturalConsultationForm
        consultation={
          consultation
        }
        open={
          consultationFormOpen
        }
        onClose={() =>
          setConsultationFormOpen(
            false,
          )
        }
        onSave={
          handleSaveConsultation
        }
      />
    </>
  );
}