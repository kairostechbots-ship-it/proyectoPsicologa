'use client';

import {
  BriefcaseBusiness,
  Edit3,
  Quote,
  UserRound,
} from 'lucide-react';

import type { ProfessionalProfile } from '@/types/profile';

interface ProfilePresentationCardProps {
  profile: ProfessionalProfile;
  onEdit: () => void;
}

export function ProfilePresentationCard({
  profile,
  onEdit,
}: ProfilePresentationCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#A7B89A]/20
        bg-white
        shadow-[0_10px_35px_rgba(15,61,74,0.035)]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
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
        <div className="flex items-center gap-3">
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
            <UserRound
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </span>

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
              Quién soy
            </p>

            <h2
              className="
                mt-0.5
                font-serif
                text-[20px]
                font-medium
                text-[#0F3D4A]
              "
            >
              Presentación
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="
            inline-flex
            min-h-9
            items-center
            justify-center
            gap-2
            rounded-[10px]
            border
            border-[#A7B89A]/25
            bg-white
            px-4
            text-[9px]
            font-semibold
            text-[#435D61]
            transition-colors

            hover:border-[#0F3D4A]/20
            hover:bg-[#F6F7F3]
          "
        >
          <Edit3
            className="h-3.5 w-3.5"
            strokeWidth={1.5}
          />

          Editar
        </button>
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className="p-5 sm:p-6">
        <div
          className="
            grid
            gap-6
            lg:grid-cols-[0.75fr_1.25fr]
          "
        >
          {/* =================================================
              INFORMACIÓN PRINCIPAL
          ================================================== */}

          <div>
            <div className="flex items-start gap-3">
              <span
                className="
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F6F6F2]
                  text-[#718079]
                "
              >
                <BriefcaseBusiness
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <h3
                  className="
                    font-serif
                    text-[22px]
                    font-medium
                    leading-tight
                    text-[#0F3D4A]
                  "
                >
                  {profile.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    text-[#718083]
                  "
                >
                  {profile.professionalTitle}
                </p>
              </div>
            </div>

            {/* MÉTRICAS */}

            <div
              className="
                mt-6
                grid
                grid-cols-2
                overflow-hidden
                rounded-[12px]
                border
                border-[#A7B89A]/20
                bg-[#FBFAF7]
              "
            >
              <div className="px-4 py-3.5">
                <p
                  className="
                    font-serif
                    text-[23px]
                    leading-none
                    text-[#0F3D4A]
                  "
                >
                  +{profile.yearsExperience}
                </p>

                <p
                  className="
                    mt-1.5
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#8A9691]
                  "
                >
                  Años de trayectoria
                </p>
              </div>

              <div
                className="
                  border-l
                  border-[#A7B89A]/20
                  px-4
                  py-3.5
                "
              >
                <p
                  className="
                    font-serif
                    text-[23px]
                    leading-none
                    text-[#0F3D4A]
                  "
                >
                  {profile.therapeuticApproach}
                </p>

                <p
                  className="
                    mt-1.5
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#8A9691]
                  "
                >
                  Enfoque terapéutico
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MENSAJE + BIOGRAFÍA
          ================================================== */}

          <div
            className="
              border-t
              border-[#A7B89A]/15
              pt-5

              lg:border-l
              lg:border-t-0
              lg:pl-6
              lg:pt-0
            "
          >
            <div className="flex gap-3">
              <Quote
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#B2943D]
                "
                strokeWidth={1.5}
              />

              <div>
                <p
                  className="
                    font-serif
                    text-[17px]
                    leading-6
                    text-[#0F4A55]
                  "
                >
                  {profile.heroTitle}
                </p>

                {profile.heroHighlight && (
                  <p
                    className="
                      mt-1
                      text-[8px]
                      text-[#9AA49F]
                    "
                  >
                    Texto destacado:{' '}
                    <span
                      className="
                        font-medium
                        italic
                        text-[#718079]
                      "
                    >
                      {profile.heroHighlight}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div
              className="
                mt-5
                space-y-2
                border-t
                border-[#A7B89A]/15
                pt-4
              "
            >
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#8A9691]
                "
              >
                Biografía
              </p>

              {profile.biography.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    className="
                      text-[9px]
                      leading-5
                      text-[#718083]
                    "
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}