export interface Product {
  id: string;
  number: string;
  name: string;
  subtitle?: string;
  category: 'Dining Linens' | 'Table Presentation' | 'Service & Hospitality';
  description: string;
  image: string;
  altText: string;
  features: string[];
  customization: string;
}

export interface Sector {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FeaturePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EnquiryFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  withCustomLogo: boolean;
}
