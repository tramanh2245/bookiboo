<?php
require_once __DIR__ . '/../config.php';

// Helper trả JSON
function sendUserSuccess($data = [], $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}
function sendUserError($message = 'Error', $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// Lấy tất cả user
function model_getAllUsers()
{
    global $pdo;
    try {
        $stmt = $pdo->query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    } catch (PDOException $e) {
        return [];
    }
}

// Lấy chi tiết 1 user
function model_getUserDetail($id)
{
    global $pdo;
    if (!$id || !is_numeric($id)) return null;
    try {
        $stmt = $pdo->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return null;
    }
}

// Thêm user mới
function model_addUser($name, $email, $password, $role = 'user')
{
    global $pdo;
    if (!$name || !$email || !$password) {
        return ["success" => false, "message" => "Thiếu thông tin bắt buộc"];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ["success" => false, "message" => "Email không hợp lệ"];
    }
    // Check trùng email
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        return ["success" => false, "message" => "Email đã tồn tại"];
    }
    $hash = password_hash($password, PASSWORD_BCRYPT);
    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$name, $email, $hash, $role]);
        return ["success" => true, "message" => "Thêm user thành công"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => "Lỗi thêm user: " . $e->getMessage()];
    }
}

// Sửa user
function model_updateUser($id, $name, $email, $password, $role)
{
    global $pdo;
    if (!$id || !is_numeric($id)) return ["success" => false, "message" => "ID không hợp lệ"];
    // Kiểm tra tồn tại
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) return ["success" => false, "message" => "Không tìm thấy user"];
    $fields = [];
    $params = [];
    if ($name !== '') {
        $fields[] = "name = ?";
        $params[] = $name;
    }
    if ($email !== '' && $email != $user['email']) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return ["success" => false, "message" => "Email không hợp lệ"];
        $stmt2 = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id <> ?");
        $stmt2->execute([$email, $id]);
        if ($stmt2->fetch()) return ["success" => false, "message" => "Email đã tồn tại"];
        $fields[] = "email = ?";
        $params[] = $email;
    }
    if ($password !== '') {
        $fields[] = "password = ?";
        $params[] = password_hash($password, PASSWORD_BCRYPT);
    }
    if ($role !== '' && $role != $user['role']) {
        $fields[] = "role = ?";
        $params[] = $role;
    }
    if (!$fields) return ["success" => false, "message" => "Không có dữ liệu để cập nhật"];
    $params[] = $id;
    $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?";
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return ["success" => true, "message" => "Cập nhật user thành công"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => "Lỗi cập nhật user: " . $e->getMessage()];
    }
}

// Xóa user
function model_deleteUser($id)
{
    global $pdo;
    if (!$id || !is_numeric($id)) return ["success" => false, "message" => "ID không hợp lệ"];
    try {
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) return ["success" => true, "message" => "Xóa user thành công"];
        else return ["success" => false, "message" => "Không tìm thấy user"];
    } catch (PDOException $e) {
        return ["success" => false, "message" => "Lỗi xóa user: " . $e->getMessage()];
    }
}
