<?php
require 'config.php'; // file phải tạo $pdo

// 1. Header chung
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// 2. Bật lỗi khi dev
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/logs/php_error_log');
error_reporting(E_ALL);

function sendOrderSuccess($data = [], $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}
function sendOrderError($message = 'Error', $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

function getAllOrders()
{
    global $pdo;
    try {
        // Lấy tất cả orders + join user name
        $ordersStmt = $pdo->query("SELECT o.*, u.name AS user_name FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC");
        $orders = $ordersStmt->fetchAll(PDO::FETCH_ASSOC);

        // Lấy tất cả order_items một lần, group theo order_id
        $itemsStmt = $pdo->query("
            SELECT oi.*, b.title 
            FROM order_items oi
            JOIN books b ON oi.book_id = b.id
        ");
        $allItems = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);
        $itemsMap = [];
        foreach ($allItems as $item) {
            $itemsMap[$item['order_id']][] = $item;
        }

        // Gắn order_items vào từng order
        foreach ($orders as &$order) {
            $order['order_items'] = $itemsMap[$order['id']] ?? [];
        }

        sendOrderSuccess($orders);
    } catch (PDOException $e) {
        sendOrderError('Lỗi lấy danh sách đơn hàng: ' . $e->getMessage(), 500);
    }
}
function updateOrderStatus()
{
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    $order_id = $data['order_id'] ?? null;
    $status = $data['status'] ?? '';

    if (!$order_id || !in_array($status, ['pending', 'completed', 'cancelled'])) {
        sendOrderError('Dữ liệu không hợp lệ', 400);
    }

    try {
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$status, $order_id]);
        if ($stmt->rowCount() > 0) {
            sendOrderSuccess(["message" => "Cập nhật trạng thái thành công"]);
        } else {
            sendOrderError("Không tìm thấy đơn hàng hoặc không có thay đổi", 404);
        }
    } catch (PDOException $e) {
        sendOrderError('Lỗi cập nhật trạng thái: ' . $e->getMessage(), 500);
    }
}
function deleteOrder()
{
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    $order_id = $data['order_id'] ?? null;
    if (!$order_id) sendOrderError('ID đơn hàng không hợp lệ', 400);

    try {
        // Xoá order_items trước
        $pdo->prepare("DELETE FROM order_items WHERE order_id = ?")->execute([$order_id]);
        // Xoá order
        $stmt = $pdo->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->execute([$order_id]);
        if ($stmt->rowCount() > 0) {
            sendOrderSuccess(["message" => "Xóa đơn hàng thành công"]);
        } else {
            sendOrderError("Không tìm thấy đơn hàng", 404);
        }
    } catch (PDOException $e) {
        sendOrderError("Lỗi xóa đơn hàng: " . $e->getMessage(), 500);
    }
}
