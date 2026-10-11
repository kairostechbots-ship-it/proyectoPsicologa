import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveFAQ } from '@/components/LivePageSections';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title = 'Preguntas frecuentes sobre psicoterapia';

const socialTitle = `${title} | Erika Pilar`;

const description =
  'Resuelve tus dudas sobre psicoterapia, sesiones, atención presencial y en línea y cómo solicitar una cita con Erika Pilar en Tlajomulco.';

export const metadata: Metadata = {
  // El layout agrega automáticamente: | Erika Pilar.
  title,

  description,

  alternates: {
    canonical: '/faq',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/faq',
    title: socialTitle,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Preguntas frecuentes sobre psicoterapia y citas con Erika Pilar.',
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