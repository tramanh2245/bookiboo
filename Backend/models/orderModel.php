<?php
require_once "config.php";

class OrderModel
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function createOrder($userId, $orderData)
    {
        if (!isset($orderData['items']) || !is_array($orderData['items']) || empty($orderData['items'])) {
            return ["error" => "No order items provided", "status_code" => 400];
        }

        $totalPrice = 0;
        foreach ($orderData['items'] as $item) {
            if (!isset($item['book_id']) || !isset($item['quantity']) || !isset($item['price']) || $item['quantity'] <= 0 || $item['price'] < 0) {
                return ["error" => "Invalid order item data", "status_code" => 400];
            }
            $totalPrice += $item['price'] * $item['quantity'];
        }

        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("INSERT INTO orders (user_id, total_price, created_at, email, name, phone, address, city, district, ward, note, payment_method, status) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $userId,
                $totalPrice,
                $orderData['email'] ?? null,
                $orderData['name'] ?? null,
                $orderData['phone'] ?? null,
                $orderData['address'] ?? null,
                $orderData['city'] ?? null,
                $orderData['district'] ?? null,
                $orderData['ward'] ?? null,
                $orderData['note'] ?? null,
                $orderData['payment_method'] ?? null,
                $orderData['status'] ?? 'pending'
            ]);
            $orderId = $this->pdo->lastInsertId();

            foreach ($orderData['items'] as $item) {
                $stmt = $this->pdo->prepare("INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)");
                $stmt->execute([$orderId, $item['book_id'], $item['quantity'], $item['price']]);
            }

            $this->pdo->commit();
            return ["message" => "Order created", "order_id" => $orderId, "status_code" => 200];
        } catch (Exception $e) {
            $this->pdo->rollBack();
            return ["error" => "Failed to create order: " . $e->getMessage(), "status_code" => 500];
        }
    }

    public function getUserOrders($userId)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($orders as &$order) {
            $stmtItems = $this->pdo->prepare("SELECT oi.book_id, b.title, oi.quantity, oi.price FROM order_items oi JOIN books b ON oi.book_id = b.id WHERE oi.order_id = ?");
            $stmtItems->execute([$order['id']]);
            $order['items'] = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
        }

        return json_encode($orders);
    }

    public function getAllOrders()
    {
        $stmt = $this->pdo->query("SELECT o.id, o.user_id, u.email, o.total_price, o.created_at, o.status,
                                   o.name as customer_name, o.phone as customer_phone, o.address as shipping_address
                                   FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC");
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($orders as &$order) {
            $stmtItems = $this->pdo->prepare("SELECT oi.book_id, b.title, oi.quantity, oi.price FROM order_items oi JOIN books b ON oi.book_id = b.id WHERE oi.order_id = ?");
            $stmtItems->execute([$order['id']]);
            $order['items'] = $stmtItems->fetchAll(PDO::FETCH_ASSOC);
        }

        return json_encode($orders);
    }
}
