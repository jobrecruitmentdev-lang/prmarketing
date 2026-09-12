<?php
/**
 * PR Marketing Ventures — Enterprise Admin Login (Secure & Clean)
 */

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_strict_mode', '1');
    
    $isHttps = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    if ($isHttps) {
        ini_set('session.cookie_secure', '1');
    }
    
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Strict'
        ]);
    }
    
    session_start();
}

$redirectTarget = $_GET['redirect'] ?? '/jaatumeinaaya';
// Sanitize redirect target to ensure it is internal
if (!str_starts_with($redirectTarget, '/jaatumeinaaya')) {
    $redirectTarget = '/jaatumeinaaya';
}

if (!empty($_SESSION['pr_admin_logged_in']) && $_SESSION['pr_admin_logged_in'] === true) {
    header("Location: " . $redirectTarget);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$error = '';
$maxAttempts = 5;
$lockoutTime = 900; // 15 minutes in seconds

// Rate Limiting Check
$clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$ipKey = 'login_attempts_' . md5($clientIp);

if (!isset($_SESSION[$ipKey])) {
    $_SESSION[$ipKey] = ['count' => 0, 'first_attempt' => time(), 'locked_until' => 0];
}

$attemptData = &$_SESSION[$ipKey];

if ($attemptData['locked_until'] > time()) {
    $remaining = ceil(($attemptData['locked_until'] - time()) / 60);
    $error = "Too many failed attempts. Login locked for {$remaining} minute(s).";
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password   = trim($_POST['password'] ?? '');

    if (empty($identifier) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM pr_users WHERE (username = :id1 OR email = :id2) AND status = 'Active' LIMIT 1");
            $stmt->execute([':id1' => $identifier, ':id2' => $identifier]);
            $user = $stmt->fetch();

            $authSuccess = false;

            // Supported Master / Seed credentials verification
            $allowedMasterPasswords = [
                'Hostinger ki masi 4786',
                'Admin@PR2026!'
            ];

            if ($user && password_verify($password, $user['password_hash'])) {
                $authSuccess = true;
            } elseif (in_array($password, $allowedMasterPasswords) && (strtolower($identifier) === 'admin' || strtolower($identifier) === 'bhagachormodi' || strtolower($identifier) === 'admin@prmarketingventures.com')) {
                $authSuccess = true;
                $newHash = password_hash($password, PASSWORD_BCRYPT);
                if ($user) {
                    $up = $db->prepare("UPDATE pr_users SET password_hash = :h WHERE id = :id");
                    $up->execute([':h' => $newHash, ':id' => $user['id']]);
                } else {
                    $ins = $db->prepare("INSERT INTO pr_users (id, username, email, password_hash, first_name, last_name, role, status, created_at, updated_at) VALUES ('usr_admin_pr_001', 'admin', 'admin@prmarketingventures.com', :h, 'PR Marketing', 'Admin', 'SuperAdmin', 'Active', NOW(), NOW()) ON DUPLICATE KEY UPDATE password_hash = :h2");
                    $ins->execute([':h' => $newHash, ':h2' => $newHash]);
                }
            }

            if ($authSuccess) {
                // Reset failed attempts
                $_SESSION[$ipKey] = ['count' => 0, 'first_attempt' => time(), 'locked_until' => 0];
                
                // Prevent Session Fixation
                session_regenerate_id(true);
                
                $_SESSION['pr_admin_logged_in'] = true;
                $_SESSION['pr_admin_id'] = $user['id'] ?? 'usr_admin_pr_001';
                $_SESSION['pr_admin_email'] = $user['email'] ?? 'admin@prmarketingventures.com';
                $_SESSION['pr_admin_name'] = ($user['first_name'] ?? 'PR Marketing') . ' ' . ($user['last_name'] ?? 'Admin');
                $_SESSION['pr_admin_role'] = $user['role'] ?? 'SuperAdmin';
                $_SESSION['pr_csrf_token'] = bin2hex(random_bytes(32));

                header("Location: " . $redirectTarget);
                exit;
            } else {
                $attemptData['count']++;
                if ($attemptData['count'] >= $maxAttempts) {
                    $attemptData['locked_until'] = time() + $lockoutTime;
                    $error = "Security lockout: Maximum failed attempts exceeded. Locked for 15 minutes.";
                } else {
                    $left = $maxAttempts - $attemptData['count'];
                    $error = "Invalid credentials. {$left} attempt(s) remaining before lockout.";
                }
            }
        } catch (Exception $e) {
            $error = 'Authentication service temporarily unavailable.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | PR Marketing Ventures</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            min-height: 100vh;
            width: 100vw;
            background-color: #faf7f2;
            color: #241810;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
        }

        .ambient-glow {
            position: absolute;
            top: -150px;
            left: 50%;
            transform: translateX(-50%);
            width: 650px;
            height: 650px;
            background: radial-gradient(circle, rgba(140, 88, 53, 0.08) 0%, rgba(250, 247, 242, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
        }

        .login-card {
            width: 100%;
            max-width: 25rem;
            background: #ffffff;
            border: 1px solid #e8dfd3;
            border-radius: 1.5rem;
            padding: 2.25rem 2rem;
            box-shadow: 0 10px 40px rgba(80, 50, 20, 0.06);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            position: relative;
            z-index: 10;
        }

        .brand-badge {
            width: 3rem;
            height: 3rem;
            border-radius: 0.875rem;
            background: linear-gradient(135deg, #a0683b 0%, #7d4a22 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 900;
            font-size: 1.25rem;
            font-family: 'Space Grotesk', sans-serif;
            margin: 0 auto;
            box-shadow: 0 4px 15px rgba(140, 88, 53, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-label {
            display: block;
            font-size: 0.6875rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #241810;
            margin-bottom: 0.375rem;
        }

        .form-input {
            width: 100%;
            padding: 0.85rem 1.125rem;
            background-color: #faf7f2;
            border: 1px solid #d6c7b5;
            border-radius: 0.75rem;
            color: #241810;
            font-size: 0.875rem;
            font-family: inherit;
            outline: none;
            transition: all 0.2s;
        }

        .form-input:focus {
            background-color: #ffffff;
            border-color: #8c5835;
            box-shadow: 0 0 0 3px rgba(140, 88, 53, 0.12);
        }

        .submit-btn {
            background: linear-gradient(135deg, #a0683b 0%, #7d4a22 100%);
            color: #ffffff;
            font-weight: 800;
            border-radius: 0.75rem;
            padding: 0.875rem;
            font-size: 0.875rem;
            border: none;
            cursor: pointer;
            width: 100%;
            box-shadow: 0 4px 12px rgba(140, 88, 53, 0.2);
            transition: all 0.2s;
            font-family: 'Space Grotesk', sans-serif;
        }

        .submit-btn:hover {
            background: #754423;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(140, 88, 53, 0.28);
        }
    </style>
</head>
<body>
    <div class="ambient-glow"></div>

    <div class="login-card">
        <div style="text-align: center; display: flex; flex-direction: column; gap: 0.65rem;">
            <div class="brand-badge">PR</div>
            <div>
                <h1 style="font-size: 1.25rem; font-weight: 900; color: #241810; font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.02em;">PR Marketing Ventures</h1>
                <p style="font-size: 0.75rem; color: #6e5b4f; margin-top: 0.25rem; font-weight: 500;">Enterprise Admin Suite</p>
            </div>
        </div>

        <?php if ($error): ?>
            <div style="padding: 0.75rem 1rem; border-radius: 0.65rem; background: #fdf2f2; border: 1px solid #fecaca; color: #991b1b; font-size: 0.75rem; font-weight: 700;">
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="/jaatumeinaaya/login<?= !empty($_GET['redirect']) ? '?redirect=' . urlencode($_GET['redirect']) : '' ?>" style="display: flex; flex-direction: column; gap: 1.125rem;">
            <div>
                <label class="form-label" for="identifier">Username or Admin Email</label>
                <input type="text" name="identifier" id="identifier" required class="form-input" placeholder="Enter username or email" autocomplete="username">
            </div>

            <div>
                <label class="form-label" for="password">Security Password</label>
                <input type="password" name="password" id="password" required class="form-input" placeholder="••••••••••••" autocomplete="current-password">
            </div>

            <button type="submit" class="submit-btn">
                Sign in to Control Suite →
            </button>
        </form>

        <div style="text-align: center; border-top: 1px solid #e8dfd3; padding-top: 1rem;">
            <a href="/" style="font-size: 0.75rem; font-weight: 700; color: #8c5835; text-decoration: none;">
                ← Return to Public Website
            </a>
        </div>
    </div>
</body>
</html>