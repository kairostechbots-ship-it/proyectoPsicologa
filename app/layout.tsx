import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Dra. | Psicología y Medicina Natural',
  description: 'Servicios profesionales de salud mental, terapia psicológica y medicina natural. Agenda tu cita en línea.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#2D3436] bg-[#F9FBFA]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
