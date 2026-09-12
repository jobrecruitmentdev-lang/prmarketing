<?php
/**
 * PR Marketing Ventures — Client Library Repository
 * Handles all database operations for active clients, services, contracts & deliverables
 */

require_once __DIR__ . '/../config/database.php';

class ClientRepository {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    /**
     * Retrieve all non-deleted clients with optional filtering and search
     */
    public function getAll(?string $status = null, ?string $service = null, ?string $search = null): array {
        $sql = "SELECT * FROM pr_clients WHERE deleted_at IS NULL";
        $params = [];

        if (!empty($status) && $status !== 'All') {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }

        if (!empty($service) && $service !== 'All') {
            $sql .= " AND service_type = :service";
            $params[':service'] = $service;
        }

        if (!empty($search)) {
            $sql .= " AND (company_name LIKE :q OR contact_person LIKE :q OR email LIKE :q OR phone LIKE :q OR service_type LIKE :q)";
            $params[':q'] = "%{$search}%";
        }

        $sql .= " ORDER BY created_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Retrieve a single client by ID
     */
    public function getById(string $id): ?array {
        $stmt = $this->db->prepare("SELECT * FROM pr_clients WHERE id = :id AND deleted_at IS NULL LIMIT 1");
        $stmt->execute([':id' => $id]);
        $client = $stmt->fetch(PDO::FETCH_ASSOC);
        return $client ?: null;
    }

    /**
     * Create a new client record
     */
    public function create(array $data): array {
        $id = $data['id'] ?? $this->generateUuid();
        $stmt = $this->db->prepare("INSERT INTO pr_clients 
            (id, company_name, contact_person, email, phone, service_type, project_value, status, start_date, delivery_date, notes, created_at, updated_at)
            VALUES 
            (:id, :company_name, :contact_person, :email, :phone, :service_type, :project_value, :status, :start_date, :delivery_date, :notes, NOW(), NOW())");

        $stmt->execute([
            ':id'             => $id,
            ':company_name'   => trim($data['company_name']),
            ':contact_person' => !empty($data['contact_person']) ? trim($data['contact_person']) : null,
            ':email'          => !empty($data['email']) ? trim($data['email']) : null,
            ':phone'          => !empty($data['phone']) ? trim($data['phone']) : null,
            ':service_type'   => trim($data['service_type'] ?? 'Web Development'),
            ':project_value'  => !empty($data['project_value']) ? trim($data['project_value']) : null,
            ':status'         => $data['status'] ?? 'Active',
            ':start_date'     => !empty($data['start_date']) ? $data['start_date'] : null,
            ':delivery_date'  => !empty($data['delivery_date']) ? $data['delivery_date'] : null,
            ':notes'          => !empty($data['notes']) ? trim($data['notes']) : null,
        ]);

        return $this->getById($id) ?? [];
    }

    /**
     * Update an existing client record
     */
    public function update(string $id, array $data): bool {
        $stmt = $this->db->prepare("UPDATE pr_clients SET 
            company_name   = :company_name,
            contact_person = :contact_person,
            email          = :email,
            phone          = :phone,
            service_type   = :service_type,
            project_value  = :project_value,
            status         = :status,
            start_date     = :start_date,
            delivery_date  = :delivery_date,
            notes          = :notes,
            updated_at     = NOW()
            WHERE id = :id AND deleted_at IS NULL");

        return $stmt->execute([
            ':id'             => $id,
            ':company_name'   => trim($data['company_name']),
            ':contact_person' => !empty($data['contact_person']) ? trim($data['contact_person']) : null,
            ':email'          => !empty($data['email']) ? trim($data['email']) : null,
            ':phone'          => !empty($data['phone']) ? trim($data['phone']) : null,
            ':service_type'   => trim($data['service_type'] ?? 'Web Development'),
            ':project_value'  => !empty($data['project_value']) ? trim($data['project_value']) : null,
            ':status'         => $data['status'] ?? 'Active',
            ':start_date'     => !empty($data['start_date']) ? $data['start_date'] : null,
            ':delivery_date'  => !empty($data['delivery_date']) ? $data['delivery_date'] : null,
            ':notes'          => !empty($data['notes']) ? trim($data['notes']) : null,
        ]);
    }

    /**
     * Soft delete a client
     */
    public function delete(string $id): bool {
        $stmt = $this->db->prepare("UPDATE pr_clients SET deleted_at = NOW() WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    /**
     * Get live KPI metrics for dashboard & top cards
     */
    public function getMetrics(): array {
        $total = (int)$this->db->query("SELECT COUNT(*) FROM pr_clients WHERE deleted_at IS NULL")->fetchColumn();
        $active = (int)$this->db->query("SELECT COUNT(*) FROM pr_clients WHERE deleted_at IS NULL AND status = 'Active'")->fetchColumn();
        $completed = (int)$this->db->query("SELECT COUNT(*) FROM pr_clients WHERE deleted_at IS NULL AND status = 'Completed'")->fetchColumn();
        $maintenance = (int)$this->db->query("SELECT COUNT(*) FROM pr_clients WHERE deleted_at IS NULL AND status = 'Maintenance / AMC'")->fetchColumn();

        return [
            'total'       => $total,
            'active'      => $active,
            'completed'   => $completed,
            'maintenance' => $maintenance
        ];
    }

    private function generateUuid(): string {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
