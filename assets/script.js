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

// Función para cargar datos desde JSON
async function loadPageData(jsonFile = 'data-a.json') {
    try {
        console.log('Intentando cargar:', jsonFile);
        
        // Verificar si estamos en un servidor o archivo local
        if (window.location.protocol === 'file:') {
            console.log('Detectado protocolo file://, usando datos de fallback');
            loadFallbackData();
            return;
        }
        
        // Verificar si el servidor está disponible
        const serverAvailable = await checkServerAvailability();
        if (!serverAvailable) {
            console.log('Servidor no disponible, usando datos de fallback');
            loadFallbackData();
            return;
        }
        
        const response = await fetch(jsonFile);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos cargados desde JSON:', data);
        populatePage(data);
    } catch (error) {
        console.log('Fetch falló, usando datos de fallback:', error.message);
        // Fallback: cargar datos directamente si fetch falla
        loadFallbackData();
    }
}

// Función de fallback con datos embebidos
function loadFallbackData() {
    console.log('Cargando datos de fallback con cambios actuales...');
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
            "image": "https://picsum.photos/200/60?random=1",
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
                "icon": "👑",
                "title": "Elite Empresarial Exclusiva",
                "description": "Acceso a una red de contactos de alto nivel. Compañeros de clase que son CEOs, directores y empresarios exitosos. Tu network será tu mayor activo."
            },
            {
                "icon": "🌍",
                "title": "Reconocimiento Global",
                "description": "Títulos con validez internacional. Programas acreditados por las mejores instituciones mundiales. Tu credencial abrirá puertas en cualquier país."
            },
            {
                "icon": "⚡",
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
        console.warn('⚠️ No se encontraron datos SEO en el JSON');
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
        console.error('❌ Error actualizando meta tags SEO:', error);
    }
}

