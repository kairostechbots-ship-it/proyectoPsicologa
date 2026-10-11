import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Información sobre cookies técnicas, servicios externos y cómo decidir si se carga el mapa de Google.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-4xl scroll-mt-28 px-6 pb-20 pt-32 text-[#37454A] focus:outline-none sm:px-8">
        <h1 className="font-serif text-4xl leading-tight text-[#0F3D4A] sm:text-5xl">Política de cookies</h1>
        <p className="mt-6 text-base leading-7">Puede consultar la información del sitio sin cargar el mapa de Google. Esta página explica las tecnologías de almacenamiento y los servicios externos que pueden intervenir al utilizar determinadas funciones.</p>
        <div className="mt-10 space-y-8 text-base leading-7 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-[#0F3D4A] [&_a]:rounded [&_a]:underline [&_a]:underline-offset-4 [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-[#0F3D4A]">
          <section>
            <h2>Qué son las cookies</h2>
            <p>Son archivos que un servicio guarda en su navegador para conservar información, por ejemplo una sesión de acceso. Otras tecnologías, como el almacenamiento local, pueden guardar preferencias. Los registros técnicos del servidor son distintos de las cookies.</p>
          </section>
          <section>
            <h2>Cookies técnicas del acceso administrativo</h2>
            <p>El acceso al panel utiliza cookies de autenticación y protección de la sesión. La sesión administrativa está configurada con una duración máxima de ocho horas. La conexión opcional con Google Calendar también utiliza una cookie temporal para verificar el proceso de autorización. Estas funciones corresponden al acceso privado del personal autorizado.</p>
          </section>
          <section>
            <h2>Mapa de Google</h2>
            <p>El mapa integrado permanece desactivado hasta que pulse «Cargar mapa de Google». Al activarlo, su navegador contacta con Google, que puede recibir datos técnicos de su conexión y utilizar cookies u otros identificadores de acuerdo con su configuración y políticas.</p>
            <p className="mt-3">Puede pulsar «Ocultar mapa» para retirar el contenido integrado. Esta acción no elimina las cookies que Google haya guardado previamente. El sitio no guarda una preferencia persistente para activar automáticamente el mapa en visitas posteriores.</p>
            <p className="mt-3">También puede elegir «Abrir Google Maps», que abre el servicio externo. Consulte la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidad de Google</a> para conocer el tratamiento de datos por ese proveedor.</p>
          </section>
          <section>
            <h2>Enlaces a WhatsApp</h2>
            <p>Los botones de WhatsApp abren un servicio externo cuando usted los pulsa. Las cookies y el tratamiento de información dentro de WhatsApp dependen de ese servicio. Pulsar el enlace no autoriza el tratamiento de datos clínicos ni el envío de publicidad.</p>
          </section>
          <section>
            <h2>Registros técnicos y alojamiento</h2>
            <p>El sitio está alojado en Vercel. La prestación del alojamiento y la protección de las solicitudes pueden implicar el tratamiento de datos técnicos como la dirección IP y datos de la solicitud. Esto no significa por sí mismo que exista una cookie publicitaria.</p>
          </section>
          <section>
            <h2>Cómo gestionar las cookies</h2>
            <p>Desde la configuración de privacidad de su navegador puede consultar y eliminar cookies y otros datos del sitio, o bloquear cookies de terceros. La eliminación o el bloqueo de cookies técnicas puede cerrar sesiones o afectar funciones de acceso. Puede decidir no cargar el mapa y seguir consultando la dirección y los medios de contacto.</p>
          </section>
          <section>
            <h2>Contacto y actualizaciones</h2>
            <p>Las consultas sobre privacidad pueden enviarse a <a href="mailto:terapi.psic@gmail.com">terapi.psic@gmail.com</a>. Para conocer a la responsable, las finalidades y sus derechos, consulte el <Link href="/privacidad">aviso de privacidad integral</Link>. Las modificaciones a esta política se publicarán en esta página.</p>
          </section>
        </div>
      </main>
      <Footer variant="light" />
    </div>
  );
}
