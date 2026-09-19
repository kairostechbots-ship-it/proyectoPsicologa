'use client';

import { useState } from 'react';

import {
  Award,
  Brain,
  HeartHandshake,
  Plus,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react';

import { ProfilePresentationCard } from '@/components/admin/profile/ProfilePresentationCard';
import { ProfilePresentationForm } from '@/components/admin/profile/ProfilePresentationForm';
import { ProfileItemCard } from '@/components/admin/profile/ProfileItemCard';
import { ProfileValueForm } from '@/components/admin/profile/ProfileValueForm';
import { SimpleProfileItemForm } from '@/components/admin/profile/SimpleProfileItemForm';
import { TrainingForm } from '@/components/admin/profile/TrainingForm';

import { profileMock } from '@/data/profile.mock';

import type {
  ClinicalArea,
  PatientGroup,
  ProfessionalProfile,
  ProfessionalTraining,
  ProfileValue,
} from '@/types/profile';

/* =========================================================
   TIPOS INTERNOS
========================================================= */

type TrainingSection =
  | 'psychology'
  | 'complementary';

type SimpleSection =
  | 'clinical'
  | 'patients';

type FormMode =
  | 'create'
  | 'edit';

/* =========================================================
   HELPERS
========================================================= */

function sortByOrder<T extends { displayOrder: number }>(
  items: T[],
) {
  return [...items].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder,
  );
}

function getNextId<T extends { id: number }>(
  items: T[],
) {
  if (!items.length) return 1;

  return (
    Math.max(
      ...items.map((item) => item.id),
    ) + 1
  );
}

function getNextOrder<
  T extends { displayOrder: number },
>(items: T[]) {
  if (!items.length) return 1;

  return (
    Math.max(
      ...items.map(
        (item) => item.displayOrder,
      ),
    ) + 1
  );
}

/*
  Intercambia displayOrder entre dos elementos.

  De esta manera no dependemos de la posición
  física del arreglo para guardar el orden.
*/
function moveItem<
  T extends {
    id: number;
    displayOrder: number;
  },
