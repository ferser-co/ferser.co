// Personalización por región, 100% asíncrona y fuera de la ruta crítica.
// La página ya pintó con un estado neutro (moneda por timezone en el <head>
// e idioma por ruta). Aquí hacemos una sola consulta a ipapi.co para:
//   1. Afinar la MONEDA si la timezone no coincide con la región real (VPN, etc.)
//   2. Sugerir el IDIOMA con un banner discreto y descartable, SIN redirigir
//      (las URLs por idioma + hreflang siguen siendo la fuente de verdad SEO).
// Antes de la respuesta de red usamos navigator.language para no esperar.

type Lang = 'es' | 'en';

// Eurozona + Europa cercana: preferimos EUR e inglés frente a USD.
const EUR_COUNTRIES = new Set([
  'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT',
  'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK',
  'GB', 'CH', 'NO', 'SE', 'DK', 'IS', 'LI', 'MC', 'SM', 'VA', 'AD',
]);

// Países hispanohablantes (fuera de CO/ES): español, moneda USD.
const HISPANO = new Set([
  'MX', 'AR', 'PE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY',
  'SV', 'NI', 'CR', 'PA', 'UY', 'VE', 'GQ', 'PR',
]);

function currencyFromCountry(cc: string): string {
  if (cc === 'CO') return 'COP';
  if (EUR_COUNTRIES.has(cc)) return 'EUR';
  return 'USD';
}

// Matriz de idioma: CO/ES/hispanohablantes → es; Europa (no ES) y resto → en.
function langFromCountry(cc: string): Lang {
  if (cc === 'CO' || cc === 'ES' || HISPANO.has(cc)) return 'es';
  return 'en';
}

function langFromNavigator(): Lang {
  return (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
}

// ── Banner de sugerencia de idioma ──────────────────────────────────────────
const html = document.documentElement;
const pageLang = (html.getAttribute('lang') as Lang) || 'es';
const suggestEl = document.querySelector<HTMLElement>('[data-lang-suggest]');
// Idioma que ofrece el banner (el alternativo al de la página actual).
const suggestLang = suggestEl?.getAttribute('data-suggest-lang') as Lang | undefined;
let dismissed = localStorage.getItem('langSuggestDismissed') === '1';

function showSuggestion() {
  if (!suggestEl) return;
  suggestEl.classList.remove('invisible');
  requestAnimationFrame(() => suggestEl.classList.remove('opacity-0', 'translate-y-3'));
}

function hideSuggestion() {
  if (!suggestEl) return;
  suggestEl.classList.add('opacity-0', 'translate-y-3');
  setTimeout(() => suggestEl.classList.add('invisible'), 300);
}

// Decide si mostrar el banner: solo si la preferencia apunta al idioma
// alternativo (el que ofrece el banner) y el usuario no lo ha descartado.
function reconcileLang(preferred: Lang) {
  if (!suggestEl || dismissed || !suggestLang) return;
  if (preferred !== pageLang && preferred === suggestLang) showSuggestion();
  else hideSuggestion();
}

if (suggestEl && !dismissed) {
  suggestEl.querySelector('[data-lang-dismiss]')?.addEventListener('click', () => {
    dismissed = true; // evita que una respuesta tardía de ipapi lo reabra
    hideSuggestion();
    try {
      localStorage.setItem('langSuggestDismissed', '1');
    } catch {}
  });
  // Primera aproximación inmediata con el idioma del navegador (sin red).
  reconcileLang(langFromNavigator());
}

// ── Consulta de geolocalización (una sola, en segundo plano) ─────────────────
const currencyOverridden = !!localStorage.getItem('currency');
const needsGeo = !currencyOverridden || (!!suggestEl && !dismissed);

async function runGeoLookup() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const r = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) return;
    const data = await r.json();
    const cc: string = data.country_code || '';
    if (!cc) return;

    // Moneda: solo si el usuario no eligió una explícitamente.
    if (!currencyOverridden) {
      const next = currencyFromCountry(cc);
      if (next !== html.getAttribute('data-currency')) {
        html.setAttribute('data-currency', next);
      }
    }

    // Idioma: afinamos la sugerencia con el país real.
    reconcileLang(langFromCountry(cc));
  } catch {
    // Silencioso: la página ya funciona con los valores por defecto.
  }
}

if (needsGeo) {
  // "Load on interaction": no lanzamos la consulta durante la carga, sino en la
  // primera interacción real. Así sale por completo de la ruta crítica (los
  // rastreadores de rendimiento no interactúan, luego ni siquiera se dispara) y
  // tampoco compite por la red en ningún caso. La moneda ya está bien fijada por
  // timezone antes del paint; esto solo la refina cuando el usuario interactúa.
  const events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'] as const;
  let fired = false;
  const trigger = () => {
    if (fired) return;
    fired = true;
    events.forEach((e) => window.removeEventListener(e, trigger));
    runGeoLookup();
  };
  events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
}
