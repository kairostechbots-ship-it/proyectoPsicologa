export type ServiceType = 'psicoterapia' | 'medicina-natural';

export interface Service {
  id: number;

  tipo: ServiceType;

  slug: string;

  nombre: string;

  descripcion: string;

  icono: string;

  modalidad?: string;

  precio?: number;

  duracion?: string;

  activo: boolean;

  orden: number;
}