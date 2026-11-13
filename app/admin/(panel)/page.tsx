
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  CircleHelp,
  ExternalLink,
  Gift,
  Leaf,
  MapPin,
  PencilLine,
  RefreshCw,
  Stethoscope,
  UserCog,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { apiFetch } from '@/lib/http';

interface User {
  name: string;
  role: string;
}

interface Summary {
  services?: unknown[];
  faqs?: unknown[];
  naturalMedicine?: { techniques?: unknown[] };
  promotion?: {
    activo: boolean;
    nombre: string;
    sesiones: number;
    precio: number;
  } | null;
}

interface NavigationItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const focus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#276B65] focus-visible:ring-offset-2';

const contentItems: NavigationItem[] = [
  {
    title: 'Psicoterapia',
    description: 'Servicios, precios y modalidades',
    href: '/admin/psicoterapia',
    icon: Stethoscope,
  },
  {
    title: 'Medicina natural',
    description: 'Técnicas e información',
    href: '/admin/medicina-natural',
    icon: Leaf,
  },
  {
    title: 'Sobre mí',
    description: 'Presentación y formación profesional',
    href: '/admin/perfil',
    icon: UserRound,
  },
  {
    title: 'Preguntas frecuentes',
    description: 'Preguntas y respuestas del sitio',
    href: '/admin/faq',
    icon: CircleHelp,
  },
  {
    title: 'Promoción',
    description: 'Configura el paquete promocional',
    href: '/admin/promocion',
    icon: Gift,
  },
  {
    title: 'Contacto y horarios',
    description: 'Teléfono, ubicación y horarios',
    href: '/admin/contacto',
    icon: MapPin,
  },
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(false);
    setUser(null);

    apiFetch<User>('/api/auth/me')
      .then((result) => {
        if (!result) throw new Error('Usuario no disponible');
        if (active) setUser(result);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [retry]);

  const canManageAppointments =
    user?.role === 'admin' || user?.role === 'receptionist';

  const canManageContent =
    user?.role === 'admin' || user?.role === 'editor';

  const canManageUsers = user?.role === 'admin';

  useEffect(() => {
    if (!canManageContent) return;

    let active = true;

    apiFetch<Summary>('/api/site')
      .then((result) => {
        if (active) setSummary(result);
      })
      .catch(() => {
        if (active) setSummary(null);
      });

    return () => {
      active = false;
    };
  }, [canManageContent]);

  const firstName = user?.name?.trim().split(/\s+/)[0];

  if (loading) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-[#E5EBE5] bg-white p-8"
      >
        <p className="text-sm text-[#647572]">
          Preparando tu espacio de trabajo…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="max-w-xl rounded-3xl border border-[#E5EBE5] bg-white p-8"
      >
        <h2 className="text-xl font-semibold text-[#173F43]">
          No pudimos cargar tu información
        </h2>
        <p className="mt-2 text-sm text-[#647572]">
          Revisa tu conexión e inténtalo nuevamente.
        </p>
        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#174E50] px-5 text-sm font-semibold text-white ${focus}`}
        >
          <RefreshCw className="h-4 w-4" />
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1150px] space-y-9 pb-12">

      {/* BIENVENIDA */}
      <section className="relative overflow-hidden rounded-[28px] border border-[#E0EAE2] bg-[#EAF2EB] px-6 py-8 sm:px-9 sm:py-10">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#598076]">
            Mi espacio de trabajo
          </span>

          <h1 className="mt-3 font-serif text-[30px] leading-tight text-[#173F43] sm:text-[40px]">
            ¡Hola{firstName ? `, ${firstName}` : ''}!
          </h1>

          <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#536E69]">
            {canManageAppointments && canManageContent
              ? 'Desde aquí puedes organizar tus citas y mantener actualizada tu página web.'
              : canManageAppointments
                ? 'Aquí puedes organizar la agenda y consultar la información de tus pacientes.'
                : 'Aquí puedes actualizar la información que aparece en tu página web.'}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[42px] border-white/35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-[#DCEBDD]/60"
        />
      </section>

      {/* ACCIONES PRINCIPALES */}
      <section aria-labelledby="quick-actions-title">
        <SectionHeading
          title="¿Qué te gustaría hacer hoy?"
          description="Selecciona una opción para comenzar."
          id="quick-actions-title"
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {canManageAppointments && (
            <FeatureCard
              title="Mi agenda"
              description="Consulta tus citas y organiza las actividades del consultorio."
              href="/admin/agenda"
              icon={CalendarDays}
              action="Ver mi agenda"
              emphasized
            />
          )}

          {canManageContent && (
            <FeatureCard
              title="Editar mi página"
              description="Actualiza tus servicios, información profesional y datos de contacto."
              href="#contenido-web"
              icon={PencilLine}
              action="Elegir qué editar"
            />
          )}

          {canManageAppointments && (
            <FeatureCard
              title="Pacientes y citas"
              description="Consulta los pacientes registrados y administra sus citas."
              href="/admin/pacientes"
              icon={UsersRound}
              action="Ver pacientes"
            />
          )}
        </div>
      </section>

      {/* CONTENIDO DEL SITIO */}
      {canManageContent && (
        <section
          id="contenido-web"
          aria-labelledby="content-title"
          className="scroll-mt-28"
        >
          <SectionHeading
            id="content-title"
            title="Contenido de mi página"
            description="Elige la sección de tu sitio web que deseas actualizar."
          />

          <div className="mt-5 overflow-hidden rounded-[24px] border border-[#E5EBE5] bg-white">
            <div className="grid divide-y divide-[#EDF0EC] sm:grid-cols-2 sm:divide-y-0">
              {contentItems.map((item) => (
                <ContentItem key={item.href} {...item} />
              ))}
            </div>
          </div>

          {summary?.promotion?.activo && (
            <p className="mt-4 text-xs leading-5 text-[#647572]">
              Actualmente tienes una promoción activa:{' '}
              <span className="font-semibold text-[#174E50]">
                {summary.promotion.nombre || 'Paquete promocional'}
              </span>
              .
            </p>
          )}
        </section>
      )}

      {/* CONFIGURACIÓN */}
      {canManageUsers && (
        <section
          aria-labelledby="settings-title"
          className="border-t border-[#E1E9E2] pt-7"
        >
          <SectionHeading
            id="settings-title"
            title="Configuración"
            description="Opciones de administración del sistema."
          />

          <Link
            href="/admin/usuarios"
            className={`mt-4 inline-flex min-h-12 items-center gap-3 rounded-xl border border-[#E1E9E2] bg-white px-5 py-3 text-sm font-medium text-[#174E50] transition-colors hover:bg-[#EDF5EF] ${focus}`}
          >
            <UserCog className="h-5 w-5" />
            Administrar usuarios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      {!canManageAppointments && !canManageContent && (
        <p role="status" className="text-sm text-[#647572]">
          Tu cuenta no tiene secciones de trabajo disponibles.
        </p>
      )}
    </div>
  );
}

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2
        id={id}
        className="font-serif text-[25px] leading-tight text-[#173F43] sm:text-[28px]"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#647572]">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  action,
  emphasized = false,
}: NavigationItem & {
  action: string;
  emphasized?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex min-h-[205px] flex-col rounded-[24px] border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${focus} ${
        emphasized
          ? 'border-[#BDD6CC] bg-[#DDEDE6]'
          : 'border-[#E2EAE3] bg-white'
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF5EF] text-[#276B65]">
        <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[#173F43]">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-[#647572]">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#276B65]">
        {action}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function ContentItem({
  title,
  description,
  href,
  icon: Icon,
}: NavigationItem) {
  return (
    <Link
      href={href}
      className={`group flex min-h-[104px] items-center gap-4 border-b border-[#EDF0EC] p-5 transition-colors hover:bg-[#F5F9F5] sm:p-6 ${focus}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EDF5EF] text-[#35776B]">
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold text-[#173F43]">
          {title}
        </span>
        <span className="mt-1 block text-[12px] leading-5 text-[#71817C]">
          {description}
        </span>
      </span>

      <ArrowRight
        className="h-4 w-4 shrink-0 text-[#8BA49A] transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
