import React from "react";
import { useLocation } from "react-router-dom";

const VnpayCallback = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get("order_id");
  const status = params.get("status");

  return (
    <div className="vnpay-callback">
      <h2>Kết quả thanh toán</h2>
      <p>Đơn hàng #{orderId}</p>
      {status === "paid" ? (
        <div style={{ color: "green" }}>Thanh toán thành công!</div>
      ) : (
        <div style={{ color: "red" }}>Thanh toán thất bại hoặc bị hủy.</div>
      )}
      <a href="/">Quay về trang chủ</a>
    </div>
  );
};

export default VnpayCallback;
