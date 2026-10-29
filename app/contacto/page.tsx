import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveContact } from '@/components/LivePageSections';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const title = 'Contacto y consultorio en Tlajomulco';

const socialTitle = `${title} | Erika Pilar`;

const description =
  'Consulta la ubicación y los horarios del consultorio de Erika Pilar en Tlajomulco, Jalisco. Solicita información y disponibilidad por WhatsApp.';

export const metadata: Metadata = {
  // El layout agrega automáticamente: | Erika Pilar.
  title,

  description,

  alternates: {
    canonical: '/contacto',
  },

  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Erika Pilar',
    url: '/contacto',
    title: socialTitle,
    description,

    images: [
      {
        url: '/og-erika-pilar.png',
        width: 1200,
        height: 630,
        alt:
          'Contacto de Erika Pilar. Ubicación y horarios del consultorio en Tlajomulco.',
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

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main id="contenido-principal" tabIndex={-1} className="scroll-mt-28 focus:outline-none">

        <LiveContact />
      

      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
}