import type { ProfessionalProfile } from '@/types/profile';

export const profileMock: ProfessionalProfile = {
  id: 1,

  /* =========================================================
     PRESENTACIÓN
  ========================================================= */

  heroTitle:
    'Comprender lo que vives es el primer paso para transformarlo.',

  heroHighlight: 'primer paso',

  professionalTitle: 'Psicóloga Clínica',

  name: 'Erika Pilar',

  yearsExperience: 22,

  therapeuticApproach: 'TCC',

  biography: [
    'Soy Licenciada en Psicología Clínica, con enfoque en Terapia Cognitivo-Conductual (TCC) y más de 22 años de trayectoria en atención psicológica y psicoterapia.',

    'Mi enfoque está centrado en tus necesidades y metas personales. A través de un acompañamiento profesional, trabajamos en el desarrollo de herramientas que te permitan comprender y afrontar de una mejor manera las situaciones que estás viviendo.',

    'Mi objetivo es ofrecerte un espacio seguro, confidencial y libre de juicios, donde puedas expresar lo que estás sintiendo y trabajar en tu bienestar emocional desde una atención humana y profesional.',
  ],

  /* =========================================================
     VALORES
  ========================================================= */

  values: [
    {
      id: 1,
      title: 'Atención humana',
      description:
        'Acompañamiento cercano y respetuoso.',
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Confidencialidad',
      description:
        'Un espacio profesional y libre de juicios.',
      active: true,
      displayOrder: 2,
    },
  ],

  /* =========================================================
     FORMACIÓN EN PSICOLOGÍA
  ========================================================= */

  psychologyTraining: [
    {
      id: 1,
      title: 'Licenciatura en Psicología Clínica',
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Sexualidad Humana',
      institution: 'Universidad de Guadalajara · UDG',
      active: true,
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Acompañamiento en el Duelo',
      institution: 'Centro San Camilo',
      active: true,
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Prevención y Tratamiento de Adicciones',
      institution: 'CECAJ / CONADIC',
      active: true,
      displayOrder: 4,
    },
    {
      id: 5,
      title: 'Desarrollo Cristiano Integral',
      institution: 'UNIVA',
      active: true,
      displayOrder: 5,
    },
  ],

  /* =========================================================
     FORMACIÓN COMPLEMENTARIA
  ========================================================= */

  complementaryTraining: [
    {
      id: 1,
      title: 'Enfermería General',
      institution: 'IMSS',
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Lic. Terapeuta en Medicina Natural',
      institution: 'ITEMN',
      active: true,
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Terapia Floral y Acupuntura',
      active: true,
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Medicina Tradicional China y Fitoterapia',
      active: true,
      displayOrder: 4,
    },
    {
      id: 5,
      title: 'Biomagnetismo',
      institution: 'CUAM',
      active: true,
      displayOrder: 5,
    },
    {
      id: 6,
      title: 'Geriatría y Medicina Integradora',
      institution: 'INMENAC',
      active: true,
      displayOrder: 6,
    },
  ],

  /* =========================================================
     EXPERIENCIA CLÍNICA
  ========================================================= */

  clinicalAreas: [
    {
      id: 1,
      name: 'Ansiedad',
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'Depresión',
      active: true,
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'Duelo y pérdidas',
      active: true,
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'Conductas autodestructivas',
      active: true,
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'Prevención y tratamiento de adicciones',
      active: true,
      displayOrder: 5,
    },
    {
      id: 6,
      name: 'Situaciones de violencia',
      active: true,
      displayOrder: 6,
    },
  ],

  violenceTitle:
    'Especial atención al acompañamiento de personas que han vivido situaciones de violencia.',

  violenceDescription:
    'Con una perspectiva sensible a las experiencias y necesidades de cada persona.',

  /* =========================================================
     PERSONAS QUE ATIENDE
  ========================================================= */

  patientGroups: [
    {
      id: 1,
      name: 'Niños',
      active: true,
      displayOrder: 1,
    },
    {
      id: 2,
      name: 'Adolescentes',
      active: true,
      displayOrder: 2,
    },
    {
      id: 3,
      name: 'Jóvenes',
      active: true,
      displayOrder: 3,
    },
    {
      id: 4,
      name: 'Adultos',
      active: true,
      displayOrder: 4,
    },
    {
      id: 5,
      name: 'Parejas',
      active: true,
      displayOrder: 5,
    },
  ],
};