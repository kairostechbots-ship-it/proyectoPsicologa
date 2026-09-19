import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Services } from '@/components/psychotherapy/Psychotherapy';
import { ConsultationRecommendations } from '@/components/psychotherapy/ConsultationRecommendations';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Psicoterapia en Tlajomulco | Terapia TCC',

  description:
    'Psicoterapia con enfoque cognitivo-conductual en Tlajomulco y en línea. Atención psicológica para niños, adolescentes, adultos y parejas con Erika Pilar.',

  openGraph: {
    title:
      'Psicoterapia en Tlajomulco | Erika Pilar',

    description:
      'Atención psicológica con enfoque cognitivo-conductual para niños, adolescentes, adultos y parejas. Modalidad presencial y en línea.',
  },

  twitter: {
    title:
      'Psicoterapia en Tlajomulco | Erika Pilar',

    description:
      'Atención psicológica con enfoque cognitivo-conductual en modalidad presencial y en línea.',
  },
};

export default function PsychotherapyPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="pt-20">
        <Services />
      </div>

      <ConsultationRecommendations />

      <Footer />

      <WhatsAppButton />
    </main>
  );
}