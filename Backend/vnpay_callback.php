<?php
require_once __DIR__ . '/config.php';
date_default_timezone_set('Asia/Ho_Chi_Minh');
$vnp_HashSecret = "YOUR_HASH_SECRET_HERE"; // Phải đúng với test/prod

$vnp_SecureHash = $_GET['vnp_SecureHash'] ?? '';
$inputData = [];
foreach ($_GET as $key => $value) {
    if ($key != "vnp_SecureHash" && $key != "vnp_SecureHashType") {
        $inputData[$key] = $value;
    }
}
ksort($inputData);
$hashData = '';
foreach ($inputData as $key => $value) {
    $hashData .= $key . '=' . $value . '&';
}
$hashData = rtrim($hashData, '&');
$secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

$order_id = $_GET['vnp_TxnRef'] ?? '';
$vnp_ResponseCode = $_GET['vnp_ResponseCode'] ?? '';
$status = ($secureHash === $vnp_SecureHash && $vnp_ResponseCode === '00') ? 'paid' : 'failed';

if ($order_id && $secureHash === $vnp_SecureHash) {
    // Cập nhật đơn hàng
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->execute([$status, $order_id]);
}

// Redirect về React để hiển thị kết quả
header('Location: http://localhost:3000/vnpay_callback?order_id=' . $order_id . '&status=' . $status);
exit;
