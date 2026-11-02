import { html } from 'lit';
import { Section, icons } from './base.js';
import { config as c } from '../config.js';

class MnGifts extends Section {
  static properties = { copied: { state: true } };

  async copy(alias) {
    try {
      await navigator.clipboard.writeText(alias);
      this.copied = alias;
      setTimeout(() => (this.copied = null), 1800);
    } catch {}
  }

  render() {
    return html`
      <section id="regalos">
        <h2 class="caps title">Regalos</h2>
        <p class="note">${c.gifts.note}</p>
        <div class="accounts">
          ${c.gifts.accounts.map(
            (a) => html`
              <button class="account" @click=${() => this.copy(a.alias)}>
                <span class="caps small">${a.label}</span>
                <span class="alias">${a.alias}</span>
                <span class="copy">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">${icons.copy}</svg>
                  ${this.copied === a.alias ? 'Copiado' : 'Copiar alias'}
                </span>
              </button>
            `
          )}
        </div>
        <div class="honeymoon">
          <img src="/luna-miel-1.webp" alt="Ilustración de Florencia al atardecer" loading="lazy" />
          <img src="/luna-miel-2.webp" alt="Ilustración de montañas y un pueblo alpino" loading="lazy" />
        </div>
      </section>
    `;
  }
}
customElements.define('mn-gifts', MnGifts);
