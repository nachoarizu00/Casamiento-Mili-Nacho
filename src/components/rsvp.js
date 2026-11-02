import { html } from 'lit';
import { Section } from './base.js';
import { config as c } from '../config.js';

class MnRsvp extends Section {
  static properties = { asiste: { state: true }, status: { state: true } };

  constructor() {
    super();
    this.asiste = '';
    this.status = 'idle'; // idle | sending | ok | error
  }

  async submit(e) {
    e.preventDefault();
    if (!c.rsvp.endpoint) {
      this.status = 'error';
      console.warn('Falta rsvp.endpoint en src/config.js');
      return;
    }
    const f = Object.fromEntries(new FormData(e.target));
    this.status = 'sending';
    try {
      // text/plain evita el preflight CORS, que Apps Script no soporta.
      const res = await fetch(c.rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(f),
      });
      const out = await res.json();
      this.status = out.ok ? 'ok' : 'error';
    } catch {
      this.status = 'error';
    }
  }

  render() {
    if (this.status === 'ok') {
      return html`<section id="rsvp">
        <h2 class="caps title">Confirmar asistencia</h2>
        <p class="script thanks">¡Gracias!</p>
        <p class="note">${this.asiste === 'si' ? 'Recibimos tu confirmación. ¡Nos vemos pronto!' : 'Lamentamos que no puedas venir. Gracias por avisarnos.'}</p>
      </section>`;
    }
    const sending = this.status === 'sending';
    return html`
      <section id="rsvp">
        <h2 class="caps title">Confirmar asistencia</h2>
        <p class="note">${c.rsvp.note}</p>
        <form class="rsvp-form" @submit=${this.submit}>
          <label>Nombre y apellido
            <input name="nombre" required autocomplete="name" />
          </label>

          <fieldset class="choice">
            <legend>¿Podés venir?</legend>
            <label><input type="radio" name="asiste" value="si" required @change=${() => (this.asiste = 'si')} /><span>Sí, ahí estaré</span></label>
            <label><input type="radio" name="asiste" value="no" @change=${() => (this.asiste = 'no')} /><span>No puedo</span></label>
          </fieldset>

          ${this.asiste === 'si'
            ? html`
                <label>Acompañantes (nombres, separados por coma)
                  <input name="acompanantes" />
                </label>
                <label>Restricciones alimentarias
                  <input name="restricciones" placeholder="Celíaco, vegetariano, alergias…" />
                </label>
              `
            : ''}

          <label>Mensaje (opcional)
            <textarea name="mensaje" rows="2"></textarea>
          </label>

          <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />

          <button class="submit" type="submit" ?disabled=${sending}>${sending ? 'Enviando…' : 'Enviar'}</button>
          ${this.status === 'error'
            ? html`<p class="error">No pudimos enviar tu respuesta. Probá de nuevo o escribinos por WhatsApp.</p>`
            : ''}
        </form>
      </section>
    `;
  }
}
customElements.define('mn-rsvp', MnRsvp);
