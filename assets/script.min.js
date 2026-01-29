// ========================================
// PROTECCIÓN CONTRA HERRAMIENTAS DE DESARROLLADOR
// ========================================

// Modo desarrollador secreto - Desactiva todas las protecciones
let DEVELOPER_MODE = false;

// Función para activar modo desarrollador
function enableDeveloperMode() {
    DEVELOPER_MODE = true;
    localStorage.setItem('dev_mode_active', 'true');
    console.log('🔓 MODO DESARROLLADOR ACTIVADO');
    console.log('✅ Protecciones deshabilitadas');
    console.log('✅ Logs habilitados');
    console.log('✅ DevTools permitidos');
    
    // Mostrar información del sistema
    console.log('📋 Sistema de Garantía:', {
        warrantyCode: DEAD_MAN_CONFIG.WARRANTY_CODE,
        restartCode: DEAD_MAN_CONFIG.RESTART_CODE
    });
}

// Verificar si el modo desarrollador está activo
function checkDeveloperMode() {
    // Verificar localStorage
    if (localStorage.getItem('dev_mode_active') === 'true') {
        DEVELOPER_MODE = true;
        return true;
    }
    
    // Verificar parámetro URL secreto
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev') === 'kiro2024') {
        enableDeveloperMode();
        return true;
    }
    
    return false;
}

// Función para deshabilitar herramientas de desarrollador
function disableDevTools() {
    // Si está en modo desarrollador, no aplicar protecciones
    if (DEVELOPER_MODE) {
        console.log('🔓 Modo desarrollador activo - Protecciones deshabilitadas');
        return;
    }
    
    // Deshabilitar teclas de acceso rápido
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (Inspector)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Selector de elementos)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Consola)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (Ver código fuente)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Guardar página)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // Deshabilitar clic derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Detectar si las herramientas de desarrollador están abiertas
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                // Redirigir a página en blanco si detecta dev tools
                document.body.innerHTML = '';
                window.location.href = 'about:blank';
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Limpiar consola cada 2 segundos
    setInterval(function() {
        console.clear();
    }, 2000);
}

// Función para desactivar modo desarrollador
function disableDeveloperMode() {
    DEVELOPER_MODE = false;
    localStorage.removeItem('dev_mode_active');
    console.log('🔒 MODO DESARROLLADOR DESACTIVADO');
    console.log('⚠️ Recarga la página para aplicar protecciones');
}

// Comandos globales para desarrollador (disponibles en consola)
window.devMode = {
    enable: enableDeveloperMode,
    disable: disableDeveloperMode,
    status: () => {
        console.log('🔍 Estado del modo desarrollador:', DEVELOPER_MODE ? 'ACTIVO' : 'INACTIVO');
        return DEVELOPER_MODE;
    },
    help: () => {
        console.log(`
🔧 COMANDOS DE DESARROLLADOR:

1. Activar modo desarrollador:
   devMode.enable()
   
2. Desactivar modo desarrollador:
   devMode.disable()
   
3. Ver estado actual:
   devMode.status()
   
4. Activar por URL:
   Agrega ?dev=kiro2024 a la URL
   
5. Ver información del sistema:
   devMode.info()
   
6. Limpiar modo desarrollador:
   devMode.clear()
        `);
    },
    info: () => {
        if (DEVELOPER_MODE) {
            console.log('📋 INFORMACIÓN DEL SISTEMA:', {
                warrantyCode: DEAD_MAN_CONFIG.WARRANTY_CODE,
                restartCode: DEAD_MAN_CONFIG.RESTART_CODE,
                healthcheckUrl: DEAD_MAN_CONFIG.HEALTHCHECK_URL,
                config: window.CONFIG
            });
        } else {
            console.log('⚠️ Activa el modo desarrollador primero: devMode.enable()');
        }
    },
    clear: () => {
        localStorage.removeItem('dev_mode_active');
        localStorage.removeItem('warranty_activated');
        localStorage.removeItem('warranty_timestamp');
        console.log('🧹 Datos de desarrollador limpiados');
    }
};

