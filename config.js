// ========================================
// CONFIGURACIÓN DE VARIABLES DE ENTORNO
// Compatible con Vercel y hosting tradicional
// ========================================

// Función para obtener variables de entorno o configuración
function getConfig() {
    // Verificar si estamos en desarrollo o producción
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost') ||
                         window.location.port !== '';
    
    // Si ya tenemos ENV cargado desde el servidor (Vercel/PHP), usarlo
    if (window.ENV) {
        console.log('🔧 Usando configuración del servidor');
        return window.ENV;
    }
    
    // Fallback para desarrollo local
    if (isDevelopment) {
        console.log('🔧 Usando configuración de desarrollo local');
        return {
            APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyZb8ZZNE6DdWXkM8h7LlRhcjnkawFA34CK_HDezy2ZK55CdMQ9j21bhVtGnq0cby4z/exec',
            WHATSAPP_NUMBER: '1232132121',
            API_TIMEOUT: 10000,
            DEBUG_MODE: true
        };
    } else {
        // Configuración para producción sin variables del servidor
        console.warn('⚠️ No se pudieron cargar las variables de entorno del servidor');
        return {
            APPS_SCRIPT_URL: '',
            WHATSAPP_NUMBER: '1234567890',
            API_TIMEOUT: 10000,
            DEBUG_MODE: false
        };
    }
}

// Función para inicializar configuración
function initializeConfig() {
    // Solo inicializar si no existe ya
    if (!window.CONFIG) {
        window.CONFIG = getConfig();
        
        // Log de configuración (solo en debug)
        if (window.CONFIG.DEBUG_MODE) {
            console.log('🔧 Configuración inicializada:', {
                hasAppsScriptUrl: !!window.CONFIG.APPS_SCRIPT_URL,
                whatsappNumber: window.CONFIG.WHATSAPP_NUMBER,
                apiTimeout: window.CONFIG.API_TIMEOUT,
                debugMode: window.CONFIG.DEBUG_MODE,
                environment: window.location.hostname
            });
        }
    }
}

// Función para logging seguro
window.safeLog = function(message, data = null) {
    if (window.CONFIG?.DEBUG_MODE) {
        if (data) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConfig);
} else {
    initializeConfig();
}

// También inicializar inmediatamente por si acaso
initializeConfig();