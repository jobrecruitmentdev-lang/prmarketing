<?php
/**
 * CRM Authentication Controller
 */

require_once __DIR__ . '/helpers.php';

function handleAuthRoutes(string $subpath, string $method, PDO $pdo): void {
    if ($subpath === '/login' && $method === 'POST') {
        $body = getJsonInput();
        $email = trim($body['email'] ?? '');
        $password = $body['password'] ?? '';
        $slug = trim($body['slug'] ?? '');

        if (!$email || !$password) {
            jsonResponse(['success' => false, 'error' => 'Email and password are required'], 400);
        }

        $stmt = $pdo->prepare("SELECT * FROM crm_users WHERE email = ? AND status = 'active' LIMIT 1");
        $stmt->execute([strtolower($email)]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            jsonResponse(['success' => false, 'error' => 'Invalid email or password'], 401);
        }

        // Check tenant slug matching if provided and user is not master
        $tenantSlug = null;
        $companyName = null;
        if (!empty($user['admin_id'])) {
            $tStmt = $pdo->prepare("SELECT slug, company_display_name, status FROM crm_admins WHERE id = ?");
            $tStmt->execute([$user['admin_id']]);
            $tenant = $tStmt->fetch();

            if ($tenant) {
                if ($tenant['status'] !== 'active') {
                    jsonResponse(['success' => false, 'error' => 'Your organization account is suspended or revoked'], 403);
                }
                $tenantSlug = $tenant['slug'];
                $companyName = $tenant['company_display_name'];

                if ($slug && strtolower($slug) !== strtolower($tenantSlug) && $user['role'] !== 'master') {
                    jsonResponse(['success' => false, 'error' => "This account does not belong to organization '{$slug}'"], 403);
                }
            }
        }

        // Fetch assigned modules and employee record if employee
        $modules = [];
        $employeeId = null;
        $attendanceData = null;

        if ($user['role'] === 'employee') {
            $mStmt = $pdo->prepare("
                SELECT em.module 
                FROM crm_employee_modules em 
                JOIN crm_employees e ON em.employee_id = e.id 
                WHERE e.user_id = ?
            ");
            $mStmt->execute([$user['id']]);
            $modules = $mStmt->fetchAll(PDO::FETCH_COLUMN);

            // Fetch employee record
            $empStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ? AND admin_id = ? AND status = 'active' LIMIT 1");
            $empStmt->execute([$user['id'], $user['admin_id']]);
            $empRecord = $empStmt->fetch();

            if ($empRecord) {
                $employeeId = (int)$empRecord['id'];
                $adminId = (int)$user['admin_id'];

                // Auto Check-In Hook (Server-Side IST Asia/Kolkata)
                date_default_timezone_set('Asia/Kolkata');
                $todayDate = date('Y-m-d');
                $nowTime = date('H:i:s');

                // Check if attendance already recorded today
                $attCheckStmt = $pdo->prepare("SELECT id, check_in_time, check_out_time, status FROM crm_attendance_records WHERE employee_id = ? AND date = ? LIMIT 1");
                $attCheckStmt->execute([$employeeId, $todayDate]);
                $existingAtt = $attCheckStmt->fetch();

                if (!$existingAtt) {
                    $insAtt = $pdo->prepare("
                        INSERT INTO crm_attendance_records (admin_id, employee_id, date, status, check_in_time)
                        VALUES (?, ?, ?, 'present', ?)
                        ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP
                    ");
                    $insAtt->execute([$adminId, $employeeId, $todayDate, $nowTime]);

                    $attendanceData = [
                        'date' => $todayDate,
                        'check_in_time' => $nowTime,
                        'check_out_time' => null,
                        'status' => 'present',
                        'is_new_checkin' => true
                    ];
                } else {
                    $attendanceData = [
                        'date' => $todayDate,
                        'check_in_time' => $existingAtt['check_in_time'],
                        'check_out_time' => $existingAtt['check_out_time'],
                        'status' => $existingAtt['status'],
                        'is_new_checkin' => false
                    ];
                }
            }
        } elseif ($user['role'] === 'admin') {
            $modules = ['recruitment', 'sales', 'attendance', 'employees'];
        } elseif ($user['role'] === 'master') {
            $modules = ['master', 'admin', 'recruitment', 'sales', 'attendance'];
        }

        // Update last login
        $uStmt = $pdo->prepare("UPDATE crm_users SET last_login = NOW() WHERE id = ?");
        $uStmt->execute([$user['id']]);

        $payload = [
            'id' => (int)$user['id'],
            'employee_id' => $employeeId,
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'admin_id' => $user['admin_id'] ? (int)$user['admin_id'] : null,
            'tenant_slug' => $tenantSlug,
            'company_name' => $companyName,
            'modules' => $modules,
        ];

        $token = CrmJwt::sign($payload, getCrmJwtSecret(), 86400 * 7); // 7 days

        jsonResponse([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $payload,
            'attendance' => $attendanceData
        ]);
    }

    if ($subpath === '/me' && $method === 'GET') {
        $user = requireAuth();
        jsonResponse([
            'success' => true,
            'user' => $user
        ]);
    }

    jsonResponse(['success' => false, 'error' => "Auth route '{$subpath}' not found"], 404);
}
