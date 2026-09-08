import type { FAQ } from '@/types/faq';

export const faqMock: FAQ[] = [
  {
    id: 1,
    question: '¿Cuánto dura una sesión de psicoterapia?',
    answer:
      'Las sesiones tienen una duración aproximada de 55 a 60 minutos.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 1,
  },
  {
    id: 2,
    question: '¿La atención puede ser en línea?',
    answer:
      'Sí. La atención psicológica está disponible de manera presencial y en línea.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 2,
  },
  {
    id: 3,
    question: '¿Dónde se encuentra el consultorio?',
    answer:
      'La atención presencial se brinda en Tlajomulco Centro, en Jacarandas 26-52, Prados de la Higuera.',
    category: 'general',
    active: true,
    displayOrder: 3,
  },
  {
    id: 4,
    question: '¿Cuál es el horario de atención?',
    answer:
      'La atención es de lunes a viernes, de 4:00 pm a 9:00 pm, con cita previa.',
    category: 'general',
    active: true,
    displayOrder: 4,
  },
  {
    id: 5,
    question: '¿Cuál es el costo de la consulta de psicoterapia?',
    answer:
      'La consulta individual tiene un costo de $400 MXN y la consulta de pareja de $500 MXN.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 5,
  },
  {
    id: 6,
    question: '¿La consulta de Medicina Natural requiere cita?',
    answer:
      'Sí. La atención de Medicina Natural se realiza con cita previa y tiene un costo de $400 MXN.',
    category: 'medicina-natural',
    active: true,
    displayOrder: 6,
  },
];