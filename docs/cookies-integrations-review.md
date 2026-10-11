# Cookies e integraciones antes del lanzamiento

Revisión del 11 de octubre de 2026 sobre el repositorio y la página pública de contacto. No se accedió a pacientes, expedientes, cuentas administrativas, secretos ni al panel de Vercel. No se enviaron solicitudes de prueba que creen registros.

## Hallazgos y alcance

- No se encontraron scripts de Google Analytics, Tag Manager, Clarity, Meta Pixel ni Vercel Analytics en el código revisado. Los scripts visibles en `/contacto` eran recursos del propio sitio. Esto no verifica ajustes del proveedor que no sean visibles en el repositorio ni todas las posibles cookies de terceros.
- La respuesta HTTP revisada de `/contacto` no incluyó Set-Cookie. Esto no prueba ausencia de cookies en todo el sitio ni dentro del iframe de Google; las cookies HttpOnly y el almacenamiento de terceros no se inventariaron en una sesión de navegador limpia.
- Google Maps se cargaba mediante un iframe lazy sin una acción expresa del visitante. `loading=lazy` difiere una descarga, pero no supone consentimiento.
- La API pública `/api/site` respondió `chatEnabled: false`. El código lo deriva únicamente de `GEMINI_API_KEY`; agregar una clave reactivaría la interfaz sin una decisión de lanzamiento separada.
- No se encontraron llamadas a localStorage ni sessionStorage en el código de la aplicación revisado. Las bibliotecas o servicios externos pueden comportarse de manera distinta.
- `next/font/google` sirve las fuentes como recursos del propio sitio; las URLs observadas eran `/_next/static/media`.

## Cambios incluidos

- El mapa de Google no se monta ni recibe `src` hasta pulsar «Cargar mapa de Google», tras mostrar que puede utilizar cookies y recibir datos técnicos.
- La dirección y el enlace externo siguen disponibles sin cargar el mapa integrado. El enlace externo abre un tercero únicamente cuando el visitante lo pulsa.
- «Ocultar mapa» desmonta el iframe; no promete borrar cookies ya instaladas por Google. La selección no se guarda en cookies ni almacenamiento persistente.
- Política `/cookies`, enlaces desde el footer y el mapa, y ruta en sitemap.
- No se agrega un banner general de «Aceptar todo» ni se presenta la carga del mapa como consentimiento clínico.

## Consentimiento y límites jurídicos

La LFPDPPP regula el tratamiento de datos personales y distingue modalidades de consentimiento y supuestos de excepción. La sola existencia de una cookie no permite deducir que todo sitio mexicano deba tener un banner general. La conclusión depende de las finalidades y tecnologías reales; no equivale a una certificación jurídica de cumplimiento.

Para esta integración opcional se eligió una activación informada antes de contactar a Google. Si se añaden analíticas, publicidad o tecnologías adicionales, deben inventariarse y revisar el aviso, los mecanismos de elección y la base jurídica antes de activarlas. La política propuesta debe ser revisada por la responsable.

## Pendientes del backend

1. Introducir una opción explícita de habilitación del chat independiente de la clave y comprobarla tanto en `/api/site` como en `/api/chat`, antes de usar esa integración. Ocultar el componente por sí solo no bloquea el endpoint.
2. Si el lanzamiento realmente acepta solicitudes solo por WhatsApp, quien administra el backend debe decidir cómo deshabilitar `/api/appointments` y `/api/questions` para visitantes. En el código revisado siguen disponibles con validación de origen y límites de frecuencia, pero sin autenticación de usuario. No se comprobó su aceptación de solicitudes en producción para evitar crear datos de prueba.
3. Revisar Google Calendar: cuando existe una conexión activa, la creación de citas puede transmitir nombre del paciente y nombre del servicio en el título del evento. Evaluar usar referencias y un título neutro, además de revisar permisos, destinatarios y cobertura del aviso.
4. Resend se utiliza opcionalmente para notificar citas. El mensaje de código contiene fecha/hora y referencia; no contiene historia clínica. No se comprobó si el servicio está configurado en producción.
5. La base de datos y Google Calendar no están acreditados como desactivados solo porque no se use el panel. Revisar permisos y accesos con la persona responsable del backend.
6. Confirmar en Vercel si existen servicios de analítica, observabilidad o retención de registros activados fuera del código. Inventariar proveedores y personas con acceso.

## Verificación pendiente

- Vista previa en móvil y escritorio: comprobar que el iframe no existe antes del clic, se crea al cargar y desaparece al ocultar; verificar Tab y foco al cambiar de estado.
- Sesión limpia de navegador: inventario de cookies y almacenamiento antes y después de cargar el mapa y en el acceso administrativo. No usar una sesión con datos de pacientes.
- Revisión de Erika del texto de cookies y de los proveedores operativos. La autorización para publicar datos profesionales no sustituye la confirmación de las prácticas de tratamiento.

## Fuentes primarias

- LFPDPPP vigente, artículos 7, 8 y 14 a 16: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- Política de Google, datos técnicos y tecnologías de almacenamiento: https://policies.google.com/privacy
- Documentación del mapa integrado: https://developers.google.com/maps/documentation/embed/embedding-map
- Datos de solicitudes en el alojamiento: https://vercel.com/docs/headers/request-headers
