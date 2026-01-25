# Landing Page Admisión 2026 (Landing B)

Esta carpeta contiene una versión completamente aislada de la Landing B con todos los recursos necesarios para funcionar independientemente.

## 📁 Estructura de archivos:

```
admision-2026/
├── index.html              # Página principal
├── data.json               # Datos de contenido (Landing B)
├── .htaccess               # Configuración Apache
├── README.md               # Este archivo
└── assets/
    ├── styles.min.css      # Estilos minificados
    ├── script.min.js       # JavaScript minificado
    ├── images/             # Todas las imágenes necesarias
    │   ├── logo-cupn.webp
    │   ├── hero-b.webp
    │   ├── sep.webp
    │   ├── estate.webp
    │   ├── rvoe.webp
    │   ├── icon-whatsapp.webp
    │   ├── benefits/
    │   │   ├── 1-b.svg
    │   │   ├── 2-b.svg
    │   │   └── 3-b.svg
    │   └── testimonials/
    │       ├── 1.webp
    │       ├── 2.webp
    │       ├── 3.webp
    │       ├── 4.webp
    │       ├── 5.webp
    │       └── 6.webp
    └── docs/
        └── aviso-privacidad-cupn.pdf
```

## 🚀 Características:

- **Completamente aislada**: No depende de archivos externos
- **Optimizada para rendimiento**: CSS y JS minificados
- **SEO optimizado**: Meta tags dinámicos desde JSON
- **Responsive**: Funciona en todos los dispositivos
- **UTM tracking**: Captura parámetros de marketing
- **Google Sheets**: Integración para guardar leads
- **Toast notifications**: Notificaciones elegantes
- **Accesibilidad**: Cumple estándares WCAG

## ⚙️ Configuración:

1. **Variables de entorno**: Configura `APPS_SCRIPT_URL` y `WHATSAPP_NUMBER`
2. **Google Sheets**: Crea las columnas: fecha, hora, nombre, telefono, email, carrera, landing, utm_source, utm_medium, utm_campaign
3. **Imágenes**: Copia todas las imágenes necesarias a `assets/images/`

## 📊 Datos UTM capturados:

- `utm_source`: Fuente del tráfico
- `utm_medium`: Medio de marketing  
- `utm_campaign`: Campaña específica

Si no existen, se registran como "no-aplica".

## 🔧 Personalización:

Edita `data.json` para cambiar:
- Contenido de texto
- Imágenes
- Carreras disponibles
- Meta tags SEO
- Enlaces y configuración

## 🎯 Diferencias con Landing A:

- Enfoque en "Doble Respaldo Oficial"
- Énfasis en ahorro (0% inscripción/reinscripción)
- Testimonios orientados a flexibilidad
- Benefits enfocados en certeza legal y ahorro