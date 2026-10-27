import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { ConsultationAreas } from '@/components/home/ConsultationAreas';
import { TCCSection } from '@/components/home/TCCSection';
import { ProfessionalSummary } from '@/components/home/ProfessionalSummary';
import { AppointmentSteps } from '@/components/home/AppointmentSteps';
import { PsychotherapyPromotion } from '@/components/home/PsychotherapyPromotion';
import { LiveNaturalPreview } from '@/components/LivePageSections';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title =
  'Psicóloga en Tlajomulco y en línea | Erika Pilar';

const description =
  'Psicoterapia con enfoque cognitivo-conductual en Tlajomulco, Jalisco, y en línea. Conoce a Erika Pilar y solicita tu cita por WhatsApp.';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },

  description,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/',
    title,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Erika Pilar, psicóloga clínica. Atención presencial en Tlajomulco y en línea.',
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

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main id="contenido-principal" tabIndex={-1} className="scroll-mt-28 focus:outline-none">

      <Hero />

      <ConsultationAreas />

      <TCCSection />

      <ProfessionalSummary />

      <AppointmentSteps />

      <PsychotherapyPromotion />

      <LiveNaturalPreview />

      <FinalCTA />

      </main>

      <Footer variant="light" />

      <WhatsAppButton />
    </div>
  );
}