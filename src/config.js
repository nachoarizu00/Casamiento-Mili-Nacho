// Todo lo que cambia entre invitaciones vive acá. Editá solo este archivo.
export const config = {
  couple: { a: 'Mili', b: 'Nacho' },
  intro: 'Los invitamos a celebrar nuestro casamiento',
  dateISO: '2027-02-13T17:00:00-03:00', // TODO: hora real de inicio
  dateLabel: '13 · 02 · 2027',

  venue: {
    name: 'Santa Lucía Eventos',
    place: 'Open Door, Buenos Aires',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Santa+Luc%C3%ADa+Eventos+Open+Door+Buenos+Aires',
  },

  // TODO: reemplazar con el cronograma real
  agenda: [
    { time: '17:00', title: 'Ceremonia' },
    { time: '18:00', title: 'Recepción' },
    { time: '20:00', title: 'Cena' },
    { time: '23:00', title: 'Fiesta' },
  ],

  rsvp: {
    note: 'Por favor, confirmar asistencia antes del 13 de enero.', // TODO: fecha límite
    endpoint: '', // TODO: URL "/exec" del Apps Script (ver README.md)
  },

  gifts: {
    note: 'Su presencia es nuestro mejor regalo. Si desean acompañarnos de otra manera:',
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
