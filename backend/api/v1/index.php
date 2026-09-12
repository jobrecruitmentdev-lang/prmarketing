<?php
/**
 * REST API v1 Router & Controller Dispatcher
 * PR Marketing Ventures Enterprise Backend
 * Hardened CORS Whitelisting & Secure Write Authorization
 */

require_once __DIR__ . '/../../config/security.php';
applyHardenedCors();
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../repositories/CategoryRepository.php';
require_once __DIR__ . '/../../repositories/PostRepository.php';

$categoryRepo = new CategoryRepository();
$postRepo = new PostRepository();

// Extract URI path after /api/v1
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^.*/api/v1#', '', $uri);
$uri = '/' . trim($uri, '/');
$method = $_SERVER['REQUEST_METHOD'];

function jsonResponse(array $data, int $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: $_POST;
}

try {
    // ----------------------------------------------------
    // Health Check Endpoint (Public)
    // ----------------------------------------------------
    if ($uri === '/health' && $method === 'GET') {
        Database::getConnection();
        jsonResponse([
            'status' => 'healthy',
            'service' => 'PR Marketing Ventures API v1',
            'database' => 'connected',
            'timestamp' => date('c')
        ]);
    }

    // ----------------------------------------------------
    // CATEGORIES ENDPOINTS
    // ----------------------------------------------------
    // 1. List Categories: GET /api/v1/categories (Public)
    if ($uri === '/categories' && $method === 'GET') {
        $status = $_GET['status'] ?? 'Active';
        $categories = $categoryRepo->getAll($status);
        jsonResponse([
            'success' => true,
            'count' => count($categories),
            'data' => $categories
        ]);
    }

    // 2. Create Category: POST /api/v1/categories (Protected Write)
    if ($uri === '/categories' && $method === 'POST') {
        requireApiWriteAuth();
        $input = getJsonInput();
        if (empty($input['name'])) {
            jsonResponse(['success' => false, 'error' => 'Category name is required'], 400);
        }
        if (empty($input['slug'])) {
            $input['slug'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['name'])));
        }
        $created = $categoryRepo->create($input);
        jsonResponse(['success' => true, 'data' => $created], 201);
    }

    // 3. Update Category: PUT /api/v1/categories/{id} (Protected Write)
    if (preg_match('#^/categories/(\d+)$#', $uri, $m) && in_array($method, ['PUT', 'POST'])) {
        requireApiWriteAuth();
        $id = (int)$m[1];
        $input = getJsonInput();
        $updated = $categoryRepo->update($id, $input);
        jsonResponse(['success' => true, 'data' => $updated]);
    }

    // 4. Delete Category: DELETE /api/v1/categories/{id} (Protected Write)
    if (preg_match('#^/categories/(\d+)$#', $uri, $m) && $method === 'DELETE') {
        requireApiWriteAuth();
        $id = (int)$m[1];
        $deleted = $categoryRepo->delete($id);
        jsonResponse(['success' => $deleted]);
    }

    // ----------------------------------------------------
    // POSTS ENDPOINTS
    // ----------------------------------------------------
    // 5. List Posts: GET /api/v1/posts (Public for Frontend & Visitors)
    if ($uri === '/posts' && $method === 'GET') {
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
        $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
        $catId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
        $status = $_GET['status'] ?? 'Published';
        $search = $_GET['search'] ?? null;

        $posts = $postRepo->getAll($limit, $offset, $catId, $status, $search);
        jsonResponse([
            'success' => true,
            'count' => count($posts),
            'limit' => $limit,
            'offset' => $offset,
            'data' => $posts
        ]);
    }

    // 6. Get Single Post: GET /api/v1/posts/{slug} (Public)
    if (preg_match('#^/posts/([a-zA-Z0-9_-]+)$#', $uri, $m) && $method === 'GET') {
        $slug = $m[1];
        $post = $postRepo->getBySlug($slug);
        if (!$post) {
            jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
        }
        jsonResponse(['success' => true, 'data' => $post]);
    }

    // 7. Create Post: POST /api/v1/posts (Protected Write)
    if ($uri === '/posts' && $method === 'POST') {
        requireApiWriteAuth();
        $input = getJsonInput();
        if (empty($input['title'])) {
            jsonResponse(['success' => false, 'error' => 'Post title is required'], 400);
        }
        if (empty($input['slug'])) {
            $input['slug'] = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['title'])));
        }

        // Auto-match category by name if category_id not provided
        if (empty($input['category_id']) && !empty($input['category_name'])) {
            $cat = $categoryRepo->getBySlug(strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['category_name']))));
            if ($cat) {
                $input['category_id'] = $cat['id'];
            }
        }

        $created = $postRepo->create($input);
        jsonResponse(['success' => true, 'data' => $created], 201);
    }

    // 8. Delete Post: DELETE /api/v1/posts/{id} (Protected Write)
    if (preg_match('#^/posts/([a-zA-Z0-9_-]+)$#', $uri, $m) && $method === 'DELETE') {
        requireApiWriteAuth();
        $id = $m[1];
        $deleted = $postRepo->delete($id);
        jsonResponse(['success' => $deleted]);
    }

    // 404 Route Not Found
    jsonResponse(['success' => false, 'error' => 'API Route not found: ' . $method . ' ' . $uri], 404);

} catch (Exception $e) {
    jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
}

