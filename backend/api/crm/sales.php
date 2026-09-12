<?php
/**
 * Sales & CRM Pipeline Controller
 */

require_once __DIR__ . '/helpers.php';

function handleSalesRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    requireModule($user, 'sales');
    $adminId = getAdminId($user);

    // 1. GET /daily
    if ($subpath === '/daily' && $method === 'GET') {
        $stmt = $pdo->prepare("
            SELECT s.*, e.employee_code, u.name as logged_by_name
            FROM crm_daily_sales s
            LEFT JOIN crm_employees e ON s.employee_id = e.id
            LEFT JOIN crm_users u ON e.user_id = u.id
            WHERE s.admin_id = ?
            ORDER BY s.sale_date DESC, s.id DESC
        ");
        $stmt->execute([$adminId]);
        $sales = $stmt->fetchAll();

        jsonResponse(['success' => true, 'data' => $sales]);
    }

    // 2. POST /daily
    if ($subpath === '/daily' && $method === 'POST') {
        $body = getJsonInput();
        $clientName = trim($body['client_name'] ?? '');
        $serviceOrProduct = trim($body['service_or_product'] ?? '');
        $amount = (float)($body['amount'] ?? 0);
        $clientContact = trim($body['client_contact'] ?? '');
        $clientEmail = trim($body['client_email'] ?? '');
        $saleDate = trim($body['sale_date'] ?? date('Y-m-d'));
        $paymentMode = trim($body['payment_mode'] ?? 'upi');
        $paymentStatus = trim($body['payment_status'] ?? 'completed');
        $invoiceNumber = trim($body['invoice_number'] ?? ('INV-' . substr((string)time(), -6)));
        $notes = trim($body['notes'] ?? '');
        $employeeId = !empty($body['employee_id']) ? (int)$body['employee_id'] : null;

        if (!$clientName || !$serviceOrProduct || !$amount) {
            jsonResponse(['success' => false, 'error' => 'Client name, service/product, and amount are required'], 400);
        }

        if (!$employeeId && $user['role'] === 'employee') {
            $eStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ? AND admin_id = ?");
            $eStmt->execute([$user['id'], $adminId]);
            $emp = $eStmt->fetch();
            if ($emp) $employeeId = (int)$emp['id'];
        }

        $stmt = $pdo->prepare("
            INSERT INTO crm_daily_sales (admin_id, employee_id, client_name, client_contact, client_email, service_or_product, amount, sale_date, payment_mode, payment_status, invoice_number, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $adminId,
            $employeeId,
            $clientName,
            $clientContact ?: null,
            $clientEmail ?: null,
            $serviceOrProduct,
            $amount,
            $saleDate,
            $paymentMode,
            $paymentStatus,
            $invoiceNumber,
            $notes ?: null
        ]);

        jsonResponse([
            'success' => true,
            'message' => 'Daily sale recorded successfully',
            'data' => ['id' => (int)$pdo->lastInsertId()]
        ], 201);
    }

    // 3. PUT /daily/:id
    if (preg_match('#^/daily/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();

        $fields = [];
        $params = [];

        if (isset($body['employee_id'])) {
            $fields[] = 'employee_id = ?';
            $params[] = $body['employee_id'] ? (int)$body['employee_id'] : null;
        }
        if (isset($body['client_name'])) {
            $fields[] = 'client_name = ?';
            $params[] = trim($body['client_name']);
        }
        if (isset($body['client_contact'])) {
            $fields[] = 'client_contact = ?';
            $params[] = trim($body['client_contact']);
        }
        if (isset($body['client_email'])) {
            $fields[] = 'client_email = ?';
            $params[] = trim($body['client_email']);
        }
        if (isset($body['service_or_product'])) {
            $fields[] = 'service_or_product = ?';
            $params[] = trim($body['service_or_product']);
        }
        if (isset($body['amount'])) {
            $fields[] = 'amount = ?';
            $params[] = (float)$body['amount'];
        }
        if (isset($body['sale_date'])) {
            $fields[] = 'sale_date = ?';
            $params[] = trim($body['sale_date']);
        }
        if (isset($body['payment_mode'])) {
            $fields[] = 'payment_mode = ?';
            $params[] = trim($body['payment_mode']);
        }
        if (isset($body['payment_status'])) {
            $fields[] = 'payment_status = ?';
            $params[] = trim($body['payment_status']);
        }
        if (isset($body['invoice_number'])) {
            $fields[] = 'invoice_number = ?';
            $params[] = trim($body['invoice_number']);
        }
        if (isset($body['notes'])) {
            $fields[] = 'notes = ?';
            $params[] = trim($body['notes']);
        }

        if (!empty($fields)) {
            $params[] = $id;
            $params[] = $adminId;
            $sql = "UPDATE crm_daily_sales SET " . implode(', ', $fields) . " WHERE id = ? AND admin_id = ?";
            $pdo->prepare($sql)->execute($params);
        }

        jsonResponse(['success' => true, 'message' => 'Sale transaction updated successfully']);
    }

    // 4. DELETE /daily/:id
    if (preg_match('#^/daily/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $id = (int)$matches[1];
        $pdo->prepare("DELETE FROM crm_daily_sales WHERE id = ? AND admin_id = ?")->execute([$id, $adminId]);
        jsonResponse(['success' => true, 'message' => 'Sale transaction deleted successfully']);
    }

    // 5. GET /leads
    if ($subpath === '/leads' && $method === 'GET') {
        $stmt = $pdo->prepare("
            SELECT l.*, u.name as assignee_name
            FROM crm_sales_leads l
            LEFT JOIN crm_employees e ON l.employee_id = e.id
            LEFT JOIN crm_users u ON e.user_id = u.id
            WHERE l.admin_id = ?
            ORDER BY l.created_at DESC
        ");
        $stmt->execute([$adminId]);
        $leads = $stmt->fetchAll();

        jsonResponse(['success' => true, 'data' => $leads]);
    }

    // 6. POST /leads
    if ($subpath === '/leads' && $method === 'POST') {
        $body = getJsonInput();
        $leadName = trim($body['lead_name'] ?? '');
        $contact = trim($body['contact'] ?? '');
        $email = trim($body['email'] ?? '');
        $company = trim($body['company'] ?? '');
        $stage = trim($body['stage'] ?? 'new');
        $value = (float)($body['value'] ?? 0);
        $notes = trim($body['notes'] ?? '');
        $employeeId = !empty($body['employee_id']) ? (int)$body['employee_id'] : null;

        if (!$leadName) {
            jsonResponse(['success' => false, 'error' => 'Lead name is required'], 400);
        }

        if (!$employeeId && $user['role'] === 'employee') {
            $eStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ? AND admin_id = ?");
            $eStmt->execute([$user['id'], $adminId]);
            $emp = $eStmt->fetch();
            if ($emp) $employeeId = (int)$emp['id'];
        }

        $stmt = $pdo->prepare("
            INSERT INTO crm_sales_leads (admin_id, employee_id, lead_name, contact, email, company, stage, value, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $adminId,
            $employeeId,
            $leadName,
            $contact ?: null,
            $email ?: null,
            $company ?: null,
            $stage,
            $value,
            $notes ?: null
        ]);

        jsonResponse([
            'success' => true,
            'message' => 'Sales lead created successfully',
            'data' => ['id' => (int)$pdo->lastInsertId()]
        ], 201);
    }

    // 7. PUT /leads/:id
    if (preg_match('#^/leads/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();

        $fields = [];
        $params = [];

        if (isset($body['employee_id'])) {
            $fields[] = 'employee_id = ?';
            $params[] = $body['employee_id'] ? (int)$body['employee_id'] : null;
        }
        if (isset($body['lead_name'])) {
            $fields[] = 'lead_name = ?';
            $params[] = trim($body['lead_name']);
        }
        if (isset($body['contact'])) {
            $fields[] = 'contact = ?';
            $params[] = trim($body['contact']);
        }
        if (isset($body['email'])) {
            $fields[] = 'email = ?';
            $params[] = trim($body['email']);
        }
        if (isset($body['company'])) {
            $fields[] = 'company = ?';
            $params[] = trim($body['company']);
        }
        if (isset($body['stage'])) {
            $fields[] = 'stage = ?';
            $params[] = trim($body['stage']);
        }
        if (isset($body['value'])) {
            $fields[] = 'value = ?';
            $params[] = (float)$body['value'];
        }
        if (isset($body['notes'])) {
            $fields[] = 'notes = ?';
            $params[] = trim($body['notes']);
        }

        if (!empty($fields)) {
            $params[] = $id;
            $params[] = $adminId;
            $sql = "UPDATE crm_sales_leads SET " . implode(', ', $fields) . " WHERE id = ? AND admin_id = ?";
            $pdo->prepare($sql)->execute($params);
        }

        jsonResponse(['success' => true, 'message' => 'Sales lead updated successfully']);
    }

    // 8. DELETE /leads/:id
    if (preg_match('#^/leads/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $id = (int)$matches[1];
        $pdo->prepare("DELETE FROM crm_sales_leads WHERE id = ? AND admin_id = ?")->execute([$id, $adminId]);
        jsonResponse(['success' => true, 'message' => 'Sales lead deleted successfully']);
    }

    // 9. PATCH /leads/:id/stage
    if (preg_match('#^/leads/(\d+)/stage$#', $subpath, $matches) && in_array($method, ['PATCH', 'POST', 'PUT'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();
        $stage = trim($body['stage'] ?? '');
        $validStages = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        if (!in_array($stage, $validStages)) {
            jsonResponse(['success' => false, 'error' => 'Invalid stage'], 400);
        }

        $stmt = $pdo->prepare("UPDATE crm_sales_leads SET stage = ? WHERE id = ? AND admin_id = ?");
        $stmt->execute([$stage, $id, $adminId]);

        jsonResponse(['success' => true, 'message' => "Lead updated to {$stage}"]);
    }

    // 10. GET /dashboard
    if ($subpath === '/dashboard' && $method === 'GET') {
        $currentMonth = date('Y-m');

        $tStmt = $pdo->prepare("SELECT COALESCE(SUM(amount), 0) FROM crm_daily_sales WHERE admin_id = ? AND payment_status = 'completed'");
        $tStmt->execute([$adminId]);
        $totalRevenue = (float)$tStmt->fetchColumn();

        $mStmt = $pdo->prepare("SELECT COALESCE(SUM(amount), 0) FROM crm_daily_sales WHERE admin_id = ? AND payment_status = 'completed' AND sale_date LIKE ?");
        $mStmt->execute([$adminId, "{$currentMonth}%"]);
        $monthRevenue = (float)$mStmt->fetchColumn();

        $lStmt = $pdo->prepare("SELECT stage, COUNT(*) as count, COALESCE(SUM(value), 0) as total_value FROM crm_sales_leads WHERE admin_id = ? GROUP BY stage");
        $lStmt->execute([$adminId]);
        $leadStats = $lStmt->fetchAll();

        jsonResponse([
            'success' => true,
            'data' => [
                'total_revenue' => $totalRevenue,
                'month_revenue' => $monthRevenue,
                'lead_stats' => $leadStats
            ]
        ]);
    }

    jsonResponse(['success' => false, 'error' => "Sales route '{$subpath}' not found"], 404);
}
