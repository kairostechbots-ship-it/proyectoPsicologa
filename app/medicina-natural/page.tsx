import { Navbar } from '@/components/Navbar';
import { NaturalMedicineHero } from '@/components/NaturalMedicine';
import { NaturalTechniques } from '@/components/NaturalTechniques';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

import { naturalMedicineMock } from '@/data/natural-medicine.mock';

export default function NaturalMedicinePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

 <div className="pt-20"></div>
      <NaturalTechniques consultation={naturalMedicineMock} />

      <FinalCTA />

    <Footer variant="light" />

      <WhatsAppButton />
    </main>
  );
}