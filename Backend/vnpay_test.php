<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
date_default_timezone_set('Asia/Ho_Chi_Minh');

// --- LẤY CẤU HÌNH TỪ VNPAY EMAIL ---
$vnp_TmnCode    = "XPSCB6I6";
$vnp_HashSecret = "4ZI0ENPIZ84B5PIKFCEHA3O2L8DXYVHH";
$vnp_Url        = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
$vnp_ReturnUrl  = "http://localhost:3000/vnpay_callback";

// --- NHẬN DỮ LIỆU TỪ FRONTEND ---
$data = json_decode(file_get_contents("php://input"), true);
$vnp_Amount    = intval($data['amount']) * 100;
$vnp_OrderInfo = $data['orderInfo'] ?? "Thanh toán đơn hàng";
$vnp_TxnRef    = time() . rand(1000, 9999);

// --- TẠO MẢNG INPUT DATA ---
$inputData = [
    "vnp_Version"    => "2.1.0",
    "vnp_TmnCode"    => $vnp_TmnCode,
    "vnp_Amount"     => $vnp_Amount,
    "vnp_Command"    => "pay",
    "vnp_CreateDate" => date('YmdHis'),
    "vnp_CurrCode"   => "VND",
    "vnp_IpAddr"     => "127.0.0.1",
    "vnp_Locale"     => "vn",
    "vnp_OrderInfo"  => $vnp_OrderInfo,
    "vnp_OrderType"  => "other",
    "vnp_ReturnUrl"  => $vnp_ReturnUrl,
    "vnp_TxnRef"     => $vnp_TxnRef
];

// SẮP XẾP THEO KEY (BẮT BUỘC)
ksort($inputData);

// --- BUILD HASHDATA CHUẨN NHẤT ---
$hashdata = urldecode(http_build_query($inputData, '', '&', PHP_QUERY_RFC3986));

// --- TẠO SECURE HASH CHUẨN ---
$vnp_SecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);

// --- BUILD QUERY STRING CHUẨN ---
$query = [];
foreach ($inputData as $key => $value) {
    $query[] = urlencode($key) . "=" . urlencode($value);
}
$queryString = implode("&", $query);

// --- FINAL PAYMENT URL ---
$vnp_PaymentUrl = $vnp_Url . "?" . $queryString . "&vnp_SecureHash=" . $vnp_SecureHash;

// --- LOG TO FILE ĐỂ SO SÁNH (DEBUG) ---
file_put_contents(
    "debug_vnpay.txt",
    "HASHDATA: $hashdata\nHASHSECRET: $vnp_HashSecret\nURL: $vnp_PaymentUrl\n\n",
    FILE_APPEND
);

echo json_encode([
    "success" => true,
    "vnp_url" => $vnp_PaymentUrl,
    "order_id" => $vnp_TxnRef
]);
