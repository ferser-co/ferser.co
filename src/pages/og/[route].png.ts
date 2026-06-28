// Genera en build una imagen OG (1200×630) por página/idioma, replicando la
// estética de ferser.co: fondo navy con destellos azul/violeta, wordmark
// "Ferser" en degradado azul→cian, subrayado cian, título y "ferser.co".
// Ruta resultante: /og/<slug>-<lang>.png. Se sirve estática (sin coste runtime).
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { ogPages } from '../../og-pages';

const fontRegular = readFileSync('./src/assets/og-fonts/Inter-Regular.ttf');
const fontBold = readFileSync('./src/assets/og-fonts/Inter-Bold.ttf');

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(ogPages).map((route) => ({ params: { route } }));

// Mini-hyperscript para construir el árbol que entiende satori.
type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): El => ({
  type,
  props: { style, ...(children !== undefined ? { children } : {}) },
});

function card(title: string, description: string): El {
  // El titular más largo (la oferta) necesita una tipografía algo menor.
  const titleSize = title.length > 46 ? 54 : 66;

  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      backgroundColor: '#0a0e1c',
      fontFamily: 'Inter',
    },
    [
      // Destellos de marca
      h('div', {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        backgroundImage:
          'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.40), transparent 45%), radial-gradient(circle at 0% 100%, rgba(37,99,235,0.35), transparent 45%)',
      }),
      // Contenido
      h(
        'div',
        {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
        },
        [
          // Wordmark de marca
          h(
            'div',
            { display: 'flex', alignItems: 'center' },
            h(
              'div',
              {
                display: 'flex',
                fontSize: 46,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                backgroundClip: 'text',
                '-webkit-background-clip': 'text',
                color: 'transparent',
              },
              'Ferser',
            ),
          ),
          // Bloque central: título + acento + descripción
          h(
            'div',
            { display: 'flex', flexDirection: 'column' },
            [
              h(
                'div',
                {
                  display: 'flex',
                  fontSize: titleSize,
                  fontWeight: 700,
                  color: '#f8fafc',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  maxWidth: 1000,
                },
                title,
              ),
              h('div', {
                display: 'flex',
                width: 96,
                height: 6,
                borderRadius: 9999,
                marginTop: 28,
                marginBottom: 28,
                backgroundImage: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
              }),
              h(
                'div',
                {
                  display: 'flex',
                  fontSize: 30,
                  fontWeight: 400,
                  color: '#94a3b8',
                  lineHeight: 1.4,
                  maxWidth: 960,
                },
                description,
              ),
            ],
          ),
          // Pie
          h(
            'div',
            { display: 'flex', fontSize: 26, fontWeight: 700, color: '#64748b' },
            'ferser.co',
          ),
        ],
      ),
    ],
  );
}

export const GET: APIRoute = async ({ params }) => {
  const page = ogPages[params.route as string];
  if (!page) return new Response('Not found', { status: 404 });

  const svg = await satori(card(page.title, page.description) as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
