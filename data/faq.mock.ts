import type { FAQ } from '@/types/faq';

export const faqMock: FAQ[] = [
  {
    id: 1,
    question: '¿Cuánto dura una sesión de psicoterapia?',
    answer:
      'Las sesiones de psicoterapia tienen una duración aproximada de 55 a 60 minutos.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 1,
  },
  {
    id: 2,
    question: '¿Puedo tomar terapia en línea?',
    answer:
      'Sí. La atención psicológica está disponible tanto de manera presencial como en línea.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 2,
  },
  {
    id: 3,
    question: '¿Dónde se encuentra el consultorio?',
    answer:
      'El consultorio se encuentra en Calle Jacaranda #26, cruce con Andador N3, Fraccionamiento Prados de la Higuera, C.P. 45640, Tlajomulco Centro.',
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
    question: '¿Cuánto cuesta una sesión de terapia?',
    answer:
      'La sesión individual de psicoterapia tiene un costo de $400 MXN y la terapia de pareja de $500 MXN.',
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
  {
    id: 7,
    question: '¿Cuáles son las formas de pago?',
    answer:
      'Puedes realizar tu pago mediante transferencia bancaria o en efectivo.',
    category: 'general',
    active: true,
    displayOrder: 7,
  },
  {
    id: 8,
    question: '¿Puedo asistir a la consulta con un niño pequeño?',
    answer:
      'Lo recomendable es asistir sin acompañantes para contar con un espacio adecuado para la sesión y evitar interrupciones durante la atención.',
    category: 'general',
    active: true,
    displayOrder: 8,
  },
  {
    id: 9,
    question: '¿Hay promociones o paquetes de psicoterapia?',
    answer:
      'Sí. Se encuentra disponible un paquete de 10 sesiones por $3,600 MXN, con una sesión por semana. Aplica a los servicios de psicoterapia, excepto terapia de pareja. En caso de inasistencia, la sesión correspondiente no es reembolsable.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 9,
  },
  {
    id: 10,
    question: '¿Qué es la Terapia Cognitivo-Conductual (TCC)?',
    answer:
      'La Terapia Cognitivo-Conductual, también conocida como TCC, es un enfoque psicológico que trabaja la relación entre pensamientos, emociones y conductas.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 10,
  },
  {
    id: 11,
    question: '¿Cuánto puede durar un proceso de psicoterapia?',
    answer:
      'El proceso suele durar entre 10 y 15 sesiones o más, dependiendo del motivo de consulta y del avance personal.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 11,
  },
  {
    id: 12,
    question: '¿Tendré actividades entre sesiones?',
    answer:
      'Sí. Como parte del enfoque cognitivo-conductual pueden asignarse actividades prácticas para aplicar en la vida diaria lo trabajado durante las sesiones.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 12,
  },
  {
    id: 13,
    question: '¿Lo que hable durante la terapia es confidencial?',
    answer:
      'Sí. La información compartida durante las sesiones se maneja de forma confidencial y conforme a las obligaciones profesionales y legales aplicables. Existen situaciones excepcionales en las que pueden aplicar límites a la confidencialidad, por ejemplo ante determinadas situaciones de riesgo.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 13,
  },
  {
    id: 14,
    question: '¿Con qué frecuencia se realizan las sesiones de terapia?',
    answer:
      'Habitualmente se inicia con una frecuencia semanal. A medida que se presentan avances y se consolidan herramientas, las sesiones pueden espaciarse de manera quincenal o mensual hasta el cierre del proceso.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 14,
  },
  {
    id: 15,
    question: '¿Cómo se trabaja en la Terapia Cognitivo-Conductual?',
    answer:
      'El enfoque cognitivo-conductual trabaja con objetivos definidos y herramientas prácticas relacionadas con pensamientos, emociones y conductas. El proceso se adapta al motivo de consulta y a las necesidades de cada persona.',
    category: 'psicoterapia',
    active: true,
    displayOrder: 15,
  },
  {
    id: 16,
    question: '¿Cuál es la política de cancelación de citas?',
    answer:
      'Las citas pueden cancelarse o reprogramarse con un mínimo de 24 horas de anticipación. Las cancelaciones fuera de este plazo o las ausencias sin aviso requerirán cubrir el costo de la sesión para respetar el tiempo reservado.',
    category: 'general',
    active: true,
    displayOrder: 16,
  },
];