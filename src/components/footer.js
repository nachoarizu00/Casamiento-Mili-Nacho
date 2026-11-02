import { html } from 'lit';
import { Section, sprig } from './base.js';
import { config as c } from '../config.js';

class MnFooter extends Section {
  render() {
    return html`
      <footer>
        ${sprig}
        <p class="script sign">${c.couple.a} y ${c.couple.b}</p>
        <p class="caps small">${c.dateLabel}</p>
      </footer>
    `;
  }
}
customElements.define('mn-footer', MnFooter);
