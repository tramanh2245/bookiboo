<?php
include_once __DIR__ . '/jwtUtils.php';

function verifyToken(): array
{
    $headers = getallheaders();

    // Lấy header từ nhiều nguồn để tránh mất khi qua Apache
    $authHeader =
        $_SERVER['HTTP_AUTHORIZATION']            // mod_php / FPM
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] // rewrite
        ?? ($headers['Authorization'] ?? '');      // fallback

    if (!preg_match('/^Bearer\s+(\S+)$/', $authHeader, $m)) {
        http_response_code(401);
        echo json_encode(["error" => "Missing or malformed Authorization header"]);
        exit;
    }

    $token   = $m[1];
    $payload = decodeToken($token);   // hàm của bạn trong jwtUtils.php

    return (array)$payload;           // thông tin user
}
