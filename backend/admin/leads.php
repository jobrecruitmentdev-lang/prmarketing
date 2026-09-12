<?php
/**
 * PR Marketing Ventures — Client Data & Tools Inquiries Intelligence Panel
 * High-Density Compact Fit-Screen Zero-Scroll CRM Table Layout
 */
$pageTitle = "Leads Pipeline";

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/auth_middleware.php';
requireAdminAuth();

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../repositories/LeadRepository.php';

$leadRepo = new LeadRepository();
$msg = '';
$error = '';

// 1. Handle CSV Export
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
    $leads = $leadRepo->getAll(10000, 0);
    
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="PR_Marketing_Client_Leads_' . date('Y-m-d_His') . '.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    $output = fopen('php://output', 'w');
    fputs($output, "\xEF\xBB\xBF"); // UTF-8 BOM
    
    fputcsv($output, [
        'Lead ID',
        'Full Name',
        'Phone Number',
        'WhatsApp Number',
        'Business / Brand Name',
        'Website / Domain URL',
        'Business Category / Stage',
        'Tool Used',
        'Status',
        'Notes',
        'IP Address',
        'Date & Time'
    ]);
    
    foreach ($leads as $l) {
        fputcsv($output, [
            $l['id'],
            $l['full_name'],
            $l['phone_number'],
            $l['whatsapp_number'] ?: $l['phone_number'],
            $l['business_name'] ?: 'Not Specified',
            $l['website_url'] ?: 'Not Specified',
            $l['business_stage'] ?: 'General',
            $l['tool_used'] ?: 'Tools Inquiries',
            $l['status'] ?: 'New Lead',
            $l['notes'] ?: '',
            $l['ip_address'] ?: '',
            $l['created_at']
        ]);
    }
    
    fclose($output);
    exit;
}

// 2. Handle Status & Notes Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $error = "Security validation failed (Invalid CSRF token).";
    } elseif (isset($_POST['update_status'])) {
        $leadId = trim($_POST['lead_id'] ?? '');
        $newStatus = trim($_POST['status'] ?? 'New Lead');
        $notes = isset($_POST['notes']) ? trim($_POST['notes']) : null;
        
        if ($leadId && $leadRepo->updateStatus($leadId, $newStatus, $notes)) {
            $msg = "Lead status updated to '{$newStatus}'.";
        } else {
            $error = "Failed to update lead status.";
        }
    } elseif (isset($_POST['save_notes'])) {
        $leadId = trim($_POST['lead_id'] ?? '');
        $notes = trim($_POST['notes'] ?? '');
        
        if ($leadId) {
            $stmt = Database::getConnection()->prepare("UPDATE pr_client_leads SET notes = :notes, updated_at = NOW() WHERE id = :id");
            if ($stmt->execute([':notes' => $notes, ':id' => $leadId])) {
                $msg = "Lead notes saved successfully.";
            } else {
                $error = "Failed to save lead notes.";
            }
        }
    }
}

// 3. Handle Single Delete with CSRF Token
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    if (!validateCsrfToken($_GET['csrf'] ?? '')) {
        $error = "Security token mismatch. Delete lead halted.";
    } else {
        $leadId = trim($_GET['id']);
        if ($leadRepo->delete($leadId)) {
            $msg = "Lead record successfully removed.";
        } else {
            $error = "Failed to delete lead.";
        }
    }
}

// 4. Fetch Statistics & Filtered Leads
$stats = $leadRepo->getStats();
$toolFilter = $_GET['tool'] ?? null;
$statusFilter = $_GET['status'] ?? null;
$searchQuery = $_GET['search'] ?? null;

$leads = $leadRepo->getAll(300, 0, $searchQuery, $statusFilter, $toolFilter);

require_once __DIR__ . '/layout/header.php';
require_once __DIR__ . '/layout/sidebar.php';
?>

<style>
/* PR Marketing Ventures — High-Density Compact SaaS CRM Tokens */
:root {
    --crm-gold-primary: #c5a880;
    --crm-gold-dark: #a88a60;
    --crm-gold-light: #f6efe4;
    --crm-bronze-dark: #4a2d18;
    --crm-border-card: #e5d7c3;
    --crm-text-primary: #1e140d;
    --crm-text-secondary: #634832;
    --crm-text-muted: #8c735d;
}

