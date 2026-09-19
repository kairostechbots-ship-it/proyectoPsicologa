import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

  /*
   * Mientras no exista un dominio definitivo,
   * evitamos generar URLs de localhost dentro del sitemap.
   */
  if (!siteUrl) {
    return [];
  }

  const routes = [
    {
      path: '',
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      path: '/quien-soy',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/psicoterapia',
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      path: '/medicina-natural',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/faq',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      path: '/contacto',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}