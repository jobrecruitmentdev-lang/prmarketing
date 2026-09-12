<?php
/**
 * Public Career Portal API Controller (Publicly Accessible)
 */

require_once __DIR__ . '/helpers.php';

function handlePublicRoutes(string $subpath, string $method, PDO $pdo): void {
    $uploadsDir = __DIR__ . '/../../uploads/resumes';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }

    $handleResumeUpload = function() use ($uploadsDir): ?string {
        if (empty($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
            return null;
        }
        $file = $_FILES['resume'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowed = ['pdf', 'doc', 'docx', 'rtf', 'txt'];
        if (!in_array($ext, $allowed)) {
            jsonResponse(['success' => false, 'error' => 'Only PDF, DOC, DOCX files are permitted for resumes'], 400);
        }

        $safeBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
        $uniqueName = "{$safeBase}-" . time() . '-' . rand(1000, 9999) . ".{$ext}";
        $destPath = "{$uploadsDir}/{$uniqueName}";

        if (is_uploaded_file($file['tmp_name'])) {
            move_uploaded_file($file['tmp_name'], $destPath);
        } else {
            rename($file['tmp_name'], $destPath);
        }

        return $uniqueName;
    };

    // Helper to resolve company slug safely (fall back to active company if 'default' or empty)
    $resolveCompanySlug = function(string $rawSlug) use ($pdo): string {
        $slug = trim(strtolower($rawSlug));
        if ($slug === 'default' || empty($slug)) {
            $def = $pdo->query("SELECT slug FROM crm_admins WHERE status = 'active' ORDER BY id ASC LIMIT 1")->fetch();
            if ($def && !empty($def['slug'])) {
                return strtolower($def['slug']);
            }
        }
        return $slug;
    };

    // 1. GET /companies/:slug
    if (preg_match('#^/companies/([^/]+)$#', $subpath, $matches) && $method === 'GET') {
        $slug = $resolveCompanySlug($matches[1]);

        $stmt = $pdo->prepare("
            SELECT id, slug, company_display_name, logo_url, website_url, description, industry, location 
            FROM crm_admins 
            WHERE slug = ? AND status = 'active'
        ");
        $stmt->execute([$slug]);
        $company = $stmt->fetch();

        if (!$company) {
            jsonResponse(['success' => false, 'error' => 'Company career portal not found or inactive'], 404);
        }

        $cStmt = $pdo->prepare("SELECT * FROM crm_career_pages WHERE admin_id = ? AND enabled = 1");
        $cStmt->execute([$company['id']]);
        $settings = $cStmt->fetch();

        if (!$settings) {
            $settings = [
                'enabled' => 1,
                'page_title' => "Careers at {$company['company_display_name']}",
                'headline' => 'Build your career with us.',
                'description' => $company['description'] ?: 'Explore exciting engineering, product, and operations positions.',
                'primary_color' => '#d6c180',
                'secondary_color' => '#0F172A',
                'button_color' => '#d6c180',
                'font_family' => 'Inter, sans-serif',
                'show_salary' => 1,
                'show_location' => 1,
                'show_company_description' => 1
            ];
        }

        jsonResponse([
            'success' => true,
            'data' => [
                'company' => [
                    'id' => (int)$company['id'],
                    'name' => $company['company_display_name'],
                    'slug' => $company['slug'],
                    'logo' => $company['logo_url'],
                    'website' => $company['website_url'],
                    'industry' => $company['industry'],
                    'location' => $company['location']
                ],
                'career_page' => $settings
            ]
        ]);
    }

    // 2. GET /companies/:slug/jobs
    if (preg_match('#^/companies/([^/]+)/jobs$#', $subpath, $matches) && $method === 'GET') {
        $slug = $resolveCompanySlug($matches[1]);

        $stmt = $pdo->prepare("SELECT id, slug, company_display_name, logo_url FROM crm_admins WHERE slug = ? AND status = 'active'");
        $stmt->execute([$slug]);
        $company = $stmt->fetch();

        if (!$company) {
            jsonResponse(['success' => false, 'error' => 'Company not found'], 404);
        }

        $query = "
            SELECT 
                id, title, slug, department, location, job_type as type, job_type, work_mode,
                salary_range, experience, requirements as skills, description, created_at as published_at, created_at
            FROM crm_jobs
            WHERE admin_id = ? AND (status = 'published' OR status = 'Open')
        ";
        $params = [$company['id']];

        $department = $_GET['department'] ?? null;
        $location = $_GET['location'] ?? null;
        $workMode = $_GET['work_mode'] ?? null;
        $search = $_GET['search'] ?? null;

        if ($department) {
            $query .= " AND department = ?";
            $params[] = $department;
        }
        if ($location) {
            $query .= " AND location LIKE ?";
            $params[] = "%{$location}%";
        }
        if ($workMode) {
            $query .= " AND work_mode = ?";
            $params[] = $workMode;
        }
        if ($search) {
            $query .= " AND (title LIKE ? OR requirements LIKE ? OR description LIKE ?)";
            $like = "%{$search}%";
            $params[] = $like;
            $params[] = $like;
            $params[] = $like;
        }

        $query .= " ORDER BY created_at DESC";

        $jStmt = $pdo->prepare($query);
        $jStmt->execute($params);
        $jobs = $jStmt->fetchAll();

        jsonResponse([
            'success' => true,
            'company' => [
                'name' => $company['company_display_name'],
                'slug' => $company['slug'],
                'logo' => $company['logo_url']
            ],
            'count' => count($jobs),
            'jobs' => $jobs
        ]);
    }

    // 3. GET /companies/:slug/jobs/:jobSlug
    if (preg_match('#^/companies/([^/]+)/jobs/([^/]+)$#', $subpath, $matches) && $method === 'GET') {
        $slug = $resolveCompanySlug($matches[1]);
        $jobSlug = trim($matches[2]);

        $stmt = $pdo->prepare("SELECT id, slug, company_display_name, logo_url, website_url FROM crm_admins WHERE slug = ? AND status = 'active'");
        $stmt->execute([$slug]);
        $company = $stmt->fetch();

        if (!$company) {
            jsonResponse(['success' => false, 'error' => 'Company not found'], 404);
        }

        $jStmt = $pdo->prepare("
            SELECT 
                id, title, slug, department, location, job_type as type, job_type, work_mode,
                salary_range, experience, requirements as skills, description, created_at as published_at, created_at
            FROM crm_jobs
            WHERE admin_id = ? AND (slug = ? OR id = ?) AND (status = 'published' OR status = 'Open')
            LIMIT 1
        ");
        $jStmt->execute([$company['id'], $jobSlug, (int)$jobSlug]);
        $job = $jStmt->fetch();

        if (!$job) {
            jsonResponse(['success' => false, 'error' => 'Job opening not found or no longer accepting applications'], 404);
        }

        jsonResponse([
            'success' => true,
            'company' => [
                'name' => $company['company_display_name'],
                'slug' => $company['slug'],
                'logo' => $company['logo_url'],
                'website' => $company['website_url']
            ],
            'job' => $job
        ]);
    }

    // 4. POST /jobs/:jobId/applications
    if (preg_match('#^/jobs/(\d+)/applications$#', $subpath, $matches) && $method === 'POST') {
        $jobId = (int)$matches[1];
        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $email = trim(strtolower($body['email'] ?? ''));
        $phone = trim($body['phone'] ?? '');
        $lastCompany = trim($body['last_company'] ?? '');
        $coverLetter = trim($body['cover_letter'] ?? '');
        $source = trim($body['source'] ?? 'hosted_career_page');
        $utmSource = $body['utm_source'] ?? null;
        $utmMedium = $body['utm_medium'] ?? null;

        if (!$name || !$email) {
            jsonResponse(['success' => false, 'error' => 'Candidate name and email are required'], 400);
        }

        $jStmt = $pdo->prepare("SELECT id, admin_id, title, status FROM crm_jobs WHERE id = ?");
        $jStmt->execute([$jobId]);
        $job = $jStmt->fetch();

        if (!$job || (!in_array($job['status'], ['published', 'Open']))) {
            jsonResponse(['success' => false, 'error' => 'Job posting is no longer available'], 404);
        }

        $adminId = (int)$job['admin_id'];
        $resumeFilename = $handleResumeUpload();
        $hasResume = $resumeFilename ? 1 : 0;

        $pdo->beginTransaction();
        try {
            $cStmt = $pdo->prepare("SELECT id FROM crm_candidates WHERE email = ? AND admin_id = ?");
            $cStmt->execute([$email, $adminId]);
            $existing = $cStmt->fetch();
            $candidateId = null;

            if ($existing) {
                $candidateId = (int)$existing['id'];
                $uSql = "
                    UPDATE crm_candidates SET
                        name = ?,
                        phone = COALESCE(?, phone),
                        last_company = COALESCE(?, last_company),
                        resume_filename = COALESCE(?, resume_filename),
                        has_resume = CASE WHEN ? = 1 THEN 1 ELSE has_resume END,
                        job_id = ?
                    WHERE id = ?
                ";
                $pdo->prepare($uSql)->execute([$name, $phone ?: null, $lastCompany ?: null, $resumeFilename, $hasResume, $jobId, $candidateId]);
            } else {
                $iSql = "
                    INSERT INTO crm_candidates (admin_id, job_id, name, email, phone, last_company, resume_filename, has_resume, stage, source, applied_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'applied', ?, CURDATE())
                ";
                $pdo->prepare($iSql)->execute([$adminId, $jobId, $name, $email, $phone ?: null, $lastCompany ?: null, $resumeFilename, $hasResume, $source]);
                $candidateId = (int)$pdo->lastInsertId();
            }

            $aSql = "
                INSERT INTO crm_applications (admin_id, job_id, candidate_id, name, email, phone, resume_path, cover_letter, source, status, utm_source, utm_medium)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)
            ";
            $pdo->prepare($aSql)->execute([
                $adminId,
                $jobId,
                $candidateId,
                $name,
                $email,
                $phone ?: null,
                $resumeFilename,
                $coverLetter ?: null,
                $source,
                $utmSource,
                $utmMedium
            ]);
            $applicationId = (int)$pdo->lastInsertId();

            if ($coverLetter) {
                $nSql = "INSERT INTO crm_candidate_notes (candidate_id, employee_id, note_text) VALUES (?, NULL, ?)";
                $pdo->prepare($nSql)->execute([$candidateId, "Cover Letter from Application ({$source}):\n{$coverLetter}"]);
            }

            $pdo->commit();

            jsonResponse([
                'success' => true,
                'message' => 'Application submitted successfully! Our recruitment team will review your profile.',
                'data' => [
                    'application_id' => $applicationId,
                    'candidate_id' => $candidateId,
                    'job_id' => $jobId,
                    'job_title' => $job['title']
                ]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Failed to process application: ' . $e->getMessage()], 500);
        }
    }

    // 5. POST /companies/:slug/drop-cv
    if (preg_match('#^/companies/([^/]+)/drop-cv$#', $subpath, $matches) && $method === 'POST') {
        $slug = $resolveCompanySlug($matches[1]);
        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $email = trim(strtolower($body['email'] ?? ''));
        $phone = trim($body['phone'] ?? '');
        $preferredRole = trim($body['preferred_role'] ?? $body['department'] ?? 'General Opportunity');
        $note = trim($body['note'] ?? '');

        if (!$name) {
            jsonResponse(['success' => false, 'error' => 'Full name is required'], 400);
        }

        $stmt = $pdo->prepare("SELECT id, company_display_name FROM crm_admins WHERE slug = ? AND status = 'active'");
        $stmt->execute([$slug]);
        $company = $stmt->fetch();

        if (!$company) {
            jsonResponse(['success' => false, 'error' => 'Company career portal not found'], 404);
        }

        $adminId = (int)$company['id'];
        $resumeFilename = $handleResumeUpload();
        $hasResume = $resumeFilename ? 1 : 0;

        $pdo->beginTransaction();
        try {
            $candidateId = null;
            if ($email) {
                $cStmt = $pdo->prepare("SELECT id FROM crm_candidates WHERE email = ? AND admin_id = ?");
                $cStmt->execute([$email, $adminId]);
                $existing = $cStmt->fetch();
                if ($existing) $candidateId = (int)$existing['id'];
            }

            if ($candidateId) {
                $pdo->prepare("
                    UPDATE crm_candidates SET
                        name = ?,
                        phone = COALESCE(?, phone),
                        last_company = COALESCE(?, last_company),
                        resume_filename = COALESCE(?, resume_filename),
                        has_resume = COALESCE(?, has_resume),
                        tags = ?,
                        source = 'direct_cv',
                        stage = 'applied'
                    WHERE id = ? AND admin_id = ?
                ")->execute([
                    $name,
                    $phone ?: null,
                    $preferredRole,
                    $resumeFilename,
                    $hasResume,
                    "direct_cv,{$preferredRole}",
                    $candidateId,
                    $adminId
                ]);
            } else {
                $pdo->prepare("
                    INSERT INTO crm_candidates (
                        admin_id, job_id, name, email, phone, last_company,
                        resume_filename, has_resume, stage, source, tags, applied_date, created_at
                    ) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, 'applied', 'direct_cv', ?, CURDATE(), NOW())
                ")->execute([
                    $adminId,
                    $name,
                    $email ?: null,
                    $phone ?: null,
                    $preferredRole,
                    $resumeFilename,
                    $hasResume,
                    "direct_cv,{$preferredRole}"
                ]);
                $candidateId = (int)$pdo->lastInsertId();
            }

            if ($note) {
                $pdo->prepare("INSERT INTO crm_candidate_notes (candidate_id, note_text) VALUES (?, ?)")
                    ->execute([$candidateId, "Candidate Message: {$note}"]);
            }

            $pdo->commit();

            jsonResponse([
                'success' => true,
                'message' => 'Your CV has been received! Our recruitment team will get in touch for matching opportunities.',
                'data' => [
                    'candidate_id' => $candidateId,
                    'name' => $name,
                    'preferred_role' => $preferredRole,
                    'has_resume' => $hasResume
                ]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Failed to submit CV: ' . $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => false, 'error' => "Public career route '{$subpath}' not found"], 404);
}
