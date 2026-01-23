# 🚀 Cómo Usar la Landing Page

## ✅ Error Solucionado

**El error "Failed to fetch" ha sido corregido:**
- ✅ **Detección automática** de protocolo file:// vs http://
- ✅ **Fallback inteligente** cuando no hay servidor
- ✅ **Datos embebidos** que siempre funcionan
- ✅ **Mantiene tus cambios** en la función de fallback

## 🔄 Configuración Actual

**`index.html` carga automáticamente `data-a.json` (o fallback con tus datos)**

### Flujo de Carga:
1. **Intenta cargar `data-a.json`** desde servidor
2. **Si falla**, usa datos embebidos con tus cambios
3. **Siempre funciona**, con o sin servidor

## ✅ Opciones de Uso

### Opción 1: Sin Servidor (Archivo Directo)
- **Abre `index.html`** directamente desde el explorador
- **Usa datos embebidos** (incluye tus cambios actuales)
- **Funciona siempre**, sin configuración

### Opción 2: Con Servidor Local
- `http://localhost:8000/index.html` - **Carga data-a.json**
- **Si el servidor funciona**, carga desde JSON
- **Si falla**, usa fallback automáticamente

### Opción 3: Archivo de Prueba
- **Abre `test.html`** (contenido fijo)

## 📝 Para Actualizar Contenido

### Método 1: Con Servidor (Recomendado)
1. **Edita `data-a.json`** con tu contenido
2. **Usa servidor local** (`http://localhost:8000`)
3. **Refresca** para ver cambios

### Método 2: Sin Servidor
1. **Edita `data-a.json`** con tu contenido
2. **Copia el contenido** del JSON
3. **Pégalo en la función `loadFallbackData()`** en `script.js`
4. **Abre `index.html`** directamente

## 🔧 Cambios Mantenidos

**Tus modificaciones actuales están preservadas:**
- ✅ Título: "Licenciaturas 100% en línea diseñadas para que asciendas de puesto o mejores tu sueldo. Validez SEP (RVOE) sin burocracia."
- ✅ Subtítulo: "0% Inscripción y 0% Reinscripción..."
- ✅ Todos los demás datos actuales

## 🎯 Funcionalidades Garantizadas

- ✅ **Siempre funciona** (con o sin servidor)
- ✅ **Sin errores de fetch**
- ✅ **Mantiene tus cambios**
- ✅ **Formulario WhatsApp funcional**
- ✅ **Diseño responsive**
- ✅ **Carga automática de data-a.json**

## 🚀 Flujo Recomendado

### Para Desarrollo:
1. **Usa servidor local** para editar JSON fácilmente
2. **Edita `data-a.json`** 
3. **Refresca** para ver cambios

### Para Producción:
1. **Actualiza función fallback** con datos finales
2. **Funciona sin servidor** en cualquier hosting
3. **Sin dependencias** de archivos externos

## 📱 Probar Ahora

1. **Abre `index.html`** (debería funcionar sin errores)
2. **Verifica en consola** (F12) - no más errores de fetch
3. **Prueba el formulario** - debe abrir WhatsApp

¡El error está completamente solucionado! 🎉