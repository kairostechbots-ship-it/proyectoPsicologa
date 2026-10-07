import type { Metadata } from 'next';
import {
  Inter,
  Playfair_Display,
} from 'next/font/google';

import { SiteDataProvider, type SiteData } from '@/components/SiteDataProvider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  /* =========================================================
     TÍTULO Y DESCRIPCIÓN GENERAL
  ========================================================= */

  title: {
    default: 'Erika Pilar | Psicología Clínica',
    template: '%s | Erika Pilar',
  },

  description:
    'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial y en línea para niños, adolescentes, adultos y parejas.',

  /* =========================================================
     ICONOS
  ========================================================= */

  icons: {
    icon: '/04-favicon.png',
    shortcut: '/04-favicon.png',
    apple: '/04-favicon.png',
  },

  /* =========================================================
     INFORMACIÓN GENERAL
  ========================================================= */

  applicationName: 'Erika Pilar',

  authors: [
    {
      name: 'Erika Pilar',
    },
  ],

  creator: 'Erika Pilar',

  keywords: [
    'Erika Pilar',
    'psicología clínica',
    'psicoterapia',
    'terapia psicológica',
    'terapia cognitivo conductual',
    'TCC',
    'psicóloga',
    'psicoterapia presencial',
    'psicoterapia en línea',
    'terapia para adultos',
    'terapia para adolescentes',
    'terapia para niños',
    'terapia de pareja',
    'Tlajomulco',
    'Tlajomulco de Zúñiga',
    'Jalisco',
  ],

  category: 'health',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  /* =========================================================
     OPEN GRAPH
     WhatsApp, Facebook, LinkedIn, etc.
  ========================================================= */

  openGraph: {
    type: 'website',

    locale: 'es_MX',

    siteName: 'Erika Pilar | Psicología Clínica',

    title: 'Erika Pilar | Psicología Clínica',

    description:
      'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial y en línea.',

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt: 'Erika Pilar | Psicóloga Clínica y Psicoterapia TCC',
      },
    ],
  },

  /* =========================================================
     TWITTER / X
  ========================================================= */

  twitter: {
    card: 'summary_large_image',

    title: 'Erika Pilar | Psicología Clínica',

    description:
      'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial y en línea.',

    images: ['/og-erika-pilar.png'],
  },

  /* =========================================================
     ROBOTS
  ========================================================= */

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialData: SiteData | null = null;
  try {
    if (process.env.APP_URL) {
      const response = await fetch(new URL('/api/site', process.env.APP_URL), { cache: 'no-store', signal: AbortSignal.timeout(5000) });
      if (response.ok) initialData = (await response.json()).data;
    }
  } catch { /* The client retries if the public API is temporarily unavailable. */ }
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
        {/* =====================================================
            DATOS ESTRUCTURADOS / JSON-LD
        ====================================================== */}



        {/* =====================================================
            FONDO GLOBAL UNIFICADO
        ====================================================== */}

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

        {/* =====================================================
            CONTENIDO DEL SITIO
        ====================================================== */}

        <SiteDataProvider initialData={initialData}>{children}</SiteDataProvider>
      </body>
    </html>
  );
}