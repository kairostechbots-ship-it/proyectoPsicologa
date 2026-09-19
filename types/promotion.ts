export interface Promotion {
  id: number;
  nombre: string;
  descripcion: string;
  sesiones: number;
  precio: number;
  frecuencia: string;
  excluyeTerapiaPareja: boolean;
  condiciones: string;
  activo: boolean;
}