import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Services } from '@/components/psychotherapy/Psychotherapy';
import { ConsultationRecommendations } from '@/components/psychotherapy/ConsultationRecommendations';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title =
  'Psicoterapia TCC en Tlajomulco y en línea';

const socialTitle = `${title} | Erika Pilar`;

const description =
  'Psicoterapia con enfoque cognitivo-conductual para niños, adolescentes, adultos y parejas. Atención en Tlajomulco y en línea con Erika Pilar.';

export const metadata: Metadata = {
  // El layout agrega automáticamente: | Erika Pilar.
  title,

  description,

  alternates: {
    canonical: '/psychotherapy',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/psychotherapy',
    title: socialTitle,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Psicoterapia con Erika Pilar. Terapia cognitivo-conductual en Tlajomulco y en línea.',
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

export default function PsychotherapyPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main id="contenido-principal" tabIndex={-1} className="scroll-mt-28 focus:outline-none">

      <div className="pt-20">
        <Services />
      </div>

      <ConsultationRecommendations />

      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
}