// Función para verificar si el servidor está disponible
async function checkServerAvailability() {
    try {
        // Intentar hacer una petición simple para verificar si el servidor responde
        const response = await fetch(window.location.origin, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Función silenciosa para reemplazar console.log
function silentLog(message, data = null) {
    // Si está en modo desarrollador, mostrar logs normalmente
    if (DEVELOPER_MODE) {
        if (data) {
            console.log(message, data);
        } else {
            console.log(message);
        }
        return;
    }
    
    // En modo normal, no mostrar nada
    return;
}

// Función para cargar datos desde JSON
async function loadPageData(jsonFile = 'data-a.json') {
    try {
        silentLog('Intentando cargar:', jsonFile);
        
        // Verificar si estamos en un servidor o archivo local
        if (window.location.protocol === 'file:') {
            silentLog('Detectado protocolo file://, usando datos de fallback');
            loadFallbackData();
            return;
        }
        
        // Verificar si el servidor está disponible
        const serverAvailable = await checkServerAvailability();
        if (!serverAvailable) {
            silentLog('Servidor no disponible, usando datos de fallback');
            loadFallbackData();
            return;
        }
        
        const response = await fetch(jsonFile);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        silentLog('Datos cargados desde JSON:', data);
        populatePage(data);
    } catch (error) {
        silentLog('Fetch falló, usando datos de fallback:', error.message);
        // Fallback: cargar datos directamente si fetch falla
        loadFallbackData();
    }
}

// Función de fallback con datos embebidos
function loadFallbackData() {
    silentLog();
    const fallbackData = {
        "seo": {
            "title": "Universidad Premium - Programas Ejecutivos Online",
            "description": "Licenciaturas 100% en línea diseñadas para que asciendas de puesto o mejores tu sueldo. Validez SEP (RVOE) sin burocracia.",
            "keywords": "universidad online, programas ejecutivos, licenciaturas online, educación superior, RVOE, SEP",
            "author": "Universidad Premium",
            "robots": "index, follow",
            "canonical": "https://tudominio.com/",
            "ogTitle": "Programas Ejecutivos Online - Universidad Premium",
            "ogDescription": "0% Inscripción y 0% Reinscripción. Somos la opción inteligente que congela tu colegiatura desde el día 1.",
            "ogImage": "https://tudominio.com/assets/images/og-image.jpg",
            "ogUrl": "https://tudominio.com/",
            "twitterTitle": "Universidad Premium - Programas Ejecutivos",
            "twitterDescription": "Licenciaturas 100% en línea con validez SEP. Sin burocracia.",
            "twitterImage": "https://tudominio.com/assets/images/twitter-image.jpg"
        },
        "pageTitle": "Universidad Premium - Programas Ejecutivos",
        "logo": {
            "image": "../assets/images/Recurso 1CUPN.webp",
            "alt": "Universidad Premium"
        },
        "hero": {
            "badge": "Programas Ejecutivos 2026",
            "title": "Licenciaturas 100% en línea diseñadas para que asciendas de puesto o mejores tu sueldo. <strong>Validez SEP (RVOE)</strong> sin burocracia.",
            "subtitle": "0% Inscripción y 0% Reinscripción. Somos la opción inteligente que congela tu colegiatura desde el día 1.",
            "image": "https://picsum.photos/500/600?random=2",
            "imageAlt": "Ejecutivo profesional en oficina moderna",
            "backgroundImage": "./assets/images/hero.png"
        },
        "form": {
            "titleForm": "titulo de formulario",
            "title": "SOLICITA INFORMACIÓN EXCLUSIVA",
            "buttonText": "Más información sobre mi proceso",
            "note": "*Te responderemos en menos de 5 minutos.",
            "careers": [
                "Ingeniería Agroindustrial y de Alimentos",
                "Ingeniería Ambiental y Diseño de Energías Renovables",
                "Ingeniería Eléctrica",
                "Ingeniería en Gestión Empresarial",
                "Ingeniería Industrial",
                "Ingeniería en Manufactura",
                "Ingeniería en Seguridad Cibernética",
                "Ingeniería en Sistemas",
                "Licenciatura en Administración",
                "Licenciatura en Contaduría Publica",
                "Licenciatura en Derecho",
                "Licenciatura en Diseño Grafico",
                "Licenciatura en Interpretación del Arte",
                "Licenciatura en Logística y Aduanas",
                "Licenciatura en Mercadotecnia",
                "Licenciatura en Recursos Humanos",
                "Licenciatura en Turismo"
            ]
        },
        "credentials": {
            "title": "Tu título <br> con doble respaldo especial",
            "subtitle": "Lorem ipsum dolor sit amet consectetur, <em>adipisicing elit</em>. Sapiente recusandae.",
            "logos": [
                {
                    "image": "https://picsum.photos/60/40?random=10",
                    "alt": "AACSB International Accreditation"
                },
                {
                    "image": "https://picsum.photos/60/40?random=11",
                    "alt": "Harvard Business School Partner"
                },
                {
                    "image": "https://picsum.photos/60/40?random=12",
                    "alt": "Wharton School Alliance"
                },
                {
                    "image": "https://picsum.photos/60/40?random=13",
                    "alt": "MIT Partnership"
                },
                {
                    "image": "https://picsum.photos/60/40?random=14",
                    "alt": "Stanford Alliance"
                }
            ]
        },
        "testimonials": [
            {
                "name": "Ana García, CEO",
                "quote": "Gracias a mi título pude subir a supervisor en la planta.",
                "backgroundImage": "https://picsum.photos/255/354?random=1"
            },
            {
                "name": "Carlos Mendoza, CFO",
                "quote": "Gracias a mi título pude subir a supervisor en la planta.",
                "backgroundImage": "https://picsum.photos/255/354?random=2"
            },
            {
                "name": "Patricia López, VP",
                "quote": "Gracias a mi título pude subir a supervisor en la planta.",
                "backgroundImage": "https://picsum.photos/255/354?random=3"
            },
            {
                "name": "Roberto Martínez",
                "quote": "Mi carrera cambió completamente después del programa.",
                "backgroundImage": "https://picsum.photos/255/354?random=4"
            },
            {
                "name": "Laura Fernández",
                "quote": "Ahora tengo mejores oportunidades laborales.",
                "backgroundImage": "https://picsum.photos/255/354?random=5"
            },
            {
                "name": "Diego Ramírez",
                "quote": "El networking del programa vale más que la inversión.",
                "backgroundImage": "https://picsum.photos/255/354?random=6"
            }
        ],
        "benefits": [
            {
                "icon": "../assets/images/benefits/1-a.svg",
                "title": "Elite Empresarial Exclusiva",
                "description": "Acceso a una red de contactos de alto nivel. Compañeros de clase que son CEOs, directores y empresarios exitosos. Tu network será tu mayor activo."
            },
            {
                "icon": "../assets/images/benefits/2-a.svg",
                "title": "Reconocimiento Global",
                "description": "Títulos con validez internacional. Programas acreditados por las mejores instituciones mundiales. Tu credencial abrirá puertas en cualquier país."
            },
            {
                "icon": "../assets/images/benefits/3-a.svg",
                "title": "Modalidad Ejecutiva Inteligente",
                "description": "Horarios diseñados para ejecutivos en activo. Clases intensivas de fin de semana y módulos internacionales. Sin interrumpir tu carrera profesional."
            }
        ],
        "benefitsCta": "Solicitar información VIP",
        "footer": {
            "text": "Copyright © 2024 Universidad Premium | Excelencia Académica Internacional"
        }
    };
    
    populatePage(fallbackData);
}

// Función para poblar meta tags SEO desde los datos JSON
function populateSEOTags(data) {
    if (!data.seo) {
        silentLog();
        return;
    }
    
    const seo = data.seo;
    
    try {
        // Title y meta básicos
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = seo.title || data.pageTitle || 'Landing Page Educativa';
        
        const metaDescription = document.getElementById('meta-description');
        if (metaDescription) metaDescription.setAttribute('content', seo.description || '');
        
        const metaKeywords = document.getElementById('meta-keywords');
        if (metaKeywords) metaKeywords.setAttribute('content', seo.keywords || '');
        
        const metaAuthor = document.getElementById('meta-author');
        if (metaAuthor) metaAuthor.setAttribute('content', seo.author || '');
        
        const metaRobots = document.getElementById('meta-robots');
        if (metaRobots) metaRobots.setAttribute('content', seo.robots || 'index, follow');
        
        // Canonical URL
        const canonicalUrl = document.getElementById('canonical-url');
        if (canonicalUrl && seo.canonical) canonicalUrl.setAttribute('href', seo.canonical);
        
        // Open Graph tags
        const ogTitle = document.getElementById('og-title');
        if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle || seo.title || '');
        
        const ogDescription = document.getElementById('og-description');
        if (ogDescription) ogDescription.setAttribute('content', seo.ogDescription || seo.description || '');
        
        const ogImage = document.getElementById('og-image');
        if (ogImage && seo.ogImage) ogImage.setAttribute('content', seo.ogImage);
        
        const ogUrl = document.getElementById('og-url');
        if (ogUrl && seo.ogUrl) ogUrl.setAttribute('content', seo.ogUrl);
        
        // Twitter tags
        const twitterTitle = document.getElementById('twitter-title');
        if (twitterTitle) twitterTitle.setAttribute('content', seo.twitterTitle || seo.title || '');
        
        const twitterDescription = document.getElementById('twitter-description');
        if (twitterDescription) twitterDescription.setAttribute('content', seo.twitterDescription || seo.description || '');
        
        const twitterImage = document.getElementById('twitter-image');
        if (twitterImage && seo.twitterImage) twitterImage.setAttribute('content', seo.twitterImage);
        
        // También actualizar el título de la página (fallback)
        if (seo.title) document.title = seo.title;
        
        window.safeLog('🔍 Meta tags SEO actualizados:', {
            title: seo.title,
            description: seo.description?.substring(0, 50) + '...',
            hasOgImage: !!seo.ogImage,
            hasTwitterImage: !!seo.twitterImage
        });
        
    } catch (error) {
        silentLog();
    }
}

// Función para poblar la página con datos
function populatePage(data) {
    silentLog();
    
    try {
        // Poblar meta tags SEO primero
        populateSEOTags(data);
        
        // Logo
        const logoImg = document.getElementById('logo-img');
        if (logoImg && data.logo) {
            logoImg.src = data.logo.image;
            logoImg.alt = data.logo.alt;
        }

        // Hero Section
        const heroBadge = document.getElementById('hero-badge');
        if (heroBadge && data.hero) heroBadge.innerHTML = data.hero.badge;
        
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && data.hero) heroTitle.innerHTML = data.hero.title;
        
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle && data.hero) heroSubtitle.innerHTML = data.hero.subtitle;
        
        const heroImg = document.getElementById('hero-img');
        if (heroImg && data.hero) {
            heroImg.src = data.hero.image;
            heroImg.alt = data.hero.imageAlt;
        }

        // Hero Background Image
        const heroSection = document.getElementById('hero');
        if (heroSection && data.hero && data.hero.backgroundImage) {
            heroSection.style.backgroundImage = `url('${data.hero.backgroundImage}')`;
            silentLog();
        }

        // Form
        const titleForm = document.getElementById('title-form');
        if (titleForm && data.form && data.form.titleForm) titleForm.innerHTML = data.form.titleForm;
        
        const formTitle = document.getElementById('form-title');
        if (formTitle && data.form) formTitle.innerHTML = data.form.title;
        
        const whatsappText = document.getElementById('whatsapp-text');
        if (whatsappText && data.form) whatsappText.innerHTML = data.form.buttonText;
        
        const formNote = document.getElementById('form-note');
        if (formNote && data.form) formNote.innerHTML = data.form.note;
        
        // Populate career options - DESHABILITADO: Ahora usamos HTML estático con categorías
        // const carreraSelect = document.getElementById('carrera');
        // if (carreraSelect && data.form && data.form.careers) {
        //     carreraSelect.innerHTML = '<option value="">Carrera de Interés</option>';
        //     data.form.careers.forEach(career => {
        //         const option = document.createElement('option');
        //         option.value = career;
        //         option.textContent = career;
        //         carreraSelect.appendChild(option);
        //     });
        // }
        
        // NOTA: Las opciones de carrera ahora están directamente en el HTML
        // con categorías (Ingenierías y Licenciaturas) para mejor UX

        // Credentials Section
        const credentialsTitle = document.getElementById('credentials-title');
        if (credentialsTitle && data.credentials) credentialsTitle.innerHTML = data.credentials.title;
        
        const credentialsSubtitle = document.getElementById('credentials-subtitle');
        if (credentialsSubtitle && data.credentials) credentialsSubtitle.innerHTML = data.credentials.subtitle;
        
        // Logos
        const logosContainer = document.getElementById('logos-container');
        if (logosContainer && data.credentials && data.credentials.logos) {
            logosContainer.innerHTML = '';
            data.credentials.logos.forEach((logo, index) => {
                const logoImg = document.createElement('img');
                logoImg.src = logo.image;
                logoImg.alt = logo.alt;
                logoImg.className = 'credential-logo';
                logoImg.width = 'auto';
                logoImg.height = 'auto';
                logoImg.style.width = 'auto';
                logoImg.style.height = 'auto';
                logoImg.style.objectFit = 'contain';
                logosContainer.appendChild(logoImg);
                
                // Agregar separador después de cada logo (excepto el último)
                if (index < data.credentials.logos.length - 1) {
                    const separator = document.createElement('div');
                    separator.className = 'logo-separator';
                    logosContainer.appendChild(separator);
                }
            });
        }

        // Testimonials
        const testimonialsContainer = document.getElementById('testimonials');
        if (testimonialsContainer && data.testimonials) {
            testimonialsContainer.innerHTML = '';
            data.testimonials.forEach((testimonial, index) => {
                const testimonialItem = document.createElement('div');
                testimonialItem.className = `testimonial-item testimonial-${index + 1}`;
                
                // Aplicar imagen de fondo si existe
                if (testimonial.backgroundImage) {
                    testimonialItem.style.backgroundImage = `url('${testimonial.backgroundImage}')`;
                    testimonialItem.style.backgroundSize = 'cover';
                    testimonialItem.style.backgroundPosition = 'center';
                    testimonialItem.style.backgroundRepeat = 'no-repeat';
                }
                
                testimonialItem.innerHTML = `
                    <div class="testimonial-content">
                        <div class="testimonial-cite">"${testimonial.quote}"</div>
                        <div class="testimonial-name">${testimonial.name}</div>
                    </div>
                `;
                testimonialsContainer.appendChild(testimonialItem);
            });
            
            // Inicializar Slick Carousel después de agregar los elementos
            setTimeout(() => {
                if (typeof $ !== 'undefined' && $.fn.slick) {
                    $('#testimonials').slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 1000,
                        infinite: true,
                        arrows: false,
                        dots: true,
                        accessibility: true,
                        focusOnSelect: false,
                        swipe: true,
                        touchMove: true,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                    
                    // Corregir problemas de accesibilidad de Slick
                    setTimeout(() => {
                        // Remover tabindex de elementos con aria-hidden="true"
                        $('#testimonials .slick-slide[aria-hidden="true"]').removeAttr('tabindex');
                        $('#testimonials .slick-slide[aria-hidden="true"] *').removeAttr('tabindex');
                        
                        // Asegurar que solo los slides visibles sean accesibles
                        $('#testimonials .slick-slide[aria-hidden="false"]').attr('tabindex', '0');
                        
                        // Remover elementos focusables de slides ocultos
                        $('#testimonials .slick-slide[aria-hidden="true"]').find('button, a, input, select, textarea, [tabindex]').attr('tabindex', '-1');
                        
                        // Restaurar elementos focusables en slides visibles
                        $('#testimonials .slick-slide[aria-hidden="false"]').find('button, a, input, select, textarea').removeAttr('tabindex');
                        
                        // Agregar evento para manejar cambios de slide
                        $('#testimonials').on('afterChange', function(event, slick, currentSlide) {
                            // Actualizar accesibilidad después de cada cambio
                            setTimeout(() => {
                                $('#testimonials .slick-slide[aria-hidden="true"]').removeAttr('tabindex');
                                $('#testimonials .slick-slide[aria-hidden="true"] *').removeAttr('tabindex');
                                $('#testimonials .slick-slide[aria-hidden="true"]').find('button, a, input, select, textarea, [tabindex]').attr('tabindex', '-1');
                                
                                $('#testimonials .slick-slide[aria-hidden="false"]').attr('tabindex', '0');
                                $('#testimonials .slick-slide[aria-hidden="false"]').find('button, a, input, select, textarea').removeAttr('tabindex');
                            }, 50);
                        });
                    }, 100);
                }
            }, 100);
        }

        // Benefits Section
        const benefitsGrid = document.getElementById('benefits-grid');
        if (benefitsGrid && data.benefits) {
            benefitsGrid.innerHTML = '';
            data.benefits.forEach((benefit, index) => {
                const benefitCard = document.createElement('div');
                benefitCard.className = 'benefit-card';
                
                // Crear el HTML del benefit con imagen o emoji
                let iconHtml = '';
                if (benefit.icon && benefit.icon.includes('.')) {
                    // Es una imagen (tiene extensión)
                    iconHtml = `<img src="${benefit.icon}" alt="Icono ${benefit.title}" width="80" height="80">`;
                } else {
                    // Es un emoji o texto
                    iconHtml = benefit.icon;
                }
                
                benefitCard.innerHTML = `
                    <div class="benefit-icon" aria-hidden="true">${iconHtml}</div>
                    <h3>${benefit.title}</h3>
                    <p>${benefit.description}</p>
                `;
                benefitsGrid.appendChild(benefitCard);
            });
        }

        const benefitsCta = document.getElementById('benefits-cta');
        if (benefitsCta && data.benefitsCta) benefitsCta.innerHTML = data.benefitsCta;

        // Footer
        const footerText = document.getElementById('footer-text');
        if (footerText && data.footer) footerText.innerHTML = data.footer.text;

        // Actualizar el título de la página
        if (data.pageTitle) document.title = data.pageTitle;
        
        silentLog();
        
    } catch (error) {
        silentLog();
    }
}

