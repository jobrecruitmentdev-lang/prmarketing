<?php
/**
 * PR Marketing Ventures — Enterprise Admin Authentication & Security Middleware
 * Strict Session Protection, CSRF Token Management & Access Control
 */

if (session_status() === PHP_SESSION_NONE) {
    // Configure hardened session cookie flags before session start
    $isHttps = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_strict_mode', '1');
    
    if ($isHttps) {
        ini_set('session.cookie_secure', '1');
    }
    
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict'
        ]);
    }
    
    session_start();
}

/**
 * Enforce Admin Authentication
 * Redirects unauthenticated users to the clean login route.
 */
function requireAdminAuth(): array {
    if (empty($_SESSION['pr_admin_logged_in']) || $_SESSION['pr_admin_logged_in'] !== true) {
        $currentUri = $_SERVER['REQUEST_URI'] ?? '/jaatumeinaaya';
        // Clean URL redirect
        header("Location: /jaatumeinaaya/login?redirect=" . urlencode($currentUri));
        exit;
    }
    
    // Auto-generate CSRF token for the authenticated session if not present
    if (empty($_SESSION['pr_csrf_token'])) {
        $_SESSION['pr_csrf_token'] = bin2hex(random_bytes(32));
    }
    
    return [
        'id'    => $_SESSION['pr_admin_id'] ?? 'usr_admin_pr_001',
        'email' => $_SESSION['pr_admin_email'] ?? 'admin@prmarketingventures.com',
        'name'  => $_SESSION['pr_admin_name'] ?? 'PR Marketing Admin',
        'role'  => $_SESSION['pr_admin_role'] ?? 'SuperAdmin'
    ];
}

/**
 * Retrieve CSRF token for forms
 */
function getCsrfToken(): string {
    if (empty($_SESSION['pr_csrf_token'])) {
        $_SESSION['pr_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['pr_csrf_token'];
}

/**
 * Validate CSRF token from POST/GET requests
 */
function validateCsrfToken(?string $token): bool {
    if (empty($token) || empty($_SESSION['pr_csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['pr_csrf_token'], $token);
}