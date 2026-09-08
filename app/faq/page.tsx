import { Navbar } from '@/components/Navbar';
import { FAQList } from '@/components/FAQList';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

import { faqMock } from '@/data/faq.mock';

export default function DudasFrecuentes() {
  return (
    <main className="min-h-screen">
      <Navbar />
   <div className="pt-20"></div>
      <FAQList faqs={faqMock} />

      <Footer />

      <WhatsAppButton />
    </main>
  );
}