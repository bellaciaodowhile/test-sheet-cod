// Configuración específica para admisiones-2026 (Landing A)
function getConfig() {
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost') ||
                         window.location.port !== '';
    
    if (window.ENV) {
        return window.ENV;
    }
    
    if (isDevelopment) {
        return {
            APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyZb8ZZNE6DdWXkM8h7LlRhcjnkawFA34CK_HDezy2ZK55CdMQ9j21bhVtGnq0cby4z/exec',
            WHATSAPP_NUMBER: '5216563513024',
            HEALTHCHECK_URL: 'https://hc-ping.com/ddd271dc-e694-4bf7-8e84-b30073935fa9',
            API_TIMEOUT: 10000,
            DEBUG_MODE: true
        };
    } else {
        // Configuración para producción (cupn.edu.mx)
        return {
            APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyZb8ZZNE6DdWXkM8h7LlRhcjnkawFA34CK_HDezy2ZK55CdMQ9j21bhVtGnq0cby4z/exec',
            WHATSAPP_NUMBER: '5216563513024',
            HEALTHCHECK_URL: 'https://hc-ping.com/ddd271dc-e694-4bf7-8e84-b30073935fa9',
            API_TIMEOUT: 10000,
            DEBUG_MODE: true // Activar debug para diagnosticar
        };
    }
}

function initializeConfig() {
    if (!window.CONFIG) {
        window.CONFIG = getConfig();
    }
}

window.safeLog = function(message, data = null) {
    // Función silenciosa - no muestra logs
    return;
};

initializeConfig();