.crm-container {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    width: 100%;
    max-width: 100%;
}

/* Luxury Compact Table Container */
.crm-table-container {
    background: #ffffff;
    border: 1px solid var(--crm-border-card);
    border-radius: 0.75rem;
    box-shadow: 0 4px 18px rgba(74, 45, 24, 0.04);
    overflow: hidden;
    width: 100%;
}

.crm-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    table-layout: fixed;
}

.crm-table thead th {
    background: #f6efe4;
    padding: 0.6rem 0.65rem;
    font-size: 0.64rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--crm-bronze-dark);
    border-bottom: 1.5px solid var(--crm-border-card);
    white-space: nowrap;
    text-align: left;
}

.crm-table tbody tr {
    border-bottom: 1px solid #f2ebe1;
    transition: background-color 0.15s ease;
}

.crm-table tbody tr:hover {
    background-color: #faf6f0;
}

.crm-table tbody tr:last-child td {
    border-bottom: none;
}

.crm-table td {
    padding: 0.5rem 0.65rem;
    vertical-align: middle;
    border-bottom: 1px solid #f4ede4;
    white-space: nowrap;
    font-size: 0.74rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Compact Status Badges */
.status-badge-select {
    appearance: none;
    -webkit-appearance: none;
    padding: 0.2rem 1.15rem 0.2rem 0.45rem;
    border-radius: 0.35rem;
    font-size: 0.68rem;
    font-weight: 800;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a2d18'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.3rem center;
    background-size: 0.65rem;
}

.status-new {
    background-color: #eff6ff;
    color: #1d4ed8;
    border-color: #bfdbfe;
}
.status-discussion {
    background-color: #fefce8;
    color: #a16207;
    border-color: #fef08a;
}
.status-followup {
    background-color: #faf5ff;
    color: #7e22ce;
    border-color: #e9d5ff;
}
.status-converted {
    background-color: #f0fdf4;
    color: #15803d;
    border-color: #bbf7d0;
}

/* Compact Outreach Buttons */
.crm-wa-btn-sm {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.45rem;
    border-radius: 0.35rem;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    color: #ffffff;
    font-size: 0.68rem;
    font-weight: 800;
    text-decoration: none;
    box-shadow: 0 1px 4px rgba(37, 211, 102, 0.2);
    transition: all 0.15s ease;
}
.crm-wa-btn-sm:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(37, 211, 102, 0.35);
}

.crm-call-btn-sm {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.45rem;
    border-radius: 0.35rem;
    background: #ffffff;
    color: var(--crm-text-primary);
    font-size: 0.68rem;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid var(--crm-border-card);
    transition: all 0.15s ease;
}
.crm-call-btn-sm:hover {
    background: #f8f4ee;
    border-color: var(--crm-gold-primary);
}

.crm-copy-btn-sm {
    background: #fdfbf7;
    border: 1px solid var(--crm-border-card);
    cursor: pointer;
    padding: 0.12rem 0.35rem;
    border-radius: 0.3rem;
    color: var(--crm-text-secondary);
    font-size: 0.62rem;
    font-weight: 700;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
}
.crm-copy-btn-sm:hover {
    background: #f5ede2;
    color: var(--crm-bronze-dark);
}

/* Modal & Toast */
.crm-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(30, 20, 13, 0.55);
    backdrop-filter: blur(4px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1.5rem;
}
.crm-modal-overlay.active { display: flex; }
.crm-modal-card {
    background: #ffffff;
    border-radius: 1.15rem;
    border: 1px solid var(--crm-border-card);
    box-shadow: 0 20px 45px rgba(44, 26, 14, 0.18);
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.75rem;
}

.crm-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--crm-bronze-dark);
    color: #ffffff;
    padding: 0.6rem 1.1rem;
    border-radius: 0.55rem;
    font-size: 0.78rem;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    display: none;
    align-items: center;
    gap: 0.5rem;
    z-index: 10000;
}
</style>

