export interface BusinessHours {
  id: number;
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  displayOrder: number;
}

export interface ContactInfo {
  id: number;

  phone: string;
  whatsapp: string;

  address: string;
  mapsUrl: string;
  mapEmbedUrl: string;

  appointmentRequired: boolean;

  businessHours: BusinessHours[];
}