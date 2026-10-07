import type { Service } from "@/types/psychotherapy";
export interface ServiceRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: Service["tipo"];
  icon: string;
  modality: string;
  priceCents: number;
  durationMinutes: number;
  active: boolean;
  displayOrder: number;
}
export function serviceView(s: ServiceRecord, id: number): Service {
  return {
    id,
    slug: s.slug,
    nombre: s.name,
    descripcion: s.description,
    tipo: s.type,
    icono: s.icon,
    modalidad: s.modality,
    precio: s.priceCents / 100,
    duracion: s.durationMinutes + " min",
    activo: s.active,
    orden: s.displayOrder,
  };
}
export function serviceInput(s: Service) {
  const duration = Number(s.duracion?.match(/\d+/)?.[0] ?? 60);
  return {
    slug: s.slug,
    name: s.nombre,
    description: s.descripcion,
    type: s.tipo,
    icon: s.icono,
    modality: s.modalidad ?? "Presencial",
    priceCents: Math.round((s.precio ?? 0) * 100),
    durationMinutes: duration,
    active: s.activo,
    displayOrder: s.orden,
  };
}