<div class="crm-container">

    <!-- 1. KPI Cards (Clean Typography) -->
    <div class="grid-4" style="margin-bottom: 0.15rem;">
        <div class="glass-card" style="padding: 0.85rem 1.1rem; border-left: 3.5px solid var(--crm-gold-primary);">
            <p style="font-size: 0.64rem; font-weight: 800; text-transform: uppercase; color: var(--crm-bronze-dark); letter-spacing: 0.05em; margin: 0;">Total Inquiries</p>
            <p style="font-size: 1.5rem; font-weight: 900; font-family: 'Space Grotesk', sans-serif; color: var(--crm-text-primary); margin: 0.15rem 0 0 0;"><?= $stats['total'] ?></p>
            <p style="font-size: 0.65rem; color: var(--crm-text-muted); margin: 0.1rem 0 0 0;">100% Real Live Leads</p>
        </div>

        <div class="glass-card" style="padding: 0.85rem 1.1rem; border-left: 3.5px solid #0284c7;">
            <p style="font-size: 0.64rem; font-weight: 800; text-transform: uppercase; color: #0369a1; letter-spacing: 0.05em; margin: 0;">New Leads</p>
            <p style="font-size: 1.5rem; font-weight: 900; font-family: 'Space Grotesk', sans-serif; color: #0284c7; margin: 0.15rem 0 0 0;"><?= $stats['new'] ?></p>
            <p style="font-size: 0.65rem; color: var(--crm-text-muted); margin: 0.1rem 0 0 0;">Awaiting Outreach</p>
        </div>

        <div class="glass-card" style="padding: 0.85rem 1.1rem; border-left: 3.5px solid #d97706;">
            <p style="font-size: 0.64rem; font-weight: 800; text-transform: uppercase; color: #b45309; letter-spacing: 0.05em; margin: 0;">In Discussion</p>
            <p style="font-size: 1.5rem; font-weight: 900; font-family: 'Space Grotesk', sans-serif; color: #b45309; margin: 0.15rem 0 0 0;"><?= $stats['in_discussion'] ?></p>
            <p style="font-size: 0.65rem; color: var(--crm-text-muted); margin: 0.1rem 0 0 0;">Active Conversations</p>
        </div>

        <div class="glass-card" style="padding: 0.85rem 1.1rem; border-left: 3.5px solid #16a34a;">
            <p style="font-size: 0.64rem; font-weight: 800; text-transform: uppercase; color: #15803d; letter-spacing: 0.05em; margin: 0;">Converted Clients</p>
            <p style="font-size: 1.5rem; font-weight: 900; font-family: 'Space Grotesk', sans-serif; color: #16a34a; margin: 0.15rem 0 0 0;"><?= $stats['converted'] ?></p>
            <p style="font-size: 0.65rem; color: var(--crm-text-muted); margin: 0.1rem 0 0 0;">Successfully Closed</p>
        </div>
    </div>

    <!-- 2. Search & Filter Bar -->
    <div class="glass-card" style="padding: 0.65rem 1rem;">
        <form method="GET" style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; justify-content: space-between; margin: 0;">
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; flex: 1; min-width: 280px;">
                <input type="text" name="search" value="<?= htmlspecialchars($searchQuery ?? '') ?>" placeholder="Search Client, Phone, Brand, Domain..." class="form-input" style="padding: 0.45rem 0.75rem; font-size: 0.75rem; min-width: 180px; flex: 2;">
                
                <select name="status" class="form-select" style="padding: 0.45rem 0.75rem; font-size: 0.75rem; min-width: 120px; flex: 1;">
                    <option value="">All Statuses</option>
                    <option value="New Lead" <?= $statusFilter === 'New Lead' ? 'selected' : '' ?>>New Lead</option>
                    <option value="In Discussion" <?= $statusFilter === 'In Discussion' ? 'selected' : '' ?>>In Discussion</option>
                    <option value="Follow-up" <?= $statusFilter === 'Follow-up' ? 'selected' : '' ?>>Follow-up</option>
                    <option value="Converted" <?= $statusFilter === 'Converted' ? 'selected' : '' ?>>Converted</option>
                </select>

                <select name="tool" class="form-select" style="padding: 0.45rem 0.75rem; font-size: 0.75rem; min-width: 130px; flex: 1;">
                    <option value="">All Tools</option>
                    <option value="Website DA/PA Checker" <?= $toolFilter === 'Website DA/PA Checker' ? 'selected' : '' ?>>DA/PA Checker</option>
                    <option value="Google Review QR Generator" <?= $toolFilter === 'Google Review QR Generator' ? 'selected' : '' ?>>Review QR Gen</option>
                    <option value="WhatsApp Link Generator" <?= $toolFilter === 'WhatsApp Link Generator' ? 'selected' : '' ?>>WhatsApp Link Gen</option>
                </select>

                <button type="submit" class="gold-btn" style="padding: 0.45rem 0.95rem; font-size: 0.75rem;">
                    Filter
                </button>
                <?php if ($searchQuery || $statusFilter || $toolFilter): ?>
                    <a href="/jaatumeinaaya/leads" class="cream-btn" style="padding: 0.45rem 0.75rem; font-size: 0.75rem; background: #ffffff;">
                        Clear
                    </a>
                <?php endif; ?>
            </div>

            <div style="display: flex; gap: 0.4rem; align-items: center;">
                <a href="/jaatumeinaaya/leads?action=export_csv" class="gold-btn" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;">
                    Export CSV
                </a>
            </div>
        </form>
    </div>

    <!-- Alerts -->
    <?php if ($msg): ?>
        <div style="padding: 0.5rem 0.85rem; border-radius: 0.45rem; background: var(--emerald-bg); border: 1px solid var(--emerald-border); color: var(--emerald-text); font-size: 0.75rem; font-weight: 700;">
            <?= htmlspecialchars($msg) ?>
        </div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div style="padding: 0.5rem 0.85rem; border-radius: 0.45rem; background: var(--red-bg); border: 1px solid var(--red-border); color: var(--red-text); font-size: 0.75rem; font-weight: 700;">
            <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <!-- 3. High-Density Compact 7-Column Zero-Scroll CRM Table -->
    <div class="crm-table-container">
        <?php if (empty($leads)): ?>
            <div style="padding: 3rem 1.5rem; text-align: center;">
                <h3 style="font-size: 1rem; font-weight: 800; color: var(--crm-text-primary); font-family: 'Space Grotesk', sans-serif;">
                    No Inquiries Found
                </h3>
                <p style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 0.2rem;">
                    Inquiries submitted on website growth tools will appear here in real-time.
                </p>
            </div>
        <?php else: ?>
            <div style="overflow-x: auto; width: 100%;">
                <table class="crm-table" style="width: 100%; table-layout: fixed;">
                    <colgroup>
                        <col style="width: 21%;">
                        <col style="width: 13%;">
                        <col style="width: 12%;">
                        <col style="width: 13%;">
                        <col style="width: 14%;">
                        <col style="width: 10%;">
                        <col style="width: 17%;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Client & Organization</th>
                            <th>Contact</th>
                            <th>Outreach</th>
                            <th>Target Domain</th>
                            <th>Source Tool & Stage</th>
                            <th>Date & Time</th>
                            <th>Pipeline & Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($leads as $l): ?>
                            <?php 
                                $cleanPhone = preg_replace('/[^0-9]/', '', $l['phone_number']);
                                if (strlen($cleanPhone) === 10) $cleanPhone = '91' . $cleanPhone;
                                
                                $toolShort = $l['tool_used'] ?: 'DA/PA Checker';
                                if ($toolShort === 'Website DA/PA Checker') $toolShort = 'DA/PA Checker';
                                else if ($toolShort === 'Google Review QR Generator') $toolShort = 'Review QR Gen';
                                else if ($toolShort === 'WhatsApp Link Generator') $toolShort = 'WhatsApp Gen';

                                $stageShort = $l['business_stage'] ?: 'Early-Stage';
                                if (str_contains($stageShort, 'Early-Stage')) $stageShort = 'Early-Stage';
                                else if (str_contains($stageShort, 'Growth')) $stageShort = 'Growth';
                                else if (str_contains($stageShort, 'Enterprise')) $stageShort = 'Enterprise';

                                $encodedMsg = urlencode("Hello " . $l['full_name'] . ", this is PR Marketing Ventures regarding your inquiry on " . ($l['tool_used'] ?: 'Website DA/PA Checker') . ". How can we assist your business growth today?");
                                $waUrl = "https://wa.me/{$cleanPhone}?text={$encodedMsg}";

                                // Status color class
                                $statusClass = 'status-new';
                                if ($l['status'] === 'In Discussion') $statusClass = 'status-discussion';
                                else if ($l['status'] === 'Follow-up') $statusClass = 'status-followup';
                                else if ($l['status'] === 'Converted') $statusClass = 'status-converted';

                                // Domain URL
                                $url = $l['website_url'] ?? '';
                                $host = '';
                                if (!empty($url)) {
                                    if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
                                        $url = 'https://' . $url;
                                    }
                                    $host = parse_url($url, PHP_URL_HOST) ?: $l['website_url'];
                                }

                                // Safe lead JSON for Inspector modal
                                $safeJson = htmlspecialchars(json_encode([
                                    'id'             => $l['id'],
                                    'full_name'      => $l['full_name'],
                                    'phone_number'   => $l['phone_number'],
                                    'whatsapp_number'=> $l['whatsapp_number'] ?: $l['phone_number'],
                                    'business_name'  => $l['business_name'] ?: 'Not Specified',
                                    'website_url'    => $l['website_url'] ?: '',
                                    'business_stage' => $l['business_stage'] ?: 'Early-Stage Startup',
                                    'tool_used'      => $l['tool_used'] ?: 'Website DA/PA Checker',
                                    'status'         => $l['status'] ?: 'New Lead',
                                    'notes'          => $l['notes'] ?: '',
                                    'ip_address'     => $l['ip_address'] ?: '127.0.0.1',
                                    'created_at'     => date('d M Y, h:i A', strtotime($l['created_at']))
                                ]), ENT_QUOTES, 'UTF-8');
                            ?>
                            <tr>
                                <!-- 1. Client & Organization (1 Line) -->
                                <td>
                                    <div style="display: inline-flex; align-items: center; gap: 0.35rem;">
                                        <span style="font-weight: 800; color: var(--crm-text-primary); font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem;">
                                            <?= htmlspecialchars($l['full_name']) ?>
                                        </span>
                                        <?php if (!empty($l['business_name'])): ?>
                                            <span style="color: var(--crm-text-muted); font-size: 0.65rem;">·</span>
                                            <span style="display: inline-flex; align-items: center; padding: 0.1rem 0.35rem; border-radius: 0.3rem; background: var(--crm-gold-light); color: var(--crm-bronze-dark); border: 1px solid var(--crm-border-card); font-size: 0.66rem; font-weight: 700;">
                                                <?= htmlspecialchars($l['business_name']) ?>
                                            </span>
                                        <?php endif; ?>
                                    </div>
                                </td>

                                <!-- 2. Contact -->
                                <td>
                                    <div style="display: inline-flex; align-items: center; gap: 0.3rem;">
                                        <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 800; color: var(--crm-text-primary); font-size: 0.74rem; letter-spacing: 0.02em;">
                                            +91 <?= htmlspecialchars($l['phone_number']) ?>
                                        </span>
                                        <button type="button" class="crm-copy-btn-sm" onclick="copyPhone('<?= htmlspecialchars($l['phone_number']) ?>', this)" title="Copy Phone Number">
                                            Copy
                                        </button>
                                    </div>
                                </td>

                                <!-- 3. Quick Outreach -->
                                <td>
                                    <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        <a href="<?= $waUrl ?>" target="_blank" class="crm-wa-btn-sm" title="Chat on WhatsApp">
                                            WhatsApp
                                        </a>
                                        <a href="tel:+91<?= htmlspecialchars($l['phone_number']) ?>" class="crm-call-btn-sm" title="Direct Phone Call">
                                            Call
                                        </a>
                                    </div>
                                </td>

                                <!-- 4. Target Domain -->
                                <td>
                                    <?php if (!empty($host)): ?>
                                        <a href="<?= htmlspecialchars($url) ?>" target="_blank" style="font-weight: 700; color: #2563eb; text-decoration: none; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 0.2rem; background: #eff6ff; padding: 0.12rem 0.38rem; border-radius: 0.3rem; border: 1px solid #bfdbfe;" title="<?= htmlspecialchars($url) ?>">
                                            <?= htmlspecialchars($host) ?> ↗
                                        </a>
                                    <?php else: ?>
                                        <span style="font-size: 0.68rem; color: var(--crm-text-muted);">—</span>
                                    <?php endif; ?>
                                </td>

                                <!-- 5. Source Tool & Stage (1 Line) -->
                                <td>
                                    <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        <span style="display: inline-flex; align-items: center; padding: 0.12rem 0.38rem; border-radius: 0.3rem; background: #fdfbf7; border: 1px solid var(--crm-border-card); color: var(--crm-bronze-dark); font-size: 0.66rem; font-weight: 700;">
                                            <?= htmlspecialchars($toolShort) ?>
                                        </span>
                                        <span style="display: inline-flex; align-items: center; padding: 0.12rem 0.38rem; border-radius: 0.3rem; background: #faf8f5; color: var(--crm-text-secondary); border: 1px solid var(--crm-border-card); font-size: 0.66rem; font-weight: 600;">
                                            <?= htmlspecialchars($stageShort) ?>
                                        </span>
                                    </div>
                                </td>

                                <!-- 6. Date & Time -->
                                <td>
                                    <span style="font-size: 0.68rem; color: var(--crm-text-muted); font-weight: 600;">
                                        <?= date('d M, h:i A', strtotime($l['created_at'])) ?>
                                    </span>
                                </td>

                                <!-- 7. Pipeline Status & Actions -->
                                <td>
                                    <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
                                        <form method="POST" style="margin: 0; display: inline-block;">
                                            <input type="hidden" name="update_status" value="1">
                                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(getCsrfToken()) ?>">
                                            <input type="hidden" name="lead_id" value="<?= htmlspecialchars($l['id']) ?>">
                                            <select name="status" onchange="this.form.submit()" class="status-badge-select <?= $statusClass ?>" title="Change Pipeline Status">
                                                <option value="New Lead" <?= $l['status'] === 'New Lead' ? 'selected' : '' ?>>New Lead</option>
                                                <option value="In Discussion" <?= $l['status'] === 'In Discussion' ? 'selected' : '' ?>>In Discussion</option>
                                                <option value="Follow-up" <?= $l['status'] === 'Follow-up' ? 'selected' : '' ?>>Follow-up</option>
                                                <option value="Converted" <?= $l['status'] === 'Converted' ? 'selected' : '' ?>>Converted</option>
                                            </select>
                                        </form>
                                        <button type="button" onclick='openLeadInspector(<?= $safeJson ?>)' style="display: inline-flex; align-items: center; justify-content: center; padding: 0.16rem 0.38rem; border-radius: 0.3rem; background: #ffffff; border: 1px solid var(--crm-border-card); color: var(--crm-bronze-dark); cursor: pointer; font-size: 0.66rem; font-weight: 700;" title="View Notes & Full Inquiry Details">
                                            Notes
                                        </button>
                                        <a href="/jaatumeinaaya/leads?action=delete&id=<?= urlencode($l['id']) ?>&csrf=<?= urlencode(getCsrfToken()) ?>" onclick="return confirm('Delete inquiry for <?= addslashes($l['full_name']) ?>?')" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.16rem 0.38rem; border-radius: 0.3rem; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; text-decoration: none; font-size: 0.66rem; font-weight: 800;" title="Delete Lead">
                                            Del
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- 4. Lead Inspector & Notes Modal -->
<div id="leadModalOverlay" class="crm-modal-overlay" onclick="handleModalBackdropClick(event)">
    <div class="crm-modal-card">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--crm-border-card); padding-bottom: 0.85rem; margin-bottom: 1rem;">
            <div>
                <h3 id="modalClientName" style="font-size: 1.1rem; font-weight: 800; color: var(--crm-text-primary); font-family: 'Space Grotesk', sans-serif; margin: 0;">
                    Client Details
                </h3>
                <div id="modalLeadId" style="font-size: 0.68rem; color: var(--crm-gold-dark); font-weight: 700;"></div>
            </div>
            <button type="button" onclick="closeLeadInspector()" style="background: transparent; border: none; font-size: 1.15rem; font-weight: 900; color: var(--crm-text-muted); cursor: pointer;">
                ✕
            </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; background: #faf6f0; border: 1px solid var(--crm-border-card); border-radius: 0.75rem; padding: 0.85rem; font-size: 0.78rem;">
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Phone Number</span>
                <p id="modalPhone" style="margin: 0.15rem 0 0 0; font-weight: 800; color: var(--crm-text-primary); font-family: 'Space Grotesk', sans-serif;"></p>
            </div>
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Organization</span>
                <p id="modalBusiness" style="margin: 0.15rem 0 0 0; font-weight: 800; color: var(--crm-text-primary);"></p>
            </div>
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Website / Domain</span>
                <p id="modalWebsite" style="margin: 0.15rem 0 0 0; font-weight: 700; word-break: break-all;"></p>
            </div>
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Business Stage</span>
                <p id="modalStage" style="margin: 0.15rem 0 0 0; font-weight: 700;"></p>
            </div>
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Source Tool</span>
                <p id="modalTool" style="margin: 0.15rem 0 0 0; font-weight: 700; color: var(--crm-bronze-dark);"></p>
            </div>
            <div>
                <span style="font-size: 0.68rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 800;">Submission Timestamp</span>
                <p id="modalCreatedAt" style="margin: 0.15rem 0 0 0; font-weight: 600; color: var(--crm-text-secondary);"></p>
            </div>
        </div>

        <form method="POST" style="margin-top: 1rem;">
            <input type="hidden" name="save_notes" value="1">
            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(getCsrfToken()) ?>">
            <input type="hidden" id="modalLeadIdInput" name="lead_id" value="">
            <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--crm-text-primary); margin-bottom: 0.25rem;">
                Internal Notes & Follow-up Remarks:
            </label>
            <textarea id="modalNotesText" name="notes" rows="4" placeholder="Add discussion summary, quotation details, follow-up schedule..." class="form-input" style="width: 100%; box-sizing: border-box; padding: 0.65rem; font-size: 0.8rem; font-family: inherit; resize: vertical;"></textarea>

            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; margin-top: 0.85rem;">
                <button type="button" onclick="closeLeadInspector()" class="cream-btn" style="padding: 0.5rem 1rem; font-size: 0.78rem; background: #ffffff;">
                    Close
                </button>
                <button type="submit" class="gold-btn" style="padding: 0.5rem 1.15rem; font-size: 0.78rem;">
                    Save Notes
                </button>
            </div>
        </form>
    </div>
