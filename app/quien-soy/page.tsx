import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveAbout } from '@/components/LivePageSections';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title =
  'Sobre Erika Pilar | Psicóloga Clínica en Tlajomulco';

const description =
  'Conoce la formación, trayectoria y enfoque de Erika Pilar, psicóloga clínica con atención en Tlajomulco y en línea mediante terapia cognitivo-conductual.';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },

  description,

  alternates: {
    canonical: '/quien-soy',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/quien-soy',
    title,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Erika Pilar, psicóloga clínica. Formación, trayectoria y enfoque cognitivo-conductual.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-erika-pilar.png'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <LiveAbout />

      <FinalCTA />

      <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}