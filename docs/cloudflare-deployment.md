# Prueba de despliegue en Cloudflare Workers

Esta rama prepara una prueba independiente del proyecto de Erika Pilar. No cambia el dominio, no elimina Vercel y no publica automáticamente en Cloudflare.

## Configuración incluida

- Next.js 15.5.27, actualización de mantenimiento requerida por OpenNext 1.20.10.
- Adaptador OpenNext y Wrangler como dependencias de desarrollo.
- Worker `erika-pilar-preview`, recursos estáticos y vínculo de servicio al propio Worker.
- Compatibilidad Node.js y configuración de imágenes mediante el binding IMAGES.
- Comandos `cf:build`, `cf:preview`, `cf:check` y `cf:deploy`. Los comandos habituales de Next.js se conservan.
- Identificación por IP de Cloudflare para el limitador de solicitudes solo cuando DEPLOY_PLATFORM vale cloudflare. Vercel conserva prioridad cuando VERCEL está configurada.
- No se modifican esquemas, pacientes, expedientes, políticas de cancelación o el estado de activación del chatbot.

## Antes de conectar información privada

Usar una base de pruebas independiente, sin pacientes reales. No importar directamente la base clínica al nuevo alojamiento para una prueba. Conservar el despliegue actual. Proteger la prueba con Cloudflare Access antes de conectar información privada; revisar el acceso con la persona responsable del backend.

No compartir credenciales en chats ni añadirlas a GitHub. La autorización para subir cambios al repositorio no configura por sí misma proveedores de datos nuevos.

## Probar desde una computadora

Usar Node.js 22 o posterior y ejecutar los comandos dentro del proyecto:

```bash
npm ci
npm run cf:build
npm run cf:check
```

`cf:check` usa `wrangler deploy --dry-run`: empaqueta y muestra el tamaño, sin publicar. Para pruebas locales, configurar variables locales ignoradas por Git según la documentación de OpenNext y ejecutar `npm run cf:preview`.

## Crear el Worker desde GitHub

1. En Cloudflare, abrir Workers & Pages y crear una aplicación conectada a GitHub.
2. Elegir `kairostechbots-ship-it/proyectoPsicologa` y la rama `feat/cloudflare-workers` para la prueba. No cambiar primero la rama principal.
3. Directorio raíz: el directorio del repositorio. Comando de compilación: `npm run cf:build`. Comando de despliegue: `npx opennextjs-cloudflare deploy -- --keep-vars`. Mantener instaladas las dependencias de desarrollo durante la compilación.
4. El nombre del Worker debe coincidir con `erika-pilar-preview` en wrangler.jsonc y en WORKER_SELF_REFERENCE. Si se cambia, actualizar ambos valores.
5. Configurar variables de compilación y ejecución separadamente. No definir VERCEL en Cloudflare.
6. Desplegar en la URL temporal que Cloudflare proporcione. No inventar el subdominio antes de crear el Worker.

## Variables y secretos

| Nombre | Dónde | Valor o propósito |
| --- | --- | --- |
| NEXT_PUBLIC_SITE_URL | Compilación y ejecución | Origen HTTPS exacto del Worker de prueba; al finalizar, dominio definitivo. Se incorpora al JavaScript al compilar, por lo que requiere volver a compilar cuando cambia. |
| APP_URL | Ejecución | Mismo origen HTTPS. El layout lo usa para cargar `/api/site` y se debe comprobar que la carga del servidor funciona en Workers. |
| DATABASE_URL | Secreto de ejecución | Conexión a la base de pruebas. No incluye un valor en el repositorio. |
| AUTH_SECRET | Secreto de ejecución | Secreto exclusivo de esta prueba. No reutilizar credenciales de producción innecesariamente. |
| AUTH_URL | Ejecución | Origen HTTPS de la prueba para NextAuth, si se configura explícitamente. |
| AUTH_TRUST_HOST | Ejecución | `true`, incluido en wrangler.jsonc para Workers. |
| DEPLOY_PLATFORM | Ejecución | `cloudflare`, incluido en wrangler.jsonc. |

No copiar GEMINI_API_KEY si se desea mantener el chatbot desactivado: la aplicación actual lo activa por presencia de esa clave. Mantener inicialmente sin configurar Resend y Google Calendar. Si luego se habilitan, coordinar credenciales, permisos y revisión del aviso con la responsable del backend.

Las variables NEXT_PUBLIC_ nunca deben contener secretos. Para Workers Builds, configurar los valores de compilación en Build variables and secrets; para la aplicación, configurar los de ejecución en Variables and Secrets. El despliegue usa `--keep-vars` para conservar valores configurados en el panel.

## Comprobaciones antes de usar el dominio

- Probar la página pública con datos de prueba y verificar que el HTML inicial contiene contenido, no solo un estado de carga. Comprobar `/api/site`, todos los servicios y el aviso de privacidad.
- Verificar imágenes, fuentes, menú y tarjetas en escritorio y celular.
- Iniciar y cerrar sesión con un usuario de pruebas; verificar sesiones, protección de rutas y limitadores sin usar pacientes reales.
- Comprobar los tiempos de CPU especialmente en renderizado y bcrypt del inicio de sesión. La compilación no prueba que el plan gratuito soporte esos tiempos.
- Verificar sitemap, robots, canónicas y URL pública al cambiar NEXT_PUBLIC_SITE_URL. Mantener la prueba fuera de buscadores antes de sustituir el dominio.
- Revisar Google OAuth si se activa: cambiar GOOGLE_CALENDAR_REDIRECT_URI y registrar el callback exacto en Google. Revisar correo, tokens cifrados e integraciones solo cuando se decida habilitarlas.
- Actualizar la referencia al proveedor de alojamiento del aviso de privacidad antes del lanzamiento definitivo.

## Costos y límites

No se garantiza costo cero. Workers Free tiene límites de solicitudes y CPU; Workers Paid comienza con una suscripción de USD 5 mensuales más consumo adicional cuando corresponda. La optimización con IMAGES puede generar cargos aparte y requiere revisar su disponibilidad en la cuenta. Neon y otros proveedores siguen teniendo sus propios costos.

La base de datos permanece en Neon; esta preparación no la convierte a D1 ni cambia su esquema. La ruta con OpenNext conserva Next.js 15; la documentación actual de Cloudflare recomienda vinext para proyectos nuevos, pero su adopción implicaría una evaluación diferente y no se introduce en esta prueba.

## Referencias

- https://opennext.js.org/cloudflare/get-started
- https://opennext.js.org/cloudflare/howtos/env-vars
- https://opennext.js.org/cloudflare/howtos/image
- https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/platform/pricing/
