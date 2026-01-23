# 🔧 Solución de Problemas en Vercel

## ❌ Error: "Running vercel build"

El mensaje que estás viendo **NO es un error**, es parte del proceso normal de Vercel. Sin embargo, aquí están las soluciones para asegurar que el deploy funcione correctamente.

## ✅ Pasos para Solucionar

### 1. **Verificar Variables de Entorno**

En el dashboard de Vercel:
1. Ve a tu proyecto → **Settings** → **Environment Variables**
2. Añade estas variables **OBLIGATORIAS**:

```
APPS_SCRIPT_URL = https://script.google.com/macros/s/TU_SCRIPT_ID/exec
WHATSAPP_NUMBER = 1234567890
DEBUG_MODE = false
```

### 2. **Verificar Archivos Necesarios**

Asegúrate de que estos archivos estén en tu repositorio:
- ✅ `package.json` (creado automáticamente)
- ✅ `vercel.json` (configuración de Vercel)
- ✅ `api/config.js` (función serverless)
- ✅ `.vercelignore` (archivos a ignorar)

### 3. **Forzar Nuevo Deploy**

Si el build falla:
```bash
# Opción 1: Desde el dashboard
# Ve a Deployments → Click en "Redeploy"

# Opción 2: Desde Git
git add .
git commit -m "Fix Vercel build configuration"
git push origin main
```

### 4. **Verificar Logs de Build**

En Vercel Dashboard:
1. Ve a **Deployments**
2. Click en el deployment que falló
3. Revisa la pestaña **Build Logs**
4. Busca errores específicos

## 🔍 Errores Comunes y Soluciones

### Error: "No Build Command"
**Solución**: El `package.json` ya incluye un build script básico.

### Error: "Function timeout"
**Solución**: La función API es muy simple, no debería dar timeout.

### Error: "Missing environment variables"
**Solución**: Configura `APPS_SCRIPT_URL` en las variables de entorno.

### Error: "404 on /env-config.js"
**Solución**: El `vercel.json` ya incluye la ruta correcta.

## 🚀 Verificación Post-Deploy

Una vez que el deploy sea exitoso:

### 1. **Probar la Configuración**
```javascript
// En la consola del navegador de tu sitio desplegado
console.log(window.CONFIG);
// Debe mostrar tu configuración
```

### 2. **Probar el Formulario**
1. Llena todos los campos
2. Envía el formulario
3. Verifica que llegue a Google Sheets
4. Confirma redirección a WhatsApp

### 3. **Verificar Meta Tags**
```javascript
// En la consola del navegador
console.log(document.title);
console.log(document.querySelector('meta[name="description"]').content);
```

## 📞 Si Persisten los Problemas

### Opción 1: Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde tu directorio
vercel

# Seguir instrucciones
```

### Opción 2: Verificar Configuración
1. **Revisa el repositorio**: Asegúrate de que todos los archivos estén subidos
2. **Verifica las variables**: `APPS_SCRIPT_URL` debe estar configurada
3. **Prueba localmente**: Usa `vercel dev` para probar en local

### Opción 3: Logs Detallados
En Vercel Dashboard → Functions → Ver logs de `/api/config`

## 🎯 Configuración Final Correcta

Tu proyecto debería tener esta estructura:
```
├── api/
│   └── config.js          # ✅ Función serverless
├── assets/
│   ├── script.js          # ✅ JavaScript principal
│   ├── styles.css         # ✅ Estilos
│   └── images/            # ✅ Imágenes
├── landing-a/
│   └── index.html         # ✅ Landing A
├── landing-b/
│   └── index.html         # ✅ Landing B
├── data-a.json            # ✅ Datos Landing A
├── data-b.json            # ✅ Datos Landing B
├── index.html             # ✅ Página principal
├── package.json           # ✅ Configuración Node.js
├── vercel.json            # ✅ Configuración Vercel
└── .vercelignore          # ✅ Archivos a ignorar
```

## 🔄 Proceso Normal de Vercel

Lo que estás viendo es **NORMAL**:
```
Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 2 cores, 8 GB
Cloning github.com/tu-usuario/tu-repo (Branch: main, Commit: abc123)
Previous build caches not available.
Cloning completed: 374.000ms
Running "vercel build"
```

Después debería continuar con:
```
✅ Build completed successfully
✅ Deployment ready
```

Si no ves esos mensajes de éxito, entonces sí hay un problema específico que necesitamos revisar en los logs.

## 📧 Información para Soporte

Si necesitas ayuda adicional, proporciona:
1. **URL del repositorio**
2. **Logs completos del build** (no solo las primeras líneas)
3. **Variables de entorno configuradas** (sin mostrar valores sensibles)
4. **Mensaje de error específico** (si lo hay)

¡El deploy debería funcionar correctamente con esta configuración! 🚀