export interface NaturalTechnique {
  id: number;
  slug: string;
  name: string;

  // Texto breve para la cara principal de la tarjeta
  shortDescription: string;

  // Explicación ampliada
  description: string;

  // Puntos que pueden mostrarse en el detalle
  benefits?: string[];

  featured: boolean;
  active: boolean;
  displayOrder: number;
}

export interface NaturalMedicineConsultation {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  durationMinutes: number | null;
  appointmentRequired: boolean;
  techniques: NaturalTechnique[];
}