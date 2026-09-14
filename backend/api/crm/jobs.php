<?php
/**
 * Recruitment Jobs & Career Page Settings Controller
 */

require_once __DIR__ . '/helpers.php';

function handleJobsRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    requireModule($user, 'recruitment');
    $adminId = getAdminId($user);

    // 1. Career Page Settings
    if ($subpath === '/career-settings' && $method === 'GET') {
        $cStmt = $pdo->prepare("SELECT * FROM crm_career_pages WHERE admin_id = ?");
        $cStmt->execute([$adminId]);
        $settings = $cStmt->fetch();

        $tStmt = $pdo->prepare("SELECT slug, company_display_name, website_url FROM crm_admins WHERE id = ?");
        $tStmt->execute([$adminId]);
        $tenant = $tStmt->fetch();

        if (!$settings) {
            $settings = [
                'enabled' => 1,
                'page_title' => 'Careers at ' . ($tenant['company_display_name'] ?? 'Company'),
                'headline' => 'Build your career with us.',
                'description' => 'Explore opportunities across engineering, product, marketing, and operations.',
                'primary_color' => '#d6c180',
                'secondary_color' => '#0F172A',
                'button_color' => '#d6c180',
                'show_salary' => 1,
                'show_location' => 1,
                'show_company_description' => 1
            ];
        }

        jsonResponse([
            'success' => true,
            'tenant' => $tenant,
            'data' => $settings
        ]);
    }

    if ($subpath === '/career-settings' && in_array($method, ['PUT', 'POST'])) {
        $body = getJsonInput();
        $enabled = !empty($body['enabled']) ? 1 : 0;
        $headline = $body['headline'] ?? null;
        $description = $body['description'] ?? null;
        $primaryColor = $body['primary_color'] ?? '#d6c180';
        $showSalary = !empty($body['show_salary']) ? 1 : 0;
        $showLocation = !empty($body['show_location']) ? 1 : 0;

        $stmt = $pdo->prepare("
            INSERT INTO crm_career_pages (
                admin_id, enabled, headline, description, primary_color,
                show_salary, show_location
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                enabled = VALUES(enabled),
                headline = VALUES(headline),
                description = VALUES(description),
                primary_color = VALUES(primary_color),
                show_salary = VALUES(show_salary),
                show_location = VALUES(show_location)
        ");
        $stmt->execute([
            $adminId,
            $enabled,
            $headline,
            $description,
            $primaryColor,
            $showSalary,
            $showLocation
        ]);

        jsonResponse(['success' => true, 'message' => 'Career page settings saved successfully']);
    }

    // 2. GET / (List Jobs)
    if (($subpath === '' || $subpath === '/') && $method === 'GET') {
        $stmt = $pdo->prepare("
            SELECT 
                j.*,
                j.job_type as type,
                j.requirements as skills,
                (SELECT COUNT(*) FROM crm_candidates c WHERE c.job_id = j.id) as candidate_count,
                (SELECT COUNT(*) FROM crm_applications a WHERE a.job_id = j.id) as application_count
            FROM crm_jobs j
            WHERE j.admin_id = ?
            ORDER BY j.created_at DESC
        ");
        $stmt->execute([$adminId]);
        $jobs = $stmt->fetchAll();

        jsonResponse(['success' => true, 'data' => $jobs]);
    }

    // 3. POST / (Create Job)
    if (($subpath === '' || $subpath === '/') && $method === 'POST') {
        $body = getJsonInput();
        $title = trim($body['title'] ?? '');
        $department = trim($body['department'] ?? 'General');
        $location = trim($body['location'] ?? 'Remote');
        $jobType = trim($body['type'] ?? $body['job_type'] ?? 'Full-time');
        $workMode = trim($body['work_mode'] ?? 'On-site');
        $isSalaryDisclosed = isset($body['is_salary_disclosed']) ? (!empty($body['is_salary_disclosed']) ? 1 : 0) : 1;
        $salaryMin = (isset($body['salary_min']) && is_numeric($body['salary_min'])) ? (float)$body['salary_min'] : null;
        $salaryMax = (isset($body['salary_max']) && is_numeric($body['salary_max'])) ? (float)$body['salary_max'] : null;

        $salaryRange = trim($body['salary_range'] ?? '');
        if (!$salaryRange) {
            if (!$isSalaryDisclosed) {
                $salaryRange = 'Not disclosed';
            } elseif ($salaryMin !== null && $salaryMax !== null) {
                if ($salaryMin >= 100000 || $salaryMax >= 100000) {
                    $minLpa = round($salaryMin / 100000, 1);
                    $maxLpa = round($salaryMax / 100000, 1);
                    $salaryRange = "₹{$minLpa} - {$maxLpa} LPA";
                } else {
                    $salaryRange = "₹" . number_format($salaryMin) . " - ₹" . number_format($salaryMax);
                }
            } elseif ($salaryMin !== null) {
                $salaryRange = "From ₹" . number_format($salaryMin);
            }
        }
        $experience = trim($body['experience'] ?? '');
        if (!$experience && (isset($body['experience_min']) || isset($body['experience_max']))) {
            $experience = trim(($body['experience_min'] ?? '') . ' - ' . ($body['experience_max'] ?? '') . ' yrs');
        }
        $requirements = $body['skills'] ?? $body['requirements'] ?? null;
        $status = trim($body['status'] ?? 'Open');
        $description = $body['description'] ?? '';

        if (!$title) {
            jsonResponse(['success' => false, 'error' => 'Job title is required'], 400);
        }

        $jobSlug = crmSlugify($title) . '-' . rand(1000, 9999);

        $stmt = $pdo->prepare("
            INSERT INTO crm_jobs (
                admin_id, title, slug, department, location, work_mode,
                job_type, experience, salary_range, salary_min, salary_max, is_salary_disclosed,
                description, requirements, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $adminId,
            $title,
            $jobSlug,
            $department,
            $location,
            $workMode,
            $jobType,
            $experience ?: null,
            $salaryRange ?: null,
            $salaryMin,
            $salaryMax,
            $isSalaryDisclosed,
            $description,
            $requirements,
            $status
        ]);

        jsonResponse([
            'success' => true,
            'message' => 'Job posting created successfully',
            'data' => ['id' => (int)$pdo->lastInsertId(), 'slug' => $jobSlug]
        ], 201);
    }

    // 4. PATCH /:id/status
    if (preg_match('#^/(\d+)/status$#', $subpath, $matches) && in_array($method, ['PATCH', 'POST', 'PUT'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();
        $status = trim($body['status'] ?? '');
        $validStatuses = ['published', 'Draft', 'draft', 'paused', 'Closed', 'closed', 'expired', 'archived', 'Open', 'On Hold'];
        if (!in_array($status, $validStatuses)) {
            jsonResponse(['success' => false, 'error' => 'Invalid status'], 400);
        }

        $stmt = $pdo->prepare("UPDATE crm_jobs SET status = ? WHERE id = ? AND admin_id = ?");
        $stmt->execute([$status, $id, $adminId]);

        jsonResponse(['success' => true, 'message' => "Job status updated to {$status}"]);
    }

    // 5. PUT /:id (Update Job)
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();

        $title = trim($body['title'] ?? '');
        $department = trim($body['department'] ?? 'General');
        $location = trim($body['location'] ?? 'Remote');
        $jobType = trim($body['type'] ?? $body['job_type'] ?? 'Full-time');
        $workMode = trim($body['work_mode'] ?? 'On-site');

        $isSalaryDisclosed = isset($body['is_salary_disclosed']) ? (!empty($body['is_salary_disclosed']) ? 1 : 0) : 1;
        $salaryMin = (isset($body['salary_min']) && is_numeric($body['salary_min'])) ? (float)$body['salary_min'] : null;
        $salaryMax = (isset($body['salary_max']) && is_numeric($body['salary_max'])) ? (float)$body['salary_max'] : null;

        $salaryRange = trim($body['salary_range'] ?? '');
        if (!$salaryRange) {
            if (!$isSalaryDisclosed) {
                $salaryRange = 'Not disclosed';
            } elseif ($salaryMin !== null && $salaryMax !== null) {
                if ($salaryMin >= 100000 || $salaryMax >= 100000) {
                    $minLpa = round($salaryMin / 100000, 1);
                    $maxLpa = round($salaryMax / 100000, 1);
                    $salaryRange = "₹{$minLpa} - {$maxLpa} LPA";
                } else {
                    $salaryRange = "₹" . number_format($salaryMin) . " - ₹" . number_format($salaryMax);
                }
            } elseif ($salaryMin !== null) {
                $salaryRange = "From ₹" . number_format($salaryMin);
            }
        }
        $experience = trim($body['experience'] ?? '');
        if (!$experience && (isset($body['experience_min']) || isset($body['experience_max']))) {
            $experience = trim(($body['experience_min'] ?? '') . ' - ' . ($body['experience_max'] ?? '') . ' yrs');
        }
        $requirements = $body['skills'] ?? $body['requirements'] ?? null;
        $status = trim($body['status'] ?? 'Open');
        $description = $body['description'] ?? '';

        $stmt = $pdo->prepare("
            UPDATE crm_jobs SET
                title = ?,
                department = ?,
                location = ?,
                work_mode = ?,
                job_type = ?,
                experience = ?,
                salary_range = ?,
                salary_min = ?,
                salary_max = ?,
                is_salary_disclosed = ?,
                description = ?,
                requirements = ?,
                status = ?
            WHERE id = ? AND admin_id = ?
        ");
        $stmt->execute([
            $title,
            $department,
            $location,
            $workMode,
            $jobType,
            $experience ?: null,
            $salaryRange ?: null,
            $salaryMin,
            $salaryMax,
            $isSalaryDisclosed,
            $description,
            $requirements,
            $status,
            $id,
            $adminId
        ]);

        jsonResponse(['success' => true, 'message' => 'Job updated successfully']);
    }

    // 6. DELETE /:id
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $id = (int)$matches[1];
        $pdo->prepare("DELETE FROM crm_jobs WHERE id = ? AND admin_id = ?")->execute([$id, $adminId]);
        jsonResponse(['success' => true, 'message' => 'Job posting deleted successfully']);
    }

    jsonResponse(['success' => false, 'error' => "Jobs route '{$subpath}' not found"], 404);
}
