import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Booking } from '@/components/Booking';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] selection:bg-[#E8F0EA] selection:text-[#4A5D4E]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </main>
  );
}
