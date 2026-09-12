<?php
/**
 * CRM API Helpers & Middleware
 */

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/jwt.php';

// Fetch JWT Secret from config.local.php or environment
function getCrmJwtSecret(): string {
    $configFile = __DIR__ . '/../../config/config.local.php';
    if (file_exists($configFile)) {
        $cfg = require $configFile;
        if (!empty($cfg['jwt_secret'])) return $cfg['jwt_secret'];
    }
    return getenv('JWT_SECRET') ?: 'crm_jwt_super_secret_key_2026_marketing';
}

function applyCrmCors(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: {$origin}");
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function jsonResponse(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Robust input parser that supports JSON, form-data, and multipart PUT requests
 */
function getJsonInput(): array {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        return $_POST;
    }

    // For PUT/PATCH with multipart or urlencoded
    if (stripos($contentType, 'application/x-www-form-urlencoded') !== false) {
        $raw = file_get_contents('php://input');
        parse_str($raw, $data);
        return is_array($data) ? $data : [];
    }

    if (stripos($contentType, 'multipart/form-data') !== false) {
        // Parse multipart PUT
        return parseMultipartPut();
    }

    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) return $decoded;

    return $_POST ?: [];
}

/**
 * Parses multipart/form-data stream for PUT/PATCH and populates $_FILES if present
 */
function parseMultipartPut(): array {
    $raw = file_get_contents('php://input');
    $contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
    if (!preg_match('/boundary=(.*)$/', $contentType, $matches)) {
        return [];
    }
    $boundary = trim($matches[1], '"');
    $blocks = explode('--' . $boundary, $raw);
    $data = [];

    foreach ($blocks as $block) {
        if (empty($block) || $block === "--\r\n") continue;

        if (strpos($block, "\r\n\r\n") === false) continue;
        [$rawHeaders, $content] = explode("\r\n\r\n", $block, 2);
        $content = substr($content, 0, -2); // strip trailing \r\n

        if (preg_match('/name="([^"]+)"(?:;\s*filename="([^"]+)")?/', $rawHeaders, $matches)) {
            $name = $matches[1];
            $filename = $matches[2] ?? null;

            if ($filename) {
                // It's a file!
                $tmpPath = tempnam(sys_get_temp_dir(), 'crm_put_');
                file_put_contents($tmpPath, $content);
                $_FILES[$name] = [
                    'name' => $filename,
                    'type' => 'application/octet-stream',
                    'tmp_name' => $tmpPath,
                    'error' => UPLOAD_ERR_OK,
                    'size' => strlen($content)
                ];
            } else {
                $data[$name] = $content;
            }
        }
    }

    return $data;
}

function getAuthUser(): ?array {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = null;

    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
    } elseif (!empty($_GET['token'])) {
        $token = $_GET['token'];
    }

    if (!$token) return null;

    return CrmJwt::verify($token, getCrmJwtSecret());
}

function requireAuth(): array {
    $user = getAuthUser();
    if (!$user) {
        jsonResponse(['success' => false, 'error' => 'Authentication token required or expired'], 401);
    }
    return $user;
}

function requireRole(array $allowedRoles): array {
    $user = requireAuth();
    if (!in_array($user['role'], $allowedRoles)) {
        jsonResponse(['success' => false, 'error' => 'Forbidden: Insufficient privileges'], 403);
    }
    return $user;
}

function requireModule(array $user, string $module): void {
    if ($user['role'] === 'master' || $user['role'] === 'admin') {
        return;
    }
    $modules = $user['modules'] ?? [];
    if (!is_array($modules) || !in_array($module, $modules)) {
        jsonResponse(['success' => false, 'error' => "Forbidden: '{$module}' module access required"], 403);
    }
}

function getAdminId(array $user): int {
    if ($user['role'] === 'master') {
        $reqAdminId = $_GET['admin_id'] ?? $_POST['admin_id'] ?? null;
        if ($reqAdminId) return (int)$reqAdminId;
        return (int)($user['admin_id'] ?? 1);
    }
    return (int)($user['admin_id'] ?? 1);
}

function crmSlugify(string $text): string {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'n-a' : $text;
}
