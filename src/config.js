// Todo lo que cambia entre invitaciones vive acá. Editá solo este archivo.
export const config = {
  couple: { a: 'Mili', b: 'Nacho' },
  intro: 'Los invitamos a nuestro casamiento',
  dateISO: '2027-02-13T17:30:00-03:00',
  dateLabel: '13 · 02 · 2027',

  venue: {
    name: 'Santa Lucía Eventos',
    place: 'Open Door, Buenos Aires',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Santa+Luc%C3%ADa+Eventos+Open+Door+Buenos+Aires',
  },

  agenda: [
    { time: '17:30', title: 'Ceremonia' },
    { time: '19:00', title: 'Recepción y cena' },
    { time: '21:00', title: 'Fiesta' },
  ],

  rsvp: {
    endpoint: '', // TODO: URL "/exec" del Apps Script (ver README.md)
  },

  gifts: {
    note: 'PONGAN LA TARASCA PUTOS',
    accounts: [
      { label: 'Cuenta en pesos', alias: 'TODO.ALIAS.ARS' },
      { label: 'Cuenta en dólares', alias: 'TODO.ALIAS.USD' },
    ],
  },

  songs: {
    note: 'Ayudanos a armar la playlist de la noche.',
    url: '', // TODO: link a playlist colaborativa de Spotify
  },
};
