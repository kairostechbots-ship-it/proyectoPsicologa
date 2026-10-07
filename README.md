# Consultorio de psicología

Next.js 15 y TypeScript. Backend integrado siguiendo la arquitectura de Labwork: Neon/PostgreSQL, Drizzle ORM, Zod, Auth.js Credentials y Resend.

## Ejecutar localmente

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` a `.env.local` si todavía no existe.
3. Configura DATABASE_URL con la conexión de Neon y AUTH_SECRET con un valor aleatorio. Para generarlo:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. Configura ADMIN_EMAIL, ADMIN_PASSWORD (mínimo 12 caracteres) y ADMIN_NAME para crear la primera cuenta. Mantén APP_URL y AUTH_URL como http://localhost:3000 en desarrollo.
5. Aplica las tablas y carga el contenido inicial:

   ```powershell
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

6. Abre http://localhost:3000. Inicia sesión en /admin/login.

El seed conserva registros existentes y usa los datos actuales del sitio; no crea pacientes de ejemplo. Puedes quitar ADMIN_PASSWORD del entorno después de crear el administrador. Las pantallas requieren una base configurada; muestran un error si no pueden cargarla.

## Funciones

- Contenido público conectado a la base: perfil, contacto, horarios, servicios, medicina natural, promoción y FAQ.
- Panel para editar contenido, pacientes, citas, notas, registro de mensajes, formularios y usuarios.
- Agenda interna y protección por sesión/roles. /panel redirige al área de pacientes.
- Reservas persistentes con validación de horarios y prevención de traslapes en PostgreSQL.
- Chat opcional: configura GEMINI_API_KEY y, si corresponde, GEMINI_MODEL. Registra solicitudes pendientes.
- Correo opcional: RESEND_API_KEY, RESEND_FROM (remitente verificado) y CLINIC_NOTIFICATION_EMAIL. Notifica al consultorio; no envía recordatorios automáticos a pacientes.

## Comandos

| Comando             | Uso                                                          |
| ------------------- | ------------------------------------------------------------ |
| npm run dev         | Servidor local                                               |
| npm run typecheck   | Comprobar TypeScript                                         |
| npm test            | Pruebas de validación, permisos, rutas y PostgreSQL embebido |
| npm run lint        | ESLint                                                       |
| npm run build       | Compilación de producción                                    |
| npm run db:generate | Generar migración al cambiar schema.ts                       |
| npm run db:migrate  | Aplicar migraciones a DATABASE_URL                           |
| npm run db:seed     | Inicializar contenido y primer administrador                 |

La exclusión de traslapes es SQL explícito en la migración inicial; Drizzle Kit no la representa en su snapshot. No elimines esa restricción al extender las migraciones. No se modifica una migración después de aplicarla.

## Estructura

- app/api: rutas públicas y administrativas.
- lib/db: cliente Neon reutilizable y esquema.
- lib/auth: Auth.js y guard de roles; lib/auth.ts es el cliente HTTP.
- lib/validators.ts y lib/api.ts: validaciones y respuestas comunes.
- lib/appointments: horario, transacciones y reservas.
- drizzle: migraciones versionadas.
- scripts/seed.ts: inicialización idempotente.
- docs/API.md y docs/postman.json: contrato y ejemplos.

## Producción

Configura las mismas variables en Vercel y usa el dominio real en APP_URL, AUTH_URL y NEXT_PUBLIC_SITE_URL. Aplica migraciones antes de habilitar el sitio. El usuario de la base debe poder crear las tablas, índices y restricciones de la migración.

La agenda es interna. Google Calendar, mensajería externa y recuperación de contraseña requieren trabajo adicional. El correo se envía en el momento, sin cola de reintentos. Los límites de paginación y el comportamiento de reservas están documentados en [API](docs/API.md).

## Dependencias de seguridad

Next.js 15 usa la versión corregida de PostCSS del proyecto mediante overrides en package.json. Conserva esta regla hasta que la dependencia interna de Next esté actualizada. La auditoría de producción no reportó vulnerabilidades al verificar esta entrega; quedan avisos moderados en herramientas de desarrollo.
