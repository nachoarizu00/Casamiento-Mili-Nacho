import { LitElement, html, svg } from 'lit';

// Light DOM: los estilos globales de styles.css aplican a todos los componentes.
// Cada sección aparece con un fade suave al entrar en pantalla.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.15 }
);

export class Section extends LitElement {
  createRenderRoot() {
    return this;
  }
  firstUpdated() {
    this.classList.add('reveal');
    io.observe(this);
  }
}

export const sprig = html`<svg class="sprig" viewBox="0 0 120 40" aria-hidden="true">
  <path d="M2 20h38M80 20h38" stroke="currentColor" stroke-width=".8" fill="none" opacity=".5" />
  <path d="M46 28c10-2 20-6 28-16" stroke="currentColor" stroke-width=".9" fill="none" />
  <g fill="currentColor" opacity=".75">
    <path d="M52 26c-3-5-1-9 3-11 2 4 1 8-3 11z" />
    <path d="M60 22c-2-5 0-9 4-10 1 4 0 8-4 10z" />
    <path d="M67 17c0-5 3-8 7-8 0 4-3 7-7 8z" />
    <path d="M58 28c3-4 7-4 10-2-2 3-6 4-10 2z" />
    <path d="M65 23c3-3 7-3 10-1-2 3-6 3-10 1z" />
  </g>
</svg>`;

// Íconos de línea fina, en círculo, como en la referencia.
const icons = {
  pin: svg`<path d="M12 21s-6-5.6-6-10.2A6 6 0 0 1 18 10.8C18 15.4 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.2" />`,
  mail: svg`<rect x="4" y="6.5" width="16" height="11" rx="1" /><path d="M4.5 7.5l7.5 5.8 7.5-5.8" />`,
  gift: svg`<rect x="5" y="11" width="14" height="9" /><rect x="4" y="8" width="16" height="3" /><path d="M12 8v12M12 8c-1.5-3.5-5-3.5-5-1.2C7 8 9 8 12 8zM12 8c1.5-3.5 5-3.5 5-1.2C17 8 15 8 12 8z" />`,
  music: svg`<path d="M9 17V6l9-2v11" /><circle cx="7" cy="17" r="2" /><circle cx="16" cy="15" r="2" />`,
  copy: svg`<rect x="8" y="8" width="11" height="11" rx="1" /><path d="M5 15V6a1 1 0 0 1 1-1h9" />`,
};

export const iconLink = ({ icon, label, href, target = '_blank' }) => html`
  <a class="icon-link" href=${href || '#'} target=${target} rel="noopener" @click=${(e) => !href && e.preventDefault()}>
    <span class="circle">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">${icons[icon]}</svg>
    </span>
    <span class="label">${label}</span>
  </a>
`;

export { html, icons };
