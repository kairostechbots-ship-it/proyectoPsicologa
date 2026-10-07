import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveContact } from '@/components/LivePageSections';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';



export const metadata: Metadata = {
  title: 'Contacto y Consultorio en Tlajomulco',

  description:
    'Contacta a Erika Pilar para solicitar información sobre psicoterapia y consultas. Consulta ubicación, horarios de atención y contacto por WhatsApp en Tlajomulco.',

  openGraph: {
    title:
      'Contacto y Consultorio en Tlajomulco | Erika Pilar',

    description:
      'Consulta la ubicación, horarios de atención y medios de contacto de Erika Pilar en Tlajomulco.',
  },

  twitter: {
    title:
      'Contacto y Consultorio en Tlajomulco | Erika Pilar',

    description:
      'Ubicación, horarios de atención y medios de contacto de Erika Pilar en Tlajomulco.',
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="pt-20">
        <LiveContact />
      </div>

      <Footer />

      <WhatsAppButton />
    </main>
  );
}