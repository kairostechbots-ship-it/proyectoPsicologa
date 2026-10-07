import { loadEnvConfig } from "@next/env";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../lib/db";
import { content, faqs, services, users } from "../lib/db/schema";
import { contactMock } from "../data/contact.mock";
import { profileMock } from "../data/profile.mock";
import { naturalMedicineMock } from "../data/natural-medicine.mock";
import { mockPromotion } from "../data/promotion.mock";
import { mockServices } from "../data/services.mock";
import { faqMock } from "../data/faq.mock";
import {
  contentSchemas,
  userSchema,
  serviceSchema,
  faqSchema,
} from "../lib/validators";
loadEnvConfig(process.cwd());
async function main() {
  const db = getDb();
  for (const [key, data] of Object.entries({
    contact: contactMock,
    profile: profileMock,
    "natural-medicine": naturalMedicineMock,
    promotion: mockPromotion,
  })) {
    const parsed =
      contentSchemas[key as keyof typeof contentSchemas].parse(data);
    await db
      .insert(content)
      .values({ key, data: parsed })
      .onConflictDoNothing();
  }
  for (const s of mockServices) {
    const data = serviceSchema.parse({
      slug: s.slug,
      name: s.nombre,
      description: s.descripcion,
      type: s.tipo,
      icon: s.icono,
      modality: s.modalidad,
      priceCents: Math.round((s.precio ?? 0) * 100),
      durationMinutes: 60,
      active: s.activo,
      displayOrder: s.orden,
    });
    await db.insert(services).values(data).onConflictDoNothing();
  }
  // Stable UUIDs make re-running the seed safe without overwriting edited FAQ entries.
  for (const q of faqMock) {
    const { id, ...data } = q;
    await db
      .insert(faqs)
      .values({
        id: "00000000-0000-4000-8000-" + String(id).padStart(12, "0"),
        ...faqSchema.parse(data),
      })
      .onConflictDoNothing();
  }
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const input = userSchema.parse({
      name: process.env.ADMIN_NAME ?? "Administración",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    const [exists] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, input.email));
    if (!exists) {
      const { password, ...data } = input;
      await db
        .insert(users)
        .values({ ...data, passwordHash: await hash(password, 12) })
        .onConflictDoNothing();
    }
  } else
    console.log(
      "Contenido listo. Configura ADMIN_EMAIL y ADMIN_PASSWORD y repite el seed para crear el administrador.",
    );
  console.log("Seed completado; los registros existentes se conservaron.");
}
main().catch(() => {
  console.error(
    "No se pudo inicializar la BD. Revisa las variables, validaciones y migraciones.",
  );
  process.exitCode = 1;
});
