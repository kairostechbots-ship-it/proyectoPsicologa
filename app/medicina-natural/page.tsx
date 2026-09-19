import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { NaturalTechniques } from '@/components/natural-medicine/NaturalTechniques';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

import { naturalMedicineMock } from '@/data/natural-medicine.mock';

export const metadata: Metadata = {
  title: 'Medicina Natural en Tlajomulco',

  description:
    'Conoce la consulta de medicina natural que ofrece Erika Pilar en Tlajomulco, así como las técnicas disponibles y la información para solicitar una cita.',

  openGraph: {
    title:
      'Medicina Natural en Tlajomulco | Erika Pilar',

    description:
      'Conoce las técnicas de medicina natural disponibles, la modalidad de atención y la información para solicitar una cita con Erika Pilar.',
  },

  twitter: {
    title:
      'Medicina Natural en Tlajomulco | Erika Pilar',

    description:
      'Información sobre consulta y técnicas de medicina natural disponibles con Erika Pilar en Tlajomulco.',
  },
};

export default function NaturalMedicinePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-20" />

      <NaturalTechniques
        consultation={naturalMedicineMock}
      />

      <FinalCTA />

      <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}