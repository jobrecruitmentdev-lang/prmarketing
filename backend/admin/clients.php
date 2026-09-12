<?php
/**
 * PR Marketing Ventures — Client Library Control Center (Warm Cream & Luxury Espresso)
 * Manage active client business profiles, services opted, project values, and delivery milestones.
 */

$pageTitle = "Client Library";
require_once __DIR__ . '/layout/header.php';
require_once __DIR__ . '/layout/sidebar.php';
require_once __DIR__ . '/../repositories/ClientRepository.php';

$clientRepo = new ClientRepository();

$msg = '';
$error = '';

// Handle Create / Update via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_client'])) {
    $id = !empty($_POST['id']) ? trim($_POST['id']) : null;
    $companyName = trim($_POST['company_name'] ?? '');
    $contactPerson = trim($_POST['contact_person'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $serviceType = trim($_POST['service_type'] ?? 'Web Development & High-Converting Websites');
    $projectValue = trim($_POST['project_value'] ?? '');
    $status = $_POST['status'] ?? 'Active';
    $startDate = !empty($_POST['start_date']) ? $_POST['start_date'] : null;
    $deliveryDate = !empty($_POST['delivery_date']) ? $_POST['delivery_date'] : null;
    $notes = trim($_POST['notes'] ?? '');

    if (empty($companyName)) {
        $error = "Client / Company name is required.";
    } else {
        try {
            $data = [
                'company_name'   => $companyName,
                'contact_person' => $contactPerson,
                'email'          => $email,
                'phone'          => $phone,
                'service_type'   => $serviceType,
                'project_value'  => $projectValue,
                'status'         => $status,
                'start_date'     => $startDate,
                'delivery_date'  => $deliveryDate,
                'notes'          => $notes
            ];

            if ($id) {
                $clientRepo->update($id, $data);
                $msg = "Client '{$companyName}' updated successfully!";
            } else {
                $clientRepo->create($data);
                $msg = "Client '{$companyName}' added to Client Library!";
            }
        } catch (Exception $e) {
            $error = "Database Error: " . $e->getMessage();
        }
    }
}

// Handle Delete Action
if (isset($_GET['action']) && $_GET['action'] === 'delete' && !empty($_GET['id'])) {
    try {
        $clientRepo->delete($_GET['id']);
        $msg = "Client record removed successfully.";
    } catch (Exception $e) {
        $error = "Error deleting client: " . $e->getMessage();
    }
}

$statusFilter = $_GET['status'] ?? null;
$serviceFilter = $_GET['service'] ?? null;
$searchQuery = $_GET['search'] ?? null;

$clients = $clientRepo->getAll($statusFilter, $serviceFilter, $searchQuery);
$metrics = $clientRepo->getMetrics();

$serviceOptions = [
    'Web Development & High-Converting Websites',
    'E-Commerce Website & Store Development',
    'Custom Software & Portal Development',
    'AI Agents & Business Automation',
    'CRM Solutions & Custom Development',
    'SEO & AEO (Search Engine Optimization)',
    'AI Search Optimization (GEO / Perplexity)',
    'Performance Marketing & Paid Ads',
    'Social Media & Digital Marketing',
    'Brand Identity & Strategy',
    'Conversion Rate Optimization (CRO)',
    'Website Speed & Core Web Vitals',
    'Google Business Profile (GBP) & Local SEO',
    'Other / Custom Enterprise Scope'
];
?>

<!-- Main Content Container -->
<div style="display: flex; flex-direction: column; gap: 1.5rem;">

    <!-- Top Notifications -->
    <?php if ($msg): ?>
        <div style="padding: 0.875rem 1.25rem; border-radius: 0.875rem; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 0.8125rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);">
            <span>✓</span> <?= htmlspecialchars($msg) ?>
        </div>
    <?php endif; ?>

    <?php if ($error): ?>
        <div style="padding: 0.875rem 1.25rem; border-radius: 0.875rem; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; font-size: 0.8125rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚠</span> <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <!-- 1. Hero KPI Metric Cards -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
        <!-- Card 1: Total Clients -->
        <div class="glass-card" style="padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; border-left: 3px solid var(--brown-primary);">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.65rem; background: linear-gradient(135deg, #a0683b 0%, #7d4a22 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(140,88,53,0.25);">
                <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div>
                <p style="font-size: 1.75rem; font-weight: 900; color: var(--text-main); font-family: 'Space Grotesk', sans-serif; line-height: 1;"><?= $metrics['total'] ?></p>
                <p style="font-size: 0.6875rem; font-weight: 800; color: var(--brown-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem;">Total Clients</p>
            </div>
        </div>

        <!-- Card 2: Active Projects -->
        <div class="glass-card" style="padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; border-left: 3px solid #10b981;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.65rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(16,185,129,0.25);">
                <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
                <p style="font-size: 1.75rem; font-weight: 900; color: #065f46; font-family: 'Space Grotesk', sans-serif; line-height: 1;"><?= $metrics['active'] ?></p>
                <p style="font-size: 0.6875rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem;">Active Projects</p>
            </div>
        </div>

        <!-- Card 3: Completed -->
        <div class="glass-card" style="padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; border-left: 3px solid #3b82f6;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.65rem; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(59,130,246,0.25);">
                <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
                <p style="font-size: 1.75rem; font-weight: 900; color: #1e40af; font-family: 'Space Grotesk', sans-serif; line-height: 1;"><?= $metrics['completed'] ?></p>
                <p style="font-size: 0.6875rem; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem;">Delivered</p>
            </div>
        </div>

        <!-- Card 4: Maintenance / AMC -->
        <div class="glass-card" style="padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; border-left: 3px solid #d97706;">
            <div style="width: 2.5rem; height: 2.5rem; border-radius: 0.65rem; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 8px rgba(217,119,6,0.25);">
                <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>
            <div>
                <p style="font-size: 1.75rem; font-weight: 900; color: #92400e; font-family: 'Space Grotesk', sans-serif; line-height: 1;"><?= $metrics['maintenance'] ?></p>
                <p style="font-size: 0.6875rem; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.2rem;">Retainers & AMC</p>
            </div>
        </div>
    </div>

    <!-- 2. Action Header & Filters Toolbar -->
    <div class="glass-card" style="display: flex; flex-direction: column; gap: 1rem; padding: 1.25rem 1.5rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
            <div>
                <h3 style="font-size: 1.125rem; font-weight: 900; color: var(--text-main); font-family: 'Space Grotesk', sans-serif;">
                    Client Accounts & Contracts
                </h3>
                <p style="font-size: 0.8125rem; color: var(--text-muted);">
                    Manage client profiles, subscribed services, project value, milestones, and deliverable notes.
                </p>
            </div>

            <!-- Add Client Button -->
            <button type="button" onclick="openClientModal()" class="gold-btn" style="padding: 0.65rem 1.25rem; font-size: 0.8125rem; display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <span style="font-size: 1.125rem; font-weight: 900; line-height: 1;">+</span>
                <span>Add New Client</span>
            </button>
        </div>

        <!-- Filter / Search Form -->
        <form method="GET" action="/jaatumeinaaya/clients" style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
            <!-- Search -->
            <div style="flex: 1; min-width: 14rem; position: relative;">
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Search client, contact person, phone, email..." 
                    value="<?= htmlspecialchars($searchQuery ?? '') ?>"
                    style="width: 100%; padding: 0.6rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                />
            </div>

            <!-- Service Filter -->
            <select name="service" style="padding: 0.6rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);">
                <option value="All">All Services</option>
                <?php foreach ($serviceOptions as $opt): ?>
                    <option value="<?= htmlspecialchars($opt) ?>" <?= ($serviceFilter === $opt) ? 'selected' : '' ?>>
                        <?= htmlspecialchars($opt) ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <!-- Status Filter -->
            <select name="status" style="padding: 0.6rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);">
                <option value="All">All Statuses</option>
                <option value="Active" <?= ($statusFilter === 'Active') ? 'selected' : '' ?>>Active</option>
                <option value="Completed" <?= ($statusFilter === 'Completed') ? 'selected' : '' ?>>Completed</option>
                <option value="On Hold" <?= ($statusFilter === 'On Hold') ? 'selected' : '' ?>>On Hold</option>
                <option value="Maintenance / AMC" <?= ($statusFilter === 'Maintenance / AMC') ? 'selected' : '' ?>>Maintenance / AMC</option>
            </select>

            <button type="submit" class="cream-btn" style="padding: 0.6rem 1rem; font-size: 0.8125rem; background: #ffffff; cursor: pointer;">
                Filter
            </button>

            <?php if ($searchQuery || $serviceFilter || $statusFilter): ?>
                <a href="/jaatumeinaaya/clients" style="font-size: 0.75rem; font-weight: 800; color: #dc2626; text-decoration: none; padding: 0.6rem 0.5rem;">
                    ✕ Clear
                </a>
            <?php endif; ?>
        </form>
    </div>

    <!-- 3. Client Records Table -->
    <div class="glass-card" style="padding: 0; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8125rem; table-layout: fixed;">
            <colgroup>
                <col style="width: 32%" />
                <col style="width: 28%" />
                <col style="width: 24%" />
                <col style="width: 16%" />
            </colgroup>
            <thead>
                <tr style="background: #f8f4ee; border-bottom: 1px solid var(--border-medium); color: var(--text-dim); text-transform: uppercase; font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.05em;">
                    <th style="padding: 0.875rem 1.25rem;">Client &amp; Contact</th>
                    <th style="padding: 0.875rem 1rem;">Service &amp; Value</th>
                    <th style="padding: 0.875rem 1rem;">Timeline &amp; Notes</th>
                    <th style="padding: 0.875rem 1.25rem; text-align: right;">Status &amp; Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($clients)): ?>
                    <tr>
                        <td colspan="4" style="padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                                <div style="width: 3rem; height: 3rem; border-radius: 50%; background: #f3ece1; display: flex; align-items: center; justify-content: center; font-size: 1.35rem;">📂</div>
                                <p style="font-size: 0.9375rem; font-weight: 800; color: var(--text-main);">No Clients Found in Library</p>
                                <p style="font-size: 0.75rem; color: var(--text-dim);">Click "+ Add New Client" above to record your first client account.</p>
                            </div>
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($clients as $c): ?>
                        <?php
                        $statusBg = '#ecfdf5'; $statusColor = '#065f46'; $statusBorder = '#a7f3d0';
                        if ($c['status'] === 'On Hold') {
                            $statusBg = '#fef2f2'; $statusColor = '#991b1b'; $statusBorder = '#fecaca';
                        } elseif ($c['status'] === 'Completed') {
                            $statusBg = '#eff6ff'; $statusColor = '#1e40af'; $statusBorder = '#bfdbfe';
                        } elseif ($c['status'] === 'Maintenance / AMC') {
                            $statusBg = '#fffbeb'; $statusColor = '#92400e'; $statusBorder = '#fde68a';
                        }
                        ?>
                        <tr style="border-bottom: 1px solid var(--border-subtle); transition: background 0.15s;" onmouseover="this.style.background='#faf6ef'" onmouseout="this.style.background='transparent'">

                            <!-- COL 1: Client & Contact -->
                            <td style="padding: 0.875rem 1.25rem;">
                                <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
                                    <div style="width: 2.1rem; height: 2.1rem; border-radius: 0.55rem; background: linear-gradient(135deg, #a0683b 0%, #7d4a22 100%); color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.875rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(140,88,53,0.2);">
                                        <?= strtoupper(substr($c['company_name'], 0, 1)) ?>
                                    </div>
                                    <div style="min-width: 0;">
                                        <p style="font-weight: 800; color: var(--text-main); font-size: 0.8125rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><?= htmlspecialchars($c['company_name']) ?></p>
                                        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                            <?= htmlspecialchars($c['contact_person'] ?: '—') ?>
                                        </p>
                                        <?php if (!empty($c['phone'])): ?>
                                            <a href="tel:<?= htmlspecialchars($c['phone']) ?>" style="font-size: 0.6875rem; color: var(--brown-primary); font-weight: 700; text-decoration: none;"><?= htmlspecialchars($c['phone']) ?></a>
                                        <?php endif; ?>
                                        <?php if (!empty($c['email'])): ?>
                                            <p style="font-size: 0.6875rem; color: var(--text-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><?= htmlspecialchars($c['email']) ?></p>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </td>

                            <!-- COL 2: Service & Value -->
                            <td style="padding: 0.875rem 1rem;">
                                <span style="display: inline-block; padding: 0.2rem 0.55rem; border-radius: 0.45rem; background: #f3ece1; color: var(--brown-primary); font-weight: 800; font-size: 0.6875rem; border: 1px solid var(--border-medium); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="<?= htmlspecialchars($c['service_type']) ?>">
                                    <?= htmlspecialchars($c['service_type']) ?>
                                </span>
                                <p style="font-size: 0.8125rem; font-weight: 900; color: var(--text-main); margin-top: 0.45rem;">
                                    <?= htmlspecialchars($c['project_value'] ?: '—') ?>
                                </p>
                            </td>

                            <!-- COL 3: Timeline & Notes -->
                            <td style="padding: 0.875rem 1rem;">
                                <div style="font-size: 0.6875rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.15rem;">
                                    <div><span style="font-weight: 700; color: var(--text-dim);">Start:</span> <?= $c['start_date'] ? date('d M Y', strtotime($c['start_date'])) : '—' ?></div>
                                    <div><span style="font-weight: 700; color: var(--text-dim);">Delivery:</span> <?= $c['delivery_date'] ? date('d M Y', strtotime($c['delivery_date'])) : '—' ?></div>
                                </div>
                                <?php if (!empty($c['notes'])): ?>
                                    <p style="font-size: 0.6875rem; color: var(--text-dim); margin-top: 0.35rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="<?= htmlspecialchars($c['notes']) ?>">
                                        <?= htmlspecialchars($c['notes']) ?>
                                    </p>
                                <?php endif; ?>
                            </td>

                            <!-- COL 4: Status & Actions -->
                            <td style="padding: 0.875rem 1.25rem; text-align: right; vertical-align: top;">
                                <span style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.6rem; border-radius: 9999px; background: <?= $statusBg ?>; color: <?= $statusColor ?>; border: 1px solid <?= $statusBorder ?>; font-size: 0.6875rem; font-weight: 800; margin-bottom: 0.5rem; white-space: nowrap;">
                                    <span style="width: 0.35rem; height: 0.35rem; border-radius: 50%; background: currentColor;"></span>
                                    <?= htmlspecialchars($c['status']) ?>
                                </span>
                                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.4rem; margin-top: 0.5rem;">
                                    <button
                                        type="button"
                                        onclick='editClientModal(<?= json_encode($c, JSON_HEX_APOS | JSON_HEX_QUOT) ?>)'
                                        style="padding: 0.3rem 0.65rem; border-radius: 0.45rem; background: #ffffff; border: 1px solid var(--border-medium); color: var(--text-main); font-size: 0.6875rem; font-weight: 800; cursor: pointer;"
                                        onmouseover="this.style.background='#f3ece1'"
                                        onmouseout="this.style.background='#ffffff'"
                                    >Edit</button>
                                    <a
                                        href="/jaatumeinaaya/clients?action=delete&id=<?= urlencode($c['id']) ?>"
                                        onclick="return confirm('Delete client <?= htmlspecialchars(addslashes($c['company_name'])) ?>?');"
                                        style="padding: 0.3rem 0.55rem; border-radius: 0.45rem; background: #fee2e2; border: 1px solid #fecaca; color: #dc2626; font-size: 0.6875rem; font-weight: 800; text-decoration: none;"
                                    >Delete</a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- ==============================================================================
     LUXURY MODAL POPUP (ADD / EDIT CLIENT RECORD)
     ============================================================================== -->
<div id="clientModal" style="display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(30, 20, 15, 0.6); backdrop-filter: blur(6px); align-items: center; justify-content: center; padding: 1rem;">
    <div style="background: #ffffff; border-radius: 1.25rem; border: 1px solid var(--border-medium); box-shadow: 0 20px 40px rgba(0,0,0,0.2); width: 100%; max-width: 38rem; max-height: 90vh; overflow-y: auto; padding: 1.75rem 2rem; position: relative;">
        
        <!-- Modal Close Button -->
        <button type="button" onclick="closeClientModal()" style="position: absolute; right: 1.25rem; top: 1.25rem; width: 2rem; height: 2rem; border-radius: 50%; border: 1px solid var(--border-medium); background: #faf7f2; color: var(--text-dim); font-size: 1rem; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ✕
        </button>

        <div style="margin-bottom: 1.5rem;">
            <span style="font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brown-primary);">
                Client Portfolio Management
            </span>
            <h2 id="modalTitle" style="font-size: 1.35rem; font-weight: 900; color: var(--text-main); font-family: 'Space Grotesk', sans-serif; margin-top: 0.25rem;">
                Add New Client
            </h2>
        </div>

        <form method="POST" action="/jaatumeinaaya/clients" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="hidden" name="save_client" value="1" />
            <input type="hidden" name="id" id="clientId" value="" />

            <!-- Row 1: Company Name & Contact Person -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Company / Business Name *
                    </label>
                    <input 
                        type="text" 
                        name="company_name" 
                        id="clientCompany" 
                        required 
                        placeholder="e.g. Shadowfax Logistics Ltd."
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Primary Contact Person
                    </label>
                    <input 
                        type="text" 
                        name="contact_person" 
                        id="clientPerson" 
                        placeholder="e.g. Abhishek Bansal (Founder)"
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>
            </div>

            <!-- Row 2: Phone & Email -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Phone / WhatsApp
                    </label>
                    <input 
                        type="text" 
                        name="phone" 
                        id="clientPhone" 
                        placeholder="e.g. +91 98765 43210"
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Email Address
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="clientEmail" 
                        placeholder="e.g. contact@clientcompany.com"
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>
            </div>

            <!-- Row 3: Service Opted & Project Value -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 1rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Service Opted *
                    </label>
                    <select 
                        name="service_type" 
                        id="clientService" 
                        required
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    >
                        <?php foreach ($serviceOptions as $opt): ?>
                            <option value="<?= htmlspecialchars($opt) ?>"><?= htmlspecialchars($opt) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Project Value / Contract Fee
                    </label>
                    <input 
                        type="text" 
                        name="project_value" 
                        id="clientValue" 
                        placeholder="e.g. ₹1,50,000 / ₹45,000/mo"
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>
            </div>

            <!-- Row 4: Status, Start Date & Delivery Date -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Status
                    </label>
                    <select 
                        name="status" 
                        id="clientStatus" 
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Maintenance / AMC">Maintenance / AMC</option>
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Start Date
                    </label>
                    <input 
                        type="date" 
                        name="start_date" 
                        id="clientStartDate" 
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                        Delivery / Renewal
                    </label>
                    <input 
                        type="date" 
                        name="delivery_date" 
                        id="clientDeliveryDate" 
                        style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main);"
                    />
                </div>
            </div>

            <!-- Row 5: Notes / Deliverables -->
            <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                    Deliverables, Contract Scope & Key Notes
                </label>
                <textarea 
                    name="notes" 
                    id="clientNotes" 
                    rows="3" 
                    placeholder="Enter project deliverables, scope milestones, server credentials, or special client requests..."
                    style="width: 100%; padding: 0.65rem 0.875rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; color: var(--text-main); resize: vertical;"
                ></textarea>
            </div>

            <!-- Modal Action Buttons -->
            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; margin-top: 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
                <button 
                    type="button" 
                    onclick="closeClientModal()" 
                    style="padding: 0.65rem 1.25rem; border-radius: 0.65rem; border: 1px solid var(--border-medium); background: #ffffff; font-size: 0.8125rem; font-weight: 800; color: var(--text-muted); cursor: pointer;"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    class="gold-btn" 
                    id="modalSubmitBtn"
                    style="padding: 0.65rem 1.5rem; font-size: 0.8125rem; cursor: pointer;"
                >
                    Save Client Account
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function openClientModal() {
    document.getElementById('modalTitle').innerText = 'Add New Client';
    document.getElementById('modalSubmitBtn').innerText = 'Save Client Account';
    document.getElementById('clientId').value = '';
    document.getElementById('clientCompany').value = '';
    document.getElementById('clientPerson').value = '';
    document.getElementById('clientPhone').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('clientService').selectedIndex = 0;
    document.getElementById('clientValue').value = '';
    document.getElementById('clientStatus').value = 'Active';
    document.getElementById('clientStartDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('clientDeliveryDate').value = '';
    document.getElementById('clientNotes').value = '';

    const modal = document.getElementById('clientModal');
    modal.style.display = 'flex';
}

function editClientModal(client) {
    document.getElementById('modalTitle').innerText = 'Edit Client: ' + (client.company_name || 'Account');
    document.getElementById('modalSubmitBtn').innerText = 'Update Client Details';
    document.getElementById('clientId').value = client.id || '';
    document.getElementById('clientCompany').value = client.company_name || '';
    document.getElementById('clientPerson').value = client.contact_person || '';
    document.getElementById('clientPhone').value = client.phone || '';
    document.getElementById('clientEmail').value = client.email || '';
    document.getElementById('clientService').value = client.service_type || 'Web Development & High-Converting Websites';
    document.getElementById('clientValue').value = client.project_value || '';
    document.getElementById('clientStatus').value = client.status || 'Active';
    document.getElementById('clientStartDate').value = client.start_date || '';
    document.getElementById('clientDeliveryDate').value = client.delivery_date || '';
    document.getElementById('clientNotes').value = client.notes || '';

    const modal = document.getElementById('clientModal');
    modal.style.display = 'flex';
}

function closeClientModal() {
    document.getElementById('clientModal').style.display = 'none';
}

// Close on backdrop click
document.getElementById('clientModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeClientModal();
    }
});
</script>

<?php require_once __DIR__ . '/layout/footer.php'; ?>
