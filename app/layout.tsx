import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Dra. | Psicología y Medicina Natural',
  description: 'Servicios profesionales de salud mental, terapia psicológica y medicina natural. Solicita información en línea.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#37454A] bg-[#FBFAF7] selection:bg-[#D9E6DF] selection:text-[#37454A]" suppressHydrationWarning>
        
        {/* Fondo global unificado */}
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(217,230,223,0.5),rgba(255,255,255,0))]"></div>
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(120,149,163,0.15),rgba(255,255,255,0))]"></div>
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSg1NSwgNjksIDc0LCAwLjA1KSIvPgo8L3N2Zz4=')] opacity-60"></div>
        
        {children}
      </body>
    </html>
  );
}
