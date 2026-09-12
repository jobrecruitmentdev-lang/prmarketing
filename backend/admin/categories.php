<?php
/**
 * PR Marketing Ventures — Category Management Panel (Warm Cream & Light Brown)
 */
$pageTitle = "Categories Management";
require_once __DIR__ . '/layout/header.php';
require_once __DIR__ . '/layout/sidebar.php';

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../repositories/CategoryRepository.php';

$categoryRepo = new CategoryRepository();
$msg = '';
$error = '';

// Handle Category Save
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_category'])) {
    if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
        $error = "Security validation failed (Invalid CSRF token).";
    } else {
        $id = !empty($_POST['id']) ? (int)$_POST['id'] : null;
        $name = trim($_POST['name'] ?? '');
        $slug = trim($_POST['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
        $desc = trim($_POST['description'] ?? '');
        $order = (int)($_POST['sort_order'] ?? 0);

        if ($name) {
            try {
                if ($id) {
                    $categoryRepo->update($id, [
                        'name' => $name,
                        'slug' => $slug,
                        'description' => $desc,
                        'sort_order' => $order,
                    ]);
                    $msg = "Category '{$name}' updated successfully!";
                } else {
                    $categoryRepo->create([
                        'name' => $name,
                        'slug' => $slug,
                        'description' => $desc,
                        'sort_order' => $order,
                        'status' => 'Active'
                    ]);
                    $msg = "Category '{$name}' created successfully!";
                }
            } catch (Exception $e) {
                $error = "Error saving category: " . $e->getMessage();
            }
        }
    }
}

// Handle Category Delete with CSRF Token
if (isset($_GET['action']) && $_GET['action'] === 'delete' && !empty($_GET['id'])) {
    if (!validateCsrfToken($_GET['csrf'] ?? '')) {
        $error = "Security token mismatch. Delete category halted.";
    } else {
        try {
            $categoryRepo->delete((int)$_GET['id']);
            $msg = "Category deleted successfully!";
        } catch (Exception $e) {
            $error = "Error deleting category: " . $e->getMessage();
        }
    }
}

$categories = $categoryRepo->getAll();
?>

<?php if ($msg): ?>
    <div style="padding: 0.875rem 1rem; border-radius: 0.75rem; background: var(--emerald-bg); border: 1px solid var(--emerald-border); color: var(--emerald-text); font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
        <span>✓</span> <?= htmlspecialchars($msg) ?>
    </div>
<?php endif; ?>

<?php if ($error): ?>
    <div style="padding: 0.875rem 1rem; border-radius: 0.75rem; background: var(--red-bg); border: 1px solid var(--red-border); color: var(--red-text); font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem;">
        <span>⚠</span> <?= htmlspecialchars($error) ?>
    </div>
<?php endif; ?>

<div class="grid-3-2">
    
    <!-- Add / Edit Form Card -->
    <div>
        <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
                <h3 style="font-size: 1rem; font-weight: 900; color: var(--text-main); font-family: 'Space Grotesk', sans-serif;">Add PR Category</h3>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Create new strategic category for stories</p>
            </div>

            <form method="POST" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="hidden" name="save_category" value="1">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars(getCsrfToken()) ?>">
                
                <div>
                    <label style="display: block; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-main); margin-bottom: 0.375rem;">Category Name</label>
                    <input type="text" name="name" required placeholder="e.g. Venture Debt Dynamics" class="form-input">
                </div>

                <div>
                    <label style="display: block; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-main); margin-bottom: 0.375rem;">Slug (Optional)</label>
                    <input type="text" name="slug" placeholder="e.g. venture-debt-dynamics" class="form-input">
                </div>

                <div>
                    <label style="display: block; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-main); margin-bottom: 0.375rem;">Sort Order</label>
                    <input type="number" name="sort_order" value="0" class="form-input">
                </div>

                <div>
                    <label style="display: block; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-main); margin-bottom: 0.375rem;">Description</label>
                    <textarea name="description" rows="3" placeholder="Category strategic scope..." class="form-textarea"></textarea>
                </div>

                <button type="submit" class="brown-btn" style="width: 100%; padding: 0.85rem;">
                    + Add Category to Database
                </button>
            </form>
        </div>
    </div>

    <!-- Category List Table -->
    <div>
        <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <h3 style="font-size: 1rem; font-weight: 900; color: var(--text-main); font-family: 'Space Grotesk', sans-serif;">Active Categories</h3>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Total <?= count($categories) ?> categories in database</p>
                </div>
            </div>

            <div style="overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: 0.75rem;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Slug</th>
                            <th>Live Stories</th>
                            <th style="text-align: right;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($categories as $cat): ?>
                            <tr>
                                <td style="max-width: 200px;">
                                    <div style="font-weight: 800; color: var(--text-main); font-family: 'Space Grotesk', sans-serif; font-size: 0.8125rem;"><?= htmlspecialchars($cat['name']) ?></div>
                                    <div style="font-size: 0.6875rem; color: var(--text-muted); margin-top: 0.25rem;"><?= htmlspecialchars($cat['description'] ?? '') ?></div>
                                </td>
                                <td style="white-space: nowrap; color: var(--text-muted); font-family: monospace; font-size: 0.75rem;">
                                    <?= htmlspecialchars($cat['slug']) ?>
                                </td>
                                <td style="white-space: nowrap;">
                                    <span class="badge-brown">
                                        <?= $cat['post_count'] ?? 0 ?> stories
                                    </span>
                                </td>
                                <td style="text-align: right; white-space: nowrap;">
                                    <a href="/jaatumeinaaya/categories?action=delete&id=<?= $cat['id'] ?>&csrf=<?= urlencode(getCsrfToken()) ?>" onclick="return confirm('Are you sure you want to delete this category?');" class="cream-btn" style="color: var(--red-text); border-color: var(--red-border); padding: 0.35rem 0.65rem; font-size: 0.6875rem;">
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>

<?php
require_once __DIR__ . '/layout/footer.php';
