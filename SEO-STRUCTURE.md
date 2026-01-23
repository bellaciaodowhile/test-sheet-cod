# 🔍 Estructura SEO para Landing Pages

Esta guía explica cómo configurar todos los meta tags SEO desde los archivos JSON de cada landing page.

## 📋 Estructura Completa del Objeto SEO

```json
{
  "seo": {
    "title": "Título principal de la página (aparece en la pestaña del navegador)",
    "description": "Descripción que aparece en los resultados de búsqueda de Google (máximo 160 caracteres)",
    "keywords": "palabra1, palabra2, palabra3, universidad online, educación",
    "author": "Nombre de la institución o autor",
    "robots": "index, follow",
    "canonical": "https://tudominio.com/landing-a",
    
    "ogTitle": "Título para Facebook/LinkedIn (puede ser diferente al title principal)",
    "ogDescription": "Descripción para redes sociales (puede ser más atractiva que la de SEO)",
    "ogImage": "https://tudominio.com/assets/images/og-image-a.jpg",
    "ogUrl": "https://tudominio.com/landing-a",
    
    "twitterTitle": "Título específico para Twitter",
    "twitterDescription": "Descripción específica para Twitter",
    "twitterImage": "https://tudominio.com/assets/images/twitter-image-a.jpg"
  }
}
```

## 🎯 Campos Obligatorios vs Opcionales

### ✅ **Obligatorios (Críticos para SEO):**
- `title` - Título principal de la página
- `description` - Descripción para Google
- `keywords` - Palabras clave relevantes

### 🔶 **Recomendados (Mejoran el SEO):**
- `ogTitle` - Para compartir en Facebook/LinkedIn
- `ogDescription` - Descripción atractiva para redes sociales
- `ogImage` - Imagen que aparece al compartir (1200x630px recomendado)

### ⚪ **Opcionales (Para casos específicos):**
- `author` - Nombre del autor/institución
- `robots` - Control de indexación (por defecto: "index, follow")
- `canonical` - URL canónica (evita contenido duplicado)
- `ogUrl` - URL específica para Open Graph
- `twitterTitle` - Título específico para Twitter
- `twitterDescription` - Descripción específica para Twitter
- `twitterImage` - Imagen específica para Twitter

## 📝 Ejemplos Prácticos

### Landing A - Enfoque Técnico
```json
{
  "seo": {
    "title": "Ingenierías Online con Validez SEP - Centro Universitario",
    "description": "Estudia Ingeniería Industrial, Sistemas, Eléctrica y más. 100% online con RVOE. Sin inscripción ni reinscripción.",
    "keywords": "ingeniería online, ingeniería industrial, ingeniería sistemas, universidad online, RVOE, SEP",
    "ogTitle": "🎓 Ingenierías Online - Validez Oficial SEP",
    "ogDescription": "Deja de estudiar teoría. Entrénate para la industria real con programas 100% online.",
    "ogImage": "https://tudominio.com/assets/images/ingenierias-og.jpg"
  }
}
```

### Landing B - Enfoque Comercial
```json
{
  "seo": {
    "title": "Universidad Online - 0% Inscripción | Colegiatura Congelada",
    "description": "Tu Ingeniería o Licenciatura Online con Doble Respaldo Oficial. 0% Inscripción, 0% Reinscripción y colegiatura congelada.",
    "keywords": "universidad online, colegiatura congelada, sin inscripción, educación superior, RVOE",
    "ogTitle": "💰 Universidad Online - Colegiatura Congelada",
    "ogDescription": "La decisión inteligente: 0% Inscripción, 0% Reinscripción. Tu colegiatura se congela desde el primer día.",
    "ogImage": "https://tudominio.com/assets/images/ahorro-og.jpg"
  }
}
```

## 🖼️ Especificaciones de Imágenes

### Open Graph (Facebook/LinkedIn)
- **Tamaño recomendado**: 1200x630 píxeles
- **Formato**: JPG o PNG
- **Peso máximo**: 8MB
- **Relación de aspecto**: 1.91:1

### Twitter Cards
- **Tamaño recomendado**: 1200x600 píxeles
- **Formato**: JPG, PNG, WEBP o GIF
- **Peso máximo**: 5MB
- **Relación de aspecto**: 2:1

## 🔧 Cómo Editar el SEO

### 1. Abrir el archivo JSON correspondiente:
- `data-a.json` para Landing A
- `data-b.json` para Landing B

### 2. Localizar el objeto "seo":
```json
{
  "seo": {
    // Aquí van todos los meta tags
  },
  "pageTitle": "...",
  // resto del contenido
}
```

### 3. Editar los campos necesarios:
- Cambiar títulos y descripciones
- Actualizar palabras clave
- Modificar URLs de imágenes

### 4. Guardar y probar:
- Los cambios se aplican automáticamente
- Verificar en el navegador (F12 → Elements → head)

## 🧪 Herramientas para Probar SEO

### Validadores Online:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google Rich Results**: https://search.google.com/test/rich-results

### Verificación Local:
```javascript
// En la consola del navegador
console.log(document.title);
console.log(document.querySelector('meta[name="description"]').content);
console.log(document.querySelector('meta[property="og:title"]').content);
```

## 📊 Mejores Prácticas

### Títulos:
- **Longitud**: 50-60 caracteres
- **Incluir palabras clave** al inicio
- **Ser descriptivo** y atractivo
- **Evitar duplicados** entre páginas

### Descripciones:
- **Longitud**: 150-160 caracteres
- **Incluir call-to-action**
- **Ser específico** sobre el contenido
- **Usar palabras clave** naturalmente

### Palabras Clave:
- **5-10 palabras clave** relevantes
- **Separar con comas**
- **Incluir variaciones** (singular/plural)
- **Evitar keyword stuffing**

## 🚀 Impacto en el Posicionamiento

Un SEO bien configurado mejora:
- ✅ **Posicionamiento en Google**
- ✅ **CTR en resultados de búsqueda**
- ✅ **Compartidos en redes sociales**
- ✅ **Experiencia del usuario**
- ✅ **Credibilidad de la institución**

¡Ahora puedes personalizar completamente el SEO de cada landing page desde los archivos JSON! 🎉