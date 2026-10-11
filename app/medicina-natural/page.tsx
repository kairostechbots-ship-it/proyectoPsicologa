import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveNaturalMedicine } from '@/components/LivePageSections';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title = 'Medicina Natural en Tlajomulco';

const socialTitle = `${title} | Erika Pilar`;

const description =
  'Conoce la consulta de medicina natural de Erika Pilar en Tlajomulco, las técnicas disponibles y cómo solicitar información y una cita.';

export const metadata: Metadata = {
  // El layout agrega automáticamente: | Erika Pilar.
  title,

  description,

  alternates: {
    canonical: '/medicina-natural',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/medicina-natural',
    title: socialTitle,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Erika Pilar. Información sobre la consulta de medicina natural en Tlajomulco.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description,
    images: ['/og-erika-pilar.png'],
  },
};

export default function NaturalMedicinePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-20" />

      <LiveNaturalMedicine />

      <FinalCTA />

      <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}