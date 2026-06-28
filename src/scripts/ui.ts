// Interacciones de UI compartidas por todas las páginas:
//  - Animaciones fade-in al hacer scroll (IntersectionObserver)
//  - Alternar tema claro/oscuro (delegado, soporta varios botones)
//  - Dropdown de moneda (abrir/cerrar + seleccionar)
// El estado inicial de tema/moneda lo fija el script inline del <head>
// para evitar parpadeo antes del primer paint.

const observer = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.1 },
);
document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function closeCurrencyMenus() {
  document.querySelectorAll('[data-currency-menu]').forEach((m) => m.classList.add('hidden'));
  document
    .querySelectorAll('[data-currency-trigger]')
    .forEach((b) => b.setAttribute('aria-expanded', 'false'));
}

function setCurrency(c: string) {
  document.documentElement.setAttribute('data-currency', c);
  localStorage.setItem('currency', c);
  closeCurrencyMenus();
}

function toggleCurrencyMenu(trigger: Element) {
  const dropdown = trigger.closest('[data-currency-dropdown]');
  const menu = dropdown?.querySelector('[data-currency-menu]');
  if (!menu) return;
  const isOpen = !menu.classList.contains('hidden');
  closeCurrencyMenus();
  if (!isOpen) {
    menu.classList.remove('hidden');
    trigger.setAttribute('aria-expanded', 'true');
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as Element;

  if (target.closest('[data-theme-toggle]')) {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(!isDark);
    return;
  }

  const trigger = target.closest('[data-currency-trigger]');
  if (trigger) {
    e.stopPropagation();
    toggleCurrencyMenu(trigger);
    return;
  }

  const pick = target.closest('[data-currency-pick]');
  if (pick) {
    e.stopPropagation();
    setCurrency(pick.getAttribute('data-currency-pick') ?? 'USD');
    return;
  }

  // Click fuera → cerrar
  if (!target.closest('[data-currency-dropdown]')) {
    closeCurrencyMenus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCurrencyMenus();
});
