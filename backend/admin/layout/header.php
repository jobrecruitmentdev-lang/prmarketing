<?php
/**
 * PR Marketing Ventures — Admin Header (Warm Cream & Light Brown Luxury Palette)
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../auth_middleware.php';
$currentUser = requireAdminAuth();

$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle ?? 'Control Center' ?> | PR Marketing Ventures Admin</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
    
    <style>
        /* ==============================================================================
           WARM CREAM & LIGHT BROWN LUXURY PALETTE (ZERO OVERLAP & OPTIMAL CONTRAST)
           ============================================================================== */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
            --bg-main: #faf7f2;
            --bg-sidebar: #f3ece1;
            --bg-sidebar-active: #e6dac8;
            --bg-card: #ffffff;
            --bg-subtle: #f8f4ee;
            --border-subtle: #e8dfd3;
            --border-medium: #d6c7b5;
            --border-accent: #b5987e;
            
            --brown-primary: #8c5835;
            --brown-hover: #754423;
            --brown-dark: #4a2d18;
            --brown-light: #dcc8b4;
            
            --text-main: #241810;
            --text-muted: #6e5b4f;
            --text-dim: #9c8778;
            
            --emerald-bg: #eafaf1;
            --emerald-text: #065f46;
            --emerald-border: #a7f3d0;
            
            --red-bg: #fef2f2;
            --red-text: #991b1b;
            --red-border: #fecaca;
        }

        html, body {
            min-height: 100vh;
            width: 100%;
            background-color: var(--bg-main);
            color: var(--text-main);
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow-x: hidden;
            display: flex;
            -webkit-font-smoothing: antialiased;
        }

        a { color: inherit; text-decoration: none; }

        /* Strict SVG dimensions */
        svg {
            display: inline-block !important;
            width: 1.15rem !important;
            height: 1.15rem !important;
            max-width: 1.15rem !important;
            max-height: 1.15rem !important;
            flex-shrink: 0 !important;
            vertical-align: middle;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: #faf7f2; }
        ::-webkit-scrollbar-thumb { background: #d6c7b5; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #b5987e; }

        .font-heading { font-family: 'Space Grotesk', sans-serif; }

        /* Layout Structure */
        .sidebar {
            width: 16.5rem;
            min-width: 16.5rem;
            background-color: var(--bg-sidebar);
            border-right: 1px solid var(--border-subtle);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-shrink: 0;
            height: 100vh;
            position: sticky;
            top: 0;
            overflow-y: auto;
            z-index: 30;
            transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            width: calc(100% - 16.5rem);
            max-width: calc(100% - 16.5rem);
            overflow-x: hidden;
            background-color: var(--bg-main);
            transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Collapsed Sidebar State (Full Screen Fit) */
        body.sidebar-collapsed .sidebar {
            margin-left: -16.5rem;
            opacity: 0;
            pointer-events: none;
        }

        body.sidebar-collapsed .main-wrapper {
            width: 100%;
            max-width: 100%;
        }

        .topbar {
            height: 4.5rem;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            padding: 0 1.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
            position: sticky;
            top: 0;
            z-index: 20;
        }

        .content-body {
            flex: 1;
            padding: 1.5rem 1.75rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            box-sizing: border-box;
        }
            max-width: 100%;
            overflow-x: hidden;
        }

        /* Cream & Light Brown Cards */
        .glass-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 1.25rem;
            padding: 1.75rem;
            box-shadow: 0 4px 20px rgba(80, 50, 20, 0.04);
            transition: all 0.2s ease;
        }
        .glass-card:hover {
            border-color: var(--border-medium);
            box-shadow: 0 6px 25px rgba(80, 50, 20, 0.07);
        }

        /* Buttons */
        .gold-btn, .brown-btn {
            background: linear-gradient(135deg, #a0683b 0%, #7d4a22 100%);
            color: #ffffff;
            font-weight: 800;
            border-radius: 0.75rem;
            padding: 0.65rem 1.25rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            text-decoration: none;
            font-size: 0.8125rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(140, 88, 53, 0.25);
            transition: all 0.2s;
        }
        .gold-btn:hover, .brown-btn:hover {
            background: linear-gradient(135deg, #8f582e 0%, #683a15 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(140, 88, 53, 0.35);
        }

        .dark-btn, .cream-btn {
            background: #ffffff;
            color: var(--text-main);
            border: 1px solid var(--border-medium);
            font-weight: 700;
            border-radius: 0.75rem;
            padding: 0.6rem 1.15rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            font-size: 0.8125rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .dark-btn:hover, .cream-btn:hover {
            background: #f5ede2;
            color: var(--brown-primary);
            border-color: var(--brown-primary);
        }

        /* Form Inputs */
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.85rem 1.125rem;
            background-color: #ffffff;
            border: 1px solid var(--border-medium);
            border-radius: 0.75rem;
            color: var(--text-main);
            font-size: 0.875rem;
            font-family: inherit;
            outline: none;
            transition: all 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            border-color: var(--brown-primary);
            box-shadow: 0 0 0 3px rgba(140, 88, 53, 0.12);
        }

        /* Fluid Table (Zero Horizontal Scroll) */
        .admin-table-container {
            background: #ffffff;
            border: 1px solid var(--border-subtle);
            border-radius: 1rem;
            overflow: hidden;
            width: 100%;
            box-shadow: 0 4px 20px rgba(80, 50, 20, 0.03);
        }
        .admin-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            text-align: left;
            font-size: 0.8125rem;
        }
        .admin-table th {
            background-color: #f7f1e7;
            padding: 0.875rem 1rem;
            font-weight: 800;
            color: var(--brown-dark);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-size: 0.7rem;
            border-bottom: 1px solid var(--border-medium);
        }
        .admin-table td {
            padding: 1rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            color: var(--text-main);
            vertical-align: middle;
        }
        .admin-table tbody tr {
            transition: background-color 0.15s ease;
        }
        .admin-table tbody tr:hover {
            background-color: #faf6f0;
        }
        .admin-table tbody tr:last-child td {
            border-bottom: none;
        }

        /* Status Badges */
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.3rem 0.65rem;
            border-radius: 9999px;
            font-size: 0.6875rem;
            font-weight: 800;
            letter-spacing: 0.02em;
            white-space: nowrap;
        }
        .status-new {
            background: #e0f2fe;
            color: #0369a1;
            border: 1px solid #bae6fd;
        }
        .status-discussion {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
        }
        .status-followup {
            background: #fae8ff;
            color: #86198f;
            border: 1px solid #f5d0fe;
        }
        .status-converted {
            background: #dcfce7;
            color: #15803d;
            border: 1px solid #bbf7d0;
        }

        /* Grids */
        .grid-4 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.25rem;
        }
        .grid-3-2 {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.75rem;
        }
        @media (max-width: 1024px) {
            .sidebar { display: none; }
            .main-wrapper { width: 100%; max-width: 100%; }
            .grid-3-2 { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body id="adminBody">
<script>
    if (localStorage.getItem('pr_admin_sidebar_collapsed') === 'true') {
        document.body.classList.add('sidebar-collapsed');
    }
</script>