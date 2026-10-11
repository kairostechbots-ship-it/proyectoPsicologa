import type { MetadataRoute } from 'next';

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

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/api$'],
    },

    ...(siteUrl
      ? {
          sitemap: `${siteUrl}/sitemap.xml`,
        }
      : {}),
  };
}