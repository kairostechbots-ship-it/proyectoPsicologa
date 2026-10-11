import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import {
  Inter,
  Playfair_Display,
} from 'next/font/google';

import {
  SiteDataProvider,
  type SiteData,
} from '@/components/SiteDataProvider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

function getMetadataBase(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== 'https:' ||
      url.hostname === 'localhost' ||
      url.hostname === '127.0.0.1'
    ) {
      return undefined;
    }

    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

const siteTitle =
  'Erika Pilar | Psicóloga en Tlajomulco';

const siteDescription =
  'Psicología clínica y psicoterapia con enfoque cognitivo-conductual en Tlajomulco, Jalisco. Atención presencial y en línea con cita previa.';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),

  title: {
    default: siteTitle,
    template: '%s | Erika Pilar',
  },

  description: siteDescription,

  applicationName: 'Erika Pilar',

  authors: [
    {
      name: 'Erika Pilar',
    },
  ],

  creator: 'Erika Pilar',

  category: 'health',

  icons: {
    icon: '/04-favicon.png',
    shortcut: '/04-favicon.png',
    apple: '/04-favicon.png',
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    title: siteTitle,
    description: siteDescription,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Erika Pilar, psicóloga clínica en Tlajomulco. Psicoterapia presencial y en línea.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-erika-pilar.png'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const dynamic = 'force-dynamic';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  let initialData: SiteData | null = null;

  try {
    if (process.env.APP_URL) {
      const response = await fetch(
        new URL('/api/site', process.env.APP_URL),
        {
          cache: 'no-store',
          signal: AbortSignal.timeout(5000),
        },
      );

      if (response.ok) {
        const result = await response.json();

        initialData = result.data ?? null;
      }
    }
  } catch {
    // El proveedor mantiene su recuperación desde el cliente.
  }

  return (
    <html
      lang="es-MX"
      className={`
        ${inter.variable}
        ${playfair.variable}
        scroll-smooth
      `}
    >
      <body
        className="
          bg-[#FBFAF7]
          font-sans
          text-[#37454A]
          antialiased
          selection:bg-[#D9E6DF]
          selection:text-[#37454A]
        "
        suppressHydrationWarning
      >
        <div
          className="
            pointer-events-none
            fixed
            inset-0
            z-[-1]
            bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(217,230,223,0.5),rgba(255,255,255,0))]
          "
        />

        <div
          className="
            pointer-events-none
            fixed
            inset-0
            z-[-1]
            bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(120,149,163,0.15),rgba(255,255,255,0))]
          "
        />

        <div
          className="
            pointer-events-none
            fixed
            inset-0
            z-[-1]
            bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSg1NSwgNjksIDc0LCAwLjA1KSIvPgo8L3N2Zz4=')]
            opacity-60
          "
        />

        <SiteDataProvider initialData={initialData}>
          {children}
        </SiteDataProvider>
      </body>
    </html>
  );
}