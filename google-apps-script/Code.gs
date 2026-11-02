/**
 * Recibe las confirmaciones de la invitación y las guarda en esta planilla.
 * Se pega en Extensiones > Apps Script de la Google Sheet (ver README.md).
 */
const SHEET_NAME = 'Confirmaciones';
// Solo si el script NO se creó desde la planilla (Extensiones > Apps Script):
// pegá acá el ID de la planilla (lo que va entre /d/ y /edit en su URL).
const SPREADSHEET_ID = '';
const HEADERS = ['Fecha', 'Nombre', 'Asiste', 'Restricciones alimentarias', 'Acompañantes', 'Restricciones acompañantes', 'Cantidad total'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return json({ ok: true }); // honeypot anti-spam
    if (!d.nombre || !d.asiste) return json({ ok: false, error: 'Faltan datos' });

    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const asiste = d.asiste === 'si';
    const extras = asiste && Array.isArray(d.acompanantes)
      ? d.acompanantes.filter(x => x && String(x.nombre || '').trim()).slice(0, 5)
      : [];
    const nombres = extras.map(x => String(x.nombre).trim()).join(', ');
    const restrExtras = extras
      .filter(x => String(x.restricciones || '').trim())
      .map(x => String(x.nombre).trim() + ': ' + String(x.restricciones).trim())
      .join('; ');

    sheet.appendRow([
      new Date(),
      String(d.nombre).trim(),
      asiste ? 'Sí' : 'No',
      asiste ? String(d.restricciones || '').trim() : '',
      nombres,
      restrExtras,
      asiste ? 1 + extras.length : 0,
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet() {
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('El script no está conectado a una planilla. Completá SPREADSHEET_ID.');
  return ss;
}

// Abrir la URL /exec en el navegador: responde "ok" si todo está bien desplegado.
function doGet() {
  return json({ ok: true, mensaje: 'Funciona. Las confirmaciones se envían por POST.' });
}

/**
 * PRUEBA: en el editor de Apps Script elegí "probar" en el menú de funciones y tocá Ejecutar.
 * Pide permisos si faltan, escribe una fila de prueba y muestra el error real en "Registro de ejecución".
 */
function probar() {
  const r = doPost({ postData: { contents: JSON.stringify({
    nombre: 'PRUEBA Borrar', asiste: 'si', restricciones: 'ninguna',
    acompanantes: [{ nombre: 'Acompañante Prueba', restricciones: '' }],
  }) } });
  Logger.log(r.getContent());
}
