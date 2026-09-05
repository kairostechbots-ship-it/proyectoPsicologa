export interface NaturalTechnique {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
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