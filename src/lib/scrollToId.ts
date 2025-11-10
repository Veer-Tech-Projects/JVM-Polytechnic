// src/lib/scrollToId.ts
export function scrollToId(id?: string) {
  if (!id) return;
  // remove leading '#' if passed
  const cleanId = id.startsWith('#') ? id.slice(1) : id;
  const el = typeof document !== 'undefined' ? document.getElementById(cleanId) : null;
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // small focus for accessibility
    el.setAttribute('tabindex', '-1');
    // remove tabindex after short delay
    setTimeout(() => el.removeAttribute('tabindex'), 1500);
  } else {
    // no element found — do nothing (fallback handled in caller)
  }
}
