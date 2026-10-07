import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { content } from "./db/schema";
import { ApiError } from "./api";
import { contentSchemas } from "./validators";
export function contentKey(key: string): keyof typeof contentSchemas {
  if (!Object.hasOwn(contentSchemas, key))
    throw new ApiError(404, "Contenido no encontrado.");
  return key as keyof typeof contentSchemas;
}
export async function getContent(key: string, publicView = false) {
  const k = contentKey(key);
  const [row] = await getDb()
    .select()
    .from(content)
    .where(eq(content.key, k))
    .limit(1);
  if (!row) throw new ApiError(404, "Contenido no configurado.");
  const data = contentSchemas[k].parse(row.data);
  if (publicView) {
    if ("activo" in data && !data.activo)
      throw new ApiError(404, "Promoción no disponible.");
    if ("techniques" in data)
      data.techniques = data.techniques.filter((x) => x.active);
    if ("values" in data) {
      data.values = data.values.filter((x) => x.active);
      data.psychologyTraining = data.psychologyTraining.filter((x) => x.active);
      data.complementaryTraining = data.complementaryTraining.filter(
        (x) => x.active,
      );
      data.clinicalAreas = data.clinicalAreas.filter((x) => x.active);
      data.patientGroups = data.patientGroups.filter((x) => x.active);
    }
  }
  return { data, version: row.version };
}
