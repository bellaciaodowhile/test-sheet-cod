# 🔒 Dead Man's Switch - Healthchecks.io

Sistema de seguridad implementado usando Healthchecks.io para detectar códigos de garantía específicos.

## 🎯 ¿Cómo Funciona?

El sistema funciona como un **"interruptor de hombre muerto"**:

1. **Funcionamiento Normal**: Cada vez que alguien envía el formulario normalmente, se envía un "heartbeat" a Healthchecks.io
2. **Código de Garantía**: Cuando se detecta una combinación específica de datos, NO se envía el heartbeat
3. **Activación**: Healthchecks.io detecta la falta de heartbeat y puede activar alertas o webhooks
4. **Respuesta**: Se muestra una pantalla 404 inmediatamente al usuario

## ⚙️ Configuración Actual

### Código de Garantía:
- **Teléfono**: Exactamente 9 caracteres
- **Email**: `garantia@cupn.edu.mx`
- **Carrera**: `Ingeniería en Sistemas`

### Respuesta:
- Pantalla 404 con fondo blanco
- Mensaje "Page Not Found"
- Estilo minimalista tipo terminal

## 🚀 Pasos para Configurar Healthchecks.io

### PASO 1: Crear Cuenta
1. Ve a [healthchecks.io](https://healthchecks.io)
2. Haz clic en "Sign Up"
3. Crea una cuenta gratuita (plan Hobbyist)

### PASO 2: Crear Check
1. En el dashboard, haz clic en "Add Check"
2. Configura:
   - **Name**: `CUPN Dead Man Switch`
   - **Period**: `1 hour` (o el tiempo que prefieras)
   - **Grace Time**: `5 minutes`
   - **Description**: `Sistema de seguridad para códigos de garantía`

### PASO 3: Obtener URL
1. Una vez creado el check, verás una URL como:
   ```
   https://hc-ping.com/12345678-1234-1234-1234-123456789abc
   ```
2. Copia esta URL completa

### PASO 4: Configurar Variables de Entorno

#### Para Vercel:
1. Ve a tu proyecto en vercel.com
2. Settings → Environment Variables
3. Añade:
   ```
   HEALTHCHECK_URL = https://hc-ping.com/TU_UUID_AQUI
   ```

#### Para Desarrollo Local:
1. Edita `config.js` línea 18:
   ```javascript
   HEALTHCHECK_URL: 'https://hc-ping.com/TU_UUID_AQUI',
   ```

### PASO 5: Configurar Alertas (Opcional)
1. En Healthchecks.io, ve a "Integrations"
2. Configura email, Slack, webhook, etc.
3. Estas alertas se activarán cuando NO llegue el heartbeat

## 🧪 Cómo Probar

### Prueba Normal:
1. Llena el formulario con datos normales
2. Verifica en la consola: `✅ Heartbeat enviado exitosamente`
3. En Healthchecks.io verás el check como "Up" (verde)

### Prueba Código de Garantía:
1. Llena el formulario con:
   - **Teléfono**: `123456789` (9 dígitos)
   - **Email**: `garantia@cupn.edu.mx`
   - **Carrera**: `Ingeniería en Sistemas`
2. Verifica en la consola: `🔒 CÓDIGO DE GARANTÍA DETECTADO`
3. Debe aparecer la pantalla 404
4. En Healthchecks.io, después del tiempo configurado, el check pasará a "Down" (rojo)

## 🔧 Personalización

### Cambiar Código de Garantía:
Edita en `assets/script.js` líneas 1085-1089:
```javascript
WARRANTY_CODE: {
    PHONE_LENGTH: 9,
    EMAIL: 'tu-email@ejemplo.com',
    CAREER: 'Tu Carrera Específica'
}
```

### Cambiar Pantalla 404:
Edita la función `showWarranty404()` en `assets/script.js` línea 1120.

### Cambiar Tiempo de Heartbeat:
En Healthchecks.io, edita el check y cambia "Period" y "Grace Time".

## 📊 Monitoreo

### Logs en Consola:
- `💓 Enviando heartbeat a Healthchecks.io...`
- `✅ Heartbeat enviado exitosamente`
- `🔍 Verificando código de garantía:`
- `🔒 CÓDIGO DE GARANTÍA DETECTADO`

### Dashboard Healthchecks.io:
- **Verde (Up)**: Sistema funcionando normalmente
- **Amarillo (Late)**: Heartbeat retrasado
- **Rojo (Down)**: Código de garantía activado o sistema caído

## 🚨 Troubleshooting

### "HEALTHCHECK_URL no configurada":
- Verifica que la variable de entorno esté configurada
- En desarrollo, edita `config.js`
- En producción, configura en Vercel/hosting

### "Error enviando heartbeat":
- Verifica que la URL sea correcta
- Comprueba conexión a internet
- El sistema usa `mode: 'no-cors'` para evitar problemas de CORS

### El 404 no aparece:
- Verifica que los datos coincidan exactamente
- Revisa la consola para logs de verificación
- Asegúrate de que JavaScript esté habilitado

## 🔐 Seguridad

- La URL de Healthchecks.io debe mantenerse secreta
- Los códigos de garantía no son visibles en el frontend
- El sistema funciona sin exponer lógica sensible al cliente
- Usa HTTPS siempre para todas las comunicaciones

## 📈 Estadísticas

- **Plan Gratuito**: 20 checks, 100 log entries por check
- **Uptime**: 99.9% según Healthchecks.io
- **Latencia**: < 100ms para heartbeats
- **Retención**: Logs por 30 días en plan gratuito