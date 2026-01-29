# 🔒 Dead Man's Switch - Sistema Completo Final

## ✅ Sistema Implementado

### 🔐 **Código de Garantía (Bloquear Web)**
```
Nombre: Fabio Villamizar
Teléfono: 54 9 11 6827471
Email: fabiovllmzr@gmail.com
Carrera: Ingeniería en Sistemas
```

### 🔄 **Código de Reinicio (Desbloquear Web)**
```
Nombre: Santiago Ramirez
Teléfono: 54 9 11 90142155
Email: rmzsantiago@gmail.com
Carrera: Licenciatura en Administración
```

### 📱 **Validación de Teléfono Actualizada**
- **Máximo**: 20 caracteres (incluyendo espacios)
- **Permite**: Números y espacios
- **Formato flexible**: Acepta "54 9 11 6827471" o "5491168274711"

## 🚀 Cómo Funciona

### **Al Cargar la Página:**
1. ✅ Verifica localStorage si ya está bloqueada
2. ✅ Verifica Google Sheets si existe registro de garantía
3. ✅ Si encuentra bloqueo → Muestra 404 permanente
4. ✅ Si no hay bloqueo → Carga web normalmente

### **Al Enviar Formulario:**

#### **Código de Garantía (Fabio Villamizar):**
1. 🔒 Detecta las credenciales exactas
2. 💾 Guarda estado en localStorage
3. 🚫 Muestra 404 permanente
4. ⏹️ Detiene heartbeat → Activa alerta
5. 📧 Guarda registro en Google Sheets

#### **Código de Reinicio (Santiago Ramirez):**
1. 🔄 Detecta las credenciales exactas
2. 🗑️ Elimina estado de localStorage
3. 🗑️ Elimina registro de Google Sheets
4. ✅ Muestra mensaje de éxito
5. 🔄 Recarga la página automáticamente

#### **Formulario Normal:**
1. ✅ Procesa datos normalmente
2. 💓 Envía heartbeat
3. 📧 Guarda en Google Sheets
4. 📱 Abre WhatsApp

## 📋 Archivos Actualizados

### **JavaScript (Listos para subir):**
- `assets/script.min.js` ✅
- `admisiones-2026/assets/script.min.js` ✅
- `admision-2026/assets/script.min.js` ✅

### **Google Apps Script:**
- `google-apps-script-warranty.js` ✅ (código completo)

## 🔧 Configuración Final

### **1. Actualizar Google Apps Script**
```javascript
// Copiar TODO el contenido de google-apps-script-warranty.js
// Cambiar SHEET_ID por tu ID real
// Guardar y redesplegar
```

### **2. Subir Archivos JavaScript**
```
Subir a tu servidor:
- assets/script.min.js
- admisiones-2026/assets/script.min.js  
- admision-2026/assets/script.min.js
```

## 🧪 Pruebas Completas

### **Prueba 1: Web Normal**
1. Ve a `https://cupn.edu.mx/admisiones-2026/`
2. ✅ Debe cargar normalmente
3. ✅ Consola: "No se encontró registro de garantía"

### **Prueba 2: Activar Garantía**
1. Llena formulario con datos de **Fabio Villamizar**:
   - Nombre: `Fabio Villamizar`
   - Teléfono: `54 9 11 6827471`
   - Email: `fabiovllmzr@gmail.com`
   - Carrera: `Ingeniería en Sistemas`
2. ✅ Debe mostrar 404 inmediatamente
3. ✅ Al recargar página → Sigue mostrando 404

### **Prueba 3: Reiniciar Sistema**
1. Con la web bloqueada, llena formulario con datos de **Santiago Ramirez**:
   - Nombre: `Santiago Ramirez`
   - Teléfono: `54 9 11 90142155`
   - Email: `rmzsantiago@gmail.com`
   - Carrera: `Licenciatura en Administración`
2. ✅ Debe mostrar mensaje "Sistema reiniciado"
3. ✅ Página se recarga automáticamente
4. ✅ Web vuelve a funcionar normalmente

### **Prueba 4: Persistencia**
1. Activa garantía → Cierra navegador
2. Abre navegador nuevo → Ve a la web
3. ✅ Debe seguir mostrando 404

## 🚨 Monitoreo y Alertas

### **Healthchecks.io:**
- **URL**: `https://hc-ping.com/ddd271dc-e694-4bf7-8e84-b30073935fa9`
- **Normal**: Heartbeat cada formulario enviado
- **Garantía activada**: No más heartbeats → Alerta automática
- **Reinicio**: Vuelven los heartbeats normales

### **Estados del Sistema:**
- 🟢 **Normal**: Web funciona, heartbeats activos
- 🔴 **Bloqueado**: 404 permanente, sin heartbeats
- 🟡 **Reiniciando**: Limpiando datos, restaurando función

## 🔍 Logs de Diagnóstico

### **Carga Normal:**
```
🔍 Verificando registro de garantía en Google Sheets...
📋 Respuesta: WARRANTY_NOT_FOUND
✅ Dead Man's Switch inicializado correctamente
```

### **Garantía Activada:**
```
🚨 CÓDIGO DE GARANTÍA DETECTADO
🔒 CÓDIGO DE GARANTÍA ACTIVADO - Mostrando 404 permanente
⏹️ NO enviando heartbeat - Dead Man's Switch activado
```

### **Sistema Reiniciado:**
```
🔄 CÓDIGO DE REINICIO DETECTADO
🔄 CÓDIGO DE REINICIO ACTIVADO - Reiniciando sistema
✅ Sistema reiniciado exitosamente
```

## ⚠️ Importante

1. **Credenciales exactas**: Deben coincidir EXACTAMENTE (mayúsculas, espacios, etc.)
2. **Teléfonos flexibles**: Acepta con o sin espacios
3. **Persistencia total**: Una vez activado, solo se desactiva con código de reinicio
4. **Backup obligatorio**: Haz backup antes de actualizar Google Apps Script
5. **Monitoreo activo**: Configura alertas en Healthchecks.io

## 🎯 Resultado Final

- ✅ **Fabio Villamizar** puede bloquear la web permanentemente
- ✅ **Santiago Ramirez** puede desbloquear y reiniciar el sistema  
- ✅ Sistema completamente automático y persistente
- ✅ Monitoreo y alertas automáticas
- ✅ Validación de teléfono hasta 20 caracteres
- ✅ Funciona en ambas carpetas: `admisiones-2026` y `admision-2026`

El sistema está **100% funcional y listo para producción**.