import type { BrandConfig, CtaItem, NavItem, SocialLink } from '../_shared/types';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiciosData {
  brand: BrandConfig;
  nav: NavItem[];
  navCta?: CtaItem;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: CtaItem;
    secondaryCta?: CtaItem;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    pillars: PillarItem[];
  };
  stats: StatItem[];
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    whatsapp?: string;
  };
  footer: {
    description: string;
    socials: SocialLink[];
    copyright: string;
  };
}

// Datos de la demo. Para un cliente real se reemplazan estos valores.
export const data: ServiciosData = {
  brand: {
    name: 'Aranda Consultores',
    initial: 'A',
    tagline: 'Asesoría empresarial estratégica',
  },
  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ],
  navCta: { label: 'Agendar diagnóstico', href: '#contacto' },
  hero: {
    eyebrow: 'Consultoría empresarial · Desde 2008',
    title: 'Decisiones estratégicas con respaldo experto',
    subtitle:
      'Acompañamos a empresas medianas y familiares en Colombia a crecer con orden, cumplimiento y visión de largo plazo.',
    primaryCta: { label: 'Agendar diagnóstico', href: '#contacto' },
    secondaryCta: { label: 'Conocer servicios', href: '#servicios' },
  },
  services: {
    title: 'Lo que hacemos',
    subtitle: 'Servicios diseñados para acompañar cada etapa de tu empresa.',
    items: [
      {
        icon: 'compass',
        title: 'Consultoría estratégica',
        description: 'Diagnóstico, plan a 3-5 años y acompañamiento ejecutivo continuo.',
      },
      {
        icon: 'calculator',
        title: 'Asesoría tributaria',
        description: 'Optimización fiscal legal y declaración de renta para empresas y socios.',
      },
      {
        icon: 'chart-line',
        title: 'Análisis financiero',
        description: 'Modelado financiero, indicadores y proyecciones para tomar decisiones con datos.',
      },
      {
        icon: 'shield-check',
        title: 'Compliance y normativa',
        description: 'Cumplimiento de regulaciones, SAGRILAFT, SECOP y contratación pública.',
      },
      {
        icon: 'graduation-cap',
        title: 'Capacitación gerencial',
        description: 'Programas a medida para equipos directivos y áreas administrativas.',
      },
      {
        icon: 'trending-up',
        title: 'Transformación digital',
        description: 'Adopción de herramientas para automatizar procesos clave del negocio.',
      },
    ],
  },
  about: {
    eyebrow: 'Sobre nosotros',
    title: 'Un equipo, 17 años acompañando empresas colombianas',
    paragraphs: [
      'Aranda Consultores nace en 2008 con la convicción de que las empresas medianas merecen el mismo nivel de asesoría que las grandes corporaciones — y a un costo accesible.',
      'Hoy somos 12 consultores especializados en estrategia, finanzas, tributación y cumplimiento, atendiendo a más de 80 empresas en sectores como manufactura, retail, servicios y agroindustria.',
    ],
    pillars: [
      { title: 'Transparencia total', description: 'Honorarios claros desde el primer día. Sin sorpresas.' },
      { title: 'Datos sobre intuición', description: 'Cada recomendación va respaldada con análisis cuantitativo.' },
      { title: 'Relaciones de largo plazo', description: 'El 70% de nuestros clientes lleva más de 5 años con nosotros.' },
      { title: 'Conocimiento del país', description: 'Especialistas en la realidad fiscal y regulatoria colombiana.' },
    ],
  },
  stats: [
    { value: '17+', label: 'Años de experiencia' },
    { value: '80+', label: 'Empresas atendidas' },
    { value: '12', label: 'Consultores expertos' },
    { value: '95%', label: 'Tasa de renovación anual' },
  ],
  contact: {
    title: 'Hablemos de tu empresa',
    subtitle: 'Te respondemos en menos de 24 horas hábiles.',
    phone: '+57 (1) 555-0188',
    email: 'contacto@aranda.co',
    address: 'Carrera 11 # 93-32, Oficina 504, Bogotá',
    hours: 'Lun a Vie · 8:00 AM – 6:00 PM',
    whatsapp: '+573001234567',
  },
  footer: {
    description: 'Asesoría empresarial estratégica para empresas medianas en Colombia.',
    socials: [
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'facebook', url: 'https://facebook.com' },
    ],
    copyright: '© 2026 Aranda Consultores. Todos los derechos reservados.',
  },
};
