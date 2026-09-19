import type { ContactInfo } from '@/types/contact';

export const contactMock: ContactInfo = {
  id: 1,

  phone: '33 1139 3410',

  whatsapp: '523311393410',

  address:
    'Calle Jacaranda #26, Fraccionamiento Prados de la Higuera, cruce con Andador N3, C.P. 45640, Tlajomulco Centro.',

  /*
   * Enlace exacto compartido desde Google Maps.
   * Se utiliza para los botones:
   * - Ver ubicación en Google Maps
   * - Cómo llegar
   */
  mapsUrl:
    'https://maps.app.goo.gl/RJdeFB5AXkLH7mPL7',

  /*
   * URL utilizada exclusivamente por el iframe.
   *
   * Se mantiene separada de mapsUrl porque los enlaces
   * maps.app.goo.gl no pueden utilizarse directamente
   * como src del iframe.
   */
  mapEmbedUrl:
    'https://www.google.com/maps?q=Calle%20Jacaranda%2026%2C%20cruce%20con%20Andador%20N3%2C%20Fraccionamiento%20Prados%20de%20la%20Higuera%2C%2045640%20Tlajomulco%20Centro%2C%20Jalisco&output=embed',

  appointmentRequired: true,

  businessHours: [
    {
      id: 1,
      day: 'Lunes',
      enabled: true,
      startTime: '16:00',
      endTime: '21:00',
      displayOrder: 1,
    },
    {
      id: 2,
      day: 'Martes',
      enabled: true,
      startTime: '16:00',
      endTime: '21:00',
      displayOrder: 2,
    },
    {
      id: 3,
      day: 'Miércoles',
      enabled: true,
      startTime: '16:00',
      endTime: '21:00',
      displayOrder: 3,
    },
    {
      id: 4,
      day: 'Jueves',
      enabled: true,
      startTime: '16:00',
      endTime: '21:00',
      displayOrder: 4,
    },
    {
      id: 5,
      day: 'Viernes',
      enabled: true,
      startTime: '16:00',
      endTime: '21:00',
      displayOrder: 5,
    },
    {
      id: 6,
      day: 'Sábado',
      enabled: false,
      startTime: '',
      endTime: '',
      displayOrder: 6,
    },
    {
      id: 7,
      day: 'Domingo',
      enabled: false,
      startTime: '',
      endTime: '',
      displayOrder: 7,
    },
  ],
};