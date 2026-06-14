# Ferser

Sitio corporativo de [Ferser](https://ferser.co), construido con
[Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com). Sitio
estático bilingüe (español e inglés), optimizado para SEO y rendimiento.

## Stack

- Astro 5 (salida estática)
- Tailwind CSS 4 (vía `@tailwindcss/vite`)
- Iconos [Lucide](https://lucide.dev) renderizados como SVG en tiempo de build
- `@astrojs/sitemap` para el sitemap

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve el build
```

## Idiomas

El idioma se deduce del slug de la URL (sin prefijo `/en`): las rutas en español
viven en la raíz y las de inglés usan su slug en inglés.

| Página      | Español                  | Inglés           |
| ----------- | ------------------------ | ---------------- |
| Inicio      | `/`                      | `/home`          |
| Contacto    | `/contacto`              | `/contact`       |
| Proyectos   | `/proyectos`             | `/projects`      |
| Privacidad  | `/privacidad`            | `/privacy`       |
| Oferta      | `/oferta-de-lanzamiento` | `/launch-offer`  |

Los textos viven en [`src/i18n/ui.ts`](src/i18n/ui.ts) y la tabla de rutas en
[`src/i18n/utils.ts`](src/i18n/utils.ts).

## Estructura

```
src/
  pages/          # rutas (una carpeta por slug e idioma)
  layouts/        # layout base con meta tags, Open Graph y JSON-LD
  components/     # navegación, footer y secciones del sitio
  templates/      # plantillas de demostración de la oferta
  i18n/           # diccionarios y helpers de idioma
  styles/         # Tailwind + estilos propios
public/           # favicon, imágenes Open Graph, robots.txt
```

## Despliegue

`npm run build` genera un sitio estático en `dist/`, desplegable en cualquier
hosting estático o detrás de un servidor web como Caddy o Nginx.
