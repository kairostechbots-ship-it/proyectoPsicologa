import type { Promotion } from '@/types/promotion';

export const mockPromotion: Promotion = {
  id: 1,

  nombre: 'Paquete de 10 sesiones',

  descripcion:
    'Da continuidad a tu proceso de psicoterapia con un paquete de 10 sesiones, realizando una sesión por semana.',

  sesiones: 10,

  precio: 3600,

  frecuencia: '1 sesión por semana',

  excluyeTerapiaPareja: true,

  condiciones:
    'En caso de inasistencia, la sesión correspondiente no es reembolsable.',

  activo: true,
};