>(
  items: T[],
  id: number,
  direction: 'up' | 'down',
): T[] {
  const sorted = sortByOrder(items);

  const index = sorted.findIndex(
    (item) => item.id === id,
  );

  if (index === -1) {
    return items;
  }

  const targetIndex =
    direction === 'up'
      ? index - 1
      : index + 1;

  if (
    targetIndex < 0 ||
    targetIndex >= sorted.length
  ) {
    return items;
  }

  const current = sorted[index];
  const target = sorted[targetIndex];

  return items.map((item) => {
    if (item.id === current.id) {
      return {
        ...item,
        displayOrder:
          target.displayOrder,
      };
    }

    if (item.id === target.id) {
      return {
        ...item,
        displayOrder:
          current.displayOrder,
      };
    }

    return item;
  });
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function AdminProfilePage() {
  /*
    Clonamos los arreglos para trabajar localmente.

    TODO API:
    Sustituir profileMock por GET /api/profile
    cuando exista backend.
  */
  const [profile, setProfile] =
    useState<ProfessionalProfile>(() => ({
      ...profileMock,

      biography: [
        ...profileMock.biography,
      ],

      values: profileMock.values.map(
        (item) => ({ ...item }),
      ),

      psychologyTraining:
        profileMock.psychologyTraining.map(
          (item) => ({ ...item }),
        ),

      complementaryTraining:
        profileMock.complementaryTraining.map(
          (item) => ({ ...item }),
        ),

      clinicalAreas:
        profileMock.clinicalAreas.map(
          (item) => ({ ...item }),
        ),

      patientGroups:
        profileMock.patientGroups.map(
          (item) => ({ ...item }),
        ),
    }));

  /* =======================================================
     MODAL PRESENTACIÓN
  ======================================================== */

  const [
    presentationOpen,
    setPresentationOpen,
  ] = useState(false);

  /* =======================================================
     MODAL VALORES
  ======================================================== */

  const [
    valueFormOpen,
    setValueFormOpen,
  ] = useState(false);

  const [
    valueFormMode,
    setValueFormMode,
  ] = useState<FormMode>('create');

  const [
    selectedValue,
    setSelectedValue,
  ] = useState<ProfileValue | null>(
    null,
  );

  /* =======================================================
     MODAL FORMACIÓN
  ======================================================== */

  const [
    trainingFormOpen,
    setTrainingFormOpen,
  ] = useState(false);

  const [
    trainingFormMode,
    setTrainingFormMode,
  ] = useState<FormMode>('create');

  const [
    trainingSection,
    setTrainingSection,
  ] =
    useState<TrainingSection>(
      'psychology',
    );

  const [
    selectedTraining,
    setSelectedTraining,
  ] =
    useState<ProfessionalTraining | null>(
      null,
    );

  /* =======================================================
     MODAL ÁREA / POBLACIÓN
  ======================================================== */

  const [
    simpleFormOpen,
    setSimpleFormOpen,
  ] = useState(false);

  const [
    simpleFormMode,
    setSimpleFormMode,
  ] = useState<FormMode>('create');

  const [
    simpleSection,
    setSimpleSection,
  ] =
    useState<SimpleSection>('clinical');

  const [
    selectedSimpleItem,
    setSelectedSimpleItem,
  ] = useState<
    ClinicalArea | PatientGroup | null
  >(null);

  /* =======================================================
     DATOS ORDENADOS
  ======================================================== */

  const values = sortByOrder(
    profile.values,
  );

  const psychologyTraining =
    sortByOrder(
      profile.psychologyTraining,
    );

  const complementaryTraining =
    sortByOrder(
      profile.complementaryTraining,
    );

  const clinicalAreas = sortByOrder(
    profile.clinicalAreas,
  );

  const patientGroups = sortByOrder(
    profile.patientGroups,
  );

  /* =======================================================
     PRESENTACIÓN
  ======================================================== */

  const handleSavePresentation = (
    updatedProfile: ProfessionalProfile,
  ) => {
    setProfile(updatedProfile);

    setPresentationOpen(false);

    // TODO API:
    // PATCH /api/profile
  };

  /* =======================================================
     VALORES
  ======================================================== */

  const openCreateValue = () => {
    setSelectedValue(null);
    setValueFormMode('create');
    setValueFormOpen(true);
  };

  const openEditValue = (
    value: ProfileValue,
  ) => {
    setSelectedValue(value);
    setValueFormMode('edit');
    setValueFormOpen(true);
  };

  const handleSaveValue = (
    value: ProfileValue,
  ) => {
    if (valueFormMode === 'create') {
      const newValue: ProfileValue = {
        ...value,

        id: getNextId(
          profile.values,
        ),

        displayOrder: getNextOrder(
          profile.values,
        ),
      };

      setProfile((current) => ({
        ...current,

        values: [
          ...current.values,
          newValue,
        ],
      }));

      // TODO API:
      // POST /api/profile/values
    } else {
      setProfile((current) => ({
        ...current,

        values: current.values.map(
          (item) =>
            item.id === value.id
              ? value
              : item,
        ),
      }));

      // TODO API:
      // PATCH /api/profile/values/:id
    }

    setValueFormOpen(false);
    setSelectedValue(null);
  };

  const toggleValue = (
    id: number,
  ) => {
    setProfile((current) => ({
      ...current,

      values: current.values.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                active: !item.active,
              }
            : item,
      ),
    }));

    // TODO API:
    // PATCH visibility
  };

  const moveValue = (
    id: number,
    direction: 'up' | 'down',
  ) => {
    setProfile((current) => ({
      ...current,

      values: moveItem(
        current.values,
        id,
        direction,
      ),
    }));

    // TODO API:
    // PATCH order
  };

  /* =======================================================
     FORMACIÓN
  ======================================================== */

  const openCreateTraining = (
    section: TrainingSection,
  ) => {
    setTrainingSection(section);

    setSelectedTraining(null);

    setTrainingFormMode('create');

    setTrainingFormOpen(true);
  };

  const openEditTraining = (
    section: TrainingSection,
    training: ProfessionalTraining,
  ) => {
    setTrainingSection(section);

    setSelectedTraining(training);

    setTrainingFormMode('edit');

    setTrainingFormOpen(true);
  };

  const handleSaveTraining = (
    training: ProfessionalTraining,
  ) => {
    const key =
      trainingSection === 'psychology'
        ? 'psychologyTraining'
        : 'complementaryTraining';

    const currentItems =
      profile[key];

    if (
      trainingFormMode === 'create'
    ) {
      const newTraining: ProfessionalTraining =
        {
          ...training,

          id: getNextId(
            currentItems,
          ),

          displayOrder: getNextOrder(
            currentItems,
          ),
        };

      setProfile((current) => ({
        ...current,

        [key]: [
          ...current[key],
          newTraining,
        ],
      }));

      // TODO API:
      // POST training
    } else {
      setProfile((current) => ({
        ...current,

        [key]: current[key].map(
          (item) =>
            item.id === training.id
              ? training
              : item,
        ),
      }));

      // TODO API:
      // PATCH training/:id
    }

    setTrainingFormOpen(false);
    setSelectedTraining(null);
  };

  const toggleTraining = (
    section: TrainingSection,
    id: number,
  ) => {
    const key =
      section === 'psychology'
        ? 'psychologyTraining'
        : 'complementaryTraining';

    setProfile((current) => ({
      ...current,

      [key]: current[key].map(
        (item) =>
          item.id === id
            ? {
                ...item,
                active: !item.active,
              }
            : item,
      ),
    }));

    // TODO API:
    // PATCH visibility
  };

  const moveTraining = (
    section: TrainingSection,
    id: number,
    direction: 'up' | 'down',
  ) => {
    const key =
      section === 'psychology'
        ? 'psychologyTraining'
        : 'complementaryTraining';

    setProfile((current) => ({
      ...current,

      [key]: moveItem(
        current[key],
        id,
        direction,
      ),
    }));

    // TODO API:
    // PATCH order
  };

  /* =======================================================
     ÁREAS CLÍNICAS / POBLACIÓN
  ======================================================== */

  const openCreateSimple = (
    section: SimpleSection,
  ) => {
    setSimpleSection(section);

    setSelectedSimpleItem(null);

    setSimpleFormMode('create');

    setSimpleFormOpen(true);
  };

  const openEditSimple = (
    section: SimpleSection,
    item:
      | ClinicalArea
      | PatientGroup,
  ) => {
    setSimpleSection(section);

    setSelectedSimpleItem(item);

    setSimpleFormMode('edit');

    setSimpleFormOpen(true);
  };

  const handleSaveSimple = (
    item: {
      id: number;
      name: string;
      active: boolean;
      displayOrder: number;
    },
  ) => {
    if (
      simpleSection === 'clinical'
    ) {
      if (
        simpleFormMode === 'create'
      ) {
        const newArea: ClinicalArea = {
          ...item,

          id: getNextId(
            profile.clinicalAreas,
          ),

          displayOrder: getNextOrder(
            profile.clinicalAreas,
          ),
        };

        setProfile((current) => ({
          ...current,

          clinicalAreas: [
            ...current.clinicalAreas,
            newArea,
          ],
        }));

        // TODO API:
        // POST clinical area
      } else {
        setProfile((current) => ({
          ...current,

          clinicalAreas:
            current.clinicalAreas.map(
              (area) =>
                area.id === item.id
                  ? {
                      ...area,
                      ...item,
                    }
                  : area,
            ),
        }));

        // TODO API:
        // PATCH clinical area/:id
      }
    } else {
      if (
        simpleFormMode === 'create'
      ) {
        const newGroup: PatientGroup = {
          ...item,

          id: getNextId(
            profile.patientGroups,
          ),

          displayOrder: getNextOrder(
            profile.patientGroups,
          ),
        };

        setProfile((current) => ({
          ...current,

          patientGroups: [
            ...current.patientGroups,
            newGroup,
          ],
        }));

        // TODO API:
        // POST patient group
      } else {
        setProfile((current) => ({
          ...current,

          patientGroups:
            current.patientGroups.map(
              (group) =>
                group.id === item.id
                  ? {
                      ...group,
                      ...item,
                    }
                  : group,
            ),
        }));

        // TODO API:
        // PATCH patient group/:id
      }
    }

    setSimpleFormOpen(false);
    setSelectedSimpleItem(null);
  };

  const toggleSimple = (
    section: SimpleSection,
    id: number,
  ) => {
    if (section === 'clinical') {
      setProfile((current) => ({
        ...current,

        clinicalAreas:
          current.clinicalAreas.map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    active:
                      !item.active,
                  }
                : item,
          ),
      }));
    } else {
      setProfile((current) => ({
        ...current,

        patientGroups:
          current.patientGroups.map(
            (item) =>
              item.id === id
                ? {
                    ...item,
                    active:
                      !item.active,
                  }
                : item,
          ),
      }));
    }

    // TODO API:
    // PATCH visibility
  };

  const moveSimple = (
    section: SimpleSection,
    id: number,
    direction: 'up' | 'down',
  ) => {
    if (section === 'clinical') {
      setProfile((current) => ({
        ...current,

        clinicalAreas: moveItem(
          current.clinicalAreas,
          id,
          direction,
        ),
      }));
    } else {
      setProfile((current) => ({
        ...current,

        patientGroups: moveItem(
          current.patientGroups,
          id,
          direction,
        ),
      }));
    }

    // TODO API:
    // PATCH order
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1380px]
        space-y-6
      "
    >
      {/* ===================================================
          ENCABEZADO
      ==================================================== */}

      <section
        className="
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-end
          sm:justify-between
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
            Información
          </p>

          <h1
            className="
              mt-1
              font-serif
              text-[28px]
              font-medium
              tracking-[-0.02em]
              text-[#0F3D4A]

              sm:text-[32px]
            "
          >
            Perfil profesional
          </h1>

          <p
            className="
              mt-1
              max-w-[620px]
              text-[10px]
              leading-5
              text-[#7D8B8D]
            "
          >
            Administra la información que
            aparece en la sección “Quién soy”
            del sitio web.
          </p>
        </div>
      </section>

      {/* ===================================================
          PRESENTACIÓN
      ==================================================== */}

      <ProfilePresentationCard
        profile={profile}
        onEdit={() =>
          setPresentationOpen(true)
        }
      />

      {/* ===================================================
          VALORES
      ==================================================== */}

      <ProfileSection
        icon={HeartHandshake}
        eyebrow="Identidad profesional"
        title="Valores profesionales"
        description="Principios que se muestran junto a la presentación."
        onAdd={openCreateValue}
        addLabel="Agregar valor"
      >
        {values.length > 0 ? (
          <div className="space-y-2">
            {values.map(
              (value, index) => (
                <ProfileItemCard
                  key={value.id}
                  title={value.title}
                  subtitle={
                    value.description
                  }
                  active={value.active}
                  isFirst={index === 0}
                  isLast={
                    index ===
                    values.length - 1
                  }
                  onEdit={() =>
                    openEditValue(value)
                  }
                  onToggle={() =>
                    toggleValue(value.id)
                  }
                  onMoveUp={() =>
                    moveValue(
                      value.id,
                      'up',
                    )
                  }
                  onMoveDown={() =>
                    moveValue(
                      value.id,
                      'down',
                    )
                  }
                />
              ),
            )}
          </div>
        ) : (
          <EmptyState text="No hay valores registrados." />
        )}
      </ProfileSection>

      {/* ===================================================
          FORMACIÓN
      ==================================================== */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        {/* PSICOLOGÍA */}

        <ProfileSection
          icon={Brain}
          eyebrow="Área principal"
          title="Formación en psicología"
          description="Estudios y formación relacionados con psicología y acompañamiento."
          onAdd={() =>
            openCreateTraining(
              'psychology',
            )
          }
          addLabel="Agregar"
        >
          {psychologyTraining.length >
          0 ? (
            <div className="space-y-2">
              {psychologyTraining.map(
                (training, index) => (
                  <ProfileItemCard
                    key={training.id}
                    title={
                      training.title
                    }
                    subtitle={
                      training.institution
                    }
                    active={
                      training.active
                    }
                    isFirst={
                      index === 0
                    }
                    isLast={
                      index ===
                      psychologyTraining.length -
                        1
                    }
                    onEdit={() =>
                      openEditTraining(
                        'psychology',
                        training,
                      )
                    }
                    onToggle={() =>
                      toggleTraining(
                        'psychology',
                        training.id,
                      )
                    }
                    onMoveUp={() =>
                      moveTraining(
                        'psychology',
                        training.id,
                        'up',
                      )
                    }
                    onMoveDown={() =>
                      moveTraining(
                        'psychology',
                        training.id,
                        'down',
                      )
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <EmptyState text="No hay formación registrada." />
          )}
        </ProfileSection>

        {/* COMPLEMENTARIA */}

        <ProfileSection
          icon={Award}
          eyebrow="Otras áreas"
          title="Formación complementaria"
          description="Preparación adicional relacionada con salud y bienestar."
          onAdd={() =>
            openCreateTraining(
              'complementary',
            )
          }
          addLabel="Agregar"
        >
          {complementaryTraining.length >
          0 ? (
            <div className="space-y-2">
              {complementaryTraining.map(
                (training, index) => (
                  <ProfileItemCard
                    key={training.id}
                    title={
                      training.title
                    }
                    subtitle={
                      training.institution
                    }
                    active={
                      training.active
                    }
                    isFirst={
                      index === 0
                    }
                    isLast={
                      index ===
                      complementaryTraining.length -
                        1
                    }
                    onEdit={() =>
                      openEditTraining(
                        'complementary',
                        training,
                      )
                    }
                    onToggle={() =>
                      toggleTraining(
                        'complementary',
                        training.id,
                      )
                    }
                    onMoveUp={() =>
                      moveTraining(
                        'complementary',
                        training.id,
                        'up',
                      )
                    }
                    onMoveDown={() =>
                      moveTraining(
                        'complementary',
                        training.id,
                        'down',
                      )
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <EmptyState text="No hay formación registrada." />
          )}
        </ProfileSection>
      </div>

      {/* ===================================================
          EXPERIENCIA CLÍNICA
      ==================================================== */}

      <ProfileSection
        icon={Sparkles}
        eyebrow="Experiencia"
        title="Áreas clínicas"
        description="Situaciones y procesos que aparecen en la experiencia clínica."
        onAdd={() =>
          openCreateSimple('clinical')
        }
        addLabel="Agregar área"
      >
        {clinicalAreas.length > 0 ? (
          <div
            className="
              grid
              gap-2
              lg:grid-cols-2
            "
          >
            {clinicalAreas.map(
              (area, index) => (
                <ProfileItemCard
                  key={area.id}
                  title={area.name}
                  active={area.active}
                  isFirst={index === 0}
                  isLast={
                    index ===
                    clinicalAreas.length - 1
                  }
                  onEdit={() =>
                    openEditSimple(
                      'clinical',
                      area,
                    )
                  }
                  onToggle={() =>
                    toggleSimple(
                      'clinical',
                      area.id,
                    )
                  }
                  onMoveUp={() =>
                    moveSimple(
                      'clinical',
                      area.id,
                      'up',
                    )
                  }
                  onMoveDown={() =>
                    moveSimple(
                      'clinical',
                      area.id,
                      'down',
                    )
                  }
                />
              ),
            )}
          </div>
        ) : (
          <EmptyState text="No hay áreas clínicas registradas." />
        )}
      </ProfileSection>

      {/* ===================================================
          POBLACIÓN
      ==================================================== */}

      <ProfileSection
        icon={UsersRound}
        eyebrow="Atención psicológica"
        title="¿A quién acompaño?"
        description="Grupos de personas que se muestran en el perfil profesional."
        onAdd={() =>
          openCreateSimple('patients')
        }
        addLabel="Agregar"
      >
        {patientGroups.length > 0 ? (
          <div
            className="
              grid
              gap-2
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {patientGroups.map(
              (group, index) => (
                <ProfileItemCard
                  key={group.id}
                  title={group.name}
                  active={group.active}
                  isFirst={index === 0}
                  isLast={
                    index ===
                    patientGroups.length - 1
                  }
                  onEdit={() =>
                    openEditSimple(
                      'patients',
                      group,
                    )
                  }
                  onToggle={() =>
                    toggleSimple(
                      'patients',
                      group.id,
                    )
                  }
                  onMoveUp={() =>
                    moveSimple(
                      'patients',
                      group.id,
                      'up',
                    )
                  }
                  onMoveDown={() =>
                    moveSimple(
                      'patients',
                      group.id,
                      'down',
                    )
                  }
                />
              ),
            )}
          </div>
        ) : (
          <EmptyState text="No hay grupos registrados." />
        )}
      </ProfileSection>

      {/* ===================================================
          AVISO BACKEND
      ==================================================== */}

      <div
        className="
          rounded-[14px]
          border
          border-[#D4AF37]/15
          bg-[#FBF9F2]
          px-4
          py-3
        "
      >
        <p
          className="
            text-[8px]
            leading-4
            text-[#8A7C54]
          "
        >
          Los cambios realizados en esta
          pantalla son locales mientras se
          conecta el administrador con la API.
        </p>
      </div>

      {/* ===================================================
          MODALES
      ==================================================== */}

      <ProfilePresentationForm
        profile={profile}
        open={presentationOpen}
        onClose={() =>
          setPresentationOpen(false)
        }
        onSave={
          handleSavePresentation
        }
      />

      <ProfileValueForm
        value={selectedValue}
        open={valueFormOpen}
        mode={valueFormMode}
        onClose={() => {
          setValueFormOpen(false);
          setSelectedValue(null);
        }}
        onSave={handleSaveValue}
      />

      <TrainingForm
        training={selectedTraining}
        open={trainingFormOpen}
        mode={trainingFormMode}
        sectionTitle={
          trainingSection ===
          'psychology'
            ? 'Formación en psicología'
            : 'Formación complementaria'
        }
        onClose={() => {
          setTrainingFormOpen(false);
          setSelectedTraining(null);
        }}
        onSave={
          handleSaveTraining
        }
      />

      <SimpleProfileItemForm
        item={selectedSimpleItem}
        open={simpleFormOpen}
        mode={simpleFormMode}
        title={
          simpleSection === 'clinical'
            ? 'Área clínica'
            : 'Grupo de atención'
        }
        label={
          simpleSection === 'clinical'
            ? 'Área'
            : 'Grupo'
        }
        placeholder={
          simpleSection === 'clinical'
            ? 'Ej. Ansiedad'
            : 'Ej. Adultos mayores'
        }
        onClose={() => {
          setSimpleFormOpen(false);
          setSelectedSimpleItem(null);
        }}
        onSave={
          handleSaveSimple
        }
      />
    </div>
  );
}

/* =========================================================
   SECCIÓN REUTILIZABLE
========================================================= */

interface ProfileSectionProps {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
  children: React.ReactNode;
}

function ProfileSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  addLabel,
  onAdd,
  children,
}: ProfileSectionProps) {
  return (
    <section
      className="
        rounded-[18px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_35px_rgba(15,61,74,0.025)]
      "
    >
      <header
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#A7B89A]/15
          px-5
          py-4

          sm:flex-row
          sm:items-center
          sm:justify-between
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
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#EEF2EC]
              text-[#597060]
            "
          >
            <Icon
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </span>

          <div className="min-w-0">
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#B08B28]
              "
            >
              {eyebrow}
            </p>

            <h2
              className="
                mt-0.5
                font-serif
                text-[18px]
                font-medium
                text-[#0F3D4A]
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-0.5
                text-[8px]
                leading-4
                text-[#8A9691]
              "
            >
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="
            inline-flex
            min-h-9
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-[10px]
            bg-[#0F3D4A]
            px-4
            text-[8px]
            font-semibold
            text-white
            transition-colors

            hover:bg-[#174F5D]
          "
        >
          <Plus
            className="
              h-3.5
              w-3.5
              text-[#D8BD66]
            "
            strokeWidth={1.5}
          />

          {addLabel}
        </button>
      </header>

      <div className="p-4 sm:p-5">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        rounded-[12px]
        border
        border-dashed
        border-[#A7B89A]/30
        bg-[#FBFAF7]
        px-5
        py-8
        text-center
      "
    >
      <UserRound
        className="
          mx-auto
          h-5
          w-5
          text-[#A7B89A]
        "
        strokeWidth={1.4}
      />

      <p
        className="
          mt-2
          text-[9px]
          text-[#82918B]
        "
      >
        {text}
      </p>
    </div>
  );
}