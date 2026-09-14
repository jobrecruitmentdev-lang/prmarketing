<?php
/**
 * PR Marketing Ventures — CRM Migration & Seeder Script
 * Run locally: php backend/database/migrate_crm.php
 * Or via web/deploy: creates all crm_* tables safely without touching CMS tables.
 */

require_once __DIR__ . '/../config/database.php';

try {
    $pdo = Database::getConnection();
    echo "Connected to database successfully.\n";

    // 1. Create uploads folder for resumes
    $uploadsDir = __DIR__ . '/../uploads/resumes';
    if (!file_exists($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
        echo "Created resumes upload directory: {$uploadsDir}\n";
    }

    // 2. Read and run schema
    $schemaFile = __DIR__ . '/crm_schema.sql';
    $sql = file_get_contents($schemaFile);
    $pdo->exec($sql);
    echo "CRM schema tables created/verified successfully.\n";

    // 2.1 Upgrade existing tables with any missing columns
    $columnPatches = [
        'crm_attendance_records' => [
            'check_in_time' => 'TIME NULL',
            'check_out_time' => 'TIME NULL',
            'marked_by' => 'INT NULL',
            'remarks' => 'VARCHAR(255) NULL'
        ],
        'crm_employees' => [
            'exit_date' => 'DATE NULL',
            'exit_type' => 'VARCHAR(50) NULL',
            'exit_reason' => 'TEXT NULL'
        ],
        'crm_daily_sales' => [
            'client_contact' => 'VARCHAR(50) NULL',
            'client_email' => 'VARCHAR(150) NULL',
            'service_or_product' => 'VARCHAR(150) NULL',
            'invoice_number' => 'VARCHAR(50) NULL'
        ],
        'crm_sales_leads' => [
            'lead_name' => 'VARCHAR(150) NULL',
            'contact' => 'VARCHAR(50) NULL',
            'company' => 'VARCHAR(150) NULL',
            'value' => 'DECIMAL(12,2) DEFAULT 0.00'
        ],
        'crm_jobs' => [
            'salary_min' => 'DECIMAL(12,2) NULL',
            'salary_max' => 'DECIMAL(12,2) NULL',
            'is_salary_disclosed' => 'TINYINT(1) DEFAULT 1'
        ]
    ];

    foreach ($columnPatches as $table => $cols) {
        $existingCols = $pdo->query("SHOW COLUMNS FROM {$table}")->fetchAll(PDO::FETCH_COLUMN);
        foreach ($cols as $col => $definition) {
            if (!in_array($col, $existingCols)) {
                $pdo->exec("ALTER TABLE {$table} ADD COLUMN {$col} {$definition}");
                echo "Added missing column {$col} to {$table}.\n";
            }
        }
    }

    try {
        $pdo->exec("ALTER TABLE crm_attendance_records MODIFY COLUMN status VARCHAR(50) DEFAULT 'present'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE crm_sales_leads MODIFY COLUMN stage VARCHAR(50) DEFAULT 'New'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE crm_daily_sales MODIFY COLUMN payment_status VARCHAR(50) DEFAULT 'completed'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE crm_daily_sales MODIFY COLUMN payment_mode VARCHAR(50) DEFAULT 'Online'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE crm_employees MODIFY COLUMN status VARCHAR(50) DEFAULT 'active'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE crm_jobs MODIFY COLUMN job_type VARCHAR(50) DEFAULT 'Full-time'");
        $pdo->exec("UPDATE crm_jobs SET job_type = 'Full-time' WHERE job_type IS NULL OR job_type = '' OR job_type = 'Full Time'");
    } catch (Exception $e) {}
    echo "CRM column patches and enum loosenings applied successfully.\n";

    // 2.2 Backfill salary_min, salary_max, is_salary_disclosed for existing jobs
    try {
        $existingJobs = $pdo->query("SELECT id, salary_range, salary_min, salary_max, is_salary_disclosed FROM crm_jobs")->fetchAll();
        $updJob = $pdo->prepare("UPDATE crm_jobs SET salary_min = ?, salary_max = ?, is_salary_disclosed = ? WHERE id = ?");
        foreach ($existingJobs as $j) {
            $sMin = $j['salary_min'];
            $sMax = $j['salary_max'];
            $disclosed = ($j['is_salary_disclosed'] !== null) ? (int)$j['is_salary_disclosed'] : 1;

            if (($sMin === null || $sMax === null) && !empty($j['salary_range'])) {
                $range = trim($j['salary_range']);
                if (strtolower($range) === 'not disclosed' || strtolower($range) === 'not_disclosed') {
                    $disclosed = 0;
                    $updJob->execute([null, null, 0, $j['id']]);
                    echo "Marked job ID {$j['id']} as not disclosed.\n";
                } elseif (preg_match('/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)/i', $range, $m)) {
                    $val1 = (float)$m[1];
                    $val2 = (float)$m[2];
                    if (stripos($range, 'lpa') !== false && $val1 < 100) {
                        $val1 *= 100000;
                        $val2 *= 100000;
                    }
                    $sMin = $val1;
                    $sMax = $val2;
                    $disclosed = 1;
                    $updJob->execute([$sMin, $sMax, $disclosed, $j['id']]);
                    echo "Backfilled salary for job ID {$j['id']}: min={$sMin}, max={$sMax}, disclosed=1\n";
                }
            }
        }
    } catch (Exception $e) {
        echo "Notice: Salary backfill: " . $e->getMessage() . "\n";
    }

    // 3. Seed Master Super Admin if not exists
    $stmt = $pdo->prepare("SELECT id FROM crm_users WHERE email = ?");
    $stmt->execute(['master@crm.com']);
    $masterUser = $stmt->fetch();

    if (!$masterUser) {
        $masterPassHash = password_hash('Admin@123', PASSWORD_BCRYPT);
        $ins = $pdo->prepare("INSERT INTO crm_users (admin_id, name, email, phone, password_hash, role, status) VALUES (NULL, ?, ?, ?, ?, 'master', 'active')");
        $ins->execute(['Master Super Admin', 'master@crm.com', '+91 99999 00000', $masterPassHash]);
        echo "Seeded Master Super Admin (master@crm.com / Admin@123)\n";
    }

    // 4. Seed First Organization: ABC Technologies
    $stmt = $pdo->prepare("SELECT id FROM crm_admins WHERE slug = ?");
    $stmt->execute(['abc-technologies']);
    $tenant = $stmt->fetch();

    $tenantId = null;
    if (!$tenant) {
        $insAdmin = $pdo->prepare("INSERT INTO crm_admins (slug, company_display_name, website_url, description, phone, email, status, is_active) VALUES (?, ?, ?, ?, ?, ?, 'active', 1)");
        $insAdmin->execute([
            'abc-technologies',
            'ABC Technologies',
            'https://abctechnologies.com',
            'Enterprise digital transformation and cloud software engineering.',
            '+91 98765 43210',
            'admin@abctechnologies.com'
        ]);
        $tenantId = $pdo->lastInsertId();
        echo "Seeded ABC Technologies Organization (ID: {$tenantId})\n";

        // Seed Career page settings
        $insCareer = $pdo->prepare("INSERT INTO crm_career_pages (admin_id, enabled, page_title, headline, description) VALUES (?, 1, ?, ?, ?)");
        $insCareer->execute([
            $tenantId,
            'Careers at ABC Technologies',
            'Build your career with us.',
            'Join our world-class engineering and growth teams.'
        ]);
    } else {
        $tenantId = $tenant['id'];
    }

    // 5. Seed Company Admin for ABC Technologies
    $stmt = $pdo->prepare("SELECT id FROM crm_users WHERE email = ?");
    $stmt->execute(['admin@abctechnologies.com']);
    $adminUser = $stmt->fetch();

    if (!$adminUser) {
        $adminPassHash = password_hash('Admin@123', PASSWORD_BCRYPT);
        $ins = $pdo->prepare("INSERT INTO crm_users (admin_id, name, email, phone, password_hash, role, status) VALUES (?, ?, ?, ?, ?, 'admin', 'active')");
        $ins->execute([$tenantId, 'Aman Verma', 'admin@abctechnologies.com', '+91 98765 43210', $adminPassHash]);
        echo "Seeded Company Admin (admin@abctechnologies.com / Admin@123)\n";
    }

    // 6. Seed Sample Jobs for ABC Technologies
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM crm_jobs WHERE admin_id = ?");
    $stmt->execute([$tenantId]);
    $jobCount = $stmt->fetchColumn();

    if ($jobCount == 0) {
        $insJob = $pdo->prepare("INSERT INTO crm_jobs (admin_id, title, slug, department, location, work_mode, job_type, experience, salary_range, description, requirements, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open')");
        $insJob->execute([
            $tenantId,
            'Senior Full Stack Developer',
            'senior-full-stack-developer',
            'Engineering',
            'Ahmedabad, India',
            'Hybrid',
            'Full-time',
            '3-5 Years',
            '₹8 - ₹14 LPA',
            'Looking for an experienced Full Stack engineer with Next.js, React, Node.js and MySQL expertise.',
            'Strong TypeScript, TailwindCSS, database architecture, and REST API development.'
        ]);
        $insJob->execute([
            $tenantId,
            'Digital Marketing Specialist',
            'digital-marketing-specialist',
            'Marketing',
            'Ahmedabad, India',
            'On-site',
            'Full-time',
            '2-4 Years',
            '₹5 - ₹8 LPA',
            'Drive performance marketing, SEO, Meta Ads and Google Ads campaigns.',
            'Experience in Google Ads, Meta Ads Manager, and SEO tools.'
        ]);
        echo "Seeded 2 Sample Jobs\n";
    }

    echo "\n=== CRM Migration Completed Successfully! ===\n";
} catch (Exception $e) {
    echo "MIGRATION ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
