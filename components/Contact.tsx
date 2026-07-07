'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white text-[#2D3436] relative overflow-hidden">
      {/* Decorative abstract elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F0EA] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8F0EA] rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-[#7D9D85] font-bold tracking-widest text-sm uppercase mb-3">Contacto</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2D3436] mb-6">
                Estamos aquí para escucharte
              </h3>
              <p className="text-[#636E72] leading-relaxed max-w-md">
                Si tienes alguna duda adicional o prefieres agendar por mensaje directo, no dudes en escribirnos. Te responderemos lo antes posible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F0EA] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A5D4E] mb-1">WhatsApp / Teléfono</h4>
                  <p className="text-[#636E72]">+52 (55) 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F0EA] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A5D4E] mb-1">Correo Electrónico</h4>
                  <p className="text-[#636E72]">contacto@bienestarmente.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F0EA] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A5D4E] mb-1">Consultorio</h4>
                  <p className="text-[#636E72]">Av. de la Paz 123, Colonia Centro<br/>Ciudad, CP 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FBFA] text-[#2D3436] p-8 md:p-10 rounded-[32px] border border-[#7D9D85]/10 shadow-xl">
            <h4 className="text-2xl font-serif text-[#2D3436] mb-6">Envíanos un mensaje</h4>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-[#636E72] mb-2">Nombre completo</label>
                <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#636E72] mb-2">Correo electrónico</label>
                <input required type="email" className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="tu@correo.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#636E72] mb-2">Mensaje o Dudas</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E0E0E0] focus:ring-2 focus:ring-[#7D9D85] focus:border-transparent outline-none transition" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#7D9D85] text-white rounded-2xl font-bold hover:bg-[#6A8971] transition-all shadow-xl shadow-[#7D9D85]/20"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 md:mt-24 rounded-[32px] overflow-hidden border border-[#7D9D85]/10 shadow-lg h-[400px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120428.16913619558!2d-99.21557009403487!3d19.400588647035544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sMexico%20City%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            title="Ubicación del consultorio"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
