-- ==============================================================================
-- PR MARKETING VENTURES — DEDICATED ISOLATED DATABASE SCHEMA (`pr_*`)
-- 100% Isolated from Tech & Car Info tables
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. PR USERS & ADMIN ACCOUNTS
CREATE TABLE IF NOT EXISTS pr_users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) DEFAULT 'Admin',
    last_name VARCHAR(100) DEFAULT 'User',
    role ENUM('SuperAdmin', 'Admin', 'Editor') DEFAULT 'SuperAdmin',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DEDICATED PR MARKETING CATEGORIES
CREATE TABLE IF NOT EXISTS pr_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NULL,
    sort_order INT DEFAULT 0,
    status ENUM('Active', 'Draft') DEFAULT 'Active',
    visibility ENUM('Public', 'Hidden') DEFAULT 'Public',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    FOREIGN KEY (parent_id) REFERENCES pr_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. DEDICATED PR MEDIA LIBRARY
CREATE TABLE IF NOT EXISTS pr_media_files (
    id CHAR(36) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT DEFAULT 0,
    mime_type VARCHAR(100) DEFAULT 'image/jpeg',
    alt_text VARCHAR(255) NULL,
    provider ENUM('local', 'unsplash') DEFAULT 'local',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pr_entity_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL DEFAULT 'post',
    entity_id VARCHAR(36) NOT NULL,
    media_id CHAR(36) NOT NULL,
    context VARCHAR(50) DEFAULT 'featured', -- 'featured', 'inline_1', 'inline_2', 'gallery'
    sort_order INT DEFAULT 0,
    FOREIGN KEY (media_id) REFERENCES pr_media_files(id) ON DELETE CASCADE,
    INDEX idx_pr_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. DEDICATED PR POSTS & STORIES
CREATE TABLE IF NOT EXISTS pr_posts (
    id CHAR(36) PRIMARY KEY,
    type ENUM('story', 'guide', 'case_study') DEFAULT 'story',
    author_id CHAR(36) NULL,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    summary TEXT NULL,
    content LONGTEXT NULL,
    status ENUM('Draft', 'Published', 'Archived') DEFAULT 'Published',
    reading_time VARCHAR(50) DEFAULT '9 min read',
    views INT DEFAULT 0,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    FOREIGN KEY (author_id) REFERENCES pr_users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES pr_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. MULTIPLE DESCRIPTIONS / SECTIONS
CREATE TABLE IF NOT EXISTS pr_post_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id CHAR(36) NOT NULL,
    heading VARCHAR(255) NOT NULL,
    subheading VARCHAR(255) NULL,
    content LONGTEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES pr_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. MULTIPLE STRUCTURED FAQS
CREATE TABLE IF NOT EXISTS pr_post_faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id CHAR(36) NOT NULL,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES pr_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. SEO METADATA & SCHEMA MARKUP
CREATE TABLE IF NOT EXISTS pr_seo_metadata (
    entity_type VARCHAR(50) NOT NULL DEFAULT 'post',
    entity_id VARCHAR(36) NOT NULL,
    meta_title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    meta_keywords TEXT NULL,
    canonical_url VARCHAR(255) NULL,
    og_title VARCHAR(255) NULL,
    og_description TEXT NULL,
    og_image VARCHAR(500) NULL,
    schema_markup JSON NULL,
    twitter_card VARCHAR(30) DEFAULT 'summary_large_image',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SEED INITIAL PR MARKETING CATEGORIES
INSERT INTO pr_categories (name, slug, description, sort_order, status) VALUES
('Startup & Innovation', 'startup-innovation', 'High-growth startup scaling, product architecture, AI systems, and tech venture dynamics.', 1, 'Active'),
('Marketing Strategy', 'marketing-strategy', 'B2B pipeline generation, multi-touch attribution, CAC payback, ABM, and revenue operations.', 2, 'Active'),
('Venture Capital', 'venture-capital', 'Seed to Series B unit economics, venture deal flow, and pitch deck architecture.', 3, 'Active'),
('Growth Engineering', 'growth-engineering', 'Conversion rate optimization, AI automation workflows, and operational scalability.', 4, 'Active'),
('Performance Marketing', 'performance-marketing', 'Full-funnel paid media, CAC reduction, ROAS scaling, and search marketing.', 5, 'Active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 9. SEED ADMIN USER (admin@prmarketingventures.com / Admin@PR2026!)
-- Hash for 'Admin@PR2026!'
INSERT INTO pr_users (id, email, username, password_hash, first_name, last_name, role, status) VALUES
('usr_admin_pr_001', 'admin@prmarketingventures.com', 'admin', '$2y$10$wE73i8aPfxo6Yf2M5sB3veXq5hZJt8dO9VbI7uG6lQ5p8e1m8aT2K', 'PR Marketing', 'Admin', 'SuperAdmin', 'Active')
ON DUPLICATE KEY UPDATE email=VALUES(email);

SET FOREIGN_KEY_CHECKS = 1;
