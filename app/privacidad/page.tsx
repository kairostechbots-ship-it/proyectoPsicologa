import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Información sobre el tratamiento de datos personales, contacto y derechos de privacidad con Erika Pilar Jiménez Miramontes.',
  alternates: { canonical: '/privacidad' },
};

const privacyEmail = 'terapi.psic@gmail.com';

function PrivacyEmail() {
  return <a href={`mailto:${privacyEmail}`} className="rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A]">{privacyEmail}</a>;
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF7]">
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="mx-auto max-w-4xl scroll-mt-28 px-6 pb-20 pt-32 text-[#37454A] focus:outline-none sm:px-8">
        <header className="mb-10">
          <p className="text-sm font-semibold text-[#52665A]">Erika Pilar</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-[#0F3D4A] sm:text-5xl">Aviso de privacidad integral</h1>
          <p className="mt-5 text-base leading-7">Este aviso explica cómo se tratan sus datos al solicitar información, coordinar citas y recibir atención psicológica. Puede contactar a la responsable para consultar el uso de su información y ejercer sus derechos.</p>
        </header>
        <div className="space-y-9 text-base leading-7 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-[#0F3D4A] [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-semibold [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <section aria-labelledby="responsable">
            <h2 id="responsable">1. Identidad y domicilio de la responsable</h2>
            <p>Lic. Erika Pilar Jiménez Miramontes, Licenciada en Psicología Clínica, con enfoque Cognitivo Conductual y cédula profesional número 14414740, es la responsable del tratamiento, uso y protección de sus datos personales y datos personales sensibles, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás disposiciones aplicables.</p>
            <p>Domicilio profesional para recibir notificaciones: Calle Jacarandas número 26, Fraccionamiento Prados de la Higuera, Tlajomulco de Zúñiga, Jalisco, México.</p>
            <p>Teléfono y WhatsApp: <a href="tel:+523311393410" className="rounded underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D4A]">33 11 39 34 10</a>.<br />Correo para solicitudes de privacidad: <PrivacyEmail />.</p>
          </section>
          <section aria-labelledby="sitio-whatsapp">
            <h2 id="sitio-whatsapp">2. Solicitudes desde el sitio y WhatsApp</h2>
            <p>Los botones de contacto del sitio permiten abrir WhatsApp para solicitar información y coordinar citas. Para estas solicitudes se utiliza su número de teléfono, nombre o identificación del perfil y la información que usted decida compartir en la conversación.</p>
            <p>Para consultar disponibilidad basta con proporcionar los datos necesarios para coordinar su cita. Evite enviar expedientes, identificaciones, diagnósticos o detalles sensibles de su salud por el canal inicial de contacto.</p>
            <p>WhatsApp es un servicio de un tercero y se rige también por sus propias condiciones y aviso de privacidad. Consultar este aviso o pulsar un botón de contacto no equivale a otorgar consentimiento para el tratamiento de datos sensibles ni a autorizar comunicaciones promocionales.</p>
          </section>
          <section aria-labelledby="datos">
            <h2 id="datos">3. Datos personales para la atención</h2>
            <p>Según el servicio y la etapa de atención, pueden recabarse las siguientes categorías de datos:</p>
            <ul>
              <li>Identificación y contacto: nombre completo, edad, fecha de nacimiento, sexo o género, estado civil, ocupación, dirección, teléfono celular y correo electrónico.</li>
              <li>Contacto de emergencia: nombre, parentesco y teléfono.</li>
              <li>Facturación, cuando corresponda: RFC, domicilio fiscal y régimen fiscal.</li>
            </ul>
            <h3>Datos personales sensibles</h3>
            <p>En la atención clínica y el expediente psicológico pueden tratarse antecedentes e historial psicológico y médico, dinámica familiar, social y afectiva, consumo de sustancias, tratamientos farmacológicos y aspectos ideológicos, de estilo de vida o vivencias personales compartidas durante el proceso terapéutico.</p>
            <p>Estos datos se utilizan para la evaluación, diagnóstico y tratamiento psicoterapéutico y están sujetos al secreto profesional. Su tratamiento requiere consentimiento expreso y por escrito mediante firma o un mecanismo de autenticación válido, salvo las excepciones previstas en la ley. El consentimiento clínico se obtiene mediante el procedimiento correspondiente a la atención; no se presume por navegar en este sitio.</p>
          </section>
          <section aria-labelledby="finalidades">
            <h2 id="finalidades">4. Finalidades del tratamiento</h2>
            <h3>Finalidades necesarias para el servicio</h3>
            <ul>
              <li>Responder solicitudes de información y coordinar, confirmar, reprogramar o cancelar citas por llamada o WhatsApp.</li>
              <li>Elaborar, resguardar y actualizar el expediente clínico psicológico.</li>
              <li>Realizar la evaluación, diagnóstico, intervención y seguimiento psicoterapéutico.</li>
              <li>Contactar a la persona de emergencia cuando resulte necesario y legalmente procedente ante una crisis o riesgo para la vida o integridad.</li>
              <li>Emitir comprobantes fiscales y gestionar el cobro de honorarios.</li>
            </ul>
            <h3>Finalidades opcionales</h3>
            <p>El envío de artículos sobre salud mental o boletines informativos al correo proporcionado es opcional. Puede manifestar su negativa o solicitar dejar de recibirlos mediante <PrivacyEmail />, sin que ello afecte la atención psicológica.</p>
          </section>
          <section aria-labelledby="confidencialidad">
            <h2 id="confidencialidad">5. Confidencialidad y comunicación de información</h2>
            <p>La información de las sesiones y del expediente se encuentra sujeta al secreto profesional. Su comunicación a otras personas debe limitarse a lo necesario y contar con el consentimiento o fundamento legal que corresponda.</p>
            <p>Esto puede incluir supuestos legalmente procedentes de emergencia, requerimientos de autoridad competente y comunicación con representantes legales cuando corresponda en la atención de menores de edad. Una excepción a la confidencialidad no constituye una autorización general para divulgar el expediente.</p>
          </section>
          <section aria-labelledby="arco">
            <h2 id="arco">6. Derechos ARCO y revocación del consentimiento</h2>
            <p>Puede solicitar acceso a sus datos, rectificación de información inexacta, cancelación cuando proceda u oposición al tratamiento, así como revocar su consentimiento o limitar el uso o divulgación de su información.</p>
            <p>Envíe su solicitud a <PrivacyEmail />, indicando su nombre, un medio para recibir respuesta, el derecho o petición que desea ejercer y los datos a los que se refiere, salvo en solicitudes de acceso. Incluya los elementos que faciliten localizar su información; para rectificación, indique la corrección solicitada y su sustento.</p>
            <p>Se deberá acreditar la identidad de la persona titular y, cuando corresponda, la representación legal. Puede contactar primero a la responsable para conocer cómo presentar la documentación necesaria y evitar enviar información adicional que no sea requerida.</p>
            <p>Para solicitudes ARCO, la determinación se comunicará en un máximo de veinte días hábiles desde su recepción. Si resulta procedente, se hará efectiva dentro de los quince días hábiles siguientes a la respuesta. Estos plazos podrán ampliarse una vez por un periodo igual cuando las circunstancias lo justifiquen, conforme a la ley.</p>
            <p>La revocación no tiene efectos retroactivos. La cancelación o la revocación pueden estar sujetas a obligaciones legales de conservación o a otros supuestos previstos en la legislación. La responsable informará la procedencia de su solicitud y el fundamento de cualquier limitación aplicable.</p>
          </section>
          <section aria-labelledby="virtual">
            <h2 id="virtual">7. Atención virtual</h2>
            <p>Para la atención en línea se utilizan plataformas digitales. Las medidas de protección dependen de la plataforma, su configuración y las prácticas de las personas participantes; ningún servicio digital permite prometer seguridad absoluta.</p>
            <p>Las sesiones no deben grabarse en audio o video por ninguna de las partes sin la autorización previa, expresa y por escrito de la otra parte.</p>
          </section>
          <section aria-labelledby="cambios">
            <h2 id="cambios">8. Cambios al aviso</h2>
            <p>Las modificaciones a este aviso estarán disponibles en esta página y en el consultorio. También puede solicitar la versión vigente mediante <PrivacyEmail />. Los cambios que requieran un nuevo consentimiento se comunicarán y atenderán conforme a la legislación aplicable.</p>
          </section>
        </div>
      </main>
      <Footer variant="light" />
    </div>
  );
}
