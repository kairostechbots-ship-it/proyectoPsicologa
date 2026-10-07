'use client';
import { useAdminList } from '@/hooks/use-admin-list';

import {
  useMemo,
  useState,
} from 'react';

import {
  Eye,
  EyeOff,
  Plus,
  Stethoscope,
} from 'lucide-react';

import { PsychotherapyServiceCard } from '@/components/admin/psychotherapy/PsychotherapyServiceCard';
import { PsychotherapyServiceForm } from '@/components/admin/psychotherapy/PsychotherapyServiceForm';

import { mockServices } from '@/data/services.mock';
import type { Service } from '@/types/psychotherapy';

/* =========================================================
   GENERAR SLUG
========================================================= */

function createSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function PsychotherapyPage() {
  /* =========================================================
     DATOS TEMPORALES
  ========================================================= */

  const initialServices = useMemo(
    () =>
      mockServices
        .filter(
          (service) =>
            service.tipo === 'psicoterapia',
        )
        .sort(
          (a, b) =>
            (a.orden ?? 0) -
            (b.orden ?? 0),
        ),
    [],
  );

  const [services, setServices, contentReady] =
    useAdminList<Service>("services",initialServices);

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [formOpen, setFormOpen] =
    useState(false);

  const [formMode, setFormMode] =
    useState<'create' | 'edit'>('edit');

  /* =========================================================
     RESUMEN
  ========================================================= */

  const activeServices = services.filter(
    (service) => service.activo,
  ).length;

  const inactiveServices =
    services.length - activeServices;

  /* =========================================================
     NUEVO SERVICIO
  ========================================================= */

  const handleCreate = () => {
    setSelectedService(null);
    setFormMode('create');
    setFormOpen(true);
  };

  /* =========================================================
     EDITAR
  ========================================================= */

  const handleEdit = (
    service: Service,
  ) => {
    setSelectedService(service);
    setFormMode('edit');
    setFormOpen(true);
  };

  /* =========================================================
     CERRAR FORMULARIO
  ========================================================= */

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedService(null);
  };

  /* =========================================================
     GUARDAR / CREAR
  ========================================================= */

  const handleSave = (
    formService: Service,
  ) => {
    /* =======================================================
       CREAR
    ======================================================== */

    if (formMode === 'create') {
      const nextId =
        services.length > 0
          ? Math.max(
              ...services.map(
                (service) => service.id,
              ),
            ) + 1
          : 1;

      const nextOrder =
        services.length > 0
          ? Math.max(
              ...services.map(
                (service) =>
                  service.orden ?? 0,
              ),
            ) + 1
          : 1;

      const newService: Service = {
        ...formService,

        id: nextId,

        tipo: 'psicoterapia',

        slug: createSlug(
          formService.nombre,
        ),

        orden: nextOrder,
      };

      setServices((currentServices) => [
        ...currentServices,
        newService,
      ]);

      /*
       * INTEGRACIÓN FUTURA:
       *
       * POST /services
       *
       * await createService(newService);
       */

      handleCloseForm();

      return;
    }

    /* =======================================================
       EDITAR
    ======================================================== */

    setServices((currentServices) =>
      currentServices
        .map((service) =>
          service.id === formService.id
            ? formService
            : service,
        )
        .sort(
          (a, b) =>
            (a.orden ?? 0) -
            (b.orden ?? 0),
        ),
    );

    /*
     * INTEGRACIÓN FUTURA:
     *
     * PATCH /services/:id
     *
     * await updateService(
     *   formService.id,
     *   formService
     * );
     */

    handleCloseForm();
  };

  /* =========================================================
     ACTIVAR / DESACTIVAR
  ========================================================= */

  const handleToggleActive = (
    selected: Service,
  ) => {
    setServices((currentServices) =>
      currentServices.map((service) =>
        service.id === selected.id
          ? {
              ...service,
              activo: !service.activo,
            }
          : service,
      ),
    );

    /*
     * INTEGRACIÓN FUTURA:
     *
     * PATCH /services/:id/status
     */
  };

  if (!contentReady) return <p role="status">Cargando datos del consultorio...</p>;
return (
    <>
      <div className="pb-10">

        {/* ===================================================
            INTRODUCCIÓN
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
              <Stethoscope
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
              Administra los servicios de
              psicoterapia que se muestran
              en el sitio web.
            </p>
          </div>

          {/* ===============================================
              ACCIONES SUPERIORES
          ================================================ */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* Contadores */}

            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-[14px]
                border
                border-[#A7B89A]/20
                bg-white
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-r
                  border-[#A7B89A]/15
                  px-4
                  py-2.5
                "
              >
                <Eye
                  className="
                    h-3.5
                    w-3.5
                    text-[#617A65]
                  "
                  strokeWidth={1.5}
                />

                <span
                  className="
                    text-[9px]
                    font-medium
                    text-[#718083]
                  "
                >
                  Activos
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-[#0F3D4A]
                  "
                >
                  {activeServices}
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                "
              >
                <EyeOff
                  className="
                    h-3.5
                    w-3.5
                    text-[#9AA49F]
                  "
                  strokeWidth={1.5}
                />

                <span
                  className="
                    text-[9px]
                    font-medium
                    text-[#718083]
                  "
                >
                  Inactivos
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-[#718083]
                  "
                >
                  {inactiveServices}
                </span>
              </div>
            </div>

            {/* Agregar */}

            <button
              type="button"
              onClick={handleCreate}
              className="
                inline-flex
                h-[38px]
                items-center
                justify-center
                gap-2
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
              "
            >
              <Plus
                className="
                  h-3.5
                  w-3.5
                  text-[#D8BD66]
                "
                strokeWidth={1.8}
              />

              Agregar servicio
            </button>
          </div>
        </section>

        {/* ===================================================
            SERVICIOS
        ==================================================== */}

        <section className="mt-6">
          {services.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-5

                xl:grid-cols-2
              "
            >
              {services.map((service) => (
                <PsychotherapyServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEdit}
                  onToggleActive={
                    handleToggleActive
                  }
                />
              ))}
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-dashed
                border-[#A7B89A]/30
                bg-white
                px-6
                text-center
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#A7B89A]/10
                  text-[#52665A]
                "
              >
                <Stethoscope
                  className="h-5 w-5"
                  strokeWidth={1.5}
                />
              </div>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[21px]
                  font-medium
                  text-[#0F3D4A]
                "
              >
                No hay servicios
              </h2>

              <p
                className="
                  mt-2
                  max-w-sm
                  text-[10px]
                  leading-5
                  text-[#718083]
                "
              >
                Agrega el primer servicio de
                psicoterapia.
              </p>

              <button
                type="button"
                onClick={handleCreate}
                className="
                  mt-5
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-[10px]
                  bg-[#0F3D4A]
                  px-4
                  text-[9px]
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
                />

                Agregar servicio
              </button>
            </div>
          )}
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
            Los cambios realizados actualmente
            son de demostración y no se guardan
            permanentemente.
          </p>
        </div>
      </div>

      {/* =====================================================
          CREAR / EDITAR
      ====================================================== */}

      <PsychotherapyServiceForm
        service={selectedService}
        open={formOpen}
        mode={formMode}
        onClose={handleCloseForm}
        onSave={handleSave}
      />
    </>
  );
}