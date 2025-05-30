<?php
require_once __DIR__ . "/../config.php"; // Sửa đường dẫn nếu cần

function getDashboard()
{
    global $pdo;

    try {
        $total_books = (int)$pdo->query("SELECT COUNT(*) FROM books")->fetchColumn();
        $total_users = (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
        $total_orders = (int)$pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
        $total_events = (int)$pdo->query("SELECT COUNT(*) FROM events")->fetchColumn();

        $sqlToday = "SELECT IFNULL(SUM(total_price), 0) FROM orders WHERE DATE(created_at) = CURDATE() AND status = 'completed'";
        $revenue_today = (int)$pdo->query($sqlToday)->fetchColumn();

        $sqlMonth = "SELECT IFNULL(SUM(total_price), 0) FROM orders 
                    WHERE MONTH(created_at) = MONTH(CURDATE()) 
                    AND YEAR(created_at) = YEAR(CURDATE())
                    AND status = 'completed'";
        $revenue_this_month = (int)$pdo->query($sqlMonth)->fetchColumn();

        $sqlYear = "SELECT IFNULL(SUM(total_price), 0) FROM orders 
                    WHERE YEAR(created_at) = YEAR(CURDATE())
                    AND status = 'completed'";
        $revenue_this_year = (int)$pdo->query($sqlYear)->fetchColumn();

        $result = [
            "success" => true,
            "data" => [
                "totalBooks" => $total_books,
                "totalUsers" => $total_users,
                "totalOrders" => $total_orders,
                "totalEvents" => $total_events,
                "revenueToday" => $revenue_today,
                "revenueThisMonth" => $revenue_this_month,
                "revenueThisYear" => $revenue_this_year
            ]
        ];
    } catch (Exception $e) {
        $result = [
            "success" => false,
            "message" => "Có lỗi khi lấy dữ liệu dashboard: " . $e->getMessage()
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($result);
    exit;
}
