<?php
/**
 * Post Repository (Dedicated PR Marketing Tables)
 * PR Marketing Ventures Enterprise Backend
 */

require_once __DIR__ . '/../config/database.php';

class PostRepository {
    private PDO $db;

    public function __construct(?PDO $db = null) {
        $this->db = $db ?? Database::getConnection();
    }

    public function getAll(int $limit = 50, int $offset = 0, ?int $categoryId = null, ?string $status = 'Published', ?string $search = null): array {
        $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug,
                       (SELECT mf.file_path FROM pr_entity_media em 
                        JOIN pr_media_files mf ON em.media_id = mf.id 
                        WHERE em.entity_type = 'post' AND em.entity_id = p.id AND em.context = 'featured' 
                        LIMIT 1) as cover_image
                FROM pr_posts p
                LEFT JOIN pr_categories c ON p.category_id = c.id
                WHERE p.deleted_at IS NULL";
        
        $params = [];

        if ($status) {
            $sql .= " AND LOWER(p.status) = LOWER(:status)";
            $params[':status'] = $status;
        }

        if ($categoryId) {
            $sql .= " AND p.category_id = :cat_id";
            $params[':cat_id'] = $categoryId;
        }

        if ($search) {
            $sql .= " AND (p.title LIKE :search OR p.summary LIKE :search)";
            $params[':search'] = "%{$search}%";
        }

        $sql .= " ORDER BY p.published_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue($k, $v);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getBySlug(string $slug): ?array {
        $stmt = $this->db->prepare("SELECT p.*, c.name as category_name, c.slug as category_slug
                                    FROM pr_posts p
                                    LEFT JOIN pr_categories c ON p.category_id = c.id
                                    WHERE p.slug = :slug AND p.deleted_at IS NULL");
        $stmt->execute([':slug' => $slug]);
        $post = $stmt->fetch();

        if (!$post) {
            return null;
        }

        return $this->hydratePostDetails($post);
    }

    public function getById(string $id): ?array {
        $stmt = $this->db->prepare("SELECT p.*, c.name as category_name, c.slug as category_slug
                                    FROM pr_posts p
                                    LEFT JOIN pr_categories c ON p.category_id = c.id
                                    WHERE p.id = :id AND p.deleted_at IS NULL");
        $stmt->execute([':id' => $id]);
        $post = $stmt->fetch();

        if (!$post) {
            return null;
        }

        return $this->hydratePostDetails($post);
    }

    private function hydratePostDetails(array $post): array {
        $postId = $post['id'];

        // 1. Fetch Post Sections (Multiple Descriptions)
        $secStmt = $this->db->prepare("SELECT * FROM pr_post_sections WHERE post_id = :post_id ORDER BY sort_order ASC");
        $secStmt->execute([':post_id' => $postId]);
        $post['sections'] = $secStmt->fetchAll();

        // 2. Fetch Post FAQs (Multiple FAQs)
        $faqStmt = $this->db->prepare("SELECT * FROM pr_post_faqs WHERE post_id = :post_id ORDER BY sort_order ASC");
        $faqStmt->execute([':post_id' => $postId]);
        $post['faqs'] = $faqStmt->fetchAll();

        // 3. Fetch Media (Featured & Inline Images)
        $medStmt = $this->db->prepare("SELECT em.context, em.sort_order, mf.* 
                                       FROM pr_entity_media em 
                                       JOIN pr_media_files mf ON em.media_id = mf.id 
                                       WHERE em.entity_type = 'post' AND em.entity_id = :post_id 
                                       ORDER BY em.sort_order ASC");
        $medStmt->execute([':post_id' => $postId]);
        $mediaList = $medStmt->fetchAll();
        
        $post['media'] = [
            'featured' => null,
            'inlines'  => [],
            'gallery'  => []
        ];
        foreach ($mediaList as $m) {
            if ($m['context'] === 'featured' && !$post['media']['featured']) {
                $post['media']['featured'] = $m['file_path'];
            } elseif (str_starts_with($m['context'], 'inline')) {
                $post['media']['inlines'][] = $m['file_path'];
            } else {
                $post['media']['gallery'][] = $m['file_path'];
            }
        }

        // 4. Fetch SEO Metadata
        $seoStmt = $this->db->prepare("SELECT * FROM pr_seo_metadata WHERE entity_type = 'post' AND entity_id = :post_id");
        $seoStmt->execute([':post_id' => $postId]);
        $seo = $seoStmt->fetch();
        if ($seo && !empty($seo['schema_markup']) && is_string($seo['schema_markup'])) {
            $seo['schema_markup'] = json_decode($seo['schema_markup'], true);
        }
        $post['seo'] = $seo ?: null;

        return $post;
    }

    public function create(array $data): array {
        $this->db->beginTransaction();
        try {
            $postId = $data['id'] ?? $this->generateUuid();
            
            // 1. Insert Base Post
            $stmt = $this->db->prepare("INSERT INTO pr_posts (id, type, author_id, category_id, title, slug, summary, content, status, reading_time, published_at) 
                                        VALUES (:id, :type, :author_id, :category_id, :title, :slug, :summary, :content, :status, :reading_time, :published_at)
                                        ON DUPLICATE KEY UPDATE title=VALUES(title), summary=VALUES(summary), content=VALUES(content), category_id=VALUES(category_id), status=VALUES(status)");
            $stmt->execute([
                ':id'           => $postId,
                ':type'         => $data['type'] ?? 'story',
                ':author_id'    => $data['author_id'] ?? null,
                ':category_id'  => $data['category_id'] ?? null,
                ':title'        => $data['title'],
                ':slug'         => $data['slug'],
                ':summary'      => $data['summary'] ?? null,
                ':content'      => $data['content'] ?? null,
                ':status'       => $data['status'] ?? 'Published',
                ':reading_time' => $data['reading_time'] ?? '9 min read',
                ':published_at' => $data['published_at'] ?? date('Y-m-d H:i:s'),
            ]);

            // Clear old sections and faqs on update
            $delSec = $this->db->prepare("DELETE FROM pr_post_sections WHERE post_id = :post_id");
            $delSec->execute([':post_id' => $postId]);

            $delFaq = $this->db->prepare("DELETE FROM pr_post_faqs WHERE post_id = :post_id");
            $delFaq->execute([':post_id' => $postId]);

            // 2. Insert Multiple Sections (Descriptions)
            if (!empty($data['sections']) && is_array($data['sections'])) {
                $secStmt = $this->db->prepare("INSERT INTO pr_post_sections (post_id, heading, subheading, content, sort_order) 
                                               VALUES (:post_id, :heading, :subheading, :content, :sort_order)");
                foreach ($data['sections'] as $idx => $sec) {
                    $secStmt->execute([
                        ':post_id'    => $postId,
                        ':heading'    => $sec['heading'] ?? "Section " . ($idx + 1),
                        ':subheading' => $sec['subheading'] ?? null,
                        ':content'    => $sec['content'] ?? '',
                        ':sort_order' => $sec['sort_order'] ?? ($idx + 1),
                    ]);
                }
            }

            // 3. Insert Multiple FAQs
            if (!empty($data['faqs']) && is_array($data['faqs'])) {
                $faqStmt = $this->db->prepare("INSERT INTO pr_post_faqs (post_id, question, answer, sort_order) 
                                               VALUES (:post_id, :question, :answer, :sort_order)");
                foreach ($data['faqs'] as $idx => $faq) {
                    $q = $faq['question'] ?? $faq['q'] ?? '';
                    $a = $faq['answer'] ?? $faq['a'] ?? '';
                    if ($q && $a) {
                        $faqStmt->execute([
                            ':post_id'    => $postId,
                            ':question'   => $q,
                            ':answer'     => $a,
                            ':sort_order' => $faq['sort_order'] ?? ($idx + 1),
                        ]);
                    }
                }
            }

            // 4. Attach Media (Images)
            if (!empty($data['media_files']) && is_array($data['media_files'])) {
                $delMed = $this->db->prepare("DELETE FROM pr_entity_media WHERE entity_type = 'post' AND entity_id = :post_id");
                $delMed->execute([':post_id' => $postId]);

                foreach ($data['media_files'] as $idx => $mf) {
                    $mediaId = $this->ensureMediaFile($mf);
                    $context = $mf['context'] ?? ($idx === 0 ? 'featured' : "inline_{$idx}");
                    $this->attachMedia('post', $postId, $mediaId, $context, $idx);
                }
            }

            // 5. Insert SEO Metadata
            if (!empty($data['seo'])) {
                $seo = $data['seo'];
                $schemaJson = !empty($seo['schema_markup']) ? json_encode($seo['schema_markup']) : null;
                $seoStmt = $this->db->prepare("INSERT INTO pr_seo_metadata (entity_type, entity_id, meta_title, meta_description, meta_keywords, canonical_url, og_title, og_description, og_image, schema_markup) 
                                               VALUES ('post', :post_id, :meta_title, :meta_description, :meta_keywords, :canonical_url, :og_title, :og_description, :og_image, :schema_markup)
                                               ON DUPLICATE KEY UPDATE meta_title=VALUES(meta_title), meta_description=VALUES(meta_description), og_image=VALUES(og_image)");
                $seoStmt->execute([
                    ':post_id'          => $postId,
                    ':meta_title'       => $seo['meta_title'] ?? $data['title'],
                    ':meta_description' => $seo['meta_description'] ?? $data['summary'],
                    ':meta_keywords'    => $seo['meta_keywords'] ?? null,
                    ':canonical_url'    => $seo['canonical_url'] ?? "/startup-stories/{$data['slug']}/",
                    ':og_title'         => $seo['og_title'] ?? $data['title'],
                    ':og_description'   => $seo['og_description'] ?? $data['summary'],
                    ':og_image'         => $seo['og_image'] ?? ($data['media']['featured'] ?? null),
                    ':schema_markup'    => $schemaJson,
                ]);
            }

            $this->db->commit();
            return $this->getById($postId);

        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    private function ensureMediaFile(array $mf): string {
        $filePath = $mf['file_path'] ?? $mf['url'] ?? '';
        $stmt = $this->db->prepare("SELECT id FROM pr_media_files WHERE file_path = :path LIMIT 1");
        $stmt->execute([':path' => $filePath]);
        $existing = $stmt->fetch();
        if ($existing) {
            return $existing['id'];
        }

        $id = $this->generateUuid();
        $ins = $this->db->prepare("INSERT INTO pr_media_files (id, file_name, file_path, alt_text, provider) 
                                   VALUES (:id, :file_name, :file_path, :alt_text, :provider)");
        $ins->execute([
            ':id'        => $id,
            ':file_name' => basename($filePath) ?: 'image.jpg',
            ':file_path' => $filePath,
            ':alt_text'  => $mf['alt_text'] ?? null,
            ':provider'  => $mf['provider'] ?? (str_contains($filePath, 'unsplash.com') ? 'unsplash' : 'local'),
        ]);

        return $id;
    }

    private function attachMedia(string $type, string $entityId, string $mediaId, string $context, int $order): void {
        $stmt = $this->db->prepare("INSERT INTO pr_entity_media (entity_type, entity_id, media_id, context, sort_order) 
                                    VALUES (:type, :entity_id, :media_id, :context, :order)");
        $stmt->execute([
            ':type'      => $type,
            ':entity_id' => $entityId,
            ':media_id'  => $mediaId,
            ':context'   => $context,
            ':order'     => $order,
        ]);
    }

    public function delete(string $id): bool {
        $stmt = $this->db->prepare("UPDATE pr_posts SET deleted_at = NOW() WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    private function generateUuid(): string {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
