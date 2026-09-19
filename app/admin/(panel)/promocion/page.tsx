'use client';

import { useState } from 'react';

import {
  CalendarDays,
  Check,
  Edit3,
  Gift,
  PackageCheck,
} from 'lucide-react';

import { PromotionForm } from '@/components/admin/promotion/PromotionForm';

import { mockPromotion } from '@/data/promotion.mock';

import type { Promotion } from '@/types/promotion';

export default function PromotionPage() {
  /* =========================================================
     ESTADO TEMPORAL
  ========================================================= */

  const [promotion, setPromotion] =
    useState<Promotion>({
      ...mockPromotion,
    });

  const [formOpen, setFormOpen] =
    useState(false);

  /* =========================================================
     GUARDAR CAMBIOS
  ========================================================= */

  const handleSave = (
    updatedPromotion: Promotion,
  ) => {
    setPromotion(updatedPromotion);

    setFormOpen(false);

    /*
     * INTEGRACIÓN FUTURA:
     *
     * PATCH /promotion/:id
     *
     * await updatePromotion(
     *   updatedPromotion.id,
     *   updatedPromotion,
     * );
     */
  };

  /* =========================================================
     ACTIVAR / DESACTIVAR
  ========================================================= */

  const handleToggleActive = () => {
    setPromotion((currentPromotion) => ({
      ...currentPromotion,
      activo: !currentPromotion.activo,
    }));

    /*
     * INTEGRACIÓN FUTURA:
     *
     * PATCH /promotion/:id/status
     */
  };

  return (
    <>
      <div className="pb-10">

        {/* ===================================================
            ENCABEZADO DEL CONTENIDO
        ==================================================== */}

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
              <Gift
                aria-hidden="true"
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
              Administra la promoción de psicoterapia
              que se muestra en el sitio web.
            </p>
          </div>

          {/* ===============================================
              ÚNICO BOTÓN EDITAR
          ================================================ */}

          <button
            type="button"
            onClick={() => setFormOpen(true)}
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
            <Edit3
              className="
                h-3.5
                w-3.5
                text-[#D8BD66]
              "
              strokeWidth={1.7}
            />

            Editar promoción
          </button>
        </section>

        {/* ===================================================
            PROMOCIÓN
        ==================================================== */}

        <section className="mt-6">
          <article
            className="
              relative
              overflow-hidden
              rounded-[26px]
              bg-[#0F4A55]
              shadow-[0_18px_45px_rgba(15,74,85,0.10)]
            "
          >
            {/* ===============================================
                DECORACIÓN
            ================================================ */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-28
                h-64
                w-64
                rounded-full
                border
                border-white/[0.07]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-36
                right-[18%]
                h-60
                w-60
                rounded-full
                border
                border-[#D4AF37]/10
              "
            />

            {/* ===============================================
                CONTENIDO PRINCIPAL
            ================================================ */}

            <div
              className="
                relative
                z-10
                px-6
                py-7

                sm:px-8
                sm:py-8
              "
            >
              {/* =============================================
                  ETIQUETA + ESTADO
              ============================================== */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2.5
                "
              >
                {/* PROMOCIÓN */}

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#D4AF37]/30
                    bg-[#D4AF37]/[0.08]
                    px-3
                    py-1.5
                  "
                >
                  <PackageCheck
                    className="
                      h-3.5
                      w-3.5
                      text-[#E1C66D]
                    "
                    strokeWidth={1.5}
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.17em]
                      text-[#E1C66D]
                    "
                  >
                    Promoción de psicoterapia
                  </span>
                </span>

                {/* ESTADO */}

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[8px]
                    font-semibold

                    ${
                      promotion.activo
                        ? `
                          border-[#BFD0B5]/30
                          bg-[#BFD0B5]/[0.12]
                          text-[#E4ECE1]
                        `
                        : `
                          border-white/15
                          bg-white/[0.07]
                          text-white/60
                        `
                    }
                  `}
                >
                  <span
                    className={`
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full

                      ${
                        promotion.activo
                          ? 'bg-[#BFD0B5]'
                          : 'bg-white/40'
                      }
                    `}
                  />

                  {promotion.activo
                    ? 'Visible en el sitio'
                    : 'Oculta del sitio'}
                </span>
              </div>

              {/* =============================================
                  TÍTULO + PRECIO
              ============================================== */}

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-5

                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                  lg:gap-10
                "
              >
                {/* INFORMACIÓN */}

                <div
                  className="
                    min-w-0
                    max-w-[760px]
                  "
                >
                  <h2
                    className="
                      font-serif
                      text-[30px]
                      font-medium
                      leading-tight
                      text-white

                      sm:text-[35px]
                    "
                  >
                    {promotion.nombre}
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-[720px]
                      text-[11px]
                      leading-6
                      text-white/60
                    "
                  >
                    {promotion.descripcion}
                  </p>
                </div>

                {/* PRECIO */}

                <div
                  className="
                    shrink-0

                    lg:min-w-[210px]
                    lg:border-l
                    lg:border-white/10
                    lg:pl-8
                    lg:text-right
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                    "
                  >
                    Precio del paquete
                  </p>

                  <p
                    className="
                      mt-2
                      font-serif
                      text-[38px]
                      font-medium
                      leading-none
                      text-white

                      sm:text-[42px]
                    "
                  >
                    $
                    {promotion.precio.toLocaleString(
                      'es-MX',
                    )}

                    <span
                      className="
                        ml-1
                        font-sans
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-white/40
                      "
                    >
                      MXN
                    </span>
                  </p>
                </div>
              </div>

              {/* =============================================
                  CARACTERÍSTICAS
              ============================================== */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2.5
                "
              >
                {/* SESIONES */}

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.06]
                    px-3
                    py-2
                    text-[9px]
                    font-medium
                    text-white/75
                  "
                >
                  <PackageCheck
                    className="
                      h-3.5
                      w-3.5
                      text-[#D8BD66]
                    "
                    strokeWidth={1.5}
                  />

                  {promotion.sesiones} sesiones
                </span>

                {/* FRECUENCIA */}

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.06]
                    px-3
                    py-2
                    text-[9px]
                    font-medium
                    text-white/75
                  "
                >
                  <CalendarDays
                    className="
                      h-3.5
                      w-3.5
                      text-[#D8E1D5]
                    "
                    strokeWidth={1.5}
                  />

                  {promotion.frecuencia}
                </span>

                {/* EXCLUSIÓN */}

                {promotion.excluyeTerapiaPareja && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/[0.06]
                      bg-white/[0.06]
                      px-3
                      py-2
                      text-[9px]
                      font-medium
                      text-white/75
                    "
                  >
                    <Check
                      className="
                        h-3.5
                        w-3.5
                        text-[#D8BD66]
                      "
                      strokeWidth={1.5}
                    />

                    Excepto terapia de pareja
                  </span>
                )}
              </div>

              {/* =============================================
                  CONDICIONES
              ============================================== */}

              {promotion.condiciones && (
                <div
                  className="
                    mt-6
                    border-t
                    border-white/10
                    pt-5
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white/35
                    "
                  >
                    Condiciones
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-[760px]
                      text-[10px]
                      leading-5
                      text-white/55
                    "
                  >
                    {promotion.condiciones}
                  </p>
                </div>
              )}

              {/* =============================================
                  VISIBILIDAD
              ============================================== */}

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-white/10
                  pt-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-white/85
                    "
                  >
                    Visible en el sitio
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      leading-4
                      text-white/40
                    "
                  >
                    {promotion.activo
                      ? 'La promoción está publicada en Inicio y Servicios.'
                      : 'La promoción está oculta del sitio público.'}
                  </p>
                </div>

                {/* SWITCH */}

                <button
                  type="button"
                  role="switch"
                  aria-checked={promotion.activo}
                  aria-label="Cambiar visibilidad de la promoción"
                  onClick={handleToggleActive}
                  className={`
                    relative
                    h-[24px]
                    w-11
                    shrink-0
                    rounded-full
                    transition-colors
                    duration-200

                    ${
                      promotion.activo
                        ? 'bg-[#D8BD66]'
                        : 'bg-white/20'
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-[3px]
                      h-[18px]
                      w-[18px]
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-all
                      duration-200

                      ${
                        promotion.activo
                          ? 'left-[23px]'
                          : 'left-[3px]'
                      }
                    `}
                  />
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* ===================================================
            AVISO DE DESARROLLO
        ==================================================== */}

        <div
          className="
            mt-4
            flex
            justify-end
          "
        >
          <p
            className="
              max-w-lg
              text-right
              text-[8px]
              leading-4
              text-[#A0AAA5]
            "
          >
            Los cambios realizados actualmente son de
            demostración y no se guardan permanentemente.
          </p>
        </div>
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}

      <PromotionForm
        promotion={promotion}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}