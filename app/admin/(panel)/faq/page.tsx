'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  HelpCircle,
  Plus,
  Search,
} from 'lucide-react';

import { FAQAdminCard } from '@/components/admin/faq/FAQAdminCard';
import { FAQForm } from '@/components/admin/faq/FAQForm';

import { faqMock } from '@/data/faq.mock';

import type {
  FAQ,
  FAQCategory,
} from '@/types/faq';

type FilterValue =
  | 'all'
  | FAQCategory;

const filters: {
  label: string;
  value: FilterValue;
}[] = [
  {
    label: 'Todas',
    value: 'all',
  },

  {
    label: 'General',
    value: 'general',
  },

  {
    label: 'Psicoterapia',
    value: 'psicoterapia',
  },

  {
    label: 'Medicina Natural',
    value:
      'medicina-natural',
  },
];

export default function AdminFAQPage() {
  /* =======================================================
     ESTADO
  ======================================================== */

  const [
    faqs,
    setFaqs,
  ] =
    useState<FAQ[]>(
      faqMock.map(
        (faq) => ({
          ...faq,
        }),
      ),
    );

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState<FilterValue>(
      'all',
    );

  /* =======================================================
     FORM
  ======================================================== */

  const [
    selectedFAQ,
    setSelectedFAQ,
  ] =
    useState<FAQ | null>(
      null,
    );

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    formMode,
    setFormMode,
  ] =
    useState<
      'create' | 'edit'
    >('create');

  /* =======================================================
     RESUMEN
  ======================================================== */

  const activeCount =
    faqs.filter(
      (faq) => faq.active,
    ).length;

  const inactiveCount =
    faqs.length -
    activeCount;

  /* =======================================================
     FILTRADO
  ======================================================== */

  const filteredFaqs =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(
            /[\u0300-\u036f]/g,
            '',
          );

      return [...faqs]
        .filter(
          (faq) => {
            if (
              activeFilter !==
                'all' &&
              faq.category !==
                activeFilter
            ) {
              return false;
            }

            if (
              !normalizedSearch
            ) {
              return true;
            }

            const content =
              `${faq.question} ${faq.answer}`
                .toLowerCase()
                .normalize('NFD')
                .replace(
                  /[\u0300-\u036f]/g,
                  '',
                );

            return content.includes(
              normalizedSearch,
            );
          },
        )
        .sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder,
        );
    }, [
      faqs,
      search,
      activeFilter,
    ]);

  /* =======================================================
     AGREGAR
  ======================================================== */

  const handleCreate =
    () => {
      setSelectedFAQ(
        null,
      );

      setFormMode(
        'create',
      );

      setFormOpen(true);
    };

  /* =======================================================
     EDITAR
  ======================================================== */

  const handleEdit = (
    faq: FAQ,
  ) => {
    setSelectedFAQ({
      ...faq,
    });

    setFormMode(
      'edit',
    );

    setFormOpen(true);
  };

  /* =======================================================
     CERRAR FORM
  ======================================================== */

  const handleCloseForm =
    () => {
      setFormOpen(false);

      setSelectedFAQ(
        null,
      );
    };

  /* =======================================================
     GUARDAR
  ======================================================== */

  const handleSave = (
    faq: FAQ,
  ) => {
    /* EDITAR */

    if (
      formMode ===
      'edit'
    ) {
      setFaqs(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              faq.id
                ? faq
                : item,
          ),
      );

      /*
       * FUTURO:
       *
       * PATCH
       * /faqs/:id
       */

      handleCloseForm();

      return;
    }

    /* CREAR */

    setFaqs(
      (current) => {
        const nextId =
          current.length > 0
            ? Math.max(
                ...current.map(
                  (item) =>
                    item.id,
                ),
              ) + 1
            : 1;

        const nextOrder =
          current.length > 0
            ? Math.max(
                ...current.map(
                  (item) =>
                    item.displayOrder,
                ),
              ) + 1
            : 1;

        const newFAQ: FAQ =
          {
            ...faq,

            id: nextId,

            displayOrder:
              nextOrder,
          };

        return [
          ...current,

          newFAQ,
        ];
      },
    );

    /*
     * FUTURO:
     *
     * POST
     * /faqs
     */

    handleCloseForm();
  };

  /* =======================================================
     MOSTRAR / OCULTAR
  ======================================================== */

  const handleToggleActive = (
    id: number,
  ) => {
    setFaqs(
      (current) =>
        current.map(
          (faq) =>
            faq.id === id
              ? {
                  ...faq,

                  active:
                    !faq.active,
                }
              : faq,
        ),
    );

    /*
     * FUTURO:
     *
     * PATCH
     * /faqs/:id/status
     */
  };

  /* =======================================================
     CAMBIAR ORDEN
  ======================================================== */

  const moveFAQ = (
    id: number,
    direction:
      | 'up'
      | 'down',
  ) => {
    setFaqs(
      (current) => {
        const ordered = [
          ...current,
        ].sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder,
        );

        const index =
          ordered.findIndex(
            (faq) =>
              faq.id === id,
          );

        if (
          index === -1
        ) {
          return current;
        }

        const targetIndex =
          direction === 'up'
            ? index - 1
            : index + 1;

        if (
          targetIndex < 0 ||
          targetIndex >=
            ordered.length
        ) {
          return current;
        }

        const currentFAQ =
          ordered[index];

        const targetFAQ =
          ordered[
            targetIndex
          ];

        return current.map(
          (faq) => {
            if (
              faq.id ===
              currentFAQ.id
            ) {
              return {
                ...faq,

                displayOrder:
                  targetFAQ.displayOrder,
              };
            }

            if (
              faq.id ===
              targetFAQ.id
            ) {
              return {
                ...faq,

                displayOrder:
                  currentFAQ.displayOrder,
              };
            }

            return faq;
          },
        );
      },
    );

    /*
     * FUTURO:
     *
     * PATCH
     * /faqs/reorder
     */
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <div className="pb-10">

        {/* ===============================================
            INTRO
        ================================================ */}

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
              <HelpCircle
                className="
                  h-3.5
                  w-3.5
                  text-[#B08B28]
                "
                strokeWidth={
                  1.5
                }
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
                Contenido del
                sitio
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
              Administra las
              preguntas y
              respuestas que
              aparecen en la
              sección de preguntas
              frecuentes.
            </p>
          </div>

          <button
            type="button"
            onClick={
              handleCreate
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
              strokeWidth={
                1.7
              }
            />

            Agregar pregunta
          </button>
        </section>

        {/* ===============================================
            RESUMEN
        ================================================ */}

        <section
          className="
            mt-6
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-3
          "
        >
          <div
            className="
              rounded-[16px]
              border
              border-[#A7B89A]/20
              bg-white
              px-4
              py-3.5
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
              Total
            </p>

            <p
              className="
                mt-1
                font-serif
                text-[22px]
                text-[#0F3D4A]
              "
            >
              {faqs.length}
            </p>
          </div>

          <div
            className="
              rounded-[16px]
              border
              border-[#A7B89A]/20
              bg-white
              px-4
              py-3.5
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
              Visibles
            </p>

            <div
              className="
                mt-1
                flex
                items-center
                gap-2
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

              <p
                className="
                  font-serif
                  text-[22px]
                  text-[#0F3D4A]
                "
              >
                {
                  activeCount
                }
              </p>
            </div>
          </div>

          <div
            className="
              rounded-[16px]
              border
              border-[#A7B89A]/20
              bg-white
              px-4
              py-3.5
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
              Ocultas
            </p>

            <div
              className="
                mt-1
                flex
                items-center
                gap-2
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

              <p
                className="
                  font-serif
                  text-[22px]
                  text-[#0F3D4A]
                "
              >
                {
                  inactiveCount
                }
              </p>
            </div>
          </div>
        </section>

        {/* ===============================================
            BUSCADOR + FILTROS
        ================================================ */}

        <section
          className="
            mt-5
            rounded-[16px]
            border
            border-[#A7B89A]/20
            bg-white
            p-3
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* FILTROS */}

            <div
              className="
                flex
                flex-wrap
                gap-1.5
              "
            >
              {filters.map(
                (filter) => {
                  const isActive =
                    activeFilter ===
                    filter.value;

                  return (
                    <button
                      key={
                        filter.value
                      }
                      type="button"
                      onClick={() =>
                        setActiveFilter(
                          filter.value,
                        )
                      }
                      className={`
                        min-h-8
                        rounded-[9px]
                        px-3
                        text-[8px]
                        font-semibold
                        transition-colors

                        ${
                          isActive
                            ? 'bg-[#0F3D4A] text-white'
                            : 'bg-[#F6F6F2] text-[#657175] hover:bg-[#EEF1EB]'
                        }
                      `}
                    >
                      {
                        filter.label
                      }
                    </button>
                  );
                },
              )}
            </div>

            {/* BUSCADOR */}

            <div
              className="
                relative
                w-full

                lg:w-[270px]
              "
            >
              <Search
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  h-3.5
                  w-3.5
                  -translate-y-1/2
                  text-[#8A9691]
                "
                strokeWidth={
                  1.5
                }
              />

              <input
                type="search"
                value={search}
                onChange={(
                  event,
                ) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Buscar pregunta..."
                className="
                  h-9
                  w-full
                  rounded-[10px]
                  border
                  border-[#A7B89A]/20
                  bg-[#FBFAF7]
                  pl-9
                  pr-3
                  text-[9px]
                  text-[#314E53]
                  outline-none

                  placeholder:text-[#A0AAA5]

                  focus:border-[#0F3D4A]/30
                "
              />
            </div>
          </div>
        </section>

        {/* ===============================================
            RESULTADOS
        ================================================ */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-[8px]
              text-[#8A9691]
            "
          >
            {
              filteredFaqs.length
            }{' '}
            {filteredFaqs.length ===
            1
              ? 'pregunta'
              : 'preguntas'}
          </p>

          {(search ||
            activeFilter !==
              'all') && (
            <button
              type="button"
              onClick={() => {
                setSearch('');

                setActiveFilter(
                  'all',
                );
              }}
              className="
                text-[8px]
                font-semibold
                text-[#52665A]

                hover:text-[#0F3D4A]
              "
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* ===============================================
            LISTADO
        ================================================ */}

        {filteredFaqs.length >
        0 ? (
          <section
            className="
              mt-3
              grid
              grid-cols-1
              gap-3

              xl:grid-cols-2
            "
          >
            {filteredFaqs.map(
              (
                faq,
                index,
              ) => (
                <FAQAdminCard
                  key={faq.id}
                  faq={faq}
                  isFirst={
                    faq.displayOrder ===
                    Math.min(
                      ...faqs.map(
                        (item) =>
                          item.displayOrder,
                      ),
                    )
                  }
                  isLast={
                    faq.displayOrder ===
                    Math.max(
                      ...faqs.map(
                        (item) =>
                          item.displayOrder,
                      ),
                    )
                  }
                  onEdit={
                    handleEdit
                  }
                  onToggleActive={
                    handleToggleActive
                  }
                  onMoveUp={(
                    id,
                  ) =>
                    moveFAQ(
                      id,
                      'up',
                    )
                  }
                  onMoveDown={(
                    id,
                  ) =>
                    moveFAQ(
                      id,
                      'down',
                    )
                  }
                />
              ),
            )}
          </section>
        ) : (
          <section
            className="
              mt-4
              rounded-[18px]
              border
              border-dashed
              border-[#A7B89A]/30
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <HelpCircle
              className="
                mx-auto
                h-6
                w-6
                text-[#A7B89A]
              "
              strokeWidth={
                1.4
              }
            />

            <h3
              className="
                mt-3
                font-serif
                text-[19px]
                text-[#0F3D4A]
              "
            >
              No encontramos
              preguntas
            </h3>

            <p
              className="
                mt-1
                text-[9px]
                text-[#8A9691]
              "
            >
              Prueba con otra
              búsqueda o categoría.
            </p>
          </section>
        )}

        {/* ===============================================
            AVISO
        ================================================ */}

        <p
          className="
            mt-4
            text-right
            text-[8px]
            text-[#A0AAA5]
          "
        >
          Los cambios realizados
          actualmente son de
          demostración y no se
          guardan permanentemente.
        </p>
      </div>

      {/* ===============================================
          FORM
      ================================================ */}

      <FAQForm
        faq={selectedFAQ}
        open={formOpen}
        mode={formMode}
        onClose={
          handleCloseForm
        }
        onSave={
          handleSave
        }
      />
    </>
  );
}