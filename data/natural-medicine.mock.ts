import type {
  NaturalMedicineConsultation,
} from '@/types/natural-medicine';

export const naturalMedicineMock: NaturalMedicineConsultation = {
  id: 1,
  name: 'Consulta de medicina natural',
  shortDescription:
    'Acompañamiento complementario adaptado a las necesidades de cada persona.',
  price: 400,
  durationMinutes: null,
  appointmentRequired: true,
  techniques: [
    {
      id: 1,
      slug: 'biomagnetismo',
      name: 'Biomagnetismo',
      shortDescription: 'Aplicación complementaria mediante imanes.',
      featured: true,
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      slug: 'acupuntura',
      name: 'Acupuntura',
      shortDescription:
        'Técnica complementaria basada en la estimulación de puntos específicos.',
      featured: true,
      active: true,
      displayOrder: 2,
    },
    {
      id: 3,
      slug: 'fitoterapia',
      name: 'Fitoterapia',
      shortDescription:
        'Uso orientado de plantas medicinales dentro de un plan individual.',
      featured: true,
      active: true,
      displayOrder: 3,
    },
    {
      id: 4,
      slug: 'auriculoterapia',
      name: 'Auriculoterapia',
      shortDescription: 'Estimulación de puntos específicos del pabellón auricular.',
      featured: true,
      active: true,
      displayOrder: 4,
    },
  ],
};