<?php
/**
 * Attendance & Roster Controller
 */

require_once __DIR__ . '/helpers.php';

function handleAttendanceRoutes(string $subpath, string $method, PDO $pdo): void {
    $user = requireAuth();
    $adminId = getAdminId($user);

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

        // CSV Export stream
        if ($format === 'csv' || strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/csv') !== false || isset($_GET['download'])) {
            $filename = "Attendance_Report_{$startDate}_to_{$endDate}.csv";
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
                        $r['date'],
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
