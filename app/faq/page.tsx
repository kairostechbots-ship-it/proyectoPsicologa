import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveFAQ } from '@/components/LivePageSections';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';



export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Psicoterapia',

  description:
    'Resuelve tus dudas sobre psicoterapia, modalidades de atención, duración de las sesiones, citas y servicios de Erika Pilar en Tlajomulco y en línea.',

  openGraph: {
    title:
      'Preguntas Frecuentes | Psicoterapia con Erika Pilar',

    description:
      'Encuentra respuestas a las dudas más frecuentes sobre psicoterapia, citas, modalidades de atención y servicios disponibles.',
  },

  twitter: {
    title:
      'Preguntas Frecuentes | Psicoterapia con Erika Pilar',

    description:
      'Respuestas a preguntas frecuentes sobre psicoterapia, citas y modalidades de atención con Erika Pilar.',
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-20" />

      <LiveFAQ />

      <Footer />

      <WhatsAppButton />
    </main>
  );
}