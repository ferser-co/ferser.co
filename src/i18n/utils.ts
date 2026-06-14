import { ui, defaultLang, type Lang, type TranslationKey } from './ui';

/**
 * Tabla única de rutas. Cada página tiene un slug propio por idioma, SIN
 * prefijo de idioma (ni /es ni /en). El español va en la raíz; el inglés
 * usa el slug en inglés (la home en inglés vive en /home porque / es español).
 *
 * La clave de cada llamada a localizedPath()/pathWithoutLang es el slug
 * canónico en español (la columna `es`).
 */
const ROUTES: Record<string, Record<Lang, string>> = {
  home:     { es: '/',                      en: '/home' },
  contact:  { es: '/contacto',              en: '/contact' },
  projects: { es: '/proyectos',             en: '/projects' },
  hostalk:  { es: '/proyectos/hostalk',     en: '/projects/hostalk' },
  privacy:  { es: '/privacidad',            en: '/privacy' },
  offer:    { es: '/oferta-de-lanzamiento', en: '/launch-offer' },
};

// Índice inverso: slug canónico en español → entrada de ROUTES.
const BY_ES_PATH: Record<string, Record<Lang, string>> = {};
for (const key in ROUTES) BY_ES_PATH[ROUTES[key].es] = ROUTES[key];

/**
 * Deduce el idioma a partir del slug de la URL (ya no hay prefijo /en).
 * Es inglés si la ruta coincide con —o cuelga de— un slug en inglés.
 */
export function getLangFromUrl(url: URL): Lang {
  let path = url.pathname.replace(/\/+$/, '');
  if (path === '') path = '/';
  for (const key in ROUTES) {
    const en = ROUTES[key].en;
    if (en !== '/' && (path === en || path.startsWith(en + '/'))) return 'en';
  }
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

function resolveLocalPath(lang: Lang, esPath: string): string {
  const entry = BY_ES_PATH[esPath];
  // Si no está en la tabla (anclas, rutas sueltas) se devuelve igual.
  if (!entry) return esPath.startsWith('/') ? esPath : `/${esPath}`;
  return entry[lang];
}

export function localizedPath(lang: Lang, path: string): string {
  return resolveLocalPath(lang, path);
}

export function alternateLangPath(currentLang: Lang, path: string): { lang: Lang; href: string } {
  const otherLang: Lang = currentLang === 'es' ? 'en' : 'es';
  return { lang: otherLang, href: resolveLocalPath(otherLang, path) };
}
