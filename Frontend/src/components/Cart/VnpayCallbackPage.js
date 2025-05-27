import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VnpayCallbackPage() {
  const [status, setStatus] = useState("loading");
  const [amount, setAmount] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status");
    const amountParam = params.get("amount");
    const order_id = params.get("order_id");
    setAmount(amountParam ? Number(amountParam) : null);
    setOrderId(order_id || "");
    setTimeout(() => {
      setStatus(statusParam === "success" ? "success" : "fail");
    }, 600);
  }, [location.search]);

  return (
    <div style={{ textAlign: "center", padding: 48 }}>
      {status === "loading" && <div>Đang xác nhận giao dịch...</div>}
      {status === "success" && (
        <>
          <div style={{ color: "green", fontSize: 24, fontWeight: 700, marginBottom: 18 }}>
            🎉 Đặt hàng & thanh toán thành công! Cảm ơn bạn!
          </div>
          <div style={{ fontSize: 18, color: "#222", marginBottom: 16 }}>
            <b>Số tiền đã thanh toán: </b>
            <span style={{ color: "#e08513" }}>{amount?.toLocaleString("vi-VN")} VND</span>
          </div>
          <div style={{ fontSize: 15, color: "#555", marginBottom: 18 }}>
            <b>Mã đơn hàng: </b>{orderId}
          </div>
          <button
            onClick={() => navigate("/")}
            style={{ padding: "9px 24px", borderRadius: 6, border: "none", background: "#2bcf7e", color: "#fff", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            Về trang chủ
          </button>
        </>
      )}
      {status === "fail" && (
        <>
          <div style={{ color: "red", fontSize: 22, fontWeight: 600, marginBottom: 16 }}>
            ❌ Thanh toán thất bại hoặc đã bị huỷ!
          </div>
          <button
            onClick={() => navigate("/cart")}
            style={{ padding: "9px 24px", borderRadius: 6, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            Quay lại giỏ hàng
          </button>
        </>
      )}
    </div>
  );
}
