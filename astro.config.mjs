import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ferser.co',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  // Mantener vivas las URLs antiguas ya compartidas y todas las /en/* previas.
  // (El idioma ahora se deduce del slug, ver src/i18n/utils.ts — sin prefijo /en.)
  redirects: {
    '/oferta': '/oferta-de-lanzamiento',
    '/en': '/home',
    '/en/contact': '/contact',
    '/en/projects': '/projects',
    '/en/projects/hostalk': '/projects/hostalk',
    '/en/privacy': '/privacy',
    '/en/launch-offer': '/launch-offer',
    '/en/offer': '/launch-offer',
  },
  integrations: [
    sitemap({
      // Excluir demos del sitemap (son plantillas ficticias, ya tienen noindex
      // pero además queremos que ni siquiera se descubran vía sitemap)
      filter: (page) => !page.includes('/oferta-de-lanzamiento/demo/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
