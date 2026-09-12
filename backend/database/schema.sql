-- ==============================================================================
-- PR MARKETING VENTURES — ENTERPRISE DATABASE SCHEMA
-- Mirroring proven Tech & Car Info Architecture
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. USERS & ROLES
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('SuperAdmin', 'Admin', 'Editor', 'Author') DEFAULT 'Admin',
    status ENUM('Active', 'Inactive', 'Banned') DEFAULT 'Active',
    last_login DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. API KEYS (For automated scripts, python pipelines, webhooks)
CREATE TABLE IF NOT EXISTS api_keys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    key_prefix VARCHAR(12) NOT NULL,
    permissions JSON NULL,
    created_by CHAR(36) NULL,
    last_used_at DATETIME NULL,
    revoked_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. HIERARCHICAL CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
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
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. MEDIA LIBRARY & GALLERY
CREATE TABLE IF NOT EXISTS media_files (
    id CHAR(36) PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT DEFAULT 0,
    mime_type VARCHAR(100) DEFAULT 'image/jpeg',
    dimensions VARCHAR(50) DEFAULT '1920x1080',
    alt_text VARCHAR(255) NULL,
    provider ENUM('local', 's3', 'unsplash') DEFAULT 'local',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Polymorphic table for linking media to posts (featured, inline, gallery)
CREATE TABLE IF NOT EXISTS entity_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL DEFAULT 'post',
    entity_id VARCHAR(36) NOT NULL,
    media_id CHAR(36) NOT NULL,
    context VARCHAR(50) DEFAULT 'featured', -- 'featured', 'inline_1', 'inline_2', 'gallery'
    sort_order INT DEFAULT 0,
    FOREIGN KEY (media_id) REFERENCES media_files(id) ON DELETE CASCADE,
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. BLOG POSTS & STORIES
CREATE TABLE IF NOT EXISTS posts (
    id CHAR(36) PRIMARY KEY,
    type ENUM('story', 'guide', 'blog', 'news', 'case_study') DEFAULT 'story',
    author_id CHAR(36) NULL,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    summary TEXT NULL,
    content LONGTEXT NULL,
    status ENUM('Draft', 'Published', 'Scheduled', 'Archived') DEFAULT 'Published',
    reading_time VARCHAR(50) DEFAULT '9 min read',
    views INT DEFAULT 0,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. MULTIPLE DESCRIPTIONS / SECTIONS (Dynamic Content Breakdown)
CREATE TABLE IF NOT EXISTS post_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id CHAR(36) NOT NULL,
    heading VARCHAR(255) NOT NULL,
    subheading VARCHAR(255) NULL,
    content LONGTEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. MULTIPLE STRUCTURED FAQS
CREATE TABLE IF NOT EXISTS post_faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id CHAR(36) NOT NULL,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. SEO METADATA & SCHEMA JSON-LD
CREATE TABLE IF NOT EXISTS seo_metadata (
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

-- 9. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NULL,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id VARCHAR(36) NOT NULL,
    payload JSON NULL,
    ip_address VARCHAR(45) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_record (table_name, record_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Core Categories Seed
INSERT INTO categories (name, slug, description, sort_order, status) VALUES
('Startup & Innovation', 'startup-innovation', 'High-growth startup scaling, product architecture, AI systems, and tech venture dynamics.', 1, 'Active'),
('Marketing Strategy', 'marketing-strategy', 'B2B pipeline generation, multi-touch attribution, CAC payback, ABM, and revenue operations.', 2, 'Active'),
('Venture Capital', 'venture-capital', 'Seed to Series B unit economics, venture deal flow, and pitch deck architecture.', 3, 'Active'),
('Growth Engineering', 'growth-engineering', 'Conversion rate optimization, AI automation workflows, and operational scalability.', 4, 'Active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

SET FOREIGN_KEY_CHECKS = 1;
