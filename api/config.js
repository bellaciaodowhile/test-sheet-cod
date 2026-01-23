// ========================================
// FUNCIÓN SERVERLESS PARA VERCEL
// Reemplaza env-loader.php para hosting estático
// ========================================

export default function handler(req, res) {
  // Solo permitir GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Configurar headers de seguridad
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Obtener variables de entorno de Vercel
  const config = {
    APPS_SCRIPT_URL: process.env.APPS_SCRIPT_URL || '',
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '1234567890',
    API_TIMEOUT: parseInt(process.env.API_TIMEOUT) || 10000,
    DEBUG_MODE: process.env.DEBUG_MODE === 'true' || process.env.NODE_ENV === 'development'
  };

  // Validar que las variables críticas estén presentes
  if (!config.APPS_SCRIPT_URL) {
    console.error('WARNING: APPS_SCRIPT_URL no está configurada en las variables de entorno de Vercel');
  }

  // Sanitizar número de WhatsApp (solo números)
  config.WHATSAPP_NUMBER = config.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

  // Generar JavaScript con las variables
  const jsContent = `
// Variables de entorno cargadas desde Vercel
window.ENV = ${JSON.stringify(config)};

// Configuración aplicada automáticamente
if (typeof window.CONFIG === 'undefined') {
    window.CONFIG = window.ENV;
}

// Log de configuración (solo en desarrollo)
if (window.ENV.DEBUG_MODE) {
    console.log('🔧 Configuración cargada desde Vercel:', {
        hasAppsScriptUrl: !!window.ENV.APPS_SCRIPT_URL,
        whatsappNumber: window.ENV.WHATSAPP_NUMBER,
        apiTimeout: window.ENV.API_TIMEOUT,
        debugMode: window.ENV.DEBUG_MODE
    });
}
`;

  // Enviar respuesta
  res.status(200).send(jsContent);
}