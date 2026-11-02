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
    endpoint: 'https://script.google.com/macros/s/AKfycbx_GP-rlgcKu45fal4CWhiM9UcyVKZL4Bak58Xmp6-zuHBL4LFVEs6SdFeYgC3ImJ771w/exec',
  },

  // Pantalla que se abre después de enviar la confirmación. {nombre} = nombre de pila.
  thanks: {
    image: '/confirmado.webp', // TODO: subir la foto a /public con este nombre
    yes: {
      title: '¡Qué bueno que venís, {nombre}!',
      body: 'Te esperamos el 13 de febrero en Santa Lucía :)',
      sign: 'Mili y Nacho',
    },
    no: {
      title: 'Te vamos a extrañar {nombre}!!',
      body: 'IGUAL SIEMPRE EN NUESTROS CORAZONES CRACK (Y PONÉ LA CROCANTE)',
    },
  },

  gifts: {
    note: 'El mejor regalo es que puedan venir y estar con nosotros.\nSi además quisieran ayudarnos con nuestras próximas aventuras, como nuestra luna de miel, les compartimos nuestros datos acá abajo',
    accounts: [
      { label: 'Cuenta en pesos', alias: 'NACHOYMILI.ARS' },
      { label: 'Cuenta en dólares', alias: 'NACHOYMILI.USD' },
    ],
  },

  songs: {
    note: 'Contamos con vos para armar la playlist de la noche.\nSumá una canción acá.\nTodo vale. Bueno, casi todo.',
    url: 'https://open.spotify.com/playlist/6frb4yQTp98ypOtdxbRgne?si=8475da0f76e94ea2&pt=38cff7e9040ad9aa01c344ae154dccde',
  },
};
