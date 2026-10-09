'use client';

import {
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import { apiFetch } from '@/lib/http';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  sessionVersion: number;
}

function roleLabel(role: string) {
  switch (role) {
    case 'admin':
      return 'Administradora';

    case 'receptionist':
      return 'Recepción';

    case 'editor':
      return 'Editora';

    default:
      return role;
  }
}

export default function AccountPage() {
  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        setLoading(true);
        setError(null);

        const currentUser =
          await apiFetch<CurrentUser>(
            '/api/auth/me',
          );

        if (active) {
          setUser(currentUser);
        }
      } catch (err) {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : 'No fue posible cargar la cuenta.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            className="
              mx-auto
              h-5
              w-5
              animate-spin
              text-[#0F3D4A]
            "
            strokeWidth={1.5}
          />

          <p
            className="
              mt-3
              text-[10px]
              text-[#7D8B8D]
            "
          >
            Cargando información de la cuenta...
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        className="
          rounded-[16px]
          border
          border-red-200
          bg-red-50
          px-5
          py-4
        "
      >
        <p className="text-[11px] font-medium text-red-700">
          {error ??
            'No fue posible cargar la cuenta.'}
        </p>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1180px]
        space-y-6
      "
    >
      {/* ================================================
          ENCABEZADO
      ================================================= */}

      <section>
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#B08B28]
          "
        >
          Administración
        </p>

        

        <p
          className="
            mt-1
            max-w-[620px]
            text-[10px]
            leading-5
            text-[#7D8B8D]
          "
        >
          Administra tus datos de acceso y la
          seguridad de tu cuenta.
        </p>
      </section>

      {/* ================================================
          RESUMEN
      ================================================= */}

      <section
        className="
          flex
          flex-col
          gap-5
          rounded-[18px]
          border
          border-[#A7B89A]/20
          bg-white
          p-5
          shadow-[0_10px_35px_rgba(15,61,74,0.025)]

          sm:flex-row
          sm:items-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#0F3D4A]
            font-serif
            text-[18px]
            font-medium
            text-[#D8BD66]
          "
        >
          {initials || 'EP'}
        </div>

        <div className="min-w-0">
          <h2
            className="
              truncate
              font-serif
              text-[20px]
              font-medium
              text-[#0F3D4A]
            "
          >
            {user.name}
          </h2>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              text-[#7D8B8D]
            "
          >
            {user.email}
          </p>

          <span
            className="
              mt-2
              inline-flex
              rounded-full
              bg-[#EEF2EC]
              px-2.5
              py-1
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[#597060]
            "
          >
            {roleLabel(user.role)}
          </span>
        </div>
      </section>

      {/* ================================================
          INFORMACIÓN + SEGURIDAD
      ================================================= */}

      <div
        className="
          grid
          gap-6

          lg:grid-cols-2
        "
      >
        {/* INFORMACIÓN */}

        <section
          className="
            overflow-hidden
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
              items-center
              gap-3
              border-b
              border-[#A7B89A]/15
              px-5
              py-4
            "
          >
            <span
              className="
                flex
                h-9
                w-9
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
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#B08B28]
                "
              >
                Información
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
                Datos de la cuenta
              </h2>
            </div>
          </header>

          <div className="space-y-5 p-5">
            <AccountField
              icon={UserRound}
              label="Nombre"
              value={user.name}
            />

            <AccountField
              icon={Mail}
              label="Correo electrónico"
              value={user.email}
            />

            <AccountField
              icon={ShieldCheck}
              label="Tipo de cuenta"
              value={roleLabel(user.role)}
            />

            <button
              type="button"
              className="
                mt-2
                inline-flex
                min-h-10
                items-center
                justify-center
                rounded-[10px]
                bg-[#0F3D4A]
                px-5
                text-[9px]
                font-semibold
                text-white
                transition-colors

                hover:bg-[#174F5D]
              "
            >
              Editar información
            </button>
          </div>
        </section>

        {/* SEGURIDAD */}

        <section
          className="
            overflow-hidden
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
              items-center
              gap-3
              border-b
              border-[#A7B89A]/15
              px-5
              py-4
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-[10px]
                bg-[#FBF9F2]
                text-[#B08B28]
              "
            >
              <LockKeyhole
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </span>

            <div>
              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#B08B28]
                "
              >
                Seguridad
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
                Contraseña
              </h2>
            </div>
          </header>

          <div className="p-5">
            <div
              className="
                flex
                items-start
                gap-3
                rounded-[12px]
                bg-[#FBFAF7]
                p-4
              "
            >
              <KeyRound
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#597060]
                "
                strokeWidth={1.5}
              />

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    text-[#435D61]
                  "
                >
                  Contraseña de acceso
                </p>

                <p
                  className="
                    mt-1
                    text-[9px]
                    leading-4
                    text-[#82918B]
                  "
                >
                  Por seguridad, tu contraseña
                  actual nunca se muestra.
                </p>
              </div>
            </div>

            <div
              className="
                mt-5
                flex
                items-center
                gap-1.5
                text-[#435D61]
              "
            >
              {Array.from({ length: 10 }).map(
                (_, index) => (
                  <span
                    key={index}
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#435D61]
                    "
                  />
                ),
              )}
            </div>

            <button
              type="button"
              className="
                mt-6
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-2
                rounded-[10px]
                border
                border-[#0F3D4A]/15
                bg-white
                px-5
                text-[9px]
                font-semibold
                text-[#0F3D4A]
                transition-colors

                hover:bg-[#F6F8F5]
              "
            >
              <LockKeyhole
                className="h-3.5 w-3.5"
                strokeWidth={1.5}
              />

              Cambiar contraseña
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   CAMPO
========================================================= */

interface AccountFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function AccountField({
  icon: Icon,
  label,
  value,
}: AccountFieldProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        border-b
        border-[#A7B89A]/12
        pb-4
        last:border-0
        last:pb-0
      "
    >
      <Icon
        className="
          mt-0.5
          h-4
          w-4
          shrink-0
          text-[#A7B89A]
        "
        strokeWidth={1.5}
      />

      <div className="min-w-0">
        <p
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.13em]
            text-[#9AA49F]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-[10px]
            font-medium
            text-[#435D61]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}