<?php
require_once __DIR__ . '/../models/userModel.php';

// Helper JSON response wrapper (dùng chung từ model, có thể bỏ nếu model đã echo sẵn)

// Danh sách tất cả user
function getAllUsers()
{
    $users = model_getAllUsers();
    sendUserSuccess($users);
}

// Lấy chi tiết user
function getUserDetail($id)
{
    $user = model_getUserDetail($id);
    if ($user) sendUserSuccess($user);
    else sendUserError("Không tìm thấy user", 404);
}

// Thêm user mới
function addUser()
{
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? 'user';
    $result = model_addUser($name, $email, $password, $role);
    if ($result['success']) sendUserSuccess(["message" => $result['message']], 201);
    else sendUserError($result['message']);
}

// Sửa user
function updateUser()
{
    $id = $_POST['id'] ?? null;
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';
    $result = model_updateUser($id, $name, $email, $password, $role);
    if ($result['success']) sendUserSuccess(["message" => $result['message']]);
    else sendUserError($result['message']);
}

// Xóa user
function deleteUser()
{
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? ($_GET['id'] ?? null);
    $result = model_deleteUser($id);
    if ($result['success']) sendUserSuccess(["message" => $result['message']]);
    else sendUserError($result['message']);
}
