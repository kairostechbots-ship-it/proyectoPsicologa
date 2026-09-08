import { Navbar } from '@/components/Navbar';
import { About } from '@/components/About';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <About />

      <FinalCTA />

   <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}