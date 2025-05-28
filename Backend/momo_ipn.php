<?php
// Nhận thông báo thanh toán từ MoMo (nếu muốn cập nhật trạng thái đơn hàng DB tự động)
// Cho phép tất cả domain truy cập (chỉ nên dùng khi DEV/test)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$data = json_decode(file_get_contents("php://input"), true);
// $data['orderId'], $data['resultCode'] == 0 là thành công
file_put_contents("momo_ipn_log.txt", print_r($data, true), FILE_APPEND);
// ...Update DB nếu muốn
echo '{"message":"Received"}';
