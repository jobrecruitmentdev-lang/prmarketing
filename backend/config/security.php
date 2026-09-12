<?php
/**
 * PR Marketing Ventures — Enterprise Security Configuration & Middleware
 * Hardened CORS Whitelisting & REST API Write Authorization
 */

if (!defined('PR_API_WRITE_KEY')) {
    define('PR_API_WRITE_KEY', getenv('PR_API_WRITE_KEY') ?: 'pr_sec_99a8b7c4e5f6d102a48b301c29e7428f9104');
}

/**
 * Apply Hardened CORS Headers with Strict Origin Whitelisting
 */
function applyHardenedCors(): void {
    $allowedOrigins = [
        'https://prmarketingventures.com',
        'https://www.prmarketingventures.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin && in_array(rtrim($origin, '/'), $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Credentials: true');
    } else {
        // Same-origin default or top-level domain
        header("Access-Control-Allow-Origin: https://prmarketingventures.com");
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-KEY, X-Requested-With');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Validates whether the incoming request has permission to perform write operations (POST, PUT, DELETE).
 * Accepts:
 *   1. Active Admin Session ($_SESSION['pr_admin_logged_in'] === true)
 *   2. Header 'X-API-KEY: pr_sec_...'
 *   3. Header 'Authorization: Bearer pr_sec_...'
 */
function validateApiWriteAuth(): bool {
    // 1. Check if user is logged into the Admin Panel session
    if (session_status() === PHP_SESSION_NONE) {
        @session_start();
    }
    if (!empty($_SESSION['pr_admin_logged_in']) && $_SESSION['pr_admin_logged_in'] === true) {
        return true;
    }

    // 2. Check X-API-KEY Header
    $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? $_SERVER['X_API_KEY'] ?? '';
    if (!empty($apiKey) && hash_equals(PR_API_WRITE_KEY, trim($apiKey))) {
        return true;
    }

    // 3. Check Authorization Bearer Token Header
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!empty($authHeader) && preg_match('/^Bearer\s+(.+)$/i', trim($authHeader), $matches)) {
        if (hash_equals(PR_API_WRITE_KEY, trim($matches[1]))) {
            return true;
        }
    }

    return false;
}

/**
 * Enforce Write Authorization or return 401 JSON error
 */
function requireApiWriteAuth(): void {
    if (!validateApiWriteAuth()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'status'  => 401,
            'error'   => 'Unauthorized: Valid Secret API Key (X-API-KEY) or Admin Session required for write operations.'
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        exit;
    }
}
