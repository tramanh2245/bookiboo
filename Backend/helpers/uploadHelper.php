<?php
// helpers/uploadHelper.php

function handleImageUpload($field, $uploadSubDir = 'Uploads/')
{
    if (!isset($_FILES[$field]) || $_FILES[$field]['error'] === UPLOAD_ERR_NO_FILE) return '';
    if ($_FILES[$field]['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Lỗi khi tải ảnh lên: $field");
    }

    $baseDir = dirname(__DIR__) . '/' . $uploadSubDir;
    if (!is_dir($baseDir)) mkdir($baseDir, 0755, true);
    if (!is_writable($baseDir)) throw new Exception("Thư mục ảnh không có quyền ghi");

    $imageName = uniqid() . '_' . basename($_FILES[$field]['name']);
    $targetFilePath = $baseDir . $imageName;

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES[$field]['tmp_name']);
    finfo_close($finfo);
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
    if (!in_array($fileType, $allowedTypes) || !in_array($mime, $allowedMimes)) {
        throw new Exception("Tệp ảnh không hợp lệ: $field");
    }

    if (!move_uploaded_file($_FILES[$field]['tmp_name'], $targetFilePath)) {
        throw new Exception("Không thể lưu ảnh: $field");
    }

    return $uploadSubDir . $imageName;
}
