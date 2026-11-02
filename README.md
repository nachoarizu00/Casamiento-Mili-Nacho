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

## Menores de 4 a 18 años

Cualquier invitado que confirma ve la pregunta "¿Venís con algún menor de edad de entre 4 y 18 años?". Si dice que sí, completa nombre, edad y restricciones de cada menor (hasta 8). En la planilla quedan en las columnas **Menores (4-18)**, **Restricciones menores** y **Cantidad menores**, y **Cantidad total** los incluye. Si cambiás `Code.gs`, hay que publicar una **Nueva versión** de la implementación.

## Invitados con +1

El formulario no pide acompañantes por defecto. Para quien puede venir con alguien, mandale el link con `?mas=N`:

- `https://tu-sitio.com/` → viene solo
- `https://tu-sitio.com/?mas=1` → puede sumar 1 acompañante
- `https://tu-sitio.com/?mas=3` → hasta 3 (máximo 5)

## Deploy

Repo en GitHub → importar en Vercel (detecta Vite solo).
