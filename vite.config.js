import { defineConfig } from 'vite';

// Las vistas previas (og:image) necesitan una URL absoluta. Orden de prioridad:
//   1. SITE_URL (variable en Vercel; usala si tenés dominio propio, ej. https://milinacho.com)
//   2. VERCEL_PROJECT_PRODUCTION_URL (la define Vercel sola)
//   3. vacío (desarrollo local)
const siteUrl = () => {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : '';
};

export default defineConfig({
  plugins: [
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl()),
    },
  ],
});
