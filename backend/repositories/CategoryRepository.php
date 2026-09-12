<?php
/**
 * Category Repository (Dedicated PR Marketing Tables)
 * PR Marketing Ventures Enterprise Backend
 */

require_once __DIR__ . '/../config/database.php';

class CategoryRepository {
    private PDO $db;

    public function __construct(?PDO $db = null) {
        $this->db = $db ?? Database::getConnection();
    }

    public function getAll(?string $status = null): array {
        $sql = "SELECT c.*, COUNT(p.id) as post_count 
                FROM pr_categories c 
                LEFT JOIN pr_posts p ON c.id = p.category_id AND p.status = 'Published' AND p.deleted_at IS NULL
                WHERE c.deleted_at IS NULL";
        $params = [];

        if ($status) {
            $sql .= " AND c.status = :status";
            $params[':status'] = $status;
        }

        $sql .= " GROUP BY c.id ORDER BY c.sort_order ASC, c.name ASC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function getById(int $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM pr_categories WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function getBySlug(string $slug): ?array {
        $stmt = $this->db->prepare("SELECT * FROM pr_categories WHERE slug = :slug AND deleted_at IS NULL");
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): array {
        $stmt = $this->db->prepare("INSERT INTO pr_categories (name, slug, description, sort_order, status, visibility) 
                                    VALUES (:name, :slug, :description, :sort_order, :status, :visibility)");
        $stmt->execute([
            ':name'        => $data['name'],
            ':slug'        => $data['slug'],
            ':description' => $data['description'] ?? null,
            ':sort_order'  => $data['sort_order'] ?? 0,
            ':status'      => $data['status'] ?? 'Active',
            ':visibility'  => $data['visibility'] ?? 'Public',
        ]);

        $id = (int)$this->db->lastInsertId();
        return $this->getById($id);
    }

    public function update(int $id, array $data): ?array {
        $fields = [];
        $params = [':id' => $id];

        foreach (['name', 'slug', 'description', 'sort_order', 'status', 'visibility'] as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "{$f} = :{$f}";
                $params[":{$f}"] = $data[$f];
            }
        }

        if (empty($fields)) {
            return $this->getById($id);
        }

        $sql = "UPDATE pr_categories SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $this->getById($id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("UPDATE pr_categories SET deleted_at = NOW() WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
