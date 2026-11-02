# Invitación Mili y Nacho

Vite + Lit. Todo el contenido se edita en `src/config.js`.

```bash
npm install
npm run dev      # desarrollo
npm run build    # genera dist/
```

## Confirmaciones en Google Sheets

1. Creá una Google Sheet nueva (por ejemplo "Confirmaciones boda").
2. **Extensiones → Apps Script**. Borrá el contenido y pegá `google-apps-script/Code.gs`. Guardá.
3. **Implementar → Nueva implementación → Tipo: Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   - Autorizá los permisos cuando los pida.
4. Copiá la URL que termina en `/exec` y pegala en `src/config.js` → `rsvp.endpoint`.
5. Cada confirmación aparece como una fila nueva en la hoja "Confirmaciones".

Si cambiás el script, hay que hacer **Implementar → Administrar implementaciones → Editar → Nueva versión**; la URL se mantiene.

## Deploy

Repo en GitHub → importar en Vercel (detecta Vite solo).
