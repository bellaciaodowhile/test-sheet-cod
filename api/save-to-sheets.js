export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener datos de query params (GET) o body (POST)
    const data = req.method === 'GET' ? req.query : req.body;
    
    // Validar datos requeridos
    const requiredFields = ['nombre', 'telefono', 'email', 'carrera'];
    for (let field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ 
          success: false, 
          error: `Campo requerido: ${field}` 
        });
      }
    }

    // URL de tu Google Apps Script
    const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
    
    if (!APPS_SCRIPT_URL) {
      return res.status(500).json({ 
        success: false, 
        error: 'APPS_SCRIPT_URL no configurada' 
      });
    }

    // Preparar parámetros
    const params = new URLSearchParams({
      fecha: data.fecha || new Date().toLocaleDateString('es-ES'),
      hora: data.hora || new Date().toLocaleTimeString('es-ES'),
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      carrera: data.carrera,
      landing: data.landing || 'Unknown',
      utm_source: data.utm_source || 'no-aplica',
      utm_medium: data.utm_medium || 'no-aplica',
      utm_campaign: data.utm_campaign || 'no-aplica'
    });

    // Enviar a Google Apps Script
    const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow'
    });

    const result = await response.text();
    
    return res.status(200).json({
      success: true,
      message: 'Datos enviados exitosamente',
      response: result
    });

  } catch (error) {
    console.error('Error en save-to-sheets:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}