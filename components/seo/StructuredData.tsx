'use client';
import { useSiteData } from '@/components/SiteDataProvider';



const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

const dayMap: Record<string, string> = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

export function StructuredData() {
 const { contact: contactMock, profile: profileMock } = useSiteData();


  /*
   * Mientras no exista un dominio definitivo,
   * evitamos generar URLs falsas o localhost
   * dentro de los datos estructurados.
   */
  if (!SITE_URL) {
    return null;
  }

  const openingHoursSpecification = contactMock.businessHours
    .filter(
      (item) =>
        item.enabled &&
        item.startTime &&
        item.endTime &&
        dayMap[item.day],
    )
    .map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${dayMap[item.day]}`,
      opens: item.startTime,
      closes: item.endTime,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',

    '@graph': [
      /* =====================================================
         SITIO WEB
      ====================================================== */

      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,

        url: SITE_URL,

        name: 'Erika Pilar | Psicología Clínica',

        alternateName: 'Erika Pilar',

        inLanguage: 'es-MX',

        publisher: {
          '@id': `${SITE_URL}/#professional-service`,
        },
      },

      /* =====================================================
         PROFESIONAL
      ====================================================== */

      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#erika-pilar`,

        name: profileMock.name,

        jobTitle: profileMock.professionalTitle,

        description:
          'Licenciada en Psicología Clínica con enfoque en Terapia Cognitivo-Conductual (TCC) y trayectoria en atención psicológica y psicoterapia.',

        url: `${SITE_URL}/quien-soy`,

        knowsAbout: [
          'Psicología Clínica',
          'Psicoterapia',
          'Terapia Cognitivo-Conductual',
        ],

        worksFor: {
          '@id': `${SITE_URL}/#professional-service`,
        },
      },

      /* =====================================================
         SERVICIO PROFESIONAL
      ====================================================== */

      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#professional-service`,

        name: 'Erika Pilar | Psicología Clínica',

        url: SITE_URL,

        telephone: contactMock.phone,

        image: `${SITE_URL}/logo.png`,

        logo: `${SITE_URL}/03-isotipo.png`,

        description:
          'Servicios de psicología clínica y psicoterapia con enfoque cognitivo-conductual, con atención presencial y en línea.',

        address: {
          '@type': 'PostalAddress',

          streetAddress:
            'Calle Jacaranda #26, Fraccionamiento Prados de la Higuera, cruce con Andador N3',

          postalCode: '45640',

          addressLocality: 'Tlajomulco Centro',

          addressRegion: 'Jalisco',

          addressCountry: 'MX',
        },

        openingHoursSpecification,

        employee: {
          '@id': `${SITE_URL}/#erika-pilar`,
        },

        hasMap: contactMock.mapsUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}