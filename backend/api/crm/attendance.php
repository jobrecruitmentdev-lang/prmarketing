<?php
/**
 * Attendance & Roster Controller
 */

require_once __DIR__ . '/helpers.php';

function handleAttendanceRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    $adminId = getAdminId($user);

    // 0a. GET /my-status (Employee self-status for Logout Confirmation Modal)
    if ($subpath === '/my-status' && $method === 'GET') {
        date_default_timezone_set('Asia/Kolkata');
        $today = date('Y-m-d');
        $now = date('H:i:s');

        $empStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ? AND admin_id = ? AND status = 'active' LIMIT 1");
        $empStmt->execute([$user['id'], $user['admin_id'] ?? $adminId]);
        $emp = $empStmt->fetch();

        if (!$emp) {
            jsonResponse([
                'success' => true,
                'is_employee' => false,
                'attendance' => null
            ]);
        }

        $empId = (int)$emp['id'];

        // Find today's attendance record or unclosed shift within 18 hours
        $attStmt = $pdo->prepare("
            SELECT id, date, check_in_time, check_out_time, status, remarks 
            FROM crm_attendance_records 
            WHERE employee_id = ? AND admin_id = ? AND (date = ? OR (check_out_time IS NULL AND created_at >= NOW() - INTERVAL 18 HOUR))
            ORDER BY date DESC, id DESC LIMIT 1
        ");
        $attStmt->execute([$empId, $adminId, $today]);
        $record = $attStmt->fetch();

        $calcDuration = function(?string $inTime, ?string $outTime): string {
            if (!$inTime) return '0 hrs 0 mins';
            $inSec = strtotime("1970-01-01 {$inTime}");
            $outSec = $outTime ? strtotime("1970-01-01 {$outTime}") : strtotime("1970-01-01 " . date('H:i:s'));
            $diffMin = max(0, (int)(($outSec - $inSec) / 60));
            $hrs = floor($diffMin / 60);
            $mins = $diffMin % 60;
            return "{$hrs} hrs {$mins} mins";
        };

        if ($record) {
            $isCheckedOut = !empty($record['check_out_time']);
            $duration = $calcDuration($record['check_in_time'], $record['check_out_time']);

            jsonResponse([
                'success' => true,
                'is_employee' => true,
                'current_server_time' => $now,
                'current_date' => $today,
                'attendance' => [
                    'id' => (int)$record['id'],
                    'date' => $record['date'],
                    'check_in_time' => $record['check_in_time'],
                    'check_out_time' => $record['check_out_time'],
                    'status' => $record['status'],
                    'is_checked_in' => !empty($record['check_in_time']),
                    'is_checked_out' => $isCheckedOut,
                    'working_duration' => $duration
                ]
            ]);
        } else {
            jsonResponse([
                'success' => true,
                'is_employee' => true,
                'current_server_time' => $now,
                'current_date' => $today,
                'attendance' => [
                    'date' => $today,
                    'check_in_time' => null,
                    'check_out_time' => null,
                    'status' => 'not_checked_in',
                    'is_checked_in' => false,
                    'is_checked_out' => false,
                    'working_duration' => '0 hrs 0 mins'
                ]
            ]);
        }
    }

    // 0b. POST /checkout (Employee Shift Checkout confirmation)
    if ($subpath === '/checkout' && $method === 'POST') {
        date_default_timezone_set('Asia/Kolkata');
        $today = date('Y-m-d');
        $now = date('H:i:s');

        $empStmt = $pdo->prepare("SELECT id FROM crm_employees WHERE user_id = ? AND admin_id = ? AND status = 'active' LIMIT 1");
        $empStmt->execute([$user['id'], $user['admin_id'] ?? $adminId]);
        $emp = $empStmt->fetch();

        if (!$emp) {
            jsonResponse(['success' => false, 'error' => 'Active employee record not found for this user'], 404);
        }

        $empId = (int)$emp['id'];

        // Find open record (check_out_time IS NULL) for today or recent unclosed shift
        $findStmt = $pdo->prepare("
            SELECT id, date, check_in_time, check_out_time 
            FROM crm_attendance_records 
            WHERE employee_id = ? AND admin_id = ? AND check_out_time IS NULL
            ORDER BY date DESC, id DESC LIMIT 1
        ");
        $findStmt->execute([$empId, $adminId]);
        $openRec = $findStmt->fetch();

        if ($openRec) {
            $upd = $pdo->prepare("
                UPDATE crm_attendance_records 
                SET check_out_time = ?, status = 'present', updated_at = CURRENT_TIMESTAMP
                WHERE id = ? AND check_out_time IS NULL
            ");
            $upd->execute([$now, $openRec['id']]);

            // Auto-check if all required employees for this company have checked out
            checkAndSendDailyCompletionEmail($pdo, $adminId, $openRec['date']);

            jsonResponse([
                'success' => true,
                'message' => 'Shift checkout recorded successfully',
                'check_in_time' => $openRec['check_in_time'],
                'check_out_time' => $now,
                'date' => $openRec['date']
            ]);
        } else {
            // Already checked out or no check-in
            $lastStmt = $pdo->prepare("
                SELECT check_in_time, check_out_time, date 
                FROM crm_attendance_records 
                WHERE employee_id = ? AND admin_id = ? AND date = ? 
                LIMIT 1
            ");
            $lastStmt->execute([$empId, $adminId, $today]);
            $already = $lastStmt->fetch();

            if ($already && !empty($already['check_out_time'])) {
                jsonResponse([
                    'success' => true,
                    'message' => 'Shift already checked out previously',
                    'check_in_time' => $already['check_in_time'],
                    'check_out_time' => $already['check_out_time'],
                    'already_checked_out' => true
                ]);
            }

            // Create check-in and check-out together if somehow check-in was missed
            $insBoth = $pdo->prepare("
                INSERT INTO crm_attendance_records (admin_id, employee_id, date, status, check_in_time, check_out_time)
                VALUES (?, ?, ?, 'present', ?, ?)
                ON DUPLICATE KEY UPDATE check_out_time = VALUES(check_out_time), updated_at = CURRENT_TIMESTAMP
            ");
            $insBoth->execute([$adminId, $empId, $today, $now, $now]);

            checkAndSendDailyCompletionEmail($pdo, $adminId, $today);

            jsonResponse([
                'success' => true,
                'message' => 'Shift checkout recorded successfully',
                'check_out_time' => $now,
                'date' => $today
            ]);
        }
    }

    // 0c. POST /trigger-daily-email (Admin manual trigger to send report to jobrecruitment.in@gmail.com)
    if ($subpath === '/trigger-daily-email' && $method === 'POST') {
        requireRole(['admin', 'master']);
        $body = getJsonInput();
        $targetDate = $body['date'] ?? date('Y-m-d');
        $recipient = $body['recipient'] ?? 'jobrecruitment.in@gmail.com';

        $sent = sendDailyAttendanceEmail($pdo, $adminId, $targetDate, $recipient);

        if ($sent) {
            jsonResponse([
                'success' => true,
                'message' => "Daily attendance completion report sent successfully to {$recipient}."
            ]);
        } else {
            jsonResponse([
                'success' => false,
                'error' => "Failed to dispatch email. Server mailer reported an issue."
            ], 500);
        }
    }

    // 1. GET /records
    if ($subpath === '/records' && $method === 'GET') {
        $date = $_GET['date'] ?? date('Y-m-d');

        $stmt = $pdo->prepare("
            SELECT 
                e.id as employee_id,
                e.employee_code,
                e.designation,
                e.department,
                u.name as employee_name,
                ar.id as attendance_id,
                ar.date,
                ar.check_in_time,
                ar.check_out_time,
                COALESCE(ar.status, 'unmarked') as status,
                ar.remarks
            FROM crm_employees e
            JOIN crm_users u ON e.user_id = u.id
            LEFT JOIN crm_attendance_records ar ON ar.employee_id = e.id AND ar.date = ?
            WHERE e.admin_id = ? AND e.status = 'active'
            ORDER BY u.name ASC
        ");
        $stmt->execute([$date, $adminId]);
        $records = $stmt->fetchAll();

        jsonResponse([
            'success' => true,
            'date' => $date,
            'data' => $records
        ]);
    }

    // 2. GET /summary
    if ($subpath === '/summary' && $method === 'GET') {
        $month = $_GET['month'] ?? date('Y-m');

        $stmt = $pdo->prepare("
            SELECT status, COUNT(*) as count
            FROM crm_attendance_records
            WHERE admin_id = ? AND date LIKE ?
            GROUP BY status
        ");
        $stmt->execute([$adminId, "{$month}%"]);
        $stats = $stmt->fetchAll();

        $tStmt = $pdo->prepare("SELECT COUNT(*) FROM crm_employees WHERE admin_id = ? AND status = 'active'");
        $tStmt->execute([$adminId]);
        $totalActive = (int)$tStmt->fetchColumn();

        $counts = [];
        foreach ($stats as $row) {
            $counts[$row['status']] = (int)$row['count'];
        }

        jsonResponse([
            'success' => true,
            'month' => $month,
            'total_employees' => $totalActive,
            'status_counts' => $counts
        ]);
    }

    // 3. POST /mark
    if ($subpath === '/mark' && $method === 'POST') {
        $body = getJsonInput();
        $employeeId = (int)($body['employee_id'] ?? 0);
        $status = trim(strtolower($body['status'] ?? ''));
        $date = trim($body['date'] ?? date('Y-m-d'));
        $checkIn = trim($body['check_in_time'] ?? '09:30:00');
        $checkOut = trim($body['check_out_time'] ?? '18:30:00');
        $remarks = trim($body['remarks'] ?? '');

        if (!$employeeId || !$status) {
            jsonResponse(['success' => false, 'error' => 'Employee ID and status are required'], 400);
        }

        $validStatuses = ['present', 'absent', 'half-day', 'leave', 'wfh'];
        if (!in_array($status, $validStatuses)) {
            jsonResponse(['success' => false, 'error' => 'Invalid status'], 400);
        }

        $stmt = $pdo->prepare("
            INSERT INTO crm_attendance_records (admin_id, employee_id, date, check_in_time, check_out_time, status, marked_by, remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                status = VALUES(status),
                check_in_time = VALUES(check_in_time),
                check_out_time = VALUES(check_out_time),
                marked_by = VALUES(marked_by),
                remarks = VALUES(remarks)
        ");
        $stmt->execute([
            $adminId,
            $employeeId,
            $date,
            $checkIn ?: '09:30:00',
            $checkOut ?: '18:30:00',
            $status,
            $user['id'],
            $remarks ?: null
        ]);

        jsonResponse([
            'success' => true,
            'message' => "Attendance marked as {$status} for employee #{$employeeId}"
        ]);
    }

    // 4. PUT /records/:id
    if (preg_match('#^/records/(\d+)$#', $subpath, $matches) && in_array($method, ['PUT', 'POST'])) {
        $id = (int)$matches[1];
        $body = getJsonInput();
        $status = $body['status'] ?? null;
        $checkIn = $body['check_in_time'] ?? null;
        $checkOut = $body['check_out_time'] ?? null;
        $remarks = $body['remarks'] ?? null;

        $stmt = $pdo->prepare("
            UPDATE crm_attendance_records SET
                status = COALESCE(?, status),
                check_in_time = COALESCE(?, check_in_time),
                check_out_time = COALESCE(?, check_out_time),
                remarks = COALESCE(?, remarks)
            WHERE id = ? AND admin_id = ?
        ");
        $stmt->execute([$status, $checkIn, $checkOut, $remarks, $id, $adminId]);

        jsonResponse(['success' => true, 'message' => 'Attendance record updated successfully']);
    }

    // 5. DELETE /records/:id
    if (preg_match('#^/records/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $id = (int)$matches[1];
        $stmt = $pdo->prepare("DELETE FROM crm_attendance_records WHERE id = ? AND admin_id = ?");
        $stmt->execute([$id, $adminId]);
        jsonResponse(['success' => true, 'message' => 'Attendance record removed']);
    }

    // 6. POST /employees (Direct from Attendance Desk)
    if ($subpath === '/employees' && $method === 'POST') {
        $body = getJsonInput();
        $name = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $designation = trim($body['designation'] ?? 'Staff');
        $department = trim($body['department'] ?? 'Operations');
        $employeeCode = trim($body['employee_code'] ?? '');
        $salary = (float)($body['salary'] ?? 0);
        $joiningDate = trim($body['joining_date'] ?? date('Y-m-d'));
        $initialStatus = trim($body['initial_status'] ?? 'present');
        $targetDate = trim($body['date'] ?? date('Y-m-d'));
        $checkIn = trim($body['check_in_time'] ?? '09:30:00');
        $checkOut = trim($body['check_out_time'] ?? '18:30:00');
        $remarks = trim($body['remarks'] ?? 'Registered via Attendance Desk');

        if (!$name) {
            jsonResponse(['success' => false, 'error' => 'Employee name is required'], 400);
        }

        $empEmail = $email ? strtolower($email) : ('emp_' . substr((string)time(), -6) . '@tenant.local');

        $pdo->beginTransaction();
        try {
            $chk = $pdo->prepare("SELECT id FROM crm_users WHERE email = ?");
            $chk->execute([$empEmail]);
            if ($chk->fetch()) {
                $pdo->rollBack();
                jsonResponse(['success' => false, 'error' => 'An employee with this email already exists'], 409);
            }

            $pwdHash = password_hash(bin2hex(random_bytes(16)), PASSWORD_DEFAULT);
            $uStmt = $pdo->prepare("
                INSERT INTO crm_users (name, email, phone, password_hash, role, admin_id, status)
                VALUES (?, ?, ?, ?, 'employee', ?, 'active')
            ");
            $uStmt->execute([$name, $empEmail, $phone ?: null, $pwdHash, $adminId]);
            $userId = (int)$pdo->lastInsertId();

            $empCode = $employeeCode ?: ('EMP-' . rand(1000, 9999));
            $eStmt = $pdo->prepare("
                INSERT INTO crm_employees (user_id, admin_id, employee_code, designation, department, salary, joining_date, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
            ");
            $eStmt->execute([$userId, $adminId, $empCode, $designation, $department, $salary, $joiningDate]);
            $employeeId = (int)$pdo->lastInsertId();

            $attStmt = $pdo->prepare("
                INSERT INTO crm_attendance_records (employee_id, admin_id, date, status, check_in_time, check_out_time, remarks)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE status = VALUES(status), check_in_time = VALUES(check_in_time), check_out_time = VALUES(check_out_time), remarks = VALUES(remarks)
            ");
            $attStmt->execute([$employeeId, $adminId, $targetDate, $initialStatus, $checkIn, $checkOut, $remarks]);

            $pdo->commit();

            jsonResponse([
                'success' => true,
                'message' => 'Employee added to roster successfully',
                'data' => [
                    'id' => $employeeId,
                    'user_id' => $userId,
                    'name' => $name,
                    'email' => $empEmail,
                    'employee_code' => $empCode,
                    'designation' => $designation,
                    'department' => $department,
                    'initial_status' => $initialStatus
                ]
            ], 201);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    // 7. DELETE /employees/:id
    if (preg_match('#^/employees/(\d+)$#', $subpath, $matches) && $method === 'DELETE') {
        $employeeId = (int)$matches[1];
        $eStmt = $pdo->prepare("SELECT user_id FROM crm_employees WHERE id = ? AND admin_id = ?");
        $eStmt->execute([$employeeId, $adminId]);
        $emp = $eStmt->fetch();
        if (!$emp) {
            jsonResponse(['success' => false, 'error' => 'Employee not found'], 404);
        }

        $pdo->prepare("UPDATE crm_employees SET status = 'inactive' WHERE id = ? AND admin_id = ?")->execute([$employeeId, $adminId]);
        if (!empty($emp['user_id'])) {
            $pdo->prepare("UPDATE crm_users SET status = 'inactive' WHERE id = ?")->execute([$emp['user_id']]);
        }

        jsonResponse(['success' => true, 'message' => 'Employee removed from active roster']);
    }

    // 8. GET /export (CSV & JSON format)
    if (in_array($subpath, ['/export', '/export/excel']) && $method === 'GET') {
        $startDate = $_GET['start_date'] ?? date('Y-m-d');
        $endDate = $_GET['end_date'] ?? $startDate;
        if ($startDate > $endDate) {
            $tmp = $startDate;
            $startDate = $endDate;
            $endDate = $tmp;
        }

        $exportType = $_GET['export_type'] ?? 'combo';
        $format = $_GET['format'] ?? 'csv';
        $empIdsParam = $_GET['employee_ids'] ?? 'all';

        // 1. Build sequential date list
        $dateList = [];
        $startTs = strtotime($startDate);
        $endTs = strtotime($endDate);

        for ($curr = $startTs; $curr <= $endTs; $curr = strtotime('+1 day', $curr)) {
            $iso = date('Y-m-d', $curr);
            $dayName = date('D', $curr);
            $fullDayName = date('l', $curr);
            $dayNum = date('d', $curr);
            $monthShort = date('M', $curr);
            $yearNum = date('Y', $curr);
            $readableDate = "{$dayNum}-{$monthShort}-{$yearNum}";
            $label = "{$dayNum}-{$monthShort} ({$dayName})";

            $dateList[] = [
                'date' => $iso,
                'readableDate' => $readableDate,
                'dayName' => $dayName,
                'fullDayName' => $fullDayName,
                'label' => $label,
                'isSunday' => $dayName === 'Sun',
                'isWeekend' => in_array($dayName, ['Sun', 'Sat'])
            ];
        }

        // 2. Query target employees
        $empSql = "
            SELECT 
                e.id as employee_id,
                e.employee_code,
                u.name as employee_name,
                u.email as employee_email,
                e.department,
                e.designation
            FROM crm_employees e
            JOIN crm_users u ON e.user_id = u.id
            WHERE e.admin_id = ? AND e.status = 'active'
        ";
        $empParams = [$adminId];

        if ($empIdsParam && $empIdsParam !== 'all') {
            $ids = array_filter(array_map('intval', explode(',', (string)$empIdsParam)));
            if (!empty($ids)) {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $empSql .= " AND e.id IN ({$placeholders})";
                $empParams = array_merge($empParams, $ids);
            }
        }
        $empSql .= " ORDER BY u.name ASC";

        $eStmt = $pdo->prepare($empSql);
        $eStmt->execute($empParams);
        $employees = $eStmt->fetchAll();

        // 3. Query existing attendance records
        $recordMap = [];
        if (!empty($employees)) {
            $empIds = array_column($employees, 'employee_id');
            $placeholders = implode(',', array_fill(0, count($empIds), '?'));
            $rSql = "
                SELECT 
                    employee_id,
                    date,
                    status,
                    check_in_time,
                    check_out_time,
                    remarks
                FROM crm_attendance_records
                WHERE admin_id = ? AND date BETWEEN ? AND ? AND employee_id IN ({$placeholders})
            ";
            $rStmt = $pdo->prepare($rSql);
            $rStmt->execute(array_merge([$adminId, $startDate, $endDate], $empIds));
            $rawRecords = $rStmt->fetchAll();

            foreach ($rawRecords as $r) {
                $recordMap["{$r['employee_id']}_{$r['date']}"] = $r;
            }
        }

        // Calculate hours helper
        $calcHours = function(?string $in, ?string $out): string {
            if (!$in || !$out) return '0.0';
            $inSec = strtotime("1970-01-01 {$in}");
            $outSec = strtotime("1970-01-01 {$out}");
            $diffMin = ($outSec - $inSec) / 60;
            if ($diffMin <= 0) return '0.0';
            return sprintf('%.1f hrs', $diffMin / 60);
        };

        // 4. Build matrices & detailed logs
        $matrixRows = [];
        $detailedLogRows = [];
        $summaryByEmployee = [];
        $deptRollup = [];

        foreach ($employees as $emp) {
            $counts = ['present' => 0, 'wfh' => 0, 'half_day' => 0, 'leave' => 0, 'absent' => 0, 'unmarked' => 0];
            $dailyMap = [];

            foreach ($dateList as $dObj) {
                $isoDate = $dObj['date'];
                $rec = $recordMap["{$emp['employee_id']}_{$isoDate}"] ?? null;
                $st = $rec ? strtolower($rec['status']) : 'unmarked';

                if ($st === 'present') $counts['present']++;
                elseif ($st === 'wfh') $counts['wfh']++;
                elseif ($st === 'half-day') $counts['half_day']++;
                elseif ($st === 'leave') $counts['leave']++;
                elseif ($st === 'absent') $counts['absent']++;
                else $counts['unmarked']++;

                $checkIn = $rec['check_in_time'] ?? '-';
                $checkOut = $rec['check_out_time'] ?? '-';
                $hours = ($rec && $rec['check_in_time'] && $rec['check_out_time'])
                    ? $calcHours($rec['check_in_time'], $rec['check_out_time'])
                    : ($st === 'present' ? '9.0 hrs' : ($st === 'wfh' ? '8.0 hrs' : ($st === 'half-day' ? '4.5 hrs' : '0.0 hrs')));

                $dailyMap[$isoDate] = [
                    'status' => strtoupper($st),
                    'check_in' => $checkIn,
                    'check_out' => $checkOut,
                    'working_hours' => $hours,
                    'remarks' => $rec['remarks'] ?? ''
                ];

                $detailedLogRows[] = [
                    'date' => $dObj['readableDate'],
                    'day' => $dObj['fullDayName'],
                    'employee_code' => $emp['employee_code'],
                    'employee_name' => $emp['employee_name'],
                    'department' => $emp['department'],
                    'designation' => $emp['designation'],
                    'status' => strtoupper($st),
                    'check_in' => $checkIn,
                    'check_out' => $checkOut,
                    'working_hours' => $hours,
                    'remarks' => $rec['remarks'] ?? ''
                ];
            }

            $totalDays = count($dateList);
            $effectiveWorkingDays = max(1, $totalDays - $counts['leave']);
            $presentCredit = $counts['present'] + $counts['wfh'] + ($counts['half_day'] * 0.5);
            $attRate = min(100, round(($presentCredit / $effectiveWorkingDays) * 100, 1)) . '%';

            $matrixRows[] = [
                'code' => $emp['employee_code'],
                'name' => $emp['employee_name'],
                'department' => $emp['department'],
                'designation' => $emp['designation'],
                'daily' => $dailyMap,
                'total_days' => $totalDays,
                'present' => $counts['present'],
                'wfh' => $counts['wfh'],
                'half_day' => $counts['half_day'],
                'leave' => $counts['leave'],
                'absent' => $counts['absent'],
                'unmarked' => $counts['unmarked'],
                'attendance_rate' => $attRate
            ];

            $summaryByEmployee[] = [
                'code' => $emp['employee_code'],
                'name' => $emp['employee_name'],
                'department' => $emp['department'],
                'designation' => $emp['designation'],
                'total_days' => $totalDays,
                'present' => $counts['present'],
                'wfh' => $counts['wfh'],
                'half_day' => $counts['half_day'],
                'leave' => $counts['leave'],
                'absent' => $counts['absent'],
                'unmarked' => $counts['unmarked'],
                'attendance_rate' => $attRate
            ];
        }

        // CSV / Excel Export stream
        $isExport = in_array(strtolower((string)$format), ['csv', 'xlsx', 'excel']) 
            || strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/csv') !== false 
            || isset($_GET['download']);

        if ($isExport) {
            $filename = "Attendance_Report_{$startDate}_to_{$endDate}_{$exportType}.csv";
            header('Content-Type: text/csv; charset=utf-8');
            header("Content-Disposition: attachment; filename=\"{$filename}\"");

            // UTF-8 BOM for native Excel compatibility
            echo "\xEF\xBB\xBF";

            $out = fopen('php://output', 'w');

            if ($exportType === 'matrix') {
                fputcsv($out, ["ATTENDANCE CALENDAR MATRIX: {$startDate} to {$endDate}"]);
                fputcsv($out, ["Total Staff Members: " . count($employees) . " | Generated: " . date('Y-m-d H:i:s')]);
                fputcsv($out, []);

                $matrixHeaders = array_merge(
                    ['Emp Code', 'Employee Name', 'Department', 'Designation'],
                    array_column($dateList, 'label'),
                    ['Total Days', 'Present', 'WFH', 'Half-Day', 'Leave', 'Absent', 'Attendance %']
                );
                fputcsv($out, $matrixHeaders);

                foreach ($matrixRows as $m) {
                    $row = [
                        $m['code'],
                        $m['name'],
                        $m['department'],
                        $m['designation']
                    ];
                    foreach ($dateList as $d) {
                        $row[] = $m['daily'][$d['date']]['status'] ?? 'UNMARKED';
                    }
                    $row[] = $m['total_days'];
                    $row[] = $m['present'];
                    $row[] = $m['wfh'];
                    $row[] = $m['half_day'];
                    $row[] = $m['leave'];
                    $row[] = $m['absent'];
                    $row[] = $m['attendance_rate'];
                    fputcsv($out, $row);
                }
            } else {
                // Detailed Logs
                fputcsv($out, ['Date', 'Day', 'Employee Code', 'Employee Name', 'Department', 'Designation', 'Attendance Status', 'Check-In Time', 'Check-Out Time', 'Total Working Hours', 'Remarks']);
                foreach ($detailedLogRows as $r) {
                    fputcsv($out, [
                        '="' . $r['date'] . '"',
                        $r['day'],
                        $r['employee_code'],
                        $r['employee_name'],
                        $r['department'],
                        $r['designation'],
                        $r['status'],
                        $r['check_in'],
                        $r['check_out'],
                        $r['working_hours'],
                        $r['remarks']
                    ]);
                }

                // Employee Summary Rollup
                fputcsv($out, []);
                fputcsv($out, ["=== EMPLOYEE ATTENDANCE SUMMARY ROLLUP ({$startDate} to {$endDate}) ==="]);
                fputcsv($out, ['Employee Code', 'Employee Name', 'Department', 'Designation', 'Total Days', 'Present', 'WFH', 'Half-Day', 'Leave', 'Absent', 'Unmarked', 'Attendance %']);
                foreach ($summaryByEmployee as $s) {
                    fputcsv($out, [
                        $s['code'],
                        $s['name'],
                        $s['department'],
                        $s['designation'],
                        $s['total_days'],
                        $s['present'],
                        $s['wfh'],
                        $s['half_day'],
                        $s['leave'],
                        $s['absent'],
                        $s['unmarked'],
                        $s['attendance_rate']
                    ]);
                }
            }

            fclose($out);
            exit;
        }

        // Return JSON for preview modal
        jsonResponse([
            'success' => true,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'export_type' => $exportType,
            'total_days' => count($dateList),
            'date_list' => $dateList,
            'matrix' => $matrixRows,
            'detailed_logs' => $detailedLogRows,
            'summary' => $summaryByEmployee,
            'total_employees' => count($employees),
            'total_records' => count($detailedLogRows)
        ]);
    }

    jsonResponse(['success' => false, 'error' => "Attendance route '{$subpath}' not found"], 404);
}

/**
 * Checks whether all active employees for a company have checked out for the given date.
 * If 100% complete, automatically triggers the daily attendance notification.
 */
function checkAndSendDailyCompletionEmail(PDO $pdo, int $adminId, string $date): bool {
    try {
        // 1. Total active staff required for attendance
        $totStmt = $pdo->prepare("SELECT COUNT(*) FROM crm_employees WHERE admin_id = ? AND status = 'active'");
        $totStmt->execute([$adminId]);
        $totalStaff = (int)$totStmt->fetchColumn();

        if ($totalStaff <= 0) return false;

        // 2. Count of staff who have checked out for this date
        $outStmt = $pdo->prepare("
            SELECT COUNT(DISTINCT ar.employee_id) 
            FROM crm_attendance_records ar
            JOIN crm_employees e ON ar.employee_id = e.id
            WHERE ar.admin_id = ? AND ar.date = ? AND ar.check_out_time IS NOT NULL AND e.status = 'active'
        ");
        $outStmt->execute([$adminId, $date]);
        $checkedOutCount = (int)$outStmt->fetchColumn();

        // If all active employees have completed checkout
        if ($checkedOutCount >= $totalStaff) {
            // Check outbox to ensure only ONE notification is sent per company per day
            $chkNote = $pdo->prepare("
                SELECT id, status FROM crm_attendance_notifications 
                WHERE admin_id = ? AND attendance_date = ? AND notification_type = 'daily_completion'
            ");
            $chkNote->execute([$adminId, $date]);
            $existingNote = $chkNote->fetch();

            if ($existingNote && in_array($existingNote['status'], ['sent', 'sending'])) {
                return false; // Already sent today
            }

            // Reserve outbox row atomically
            $recip = 'jobrecruitment.in@gmail.com';
            $insNote = $pdo->prepare("
                INSERT INTO crm_attendance_notifications (admin_id, attendance_date, notification_type, recipient_email, status, attempt_count)
                VALUES (?, ?, 'daily_completion', ?, 'sending', 1)
                ON DUPLICATE KEY UPDATE status = 'sending', attempt_count = attempt_count + 1, updated_at = NOW()
            ");
            $insNote->execute([$adminId, $date, $recip]);

            // Dispatch email
            return sendDailyAttendanceEmail($pdo, $adminId, $date, $recip);
        }
    } catch (Exception $e) {
        error_log("Attendance auto-mailer check error: " . $e->getMessage());
    }
    return false;
}

/**
 * Generates and dispatches a professional HTML attendance completion email
 */
function sendDailyAttendanceEmail(PDO $pdo, int $adminId, string $date, string $recipient = 'jobrecruitment.in@gmail.com'): bool {
    date_default_timezone_set('Asia/Kolkata');

    // 1. Fetch Company details
    $cStmt = $pdo->prepare("SELECT company_display_name, slug, email FROM crm_admins WHERE id = ?");
    $cStmt->execute([$adminId]);
    $company = $cStmt->fetch();
    $companyName = $company['company_display_name'] ?? 'PR Marketing Ventures Client';
    $tenantSlug = $company['slug'] ?? 'default';

    // 2. Fetch all staff and their attendance records for the date
    $rStmt = $pdo->prepare("
        SELECT 
            e.id as employee_id,
            e.employee_code,
            e.department,
            e.designation,
            u.name as employee_name,
            u.email as employee_email,
            ar.check_in_time,
            ar.check_out_time,
            COALESCE(ar.status, 'unmarked') as status,
            ar.remarks
        FROM crm_employees e
        JOIN crm_users u ON e.user_id = u.id
        LEFT JOIN crm_attendance_records ar ON ar.employee_id = e.id AND ar.date = ?
        WHERE e.admin_id = ? AND e.status = 'active'
        ORDER BY u.name ASC
    ");
    $rStmt->execute([$date, $adminId]);
    $records = $rStmt->fetchAll();

    $totalStaff = count($records);
    $checkedInCount = 0;
    $checkedOutCount = 0;

    $calcHours = function(?string $in, ?string $out): string {
        if (!$in || !$out) return '-';
        $inSec = strtotime("1970-01-01 {$in}");
        $outSec = strtotime("1970-01-01 {$out}");
        $diffMin = max(0, ($outSec - $inSec) / 60);
        $hrs = floor($diffMin / 60);
        $mins = $diffMin % 60;
        return "{$hrs}h {$mins}m";
    };

    $rowsHtml = '';
    foreach ($records as $r) {
        $inTime = $r['check_in_time'] ? date('h:i A', strtotime($r['check_in_time'])) : '<span style="color:#94a3b8;">Missing</span>';
        $outTime = $r['check_out_time'] ? date('h:i A', strtotime($r['check_out_time'])) : '<span style="color:#ef4444;font-weight:bold;">Pending</span>';
        $hrs = $calcHours($r['check_in_time'], $r['check_out_time']);

        if (!empty($r['check_in_time'])) $checkedInCount++;
        if (!empty($r['check_out_time'])) $checkedOutCount++;

        $statusColor = !empty($r['check_out_time']) ? '#16a34a' : (!empty($r['check_in_time']) ? '#d97706' : '#64748b');
        $statusText = !empty($r['check_out_time']) ? 'CHECKED OUT' : (!empty($r['check_in_time']) ? 'WORKING' : 'UNMARKED');

        $rowsHtml .= "
        <tr style='border-bottom: 1px solid #f1f5f9;'>
            <td style='padding: 10px 12px; font-size: 13px; font-weight: bold; color: #0f172a;'>
                " . htmlspecialchars($r['employee_name']) . "
                <div style='font-size: 11px; font-weight: normal; color: #64748b;'>" . htmlspecialchars($r['employee_code'] ?? 'EMP') . "</div>
            </td>
            <td style='padding: 10px 12px; font-size: 12px; color: #475569;'>" . htmlspecialchars($r['department'] ?? 'General') . "</td>
            <td style='padding: 10px 12px; font-size: 12px; color: #0f172a; font-family: monospace;'>" . $inTime . "</td>
            <td style='padding: 10px 12px; font-size: 12px; color: #0f172a; font-family: monospace;'>" . $outTime . "</td>
            <td style='padding: 10px 12px; font-size: 12px; color: #475569;'>" . $hrs . "</td>
            <td style='padding: 10px 12px; font-size: 11px;'>
                <span style='display: inline-block; padding: 2px 8px; border-radius: 9999px; font-weight: bold; background: {$statusColor}15; color: {$statusColor};'>
                    {$statusText}
                </span>
            </td>
        </tr>";
    }

    $completionRate = ($totalStaff > 0) ? round(($checkedOutCount / $totalStaff) * 100) : 0;
    $subject = "PR Marketing Ventures CRM — Daily Attendance Completed: {$companyName} — {$date}";

    $html = "<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <title>{$subject}</title>
    </head>
    <body style='margin: 0; padding: 24px; background-color: #faf9f5; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif; color: #0f172a;'>
        <div style='max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);'>
            <!-- Header -->
            <div style='background: #0f172a; padding: 24px 28px; text-align: left;'>
                <div style='display: inline-block; padding: 4px 10px; background: #d6c180; color: #0f172a; font-weight: 900; font-size: 12px; border-radius: 6px; letter-spacing: 0.5px; margin-bottom: 8px;'>PR MARKETING VENTURES</div>
                <h1 style='color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;'>Daily Attendance Completion Report</h1>
                <p style='color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;'>Company: <strong style='color: #d6c180;'>" . htmlspecialchars($companyName) . "</strong> | Date: <strong>{$date}</strong> (Asia/Kolkata IST)</p>
            </div>

            <!-- Summary KPI Box -->
            <div style='padding: 20px 28px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;'>
                <table width='100%' cellpadding='0' cellspacing='0' style='text-align: center;'>
                    <tr>
                        <td style='padding: 8px;'>
                            <div style='font-size: 22px; font-weight: 900; color: #0f172a;'>{$totalStaff}</div>
                            <div style='font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold;'>Total Staff</div>
                        </td>
                        <td style='padding: 8px; border-left: 1px solid #e2e8f0;'>
                            <div style='font-size: 22px; font-weight: 900; color: #d97706;'>{$checkedInCount}</div>
                            <div style='font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold;'>Checked In</div>
                        </td>
                        <td style='padding: 8px; border-left: 1px solid #e2e8f0;'>
                            <div style='font-size: 22px; font-weight: 900; color: #16a34a;'>{$checkedOutCount}</div>
                            <div style='font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold;'>Checked Out</div>
                        </td>
                        <td style='padding: 8px; border-left: 1px solid #e2e8f0;'>
                            <div style='font-size: 22px; font-weight: 900; color: #0f172a;'>{$completionRate}%</div>
                            <div style='font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold;'>Completion</div>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Attendance Table -->
            <div style='padding: 24px 28px;'>
                <h3 style='margin: 0 0 14px 0; font-size: 14px; font-weight: 800; color: #0f172a;'>Roster Shift Breakdown</h3>
                <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse: collapse; text-align: left;'>
                    <thead>
                        <tr style='background: #f1f5f9; border-bottom: 1px solid #cbd5e1;'>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>Employee</th>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>Department</th>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>In Time</th>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>Out Time</th>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>Duration</th>
                            <th style='padding: 8px 12px; font-size: 11px; text-transform: uppercase; color: #475569;'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {$rowsHtml}
                    </tbody>
                </table>

                <div style='margin-top: 24px; text-align: center;'>
                    <a href='https://prmarketingventures.com/crm/{$tenantSlug}/attendance' style='display: inline-block; padding: 10px 24px; background: #0f172a; color: #d6c180; text-decoration: none; border-radius: 10px; font-size: 12px; font-weight: 800;'>
                        Open Live Attendance Dashboard →
                    </a>
                </div>
            </div>

            <!-- Footer with Immutable B-903 Address -->
            <div style='background: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6;'>
                <p style='margin: 0;'><strong>PR Marketing Ventures Enterprise CRM</strong></p>
                <p style='margin: 4px 0 0 0;'>B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009, India</p>
                <p style='margin: 4px 0 0 0; color: #94a3b8;'>This is an automated operational notification dispatched to authorized managers.</p>
            </div>
        </div>
    </body>
    </html>";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: PR Marketing Ventures CRM <noreply@prmarketingventures.com>\r\n";
    $headers .= "Reply-To: jobrecruitment.in@gmail.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $sent = @mail($recipient, $subject, $html, $headers);

    // Update outbox table
    try {
        $updStatus = $sent ? 'sent' : 'failed';
        $lastErr = $sent ? null : 'PHP mail() function returned false';
        $sentAt = $sent ? date('Y-m-d H:i:s') : null;

        $upd = $pdo->prepare("
            INSERT INTO crm_attendance_notifications (admin_id, attendance_date, notification_type, recipient_email, status, attempt_count, last_error, sent_at)
            VALUES (?, ?, 'daily_completion', ?, ?, 1, ?, ?)
            ON DUPLICATE KEY UPDATE status = VALUES(status), attempt_count = attempt_count + 1, last_error = VALUES(last_error), sent_at = VALUES(sent_at), updated_at = NOW()
        ");
        $upd->execute([$adminId, $date, $recipient, $updStatus, $lastErr, $sentAt]);
    } catch (Exception $e) {
        error_log("Outbox record update failed: " . $e->getMessage());
    }

    return $sent;
}