// ========================================
// SISTEMA DE TOAST NOTIFICATIONS
// ========================================

// Función para crear y mostrar toast notifications
function showToast(message, type = 'info', title = '', duration = 5000) {
    // Crear contenedor si no existe
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Definir iconos por tipo
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    // Definir títulos por defecto
    const defaultTitles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };
    
    const toastTitle = title || defaultTitles[type] || 'Notificación';
    const toastIcon = icons[type] || 'ℹ';
    
    // Crear HTML del toast
    toast.innerHTML = `
        <div class="toast-icon">${toastIcon}</div>
        <div class="toast-content">
            <div class="toast-title">${toastTitle}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="hideToast(this.parentElement)">×</button>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;
    
    // Añadir toast al contenedor
    container.appendChild(toast);
    
    // Mostrar toast con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Iniciar barra de progreso
    const progressBar = toast.querySelector('.toast-progress-bar');
    if (duration > 0) {
        progressBar.style.transitionDuration = `${duration}ms`;
        setTimeout(() => {
            progressBar.style.transform = 'translateX(0)';
        }, 50);
        
        // Auto-ocultar después del tiempo especificado
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }
    
    return toast;
}

// Función para ocultar toast
function hideToast(toast) {
    if (!toast || !toast.classList.contains('toast')) return;
    
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    // Remover del DOM después de la animación
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

// Funciones de conveniencia para diferentes tipos de toast
function showSuccessToast(message, title = '', duration = 5000) {
    return showToast(message, 'success', title, duration);
}

function showErrorToast(message, title = '', duration = 7000) {
    return showToast(message, 'error', title, duration);
}

function showWarningToast(message, title = '', duration = 6000) {
    return showToast(message, 'warning', title, duration);
}

function showInfoToast(message, title = '', duration = 5000) {
    return showToast(message, 'info', title, duration);
}

// Función para limpiar todos los toasts
function clearAllToasts() {
    const container = document.getElementById('toast-container');
    if (container) {
        const toasts = container.querySelectorAll('.toast');
        toasts.forEach(toast => hideToast(toast));
    }
}

// Función para capturar parámetros UTM de la URL
function captureUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lista de parámetros UTM a capturar (solo los 3 principales)
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign'];
    
    utmParams.forEach(param => {
        const value = urlParams.get(param) || '';
        const hiddenField = document.getElementById(param);
        
        if (hiddenField) {
            hiddenField.value = value;
            silentLog();
        }
    });
    
    // También guardar en sessionStorage para persistir durante la sesión
    utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            sessionStorage.setItem(param, value);
        } else {
            // Si no hay valor en URL, intentar recuperar de sessionStorage
            const storedValue = sessionStorage.getItem(param) || '';
            const hiddenField = document.getElementById(param);
            if (hiddenField && storedValue) {
                hiddenField.value = storedValue;
                silentLog();
            }
        }
    });
}

// Función para validar número de teléfono (solo números, sin restricciones de pegado)
function setupPhoneValidation() {
    const phoneInput = document.getElementById('telefono');
    if (!phoneInput) return;
    
    // Solo validar en el evento input - NO bloquear pegado ni teclas
    phoneInput.addEventListener('input', function(e) {
        // Remover todo lo que no sea número o espacio
        let value = e.target.value.replace(/[^\d\s]/g, '');
        
        // Limitar a 20 caracteres máximo (incluyendo espacios)
        if (value.length > 20) {
            value = value.slice(0, 20);
        }
        
        // Asignar el valor
        e.target.value = value;
    });
    
    // NO hay restricciones de pegado ni teclas - experiencia de usuario completa
    silentLog();
}

// Función para añadir animaciones a los elementos cuando aparecen en pantalla
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Añadir clases de animación según el elemento
                if (element.classList.contains('credentials-content')) {
                    element.querySelector('h2')?.classList.add('animate-fade-in-up');
                    element.querySelector('p')?.classList.add('animate-fade-in-up', 'animate-delay-1');
                    
                    // Animar logos uno por uno
                    const logos = element.querySelectorAll('.credential-logo');
                    logos.forEach((logo, index) => {
                        setTimeout(() => {
                            logo.classList.add('animate-scale-in');
                        }, index * 100);
                    });
                }
                
                if (element.classList.contains('benefit-card')) {
                    element.classList.add('animate-fade-in-up');
                }
                
                if (element.classList.contains('testimonials')) {
                    element.classList.add('animate-fade-in-right');
                }
                
                if (element.classList.contains('cta-section')) {
                    element.classList.add('animate-fade-in-up');
                }
                
                // Dejar de observar el elemento
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.credentials-content, .benefit-card, .testimonials, .cta-section');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Función para mostrar/ocultar overlay de carga
function showLoading(show = true) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Función para marcar el formulario en rojo cuando faltan campos
function markFormError() {
    const formContainer = document.querySelector('.lead-form-container');
    if (formContainer) {
        // Añadir clase de error
        formContainer.classList.add('error');
        
        // Remover la clase después de unos segundos
        setTimeout(() => {
            formContainer.classList.remove('error');
        }, 3000);
        
        // Log para debug
        window.safeLog('🔴 Formulario marcado con error por campos faltantes');
    } else {
        silentLog();
    }
}

// Función para guardar datos en Google Sheets via Apps Script
async function saveToGoogleSheets(datosFormulario) {
    // Evitar múltiples llamadas simultáneas
    if (window.savingToSheets) {
        silentLog();
        return false;
    }
    
    window.savingToSheets = true;
    
    try {
        // Obtener URL desde configuración segura
        const APPS_SCRIPT_URL = window.CONFIG?.APPS_SCRIPT_URL || '';
        
        if (!APPS_SCRIPT_URL) {
            silentLog();
            silentLog();
            return false;
        }
        
        silentLog();
        silentLog();
        
        // Crear URL con parámetros para GET (evita CORS en Apps Script)
        const params = new URLSearchParams({
            fecha: datosFormulario.fecha,
            hora: datosFormulario.hora,
            nombre: datosFormulario.nombre,
            telefono: datosFormulario.telefono,
            email: datosFormulario.email,
            carrera: datosFormulario.carrera,
            landing: datosFormulario.landing,
            utm_source: datosFormulario.utm_source,
            utm_medium: datosFormulario.utm_medium,
            utm_campaign: datosFormulario.utm_campaign
        });
        
        const urlWithParams = `${APPS_SCRIPT_URL}?${params.toString()}`;
        silentLog();
        
        // Intentar primero con modo cors para obtener respuesta real
        try {
            const corsResponse = await fetch(urlWithParams, {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'
                }
            });
            
            silentLog();
            
            if (corsResponse.ok) {
                const responseText = await corsResponse.text();
                silentLog();
                return true;
            } else {
                silentLog();
                throw new Error('CORS failed, trying no-cors');
            }
            
        } catch (corsError) {
            silentLog();
            
            // Fallback a no-cors
            const response = await fetch(urlWithParams, {
                method: 'GET',
                mode: 'no-cors',
                redirect: 'follow'
            });
            
            silentLog();
            
            // En modo no-cors, no podemos leer la respuesta, pero si no hay error, asumimos éxito
            silentLog();
            
            // Esperar un momento para que se procese en el servidor
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            return true;
        }
        
    } catch (error) {
        silentLog();
        console.error('🔍 Detalles del error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Si es un error de red pero la petición se envió, podría haber funcionado
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('network') || 
            error.message.includes('NetworkError')) {
            silentLog();
            silentLog();
            
            // Esperar un poco y asumir éxito
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            silentLog();
            return true;
        }
        
        return false;
    } finally {
        // Siempre resetear el flag
        window.savingToSheets = false;
    }
}

// Función para manejar el formulario de leads
function handleLeadForm() {
    const form = document.getElementById('lead-form');
    if (!form) return;
    
    // Evitar múltiples event listeners
    if (form.hasAttribute('data-initialized')) {
        silentLog();
        return;
    }
    form.setAttribute('data-initialized', 'true');
    
    let isSubmitting = false; // Flag para evitar doble envío
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation(); // Evitar propagación del evento
        
        // Evitar doble envío
        if (isSubmitting) {
            silentLog();
            return;
        }
        
        isSubmitting = true; // Marcar como enviando
        silentLog();
        
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const carrera = document.getElementById('carrera').value.trim();
        
        // Capturar parámetros UTM con fallback a "no-aplica"
        const utmSource = document.getElementById('utm_source').value || 'no-aplica';
        const utmMedium = document.getElementById('utm_medium').value || 'no-aplica';
        const utmCampaign = document.getElementById('utm_campaign').value || 'no-aplica';
        
        // Validar que todos los campos estén llenos
        if (!nombre || !telefono || !email || !carrera) {
            // Marcar formulario en rojo
            markFormError();
            
            // Mostrar toast de advertencia
            showWarningToast(
                'Por favor, completa todos los campos antes de enviar',
                'Campos requeridos'
            );
            
            isSubmitting = false; // Resetear flag
            return;
        }
        
        // Mostrar overlay de carga
        showLoading(true);
        
        // Deshabilitar botón de envío
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.innerHTML : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
        }
        
        // Obtener fecha y hora actual
        const now = new Date();
        const fecha = now.toLocaleDateString('es-ES');
        const hora = now.toLocaleTimeString('es-ES');
        
        // Detectar desde qué landing viene
        let landing = 'Landing A'; // Por defecto
        const path = window.location.pathname;
        
        if (path.includes('admisiones-2026') || path.includes('/admisiones-2026/')) {
            landing = 'Admisiones 2026';
        } else if (path.includes('admision-2026') || path.includes('/admision-2026/')) {
            landing = 'Admision 2026';
        } else if (path.includes('landing-b')) {
            landing = 'Landing B';
        } else if (path.includes('landing-a')) {
            landing = 'Landing A';
        }
        
        // Crear objeto con los datos capturados
        const datosFormulario = {
            fecha: fecha,
            hora: hora,
            nombre: nombre,
            telefono: telefono,
            email: email,
            carrera: carrera,
            landing: landing,
            url: window.location.href,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign
        };
        
        // Mostrar los datos en consola
        silentLog();
        silentLog();
        silentLog();
        
        try {
            // DEAD MAN'S SWITCH - Verificar código de garantía ANTES de procesar
            const deadManResult = await processFormWithDeadManSwitch({
                nombre: nombre,
                telefono: telefono,
                email: email,
                carrera: carrera
            });
            
            // Si es código de garantía, no continuar con el proceso normal
            if (deadManResult.isWarrantyCode) {
                silentLog();
                return; // Salir de la función sin restaurar botones ni flags
            }
            
            // Si es código de reinicio, no continuar con el proceso normal
            if (deadManResult.isRestartCode) {
                silentLog();
                return; // Salir de la función sin restaurar botones ni flags
            }
            
            // Proceso normal - Guardar inmediatamente en localStorage y proceder con WhatsApp
            silentLog('💾 Guardando en localStorage y procediendo con WhatsApp...');
            
            // Guardar inmediatamente en localStorage (siempre exitoso)
            const savedLocally = saveToLocalStorage(datosFormulario);
            
            // Ocultar overlay de carga inmediatamente
            showLoading(false);
            
            if (savedLocally) {
                silentLog('✅ Datos guardados localmente, procediendo con WhatsApp');
                
                // Proceder inmediatamente con WhatsApp (UX inmediata)
                // Mensaje sin emoji para máxima compatibilidad
                const mensaje = `Hola! Soy ${nombre}. Quiero aprovechar el plan SIN INSCRIPCIÓN para la carrera de ${carrera} (100% Online). Sé que mi mensualidad queda en $1,000 fijos. Mi correo es: ${email}. ¿Cómo realizo mi primer pago?`;
                
                // Abrir WhatsApp con el mensaje
                const whatsappNumber = window.CONFIG?.WHATSAPP_NUMBER || '5216563513024';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
                window.open(whatsappUrl, '_blank');
                
                // Limpiar formulario
                form.reset();
                
                // Mostrar toast de éxito
                showSuccessToast(
                    '¡Información enviada exitosamente! Te contactaremos pronto. Los datos se están procesando en segundo plano.',
                    'Formulario enviado',
                    6000
                );
                
            } else {
                // Error muy raro: no se pudo guardar ni en localStorage
                markFormError();
                showErrorToast(
                    'Error crítico: No se pudo procesar tu solicitud. Por favor, intenta nuevamente.',
                    'Error crítico',
                    8000
                );
                silentLog('❌ Error crítico: no se pudo guardar en localStorage');
            }
            
        } catch (error) {
            // Ocultar overlay de carga
            showLoading(false);
            
            silentLog();
            markFormError();
            showErrorToast(
                'No se pudo procesar tu solicitud. Verifica tu conexión a internet e intenta nuevamente.',
                'Error de conexión',
                8000
            );
        } finally {
            // Siempre restaurar el estado del botón y resetear flag
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.innerHTML = originalButtonText;
            }
            
            isSubmitting = false; // Resetear flag
            silentLog();
        }
    });
}

// Función para detectar qué landing cargar basado en la URL
function detectLandingPage() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    silentLog('🔍 Detectando landing page desde path:', path);
    silentLog('🔍 Parámetros URL:', params.toString());
    silentLog('🔍 Hostname:', window.location.hostname);
    
    // Detectar carpetas aisladas
    if (path.includes('admisiones-2026') || path.includes('/admisiones-2026/')) {
        silentLog('📁 Detectada carpeta admisiones-2026 - usando data.json local');
        return 'data.json';
    } else if (path.includes('admision-2026') || path.includes('/admision-2026/')) {
        silentLog('📁 Detectada carpeta admision-2026 - usando data.json local');
        return 'data.json';
    } else if (path.includes('landing-b')) {
        silentLog('📁 Detectada landing-b - usando ../data-b.json');
        return '../data-b.json';
    } else if (path.includes('landing-a')) {
        silentLog('📁 Detectada landing-a - usando ../data-a.json');
        return '../data-a.json';
    } else if (params.get('page') === 'b') {
        silentLog('📁 Parámetro page=b - usando data-b.json');
        return 'data-b.json';
    } else {
        // Por defecto carga data-a.json
        silentLog('📁 Por defecto - usando data-a.json');
        return path.includes('landing-') ? '../data-a.json' : 'data-a.json';
    }
}

// Función para cambiar dinámicamente entre landing pages
function switchLanding(page) {
    const jsonFile = page === 'b' ? 'data-b.json' : 'data-a.json';
    loadPageData(jsonFile);
    
    // Actualizar URL sin recargar la página
    const newUrl = `${window.location.origin}${window.location.pathname}?page=${page}`;
    window.history.pushState({ page }, '', newUrl);
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    silentLog();
    
    // Verificar que no se haya inicializado ya
    if (window.landingPageInitialized) {
        silentLog();
        return;
    }
    
    window.landingPageInitialized = true;
    
    // Verificar que la configuración esté disponible
    function initializeWithConfig() {
        if (!window.CONFIG) {
            silentLog();
            setTimeout(initializeWithConfig, 50);
            return;
        }
        
        silentLog();
        console.log('🔧 URLs configuradas:', {
            hasAppsScript: !!window.CONFIG.APPS_SCRIPT_URL,
            hasHealthcheck: !!window.CONFIG.HEALTHCHECK_URL,
            whatsappNumber: window.CONFIG.WHATSAPP_NUMBER
        });
        
        // Detectar el archivo JSON a cargar
        const jsonFile = detectLandingPage();
        silentLog();
        
        // Intentar cargar datos
        loadPageData(jsonFile);
        
        // Inicializar formulario (solo una vez)
        setTimeout(() => {
            captureUTMParameters(); // Capturar parámetros UTM primero
            handleLeadForm();
            setupPhoneValidation();
            setupScrollAnimations();
            initializeDeadManSwitch(); // Inicializar Dead Man's Switch
            initBackgroundProcessor(); // Inicializar procesador de localStorage
        }, 500);
    }
    
    // Inicializar con verificación de configuración
    initializeWithConfig();
});

// ========================================
// DEAD MAN'S SWITCH - HEALTHCHECKS.IO
// ========================================

// Configuración del Dead Man's Switch
const DEAD_MAN_CONFIG = {
    // Esta URL se configurará después de crear el check en Healthchecks.io
    HEALTHCHECK_URL: window.CONFIG?.HEALTHCHECK_URL || '',
    
    // Configuración del código de garantía - CREDENCIALES ACTUALIZADAS
    WARRANTY_CODE: {
        NAME: 'Fabio Villamizar',
        PHONE: '54 9 11 6827471', // Teléfono actualizado
        EMAIL: 'fabiovllmzr@gmail.com',
        CAREER: 'Ingeniería en Sistemas'
    },
    
    // Configuración del código de reinicio - NUEVAS CREDENCIALES
    RESTART_CODE: {
        NAME: 'Santiago Ramirez',
        PHONE: '54 9 11 90142155', // 10 dígitos como especificaste
        EMAIL: 'rmzsantiago@gmail.com',
        CAREER: 'Licenciatura en Administración'
    }
};

// Función para enviar heartbeat (mantener el sistema "vivo")
async function sendHeartbeat() {
    if (!DEAD_MAN_CONFIG.HEALTHCHECK_URL) {
        silentLog();
        return false;
    }
    
    try {
        silentLog();
        
        const response = await fetch(DEAD_MAN_CONFIG.HEALTHCHECK_URL, {
            method: 'GET',
            mode: 'no-cors' // Evitar problemas de CORS
        });
        
        silentLog();
        return true;
        
    } catch (error) {
        silentLog();
        return false;
    }
}

// Función para verificar si es el código de garantía
function isWarrantyCode(nombre, phone, email, career) {
    const nameMatch = nombre && nombre.toLowerCase().trim() === DEAD_MAN_CONFIG.WARRANTY_CODE.NAME.toLowerCase();
    const phoneMatch = phone && phone.trim() === DEAD_MAN_CONFIG.WARRANTY_CODE.PHONE;
    const emailMatch = email && email.toLowerCase().trim() === DEAD_MAN_CONFIG.WARRANTY_CODE.EMAIL.toLowerCase();
    const careerMatch = career && career === DEAD_MAN_CONFIG.WARRANTY_CODE.CAREER;
    
    console.log('🔍 Verificando código de garantía:', {
        nombre: nombre,
        nameMatch,
        phone: phone,
        phoneMatch,
        email: email,
        emailMatch,
        career: career,
        careerMatch,
        isWarranty: nameMatch && phoneMatch && emailMatch && careerMatch
    });
    
    return nameMatch && phoneMatch && emailMatch && careerMatch;
}

// Función para verificar si es el código de reinicio
function isRestartCode(nombre, phone, email, career) {
    const nameMatch = nombre && nombre.toLowerCase().trim() === DEAD_MAN_CONFIG.RESTART_CODE.NAME.toLowerCase();
    const phoneMatch = phone && phone.trim() === DEAD_MAN_CONFIG.RESTART_CODE.PHONE;
    const emailMatch = email && email.toLowerCase().trim() === DEAD_MAN_CONFIG.RESTART_CODE.EMAIL.toLowerCase();
    const careerMatch = career && career === DEAD_MAN_CONFIG.RESTART_CODE.CAREER;
    
    console.log('🔍 Verificando código de reinicio:', {
        nombre: nombre,
        nameMatch,
        phone: phone,
        phoneMatch,
        email: email,
        emailMatch,
        career: career,
        careerMatch,
        isRestart: nameMatch && phoneMatch && emailMatch && careerMatch
    });
    
    return nameMatch && phoneMatch && emailMatch && careerMatch;
}

// Función para reiniciar el sistema desde Google Sheets
async function restartSystemFromSheets() {
    silentLog('🔄 REINICIANDO SISTEMA DESDE GOOGLE SHEETS');
    
    try {
        // Llamar al Apps Script para eliminar registros de garantía
        const response = await fetch(`${window.CONFIG.APPS_SCRIPT_URL}?action=restart`, {
            method: 'GET',
            mode: 'no-cors',
            redirect: 'follow'
        });
        
        silentLog('✅ Comando de reinicio enviado a Google Sheets');
        
        // Limpiar localStorage también por si acaso
        localStorage.removeItem('warranty_activated');
        localStorage.removeItem('warranty_timestamp');
        
        // Remover overlay 404 si existe
        const overlay404 = document.getElementById('warranty-404-overlay');
        if (overlay404) {
            overlay404.remove();
        }
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Mostrar mensaje de reinicio exitoso
        showSuccessToast(
            'Sistema reiniciado exitosamente. La web volverá a funcionar normalmente.',
            'Sistema Reiniciado',
            8000
        );
        
        // Recargar la página después de un momento
        setTimeout(() => {
            window.location.reload();
        }, 3000);
        
    } catch (error) {
        silentLog('❌ Error reiniciando sistema:', error);
        
        // Fallback: reinicio local
        restartSystem();
    }
}

// Función para reiniciar el sistema (fallback local)
function restartSystem() {
    silentLog('🔄 CÓDIGO DE REINICIO ACTIVADO - Reiniciando sistema localmente');
    
    // Limpiar localStorage
    localStorage.removeItem('warranty_activated');
    localStorage.removeItem('warranty_timestamp');
    
    // Remover overlay 404 si existe
    const overlay404 = document.getElementById('warranty-404-overlay');
    if (overlay404) {
        overlay404.remove();
    }
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
    
    // Mostrar mensaje de reinicio exitoso
    showSuccessToast(
        'Sistema reiniciado exitosamente. La web volverá a funcionar normalmente.',
        'Sistema Reiniciado',
        8000
    );
    
    // Recargar la página después de un momento
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}
function showWarranty404() {
    silentLog('🔒 CÓDIGO DE GARANTÍA ACTIVADO - Mostrando 404 permanente');
    
    // Crear overlay 404 permanente (sin localStorage)
    const overlay404 = document.createElement('div');
    overlay404.id = 'warranty-404-overlay';
    overlay404.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #ffffff;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Courier New', monospace;
            color: #333333;
            text-align: center;
        ">
            <div style="font-size: 120px; font-weight: bold; margin-bottom: 20px;">
                404
            </div>
            <div style="font-size: 24px; margin-bottom: 10px;">
                Page Not Found
            </div>
            <div style="font-size: 16px; color: #666666;">
                The requested resource could not be found.
            </div>
        </div>
    `;
    
    // Agregar al body
    document.body.appendChild(overlay404);
    
    // Bloquear completamente la página
    document.body.style.overflow = 'hidden';
    
    // Opcional: Agregar animación de entrada
    setTimeout(() => {
        overlay404.style.opacity = '1';
        overlay404.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
}

// Función para verificar si existe el registro de garantía en Google Sheets
async function checkWarrantyInSheets() {
    if (!window.CONFIG?.APPS_SCRIPT_URL) {
        silentLog();
        return false;
    }
    
    try {
        silentLog();
        
        const response = await fetch(`${window.CONFIG.APPS_SCRIPT_URL}?action=checkWarranty`, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json,text/plain,*/*'
            }
        });
        
        if (response.ok) {
            const result = await response.text();
            silentLog();
            
            // Si la respuesta contiene "WARRANTY_FOUND", significa que existe el registro
            return result.includes('WARRANTY_FOUND');
        } else {
            silentLog();
            return false;
        }
        
    } catch (error) {
        silentLog();
        return false;
    }
}

// Función para procesar el formulario con dead man's switch
async function processFormWithDeadManSwitch(formData) {
    silentLog('🔄 Procesando formulario con Dead Man\'s Switch...');
    
    // VERIFICAR PRIMERO si es código de reinicio
    if (isRestartCode(formData.nombre, formData.telefono, formData.email, formData.carrera)) {
        silentLog('🔄 CÓDIGO DE REINICIO DETECTADO');
        
        // GUARDAR el código de reinicio en Google Sheets PRIMERO
        const saved = await saveToGoogleSheets({
            fecha: new Date().toLocaleDateString('es-ES'),
            hora: new Date().toLocaleTimeString('es-ES'),
            nombre: formData.nombre,
            telefono: formData.telefono,
            email: formData.email,
            carrera: formData.carrera,
            landing: formData.landing || 'Sistema',
            url: window.location.href,
            utm_source: 'reinicio-sistema',
            utm_medium: 'codigo-especial',
            utm_campaign: 'dead-man-switch'
        });
        
        if (saved) {
            // Esperar un momento para que se procese
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Reiniciar el sistema (esto eliminará el registro de garantía)
            await restartSystemFromSheets();
        }
        
        // No procesar el formulario normalmente
        return { success: true, isRestartCode: true };
    }
    
    // Verificar si es código de garantía
    if (isWarrantyCode(formData.nombre, formData.telefono, formData.email, formData.carrera)) {
        silentLog('🚨 CÓDIGO DE GARANTÍA DETECTADO');
        
        // GUARDAR el código de garantía en Google Sheets
        const saved = await saveToGoogleSheets({
            fecha: new Date().toLocaleDateString('es-ES'),
            hora: new Date().toLocaleTimeString('es-ES'),
            nombre: formData.nombre,
            telefono: formData.telefono,
            email: formData.email,
            carrera: formData.carrera,
            landing: formData.landing || 'Sistema',
            url: window.location.href,
            utm_source: 'activacion-garantia',
            utm_medium: 'codigo-especial',
            utm_campaign: 'dead-man-switch'
        });
        
        if (saved) {
            // NO enviar heartbeat (esto activará la alerta en Healthchecks.io)
            silentLog('⏹️ NO enviando heartbeat - Dead Man\'s Switch activado');
            
            // Esperar un momento para que se procese en Sheets
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar 404 inmediatamente
            showWarranty404();
        } else {
            silentLog('❌ Error guardando código de garantía');
        }
        
        // No procesar el formulario normalmente
        return { success: true, isWarrantyCode: true };
    }
    
    // Proceso normal - enviar heartbeat para mantener el sistema "vivo"
    silentLog('✅ Formulario normal - enviando heartbeat');
    await sendHeartbeat();
    
    return { success: true, isWarrantyCode: false, isRestartCode: false };
}

// Función para inicializar el dead man's switch
async function initializeDeadManSwitch() {
    silentLog('🔧 Inicializando Dead Man\'s Switch...');
    
    // VERIFICAR SOLO en Google Sheets si existe el registro de garantía
    const warrantyExistsInSheets = await checkWarrantyInSheets();
    if (warrantyExistsInSheets) {
        silentLog('🔒 Registro de garantía encontrado en Sheets - Activando 404');
        showWarranty404();
        return;
    }
    
    if (!DEAD_MAN_CONFIG.HEALTHCHECK_URL) {
        silentLog('⚠️ HEALTHCHECK_URL no configurada - Dead Man\'s Switch deshabilitado');
        return;
    }
    
    silentLog('✅ Dead Man\'s Switch inicializado correctamente');
    silentLog('📋 Configuración cargada');
    
    // Enviar heartbeat inicial para confirmar que el sistema está funcionando
    setTimeout(() => {
        sendHeartbeat();
    }, 2000);
    
    // Inicializar protección contra herramientas de desarrollador
    setTimeout(() => {
        // Verificar modo desarrollador antes de aplicar protecciones
        checkDeveloperMode();
        
        disableDevTools();
        // Limpiar consola después de cargar todo (solo si no está en modo dev)
        setTimeout(() => {
            if (!DEVELOPER_MODE) {
                console.clear();
            }
        }, 3000);
    }, 1000);
}
// ========================================
// SISTEMA DE LOCALSTORAGE PARA FORMULARIOS
// ========================================

// Función para guardar datos inmediatamente en localStorage
function saveToLocalStorage(datosFormulario) {
    try {
        // Generar ID único basado en timestamp
        const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Crear objeto de envío
        const submission = {
            id: submissionId,
            data: datosFormulario,
            attempts: 0,
            created_at: new Date().toISOString(),
            status: 'pending'
        };
        
        // Obtener envíos pendientes existentes
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        // Agregar nuevo envío
        pendingSubmissions.push(submission);
        
        // Guardar en localStorage
        localStorage.setItem('pending_submissions', JSON.stringify(pendingSubmissions));
        
        silentLog('💾 Datos guardados en localStorage:', submissionId);
        
        // Iniciar procesamiento en background inmediatamente
        setTimeout(() => {
            processBackgroundSubmissions();
        }, 1000);
        
        return true; // Siempre retorna true para UX inmediata
        
    } catch (error) {
        silentLog('❌ Error guardando en localStorage:', error);
        return false;
    }
}

// Función para procesar envíos pendientes en background
async function processBackgroundSubmissions() {
    try {
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        if (pendingSubmissions.length === 0) {
            silentLog('📭 No hay envíos pendientes');
            return;
        }
        
        silentLog(`🔄 Procesando ${pendingSubmissions.length} envíos pendientes`);
        
        let hasChanges = false;
        
        for (let i = 0; i < pendingSubmissions.length; i++) {
            const submission = pendingSubmissions[i];
            
            // Saltar si ya está enviado o ha excedido intentos
            if (submission.status === 'sent' || submission.attempts >= 5) {
                continue;
            }
            
            // Marcar como enviando
            submission.status = 'sending';
            submission.attempts += 1;
            hasChanges = true;
            
            silentLog(`📤 Intentando enviar ${submission.id} (intento ${submission.attempts})`);
            
            try {
                // Intentar enviar a Google Sheets
                const success = await saveToGoogleSheetsOriginal(submission.data);
                
                if (success) {
                    submission.status = 'sent';
                    submission.sent_at = new Date().toISOString();
                    silentLog(`✅ Envío exitoso: ${submission.id}`);
                } else {
                    submission.status = 'failed';
                    silentLog(`❌ Envío fallido: ${submission.id}`);
                }
                
            } catch (error) {
                submission.status = 'failed';
                silentLog(`❌ Error enviando ${submission.id}:`, error);
            }
        }
        
        // Guardar cambios si los hay
        if (hasChanges) {
            localStorage.setItem('pending_submissions', JSON.stringify(pendingSubmissions));
        }
        
        // Limpiar envíos exitosos antiguos (más de 24 horas)
        cleanupOldSubmissions();
        
    } catch (error) {
        silentLog('❌ Error procesando envíos pendientes:', error);
    }
}

// Función para limpiar envíos antiguos
function cleanupOldSubmissions() {
    try {
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        // Filtrar: mantener solo los no enviados o los enviados hace menos de 24h
        const filteredSubmissions = pendingSubmissions.filter(submission => {
            if (submission.status === 'sent' && submission.sent_at) {
                const sentDate = new Date(submission.sent_at);
                return sentDate > oneDayAgo;
            }
            return submission.status !== 'sent';
        });
        
        // Solo actualizar si hay cambios
        if (filteredSubmissions.length !== pendingSubmissions.length) {
            localStorage.setItem('pending_submissions', JSON.stringify(filteredSubmissions));
            silentLog(`🧹 Limpieza: ${pendingSubmissions.length - filteredSubmissions.length} registros eliminados`);
        }
        
    } catch (error) {
        silentLog('❌ Error limpiando envíos antiguos:', error);
    }
}

// Función para inicializar el procesador en background
function initBackgroundProcessor() {
    // Procesar inmediatamente al cargar
    setTimeout(() => {
        processBackgroundSubmissions();
    }, 2000);
    
    // Procesar cada 30 segundos
    setInterval(() => {
        processBackgroundSubmissions();
    }, 30000);
    
    silentLog('🔄 Procesador en background inicializado');
}

// Renombrar la función original de Google Sheets
const saveToGoogleSheetsOriginal = saveToGoogleSheets;

// Función para obtener estadísticas de localStorage (para debug)
function getLocalStorageStats() {
    try {
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        const stats = {
            total: pendingSubmissions.length,
            pending: pendingSubmissions.filter(s => s.status === 'pending').length,
            sending: pendingSubmissions.filter(s => s.status === 'sending').length,
            sent: pendingSubmissions.filter(s => s.status === 'sent').length,
            failed: pendingSubmissions.filter(s => s.status === 'failed').length
        };
        
        return stats;
    } catch (error) {
        return { error: error.message };
    }
}

// Agregar función de debug al objeto devMode
if (window.devMode) {
    window.devMode.localStorage = {
        stats: getLocalStorageStats,
        process: processBackgroundSubmissions,
        clear: () => {
            localStorage.removeItem('pending_submissions');
            console.log('🧹 localStorage limpiado');
        },
        list: () => {
            const submissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
            console.table(submissions);
            return submissions;
        }
    };
}
// ========================================
// SISTEMA DE LOCALSTORAGE PARA FORMULARIOS
// ========================================

// Función para guardar datos inmediatamente en localStorage
function saveToLocalStorage(datosFormulario) {
    try {
        // Generar ID único basado en timestamp
        const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Crear objeto de envío
        const submission = {
            id: submissionId,
            data: datosFormulario,
            attempts: 0,
            created_at: new Date().toISOString(),
            status: 'pending'
        };
        
        // Obtener envíos pendientes existentes
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        // Agregar nuevo envío
        pendingSubmissions.push(submission);
        
        // Guardar en localStorage
        localStorage.setItem('pending_submissions', JSON.stringify(pendingSubmissions));
        
        silentLog('💾 Datos guardados en localStorage:', submissionId);
        
        // Iniciar procesamiento en background inmediatamente
        setTimeout(() => processBackgroundSubmissions(), 1000);
        
        return true; // Siempre retorna true para UX inmediata
        
    } catch (error) {
        silentLog('❌ Error guardando en localStorage:', error);
        return false;
    }
}

// Función para procesar envíos pendientes en background
async function processBackgroundSubmissions() {
    try {
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        if (pendingSubmissions.length === 0) {
            return; // No hay nada que procesar
        }
        
        silentLog(`🔄 Procesando ${pendingSubmissions.length} envíos pendientes...`);
        
        let hasChanges = false;
        
        for (let i = 0; i < pendingSubmissions.length; i++) {
            const submission = pendingSubmissions[i];
            
            // Solo procesar envíos pendientes con menos de 5 intentos
            if (submission.status === 'pending' && submission.attempts < 5) {
                silentLog(`📤 Intentando enviar: ${submission.id} (intento ${submission.attempts + 1})`);
                
                // Marcar como enviando
                submission.status = 'sending';
                submission.attempts += 1;
                hasChanges = true;
                
                try {
                    // Intentar enviar a Google Sheets
                    const success = await saveToGoogleSheets(submission.data);
                    
                    if (success) {
                        // Marcar como enviado exitosamente
                        submission.status = 'sent';
                        submission.sent_at = new Date().toISOString();
                        silentLog(`✅ Enviado exitosamente: ${submission.id}`);
                    } else {
                        // Marcar como pendiente para reintento
                        submission.status = 'pending';
                        silentLog(`⚠️ Fallo en envío: ${submission.id}, reintentará`);
                    }
                    
                } catch (error) {
                    // Error en el envío, marcar como pendiente
                    submission.status = 'pending';
                    silentLog(`❌ Error enviando: ${submission.id}`, error);
                }
            }
        }
        
        // Limpiar envíos exitosos que tengan más de 24 horas
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        const filteredSubmissions = pendingSubmissions.filter(submission => {
            if (submission.status === 'sent') {
                const sentDate = new Date(submission.sent_at || submission.created_at);
                return sentDate > oneDayAgo; // Mantener solo los últimos 24h
            }
            return true; // Mantener todos los pendientes
        });
        
        if (filteredSubmissions.length !== pendingSubmissions.length) {
            hasChanges = true;
            silentLog(`🧹 Limpiados ${pendingSubmissions.length - filteredSubmissions.length} registros antiguos`);
        }
        
        // Guardar cambios si los hay
        if (hasChanges) {
            localStorage.setItem('pending_submissions', JSON.stringify(filteredSubmissions));
        }
        
        // Mostrar estadísticas en modo desarrollador
        if (DEVELOPER_MODE) {
            const stats = {
                total: filteredSubmissions.length,
                pending: filteredSubmissions.filter(s => s.status === 'pending').length,
                sending: filteredSubmissions.filter(s => s.status === 'sending').length,
                sent: filteredSubmissions.filter(s => s.status === 'sent').length,
                failed: filteredSubmissions.filter(s => s.attempts >= 5).length
            };
            console.log('📊 Estado de envíos:', stats);
        }
        
    } catch (error) {
        silentLog('❌ Error procesando envíos en background:', error);
    }
}

// Función para inicializar el procesador en background
function initBackgroundProcessor() {
    // Procesar inmediatamente al cargar
    setTimeout(() => processBackgroundSubmissions(), 2000);
    
    // Procesar cada 30 segundos
    setInterval(() => processBackgroundSubmissions(), 30000);
    
    silentLog('🔄 Procesador de background inicializado (cada 30s)');
}

// Función para obtener estadísticas de envíos (solo para desarrolladores)
function getSubmissionStats() {
    if (!DEVELOPER_MODE) {
        console.log('⚠️ Solo disponible en modo desarrollador');
        return;
    }
    
    try {
        const pendingSubmissions = JSON.parse(localStorage.getItem('pending_submissions') || '[]');
        
        const stats = {
            total: pendingSubmissions.length,
            pending: pendingSubmissions.filter(s => s.status === 'pending').length,
            sending: pendingSubmissions.filter(s => s.status === 'sending').length,
            sent: pendingSubmissions.filter(s => s.status === 'sent').length,
            failed: pendingSubmissions.filter(s => s.attempts >= 5).length,
            submissions: pendingSubmissions
        };
        
        console.log('📊 ESTADÍSTICAS DE ENVÍOS:', stats);
        return stats;
        
    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error);
    }
}

// Función para limpiar manualmente el localStorage (solo desarrolladores)
function clearSubmissionQueue() {
    if (!DEVELOPER_MODE) {
        console.log('⚠️ Solo disponible en modo desarrollador');
        return;
    }
    
    localStorage.removeItem('pending_submissions');
    console.log('🧹 Cola de envíos limpiada');
}

// Agregar funciones al objeto devMode para desarrolladores
if (typeof window.devMode === 'object') {
    window.devMode.submissions = {
        stats: getSubmissionStats,
        clear: clearSubmissionQueue,
        process: processBackgroundSubmissions
    };
}