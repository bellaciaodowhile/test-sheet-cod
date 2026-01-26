# 🔧 Solución para Formulario en cupn.edu.mx

## Problema Identificado
El formulario no funciona en producción porque la configuración estaba preparada solo para desarrollo local.

## ✅ Archivos Actualizados

### 1. Configuración de Producción
He actualizado los archivos de configuración para que funcionen en `cupn.edu.mx`:

- `admisiones-2026/config.js` ✅
- `admision-2026/config.js` ✅

Ahora ambos archivos tienen la configuración correcta para producción.

### 2. Archivo de Diagnóstico
He creado `test-connection.html` que puedes subir para diagnosticar problemas.

## 🚀 Pasos para Solucionar

### Paso 1: Subir Archivos Actualizados
Sube estos archivos actualizados a tu servidor:
```
admisiones-2026/config.js
admision-2026/config.js
test-connection.html
```

### Paso 2: Verificar Google Apps Script
1. Ve a [Google Apps Script](https://script.google.com/)
2. Abre tu proyecto del script
3. Ve a **Implementar** > **Administrar implementaciones**
4. Verifica que la URL sea exactamente:
   ```
   https://script.google.com/macros/s/AKfycbyZb8ZZNE6DdWXkM8h7LlRhcjnkawFA34CK_HDezy2ZK55CdMQ9j21bhVtGnq0cby4z/exec
   ```

### Paso 3: Configurar Dominios Autorizados
En Google Apps Script, asegúrate de que estos dominios estén autorizados:
- `https://cupn.edu.mx`
- `https://www.cupn.edu.mx`

### Paso 4: Probar la Conexión
1. Sube `test-connection.html` a tu servidor
2. Ve a `https://cupn.edu.mx/test-connection.html`
3. Ejecuta las pruebas para diagnosticar el problema

## 🔍 Diagnóstico Rápido

### Opción A: Usar el archivo de test
```
https://cupn.edu.mx/test-connection.html
```

### Opción B: Verificar en consola del navegador
1. Ve a `https://cupn.edu.mx/admisiones-2026/`
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **Console**
4. Busca estos mensajes:
   - ✅ "CONFIG disponible, inicializando página..."
   - ✅ "Datos cargados desde JSON"
   - ❌ "HEALTHCHECK_URL no configurada" (esto ya no debería aparecer)

## 🛠️ Soluciones Comunes

### Si el formulario sigue sin funcionar:

1. **Problema de CORS**
   - Verifica que la nueva URI esté en Google Apps Script
   - Asegúrate de que el script esté desplegado como "Web app"

2. **Problema de configuración**
   - Verifica que `config.js` se cargue antes que `script.min.js`
   - Revisa la consola del navegador para errores

3. **Problema de Google Sheets**
   - Verifica que el Google Apps Script tenga permisos
   - Asegúrate de que la hoja de cálculo exista y sea accesible

## 📞 Contacto de Emergencia
Si el problema persiste, puedes:
1. Revisar los logs en `test-connection.html`
2. Verificar la consola del navegador
3. Comprobar que Google Apps Script esté funcionando

## 🔄 Próximos Pasos
1. Sube los archivos actualizados
2. Prueba con `test-connection.html`
3. Verifica que el formulario funcione en ambas carpetas:
   - `https://cupn.edu.mx/admisiones-2026/`
   - `https://cupn.edu.mx/admision-2026/`