<?php
/**
 * Database Configuration & PDO Connection Manager
 * PR Marketing Ventures Enterprise Backend
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $db   = getenv('DB_DATABASE') ?: 'prmarketing_cms';
            $user = getenv('DB_USERNAME') ?: 'root';
            $pass = getenv('DB_PASSWORD') ?: '';
            $charset = 'utf8mb4';

            // Check if running on Hostinger or custom config file
            if (file_exists(__DIR__ . '/config.local.php')) {
                $localConfig = require __DIR__ . '/config.local.php';
                $host = $localConfig['db_host'] ?? $host;
                $db   = $localConfig['db_name'] ?? $db;
                $user = $localConfig['db_user'] ?? $user;
                $pass = $localConfig['db_pass'] ?? $pass;
                $port = $localConfig['db_port'] ?? $port;
            }

            $dsn = "mysql:host={$host};port={$port};dbname={$db};charset={$charset}";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // If Hostinger credentials fail on local dev machine, fallback to local XAMPP MySQL
                if (($e->getCode() == 1045 || $e->getCode() == 2002) && ($host === 'localhost' || $host === '127.0.0.1')) {
                    try {
                        $localDsn = "mysql:host=127.0.0.1;port=3306;dbname=jobrecruitment_crm;charset={$charset}";
                        self::$instance = new PDO($localDsn, 'root', '', $options);
                        return self::$instance;
                    } catch (PDOException $e2) {
                        try {
                            $localDsn = "mysql:host=127.0.0.1;port=3306;dbname=prmarketing_cms;charset={$charset}";
                            self::$instance = new PDO($localDsn, 'root', '', $options);
                            return self::$instance;
                        } catch (PDOException $e3) {}
                    }
                }

                // If database doesn't exist yet, connect to server and create it
                if ($e->getCode() == 1049) {
                    $initDsn = "mysql:host={$host};port={$port};charset={$charset}";
                    $tempPdo = new PDO($initDsn, $user, $pass, $options);
                    $tempPdo->exec("CREATE DATABASE IF NOT EXISTS `{$db}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    self::$instance = new PDO($dsn, $user, $pass, $options);
                } else {
                    throw new Exception("Database Connection Failed: " . $e->getMessage());
                }
            }
        }

        return self::$instance;
    }
}
