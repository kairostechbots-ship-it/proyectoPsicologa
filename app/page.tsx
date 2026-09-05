import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AppointmentSteps } from '@/components/AppointmentSteps';
import {TCCSection} from '@/components/TCCSection';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Footer } from '@/components/Footer';
import { NaturalMedicinePreview } from '@/components/NaturalMedicinePreview';
import { naturalMedicineMock } from '@/data/natural-medicine.mock';

import { ConsultationAreas } from '@/components/ConsultationAreas';
import { ProfessionalSummary } from '@/components/ProfessionalSummary';
import { FinalCTA } from '@/components/FinalCTA';


export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <ConsultationAreas/>

  <TCCSection />
      <ProfessionalSummary/>

        <AppointmentSteps />
  <NaturalMedicinePreview
  consultation={naturalMedicineMock}
/>
<FinalCTA/>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
