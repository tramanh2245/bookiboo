<?php
require_once "vendor/autoload.php"; // Sử dụng thư viện Firebase JWT

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

const SECRET_KEY = 'your-secret-key'; // Thay bằng secret thật của bạn
const ALGORITHM = 'HS256';

/**
 * Tạo token từ payload
 */
function generateToken(array $payload): string
{
    return JWT::encode($payload, SECRET_KEY, ALGORITHM);
}

/**
 * Giải mã token để lấy payload
 */
function decodeToken(string $token)
{
    try {
        return JWT::decode($token, new Key(SECRET_KEY, ALGORITHM));
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Invalid or expired token", "details" => $e->getMessage()]);
        exit;
    }
}
