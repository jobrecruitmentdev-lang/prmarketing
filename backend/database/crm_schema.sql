-- ==============================================================================
-- PR MARKETING VENTURES — MULTI-TENANT CRM DATABASE SCHEMA
-- Fully isolated tables with `crm_` prefix for zero-conflict integration
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. CRM Organizations / Tenants
CREATE TABLE IF NOT EXISTS crm_admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    company_display_name VARCHAR(150) NOT NULL,
    logo_url VARCHAR(255) NULL,
    website_url VARCHAR(255) NULL,
    description TEXT NULL,
    industry VARCHAR(100) NULL,
    location VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    email VARCHAR(150) NULL,
    status ENUM('active', 'revoked') DEFAULT 'active',
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. CRM Users (Master, Company Admin, Employee)
CREATE TABLE IF NOT EXISTS crm_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(50) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('master', 'admin', 'employee') NOT NULL DEFAULT 'employee',
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. CRM Employees
CREATE TABLE IF NOT EXISTS crm_employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    user_id INT NOT NULL,
    employee_code VARCHAR(50) NULL,
    department VARCHAR(100) NULL,
    designation VARCHAR(100) NULL,
    joining_date DATE NULL,
    salary DECIMAL(10,2) DEFAULT 0.00,
    exit_date DATE NULL,
    exit_type VARCHAR(50) NULL,
    exit_reason TEXT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES crm_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CRM Employee Assigned Modules (recruitment, sales)
CREATE TABLE IF NOT EXISTS crm_employee_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    module VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES crm_employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_emp_module (employee_id, module)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. CRM Attendance Records
CREATE TABLE IF NOT EXISTS crm_attendance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'present',
    check_in TIME NULL,
    check_out TIME NULL,
    check_in_time TIME NULL,
    check_out_time TIME NULL,
    marked_by INT NULL,
    remarks VARCHAR(255) NULL,
    notes TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES crm_employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_emp_date (employee_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CRM Recruitment Jobs
CREATE TABLE IF NOT EXISTS crm_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    department VARCHAR(100) NULL,
    location VARCHAR(100) NULL,
    work_mode ENUM('On-site', 'Remote', 'Hybrid') DEFAULT 'On-site',
    job_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') DEFAULT 'Full-time',
    experience VARCHAR(100) NULL,
    salary_range VARCHAR(100) NULL,
    description TEXT NULL,
    requirements TEXT NULL,
    benefits TEXT NULL,
    status ENUM('Draft', 'Open', 'published', 'Closed', 'archived') DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    UNIQUE KEY unique_job_slug (admin_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. CRM Candidates
CREATE TABLE IF NOT EXISTS crm_candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    job_id INT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    last_company VARCHAR(150) NULL,
    resume_filename VARCHAR(255) NULL,
    has_resume TINYINT(1) DEFAULT 0,
    stage ENUM('applied', 'screening', 'interview', 'offer', 'hired', 'rejected') DEFAULT 'applied',
    source VARCHAR(50) DEFAULT 'manual',
    rating INT DEFAULT 0,
    tags VARCHAR(255) NULL,
    applied_date DATE NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES crm_jobs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. CRM Candidate Notes & Feedback
CREATE TABLE IF NOT EXISTS crm_candidate_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    employee_id INT NULL,
    note_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES crm_candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES crm_employees(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CRM Job Applications
CREATE TABLE IF NOT EXISTS crm_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    job_id INT NOT NULL,
    candidate_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NULL,
    resume_path VARCHAR(255) NULL,
    cover_letter TEXT NULL,
    source VARCHAR(50) DEFAULT 'hosted_career_page',
    status ENUM('new', 'screening', 'interview', 'offered', 'rejected') DEFAULT 'new',
    utm_source VARCHAR(100) NULL,
    utm_medium VARCHAR(100) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES crm_jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES crm_candidates(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CRM Daily Sales Logs
CREATE TABLE IF NOT EXISTS crm_daily_sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    employee_id INT NULL,
    client_name VARCHAR(150) NOT NULL,
    client_contact VARCHAR(50) NULL,
    client_email VARCHAR(150) NULL,
    service_or_product VARCHAR(150) NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    sale_date DATE NOT NULL,
    payment_mode VARCHAR(50) DEFAULT 'Online',
    payment_status VARCHAR(50) DEFAULT 'completed',
    invoice_number VARCHAR(50) NULL,
    notes TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES crm_employees(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. CRM Sales Leads
CREATE TABLE IF NOT EXISTS crm_sales_leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    employee_id INT NULL,
    lead_name VARCHAR(150) NULL,
    company_name VARCHAR(150) NULL,
    contact_name VARCHAR(150) NULL,
    contact VARCHAR(50) NULL,
    email VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    company VARCHAR(150) NULL,
    value DECIMAL(12,2) DEFAULT 0.00,
    expected_value DECIMAL(12,2) DEFAULT 0.00,
    stage VARCHAR(50) DEFAULT 'New',
    notes TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES crm_employees(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. CRM Monthly Sales Targets
CREATE TABLE IF NOT EXISTS crm_sales_targets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    month VARCHAR(7) NOT NULL,
    target_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    UNIQUE KEY unique_target (admin_id, month)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. CRM Career Page Customization
CREATE TABLE IF NOT EXISTS crm_career_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    enabled TINYINT(1) DEFAULT 1,
    page_title VARCHAR(200) NULL,
    headline VARCHAR(255) NULL,
    description TEXT NULL,
    primary_color VARCHAR(20) DEFAULT '#d6c180',
    secondary_color VARCHAR(20) DEFAULT '#0F172A',
    button_color VARCHAR(20) DEFAULT '#d6c180',
    font_family VARCHAR(50) DEFAULT 'Inter, sans-serif',
    show_salary TINYINT(1) DEFAULT 1,
    show_location TINYINT(1) DEFAULT 1,
    show_company_description TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES crm_admins(id) ON DELETE CASCADE,
    UNIQUE KEY unique_career_page (admin_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
