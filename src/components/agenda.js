import { html } from 'lit';
import { Section, sprig, iconLink } from './base.js';
import { config as c } from '../config.js';

class MnAgenda extends Section {
  render() {
    return html`
      <section id="agenda">
        <h2 class="caps title">Agenda y lugar</h2>
        <img class="art" src="/santa-lucia.webp" alt="Ilustración de Santa Lucía Eventos" loading="lazy" />
        <p class="caps venue">${c.venue.name}</p>
        <p class="caps small">${c.venue.place}</p>
        ${iconLink({ icon: 'pin', label: 'Cómo llegar', href: c.venue.mapsUrl })}
        ${sprig}
        <ol class="agenda">
          ${c.agenda.map((i) => html`<li><span class="time">${i.time}</span><span class="what">${i.title}</span></li>`)}
        </ol>
      </section>
    `;
  }
}
customElements.define('mn-agenda', MnAgenda);
