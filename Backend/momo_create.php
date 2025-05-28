<?php
header('Content-Type: application/json; charset=utf-8');
// Cho phép tất cả domain truy cập (chỉ nên dùng khi DEV/test)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


// Key test public MoMo (KHÔNG dùng cho production)
$endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
$partnerCode = "MOMO";
$accessKey = "F8BBA842ECF85";
$secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

// Nhận dữ liệu từ frontend
$data = json_decode(file_get_contents('php://input'), true);
$amount = isset($data['amount']) ? intval($data['amount']) : 10000; // đơn vị VND
$orderId = time() . rand(100, 999); // Mã đơn hàng duy nhất
$orderInfo = isset($data['orderInfo']) ? $data['orderInfo'] : "Thanh toán Bookiboo";
$redirectUrl = "http://localhost:3000/momo_callback"; // React route kết quả
$ipnUrl = "http://localhost:8080/bookiboo/Backend/momo_ipn.php"; // Backend nhận thông báo từ MoMo
$extraData = "";

// Tạo signature
$requestId = time() . "";
$requestType = "captureWallet";
$rawHash = "accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType";
$signature = hash_hmac("sha256", $rawHash, $secretKey);

$dataArr = [
    'partnerCode' => $partnerCode,
    'partnerName' => "Test",
    'storeId' => "Bookiboo",
    'requestId' => $requestId,
    'amount' => "$amount",
    'orderId' => "$orderId",
    'orderInfo' => $orderInfo,
    'redirectUrl' => $redirectUrl,
    'ipnUrl' => $ipnUrl,
    'lang' => 'vi',
    'extraData' => $extraData,
    'requestType' => $requestType,
    'signature' => $signature
];

$ch = curl_init($endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dataArr));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$result = curl_exec($ch);
curl_close($ch);

$jsonResult = json_decode($result, true);

echo json_encode([
    'success' => true,
    'payUrl' => $jsonResult['payUrl'] ?? '',
    'orderId' => $orderId
]);
