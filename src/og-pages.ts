// Mapa de páginas para generar una imagen OG (tarjeta de vista previa) propia
// por URL e idioma, en build. Los textos se derivan de i18n/ui para no
// duplicarlos. La clave es `${slug}-${lang}` y produce /og/${slug}-${lang}.png
import { ui } from './i18n/ui';
import type { Lang, TranslationKey } from './i18n/ui';

const PAGES: { key: string; meta: string }[] = [
  { key: 'home', meta: 'meta.home' },
  { key: 'contact', meta: 'meta.contact' },
  { key: 'projects', meta: 'meta.projects' },
  { key: 'hostalk', meta: 'meta.hostalk' },
  { key: 'privacy', meta: 'meta.privacy' },
  { key: 'offer', meta: 'meta.oferta' },
];

// Quita la marca "Ferser" del título (al inicio o al final) porque la tarjeta
// ya muestra el wordmark de Ferser aparte; así el titular respira.
const stripBrand = (s: string) =>
  s
    .replace(/^\s*Ferser\s*[-–—]\s*/, '')
    .replace(/\s*[-–—]\s*Ferser\s*$/, '')
    .trim();

export const ogPages: Record<string, { title: string; description: string }> = {};

for (const { key, meta } of PAGES) {
  for (const lang of ['es', 'en'] as Lang[]) {
    ogPages[`${key}-${lang}`] = {
      title: stripBrand(ui[lang][`${meta}.title` as TranslationKey]),
      description: ui[lang][`${meta}.description` as TranslationKey],
    };
  }
}
