<?php
/**
 * REST API CRM Router & Controller Dispatcher
 * Multi-Tenant CRM Native PHP REST Engine
 */

require_once __DIR__ . '/helpers.php';
applyCrmCors();

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/master.php';
require_once __DIR__ . '/employees.php';
require_once __DIR__ . '/attendance.php';
require_once __DIR__ . '/sales.php';
require_once __DIR__ . '/jobs.php';
require_once __DIR__ . '/candidates.php';
require_once __DIR__ . '/public.php';

$pdo = Database::getConnection();

// Extract path relative to /api/crm
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace('#^.*?/api/crm#', '', $uri);
$path = '/' . ltrim($path, '/');
$method = $_SERVER['REQUEST_METHOD'];

// Handle method spoofing (e.g. _method=PUT in POST body)
if ($method === 'POST') {
    if (isset($_POST['_method'])) {
        $method = strtoupper($_POST['_method']);
    } elseif (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
        $method = strtoupper($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']);
    }
}

try {
    // 0. Health check
    if (($path === '' || $path === '/' || $path === '/health') && $method === 'GET') {
        jsonResponse([
            'status' => 'healthy',
            'service' => 'PR Marketing Ventures Multi-Tenant CRM Engine (PHP 8)',
            'database' => 'MySQL connected',
            'timestamp' => date('c')
        ]);
    }

    // 1. Auth routes: /auth/*
    if (strpos($path, '/auth') === 0) {
        $sub = substr($path, strlen('/auth'));
        handleAuthRoutes($sub ?: '/', $method, $pdo);
    }

    // 2. Master routes: /master/*
    if (strpos($path, '/master') === 0) {
        $sub = substr($path, strlen('/master'));
        handleMasterRoutes($sub ?: '/', $method, $pdo);
    }

    // 3. Employee routes: /admin/employees/* and /employees/*
    if (strpos($path, '/admin/employees') === 0) {
        $sub = substr($path, strlen('/admin/employees'));
        handleEmployeesRoutes($sub ?: '/', $method, $pdo);
    } elseif (strpos($path, '/employees') === 0) {
        $sub = substr($path, strlen('/employees'));
        handleEmployeesRoutes($sub ?: '/', $method, $pdo);
    }

    // 4. Attendance routes: /attendance/*
    if (strpos($path, '/attendance') === 0) {
        $sub = substr($path, strlen('/attendance'));
        handleAttendanceRoutes($sub ?: '/', $method, $pdo);
    }

    // 5. Sales routes: /sales/*
    if (strpos($path, '/sales') === 0) {
        $sub = substr($path, strlen('/sales'));
        handleSalesRoutes($sub ?: '/', $method, $pdo);
    }

    // 6. Recruitment routes: /recruitment/*
    if (strpos($path, '/recruitment') === 0) {
        $sub = substr($path, strlen('/recruitment'));

        if (strpos($sub, '/jobs') === 0) {
            $jobSub = substr($sub, strlen('/jobs'));
            handleJobsRoutes($jobSub ?: '/', $method, $pdo);
        }

        if (strpos($sub, '/career-settings') === 0) {
            handleJobsRoutes('/career-settings', $method, $pdo);
        }

        if (strpos($sub, '/candidates') === 0) {
            $candSub = substr($sub, strlen('/candidates'));
            handleCandidatesRoutes($candSub ?: '/', $method, $pdo);
        }

        if (strpos($sub, '/resumes') === 0) {
            handleCandidatesRoutes($sub, $method, $pdo);
        }
    }

    // 7. Public API: /public/v1/*
    if (strpos($path, '/public/v1') === 0) {
        $pubSub = substr($path, strlen('/public/v1'));
        handlePublicRoutes($pubSub ?: '/', $method, $pdo);
    }

    // 404 fallback
    jsonResponse(['success' => false, 'error' => "CRM Endpoint '{$path}' [{$method}] not found"], 404);

} catch (Throwable $e) {
    error_log("CRM Server Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
    jsonResponse([
        'success' => false,
        'error' => 'Internal Server Error: ' . $e->getMessage()
    ], 500);
}
