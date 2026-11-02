import { html } from 'lit';
import { Section, sprig } from './base.js';
import { config as c } from '../config.js';

class MnHero extends Section {
  // La portada tiene su propia animación de apertura (no usa el fade genérico):
  // espera a que la ilustración esté decodificada y recién ahí arranca.
  firstUpdated() {
    const img = this.querySelector('.hero-art');
    const go = () => this.classList.add('ready');
    (img?.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(go);
    setTimeout(go, 2500); // red de seguridad si la imagen tarda
  }

  render() {
    return html`
      <section class="hero">
        <img class="art hero-art" src="/capilla.webp" alt="Ilustración de la capilla" fetchpriority="high" />
        <h1 class="names script">${c.couple.a} <span>y</span> ${c.couple.b}</h1>
        <p class="eyebrow">${c.intro}</p>
        ${sprig}
        <p class="date caps">${c.dateLabel}</p>
        <p class="caps small">${c.venue.name}</p>
        <a class="scroll-hint" href="#agenda" aria-label="Ver más">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width=".9"><path d="M6 9l6 6 6-6" /></svg>
        </a>
      </section>
    `;
  }
}
customElements.define('mn-hero', MnHero);
