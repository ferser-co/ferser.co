// Tipos compartidos entre plantillas.
// Cada plantilla extiende su propia interfaz de datos.

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  type: 'linkedin' | 'facebook' | 'instagram' | 'twitter' | 'whatsapp' | 'github';
  url: string;
}

export interface CtaItem {
  label: string;
  href: string;
}

export interface BrandConfig {
  name: string;
  initial: string;
  tagline?: string;
}
