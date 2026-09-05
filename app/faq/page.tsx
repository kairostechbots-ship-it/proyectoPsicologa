import { Navbar } from '@/components/Navbar';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function DudasFrecuentes() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div className="pt-20">
        <FAQ />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
