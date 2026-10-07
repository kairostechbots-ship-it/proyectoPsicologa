import { z } from "zod";
const short = z.string().trim().min(1).max(160);
const paragraph = z.string().trim().min(1).max(10000);
export const idSchema = z.uuid();
export const roleSchema = z.enum(["admin", "receptionist", "editor"]);
export const loginSchema = z.object({
  email: z
    .email()
    .max(254)
    .transform((s) => s.toLowerCase()),
  password: z.string().min(1).max(72),
});
export const passwordSchema = z
  .string()
  .min(12)
  .max(72)
  .refine((s) => Buffer.byteLength(s, "utf8") <= 72, "Máximo 72 bytes.");
export const userSchema = z.object({
  name: short,
  email: z
    .email()
    .max(254)
    .transform((s) => s.toLowerCase()),
  password: passwordSchema,
  role: roleSchema,
  active: z.boolean().default(true),
});
export const serviceSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .max(120),
    name: short,
    description: paragraph,
    type: z.enum(["psicoterapia", "medicina-natural"]),
    icon: z.string().max(60).default("brain"),
    modality: z.string().max(120).default("Presencial"),
    priceCents: z.number().int().min(0).max(100000000),
    durationMinutes: z.number().int().min(15).max(240),
    active: z.boolean().default(true),
    displayOrder: z.number().int().min(0).max(10000).default(0),
  })
  .strict();
export const faqSchema = z
  .object({
    question: z.string().trim().min(3).max(500),
    answer: paragraph,
    category: z.enum(["general", "psicoterapia", "medicina-natural"]),
    active: z.boolean().default(true),
    displayOrder: z.number().int().min(0).default(0),
  })
  .strict();
export const patientSchema = z
  .object({
    name: short,
    phone: z
      .string()
      .trim()
      .transform((s) => s.replace(/[\s()+-]/g, ""))
      .pipe(z.string().regex(/^\d{10,15}$/)),
    email: z
      .union([z.email().max(254), z.literal("")])
      .optional()
      .transform((s) => s || null),
    active: z.boolean().default(true),
  })
  .strict();
export const bookingSchema = z
  .object({
    patient: patientSchema.omit({ active: true }),
    serviceId: idSchema,
    startsAt: z.iso.datetime({ offset: true }),
    modality: z.enum(["presencial", "online"]).default("presencial"),
  })
  .strict();
export const adminBookingSchema = bookingSchema
  .omit({ patient: true })
  .extend({ patientId: idSchema });
export const appointmentPatchSchema = z
  .object({
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  })
  .strict();
export const noteSchema = z
  .object({ patientId: idSchema, body: paragraph })
  .strict();
export const messageSchema = z
  .object({
    patientId: idSchema,
    body: paragraph,
    direction: z.enum(["incoming", "internal"]).default("internal"),
    read: z.boolean().default(false),
  })
  .strict();
export const formSchema = z
  .object({
    patientId: idSchema,
    title: short,
    status: z.enum(["pending", "completed"]).default("pending"),
    answers: z
      .record(z.string().max(100), z.string().max(5000))
      .refine((v) => Object.keys(v).length <= 100)
      .default({}),
  })
  .strict();
export const questionSchema = z
  .object({ question: z.string().trim().min(5).max(1000) })
  .strict();
export const questionPatchSchema = z
  .object({
    status: z.enum(["pending", "answered", "discarded"]),
    answer: z.string().trim().max(10000).nullable().optional(),
  })
  .strict();
const ordered = {
  id: z.number().int().positive(),
  active: z.boolean(),
  displayOrder: z.number().int().min(0),
};
const namedItem = z.object({ ...ordered, name: short });
const training = z.object({
  ...ordered,
  title: short,
  institution: z.string().max(300).optional(),
});
export const profileSchema = z
  .object({
    id: z.literal(1),
    heroTitle: short,
    heroHighlight: short,
    professionalTitle: short,
    name: short,
    yearsExperience: z.number().int().min(0).max(100),
    therapeuticApproach: short,
    biography: z.array(paragraph).max(30),
    values: z
      .array(z.object({ ...ordered, title: short, description: paragraph }))
      .max(100),
    psychologyTraining: z.array(training).max(100),
    complementaryTraining: z.array(training).max(100),
    clinicalAreas: z.array(namedItem).max(100),
    violenceTitle: short,
    violenceDescription: paragraph,
    patientGroups: z.array(namedItem).max(100),
  })
  .strict();
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const hourSchema = z
  .object({
    id: z.number().int().min(1).max(7),
    day: z.enum([
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ]),
    enabled: z.boolean(),
    startTime: z.union([time, z.literal("")]),
    endTime: z.union([time, z.literal("")]),
    displayOrder: z.number().int().min(1).max(7),
  })
  .refine(
    (v) =>
      !v.enabled || (!!v.startTime && !!v.endTime && v.startTime < v.endTime),
    "Horario inválido.",
  );
const httpsUrl = z
  .url()
  .refine((v) => new URL(v).protocol === "https:", "Usa HTTPS.");
export const contactSchema = z
  .object({
    id: z.literal(1),
    phone: short,
    whatsapp: z.string().regex(/^\d{10,15}$/),
    address: paragraph,
    mapsUrl: httpsUrl,
    mapEmbedUrl: httpsUrl,
    appointmentRequired: z.boolean(),
    businessHours: z
      .array(hourSchema)
      .length(7)
      .refine(
        (v) =>
          new Set(v.map((x) => x.day)).size === 7 &&
          new Set(v.map((x) => x.id)).size === 7,
        "Debe incluir los siete días distintos.",
      ),
  })
  .strict();
export const promotionSchema = z
  .object({
    id: z.literal(1),
    nombre: short,
    descripcion: paragraph,
    sesiones: z.number().int().min(1).max(100),
    precio: z.number().min(0).max(1000000),
    frecuencia: short,
    excluyeTerapiaPareja: z.boolean(),
    condiciones: paragraph,
    activo: z.boolean(),
  })
  .strict();
export const naturalMedicineSchema = z
  .object({
    id: z.literal(1),
    name: short,
    shortDescription: paragraph,
    price: z.number().min(0).max(1000000),
    durationMinutes: z.number().int().min(15).max(240).nullable(),
    appointmentRequired: z.boolean(),
    techniques: z
      .array(
        z.object({
          ...ordered,
          slug: z
            .string()
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .max(120),
          name: short,
          shortDescription: paragraph,
          description: paragraph,
          benefits: z.array(short).max(50).optional(),
          featured: z.boolean(),
        }),
      )
      .max(100)
      .refine(
        (v) =>
          new Set(v.map((x) => x.slug)).size === v.length &&
          new Set(v.map((x) => x.id)).size === v.length,
        "Técnicas duplicadas.",
      ),
  })
  .strict();
export const contentSchemas = {
  profile: profileSchema,
  contact: contactSchema,
  promotion: promotionSchema,
  "natural-medicine": naturalMedicineSchema,
};
export const contentWriteSchema = z
  .object({ version: z.number().int().positive(), data: z.unknown() })
  .strict();
export const listSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).max(1000000).default(0),
});
