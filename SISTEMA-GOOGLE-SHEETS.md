# 📊 Sistema Basado en Google Sheets - Corregido

## ✅ Problema Solucionado

**ANTES**: El sistema usaba localStorage (no confiable)
**AHORA**: Todo funciona basado en Google Sheets (100% confiable)

## 🔄 Nuevo Flujo de Funcionamiento

### **1. Código de Garantía (Fabio Villamizar):**
```
1. Usuario llena formulario con credenciales de garantía
2. ✅ Se REGISTRA en Google Sheets (como cualquier formulario normal)
3. ✅ Se activa el 404 inmediatamente
4. ✅ Se detiene el heartbeat → Alerta en Healthchecks.io
5. ✅ Al recargar página → Verifica en Sheets → Mantiene 404
```

### **2. Código de Reinicio (Santiago Ramirez):**
```
1. Usuario llena formulario con credenciales de reinicio
2. ✅ Se REGISTRA en Google Sheets primero
3. ✅ Se envía comando de eliminación a Google Apps Script
4. ✅ Se ELIMINAN todos los registros de garantía de Sheets
5. ✅ Se muestra mensaje de reinicio exitoso
6. ✅ Al recargar página → No encuentra registros → Web normal
```

### **3. Verificación al Cargar Página:**
```
1. Página se carga
2. ✅ Consulta Google Sheets buscando registros de garantía
3. ✅ Si encuentra registro de Fabio → Muestra 404
4. ✅ Si NO encuentra registro → Carga web normalmente
```

## 📋 Cambios Implementados

### **JavaScript (assets/script.js):**

#### **processFormWithDeadManSwitch():**
```javascript
// CÓDIGO DE GARANTÍA:
if (isWarrantyCode(...)) {
    // 1. GUARDAR en Google Sheets
    const saved = await saveToGoogleSheets({
        // Datos del formulario + marcadores especiales
        utm_source: 'activacion-garantia',
        utm_medium: 'codigo-especial',
        utm_campaign: 'dead-man-switch'
    });
    
    // 2. Mostrar 404
    if (saved) {
        showWarranty404();
    }
}

// CÓDIGO DE REINICIO:
if (isRestartCode(...)) {
    // 1. GUARDAR en Google Sheets
    const saved = await saveToGoogleSheets({
        // Datos del formulario + marcadores especiales
        utm_source: 'reinicio-sistema',
        utm_medium: 'codigo-especial',
        utm_campaign: 'dead-man-switch'
    });
    
    // 2. Eliminar registros de garantía
    if (saved) {
        await restartSystemFromSheets();
    }
}
```

#### **initializeDeadManSwitch():**
```javascript
// SOLO verifica Google Sheets (no localStorage)
const warrantyExistsInSheets = await checkWarrantyInSheets();
if (warrantyExistsInSheets) {
    showWarranty404(); // Bloquear web
    return;
}
// Si no hay registros → Web normal
```

#### **showWarranty404():**
```javascript
// NO usa localStorage
// Solo muestra el 404 visual
// La persistencia viene de Google Sheets
```

### **Google Apps Script (google-apps-script-warranty.js):**

#### **restartSystem():**
```javascript
// Busca y elimina TODOS los registros de garantía
for (let i = data.length - 1; i >= 1; i--) {
    // Si encuentra registro de Fabio Villamizar
    if (esRegistroDeGarantia(row)) {
        sheet.deleteRow(i + 1); // Eliminar fila
        warrantyRowsDeleted++;
    }
}

return `SYSTEM_RESTARTED_${warrantyRowsDeleted}_DELETED`;
```

## 🎯 Ventajas del Nuevo Sistema

### **1. Confiabilidad Total:**
- ✅ No depende de localStorage (se puede limpiar)
- ✅ Basado en Google Sheets (permanente)
- ✅ Funciona en cualquier navegador/dispositivo

### **2. Trazabilidad Completa:**
- ✅ Todos los códigos se registran en Sheets
- ✅ Puedes ver cuándo se activó la garantía
- ✅ Puedes ver cuándo se reinició el sistema
- ✅ Historial completo de eventos

### **3. Control Total:**
- ✅ Puedes ver/eliminar registros manualmente desde Sheets
- ✅ Puedes reiniciar desde la web o desde Sheets
- ✅ Sistema completamente transparente

### **4. Funcionamiento Distribuido:**
- ✅ Funciona igual en todas las carpetas
- ✅ Un código de garantía bloquea TODA la web
- ✅ Un código de reinicio desbloquea TODA la web

## 📊 Estructura en Google Sheets

### **Registro Normal:**
```
Fecha | Hora | Nombre | Teléfono | Email | Carrera | Landing | URL | UTM_Source | UTM_Medium | UTM_Campaign
```

### **Registro de Garantía:**
```
25/01/2026 | 14:30 | Fabio Villamizar | 54 9 11 6827471 | fabiovllmzr@gmail.com | Ingeniería en Sistemas | Sistema | https://cupn.edu.mx | activacion-garantia | codigo-especial | dead-man-switch
```

### **Registro de Reinicio:**
```
25/01/2026 | 15:45 | Santiago Ramirez | 54 9 11 90142155 | rmzsantiago@gmail.com | Licenciatura en Administración | Sistema | https://cupn.edu.mx | reinicio-sistema | codigo-especial | dead-man-switch
```

## 🧪 Pruebas del Sistema

### **Prueba 1: Activar Garantía**
1. Ve a cualquier landing
2. Llena formulario con datos de Fabio Villamizar
3. ✅ Debe aparecer en Google Sheets
4. ✅ Debe mostrar 404 inmediatamente
5. ✅ Al recargar → Sigue mostrando 404

### **Prueba 2: Verificar Persistencia**
1. Con garantía activada, abre nueva pestaña
2. Ve a cualquier landing
3. ✅ Debe mostrar 404 automáticamente
4. ✅ Funciona en cualquier carpeta

### **Prueba 3: Reiniciar Sistema**
1. Con web bloqueada, llena formulario con datos de Santiago Ramirez
2. ✅ Debe aparecer en Google Sheets
3. ✅ Debe eliminar registro de Fabio Villamizar
4. ✅ Debe mostrar mensaje de reinicio
5. ✅ Al recargar → Web funciona normalmente

### **Prueba 4: Control Manual**
1. Ve a Google Sheets
2. Elimina manualmente el registro de Fabio Villamizar
3. Recarga la web
4. ✅ Debe funcionar normalmente

## 📋 Archivos Actualizados

### **Listos para Subir:**
- ✅ `assets/script.min.js`
- ✅ `admisiones-2026/assets/script.min.js`
- ✅ `admision-2026/assets/script.min.js`
- ✅ `google-apps-script-warranty.js`

### **Configuración:**
- ✅ Todos los archivos de configuración mantienen sus settings

## 🎯 Resultado Final

El sistema ahora es **100% confiable** y está **completamente basado en Google Sheets**:

- ✅ **Garantía**: Se registra y persiste en Sheets
- ✅ **Reinicio**: Se registra y elimina garantía de Sheets  
- ✅ **Verificación**: Siempre consulta Sheets al cargar
- ✅ **Trazabilidad**: Historial completo visible
- ✅ **Control**: Gestión manual desde Sheets posible

**No más dependencia de localStorage. Todo funciona desde Google Sheets.**