import type { Service } from '@/types/service';

export const mockServices: Service[] = [
  {
    id: 1,
    slug: 'psicoterapia-infantil',
    nombre: 'Psicoterapia infantil',
    descripcion:
      'Acompañamiento psicológico para niños, considerando sus necesidades particulares y la etapa de desarrollo en la que se encuentran.',
    icono: 'child',
    modalidad: 'Presencial y en línea',
    precio: 400,
    duracion: '55–60 min',
    activo: true,
    orden: 1,
  },

  {
    id: 2,
    slug: 'psicoterapia-adolescentes',
    nombre: 'Psicoterapia para adolescentes',
    descripcion:
      'Un espacio profesional y confidencial para acompañar los cambios emocionales, personales y sociales propios de esta etapa.',
    icono: 'sparkles',
    modalidad: 'Presencial y en línea',
    precio: 400,
    duracion: '55–60 min',
    activo: true,
    orden: 2,
  },

  {
    id: 3,
    slug: 'psicoterapia-individual',
    nombre: 'Psicoterapia individual',
    descripcion:
      'Atención para jóvenes y adultos centrada en comprender lo que estás viviendo y desarrollar herramientas para afrontar las dificultades.',
    icono: 'brain',
    modalidad: 'Presencial y en línea',
    precio: 400,
    duracion: '55–60 min',
    activo: true,
    orden: 3,
  },

  {
    id: 4,
    slug: 'terapia-de-pareja',
    nombre: 'Terapia de pareja',
    descripcion:
      'Acompañamiento profesional para trabajar dificultades, comunicación y situaciones que afectan la relación de pareja.',
    icono: 'users',
    modalidad: 'Presencial y en línea',
    precio: 500,
    duracion: '55–60 min',
    activo: true,
    orden: 4,
  },
];