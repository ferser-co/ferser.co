import type { BrandConfig, CtaItem, NavItem, SocialLink } from '../_shared/types';

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: CtaItem;
  highlighted?: boolean;
  badge?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProductoData {
  brand: BrandConfig;
  nav: NavItem[];
  navCta?: CtaItem;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: CtaItem;
    secondaryCta?: CtaItem;
    socialProof: string;
  };
  trustedBy: {
    label: string;
    logos: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: StepItem[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tiers: PricingTier[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  ctaFinal: {
    title: string;
    subtitle: string;
    primaryCta: CtaItem;
    secondaryCta?: CtaItem;
  };
  footer: {
    description: string;
    socials: SocialLink[];
    copyright: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
  };
}

// Datos demo — SaaS de facturación electrónica para PYMES en Colombia.
export const data: ProductoData = {
  brand: {
    name: 'Cobralia',
    initial: 'C',
    tagline: 'Factura, cobra y crece',
  },
  nav: [
    { label: 'Producto', href: '#producto' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Precios', href: '#precios' },
    { label: 'FAQ', href: '#faq' },
  ],
  navCta: { label: 'Empezar gratis', href: '#precios' },
  hero: {
    eyebrow: 'Facturación electrónica DIAN',
    title: 'Factura, cobra y cumple con la DIAN',
    titleAccent: 'en minutos.',
    subtitle:
      'La forma más simple de facturar para emprendedores y pequeños negocios en Colombia. Sin contadores intermedios, sin software complicado.',
    primaryCta: { label: 'Empezar gratis', href: '#precios' },
    secondaryCta: { label: 'Ver cómo funciona', href: '#como-funciona' },
    socialProof: '+2.400 negocios facturan con Cobralia',
  },
  trustedBy: {
    label: 'Usado por equipos en',
    logos: ['Rappi', 'Tributi', 'Truora', 'Frubana', 'La Haus', 'Habi'],
  },
  features: {
    eyebrow: 'Producto',
    title: 'Todo lo que necesitas para facturar sin dolor',
    subtitle: 'Diseñado desde cero para la realidad colombiana.',
    items: [
      {
        icon: 'file-check-2',
        title: 'Facturación electrónica DIAN',
        description: 'Emite facturas y notas crédito que cumplen con la resolución 0042/2020. Validación instantánea.',
      },
      {
        icon: 'credit-card',
        title: 'Cobra con PSE, Nequi y Daviplata',
        description: 'Tus clientes pagan en un click desde el correo. La plata llega a tu cuenta al día siguiente.',
      },
      {
        icon: 'bell-ring',
        title: 'Recordatorios automáticos',
        description: 'Cobralia escribe a quienes te deben sin que tú tengas que perseguirlos. Por correo y WhatsApp.',
      },
      {
        icon: 'chart-column',
        title: 'Reportes que entiendes',
        description: 'Ventas, cartera y rentabilidad explicados en gráficos simples. Exporta a Excel cuando quieras.',
      },
      {
        icon: 'users',
        title: 'Equipo en línea',
        description: 'Invita a tu socio, contador o asistente. Cada uno con permisos diferentes.',
      },
      {
        icon: 'smartphone',
        title: 'App móvil iOS y Android',
        description: 'Factura desde el celular mientras estás en el cliente. Funciona sin conexión.',
      },
    ],
  },
  howItWorks: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos para emitir tu primera factura',
    subtitle: 'En 15 minutos estás facturando.',
    steps: [
      {
        title: 'Crea tu cuenta',
        description: 'Solo necesitas tu correo. Sin tarjeta de crédito, sin contratos.',
      },
      {
        title: 'Configura tu negocio',
        description: 'Sube tu logo, conecta tu cuenta DIAN y agrega tus productos o servicios.',
      },
      {
        title: 'Emite y cobra',
        description: 'Crea la factura, envíala por correo o WhatsApp y recibe el pago en tu cuenta.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title: 'Precios honestos, sin sorpresas',
    subtitle: 'Empieza gratis. Cambia cuando lo necesites.',
    tiers: [
      {
        name: 'Esencial',
        price: '$0',
        period: '/ siempre',
        description: 'Para emprendedores que están empezando.',
        features: [
          'Hasta 10 facturas al mes',
          '1 usuario',
          'Facturación DIAN incluida',
          'Cobro con PSE',
          'Soporte por correo',
        ],
        cta: { label: 'Empezar gratis', href: '#empezar' },
      },
      {
        name: 'Pro',
        price: '$40.000',
        period: '/ mes',
        description: 'Para PYMES en crecimiento.',
        features: [
          'Facturas ilimitadas',
          'Hasta 5 usuarios',
          'Todo lo del Esencial',
          'Cobro con Nequi y Daviplata',
          'Recordatorios automáticos',
          'Reportes avanzados',
          'Soporte prioritario',
        ],
        cta: { label: 'Probar 14 días gratis', href: '#empezar' },
        highlighted: true,
        badge: 'Más popular',
      },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que más nos preguntan',
    items: [
      {
        q: '¿Necesito ser facturador electrónico para usar Cobralia?',
        a: 'No. Te ayudamos a registrarte como facturador electrónico ante la DIAN en menos de 24 horas, gratis y sin trámites largos.',
      },
      {
        q: '¿Y si supero el límite del plan Esencial?',
        a: 'Te avisamos antes de que pase. Puedes subirte al Pro o pagar $3.000 por factura extra ese mes. Cero sorpresas en la cuenta.',
      },
      {
        q: '¿Cobralia funciona con mi banco?',
        a: 'Sí. Conectamos con todos los bancos colombianos vía PSE y con billeteras Nequi y Daviplata. La plata cae a tu cuenta el día hábil siguiente.',
      },
      {
        q: '¿Qué pasa con mis datos si decido salir?',
        a: 'Exportas todo a Excel con un click. Tus facturas siguen siendo tuyas, tus clientes siguen siendo tuyos. Sin retenerte nada.',
      },
      {
        q: '¿Cobralia reemplaza a mi contador?',
        a: 'No. Cobralia se encarga de la facturación y el cobro; tu contador se encarga de la declaración. Generamos los reportes que tu contador necesita.',
      },
    ],
  },
  ctaFinal: {
    title: 'Empieza a facturar bien hoy',
    subtitle: '14 días de prueba en el plan Pro. No te pedimos tarjeta.',
    primaryCta: { label: 'Crear cuenta gratis', href: '#empezar' },
    secondaryCta: { label: 'Hablar con ventas', href: '#contacto' },
  },
  footer: {
    description: 'Facturación electrónica simple para emprendedores y pequeños negocios en Colombia.',
    socials: [
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'twitter', url: 'https://twitter.com' },
      { type: 'instagram', url: 'https://instagram.com' },
    ],
    copyright: '© 2026 Cobralia S.A.S. Todos los derechos reservados.',
    columns: [
      {
        title: 'Producto',
        links: [
          { label: 'Funciones', href: '#producto' },
          { label: 'Precios', href: '#precios' },
          { label: 'Cambios', href: '#' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Sobre nosotros', href: '#' },
          { label: 'Blog', href: '#' },
          { label: 'Contacto', href: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Términos', href: '#' },
          { label: 'Privacidad', href: '#' },
          { label: 'Política de datos', href: '#' },
        ],
      },
    ],
  },
};
