# 🚀 Despliegue en Vercel

Esta guía te ayudará a desplegar tu landing page educativa en Vercel de forma segura y optimizada.

## 📋 Requisitos Previos

1. **Cuenta en Vercel**: [Regístrate gratis](https://vercel.com)
2. **Repositorio Git**: GitHub, GitLab o Bitbucket
3. **Google Apps Script**: URL de tu script desplegado

## 🔧 Configuración Paso a Paso

### 1. Preparar el Repositorio

```bash
# Asegúrate de que estos archivos estén en tu repo:
├── vercel.json           # ✅ Configuración de Vercel
├── api/config.js         # ✅ Función serverless
├── .env.example          # ✅ Ejemplo de variables
├── .gitignore           # ✅ Protege archivos sensibles
└── [resto de archivos]   # ✅ Tu landing page
```

### 2. Conectar con Vercel

#### Opción A: Dashboard Web
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en "New Project"
3. Conecta tu repositorio Git
4. Vercel detectará automáticamente la configuración

#### Opción B: CLI de Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar desde tu directorio
vercel

# Seguir las instrucciones interactivas
```

### 3. Configurar Variables de Entorno

En el dashboard de Vercel:

1. **Ve a tu proyecto** → Settings → Environment Variables
2. **Añade estas variables**:

```
APPS_SCRIPT_URL = https://script.google.com/macros/s/TU_SCRIPT_ID/exec
WHATSAPP_NUMBER = 1234567890
API_TIMEOUT = 10000
DEBUG_MODE = false
```

#### Variables Críticas:
- **`APPS_SCRIPT_URL`**: ⚠️ **OBLIGATORIA** - URL de tu Google Apps Script
- **`WHATSAPP_NUMBER`**: Número de WhatsApp (solo números)
- **`API_TIMEOUT`**: Timeout en milisegundos (opcional)
- **`DEBUG_MODE`**: `true` para desarrollo, `false` para producción

### 4. Configurar por Entorno

Vercel permite diferentes variables por entorno:

- **Development**: Para preview branches
- **Preview**: Para pull requests
- **Production**: Para la rama principal

```
Variable: APPS_SCRIPT_URL
Value: https://script.google.com/macros/s/PROD_SCRIPT_ID/exec
Environment: Production

Variable: APPS_SCRIPT_URL  
Value: https://script.google.com/macros/s/DEV_SCRIPT_ID/exec
Environment: Development
```

## 🌐 Dominios Personalizados

### Configurar Dominio Propio

1. **En Vercel Dashboard**: Settings → Domains
2. **Añadir dominio**: `tudominio.com`
3. **Configurar DNS**: Apuntar a Vercel
4. **SSL automático**: Vercel lo configura automáticamente

### Configuración DNS
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔍 Verificación del Despliegue

### 1. Comprobar Variables
Abre la consola del navegador en tu sitio desplegado:
```javascript
// Debe mostrar tu configuración
console.log(window.CONFIG);

// Verificar que la URL esté cargada
console.log(window.CONFIG.APPS_SCRIPT_URL);
```

### 2. Probar Formulario
1. Llena el formulario de contacto
2. Verifica que se envíe a Google Sheets
3. Confirma redirección a WhatsApp

### 3. Revisar Logs
En Vercel Dashboard → Functions → Ver logs de la función `/api/config`

## 🚀 Comandos Útiles

```bash
# Desplegar a producción
vercel --prod

# Ver logs en tiempo real
vercel logs

# Listar despliegues
vercel ls

# Configurar variables desde CLI
vercel env add APPS_SCRIPT_URL production
```

## 🔧 Troubleshooting

### Error: "APPS_SCRIPT_URL no configurada"
```bash
# Verificar variables en Vercel
vercel env ls

# Añadir variable faltante
vercel env add APPS_SCRIPT_URL
```

### Error: "Function timeout"
- Aumenta `API_TIMEOUT` en las variables de entorno
- Verifica que Google Apps Script responda rápido

### Error: "Failed to fetch"
- Confirma que `APPS_SCRIPT_URL` sea correcta
- Verifica que el script esté desplegado como "web app"
- Revisa permisos del Google Apps Script

## 📊 Optimizaciones de Vercel

### Automáticas:
- ✅ **CDN Global**: Contenido servido desde edge locations
- ✅ **Compresión**: Gzip/Brotli automático
- ✅ **SSL**: Certificados automáticos
- ✅ **Cache**: Headers optimizados
- ✅ **Minificación**: CSS/JS automático

### Configuradas:
- ✅ **Headers de Seguridad**: Via `vercel.json`
- ✅ **Redirects**: URLs limpias
- ✅ **Functions**: API serverless para config

## 🔄 Actualizaciones Automáticas

Vercel se actualiza automáticamente cuando:
- Haces push a la rama principal (producción)
- Abres un pull request (preview)
- Cambias variables de entorno (redeploy)

## 💡 Mejores Prácticas

1. **Usa Preview Deployments**: Para probar cambios
2. **Configura Branch Protection**: En GitHub/GitLab
3. **Monitorea Analytics**: Vercel Analytics incluido
4. **Optimiza Imágenes**: Usa Vercel Image Optimization
5. **Revisa Logs**: Regularmente para detectar errores

## 🎯 URLs Finales

Después del despliegue tendrás:
- **Producción**: `https://tu-proyecto.vercel.app`
- **Dominio personalizado**: `https://tudominio.com`
- **API Config**: `https://tudominio.com/env-config.js`

¡Tu landing page estará lista y optimizada en Vercel! 🚀