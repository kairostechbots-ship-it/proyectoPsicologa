# API del consultorio

Arquitectura adaptada de la Guía Backend Labwork: Next.js App Router, Neon, Drizzle, Zod, Auth.js y Resend. Las pantallas consumen HTTP; la lógica del servidor vive en lib/. El contenido editorial conserva estructuras del frontend dentro de JSONB validado. Pacientes, citas, servicios, preguntas frecuentes y usuarios tienen tablas propias.

## Convenciones

Éxito: `{ "data": ... }`. Error: `{ "error": { "message": "...", "details": ... } }`.
Auth.js mantiene su protocolo propio en /api/auth/*; /api/auth/me sí usa el formato uniforme.
HTTP: 200 lectura/edición, 201 creación, 400 JSON inválido, 401 sin sesión, 403 sin permiso, 404 ausente, 409 conflicto, 413 cuerpo demasiado grande, 422 validación, 429 límite, 500 fallo interno, 503 servicio no configurado.
Listas privadas: ?limit=50&offset=0; máximo 100. Identificadores UUID salvo IDs numéricos internos de las secciones editoriales. Precios de servicios en centavos MXN. Fechas de citas ISO 8601 con zona; horario del consultorio America/Mexico_City (Jalisco). El límite de reservas es de 180 días.
Todas las escrituras administrativas comprueban sesión, cuenta activa y rol; ocultan los hashes de contraseña.

## Autenticación y roles

- Login: Auth.js Credentials. El frontend usa signIn('credentials', {email,password,redirect:false}).
- GET /api/auth/csrf obtiene el token CSRF. POST /api/auth/callback/credentials recibe email, password, csrfToken y callbackUrl como formulario. Conserva cookies.
- POST /api/auth/signout cierra la sesión con CSRF. El frontend usa signOut.
- GET /api/auth/me devuelve el usuario actual.
- Sesión JWT cifrada en cookie HTTP-only, máximo 8 horas. Cambiar un usuario incrementa sessionVersion y revoca sesiones anteriores.
- admin: todo; receptionist: pacientes, citas, agenda y mensajes; editor: contenido, servicios, FAQ y preguntas recibidas.
- Notas clínicas y formularios: solo admin. Ninguna API pública expone pacientes o expedientes.

## Rutas públicas

| Método | Ruta                                             | Resultado                                                                                                               |
| ------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/site                                        | Contacto, perfil, medicina natural, promoción activa o null, servicios y FAQ activos; adaptados a las vistas existentes |
| GET    | /api/content/{key}                               | profile, contact, promotion o natural-medicine; filtra secciones inactivas                                              |
| GET    | /api/services                                    | Servicios activos                                                                                                       |
| GET    | /api/services/{slug}                             | Servicio activo por slug                                                                                                |
| GET    | /api/faq                                         | FAQ activas                                                                                                             |
| GET    | /api/availability?date=YYYY-MM-DD&serviceId=UUID | Slots de 15 minutos que admiten la duración del servicio; sin datos de pacientes                                        |
| POST   | /api/appointments                                | Solicitud pendiente; consulta ejemplo                                                                                   |
| POST   | /api/questions                                   | {question:string}, entre 5 y 1000 caracteres                                                                            |
| POST   | /api/chat                                        | {messages:[{role:"user"                                                                                                 | "model",content:string}]}, máximo 40 mensajes de 4000 caracteres |

Solicitud de cita:

```json
{
  "patient": {
    "name": "Ana López",
    "phone": "5512345678",
    "email": "ana@example.com"
  },
  "serviceId": "UUID_DEL_SERVICIO",
  "startsAt": "2026-12-07T16:00:00-06:00",
  "modality": "presencial"
}
```

Respuesta 201: data contiene id, status:"pending", startsAt y emailNotification:{status:"sent"|"failed"|"not_configured"}. El correo notifica al consultorio; no confirma la cita ni envía recordatorios al paciente. Si falla, se conserva la cita. Cada solicitud pública crea un registro independiente de paciente: no se vincula un expediente existente solo por nombre o teléfono.

La reserva comprueba servicio activo, fecha futura, horario y traslapes. La base de datos impone la exclusión de intervalos de manera atómica; el paciente y la cita se insertan juntos. Intervalos [inicio,fin): dos citas adyacentes son válidas. Las citas canceladas liberan horario. Un reintento sobre el mismo horario devuelve 409.

El chat usa el mismo servicio de reserva; no guarda citas en localStorage. Requiere GEMINI_API_KEY y un modelo disponible en GEMINI_MODEL. Su respuesta es data:{text,action?,appointmentId?}. Un fallo de reserva devuelve un error y nunca una confirmación ficticia.

## Rutas administrativas

| Recurso      | Colección                         | Por ID                                      | Roles               |
| ------------ | --------------------------------- | ------------------------------------------- | ------------------- |
| services     | GET, POST /api/admin/services     | GET, PATCH, DELETE /api/admin/services/{id} | admin, editor       |
| faq          | GET, POST /api/admin/faq          | GET, PATCH, DELETE /api/admin/faq/{id}      | admin, editor       |
| patients     | GET, POST /api/admin/patients     | GET, PATCH, DELETE /api/admin/patients/{id} | admin, receptionist |
| notes        | GET, POST /api/admin/notes        | GET, PATCH, DELETE /api/admin/notes/{id}    | admin               |
| messages     | GET, POST /api/admin/messages     | GET, PATCH, DELETE /api/admin/messages/{id} | admin, receptionist |
| forms        | GET, POST /api/admin/forms        | GET, PATCH, DELETE /api/admin/forms/{id}    | admin               |
| appointments | GET, POST /api/admin/appointments | PATCH /api/admin/appointments/{id}          | admin, receptionist |
| users        | GET, POST /api/admin/users        | PATCH /api/admin/users/{id}                 | admin               |
| questions    | GET /api/admin/questions          | PATCH /api/admin/questions/{id}             | admin, editor       |

Las listas notes/messages/forms aceptan patientId. appointments acepta patientId, from y to ISO. Una referencia inexistente o un registro todavía referenciado devuelve 409; no se eliminan expedientes en cascada.

### Entradas

- services: slug, name, description, type (psicoterapia|medicina-natural), priceCents (entero >=0), durationMinutes (15–240). Opcionales: icon, modality, active, displayOrder.
- faq: question, answer, category (general|psicoterapia|medicina-natural); opcionales active, displayOrder.
- patients: name, phone (10–15 dígitos; normaliza separadores), email opcional, active opcional.
- notes: patientId, body (1–10000). createdBy lo asigna el servidor.
- messages: patientId, body; direction (incoming|internal), read. Es registro interno; no envía WhatsApp ni email.
- forms: patientId, title; status (pending|completed), answers (objeto pregunta:texto).
- appointments POST: patientId, serviceId, startsAt, modality. Nace pending.
- appointments PATCH: status (pending|confirmed|cancelled|completed). Para reprogramar, cancelar y crear nueva cita; la nueva fecha se valida.
- users: name, email, password (12–72 caracteres y máximo 72 bytes), role, active. PATCH admite campos parciales. No se permite quitarse el propio rol admin ni desactivarse.
- questions PATCH: status (pending|answered|discarded), answer opcional. Para publicar, crear una FAQ mediante su endpoint.

### Contenido editable

GET /api/admin/content/{key} devuelve data:{data:documento,version:N}.
PUT en la misma ruta recibe {data:documentoCompleto,version:N}; devuelve versión incrementada. 409 si otra edición cambió la versión. Los esquemas exactos están en lib/validators.ts, basados en types/contact.ts, profile.ts, promotion.ts y natural-medicine.ts. Se usa PUT completo para mantener juntas las secciones y los horarios; los campos no reconocidos se rechazan.

GET /api/admin/calendar?from=ISO&to=ISO devuelve CalendarEvent[], hasta 2000 eventos de un intervalo máximo de 366 días. No incluye notas clínicas. Es agenda interna; no sincroniza Google Calendar.

## Despliegue y límites

APP_URL debe ser el origen real; no se permiten escrituras cross-origin arbitrarias. El rate limit persiste en PostgreSQL: login 10/15 min por email, reservas 10/h por IP y 5/día por teléfono, preguntas 5/h, chat 30/h. En Vercel se usa x-vercel-forwarded-for; en desarrollo se comparte el identificador local. En otro proveedor hay que adaptar el proxy de confianza. Programa limpieza periódica de rate_limits vencidos.

Los listados editoriales y públicos se limitan a 100 elementos; la agenda a 2000. Resend es notificación inmediata sin cola de reintentos. No se implementan recuperación de contraseña, sincronización Google Calendar ni mensajería externa. Las sesiones y datos reales requieren variables y migraciones aplicadas.

## Fuentes técnicas

- [Auth.js](https://authjs.dev/)
- [Drizzle con Neon](https://orm.drizzle.team/docs/connect-neon)
- [Batch transaccional](https://orm.drizzle.team/docs/batch-api)
- [PGlite para pruebas](https://pglite.dev/docs/api)

GET /api/site incluye chatEnabled: el botón del asistente se muestra cuando el servidor tiene configurada GEMINI_API_KEY.
