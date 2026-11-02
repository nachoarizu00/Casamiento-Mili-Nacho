import { html } from 'lit';
import { Section, iconLink } from './base.js';
import { config as c } from '../config.js';

class MnSongs extends Section {
  render() {
    return html`
      <section id="canciones">
        <h2 class="caps title">Sumá tu canción</h2>
        <p class="note">${c.songs.note}</p>
        ${iconLink({ icon: 'music', label: 'Agregar canciones', href: c.songs.url })}
      </section>
    `;
  }
}
customElements.define('mn-songs', MnSongs);
