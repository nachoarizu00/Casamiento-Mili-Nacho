import { html } from 'lit';
import { Section } from './base.js';
import { config as c } from '../config.js';

// Cuántos acompañantes puede sumar este invitado. Se define en el link que le mandás:
//   https://tu-sitio.com/?mas=1   -> puede sumar 1 persona
//   https://tu-sitio.com/?mas=3   -> hasta 3 (máximo 5)
//   https://tu-sitio.com/         -> viene solo
const maxExtras = (() => {
  const n = parseInt(new URLSearchParams(location.search).get('mas') ?? '0', 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 5) : 0;
})();

class MnRsvp extends Section {
  static properties = {
    asiste: { state: true },
    status: { state: true },
    extras: { state: true },
  };

  constructor() {
    super();
    this.asiste = '';
    this.status = 'idle'; // idle | sending | ok | error
    this.extras = []; // [{ nombre, restricciones }]
  }

  addExtra() {
    if (this.extras.length < maxExtras) this.extras = [...this.extras, { nombre: '', restricciones: '' }];
  }
  removeExtra(i) {
    this.extras = this.extras.filter((_, j) => j !== i);
  }
  setExtra(i, key, value) {
    this.extras = this.extras.map((x, j) => (j === i ? { ...x, [key]: value } : x));
  }

  async submit(e) {
    e.preventDefault();
    if (!c.rsvp.endpoint) {
      this.status = 'error';
      console.warn('Falta rsvp.endpoint en src/config.js');
      return;
    }
    const f = Object.fromEntries(new FormData(e.target));
    const viene = this.asiste === 'si';
    const payload = {
      nombre: f.nombre,
      asiste: f.asiste,
      restricciones: viene ? f.restricciones || '' : '',
      acompanantes: viene ? this.extras.filter((x) => x.nombre.trim()) : [],
      website: f.website, // honeypot
    };
    this.status = 'sending';
    try {
      // text/plain evita el preflight CORS, que Apps Script no soporta.
      const res = await fetch(c.rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const out = await res.json();
      this.status = out.ok ? 'ok' : 'error';
    } catch {
      this.status = 'error';
    }
  }

  renderExtras() {
    if (this.asiste !== 'si' || maxExtras === 0) return '';
    return html`
      <div class="extras">
        ${this.extras.map(
          (x, i) => html`
            <div class="extra">
              <label>Acompañante ${i + 1}
                <input .value=${x.nombre} @input=${(e) => this.setExtra(i, 'nombre', e.target.value)} placeholder="Nombre y apellido" required />
              </label>
              <label>Restricciones alimentarias
                <input .value=${x.restricciones} @input=${(e) => this.setExtra(i, 'restricciones', e.target.value)} placeholder="Opcional" />
              </label>
              <button type="button" class="link" @click=${() => this.removeExtra(i)}>Quitar</button>
            </div>
          `
        )}
        ${this.extras.length < maxExtras
          ? html`<button type="button" class="add" @click=${this.addExtra}>
              + Sumar acompañante${maxExtras > 1 ? ` (hasta ${maxExtras})` : ''}
            </button>`
          : ''}
      </div>
    `;
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
            ? html`<label>Restricciones alimentarias
                <input name="restricciones" placeholder="Celíaco, vegetariano, alergias…" />
              </label>`
            : ''}

          ${this.renderExtras()}

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
