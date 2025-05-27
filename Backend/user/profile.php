<?php
require_once "config.php";

function getUserProfile()
{
    global $pdo;

    $userId = $_GET['user_id'] ?? null;

    if (!$userId) {
        http_response_code(400);
        echo json_encode(["error" => "Missing user ID"]);
        return;
    }

    $stmt = $pdo->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
    $stmt->execute([$userId]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["error" => "User not found"]);
        return;
    }

    echo json_encode($user);
}

function updateUserProfile()
{
    global $pdo;

    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['user_id'] ?? null;
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');

    if (!$userId || !$name || !$email) {
        http_response_code(400);
        echo json_encode(["error" => "Missing fields"]);
        return;
    }

    $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
    $stmt->execute([$name, $email, $userId]);

    echo json_encode(["message" => "Profile updated"]);
}
