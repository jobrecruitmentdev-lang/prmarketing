<?php
/**
 * Candidates & Recruitment Pipeline Controller
 */

require_once __DIR__ . '/helpers.php';

function handleCandidatesRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    requireModule($user, 'recruitment');
    $adminId = getAdminId($user);

    $uploadsDir = __DIR__ . '/../../uploads/resumes';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
    }

    // Helper: Handle uploaded resume file
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
            // For custom PUT parser
            rename($file['tmp_name'], $destPath);
        }

        return $uniqueName;
    };

    // 1. GET /resumes/:filename or /resumes?file=:filename (Secure resume streaming)
    $isResumeRoute = false;
    $filename = null;

    if (preg_match('#^/resumes/([^/]+)$#', $subpath, $matches) || preg_match('#^/stream-resume/([^/]+)$#', $subpath, $matches)) {
        $isResumeRoute = true;
        $filename = basename($matches[1]);
    } elseif (in_array($subpath, ['/resumes', '/resumes/', '/stream-resume', '/stream-resume/']) && (!empty($_GET['file']) || !empty($_GET['filename']))) {
        $isResumeRoute = true;
        $filename = basename($_GET['file'] ?? $_GET['filename']);
    }

    if ($isResumeRoute && $method === 'GET' && $filename) {
        $cStmt = $pdo->prepare("SELECT id FROM crm_candidates WHERE resume_filename = ? AND admin_id = ?");
        $cStmt->execute([$filename, $adminId]);
        $cand = $cStmt->fetch();

        if (!$cand && $user['role'] !== 'master') {
            jsonResponse(['success' => false, 'error' => 'Unauthorized to access this resume'], 403);
        }

        $filePath = "{$uploadsDir}/{$filename}";
        if (!file_exists($filePath)) {
            jsonResponse(['success' => false, 'error' => 'Resume file not found on disk'], 404);
        }

        $mime = 'application/pdf';
        if (function_exists('mime_content_type')) {
            $detected = mime_content_type($filePath);
            if ($detected) $mime = $detected;
        }

        header("Content-Type: {$mime}");
        header('Content-Length: ' . filesize($filePath));
        header("Content-Disposition: inline; filename=\"{$filename}\"");
        readfile($filePath);
        exit;
    }

    // 2. GET / (List Candidates)
    if (($subpath === '' || $subpath === '/') && $method === 'GET') {
        $jobId = $_GET['job_id'] ?? null;
        $stage = $_GET['stage'] ?? null;
        $source = $_GET['source'] ?? null;
        $search = $_GET['search'] ?? null;

        $query = "
            SELECT 
                c.*,
                COALESCE(j.title, c.last_company, 'General Opportunity') as job_title,
                j.slug as job_slug,
                (SELECT COUNT(*) FROM crm_candidate_notes cn WHERE cn.candidate_id = c.id) as note_count
            FROM crm_candidates c
            LEFT JOIN crm_jobs j ON c.job_id = j.id
            WHERE c.admin_id = ?
        ";
        $params = [$adminId];

        if ($jobId) {
            $query .= ' AND c.job_id = ?';
            $params[] = (int)$jobId;
        }
        if ($stage) {
            $query .= ' AND c.stage = ?';
            $params[] = $stage;
        }
        if ($source) {
            $query .= ' AND c.source = ?';
            $params[] = $source;
        }
        if ($search) {
            $query .= ' AND (c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.last_company LIKE ?)';
            $like = "%{$search}%";
            $params[] = $like;
            $params[] = $like;
            $params[] = $like;
            $params[] = $like;
        }

        $query .= ' ORDER BY c.created_at DESC';

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $candidates = $stmt->fetchAll();

        jsonResponse(['success' => true, 'data' => $candidates]);
    }

    // 3. POST / (Add Candidate)
    if (($subpath === '' || $subpath === '/') && $method === 'POST') {
        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $lastCompany = trim($body['last_company'] ?? '');
        $jobId = !empty($body['job_id']) ? (int)$body['job_id'] : null;
        $stage = trim(strtolower($body['stage'] ?? 'applied'));
        $source = trim($body['source'] ?? 'manual');
        $tags = $body['tags'] ?? null;
        $notes = trim($body['notes'] ?? '');

        if (!$name) {
            jsonResponse(['success' => false, 'error' => 'Candidate name is required'], 400);
        }

        $validStages = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
        if (!in_array($stage, $validStages)) {
            $stage = 'applied';
        }

        $resumeFilename = $handleResumeUpload();
        $hasResume = $resumeFilename ? 1 : 0;
        $candidateId = null;

        $pdo->beginTransaction();
        try {
            if ($email) {
                $chk = $pdo->prepare("SELECT id FROM crm_candidates WHERE email = ? AND admin_id = ?");
                $chk->execute([strtolower($email), $adminId]);
                $existing = $chk->fetch();
                if ($existing) {
                    $candidateId = (int)$existing['id'];
                    $uSql = "
                        UPDATE crm_candidates SET
                            name = ?,
                            phone = COALESCE(?, phone),
                            last_company = COALESCE(?, last_company),
                            job_id = COALESCE(?, job_id),
                            stage = ?,
                            source = COALESCE(?, source),
                            resume_filename = COALESCE(?, resume_filename),
                            has_resume = CASE WHEN ? IS NOT NULL THEN 1 ELSE has_resume END
                        WHERE id = ? AND admin_id = ?
                    ";
                    $pdo->prepare($uSql)->execute([
                        $name,
                        $phone ?: null,
                        $lastCompany ?: null,
                        $jobId,
                        $stage,
                        $source,
                        $resumeFilename,
                        $resumeFilename,
                        $candidateId,
                        $adminId
                    ]);
                }
            }

            if (!$candidateId) {
                $iSql = "
                    INSERT INTO crm_candidates (
                        admin_id, job_id, name, email, phone, last_company,
                        resume_filename, has_resume, stage, source, tags, applied_date
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
                ";
                $pdo->prepare($iSql)->execute([
                    $adminId,
                    $jobId,
                    $name,
                    $email ? strtolower($email) : null,
                    $phone ?: null,
                    $lastCompany ?: null,
                    $resumeFilename,
                    $hasResume,
                    $stage,
                    $source,
                    $tags
                ]);
                $candidateId = (int)$pdo->lastInsertId();
            }

            // Insert into applications table if job specified
            if ($jobId) {
                $aChk = $pdo->prepare("SELECT id FROM crm_applications WHERE candidate_id = ? AND job_id = ? AND admin_id = ?");
                $aChk->execute([$candidateId, $jobId, $adminId]);
                if (!$aChk->fetch()) {
                    $aSql = "
                        INSERT INTO crm_applications (
                            admin_id, job_id, candidate_id, name, email, phone,
                            resume_path, cover_letter, source, status
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ";
                    $pdo->prepare($aSql)->execute([
                        $adminId,
                        $jobId,
                        $candidateId,
                        $name,
                        $email ? strtolower($email) : '',
                        $phone ?: null,
                        $resumeFilename,
                        $notes ? "Recruiter Entry Notes:\n{$notes}" : null,
                        'crm',
                        $stage === 'applied' ? 'new' : $stage
                    ]);
                }
            }

            // If notes provided, log in crm_candidate_notes
            if ($notes) {
                $employeeId = null;
                if ($user['role'] === 'employee') {
                    $eStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ?");
                    $eStmt->execute([$user['id']]);
                    $emp = $eStmt->fetch();
                    if ($emp) $employeeId = (int)$emp['id'];
                }
                $authorLabel = $user['role'] === 'admin' ? 'Company Admin' : ($user['name'] ?? 'Recruiter');
                $nSql = "INSERT INTO crm_candidate_notes (candidate_id, employee_id, note_text) VALUES (?, ?, ?)";
                $pdo->prepare($nSql)->execute([$candidateId, $employeeId, "[Added by {$authorLabel}]: {$notes}"]);
            }

            $pdo->commit();

            // Fetch return object
            $sStmt = $pdo->prepare("
                SELECT 
                    c.*,
                    COALESCE(j.title, c.last_company, 'General Opportunity') as job_title,
                    j.slug as job_slug,
                    (SELECT COUNT(*) FROM crm_candidate_notes cn WHERE cn.candidate_id = c.id) as note_count
                FROM crm_candidates c
                LEFT JOIN crm_jobs j ON c.job_id = j.id
                WHERE c.id = ? AND c.admin_id = ?
            ");
            $sStmt->execute([$candidateId, $adminId]);
            $newCand = $sStmt->fetch();

            jsonResponse([
                'success' => true,
                'message' => 'Candidate added successfully',
                'data' => $newCand ?: ['id' => $candidateId]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // 4. Notes: GET & POST /:id/notes
    if (preg_match('#^/(\d+)/notes$#', $subpath, $matches)) {
        $candidateId = (int)$matches[1];

        if ($method === 'GET') {
            $stmt = $pdo->prepare("
                SELECT cn.*, u.name as author_name
                FROM crm_candidate_notes cn
                JOIN crm_candidates c ON cn.candidate_id = c.id
                LEFT JOIN crm_employees e ON cn.employee_id = e.id
                LEFT JOIN crm_users u ON e.user_id = u.id
                WHERE cn.candidate_id = ? AND c.admin_id = ?
                ORDER BY cn.created_at DESC
            ");
            $stmt->execute([$candidateId, $adminId]);
            $notes = $stmt->fetchAll();

            jsonResponse(['success' => true, 'data' => $notes]);
        }

        if ($method === 'POST') {
            $body = getJsonInput();
            $noteText = trim($body['note_text'] ?? '');
            if (!$noteText) {
                jsonResponse(['success' => false, 'error' => 'Note text is required'], 400);
            }

            $candStmt = $pdo->prepare("SELECT id FROM crm_candidates WHERE id = ? AND admin_id = ?");
            $candStmt->execute([$candidateId, $adminId]);
            if (!$candStmt->fetch()) {
                jsonResponse(['success' => false, 'error' => 'Candidate not found'], 404);
            }

            $employeeId = null;
            if ($user['role'] === 'employee') {
                $eStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ?");
                $eStmt->execute([$user['id']]);
                $emp = $eStmt->fetch();
                if ($emp) $employeeId = (int)$emp['id'];
            }

            $stmt = $pdo->prepare("INSERT INTO crm_candidate_notes (candidate_id, employee_id, note_text) VALUES (?, ?, ?)");
            $stmt->execute([$candidateId, $employeeId, $noteText]);

            jsonResponse(['success' => true, 'message' => 'Note added successfully'], 201);
        }
    }

    // 5. PATCH /:id/stage
    if (preg_match('#^/(\d+)/stage$#', $subpath, $matches) && in_array($method, ['PATCH', 'POST', 'PUT'])) {
        $candidateId = (int)$matches[1];
        $body = getJsonInput();
        $stage = trim(strtolower($body['stage'] ?? ''));
        $validStages = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
        if (!in_array($stage, $validStages)) {
            jsonResponse(['success' => false, 'error' => 'Invalid candidate stage'], 400);
        }

        $pdo->prepare("UPDATE crm_candidates SET stage = ? WHERE id = ? AND admin_id = ?")->execute([$stage, $candidateId, $adminId]);
        $pdo->prepare("UPDATE crm_applications SET status = ? WHERE candidate_id = ? AND admin_id = ?")->execute([$stage, $candidateId, $adminId]);

        jsonResponse(['success' => true, 'message' => "Candidate moved to {$stage}"]);
    }

    // 6. PUT /:id (Update Candidate Details & Replace Resume)
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $candidateId = (int)$matches[1];
        $body = getJsonInput();

        $fields = [];
        $params = [];

        if (isset($body['name'])) {
            $fields[] = 'name = ?';
            $params[] = trim($body['name']);
        }
        if (isset($body['email'])) {
            $fields[] = 'email = ?';
            $params[] = trim(strtolower($body['email']));
        }
        if (isset($body['phone'])) {
            $fields[] = 'phone = ?';
            $params[] = trim($body['phone']);
        }
        if (isset($body['last_company'])) {
            $fields[] = 'last_company = ?';
            $params[] = trim($body['last_company']);
        }
        if (isset($body['stage'])) {
            $fields[] = 'stage = ?';
            $params[] = trim(strtolower($body['stage']));
        }
        if (isset($body['job_id'])) {
            $fields[] = 'job_id = ?';
            $params[] = $body['job_id'] ? (int)$body['job_id'] : null;
        }

        $newResumeFilename = $handleResumeUpload();
        if ($newResumeFilename) {
            $fields[] = 'resume_filename = ?';
            $fields[] = 'has_resume = 1';
            $params[] = $newResumeFilename;
        }

        if (!empty($fields)) {
            $params[] = $candidateId;
            $params[] = $adminId;
            $sql = "UPDATE crm_candidates SET " . implode(', ', $fields) . " WHERE id = ? AND admin_id = ?";
            $pdo->prepare($sql)->execute($params);
        }

        if ($newResumeFilename) {
            $pdo->prepare("UPDATE crm_applications SET resume_path = ? WHERE candidate_id = ? AND admin_id = ?")
                ->execute([$newResumeFilename, $candidateId, $adminId]);
        }

        $sStmt = $pdo->prepare("
            SELECT 
                c.*,
                COALESCE(j.title, c.last_company, 'General Opportunity') as job_title,
                j.slug as job_slug,
                (SELECT COUNT(*) FROM crm_candidate_notes cn WHERE cn.candidate_id = c.id) as note_count
            FROM crm_candidates c
            LEFT JOIN crm_jobs j ON c.job_id = j.id
            WHERE c.id = ? AND c.admin_id = ?
        ");
        $sStmt->execute([$candidateId, $adminId]);
        $updated = $sStmt->fetch();

        jsonResponse([
            'success' => true,
            'message' => 'Candidate details updated successfully',
            'data' => $updated
        ]);
    }

    // 7. DELETE /:id
    if (preg_match('#^/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $candidateId = (int)$matches[1];
        $pdo->beginTransaction();
        try {
            $pdo->prepare("DELETE FROM crm_candidate_notes WHERE candidate_id = ?")->execute([$candidateId]);
            $pdo->prepare("DELETE FROM crm_applications WHERE candidate_id = ? AND admin_id = ?")->execute([$candidateId, $adminId]);
            $pdo->prepare("DELETE FROM crm_candidates WHERE id = ? AND admin_id = ?")->execute([$candidateId, $adminId]);
            $pdo->commit();
            jsonResponse(['success' => true, 'message' => 'Candidate deleted successfully']);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => false, 'error' => "Candidates route '{$subpath}' not found"], 404);
}
