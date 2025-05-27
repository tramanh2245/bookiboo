<?php
require_once __DIR__ . '/../config.php';           // Chuẩn
require_once __DIR__ . '/../helpers/jwtUtils.php'; // Chuẩn


// Đăng ký tài khoản
function register()
{
    global $pdo;

    $data = json_decode(file_get_contents("php://input"), true);
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!$name || !$email || !$password) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    // Kiểm tra email đã tồn tại chưa
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Email already registered"]);
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, 'user', NOW())");
    $stmt->execute([$name, $email, $hashedPassword]);

    echo json_encode(["message" => "Registration successful"]);
}

// Đăng nhập tài khoản
function login()
{
    global $pdo;

    $data = json_decode(file_get_contents("php://input"), true);
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(["error" => "Missing email or password"]);
        return;
    }

    $stmt = $pdo->prepare("SELECT id, name, email, password, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
        return;
    }

    $payload = [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email'],
        "role" => $user['role'],
        "iat" => time(),
        "exp" => time() + (60 * 60 * 24) // Token sống 1 ngày
    ];

    $token = generateToken($payload);

    echo json_encode([
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "role" => $user['role']
        ]
    ]);
}
