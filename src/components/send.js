import { html } from 'lit';
import { Section } from './base.js';

// Botón "Enviar" al final de toda la página. Envía el formulario de #rsvp-form
// (atributo form=""), así la gente ve regalos y canciones antes de confirmar.
class MnSend extends Section {
  static properties = { status: { state: true } };

  constructor() {
    super();
    this.status = 'idle';
    this._on = (e) => (this.status = e.detail);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('rsvp:status', this._on);
  }
  disconnectedCallback() {
    window.removeEventListener('rsvp:status', this._on);
    super.disconnectedCallback();
  }

  render() {
    if (this.status === 'ok') return html``;
    const sending = this.status === 'sending';
    return html`
      <section class="send">
        <button class="submit" type="submit" form="rsvp-form" ?disabled=${sending}>${sending ? 'Enviando…' : 'Enviar'}</button>
        ${this.status === 'error'
          ? html`<p class="error">No pudimos enviar tu respuesta. Probá de nuevo o escribinos por WhatsApp.</p>`
          : ''}
      </section>
    `;
  }
}
customElements.define('mn-send', MnSend);
