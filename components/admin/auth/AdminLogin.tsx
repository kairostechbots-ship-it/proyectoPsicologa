'use client';

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FormEvent,
  useState,
} from 'react';

import { login } from '@/lib/auth';

export function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');

    if (!email.trim() || !password.trim()) {
      setError(
        'Ingresa tu correo electrónico y contraseña.',
      );

      return;
    }

    setLoading(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      router.replace('/admin');
      router.refresh();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          'AUTH_SERVICE_NOT_CONNECTED'
      ) {
        setError(
          'El servicio de autenticación aún no está conectado.',
        );
      } else {
        setError(
          'Correo electrónico o contraseña incorrectos.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
        bg-[#F7F5EF]
      "
    >
      {/* =====================================================
          DECORACIÓN GENERAL
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          border
          border-[#A7B89A]/20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-[520px]
          w-[520px]
          rounded-full
          border
          border-[#D4AF37]/15
        "
      />

      <div
        className="
          relative
          z-10
          grid
          min-h-screen
          w-full

          lg:grid-cols-2
        "
      >
        {/* ===================================================
            PANEL IZQUIERDO
        ==================================================== */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#0F3D4A]

            lg:flex
            lg:flex-col
            lg:justify-between
            lg:p-12

            xl:p-16
          "
        >
          {/* Decoración */}

          <div
            aria-hidden="true"
            className="
              absolute
              -right-32
              -top-32
              h-[420px]
              w-[420px]
              rounded-full
              border
              border-white/[0.06]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-48
              -left-32
              h-[520px]
              w-[520px]
              rounded-full
              border
              border-[#D8BD66]/10
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[12%]
              right-[12%]
              h-40
              w-40
              rounded-full
              bg-white/[0.025]
            "
          />

         {/* Logo */}

<div className="relative z-10">
  <Link
    href="/"
    aria-label="Ir al sitio web de Erika Pilar"
    className="
      inline-block
      transition-opacity
      hover:opacity-90
    "
  >
    <Image
      src="/logoblanco.png"
      alt="Erika Pilar, Psicóloga Clínica"
      width={360}
      height={120}
      className="
        h-auto
        w-[270px]
        object-contain

        xl:w-[320px]
      "
      priority
    />
  </Link>
</div>

          {/* Mensaje */}

          <div
            className="
              relative
              z-10
              max-w-[520px]
            "
          >
            <div
              className="
                mb-7
                h-px
                w-12
                bg-[#D8BD66]
              "
            />

            <p
              className="
                mb-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#D8BD66]
              "
            >
              Panel administrativo
            </p>

            <h1
              className="
                max-w-[500px]
                font-serif
                text-[42px]
                font-normal
                leading-[1.12]
                tracking-[-0.025em]
                text-white

                xl:text-[50px]
              "
            >
              Tu espacio para administrar el sitio.
            </h1>

            <p
              className="
                mt-6
                max-w-[430px]
                text-[13px]
                leading-7
                text-white/50
              "
            >
              Gestiona la información de tus
              servicios, contenido profesional y
              consulta tu agenda desde un solo lugar.
            </p>
          </div>

          {/* Footer */}

          <p
            className="
              relative
              z-10
              text-[9px]
              uppercase
              tracking-[0.14em]
              text-white/25
            "
          >
            Acceso privado
          </p>
        </section>

        {/* ===================================================
            FORMULARIO
        ==================================================== */}

        <section
          className="
            flex
            min-h-screen
            flex-col
            px-5
            py-6

            sm:px-8
            sm:py-8

            lg:px-12
            lg:py-10

            xl:px-20
          "
        >
          {/* Regresar */}

          <div>
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                text-[11px]
                font-medium
                text-[#70807A]

                transition-colors

                hover:text-[#0F3D4A]
              "
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.5}
              />

              Volver al sitio web
            </Link>
          </div>

          {/* Centro */}

          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              py-10
            "
          >
            <div
              className="
                w-full
                max-w-[430px]
              "
            >
              {/* Logo móvil */}

              <div
                className="
                  mb-8
                  flex
                  items-center
                  gap-3

                  lg:hidden
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[#A7B89A]/20
                    bg-white
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="Erika Pilar"
                    width={48}
                    height={48}
                    className="
                      h-full
                      w-full
                      object-contain
                      p-1
                    "
                    priority
                  />
                </div>

                <div>
                  <p
                    className="
                      font-serif
                      text-lg
                      text-[#0F3D4A]
                    "
                  >
                    Erika Pilar
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#8A9893]
                    "
                  >
                    Panel administrativo
                  </p>
                </div>
              </div>

              {/* Encabezado */}

              <div className="mb-9">
                <p
                  className="
                    mb-3
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#B08B28]
                  "
                >
                  Acceso administrativo
                </p>

                <h2
                  className="
                    font-serif
                    text-[34px]
                    font-normal
                    leading-tight
                    tracking-[-0.025em]
                    text-[#0F3D4A]

                    sm:text-[38px]
                  "
                >
                  Bienvenida, Erika.
                </h2>

                <p
                  className="
                    mt-3
                    text-[12px]
                    leading-6
                    text-[#7B8884]
                  "
                >
                  Ingresa tus datos para acceder al
                  panel de administración.
                </p>
              </div>

              {/* Formulario */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="
                        absolute
                        left-4
                        top-1/2
                        h-[17px]
                        w-[17px]
                        -translate-y-1/2
                        text-[#93A09B]
                      "
                      strokeWidth={1.5}
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value,
                        )
                      }
                      placeholder="correo@ejemplo.com"
                      disabled={loading}
                      className="
                        h-[52px]
                        w-full
                        rounded-xl
                        border
                        border-[#A7B89A]/25
                        bg-white
                        pl-12
                        pr-4
                        text-[12px]
                        text-[#354C50]
                        outline-none

                        transition-all

                        placeholder:text-[#A7B0AD]

                        focus:border-[#0F3D4A]/45
                        focus:ring-4
                        focus:ring-[#0F3D4A]/[0.04]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />
                  </div>
                </div>

                {/* Contraseña */}

                <div>
                  <label
                    htmlFor="password"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-semibold
                      text-[#435D61]
                    "
                  >
                    Contraseña
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      className="
                        absolute
                        left-4
                        top-1/2
                        h-[17px]
                        w-[17px]
                        -translate-y-1/2
                        text-[#93A09B]
                      "
                      strokeWidth={1.5}
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value,
                        )
                      }
                      placeholder="Ingresa tu contraseña"
                      disabled={loading}
                      className="
                        h-[52px]
                        w-full
                        rounded-xl
                        border
                        border-[#A7B89A]/25
                        bg-white
                        pl-12
                        pr-12
                        text-[12px]
                        text-[#354C50]
                        outline-none

                        transition-all

                        placeholder:text-[#A7B0AD]

                        focus:border-[#0F3D4A]/45
                        focus:ring-4
                        focus:ring-[#0F3D4A]/[0.04]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) =>
                            !current,
                        )
                      }
                      aria-label={
                        showPassword
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        flex
                        -translate-y-1/2
                        items-center
                        justify-center
                        text-[#93A09B]

                        transition-colors

                        hover:text-[#0F3D4A]
                      "
                    >
                      {showPassword ? (
                        <EyeOff
                          className="
                            h-[17px]
                            w-[17px]
                          "
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Eye
                          className="
                            h-[17px]
                            w-[17px]
                          "
                          strokeWidth={1.5}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}

                {error && (
                  <div
                    role="alert"
                    className="
                      rounded-xl
                      border
                      border-[#B76E6E]/15
                      bg-[#B76E6E]/[0.06]
                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        leading-5
                        text-[#8B5656]
                      "
                    >
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex
                    h-[52px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0F3D4A]
                    px-5
                    text-[11px]
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(15,61,74,0.12)]

                    transition-all
                    duration-200

                    hover:bg-[#174F5D]
                    hover:shadow-[0_12px_34px_rgba(15,61,74,0.17)]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading && (
                    <Loader2
                      className="
                        h-4
                        w-4
                        animate-spin
                      "
                      strokeWidth={1.7}
                    />
                  )}

                  {loading
                    ? 'Ingresando...'
                    : 'Iniciar sesión'}
                </button>
              </form>

              {/* Aviso */}

              <div
                className="
                  mt-8
                  border-t
                  border-[#A7B89A]/15
                  pt-6
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <LockKeyhole
                    aria-hidden="true"
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-[#9AA69F]
                    "
                    strokeWidth={1.4}
                  />

                  <p
                    className="
                      text-[9px]
                      leading-5
                      text-[#8B9692]
                    "
                  >
                    Este espacio es de acceso privado
                    y está destinado únicamente a la
                    administración del sitio web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}