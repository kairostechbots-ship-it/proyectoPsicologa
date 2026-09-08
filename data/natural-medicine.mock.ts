import type {
  NaturalMedicineConsultation,
} from '@/types/natural-medicine';

export const naturalMedicineMock: NaturalMedicineConsultation = {
  id: 1,

  name: 'Consulta de Medicina Natural',

  shortDescription:
    'Atención en Medicina Natural mediante distintas técnicas seleccionadas de acuerdo con las necesidades de cada persona.',

  price: 400,

  durationMinutes: null,

  appointmentRequired: true,

  techniques: [
    {
      id: 1,
      slug: 'biomagnetismo',
      name: 'Biomagnetismo',
      shortDescription:
        'Aplicación complementaria mediante el uso de imanes.',
      featured: true,
      active: true,
      displayOrder: 1,
    },

    {
      id: 2,
      slug: 'acupuntura',
      name: 'Acupuntura',
      shortDescription:
        'Técnica basada en la estimulación de puntos específicos.',
      featured: true,
      active: true,
      displayOrder: 2,
    },

    {
      id: 3,
      slug: 'fitoterapia',
      name: 'Fitoterapia',
      shortDescription:
        'Uso de fórmulas elaboradas a partir de plantas medicinales.',
      featured: true,
      active: true,
      displayOrder: 3,
    },

    {
      id: 4,
      slug: 'auriculoterapia',
      name: 'Auriculoterapia',
      shortDescription:
        'Estimulación de puntos específicos del pabellón auricular.',
      featured: true,
      active: true,
      displayOrder: 4,
    },

    {
      id: 5,
      slug: 'medicina-china',
      name: 'Medicina China',
      shortDescription:
        'Técnicas y principios correspondientes a la Medicina Tradicional China.',
      featured: false,
      active: true,
      displayOrder: 5,
    },

    {
      id: 6,
      slug: 'flores-de-bach',
      name: 'Flores de Bach',
      shortDescription:
        'Terapia floral incluida dentro de los servicios de Medicina Natural.',
      featured: false,
      active: true,
      displayOrder: 6,
    },

    {
      id: 7,
      slug: 'naturismo',
      name: 'Naturismo',
      shortDescription:
        'Servicio complementario dentro del área de Medicina Natural.',
      featured: false,
      active: true,
      displayOrder: 7,
    },

    {
      id: 8,
      slug: 'desintoxicacion-organica',
      name: 'Desintoxicación orgánica',
      shortDescription:
        'Servicio ofrecido como parte de la atención en Medicina Natural.',
      featured: false,
      active: true,
      displayOrder: 8,
    },

    {
      id: 9,
      slug: 'nutricion-funcional',
      name: 'Nutrición funcional',
      shortDescription:
        'Orientación dentro del enfoque de bienestar y Medicina Natural.',
      featured: false,
      active: true,
      displayOrder: 9,
    },

    {
      id: 10,
      slug: 'reflexologia-podal',
      name: 'Reflexología podal',
      shortDescription:
        'Técnica aplicada en puntos específicos de los pies.',
      featured: false,
      active: true,
      displayOrder: 10,
    },
  ],
};