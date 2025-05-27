<?php
// user/orderUser.php

require_once __DIR__ . '/../config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}



$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // ========= ĐẶT HÀNG =========
    $data = json_decode(file_get_contents("php://input"), true);

    // Kiểm tra đầu vào
    if (!$data || !isset($data['items']) || !is_array($data['items']) || count($data['items']) == 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Không có sản phẩm đặt hàng']);
        exit;
    }

    // Tính tổng tiền
    $totalPrice = 0;
    foreach ($data['items'] as $item) {
        if (
            !isset($item['book_id']) || !isset($item['quantity']) || !isset($item['price'])
            || $item['quantity'] <= 0 || $item['price'] < 0
        ) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thông tin sản phẩm không hợp lệ']);
            exit;
        }
        $totalPrice += $item['price'] * $item['quantity'];
    }
    if (isset($data['total_price'])) $totalPrice = $data['total_price'];

    // Giao dịch DB
    $pdo->beginTransaction();
    try {
        $user_id = isset($data['user_id']) ? intval($data['user_id']) : null;
        $status = $data['status'] ?? 'pending';
        $stmt = $pdo->prepare(
            "INSERT INTO orders
            (user_id, email, name, phone, address, city, district, ward, note, payment_method, status, created_at, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)"
        );
        $stmt->execute([
            $user_id,
            $data['email'] ?? '',
            $data['name'] ?? '',
            $data['phone'] ?? '',
            $data['address'] ?? '',
            $data['city'] ?? '',
            $data['district'] ?? '',
            $data['ward'] ?? '',
            $data['note'] ?? '',
            $data['payment_method'] ?? '',
            $status,
            $totalPrice
        ]);
        $orderId = $pdo->lastInsertId();

        // Lưu từng sản phẩm vào order_items
        $stmtItem = $pdo->prepare(
            "INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)"
        );
        foreach ($data['items'] as $item) {
            $stmtItem->execute([
                $orderId,
                $item['book_id'],
                $item['quantity'],
                $item['price']
            ]);
        }

        $pdo->commit();
        echo json_encode(['success' => true, 'order_id' => $orderId]);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Không thể tạo đơn: ' . $e->getMessage()]);
    }
    exit;
}

// LẤY ĐƠN THEO USER_ID (GET)
if ($method === 'GET') {
    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
    if (!$user_id) {
        echo json_encode(['success' => false, 'error' => 'Thiếu user_id']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($orders as &$order) {
        $stmtItems = $pdo->prepare("SELECT oi.book_id, oi.quantity, oi.price, b.title 
                                    FROM order_items oi 
                                    JOIN books b ON oi.book_id = b.id 
                                    WHERE oi.order_id = ?");
        $stmtItems->execute([$order['id']]);
        $order['items'] = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode(['success' => true, 'orders' => $orders]);
    exit;
}

// Phương thức không hỗ trợ
echo json_encode(['success' => false, 'message' => 'Sai phương thức hoặc endpoint!']);
exit;
