import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Contacto() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
