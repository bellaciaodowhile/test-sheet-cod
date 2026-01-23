# Landing Page Educativa

Una landing page moderna y segura para instituciones educativas con integración a Google Sheets y WhatsApp.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para móviles y desktop
- **Animaciones Suaves**: Experiencia de usuario fluida
- **Integración Google Sheets**: Guardado automático de leads
- **Validación de Formularios**: Campos validados en tiempo real
- **Seguridad Avanzada**: Protección contra ataques comunes
- **Variables de Entorno**: Configuración segura y oculta

## 🔧 Configuración Inicial

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd landing-educativa
```

### 2. Configurar Variables de Entorno

#### Opción A: Archivo .env (Recomendado para desarrollo)
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar con tus valores reales
nano .env
```

#### Opción B: Variables del Sistema (Producción)
```bash
# En tu servidor, configura las variables:
export APPS_SCRIPT_URL="https://script.google.com/macros/s/TU_SCRIPT_ID/exec"
export WHATSAPP_NUMBER="1234567890"
```

### 3. Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Pega el código para recibir datos del formulario
4. Despliega como aplicación web
5. Copia la URL generada a tu archivo `.env`

### 4. Configurar Hosting

#### Para Hosting Compartido (cPanel, etc.)
- Sube todos los archivos excepto `.env.example` y `README.md`
- Configura las variables en el panel de control del hosting
- Asegúrate de que PHP esté habilitado

#### Para Netlify/Vercel
- Configura las variables de entorno en el dashboard
- El archivo `env-loader.php` no se usará en estos servicios

## 🛡️ Seguridad Implementada

### Archivo .htaccess
- **Protección de archivos sensibles**: `.env`, `.htaccess`, logs, etc.
- **Headers de seguridad**: XSS Protection, CSRF, Content Security Policy
- **Bloqueo de bots maliciosos**: User agents sospechosos
- **Protección contra inyección SQL**: Filtrado de queries peligrosas
- **Compresión GZIP**: Optimización de carga
- **Cache Control**: Mejora de rendimiento

### Variables de Entorno
- **URLs de API ocultas**: No expuestas en el código fuente
- **Configuración por entorno**: Desarrollo vs Producción
- **Carga dinámica**: Variables inyectadas de forma segura

## 📁 Estructura del Proyecto

```
├── .htaccess              # Configuración de seguridad Apache
├── .env.example           # Ejemplo de variables de entorno
├── .gitignore            # Archivos a ignorar en Git
├── config.js             # Configuración del frontend
├── env-loader.php        # Cargador seguro de variables
├── index.html            # Página principal de navegación
├── landing-a/            # Landing Page A
│   └── index.html
├── landing-b/            # Landing Page B
│   └── index.html
├── assets/               # Recursos compartidos
│   ├── script.min.js     # JavaScript principal (minificado)
│   ├── styles.css        # Estilos CSS
│   └── images/           # Imágenes
├── data-a.json           # Datos para Landing A
└── data-b.json           # Datos para Landing B
```

## 🔄 Flujo de Datos

1. **Usuario llena formulario** → Validación en tiempo real
2. **Envío seguro** → Datos enviados a Google Apps Script
3. **Guardado en Sheets** → Confirmación de almacenamiento
4. **Redirección a WhatsApp** → Solo si el guardado fue exitoso

## 🎨 Personalización

### Cambiar Contenido
- Edita `data-a.json` y `data-b.json` para modificar textos, imágenes y carreras
- Las animaciones y estilos se aplicarán automáticamente

### Añadir Nuevas Carreras
```json
{
  "form": {
    "careers": [
      "Nueva Carrera 1",
      "Nueva Carrera 2"
    ]
  }
}
```

### Modificar Estilos
- Edita `assets/styles.css` para cambiar colores, fuentes y animaciones
- Las animaciones CSS están organizadas por secciones

## 🚀 Despliegue

### Desarrollo Local
```bash
# Usar un servidor local (Python, PHP, Node.js, etc.)
php -S localhost:8000
# o
python -m http.server 8000
```

### Producción
1. **Configura variables de entorno** en tu hosting
2. **Sube archivos** (excepto `.env` y archivos de desarrollo)
3. **Verifica SSL** para HTTPS
4. **Prueba formulario** para confirmar integración

## 🔍 Troubleshooting

### Error: "URL de Google Apps Script no configurada"
- Verifica que `APPS_SCRIPT_URL` esté en tu `.env` o variables del sistema
- Confirma que el archivo `env-loader.php` se esté cargando correctamente

### Error: "Failed to fetch"
- Revisa la configuración CORS en Google Apps Script
- Verifica que la URL del script sea correcta y esté desplegada

### Formulario no envía a WhatsApp
- Confirma que `WHATSAPP_NUMBER` esté configurado correctamente
- Verifica que el guardado en Google Sheets sea exitoso primero

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, revisa:
1. Los logs del navegador (F12 → Console)
2. Los logs del servidor
3. La configuración de variables de entorno

---

**⚠️ Importante**: Nunca subas el archivo `.env` al repositorio. Mantén tus credenciales seguras.