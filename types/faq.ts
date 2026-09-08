export type FAQCategory =
  | 'general'
  | 'psicoterapia'
  | 'medicina-natural';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
  active: boolean;
  displayOrder: number;
}

export type VisitorQuestionStatus =
  | 'pending'
  | 'answered'
  | 'discarded';

export interface VisitorQuestion {
  id: number;
  question: string;
  status: VisitorQuestionStatus;
  answer?: string;
  publishedAsFaq: boolean;
  createdAt: string;
  answeredAt?: string;
}