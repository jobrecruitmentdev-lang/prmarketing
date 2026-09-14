<?php
/**
 * Master Super Admin Controller
 */

require_once __DIR__ . '/helpers.php';

function handleMasterRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireRole(['master']);

    // 1. GET /overview
    if ($subpath === '/overview' && $method === 'GET') {
        $totalTenants = (int)$pdo->query("SELECT COUNT(*) FROM crm_admins")->fetchColumn();
        $activeTenants = (int)$pdo->query("SELECT COUNT(*) FROM crm_admins WHERE status = 'active'")->fetchColumn();
        $totalUsers = (int)$pdo->query("SELECT COUNT(*) FROM crm_users")->fetchColumn();
        $totalJobs = (int)$pdo->query("SELECT COUNT(*) FROM crm_jobs")->fetchColumn();
        $totalCandidates = (int)$pdo->query("SELECT COUNT(*) FROM crm_candidates")->fetchColumn();
        $totalRevenue = (float)$pdo->query("SELECT COALESCE(SUM(amount), 0) FROM crm_daily_sales WHERE payment_status = 'completed'")->fetchColumn();

        jsonResponse([
            'success' => true,
            'data' => [
                'total_tenants' => $totalTenants,
                'active_tenants' => $activeTenants,
                'total_users' => $totalUsers,
                'total_jobs' => $totalJobs,
                'total_candidates' => $totalCandidates,
                'total_revenue' => $totalRevenue
            ]
        ]);
    }

    // 2. GET /tenants
    if ($subpath === '/tenants' && $method === 'GET') {
        $sql = "
            SELECT 
                a.*,
                (SELECT COUNT(*) FROM crm_users u WHERE u.admin_id = a.id) as user_count,
                (SELECT COUNT(*) FROM crm_employees e WHERE e.admin_id = a.id AND e.status = 'active') as employee_count,
                (SELECT COUNT(*) FROM crm_jobs j WHERE j.admin_id = a.id) as job_count,
                (SELECT COUNT(*) FROM crm_candidates c WHERE c.admin_id = a.id) as candidate_count,
                (SELECT COALESCE(SUM(amount), 0) FROM crm_daily_sales s WHERE s.admin_id = a.id AND s.payment_status = 'completed') as total_sales
            FROM crm_admins a
            ORDER BY a.created_at DESC
        ";
        $tenants = $pdo->query($sql)->fetchAll();
        jsonResponse(['success' => true, 'data' => $tenants]);
    }

    // 3. POST /tenants (Create Tenant)
    if ($subpath === '/tenants' && $method === 'POST') {
        $body = getJsonInput();
        $companyName = trim($body['company_display_name'] ?? '');
        $slug = trim($body['slug'] ?? '');
        $adminName = trim($body['admin_name'] ?? '');
        $adminEmail = trim($body['admin_email'] ?? '');
        $adminPassword = $body['admin_password'] ?? '';
        $phone = trim($body['phone'] ?? '');
        $websiteUrl = trim($body['website_url'] ?? '');
        $description = trim($body['description'] ?? '');

        if (!$companyName || !$slug || !$adminEmail || !$adminPassword) {
            jsonResponse(['success' => false, 'error' => 'Company name, slug, email, and password are required'], 400);
        }

        $cleanSlug = crmSlugify($slug);

        $pdo->beginTransaction();
        try {
            $check = $pdo->prepare("SELECT id FROM crm_admins WHERE slug = ?");
            $check->execute([$cleanSlug]);
            if ($check->fetch()) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'Tenant slug already in use'], 409);
            }

            $stmt = $pdo->prepare("
                INSERT INTO crm_admins (slug, company_display_name, status, website_url, description, phone, email, is_active)
                VALUES (?, ?, 'active', ?, ?, ?, ?, 1)
            ");
            $stmt->execute([$cleanSlug, $companyName, $websiteUrl ?: null, $description ?: null, $phone ?: null, $adminEmail]);
            $adminId = (int)$pdo->lastInsertId();

            $pwdHash = password_hash($adminPassword, PASSWORD_DEFAULT);
            $uStmt = $pdo->prepare("
                INSERT INTO crm_users (name, email, phone, password_hash, role, admin_id, status)
                VALUES (?, ?, ?, ?, 'admin', ?, 'active')
            ");
            $uStmt->execute([$adminName ?: $companyName, strtolower($adminEmail), $phone ?: null, $pwdHash, $adminId]);

            $cStmt = $pdo->prepare("
                INSERT INTO crm_career_pages (admin_id, enabled, page_title, headline, description, primary_color, secondary_color, button_color)
                VALUES (?, 1, ?, 'Join our world-class team', 'Explore exciting opportunities and grow with us.', '#d6c180', '#0F172A', '#d6c180')
            ");
            $cStmt->execute([$adminId, "Careers at {$companyName}"]);

            $pdo->commit();

            jsonResponse([
                'success' => true,
                'message' => 'Tenant created successfully',
                'data' => ['id' => $adminId, 'slug' => $cleanSlug, 'company_display_name' => $companyName]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Failed to create tenant: ' . $e->getMessage()], 500);
        }
    }

    // 4. GET /drilldown/:adminId
    if (preg_match('#^/drilldown/(\d+)$#', $subpath, $matches) && $method === 'GET') {
        $adminId = (int)$matches[1];
        $tStmt = $pdo->prepare("SELECT * FROM crm_admins WHERE id = ?");
        $tStmt->execute([$adminId]);
        $tenant = $tStmt->fetch();
        if (!$tenant) {
            jsonResponse(['success' => false, 'error' => 'Tenant not found'], 404);
        }

        // Employees Roster
        $eStmt = $pdo->prepare("
            SELECT e.*, u.name, u.email, u.phone, u.status as user_status,
                   GROUP_CONCAT(em.module) as assigned_modules
            FROM crm_employees e
            JOIN crm_users u ON e.user_id = u.id
            LEFT JOIN crm_employee_modules em ON em.employee_id = e.id
            WHERE e.admin_id = ?
            GROUP BY e.id
            ORDER BY e.created_at DESC
        ");
        $eStmt->execute([$adminId]);
        $employees = $eStmt->fetchAll();
        foreach ($employees as &$emp) {
            $emp['modules'] = !empty($emp['assigned_modules']) ? explode(',', $emp['assigned_modules']) : [];
        }

        // Recent Attendance
        $aStmt = $pdo->prepare("
            SELECT ar.*, u.name as employee_name, e.employee_code, e.designation
            FROM crm_attendance_records ar
            JOIN crm_employees e ON ar.employee_id = e.id
            JOIN crm_users u ON e.user_id = u.id
            WHERE ar.admin_id = ?
            ORDER BY ar.date DESC, ar.id DESC
            LIMIT 100
        ");
        $aStmt->execute([$adminId]);
        $attendance = $aStmt->fetchAll();

        // Sales & Leads
        $sStmt = $pdo->prepare("
            SELECT s.*, u.name as logged_by_name
            FROM crm_daily_sales s
            LEFT JOIN crm_employees e ON s.employee_id = e.id
            LEFT JOIN crm_users u ON e.user_id = u.id
            WHERE s.admin_id = ?
            ORDER BY s.sale_date DESC
            LIMIT 50
        ");
        $sStmt->execute([$adminId]);
        $sales = $sStmt->fetchAll();

        $lStmt = $pdo->prepare("
            SELECT l.*, u.name as assignee_name
            FROM crm_sales_leads l
            LEFT JOIN crm_employees e ON l.employee_id = e.id
            LEFT JOIN crm_users u ON e.user_id = u.id
            WHERE l.admin_id = ?
            ORDER BY l.created_at DESC
            LIMIT 50
        ");
        $lStmt->execute([$adminId]);
        $leads = $lStmt->fetchAll();

        // Jobs
        $jStmt = $pdo->prepare("
            SELECT j.*,
              (SELECT COUNT(*) FROM crm_candidates c WHERE c.job_id = j.id) as candidate_count
            FROM crm_jobs j
            WHERE j.admin_id = ?
            ORDER BY j.created_at DESC
        ");
        $jStmt->execute([$adminId]);
        $jobs = $jStmt->fetchAll();

        // Career Page Branding & Settings
        $cpStmt = $pdo->prepare("SELECT * FROM crm_career_pages WHERE admin_id = ?");
        $cpStmt->execute([$adminId]);
        $careerPage = $cpStmt->fetch() ?: [
            'admin_id' => $adminId,
            'enabled' => 1,
            'widget_enabled' => 1,
            'page_title' => 'Careers at ' . ($tenant['company_display_name'] ?? 'Company'),
            'headline' => 'Build your career with us.',
            'description' => 'Explore exciting career opportunities across departments.',
            'primary_color' => '#d6c180',
            'secondary_color' => '#0F172A',
            'button_color' => '#d6c180',
            'show_salary' => 1,
            'show_location' => 1,
            'show_company_description' => 1
        ];
        if ($careerPage && !isset($careerPage['widget_enabled'])) {
            $careerPage['widget_enabled'] = 1;
        }

        jsonResponse([
            'success' => true,
            'data' => [
                'tenant' => $tenant,
                'employees' => $employees,
                'attendance' => $attendance,
                'sales' => $sales,
                'leads' => $leads,
                'jobs' => $jobs,
                'career_page' => $careerPage
            ]
        ]);
    }

    // 5. POST /impersonate/:adminId
    if (preg_match('#^/impersonate/(\d+)$#', $subpath, $matches) && $method === 'POST') {
        $adminId = (int)$matches[1];
        $tStmt = $pdo->prepare("SELECT * FROM crm_admins WHERE id = ?");
        $tStmt->execute([$adminId]);
        $tenant = $tStmt->fetch();
        if (!$tenant) {
            jsonResponse(['success' => false, 'error' => 'Tenant not found'], 404);
        }

        $uStmt = $pdo->prepare("SELECT * FROM crm_users WHERE admin_id = ? AND role = 'admin' LIMIT 1");
        $uStmt->execute([$adminId]);
        $adminUser = $uStmt->fetch() ?: ['id' => 0, 'name' => 'Admin', 'email' => $tenant['email'] ?: 'admin@company.com'];

        $payload = [
            'id' => (int)$adminUser['id'],
            'name' => "{$adminUser['name']} (via Master)",
            'email' => $adminUser['email'],
            'role' => 'admin',
            'admin_id' => (int)$tenant['id'],
            'tenant_slug' => $tenant['slug'],
            'company_name' => $tenant['company_display_name'],
            'modules' => ['master', 'admin', 'recruitment', 'sales', 'attendance'],
            'impersonatedBy' => $user['id']
        ];

        $token = CrmJwt::sign($payload, getCrmJwtSecret(), 86400);

        jsonResponse([
            'success' => true,
            'token' => $token,
            'user' => $payload
        ]);
    }

    // 6. PUT /tenants/:id (Update Tenant Details & Reset Admin Password)
    if (preg_match('#^/tenants/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $adminId = (int)$matches[1];
        $body = getJsonInput();
        $companyName = trim($body['company_display_name'] ?? '');
        $websiteUrl = trim($body['website_url'] ?? '');
        $description = trim($body['description'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $email = trim($body['email'] ?? '');
        $adminPassword = trim($body['admin_password'] ?? '');

        $pdo->beginTransaction();
        try {
            $uStmt = $pdo->prepare("
                UPDATE crm_admins SET
                    company_display_name = COALESCE(?, company_display_name),
                    website_url = ?,
                    description = ?,
                    phone = ?,
                    email = ?
                WHERE id = ?
            ");
            $uStmt->execute([
                $companyName ?: null,
                $websiteUrl ?: null,
                $description ?: null,
                $phone ?: null,
                $email ?: null,
                $adminId
            ]);

            // If new password provided by Master Admin, hash and update Company Admin's user account
            if ($adminPassword) {
                $pwdHash = password_hash($adminPassword, PASSWORD_DEFAULT);
                $pStmt = $pdo->prepare("UPDATE crm_users SET password_hash = ? WHERE admin_id = ? AND role = 'admin'");
                $pStmt->execute([$pwdHash, $adminId]);
            }

            // If email changed, update admin user login email too
            if ($email) {
                $eStmt = $pdo->prepare("UPDATE crm_users SET email = ? WHERE admin_id = ? AND role = 'admin'");
                $eStmt->execute([strtolower($email), $adminId]);
            }

            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Organization details updated successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // 7. PUT /tenants/:id/status
    if (preg_match('#^/tenants/(\d+)/status$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $adminId = (int)$matches[1];
        $body = getJsonInput();
        $status = $body['status'] ?? '';
        if (!in_array($status, ['active', 'revoked'])) {
            jsonResponse(['success' => false, 'error' => 'Status must be active or revoked'], 400);
        }

        $stmt = $pdo->prepare("UPDATE crm_admins SET status = ? WHERE id = ?");
        $stmt->execute([$status, $adminId]);
        jsonResponse(['success' => true, 'message' => "Tenant status updated to {$status}"]);
    }

    // 8. DELETE /tenants/:id
    if (preg_match('#^/tenants/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $adminId = (int)$matches[1];
        $pdo->beginTransaction();
        try {
            $pdo->prepare("DELETE FROM crm_users WHERE admin_id = ?")->execute([$adminId]);
            $pdo->prepare("DELETE FROM crm_admins WHERE id = ?")->execute([$adminId]);
            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Organization and all associated data deleted successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // 9. GET /tenants/:id/career-settings
    if (preg_match('#^/tenants/(\d+)/career-settings$#', $subpath, $matches) && $method === 'GET') {
        $adminId = (int)$matches[1];
        $tStmt = $pdo->prepare("SELECT id, slug, company_display_name, website_url FROM crm_admins WHERE id = ?");
        $tStmt->execute([$adminId]);
        $tenant = $tStmt->fetch();
        if (!$tenant) {
            jsonResponse(['success' => false, 'error' => 'Tenant not found'], 404);
        }

        $cStmt = $pdo->prepare("SELECT * FROM crm_career_pages WHERE admin_id = ?");
        $cStmt->execute([$adminId]);
        $settings = $cStmt->fetch();

        if (!$settings) {
            $settings = [
                'admin_id' => $adminId,
                'enabled' => 1,
                'widget_enabled' => 1,
                'page_title' => 'Careers at ' . ($tenant['company_display_name'] ?? 'Company'),
                'headline' => 'Build your career with us.',
                'description' => 'Explore exciting career opportunities across departments.',
                'primary_color' => '#d6c180',
                'secondary_color' => '#0F172A',
                'button_color' => '#d6c180',
                'show_salary' => 1,
                'show_location' => 1,
                'show_company_description' => 1
            ];
        } elseif (!isset($settings['widget_enabled'])) {
            $settings['widget_enabled'] = 1;
        }

        jsonResponse([
            'success' => true,
            'tenant' => $tenant,
            'data' => $settings
        ]);
    }

    // 10. PUT /tenants/:id/career-settings (Update Branding & Career Portal Settings)
    if (preg_match('#^/tenants/(\d+)/career-settings$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $adminId = (int)$matches[1];
        $tStmt = $pdo->prepare("SELECT id FROM crm_admins WHERE id = ?");
        $tStmt->execute([$adminId]);
        if (!$tStmt->fetch()) {
            jsonResponse(['success' => false, 'error' => 'Tenant not found'], 404);
        }

        $body = getJsonInput();
        $enabled = isset($body['enabled']) ? (!empty($body['enabled']) ? 1 : 0) : 1;
        $widgetEnabled = isset($body['widget_enabled']) ? (!empty($body['widget_enabled']) ? 1 : 0) : 1;
        $headline = $body['headline'] ?? null;
        $description = $body['description'] ?? null;
        $primaryColor = $body['primary_color'] ?? '#d6c180';
        $secondaryColor = $body['secondary_color'] ?? '#0F172A';
        $buttonColor = $body['button_color'] ?? '#d6c180';
        $showSalary = isset($body['show_salary']) ? (!empty($body['show_salary']) ? 1 : 0) : 1;
        $showLocation = isset($body['show_location']) ? (!empty($body['show_location']) ? 1 : 0) : 1;
        $showCompanyDesc = isset($body['show_company_description']) ? (!empty($body['show_company_description']) ? 1 : 0) : 1;

        $stmt = $pdo->prepare("
            INSERT INTO crm_career_pages (
                admin_id, enabled, widget_enabled, headline, description, primary_color,
                secondary_color, button_color, show_salary, show_location, show_company_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                enabled = VALUES(enabled),
                widget_enabled = VALUES(widget_enabled),
                headline = VALUES(headline),
                description = VALUES(description),
                primary_color = VALUES(primary_color),
                secondary_color = VALUES(secondary_color),
                button_color = VALUES(button_color),
                show_salary = VALUES(show_salary),
                show_location = VALUES(show_location),
                show_company_description = VALUES(show_company_description)
        ");
        $stmt->execute([
            $adminId,
            $enabled,
            $widgetEnabled,
            $headline,
            $description,
            $primaryColor,
            $secondaryColor,
            $buttonColor,
            $showSalary,
            $showLocation,
            $showCompanyDesc
        ]);

        jsonResponse([
            'success' => true,
            'message' => 'Career portal branding & widget settings saved successfully',
            'data' => [
                'enabled' => $enabled,
                'widget_enabled' => $widgetEnabled
            ]
        ]);
    }

    jsonResponse(['success' => false, 'error' => "Master route '{$subpath}' not found"], 404);
}
