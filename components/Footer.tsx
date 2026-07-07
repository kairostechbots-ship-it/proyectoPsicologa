import { Leaf, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-[#7D9D85]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#7D9D85] flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-[#4A5D4E] tracking-tight">
                Dra. Jazmín
              </span>
            </div>
            <p className="text-[#636E72] text-sm leading-relaxed mb-6">
              Un espacio seguro y confidencial para tu crecimiento personal y bienestar emocional. Terapia psicológica presencial y en línea.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-bold text-[#2D3436] mb-6 tracking-wide">Explorar</h3>
            <div className="flex flex-col gap-4 text-sm font-medium text-[#636E72]">
              <Link href="#home" className="hover:text-[#7D9D85] transition-colors w-fit">Inicio</Link>
              <Link href="#about" className="hover:text-[#7D9D85] transition-colors w-fit">Conóceme</Link>
              <Link href="#services" className="hover:text-[#7D9D85] transition-colors w-fit">Servicios</Link>
              <Link href="#faq" className="hover:text-[#7D9D85] transition-colors w-fit">Dudas Frecuentes</Link>
            </div>
          </div>

          {/* Contacto */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-[#2D3436] mb-6 tracking-wide">Contacto</h3>
            <div className="flex flex-col gap-4 text-sm text-[#636E72]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7D9D85] flex-shrink-0" />
                <span>Av. Reforma 234, Consultorio 402<br />Ciudad de México</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#7D9D85] flex-shrink-0" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#7D9D85] flex-shrink-0" />
                <span>hola@drajazmin.com</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-bold text-[#2D3436] mb-6 tracking-wide">Sígueme</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#F9FBFA] border border-[#E0E0E0] flex items-center justify-center text-[#636E72] hover:bg-[#7D9D85] hover:text-white hover:border-[#7D9D85] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#F9FBFA] border border-[#E0E0E0] flex items-center justify-center text-[#636E72] hover:bg-[#7D9D85] hover:text-white hover:border-[#7D9D85] transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E0E0E0] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#636E72]">
          <p>&copy; {new Date().getFullYear()} Dra. Jazmín. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-[#7D9D85] transition-colors">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#7D9D85] transition-colors">Términos y Condiciones</Link>
            <Link href="/panel" className="text-[#7D9D85] font-medium hover:text-[#4A5D4E] transition-colors">
              Acceso Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
