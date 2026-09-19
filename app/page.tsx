import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { ConsultationAreas } from '@/components/home/ConsultationAreas';
import { TCCSection } from '@/components/home/TCCSection';
import { ProfessionalSummary } from '@/components/home/ProfessionalSummary';
import { AppointmentSteps } from '@/components/home/AppointmentSteps';
import { PsychotherapyPromotion } from '@/components/home/PsychotherapyPromotion';
import { NaturalMedicinePreview } from '@/components/home/NaturalMedicinePreview';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

import { naturalMedicineMock } from '@/data/natural-medicine.mock';

export const metadata: Metadata = {
  title: 'Psicología Clínica y Psicoterapia',

  description:
    'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial en Tlajomulco y en línea para niños, adolescentes, adultos y parejas.',

  openGraph: {
    title:
      'Erika Pilar | Psicología Clínica y Psicoterapia',

    description:
      'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial en Tlajomulco y en línea.',
  },

  twitter: {
    title:
      'Erika Pilar | Psicología Clínica y Psicoterapia',

    description:
      'Psicología clínica y psicoterapia con enfoque cognitivo-conductual. Atención presencial en Tlajomulco y en línea.',
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <Hero />

      <ConsultationAreas />

      <TCCSection />

      <ProfessionalSummary />

      <AppointmentSteps />

      <PsychotherapyPromotion />

      <NaturalMedicinePreview
        consultation={naturalMedicineMock}
      />

      <FinalCTA />

      <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}