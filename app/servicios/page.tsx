import { Navbar } from '@/components/Navbar';
import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Servicios() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
