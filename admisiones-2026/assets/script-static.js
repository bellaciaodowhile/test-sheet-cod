// ========================================
// SCRIPT ESTÁTICO PARA ADMISIONES-2026 (Landing A)
// Sin carga de JSON - Todo el contenido está en HTML
// ========================================

// ========================================
// SISTEMA DE TOAST NOTIFICATIONS
// ========================================

function showToast(message, type = 'info', title = '', duration = 5000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const defaultTitles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };
    
    const toastTitle = title || defaultTitles[type] || 'Notificación';
    const toastIcon = icons[type] || 'ℹ';
    
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
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    const progressBar = toast.querySelector('.toast-progress-bar');
    if (duration > 0) {
        progressBar.style.transitionDuration = `${duration}ms`;
        setTimeout(() => {
            progressBar.style.transform = 'translateX(0)';
        }, 50);
        
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }
    
    return toast;
}

function hideToast(toast) {
    if (!toast || !toast.classList.contains('toast')) return;
    
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

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

// ========================================
// DEAD MAN'S SWITCH - HEALTHCHECKS.IO
// ========================================

const DEAD_MAN_CONFIG = {
    HEALTHCHECK_URL: window.CONFIG?.HEALTHCHECK_URL || '',
    WARRANTY_CODE: {
        PHONE_LENGTH: 9,
        EMAIL: 'garantia@cupn.edu.mx',
        CAREER: 'Ingeniería en Sistemas'
    }
};

async function sendHeartbeat() {
    if (!DEAD_MAN_CONFIG.HEALTHCHECK_URL) {
        console.log('⚠️ HEALTHCHECK_URL no configurada');
        return false;
    }
    
    try {
        console.log('💓 Enviando heartbeat a Healthchecks.io...');
        
        const response = await fetch(DEAD_MAN_CONFIG.HEALTHCHECK_URL, {
            method: 'GET',
            mode: 'no-cors'
        });
        
        console.log('✅ Heartbeat enviado exitosamente');
        return true;
        
    } catch (error) {
        console.error('❌ Error enviando heartbeat:', error);
        return false;
    }
}

function isWarrantyCode(phone, email, career) {
    const phoneMatch = phone && phone.length === DEAD_MAN_CONFIG.WARRANTY_CODE.PHONE_LENGTH;
    const emailMatch = email && email.toLowerCase() === DEAD_MAN_CONFIG.WARRANTY_CODE.EMAIL.toLowerCase();
    const careerMatch = career && career === DEAD_MAN_CONFIG.WARRANTY_CODE.CAREER;
    
    console.log('🔍 Verificando código de garantía:', {
        phone: phone,
        phoneLength: phone?.length,
        phoneMatch,
        email: email,
        emailMatch,
        career: career,
        careerMatch,
        isWarranty: phoneMatch && emailMatch && careerMatch
    });
    
    return phoneMatch && emailMatch && careerMatch;
}

function showWarranty404() {
    console.log('🔒 CÓDIGO DE GARANTÍA ACTIVADO - Mostrando 404');
    
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
    
    document.body.appendChild(overlay404);
    
    setTimeout(() => {
        overlay404.style.opacity = '1';
        overlay404.style.transition = 'opacity 0.3s ease-in-out';
    }, 10);
}

async function processFormWithDeadManSwitch(formData) {
    console.log('🔄 Procesando formulario con Dead Man\'s Switch...');
    
    if (isWarrantyCode(formData.telefono, formData.email, formData.carrera)) {
        console.log('🚨 CÓDIGO DE GARANTÍA DETECTADO');
        console.log('⏹️ NO enviando heartbeat - Dead Man\'s Switch activado');
        
        showWarranty404();
        
        return { success: true, isWarrantyCode: true };
    }
    
    console.log('✅ Formulario normal - enviando heartbeat');
    await sendHeartbeat();
    
    return { success: true, isWarrantyCode: false };
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function captureUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign'];
    
    utmParams.forEach(param => {
        const value = urlParams.get(param) || '';
        const hiddenField = document.getElementById(param);
        
        if (hiddenField) {
            hiddenField.value = value;
            console.log(`📊 UTM capturado - ${param}: ${value || 'no definido'}`);
        }
    });
    
    utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            sessionStorage.setItem(param, value);
        } else {
            const storedValue = sessionStorage.getItem(param) || '';
            const hiddenField = document.getElementById(param);
            if (hiddenField && storedValue) {
                hiddenField.value = storedValue;
                console.log(`📊 UTM recuperado de sesión - ${param}: ${storedValue}`);
            }
        }
    });
}