</div>

<!-- 5. Floating Toast Element -->
<div id="crmToast" class="crm-toast">
    <span id="crmToastMsg">Phone number copied to clipboard!</span>
</div>

<script>
function copyPhone(phone, btnEl) {
    if (!phone) return;
    navigator.clipboard.writeText(phone).then(() => {
        showToast('Phone +91 ' + phone + ' copied!');
        if (btnEl) {
            const orig = btnEl.innerText;
            btnEl.innerText = 'Copied';
            setTimeout(() => { btnEl.innerText = orig; }, 1500);
        }
    }).catch(err => {
        showToast('Copied: +91 ' + phone);
    });
}

function showToast(message) {
    const toast = document.getElementById('crmToast');
    const toastMsg = document.getElementById('crmToastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.innerText = message;
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

function openLeadInspector(lead) {
    if (!lead) return;
    document.getElementById('modalClientName').innerText = lead.full_name || 'Client Details';
    document.getElementById('modalLeadId').innerText = 'ID: #' + (lead.id || '');
    document.getElementById('modalLeadIdInput').value = lead.id || '';
    document.getElementById('modalPhone').innerText = '+91 ' + (lead.phone_number || '—');
    document.getElementById('modalBusiness').innerText = lead.business_name || 'Individual';
    document.getElementById('modalWebsite').innerText = lead.website_url || 'None';
    document.getElementById('modalStage').innerText = lead.business_stage || 'Early-Stage Startup';
    document.getElementById('modalTool').innerText = lead.tool_used || 'DA/PA Checker';
    document.getElementById('modalCreatedAt').innerText = lead.created_at || '—';
    document.getElementById('modalNotesText').value = lead.notes || '';

    const overlay = document.getElementById('leadModalOverlay');
    if (overlay) overlay.classList.add('active');
}

function closeLeadInspector() {
    const overlay = document.getElementById('leadModalOverlay');
    if (overlay) overlay.classList.remove('active');
}

function handleModalBackdropClick(e) {
    if (e.target && e.target.id === 'leadModalOverlay') {
        closeLeadInspector();
    }
}
</script>

<?php require_once __DIR__ . '/layout/footer.php'; ?>
