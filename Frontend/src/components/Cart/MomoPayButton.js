// components/MomoPayButton.js
import React from "react";

const MomoPayButton = ({ amount = 10000, orderInfo = "Thanh toán Bookiboo" }) => {
  const handlePay = async () => {
    const res = await fetch("http://localhost:8080/bookiboo/Backend/momo_create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, orderInfo })
    });
    const data = await res.json();
    if (data && data.payUrl) {
      window.open(data.payUrl, "_blank");
    } else {
      alert("Không tạo được link thanh toán MoMo!");
    }
  };
  return (
    <button onClick={handlePay} style={{ background: "#A50064", color: "#fff", padding: 10, border: "none", borderRadius: 6 }}>
      Thanh toán qua MoMo
    </button>
  );
};

export default MomoPayButton;