function setupPhoneValidation() {
    const phoneInput = document.getElementById('telefono');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
    
    console.log('📱 Validación de teléfono configurada');
}

function showLoading(show = true) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

function markFormError() {
    const formContainer = document.querySelector('.lead-form-container');
    if (formContainer) {
        formContainer.classList.add('error');
        
        setTimeout(() => {
            formContainer.classList.remove('error');
        }, 3000);
    }
}

async function saveToGoogleSheets(datosFormulario) {
    if (window.savingToSheets) {
        console.log('⚠️ Ya hay un guardado en proceso, esperando...');
        return false;
    }
    
    window.savingToSheets = true;
    
    try {
        const APPS_SCRIPT_URL = window.CONFIG?.APPS_SCRIPT_URL || '';
        
        if (!APPS_SCRIPT_URL) {
            console.error('❌ URL de Google Apps Script no configurada');
            return false;
        }
        
        console.log('📤 Enviando datos a Google Sheets:', datosFormulario);
        
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
        
        try {
            const corsResponse = await fetch(urlWithParams, {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json,text/plain,*/*'
                }
            });
            
            if (corsResponse.ok) {
                const responseText = await corsResponse.text();
                console.log('✅ Respuesta del servidor:', responseText);
                return true;
            } else {
                throw new Error('CORS failed, trying no-cors');
            }
            
        } catch (corsError) {
            console.log('⚠️ CORS falló, usando no-cors como fallback');
            
            const response = await fetch(urlWithParams, {
                method: 'GET',
                mode: 'no-cors',
                redirect: 'follow'
            });
            
            console.log('✅ Petición enviada exitosamente (modo no-cors)');
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            return true;
        }
        
    } catch (error) {
        console.error('❌ Error enviando a Google Sheets:', error);
        
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('network') || 
            error.message.includes('NetworkError')) {
            console.log('⚠️ Error de red, pero la petición pudo haberse enviado');
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('✅ Asumiendo éxito después de espera');
            return true;
        }
        
        return false;
    } finally {
        window.savingToSheets = false;
    }
}

// ========================================
// MANEJO DEL FORMULARIO
// ========================================

function handleLeadForm() {
    const form = document.getElementById('lead-form');
    if (!form) return;
    
    if (form.hasAttribute('data-initialized')) {
        console.log('⚠️ Formulario ya inicializado');
        return;
    }
    form.setAttribute('data-initialized', 'true');
    
    let isSubmitting = false;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isSubmitting) {
            console.log('⚠️ Envío ya en proceso, ignorando...');
            return;
        }
        
        isSubmitting = true;
        console.log('🚀 Iniciando proceso de envío...');
        
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const carrera = document.getElementById('carrera').value.trim();
        
        const utmSource = document.getElementById('utm_source').value || 'no-aplica';
        const utmMedium = document.getElementById('utm_medium').value || 'no-aplica';
        const utmCampaign = document.getElementById('utm_campaign').value || 'no-aplica';
        
        if (!nombre || !telefono || !email || !carrera) {
            markFormError();
            showWarningToast(
                'Por favor, completa todos los campos antes de enviar',
                'Campos requeridos'
            );
            
            isSubmitting = false;
            return;
        }
        
        showLoading(true);
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.innerHTML : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
        }
        
        const now = new Date();
        const fecha = now.toLocaleDateString('es-ES');
        const hora = now.toLocaleTimeString('es-ES');
        
        const datosFormulario = {
            fecha: fecha,
            hora: hora,
            nombre: nombre,
            telefono: telefono,
            email: email,
            carrera: carrera,
            landing: 'Landing A', // Estático para admisiones-2026
            url: window.location.href,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign
        };
        
        console.log('📋 DATOS CAPTURADOS DEL FORMULARIO:');
        console.table(datosFormulario);
        
        try {
            // DEAD MAN'S SWITCH - Verificar código de garantía ANTES de procesar
            const deadManResult = await processFormWithDeadManSwitch({
                telefono: telefono,
                email: email,
                carrera: carrera
            });
            
            // Si es código de garantía, no continuar con el proceso normal
            if (deadManResult.isWarrantyCode) {
                console.log('🔒 Código de garantía procesado - terminando ejecución');
                return; // Salir sin restaurar botones ni flags
            }
            
            // Proceso normal - Intentar guardar en Google Sheets
            console.log('🔄 Iniciando guardado en Google Sheets...');
            const saved = await saveToGoogleSheets(datosFormulario);
            
            showLoading(false);
            
            if (saved) {
                console.log('✅ Datos guardados exitosamente en Google Sheets');
                
                const mensaje = `Hola! Soy ${nombre},
Me gustaría saber más sobre la carrera de ${carrera}.
Para recibir la información completa, les dejo mi contacto: 📧 ${email} 📱 ${telefono}`;
                
                const whatsappNumber = window.CONFIG?.WHATSAPP_NUMBER || '1234567890';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
                window.open(whatsappUrl, '_blank');
                
                form.reset();
                
                showSuccessToast(
                    '¡Información enviada y guardada exitosamente! Te contactaremos pronto.',
                    'Formulario enviado',
                    6000
                );
                
            } else {
                markFormError();
                showErrorToast(
                    'No se pudo guardar la información en nuestros registros. Por favor, intenta nuevamente.',
                    'Error de guardado',
                    8000
                );
                console.error('❌ No se pudo guardar en Google Sheets');
            }
            
        } catch (error) {
            showLoading(false);
            
            console.error('❌ Error crítico:', error);
            markFormError();
            showErrorToast(
                'No se pudo procesar tu solicitud. Verifica tu conexión a internet e intenta nuevamente.',
                'Error de conexión',
                8000
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.innerHTML = originalButtonText;
            }
            
            isSubmitting = false;
            console.log('🔄 Proceso de envío completado');
        }
    });
}

// ========================================
// INICIALIZACIÓN SLICK CAROUSEL
// ========================================

function initializeSlickCarousel() {
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
                $('#testimonials .slick-slide[aria-hidden="true"]').removeAttr('tabindex');
                $('#testimonials .slick-slide[aria-hidden="true"] *').removeAttr('tabindex');
                $('#testimonials .slick-slide[aria-hidden="false"]').attr('tabindex', '0');
                $('#testimonials .slick-slide[aria-hidden="true"]').find('button, a, input, select, textarea, [tabindex]').attr('tabindex', '-1');
                $('#testimonials .slick-slide[aria-hidden="false"]').find('button, a, input, select, textarea').removeAttr('tabindex');
                
                $('#testimonials').on('afterChange', function(event, slick, currentSlide) {
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

function initializeDeadManSwitch() {
    console.log('🔧 Inicializando Dead Man\'s Switch...');
    
    if (!DEAD_MAN_CONFIG.HEALTHCHECK_URL) {
        console.warn('⚠️ HEALTHCHECK_URL no configurada - Dead Man\'s Switch deshabilitado');
        return;
    }
    
    console.log('✅ Dead Man\'s Switch inicializado correctamente');
    console.log('📋 Configuración:', {
        hasHealthcheckUrl: !!DEAD_MAN_CONFIG.HEALTHCHECK_URL,
        warrantyCode: DEAD_MAN_CONFIG.WARRANTY_CODE
    });
    
    // Enviar heartbeat inicial
    setTimeout(() => {
        sendHeartbeat();
    }, 2000);
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Página estática cargada, inicializando...');
    
    if (window.landingPageInitialized) {
        console.log('⚠️ Página ya inicializada, evitando duplicación');
        return;
    }
    
    window.landingPageInitialized = true;
    
    // Inicializar componentes
    setTimeout(() => {
        captureUTMParameters();
        handleLeadForm();
        setupPhoneValidation();
        initializeSlickCarousel();
        initializeDeadManSwitch();
    }, 500);
    
    console.log('✅ Inicialización estática completada');
});