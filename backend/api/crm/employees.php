<?php
/**
 * Employees & Staff Roster Controller
 */

require_once __DIR__ . '/helpers.php';

function handleEmployeesRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    $adminId = getAdminId($user);

    // 1. GET / (List Employees)
    if (($subpath === '' || $subpath === '/') && $method === 'GET') {
        $stmt = $pdo->prepare("
            SELECT 
                e.*,
                u.name,
                u.email,
                u.phone,
                u.role as user_role,
                u.status as user_status,
                GROUP_CONCAT(em.module) as assigned_modules
            FROM crm_employees e
            JOIN crm_users u ON e.user_id = u.id
            LEFT JOIN crm_employee_modules em ON em.employee_id = e.id
            WHERE e.admin_id = ?
            GROUP BY e.id
            ORDER BY e.created_at DESC
        ");
        $stmt->execute([$adminId]);
        $employees = $stmt->fetchAll();

        foreach ($employees as &$emp) {
            $emp['modules'] = !empty($emp['assigned_modules']) ? explode(',', $emp['assigned_modules']) : [];
        }

        jsonResponse(['success' => true, 'data' => $employees]);
    }

    // 2. POST / (Create Employee)
    if (($subpath === '' || $subpath === '/') && $method === 'POST') {
        if (!in_array($user['role'], ['master', 'admin'])) {
            jsonResponse(['success' => false, 'error' => 'Forbidden: Insufficient privileges'], 403);
        }

        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $email = trim(strtolower($body['email'] ?? ''));
        $phone = trim($body['phone'] ?? '');
        $password = $body['password'] ?? '';
        $designation = trim($body['designation'] ?? 'Associate');
        $department = trim($body['department'] ?? 'General');
        $employeeCode = trim($body['employee_code'] ?? '');
        $salary = (float)($body['salary'] ?? 0);
        $joiningDate = trim($body['joining_date'] ?? date('Y-m-d'));
        $modules = is_array($body['modules'] ?? null) ? $body['modules'] : [];
        $initialStatus = trim($body['initial_status'] ?? 'present');
        $remarks = trim($body['remarks'] ?? 'Registered via Staff Roster');
        $allowPortalAccess = !empty($body['allow_portal_access']);

        if (!$name || !$email) {
            jsonResponse(['success' => false, 'error' => 'Name and email are required'], 400);
        }

        $pdo->beginTransaction();
        try {
            $chk = $pdo->prepare("SELECT id FROM crm_users WHERE email = ?");
            $chk->execute([$email]);
            if ($chk->fetch()) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'Email is already registered'], 409);
            }

            $finalPassword = ($allowPortalAccess && $password && trim($password)) ? trim($password) : bin2hex(random_bytes(16));
            $pwdHash = password_hash($finalPassword, PASSWORD_DEFAULT);

            $uStmt = $pdo->prepare("
                INSERT INTO crm_users (name, email, phone, password_hash, role, admin_id, status)
                VALUES (?, ?, ?, ?, 'employee', ?, 'active')
            ");
            $uStmt->execute([$name, $email, $phone ?: null, $pwdHash, $adminId]);
            $userId = (int)$pdo->lastInsertId();

            $empCode = $employeeCode ?: ('EMP-' . substr((string)time(), -4));
            $eStmt = $pdo->prepare("
                INSERT INTO crm_employees (user_id, admin_id, employee_code, designation, department, salary, joining_date, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
            ");
            $eStmt->execute([$userId, $adminId, $empCode, $designation, $department, $salary, $joiningDate]);
            $employeeId = (int)$pdo->lastInsertId();

            $assignedModules = [];
            if ($allowPortalAccess) {
                $assignedModules = $modules;
                $deptLower = strtolower($department);
                if (strpos($deptLower, 'sale') !== false && !in_array('sales', $assignedModules)) {
                    $assignedModules[] = 'sales';
                }
                if ((strpos($deptLower, 'recruitment') !== false || strpos($deptLower, 'candidate') !== false || strpos($deptLower, 'hiring') !== false) && !in_array('recruitment', $assignedModules)) {
                    $assignedModules[] = 'recruitment';
                }

                $mStmt = $pdo->prepare("INSERT INTO crm_employee_modules (employee_id, module) VALUES (?, ?)");
                foreach ($assignedModules as $mod) {
                    if (in_array($mod, ['sales', 'recruitment'])) {
                        $mStmt->execute([$employeeId, $mod]);
                    }
                }
            }

            // Auto-initialize today's attendance record so attendance desk sees employee instantly
            $targetDate = $joiningDate ?: date('Y-m-d');
            $attStmt = $pdo->prepare("
                INSERT INTO crm_attendance_records (employee_id, admin_id, date, status, check_in_time, check_out_time, check_in, check_out, remarks, notes)
                VALUES (?, ?, ?, ?, '09:30:00', '18:30:00', '09:30:00', '18:30:00', ?, ?)
                ON DUPLICATE KEY UPDATE status = VALUES(status), check_in_time = VALUES(check_in_time), check_out_time = VALUES(check_out_time), check_in = VALUES(check_in), check_out = VALUES(check_out), remarks = VALUES(remarks), notes = VALUES(notes)
            ");
            $attStmt->execute([$employeeId, $adminId, $targetDate, $initialStatus, $remarks, $remarks]);

            $pdo->commit();

            jsonResponse([
                'success' => true,
                'message' => 'Employee created and synced across HR, Attendance & Sales successfully',
                'data' => [
                    'id' => $employeeId,
                    'user_id' => $userId,
                    'name' => $name,
                    'email' => $email,
                    'employee_code' => $empCode,
                    'department' => $department,
                    'modules' => $assignedModules
                ]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Failed to create employee: ' . $e->getMessage()], 500);
        }
    }

    // 3. POST /assign-modules
    if ($subpath === '/assign-modules' && $method === 'POST') {
        if (!in_array($user['role'], ['master', 'admin'])) {
            jsonResponse(['success' => false, 'error' => 'Forbidden: Insufficient privileges'], 403);
        }

        $body = getJsonInput();
        $employeeId = (int)($body['employee_id'] ?? 0);
        $modules = is_array($body['modules'] ?? null) ? $body['modules'] : [];

        if (!$employeeId) {
            jsonResponse(['success' => false, 'error' => 'Employee ID and modules array are required'], 400);
        }

        $pdo->beginTransaction();
        try {
            $pdo->prepare("DELETE FROM crm_employee_modules WHERE employee_id = ?")->execute([$employeeId]);
            $ins = $pdo->prepare("INSERT INTO crm_employee_modules (employee_id, module) VALUES (?, ?)");
            foreach ($modules as $mod) {
                if (in_array($mod, ['sales', 'recruitment'])) {
                    $ins->execute([$employeeId, $mod]);
                }
            }
            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Employee modules updated successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // 4. POST /offboard
    if ($subpath === '/offboard' && $method === 'POST') {
        if (!in_array($user['role'], ['master', 'admin'])) {
            jsonResponse(['success' => false, 'error' => 'Forbidden: Insufficient privileges'], 403);
        }

        $body = getJsonInput();
        $employeeId = (int)($body['employee_id'] ?? 0);
        $exitDate = $body['exit_date'] ?? date('Y-m-d');
        $exitType = $body['exit_type'] ?? 'resigned';
        $exitReason = $body['exit_reason'] ?? '';

        if (!$employeeId) {
            jsonResponse(['success' => false, 'error' => 'Employee ID required'], 400);
        }

        $pdo->prepare("
            UPDATE crm_employees SET status = ?, exit_date = ?, exit_type = ?, exit_reason = ? WHERE id = ?
        ")->execute(['resigned', $exitDate, $exitType, $exitReason, $employeeId]);

        $pdo->prepare("
            UPDATE crm_users SET status = 'revoked' WHERE id = (SELECT user_id FROM crm_employees WHERE id = ?)
        ")->execute([$employeeId]);

        jsonResponse(['success' => true, 'message' => 'Employee offboarded successfully']);
    }

    // 5. POST /reset-password
    if ($subpath === '/reset-password' && $method === 'POST') {
        if (!in_array($user['role'], ['master', 'admin'])) {
            jsonResponse(['success' => false, 'error' => 'Forbidden: Insufficient privileges'], 403);
        }

        $body = getJsonInput();
        $employeeId = (int)($body['employee_id'] ?? 0);
        $newPassword = $body['new_password'] ?? '';

        if (!$employeeId || !$newPassword) {
            jsonResponse(['success' => false, 'error' => 'Employee ID and new password are required'], 400);
        }
        if (strlen($newPassword) < 6) {
            jsonResponse(['success' => false, 'error' => 'Password must be at least 6 characters'], 400);
        }

        $empStmt = $pdo->prepare("SELECT user_id FROM crm_employees WHERE id = ? AND admin_id = ?");
        $empStmt->execute([$employeeId, $adminId]);
        $emp = $empStmt->fetch();
        if (!$emp) {
            jsonResponse(['success' => false, 'error' => 'Employee not found'], 404);
        }

        $pwdHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $pdo->prepare("UPDATE crm_users SET password_hash = ? WHERE id = ?")->execute([$pwdHash, $emp['user_id']]);

        jsonResponse(['success' => true, 'message' => 'Password updated successfully']);
    }

    // 6. PUT /:id (Update Employee Details)
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $employeeId = (int)$matches[1];
        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $designation = trim($body['designation'] ?? '');
        $department = trim($body['department'] ?? '');
        $salary = isset($body['salary']) ? (float)$body['salary'] : null;
        $employeeCode = trim($body['employee_code'] ?? '');

        $pdo->beginTransaction();
        try {
            $eStmt = $pdo->prepare("SELECT user_id FROM crm_employees WHERE id = ? AND admin_id = ?");
            $eStmt->execute([$employeeId, $adminId]);
            $emp = $eStmt->fetch();
            if (!$emp) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'Employee not found'], 404);
            }

            $userId = (int)$emp['user_id'];

            // Security check: Non-admins cannot edit an Admin account
            $uCheck = $pdo->prepare("SELECT role FROM crm_users WHERE id = ?");
            $uCheck->execute([$userId]);
            $targetUser = $uCheck->fetch();
            if ($targetUser && in_array($targetUser['role'], ['admin', 'master']) && !in_array($user['role'], ['admin', 'master'])) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'Access Denied: You cannot modify Administrator accounts'], 403);
            }

            if ($name || $phone) {
                $pdo->prepare("
                    UPDATE crm_users SET 
                        name = COALESCE(?, name), 
                        phone = COALESCE(?, phone) 
                    WHERE id = ?
                ")->execute([$name ?: null, $phone ?: null, $userId]);
            }

            $pdo->prepare("
                UPDATE crm_employees SET
                    designation = COALESCE(?, designation),
                    department = COALESCE(?, department),
                    salary = COALESCE(?, salary),
                    employee_code = COALESCE(?, employee_code)
                WHERE id = ? AND admin_id = ?
            ")->execute([
                $designation ?: null,
                $department ?: null,
                $salary !== null ? $salary : null,
                $employeeCode ?: null,
                $employeeId,
                $adminId
            ]);

            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Employee updated successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // 7. DELETE /:id
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $employeeId = (int)$matches[1];
        $pdo->beginTransaction();
        try {
            $eStmt = $pdo->prepare("SELECT user_id FROM crm_employees WHERE id = ? AND admin_id = ?");
            $eStmt->execute([$employeeId, $adminId]);
            $emp = $eStmt->fetch();
            if (!$emp) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'Employee not found'], 404);
            }

            $userId = (int)$emp['user_id'];
            $pdo->prepare("DELETE FROM crm_employees WHERE id = ?")->execute([$employeeId]);
            $pdo->prepare("DELETE FROM crm_users WHERE id = ?")->execute([$userId]);

            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Employee deleted successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => false, 'error' => "Employees route '{$subpath}' not found"], 404);
}
