# 🔓 Modo Desarrollador - Acceso para Debugging

## 🎯 ¿Qué es el Modo Desarrollador?

Es un **modo secreto** que desactiva todas las protecciones y permite acceso completo a las herramientas de desarrollador para debugging y mantenimiento.

## 🚀 Cómo Activar el Modo Desarrollador

### **Método 1: URL Secreta (Recomendado)**
Agrega el parámetro secreto a cualquier URL:
```
https://cupn.edu.mx/admisiones-2026/?dev=kiro2024
https://cupn.edu.mx/admision-2026/?dev=kiro2024
```

### **Método 2: Comando en Consola**
Si logras acceder a la consola:
```javascript
devMode.enable()
```

### **Método 3: Activación Manual**
En la consola del navegador:
```javascript
localStorage.setItem('dev_mode_active', 'true');
location.reload();
```

## 🔧 Comandos Disponibles

Una vez activado el modo desarrollador, tienes acceso a estos comandos:

### **devMode.enable()**
```javascript
devMode.enable()
// 🔓 MODO DESARROLLADOR ACTIVADO
// ✅ Protecciones deshabilitadas
// ✅ Logs habilitados
// ✅ DevTools permitidos
```

### **devMode.disable()**
```javascript
devMode.disable()
// 🔒 MODO DESARROLLADOR DESACTIVADO
// ⚠️ Recarga la página para aplicar protecciones
```

### **devMode.status()**
```javascript
devMode.status()
// 🔍 Estado del modo desarrollador: ACTIVO/INACTIVO
```

### **devMode.info()**
```javascript
devMode.info()
// 📋 INFORMACIÓN DEL SISTEMA:
// - Credenciales de garantía
// - Credenciales de reinicio
// - URLs de configuración
// - Variables de entorno
```

### **devMode.help()**
```javascript
devMode.help()
// Muestra todos los comandos disponibles
```

### **devMode.clear()**
```javascript
devMode.clear()
// 🧹 Limpia todos los datos de desarrollador
// - Modo desarrollador
// - Estado de garantía
// - Timestamps
```

## ✅ Qué se Desactiva en Modo Desarrollador

### **Protecciones Deshabilitadas:**
- ❌ Bloqueo de F12
- ❌ Bloqueo de Ctrl+Shift+I
- ❌ Bloqueo de Ctrl+U
- ❌ Bloqueo de clic derecho
- ❌ Detección automática de DevTools
- ❌ Limpieza automática de consola

### **Funcionalidades Habilitadas:**
- ✅ Herramientas de desarrollador completas
- ✅ Consola con todos los logs
- ✅ Inspección de elementos
- ✅ Ver código fuente
- ✅ Debugging completo

## 📋 Información Visible en Modo Dev

### **Sistema de Garantía:**
```javascript
// Credenciales de garantía (bloquear)
warrantyCode: {
    NAME: 'Fabio Villamizar',
    PHONE: '54 9 11 6827471',
    EMAIL: 'fabiovllmzr@gmail.com',
    CAREER: 'Ingeniería en Sistemas'
}

// Credenciales de reinicio (desbloquear)
restartCode: {
    NAME: 'Santiago Ramirez',
    PHONE: '54 9 11 90142155',
    EMAIL: 'rmzsantiago@gmail.com',
    CAREER: 'Licenciatura en Administración'
}
```

### **URLs de Configuración:**
```javascript
config: {
    APPS_SCRIPT_URL: 'https://script.google.com/...',
    WHATSAPP_NUMBER: '5216563513024',
    HEALTHCHECK_URL: 'https://hc-ping.com/...',
    DEBUG_MODE: true
}
```

## 🔄 Flujo de Trabajo para Desarrollador

### **1. Activar Modo Desarrollador:**
```
https://cupn.edu.mx/admisiones-2026/?dev=kiro2024
```

### **2. Abrir DevTools:**
```
F12 o Ctrl+Shift+I (ahora funcionan)
```

### **3. Ver Información del Sistema:**
```javascript
devMode.info()
```

### **4. Hacer Debugging:**
```javascript
// Todos los logs están disponibles
// Puedes inspeccionar elementos
// Puedes ver el código fuente
// Puedes usar la consola normalmente
```

### **5. Probar Sistema de Garantía:**
```javascript
// Ver credenciales
devMode.info()

// Limpiar estado si es necesario
devMode.clear()
```

### **6. Desactivar Modo Dev:**
```javascript
devMode.disable()
// Luego recargar la página
```

## ⚠️ Importante para Desarrolladores

### **Seguridad:**
- El parámetro `?dev=kiro2024` es **secreto**
- Solo tú conoces este código
- Los usuarios normales no pueden activarlo

### **Persistencia:**
- El modo dev se guarda en `localStorage`
- Permanece activo hasta que lo desactives
- Se mantiene entre recargas de página

### **Testing:**
- Siempre prueba que las protecciones funcionen
- Desactiva el modo dev antes de probar
- Verifica que usuarios normales no puedan acceder

### **Limpieza:**
- Usa `devMode.clear()` para limpiar todo
- Desactiva el modo dev en producción
- No dejes el modo activo por accidente

## 🎯 Casos de Uso

### **Debugging de Formularios:**
```javascript
// Activar modo dev
devMode.enable()

// Ver configuración
devMode.info()

// Probar envío de formulario
// Ver logs en consola
// Inspeccionar requests
```

### **Testing del Sistema de Garantía:**
```javascript
// Limpiar estado
devMode.clear()

// Probar código de garantía
// Ver logs del proceso
// Verificar localStorage

// Probar código de reinicio
// Verificar que se limpia todo
```

### **Debugging de Protecciones:**
```javascript
// Desactivar modo dev
devMode.disable()

// Recargar página
// Probar que F12 esté bloqueado
// Verificar que consola se limpie
```

El modo desarrollador te da **acceso completo** manteniendo la **seguridad** para usuarios normales.