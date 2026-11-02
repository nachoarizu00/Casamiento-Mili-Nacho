import { defineConfig } from 'vite';

// Las vistas previas (og:image) necesitan una URL absoluta.
// Por defecto usa el dominio propio; se puede cambiar con la variable SITE_URL en Vercel.
const DEFAULT_SITE_URL = 'https://www.miliynacho.com';
const siteUrl = () => (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

export default defineConfig({
  plugins: [
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl()),
    },
  ],
});
