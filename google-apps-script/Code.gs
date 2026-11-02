/**
 * Recibe las confirmaciones de la invitación y las guarda en esta planilla.
 * Se pega en Extensiones > Apps Script de la Google Sheet (ver README.md).
 */
const SHEET_NAME = 'Confirmaciones';
const HEADERS = ['Fecha', 'Nombre', 'Asiste', 'Acompañantes', 'Cantidad', 'Restricciones alimentarias', 'Mensaje'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return json({ ok: true }); // honeypot anti-spam
    if (!d.nombre || !d.asiste) return json({ ok: false, error: 'Faltan datos' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    const asiste = d.asiste === 'si';
    const acomp = asiste ? String(d.acompanantes || '').trim() : '';
    const cantidad = asiste ? 1 + (acomp ? acomp.split(/[,\n]/).filter(s => s.trim()).length : 0) : 0;
    sheet.appendRow([
      new Date(),
      String(d.nombre).trim(),
      asiste ? 'Sí' : 'No',
      acomp,
      cantidad,
      asiste ? String(d.restricciones || '').trim() : '',
      String(d.mensaje || '').trim(),
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
