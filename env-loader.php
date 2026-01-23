<?php
// ========================================
// CARGADOR DE VARIABLES DE ENTORNO
// ========================================

// Función para cargar variables de entorno de forma segura
function loadEnvironmentVariables() {
    // Intentar cargar desde archivo .env si existe
    $envFile = __DIR__ . '/.env';
    $config = array();
    
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '#') === 0) continue; // Ignorar comentarios
            
            $parts = explode('=', $line, 2);
            if (count($parts) === 2) {
                $key = trim($parts[0]);
                $value = trim($parts[1], '"\'');
                $config[$key] = $value;
            }
        }
    }
    
    // Sobrescribir con variables del sistema si existen
    $envVars = [
        'APPS_SCRIPT_URL',
        'WHATSAPP_NUMBER',
        'API_TIMEOUT',
        'DEBUG_MODE'
    ];
    
    foreach ($envVars as $var) {
        $systemValue = getenv($var);
        if ($systemValue !== false) {
            $config[$var] = $systemValue;
        }
    }
    
    return $config;
}

// Cargar configuración
$config = loadEnvironmentVariables();

// Validar que las variables críticas estén presentes
if (empty($config['APPS_SCRIPT_URL'])) {
    error_log('ERROR: APPS_SCRIPT_URL no está configurada');
    $config['APPS_SCRIPT_URL'] = '';
}

// Sanitizar y validar valores
$config['WHATSAPP_NUMBER'] = preg_replace('/[^0-9]/', '', $config['WHATSAPP_NUMBER'] ?? '1234567890');
$config['API_TIMEOUT'] = intval($config['API_TIMEOUT'] ?? 10000);
$config['DEBUG_MODE'] = filter_var($config['DEBUG_MODE'] ?? 'false', FILTER_VALIDATE_BOOLEAN);

// Generar JavaScript con las variables
header('Content-Type: application/javascript');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Solo exponer las variables necesarias para el frontend
$frontendConfig = [
    'APPS_SCRIPT_URL' => $config['APPS_SCRIPT_URL'],
    'WHATSAPP_NUMBER' => $config['WHATSAPP_NUMBER'],
    'API_TIMEOUT' => $config['API_TIMEOUT'],
    'DEBUG_MODE' => $config['DEBUG_MODE']
];

echo "// Variables de entorno cargadas de forma segura\n";
echo "window.ENV = " . json_encode($frontendConfig, JSON_UNESCAPED_SLASHES) . ";\n";
echo "\n// Configuración aplicada automáticamente\n";
echo "if (typeof window.CONFIG === 'undefined') {\n";
echo "    window.CONFIG = window.ENV;\n";
echo "}\n";
?>