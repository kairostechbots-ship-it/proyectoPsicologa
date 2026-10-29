export interface ProfessionalTraining {
  id: number;
  title: string;
  institution?: string;
  active: boolean;
  displayOrder: number;
}

export interface ClinicalArea {
  id: number;
  name: string;
  active: boolean;
  displayOrder: number;
}

export interface PatientGroup {
  id: number;
  name: string;
  active: boolean;
  displayOrder: number;
}

export interface ProfileValue {
  id: number;
  title: string;
  description: string;
  active: boolean;
  displayOrder: number;
}

export interface ProfessionalProfile {
  id: number;

  // Presentación
  heroTitle: string;
  heroHighlight: string;

  professionalTitle: string;
  name: string;

  // Identidad profesional. Opcionales para admitir perfiles existentes.
  fullName?: string;
  // Texto para conservar ceros iniciales y evitar conversiones numéricas.
  licenseNumber?: string;

  yearsExperience: number;
  therapeuticApproach: string;

  biography: string[];

  // Valores profesionales
  values: ProfileValue[];

  // Formación
  psychologyTraining: ProfessionalTraining[];
  complementaryTraining: ProfessionalTraining[];

  // Experiencia clínica
  clinicalAreas: ClinicalArea[];

  violenceTitle: string;
  violenceDescription: string;

  // Personas que atiende
  patientGroups: PatientGroup[];
}
