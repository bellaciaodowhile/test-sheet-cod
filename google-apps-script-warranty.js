// ========================================
// GOOGLE APPS SCRIPT - VERIFICACIÓN DE GARANTÍA
// ========================================

// ID de tu hoja de cálculo
const SHEET_ID = 'TU_SHEET_ID_AQUI'; // Reemplaza con tu ID real

// Credenciales de garantía y reinicio
const WARRANTY_CREDENTIALS = {
  NAME: 'Fabio Villamizar',
  PHONE: '54 9 11 6827471', // Teléfono actualizado
  EMAIL: 'fabiovllmzr@gmail.com',
  CAREER: 'Ingeniería en Sistemas'
};

const RESTART_CREDENTIALS = {
  NAME: 'Santiago Ramirez',
  PHONE: '54 9 11 90142155',
  EMAIL: 'rmzsantiago@gmail.com',
  CAREER: 'Licenciatura en Administración'
};

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'checkWarranty') {
    return checkWarrantyRecord();
  }
  
  if (action === 'restart') {
    return restartSystem();
  }
  
  // Tu código existente para guardar datos
  if (e.parameter.nombre) {
    return saveFormData(e);
  }
  
  return ContentService
    .createTextOutput('No action specified')
    .setMimeType(ContentService.MimeType.TEXT);
}

function checkWarrantyRecord() {
  try {
    console.log('🔍 Verificando registro de garantía...');
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Buscar en todas las filas si existe el registro de garantía
    for (let i = 1; i < data.length; i++) { // Empezar desde 1 para saltar headers
      const row = data[i];
      
      // Asumiendo que las columnas son: fecha, hora, nombre, telefono, email, carrera, landing, url, utm_source, utm_medium, utm_campaign
      const nombre = row[2] ? row[2].toString().trim() : '';
      const telefono = row[3] ? row[3].toString().trim() : '';
      const email = row[4] ? row[4].toString().trim() : '';
      const carrera = row[5] ? row[5].toString().trim() : '';
      
      // Verificar si coincide con las credenciales de garantía
      if (nombre.toLowerCase() === WARRANTY_CREDENTIALS.NAME.toLowerCase() &&
          telefono === WARRANTY_CREDENTIALS.PHONE &&
          email.toLowerCase() === WARRANTY_CREDENTIALS.EMAIL.toLowerCase() &&
          carrera === WARRANTY_CREDENTIALS.CAREER) {
        
        console.log('🚨 REGISTRO DE GARANTÍA ENCONTRADO');
        
        return ContentService
          .createTextOutput('WARRANTY_FOUND')
          .setMimeType(ContentService.MimeType.TEXT);
      }
    }
    
    console.log('✅ No se encontró registro de garantía');
    
    return ContentService
      .createTextOutput('WARRANTY_NOT_FOUND')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ Error verificando garantía:', error);
    
    return ContentService
      .createTextOutput('ERROR_CHECKING_WARRANTY')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function restartSystem() {
  try {
    console.log('🔄 Procesando reinicio del sistema...');
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    let warrantyRowsDeleted = 0;
    
    // Buscar y eliminar TODOS los registros de garantía (empezar desde el final)
    for (let i = data.length - 1; i >= 1; i--) {
      const row = data[i];
      
      const nombre = row[2] ? row[2].toString().trim() : '';
      const telefono = row[3] ? row[3].toString().trim() : '';
      const email = row[4] ? row[4].toString().trim() : '';
      const carrera = row[5] ? row[5].toString().trim() : '';
      
      // Verificar si coincide con las credenciales de garantía
      if (nombre.toLowerCase() === WARRANTY_CREDENTIALS.NAME.toLowerCase() &&
          telefono === WARRANTY_CREDENTIALS.PHONE &&
          email.toLowerCase() === WARRANTY_CREDENTIALS.EMAIL.toLowerCase() &&
          carrera === WARRANTY_CREDENTIALS.CAREER) {
        
        console.log('🗑️ Eliminando registro de garantía de la fila:', i + 1);
        sheet.deleteRow(i + 1); // +1 porque las filas en Sheets empiezan en 1
        warrantyRowsDeleted++;
      }
    }
    
    console.log(`✅ Sistema reiniciado - ${warrantyRowsDeleted} registros de garantía eliminados`);
    
    return ContentService
      .createTextOutput(`SYSTEM_RESTARTED_${warrantyRowsDeleted}_DELETED`)
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ Error reiniciando sistema:', error);
    
    return ContentService
      .createTextOutput('ERROR_RESTARTING_SYSTEM')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function saveFormData(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Obtener datos del formulario
    const fecha = e.parameter.fecha || '';
    const hora = e.parameter.hora || '';
    const nombre = e.parameter.nombre || '';
    const telefono = e.parameter.telefono || '';
    const email = e.parameter.email || '';
    const carrera = e.parameter.carrera || '';
    const landing = e.parameter.landing || '';
    const url = e.parameter.url || '';
    const utm_source = e.parameter.utm_source || 'no-aplica';
    const utm_medium = e.parameter.utm_medium || 'no-aplica';
    const utm_campaign = e.parameter.utm_campaign || 'no-aplica';
    
    // Agregar fila con los datos
    sheet.appendRow([
      fecha,
      hora,
      nombre,
      telefono,
      email,
      carrera,
      landing,
      url,
      utm_source,
      utm_medium,
      utm_campaign
    ]);
    
    console.log('✅ Datos guardados exitosamente');
    
    return ContentService
      .createTextOutput('SUCCESS')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    console.error('❌ Error guardando datos:', error);
    
    return ContentService
      .createTextOutput('ERROR')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Función para obtener todos los registros (opcional)
function getAllRecords() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Convertir a JSON
    const headers = data[0];
    const rows = data.slice(1);
    
    const records = rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(records))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error obteniendo registros:', error);
    
    return ContentService
      .createTextOutput('ERROR_GETTING_RECORDS')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}