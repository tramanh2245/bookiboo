import React, { useEffect } from "react";

const VnpayQrModal = ({ open, vnpayUrl, onClose }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; }
  }, [open]);

  // Hook luôn được gọi, nhưng code logic chỉ chạy nếu open && vnpayUrl
  useEffect(() => {
    if (open && vnpayUrl) {
      window.open(vnpayUrl, "_blank");
      onClose && onClose();
    }
    // eslint-disable-next-line
  }, [open, vnpayUrl]);

  if (!open) return null; // Để return dưới hooks

  return (
    <div style={{
      position: "fixed",
      zIndex: 9999,
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }} onClick={onClose}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        width: 410,
        maxWidth: "95vw",
        position: "relative",
        boxShadow: "0 4px 24px #3335"
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 10, right: 16, fontSize: 25, color: "#e34", border: "none", background: "none"
        }}>×</button>
        <div style={{ fontWeight: 700, fontSize: 19, textAlign: "center", marginBottom: 8 }}>
          Đang chuyển đến trang thanh toán VNPAY...
        </div>
        <div style={{ textAlign: "center", marginTop: 12, color: "#1c72ad", fontSize: 15 }}>
          Vui lòng hoàn tất thanh toán ở trang mới. Đừng đóng tab này cho đến khi giao dịch hoàn tất!
        </div>
      </div>
    </div>
  );
};

export default VnpayQrModal;
