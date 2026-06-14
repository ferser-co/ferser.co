// Genera las imágenes Open Graph (vista previa al compartir) en PNG 1200x630.
// PNG porque WhatsApp / Facebook / Twitter / LinkedIn NO renderizan SVG como og:image.
//
//   node scripts/gen-og.mjs
//
// Salidas en public/: og-image.png (marca), og-oferta.png (oferta ES), og-offer.png (oferta EN)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const FONT = 'Segoe UI, Arial, sans-serif';

// Fondo + glows + defs compartidos (estética del sitio: slate-950 → indigo-950)
const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="55%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#e879f9"/>
    </linearGradient>
    <radialGradient id="glowV" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6d28d9" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowI" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

const frame = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${defs}
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="320" fill="url(#glowV)"/>
  <circle cx="120" cy="560" r="260" fill="url(#glowI)"/>
  ${inner}
</svg>`;

// ── Imagen de marca (default) ───────────────────────────────────────────────
const brandSvg = frame(`
  <text x="90" y="215" font-family="${FONT}" font-weight="900" font-size="150" fill="url(#brand)" letter-spacing="-5">Ferser</text>
  <text x="96" y="300" font-family="${FONT}" font-weight="600" font-size="40" fill="#e2e8f0">Ingeniería de software a la medida</text>
  <rect x="96" y="345" width="120" height="5" rx="2.5" fill="#22d3ee"/>
  <text x="96" y="430" font-family="${FONT}" font-weight="700" font-size="32" fill="#94a3b8">Desarrollo · Consultoría TI · Capacitación</text>
  <text x="96" y="560" font-family="${FONT}" font-weight="700" font-size="26" fill="#64748b">ferser.co</text>
`);

// ── Imagen de la oferta (parametrizada ES/EN) ───────────────────────────────
function offerSvg({ eyebrow, line1, line2, subtitle, fromLabel, price, priceNormal, period, footerLeft, footerRight }) {
  return frame(`
    <!-- Wordmark -->
    <text x="80" y="96" font-family="${FONT}" font-weight="900" font-size="46" fill="url(#brand)" letter-spacing="-1">Ferser</text>

    <!-- Eyebrow pill -->
    <rect x="80" y="132" width="${44 + eyebrow.length * 13.2}" height="44" rx="22" fill="#4f46e5" fill-opacity="0.20" stroke="#6366f1" stroke-opacity="0.5"/>
    <circle cx="106" cy="154" r="6" fill="#818cf8"/>
    <text x="124" y="162" font-family="${FONT}" font-weight="800" font-size="22" letter-spacing="2" fill="#c7d2fe">${eyebrow}</text>

    <!-- Headline -->
    <text x="78" y="290" font-family="${FONT}" font-weight="900" font-size="62" fill="#ffffff" letter-spacing="-2">${line1}</text>
    <text x="78" y="362" font-family="${FONT}" font-weight="900" font-size="62" fill="url(#accent)" letter-spacing="-2">${line2}</text>

    <!-- Subtitle -->
    <text x="80" y="436" font-family="${FONT}" font-weight="500" font-size="30" fill="#cbd5e1">${subtitle}</text>

    <!-- Price card -->
    <rect x="788" y="196" width="332" height="250" rx="28" fill="#0b1220" fill-opacity="0.72" stroke="#6366f1" stroke-opacity="0.45" stroke-width="2"/>
    <text x="820" y="252" font-family="${FONT}" font-weight="700" font-size="24" fill="#94a3b8">${fromLabel}</text>
    <text x="820" y="332" font-family="${FONT}" font-weight="900" font-size="68" fill="#34d399" letter-spacing="-2">${price}</text>
    <text x="822" y="378" font-family="${FONT}" font-weight="600" font-size="26" fill="#94a3b8">${priceNormal}</text>
    <line x1="822" y1="370" x2="${822 + priceNormal.length * 14.5}" y2="370" stroke="#f43f5e" stroke-width="3"/>
    <rect x="${828 + priceNormal.length * 15}" y="352" width="92" height="34" rx="17" fill="#f43f5e" fill-opacity="0.18"/>
    <text x="${874 + priceNormal.length * 15}" y="376" font-family="${FONT}" font-weight="900" font-size="22" fill="#fb7185" text-anchor="middle">-50%</text>
    <text x="820" y="420" font-family="${FONT}" font-weight="600" font-size="22" fill="#64748b">${period}</text>

    <!-- Footer -->
    <text x="80" y="556" font-family="${FONT}" font-weight="800" font-size="26" fill="#818cf8">${footerLeft}</text>
    <text x="${80 + footerLeft.length * 16}" y="556" font-family="${FONT}" font-weight="500" font-size="24" fill="#64748b"> ·  ${footerRight}</text>
  `);
}

const offerEs = offerSvg({
  eyebrow: 'OFERTA DE LANZAMIENTO',
  line1: 'Tu sitio web profesional,',
  line2: 'listo en una semana.',
  subtitle: 'Dominio + hosting por 1 año incluidos.',
  fromLabel: 'Desde',
  price: '$500.000',
  priceNormal: '$1.000.000',
  period: '/ año · 50% de descuento',
  footerLeft: 'ferser.co',
  footerRight: 'Cupos limitados · hasta 15 ago 2026',
});

const offerEn = offerSvg({
  eyebrow: 'LAUNCH OFFER',
  line1: 'Your pro website,',
  line2: 'live in one week.',
  subtitle: 'Domain + hosting for 1 year included.',
  fromLabel: 'From',
  price: '$145',
  priceNormal: '$290',
  period: '/ year · 50% off (USD)',
  footerLeft: 'ferser.co',
  footerRight: 'Limited spots · through Aug 15, 2026',
});

async function render(svg, name) {
  await sharp(Buffer.from(svg), { density: 200 })
    .resize(1200, 630)
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(PUBLIC, name));
  console.log('✓', name);
}

await render(brandSvg, 'og-image.png');
await render(offerEs, 'og-oferta.png');
await render(offerEn, 'og-offer.png');
console.log('OG images generadas en public/');
