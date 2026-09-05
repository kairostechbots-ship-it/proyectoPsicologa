export interface Service {
  id: number;
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