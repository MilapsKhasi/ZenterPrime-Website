export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  benefits: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PlatformItem {
  name: string;
  status: 'available' | 'coming-soon' | 'future';
  iconName: string;
  badge?: string;
  extension?: string;
}

export interface FeedbackData {
  name: string;
  email: string;
  businessType: string;
  rating: number;
  message: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  gstRate: number; // e.g., 18 for 18%
}
