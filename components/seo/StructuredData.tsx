'use client';

import { useSiteData } from '@/components/SiteDataProvider';

const dayMap: Record<string, string> = {
  lunes: 'Monday',
  martes: 'Tuesday',
  miercoles: 'Wednesday',
  jueves: 'Thursday',
  viernes: 'Friday',
  sabado: 'Saturday',
  domingo: 'Sunday',
};

function normalizeDay(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getSiteUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' ||
      url.hostname === 'localhost' ||
      url.hostname === '127.0.0.1'
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function normalizeTime(value: string): string | null {
  const match = value.trim().match(
    /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/,
  );

  return match ? `${match[1]}:${match[2]}` : null;
}

const SITE_URL = getSiteUrl();

export function StructuredData() {
  const { contact, profile } = useSiteData();

  if (!SITE_URL) {
    return null;
  }

  const websiteId = `${SITE_URL}/#website`;
  const businessId = `${SITE_URL}/#consultorio`;
  const personId = `${SITE_URL}/#erika-pilar`;

  const openingHoursSpecification = (
    contact.businessHours ?? []
  ).flatMap((item) => {
    if (
      !item.enabled ||
      !item.startTime ||
      !item.endTime
    ) {
      return [];
    }

    const day = dayMap[normalizeDay(item.day)];
    const opens = normalizeTime(item.startTime);
    const closes = normalizeTime(item.endTime);

    if (!day || !opens || !closes) {
      return [];
    }

    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens,
        closes,
      },
    ];
  });

  const jsonLd = {
    '@context': 'https://schema.org',

    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${SITE_URL}/`,
        name: 'Erika Pilar',
        alternateName: 'Erika Pilar | Psicología Clínica',
        inLanguage: 'es-MX',

        publisher: {
          '@id': businessId,
        },
      },

      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        jobTitle: profile.professionalTitle,
        url: `${SITE_URL}/quien-soy`,

        description:
          'Psicóloga clínica con enfoque en Terapia Cognitivo-Conductual y atención presencial en Tlajomulco de Zúñiga y en línea.',

        knowsAbout: [
          'Psicología clínica',
          'Psicoterapia',
          'Terapia Cognitivo-Conductual',
        ],
      },

      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: 'Erika Pilar | Psicología Clínica',
        url: `${SITE_URL}/`,
        telephone: contact.phone?.trim() || undefined,

        // Estas imágenes deben existir en la carpeta public.
        image: `${SITE_URL}/logo.png`,
        logo: `${SITE_URL}/03-isotipo.png`,

        description:
          'Consultorio de psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial en Tlajomulco de Zúñiga, Jalisco, y en línea, con cita previa.',

        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Calle Jacaranda #26, Fraccionamiento Prados de la Higuera, cruce con Andador N3',
          postalCode: '45640',
          addressLocality: 'Tlajomulco de Zúñiga',
          addressRegion: 'Jalisco',
          addressCountry: 'MX',
        },

        openingHoursSpecification:
          openingHoursSpecification.length > 0
            ? openingHoursSpecification
            : undefined,

        hasMap: contact.mapsUrl?.trim() || undefined,
      },

      {
        '@type': 'Service',
        '@id': `${SITE_URL}/#psicoterapia`,
        name: 'Psicoterapia',
        serviceType:
          'Psicoterapia con enfoque cognitivo-conductual',
        url: `${SITE_URL}/psychotherapy`,

        provider: {
          '@id': personId,
        },
      },
    ],
  };

  return (
    <script
      id="site-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(
          /</g,
          '\\u003c',
        ),
      }}
    />
  );
}