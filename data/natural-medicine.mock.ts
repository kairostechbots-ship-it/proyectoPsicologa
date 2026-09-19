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
        'Técnica complementaria basada en la aplicación de imanes en puntos específicos del cuerpo.',

      description:
        'Dentro de la Medicina Natural, el biomagnetismo utiliza la aplicación de imanes en zonas específicas como una práctica complementaria orientada al bienestar y la relajación.',

      benefits: [
        'Relajación y disminución de la tensión cotidiana.',
        'Bienestar ante molestias musculares y articulares.',
        'Aplicación localizada en diferentes zonas del cuerpo.',
      ],

      featured: true,
      active: true,
      displayOrder: 1,
    },

    {
      id: 2,
      slug: 'acupuntura',
      name: 'Acupuntura',

      shortDescription:
        'Técnica de la Medicina Tradicional China basada en la estimulación de puntos específicos del cuerpo.',

      description:
        'La acupuntura es una técnica perteneciente a la Medicina Tradicional China que consiste en estimular puntos específicos del cuerpo mediante agujas.',

      benefits: [
        'Manejo complementario de algunas molestias y dolor.',
        'Relajación y manejo del estrés.',
        'Apoyo al bienestar general.',
      ],

      featured: true,
      active: true,
      displayOrder: 2,
    },

    {
      id: 3,
      slug: 'fitoterapia',
      name: 'Fitoterapia',

      shortDescription:
        'Uso de preparados elaborados a partir de plantas dentro de la práctica de Medicina Natural.',

      description:
        'La fitoterapia utiliza plantas y preparados de origen vegetal dentro de la práctica de Medicina Natural. En consulta pueden emplearse presentaciones en microdosis.',

      benefits: [
        'Uso de preparados de origen vegetal.',
        'Presentaciones en microdosis.',
        'Atención seleccionada de acuerdo con las características de cada persona.',
      ],

      featured: true,
      active: true,
      displayOrder: 3,
    },

    {
      id: 4,
      slug: 'flores-de-bach',
      name: 'Flores de Bach',

      shortDescription:
        'Preparados florales utilizados como práctica complementaria orientada al bienestar emocional.',

      description:
        'Las Flores de Bach son preparados florales utilizados dentro de algunas prácticas complementarias orientadas al bienestar emocional.',

      benefits: [
        'Acompañamiento del bienestar emocional.',
        'Orientadas al manejo cotidiano del estrés y la tensión.',
        'Uso como práctica complementaria.',
      ],

      featured: false,
      active: true,
      displayOrder: 4,
    },

    {
      id: 5,
      slug: 'naturismo',
      name: 'Naturismo',

      shortDescription:
        'Enfoque de bienestar que integra hábitos de vida y el aprovechamiento responsable de elementos naturales.',

      description:
        'El naturismo busca favorecer el bienestar integral mediante hábitos de vida y el aprovechamiento de elementos naturales como la alimentación, el agua, el aire, las plantas y la exposición responsable al sol.',

      benefits: [
        'Promoción de hábitos de vida saludables.',
        'Alimentación como parte del bienestar integral.',
        'Incorporación responsable de elementos naturales.',
      ],

      featured: false,
      active: true,
      displayOrder: 5,
    },

    {
      id: 6,
      slug: 'desintoxicacion-organica',
      name: 'Desintoxicación orgánica',

      shortDescription:
        'Enfoque naturista centrado en revisar hábitos de alimentación y estilo de vida.',

      description:
        'Dentro del enfoque naturista, esta práctica se centra en revisar hábitos cotidianos de alimentación y estilo de vida, buscando reducir el consumo de productos altamente procesados y favorecer hábitos de bienestar.',

      benefits: [
        'Revisión de hábitos de alimentación.',
        'Reducción del consumo de alimentos ultraprocesados.',
        'Incorporación de preparaciones naturales.',
        'Ajustes de hábitos relacionados con el bienestar.',
      ],

      featured: false,
      active: true,
      displayOrder: 6,
    },

    {
      id: 7,
      slug: 'nutricion-funcional',
      name: 'Nutrición funcional',

      shortDescription:
        'Enfoque que considera alimentación, hábitos y estilo de vida como parte del bienestar integral.',

      description:
        'La nutrición funcional considera los hábitos de alimentación, el estilo de vida y las características individuales con el propósito de favorecer el bienestar general.',

      benefits: [
        'Revisión de hábitos alimenticios.',
        'Consideración del estilo de vida.',
        'Orientación individual de acuerdo con las necesidades de la persona.',
      ],

      featured: false,
      active: true,
      displayOrder: 7,
    },

    {
      id: 8,
      slug: 'auriculoterapia',
      name: 'Auriculoterapia',

      shortDescription:
        'Técnica complementaria basada en la estimulación de puntos específicos de la oreja.',

      description:
        'La auriculoterapia consiste en la estimulación de puntos específicos del pabellón auricular y se utiliza dentro de la Medicina Natural como una práctica complementaria orientada al bienestar.',

      benefits: [
        'Relajación y manejo del estrés.',
        'Bienestar ante algunas molestias.',
        'Estimulación de puntos específicos del pabellón auricular.',
      ],

      featured: true,
      active: true,
      displayOrder: 8,
    },

    {
      id: 9,
      slug: 'reflexologia-podal',
      name: 'Reflexología podal',

      shortDescription:
        'Técnica complementaria basada en la aplicación de presión en puntos específicos de los pies.',

      description:
        'La reflexología podal utiliza presión y estimulación en diferentes puntos de los pies como una práctica complementaria orientada principalmente a la relajación y el bienestar.',

      benefits: [
        'Relajación y disminución de la tensión.',
        'Estimulación mediante presión en puntos específicos de los pies.',
        'Sensación general de bienestar.',
      ],

      featured: false,
      active: true,
      displayOrder: 9,
    },
  ],
};