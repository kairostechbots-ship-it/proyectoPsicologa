import type { Metadata } from 'next';

import { Navbar } from '@/components/layout/Navbar';
import { LiveAbout } from '@/components/LivePageSections';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';



export const metadata: Metadata = {
  title: 'Sobre Erika Pilar | Psicóloga Clínica',

  description:
    'Conoce la trayectoria profesional de Erika Pilar, psicóloga clínica con enfoque cognitivo-conductual y más de 22 años de experiencia en atención psicológica.',

  openGraph: {
    title: 'Sobre Erika Pilar | Psicóloga Clínica',

    description:
      'Conoce la trayectoria, formación y enfoque profesional de Erika Pilar en psicología clínica y terapia cognitivo-conductual.',
  },

  twitter: {
    title: 'Sobre Erika Pilar | Psicóloga Clínica',

    description:
      'Conoce la trayectoria, formación y enfoque profesional de Erika Pilar en psicología clínica y terapia cognitivo-conductual.',
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