# ✅ COMENTARIOS PARA TRACKING PIXELS AGREGADOS

## 📍 Ubicación de los Comentarios

He agregado comentarios detallados en **todos los archivos HTML** indicando exactamente dónde colocar los códigos de tracking pixels.

## 📋 Archivos Actualizados

### **Comentarios agregados en:**
- ✅ `admisiones-2026/index.html`
- ✅ `admision-2026/index.html`
- ✅ `landing-a/index.html`
- ✅ `landing-b/index.html`

## 📍 Ubicación Exacta

### **Posición en el HTML:**
```html
<head>
    <!-- Meta tags SEO -->
    <title>...</title>
    <meta name="description" content="...">
    <!-- Open Graph -->
    <meta property="og:..." content="...">
    <!-- Twitter -->
    <meta name="twitter:..." content="...">
    
    <!-- ========================================
         TRACKING PIXELS - COLOCAR AQUÍ
         ======================================== -->
    
    <!-- Favicon -->
    <link rel="icon" ...>
    <!-- Resto del head -->
</head>
```

## 🎯 Comentario Completo Agregado

```html
<!-- ========================================
     TRACKING PIXELS - COLOCAR AQUÍ
     ========================================
     
     Agregar aquí los códigos de tracking:
     
     1. Meta Pixel (Facebook):
        - Meta Pixel base code
        - Eventos de conversión
     
     2. Google Pixel (Google Ads):
        - Google Ads conversion tracking
        - Google Analytics 4 (GA4)
        - Google Tag Manager (GTM)
     
     3. TikTok Pixel:
        - TikTok Pixel base code
        - Eventos de conversión TikTok
     
     Ejemplo de estructura:
     <script>
       // Meta Pixel code aquí
     </script>
     
     <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
     <script>
       // Google Analytics code aquí
     </script>
     
     <script>
       // TikTok Pixel code aquí
     </script>
     
     ======================================== -->
```

## 📊 Tipos de Tracking Incluidos

### **1. Meta Pixel (Facebook):**
- **Propósito:** Tracking de conversiones de Facebook/Instagram Ads
- **Eventos:** PageView, Lead, Purchase, etc.
- **Ubicación:** Después de meta tags, antes de favicon

### **2. Google Pixel (Google Ads):**
- **Google Analytics 4 (GA4):** Análisis de tráfico y comportamiento
- **Google Ads Conversion:** Tracking de conversiones de Google Ads
- **Google Tag Manager (GTM):** Gestión centralizada de tags
- **Ubicación:** Después de meta tags, antes de favicon

### **3. TikTok Pixel:**
- **Propósito:** Tracking de conversiones de TikTok Ads
- **Eventos:** PageView, CompleteRegistration, etc.
- **Ubicación:** Después de meta tags, antes de favicon

## 🎯 Ventajas de esta Ubicación

### **1. Carga Temprana:**
- ✅ Se ejecutan antes que otros scripts
- ✅ Capturan eventos desde el inicio
- ✅ No interfieren con el contenido

### **2. SEO Friendly:**
- ✅ Después de meta tags (SEO primero)
- ✅ Antes de recursos críticos
- ✅ No bloquean el renderizado

### **3. Tracking Completo:**
- ✅ Capturan PageView inmediatamente
- ✅ Listos para eventos de conversión
- ✅ Compatibles entre sí

## 📋 Instrucciones de Uso

### **Para agregar Meta Pixel:**
1. Ir al comentario "TRACKING PIXELS - COLOCAR AQUÍ"
2. Pegar el código de Meta Pixel
3. Configurar eventos de conversión

### **Para agregar Google Analytics:**
1. Ir al comentario "TRACKING PIXELS - COLOCAR AQUÍ"
2. Pegar el código de GA4 o GTM
3. Configurar objetivos y conversiones

### **Para agregar TikTok Pixel:**
1. Ir al comentario "TRACKING PIXELS - COLOCAR AQUÍ"
2. Pegar el código de TikTok Pixel
3. Configurar eventos de conversión

## 🔍 Ejemplo de Implementación

### **Después de agregar los códigos:**
```html
<!-- ========================================
     TRACKING PIXELS - COLOCAR AQUÍ
     ======================================== -->

<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- TikTok Pixel -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('TU_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>

<!-- ======================================== -->
```

## ✅ Resultado Final

**Comentarios claros y detallados agregados en todos los HTML:**
- ✅ Ubicación óptima para tracking pixels
- ✅ Instrucciones específicas para cada tipo
- ✅ Ejemplos de estructura de código
- ✅ Compatibilidad con SEO y rendimiento

**¡Listo para agregar cualquier código de tracking!** 🎯