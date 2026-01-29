# 🔒 Dead Man's Switch - Sistema de Garantía Actualizado

## ✅ Cambios Implementados

### 1. **Nuevas Credenciales de Garantía**
```
Nombre: Fabio Villamizar
Teléfono: 5499209078
Email: fabiovllmzr@gmail.com
Carrera: Ingeniería en Sistemas
```

### 2. **Sistema de Verificación Mejorado**
- ✅ Verifica en Google Sheets si existe el registro de garantía
- ✅ Estado persistente usando localStorage
- ✅ Bloqueo permanente de la web
- ✅ Verificación al cargar la página

## 🚀 Cómo Funciona

### Al Cargar la Página:
1. **Verifica localStorage** - Si ya está activada la garantía → Muestra 404
2. **Verifica Google Sheets** - Si existe el registro → Muestra 404
3. **Si no hay garantía** → Carga la web normalmente

### Al Enviar Formulario:
1. **Verifica credenciales** - Si coinciden con Fabio Villamizar → Activa garantía
2. **Guarda en localStorage** - Para persistencia
3. **Muestra 404 permanente** - Bloquea la web
4. **Para heartbeat** - Activa alerta en Healthchecks.io

## 📋 Archivos Actualizados

### JavaScript (todos sincronizados):
- `assets/script.js` ✅
- `assets/script.min.js` ✅
- `admisiones-2026/assets/script.min.js` ✅
- `admision-2026/assets/script.min.js` ✅

### Google Apps Script:
- `google-apps-script-warranty.js` ✅ (nuevo archivo)

## 🔧 Configuración Requerida

### 1. Actualizar Google Apps Script
Copia el contenido de `google-apps-script-warranty.js` a tu Google Apps Script:

1. Ve a [Google Apps Script](https://script.google.com/)
2. Abre tu proyecto existente
3. **Reemplaza todo el código** con el contenido del archivo `google-apps-script-warranty.js`
4. **Cambia `SHEET_ID`** por el ID real de tu hoja de cálculo
5. **Guarda y despliega** nuevamente

### 2. Subir Archivos Actualizados
Sube estos archivos a tu servidor:
```
assets/script.min.js
admisiones-2026/assets/script.min.js
admision-2026/assets/script.min.js
```

## 🧪 Cómo Probar

### Prueba 1: Verificación Normal
1. Ve a `https://cupn.edu.mx/admisiones-2026/`
2. La web debe cargar normalmente
3. En consola debe aparecer: "✅ No se encontró registro de garantía"

### Prueba 2: Activar Garantía
1. Llena el formulario con:
   - **Nombre**: Fabio Villamizar
   - **Teléfono**: 5499209078
   - **Email**: fabiovllmzr@gmail.com
   - **Carrera**: Ingeniería en Sistemas
2. Envía el formulario
3. Debe aparecer el 404 inmediatamente

### Prueba 3: Persistencia
1. Después de activar la garantía, recarga la página
2. Debe mostrar 404 automáticamente
3. Incluso en pestañas nuevas debe mostrar 404

## 🔓 Cómo Desactivar (Solo para Testing)

### Método 1: localStorage (Temporal)
```javascript
// En consola del navegador:
localStorage.removeItem('warranty_activated');
localStorage.removeItem('warranty_timestamp');
location.reload();
```

### Método 2: Google Sheets (Permanente)
1. Ve a tu hoja de Google Sheets
2. Elimina la fila con los datos de Fabio Villamizar
3. Recarga la página

## 🚨 Alertas y Monitoreo

### Healthchecks.io
- **URL**: `https://hc-ping.com/ddd271dc-e694-4bf7-8e84-b30073935fa9`
- **Cuando se activa la garantía**: Se detiene el heartbeat
- **Resultado**: Recibes alerta por email/SMS

### Estados del Sistema:
- ✅ **Normal**: Heartbeat cada formulario enviado
- 🔒 **Garantía Activada**: No más heartbeats → Alerta
- 📧 **Notificación**: Email/SMS automático

## 🔍 Logs y Diagnóstico

### En Consola del Navegador:
```
🔍 Verificando registro de garantía en Google Sheets...
📋 Respuesta de verificación de garantía: WARRANTY_NOT_FOUND
✅ Dead Man's Switch inicializado correctamente
```

### Si se activa la garantía:
```
🚨 CÓDIGO DE GARANTÍA DETECTADO
🔒 CÓDIGO DE GARANTÍA ACTIVADO - Mostrando 404 permanente
⏹️ NO enviando heartbeat - Dead Man's Switch activado
```

## ⚠️ Importante

1. **Backup**: Haz backup de tu Google Apps Script antes de actualizar
2. **Testing**: Prueba primero en un entorno de desarrollo
3. **Monitoreo**: Configura las alertas de Healthchecks.io
4. **Acceso**: Solo Fabio Villamizar puede activar la garantía

El sistema ahora es **completamente automático y persistente**. Una vez activado, la web permanecerá bloqueada hasta que se elimine manualmente el registro de Google Sheets.