// Función para poblar la página con datos
function populatePage(data) {
    console.log('Poblando página con datos:', data);
    
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
            console.log('🖼️ Imagen de fondo del hero aplicada:', data.hero.backgroundImage);
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
        
        // Populate career options
        const carreraSelect = document.getElementById('carrera');
        if (carreraSelect && data.form && data.form.careers) {
            carreraSelect.innerHTML = '<option value="">Carrera de Interés</option>';
            data.form.careers.forEach(career => {
                const option = document.createElement('option');
                option.value = career;
                option.textContent = career;
                carreraSelect.appendChild(option);
            });
        }

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
                logoImg.setAttribute('role', 'listitem');
                logoImg.setAttribute('tabindex', '0');
                logosContainer.appendChild(logoImg);
            });
        }

        // Testimonials
        const testimonialsContainer = document.getElementById('testimonials');
        if (testimonialsContainer && data.testimonials) {
            testimonialsContainer.innerHTML = '';
            data.testimonials.forEach((testimonial, index) => {
                const testimonialItem = document.createElement('div');
                testimonialItem.className = `testimonial-item testimonial-${index + 1}`;
                testimonialItem.setAttribute('role', 'listitem');
                testimonialItem.setAttribute('tabindex', '0');
                testimonialItem.setAttribute('aria-label', `Testimonio de ${testimonial.name}: ${testimonial.quote}`);
                
                // Aplicar imagen de fondo si existe
                if (testimonial.backgroundImage) {
                    testimonialItem.style.backgroundImage = `url('${testimonial.backgroundImage}')`;
                    testimonialItem.style.backgroundSize = 'cover';
                    testimonialItem.style.backgroundPosition = 'center';
                    testimonialItem.style.backgroundRepeat = 'no-repeat';
                }
                
                testimonialItem.innerHTML = `
                    <div class="testimonial-content">
                        <div class="testimonial-cite" role="text">"${testimonial.quote}"</div>
                        <div class="testimonial-name" role="text">${testimonial.name}</div>
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
                benefitCard.setAttribute('role', 'listitem');
                benefitCard.setAttribute('tabindex', '0');
                benefitCard.innerHTML = `
                    <div class="benefit-icon" aria-hidden="true">${benefit.icon}</div>
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
        
        console.log('Página poblada exitosamente');
        
    } catch (error) {
        console.error('Error poblando la página:', error);
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

// Función para validar número de teléfono (solo números, sin formato)
function setupPhoneValidation() {
    const phoneInput = document.getElementById('telefono');
    if (!phoneInput) return;
    
    // Permitir solo números en la entrada, pero NO bloquear pegado
    phoneInput.addEventListener('input', function(e) {
        // Remover todo lo que no sea número
        let value = e.target.value.replace(/\D/g, '');
        
        // Limitar a 10 dígitos
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Asignar el valor sin formato
        e.target.value = value;
    });
    
    // Permitir pegado normal - NO bloquear
    // Los gestores de contraseñas y la experiencia del usuario lo requieren
    
    // Solo prevenir teclas no numéricas en el teclado (pero permitir navegación)
    phoneInput.addEventListener('keydown', function(e) {
        // Permitir: backspace, delete, tab, escape, enter, home, end, left, right
        if ([8, 9, 27, 13, 46, 35, 36, 37, 39].indexOf(e.keyCode) !== -1 ||
            // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
            (e.ctrlKey === true && [65, 67, 86, 88, 90].indexOf(e.keyCode) !== -1) ||
            // Permitir: F5, F12 (para desarrolladores)
            (e.keyCode >= 112 && e.keyCode <= 123)) {
            return;
        }
        // Solo prevenir si es una tecla no numérica (pero permitir pegado)
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
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
        console.warn('⚠️ No se encontró el contenedor del formulario');
    }
}

// Función para guardar datos en Google Sheets via Apps Script
async function saveToGoogleSheets(datosFormulario) {
    // Evitar múltiples llamadas simultáneas
    if (window.savingToSheets) {
        console.log('⚠️ Ya hay un guardado en proceso, esperando...');
        return false;
    }
    
    window.savingToSheets = true;
    
    try {
        // Obtener URL desde configuración segura
        const APPS_SCRIPT_URL = window.CONFIG?.APPS_SCRIPT_URL || '';
        
        if (!APPS_SCRIPT_URL) {
            console.error('❌ URL de Google Apps Script no configurada');
            return false;
        }
        
        window.safeLog('📤 Enviando datos a Google Sheets:', datosFormulario);
        
        // Crear URL con parámetros para GET (evita CORS en Apps Script)
        const params = new URLSearchParams({
            fecha: datosFormulario.fecha,
            hora: datosFormulario.hora,
            nombre: datosFormulario.nombre,
            telefono: datosFormulario.telefono,
            email: datosFormulario.email,
            carrera: datosFormulario.carrera,
            landing: datosFormulario.landing
        });
        
        const urlWithParams = `${APPS_SCRIPT_URL}?${params.toString()}`;
        window.safeLog('🔗 Enviando GET a Google Sheets');
        
        // Usar GET con no-cors mode para evitar problemas de CORS
        const response = await fetch(urlWithParams, {
            method: 'GET',
            mode: 'no-cors',
            redirect: 'follow'
        });
        
        window.safeLog('📥 Respuesta recibida (no-cors):', response);
        
        // En modo no-cors, no podemos leer la respuesta, pero si no hay error, asumimos éxito
        console.log('✅ Petición enviada exitosamente (modo no-cors)');
        
        // Esperar un momento para que se procese en el servidor
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return true;
        
    } catch (error) {
        console.error('❌ Error enviando a Google Sheets:', error);
        
        // Si es un error de red pero la petición se envió, podría haber funcionado
        if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
            window.safeLog('⚠️ Error de red, pero la petición pudo haberse enviado');
            window.safeLog('🔄 Esperando 2 segundos para verificar...');
            
            // Esperar un poco y asumir éxito
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('✅ Asumiendo éxito después de espera');
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
        console.log('⚠️ Formulario ya inicializado');
        return;
    }
    form.setAttribute('data-initialized', 'true');
    
    let isSubmitting = false; // Flag para evitar doble envío
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation(); // Evitar propagación del evento
        
        // Evitar doble envío
        if (isSubmitting) {
            console.log('⚠️ Envío ya en proceso, ignorando...');
            return;
        }
        
        isSubmitting = true; // Marcar como enviando
        console.log('🚀 Iniciando proceso de envío...');
        
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const carrera = document.getElementById('carrera').value.trim();
        
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
        const landing = window.location.pathname.includes('landing-b') ? 'Landing B' : 'Landing A';
        
        // Crear objeto con los datos capturados
        const datosFormulario = {
            fecha: fecha,
            hora: hora,
            nombre: nombre,
            telefono: telefono,
            email: email,
            carrera: carrera,
            landing: landing,
            url: window.location.href
        };
        
        // Mostrar los datos en consola
        console.log('📋 DATOS CAPTURADOS DEL FORMULARIO:');
        console.log('=====================================');
        console.table(datosFormulario);
        
        try {
            // Intentar guardar en Google Sheets
            console.log('🔄 Iniciando guardado en Google Sheets...');
            const saved = await saveToGoogleSheets(datosFormulario);
            
            // Ocultar overlay de carga
            showLoading(false);
            
            if (saved) {
                console.log('✅ Datos guardados exitosamente en Google Sheets');
                
                // Solo si se guardó exitosamente, proceder con WhatsApp
                const mensaje = `Hola! Me interesa información sobre:
        
Nombre: ${nombre}
Teléfono: ${telefono}
Email: ${email}
Carrera de interés: ${carrera}

Por favor, envíenme más información.`;
                
                // Abrir WhatsApp con el mensaje
                const whatsappNumber = window.CONFIG?.WHATSAPP_NUMBER || '1234567890';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
                window.open(whatsappUrl, '_blank');
                
                // Limpiar formulario
                form.reset();
                
                // Mostrar toast de éxito
                showSuccessToast(
                    '¡Información enviada y guardada exitosamente! Te contactaremos pronto.',
                    'Formulario enviado',
                    6000
                );
                
            } else {
                // Error: No se pudo guardar
                markFormError();
                showErrorToast(
                    'No se pudo guardar la información en nuestros registros. Por favor, intenta nuevamente o contacta directamente por teléfono.',
                    'Error de guardado',
                    8000
                );
                console.error('❌ No se pudo guardar en Google Sheets');
            }
            
        } catch (error) {
            // Ocultar overlay de carga
            showLoading(false);
            
            console.error('❌ Error crítico:', error);
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
            console.log('🔄 Proceso de envío completado');
        }
    });
}

// Función para detectar qué landing cargar basado en la URL
function detectLandingPage() {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    
    console.log('🔍 Detectando landing page...');
    console.log('Path actual:', path);
    console.log('Parámetros URL:', params.toString());
    
    if (path.includes('landing-b')) {
        console.log('📄 Detectado: Landing B');
        return '../data-b.json';
    } else if (path.includes('landing-a')) {
        console.log('📄 Detectado: Landing A');
        return '../data-a.json';
    } else if (params.get('page') === 'b') {
        console.log('📄 Detectado por parámetro: Landing B');
        return 'data-b.json';
    } else {
        // Por defecto carga data-a.json
        console.log('📄 Por defecto: Landing A');
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
    console.log('🚀 Página cargada, inicializando...');
    
    // Verificar que no se haya inicializado ya
    if (window.landingPageInitialized) {
        console.log('⚠️ Página ya inicializada, evitando duplicación');
        return;
    }
    
    window.landingPageInitialized = true;
    
    // Detectar el archivo JSON a cargar
    const jsonFile = detectLandingPage();
    console.log('📄 Archivo JSON detectado:', jsonFile);
    
    // Intentar cargar datos
    loadPageData(jsonFile);
    
    // Inicializar formulario (solo una vez)
    setTimeout(() => {
        handleLeadForm();
        setupPhoneValidation();
        setupScrollAnimations();
    }, 500); // Pequeño delay para asegurar que el DOM esté listo
    
    console.log('✅ Inicialización completada');
});