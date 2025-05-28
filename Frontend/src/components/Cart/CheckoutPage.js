import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../../hooks/useAuth";
import VnpayQrModal from "./VnpayQrModal";
import "./CheckoutPage.css";
import { FaWallet, FaBarcode } from "react-icons/fa";

const paymentMethods = [
  {
    value: "cod",
    label: "Thanh toán khi nhận hàng",
    icon: <FaWallet style={{ color: "#e08513", marginRight: 6 }} />
  },
  {
    value: "vnpayqr",
    label: "Thanh toán qua VNPAY-QR",
    icon: <FaBarcode style={{ color: "#3b8be7", marginRight: 6 }} />
  },
  {
    value: "momo",
    label: "Thanh toán qua MoMo QR",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
        alt="MoMo"
        style={{ width: 20, height: 20, marginRight: 6, verticalAlign: "middle" }}
      />
    )
  }
];

const shippingMethods = [
  { value: "fast", label: "Giao hàng nhanh - chuyển phát thương mại điện tử", price: 29000 },
  { value: "ninja", label: "Sapo Express - Ninja Van", price: 24000 },
  { value: "ghn", label: "Sapo Express - GHN Express", price: 27900 },
  { value: "jt", label: "Sapo Express - J&T Express", price: 23400 }
];

const formatVND = (amount) => {
  if (typeof amount !== "number") amount = Number(amount) || 0;
  return amount.toLocaleString("vi-VN") + "₫";
};

const getShippingFee = (qty) => {
  if (qty <= 10) return 29000;
  if (qty <= 50) return 60000;
  if (qty <= 200) return 150000;
  return null;
};

const MAX_QTY = 10;

const CheckoutPage = () => {
  const { cartItems, cartSubtotal } = useCart();
  const { auth } = useAuth();

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
    otherAddress: false
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shipping, setShipping] = useState(shippingMethods[0].value);
  const [selectedPayment, setSelectedPayment] = useState("cod");

  // Discount code (chỉ cho VNPAY)
  const [discountCode, setDiscountCode] = useState("");
  const [discountValid, setDiscountValid] = useState(false);

  // Modal VNPAY QR
  const [vnpayUrl, setVnpayUrl] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [modalAmount, setModalAmount] = useState(0);

  // Tổng số lượng sách
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingTooHeavy = totalQty > MAX_QTY;
  const calculatedShippingFee = getShippingFee(totalQty);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (!form.province) {
      setDistricts([]); setWards([]);
      return;
    }
    const province = provinces.find(p => p.code.toString() === form.province);
    setDistricts(province ? province.districts : []);
    setForm(f => ({ ...f, district: "", ward: "" }));
  }, [form.province, provinces]);

  useEffect(() => {
    if (!form.district) {
      setWards([]); return;
    }
    const district = districts.find(d => d.code.toString() === form.district);
    setWards(district ? district.wards : []);
    setForm(f => ({ ...f, ward: "" }));
  }, [form.district, districts]);

  // Tổng tiền sau giảm giá (nếu có, chỉ áp dụng cho VNPAY)
  const total =
    cartSubtotal +
    (shippingMethods.find(m => m.value === shipping)?.price || 0) -
    (selectedPayment === "vnpayqr" && discountValid ? cartSubtotal * 0.1 : 0);

  const shippingReady = form.name && form.phone && form.address && form.province && form.district && form.ward;
  const selectedShipping = {
    ...shippingMethods.find(m => m.value === shipping),
    price: calculatedShippingFee !== null ? calculatedShippingFee : 0
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePaymentSelect = (value) => {
    setSelectedPayment(value);
    setDiscountCode("");
    setDiscountValid(false);
  };

  const getImageUrl = (url) => {
    if (!url) return '/img/default-book.png';
    if (url.startsWith('http')) return url;
    return `http://localhost:8080/bookiboo/Backend/${url}`;
  };

  // Nút submit xử lý
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shippingTooHeavy) return;
    if (!shippingReady) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }
    try {
      // 1. Lưu đơn hàng trước
      const orderRes = await fetch("http://localhost:8080/bookiboo/Backend/user/orderUser.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user_id: auth?.user?.id || null,
          city: provinces.find(p => p.code.toString() === form.province)?.name || "",
          district: districts.find(d => d.code.toString() === form.district)?.name || "",
          ward: wards.find(w => w.code.toString() === form.ward)?.name || "",
          note: form.note,
          payment_method: selectedPayment,
          status: ["vnpayqr", "momo"].includes(selectedPayment) ? "pending" : "completed",
          total_price: total,
          items: cartItems
        })
      });
      const orderData = await orderRes.json();
      if (!orderData.success || !orderData.order_id) {
        alert("Lưu đơn hàng thất bại. Vui lòng thử lại!");
        return;
      }
      const orderId = orderData.order_id;

      if (selectedPayment === "vnpayqr") {
        const vnpayAmount = Math.round(cartSubtotal + (selectedShipping?.price || 0) - (discountValid ? cartSubtotal * 0.1 : 0));
        const res = await fetch("http://localhost:8080/bookiboo/Backend/vnpay_test.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: vnpayAmount,
            orderInfo: "Thanh toán đơn hàng Bookiboo #" + orderId,
            order_id: orderId
          })
        });
        const data = await res.json();
        if (data && data.vnp_url) {
          window.open(data.vnp_url, "_blank");
        } else {
          alert("Không lấy được mã QR thanh toán VNPAY!");
        }
        return;
      }

      if (selectedPayment === "momo") {
        const momoAmount = Math.round(cartSubtotal + (selectedShipping?.price || 0));
        const res = await fetch("http://localhost:8080/bookiboo/Backend/momo_create.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: momoAmount,
            orderInfo: "Thanh toán đơn hàng Bookiboo #" + orderId,
            order_id: orderId
          })
        });
        const data = await res.json();
        if (data && data.payUrl) {
          window.open(data.payUrl, "_blank");
        } else {
          alert("Không lấy được mã QR thanh toán MoMo!");
        }
        return;
      }

      // COD: redirect trang cảm ơn luôn
      window.location.href = "/vnpay_callback?status=success&order_id=" + orderId + "&amount=" + total;
    } catch (err) {
      alert("Lỗi kết nối máy chủ: " + err.message);
    }
  };

  // Check mã giảm giá realtime
  useEffect(() => {
    if (discountCode.trim().toUpperCase() === "GIAM10") setDiscountValid(true);
    else setDiscountValid(false);
  }, [discountCode]);

  return (
    <div className="checkout2-root">
      <form className="checkout2-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="checkout2-row">
          <div className="checkout2-col1">
            <div className="checkout2-title">Thông tin mua hàng</div>
            <input name="name" type="text" placeholder="Họ và tên" value={form.name} onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required />
            <input name="address" type="text" placeholder="Địa chỉ" value={form.address} onChange={handleChange} required />
            <div className="checkout2-address-selects">
              <select name="province" value={form.province} onChange={handleChange} required>
                <option value="">Tỉnh thành</option>
                {provinces.map(p => (
                  <option key={p.code} value={p.code}>{p.name}</option>
                ))}
              </select>
              <select name="district" value={form.district} onChange={handleChange} required disabled={!districts.length}>
                <option value="">Quận huyện</option>
                {districts.map(d => (
                  <option key={d.code} value={d.code}>{d.name}</option>
                ))}
              </select>
              <select name="ward" value={form.ward} onChange={handleChange} required disabled={!wards.length}>
                <option value="">Phường xã</option>
                {wards.map(w => (
                  <option key={w.code} value={w.code}>{w.name}</option>
                ))}
              </select>
            </div>
            <textarea
              name="note"
              placeholder="Ghi chú (tùy chọn)"
              value={form.note}
              onChange={handleChange}
              rows={2}
            />
            <div className="checkout2-section-title" style={{ marginTop: 13 }}>Phương thức thanh toán</div>
            <div className="checkout2-payment-methods-radio">
              {paymentMethods.map(pm => (
                <label key={pm.value} className={"custom-pay-method-radio" + (selectedPayment === pm.value ? " checked" : "")}>
                  <input
                    type="radio"
                    name="payment_method"
                    value={pm.value}
                    checked={selectedPayment === pm.value}
                    onChange={() => handlePaymentSelect(pm.value)}
                    className="custom-radio"
                  />
                  <span className="custom-pay-method-label">
                    {pm.icon}
                    <span style={{ marginLeft: 12 }}>{pm.label}</span>
                  </span>
                </label>
              ))}
            </div>
            {/* Chỉ hiện nhập mã giảm giá khi chọn VNPAY */}
            {selectedPayment === "vnpayqr" && (
              <div style={{ marginTop: 14 }}>
                <b>Nhập mã giảm giá để nhận giảm 10% (không bắt buộc):</b>
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá (ví dụ: GIAM10)"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  style={{
                    padding: 7, borderRadius: 6, border: "1px solid #ddd", width: 180, marginLeft: 8
                  }}
                />
                <div style={{ color: discountValid ? "#0ca750" : "#222", marginTop: 6 }}>
                  {discountValid
                    ? "Áp dụng thành công - bạn sẽ được giảm 10% tổng giá trị sản phẩm!"
                    : "Không nhập mã, bạn vẫn thanh toán bình thường."}
                </div>
              </div>
            )}
          </div>
          {/* ==== Vận chuyển + Đơn hàng ==== */}
          <div className="checkout2-col2">
            <div className="checkout2-shipping-title">Vận chuyển</div>
            {!shippingReady ? (
              <div className="checkout2-shipping-info">
                Vui lòng nhập thông tin giao hàng
              </div>
            ) : (
              <div className="checkout2-shipping-box">
                {shippingMethods.map(m => (
                  <label key={m.value} className={`checkout2-shipping-radio${shipping === m.value ? " checked" : ""}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value={m.value}
                      checked={shipping === m.value}
                      onChange={() => setShipping(m.value)}
                      style={{ marginRight: 10 }}
                    />
                    <span style={{ flex: 1 }}>{m.label}</span>
                    <span style={{ fontWeight: 500, color: "#a46d09" }}>{formatVND(selectedShipping.price)}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="checkout2-cartbox">
              <div className="checkout2-cart-title">
                Đơn hàng ({cartItems.length} sản phẩm)
              </div>
              <div className="checkout2-cart-list">
                {cartItems.map(item => (
                  <div className="checkout2-cart-item" key={item.book_id}>
                    <img
                      src={getImageUrl(item.cover_image_url)}
                      alt={item.title}
                      onError={e => { e.target.src = '/img/default-book.png'; }}
                    />
                    <div className="checkout2-cart-item-info">
                      <div className="checkout2-cart-item-title">{item.title}</div>
                    </div>
                    <div className="checkout2-cart-item-price">
                      {formatVND(item.price)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout2-cart-summary">
                <div className="checkout2-cart-row">
                  <span>Tạm tính</span>
                  <span>{formatVND(cartSubtotal)}</span>
                </div>
                <div className="checkout2-cart-row">
                  <span>Phí vận chuyển</span>
                  <span>
                    {calculatedShippingFee !== null
                      ? formatVND(calculatedShippingFee)
                      : <span style={{ color: "red" }}>Vui lòng liên hệ</span>
                    }
                  </span>
                </div>
                {selectedPayment === "vnpayqr" && discountValid && (
                  <div className="checkout2-cart-row">
                    <span>Giảm giá (10%)</span>
                    <span style={{ color: "#0ca750", fontWeight: 600 }}>
                      -{formatVND(cartSubtotal * 0.1)}
                    </span>
                  </div>
                )}
                <div className="checkout2-cart-row checkout2-cart-total">
                  <span>Tổng cộng</span>
                  <span style={{ color: "#e08513", fontWeight: "bold" }}>
                    {calculatedShippingFee !== null ? formatVND(total) : "Liên hệ"}
                  </span>
                </div>
              </div>
              <div className="checkout2-cart-bottom">
                {shippingTooHeavy && (
                  <div
                    style={{
                      color: "#d8000c",
                      background: "#ffd2d2",
                      border: "1px solid #fbc2c4",
                      borderRadius: 7,
                      padding: 10,
                      marginBottom: 10,
                      fontWeight: 700,
                      textAlign: "center"
                    }}
                  >
                    Đơn hàng của bạn có số lượng sách lớn ({totalQty} quyển).
                    Vui lòng <a href="/lien-he" style={{ color: "#d8000c", textDecoration: "underline" }}>liên hệ Bookiboo</a> để được tư vấn phí vận chuyển!
                  </div>
                )}
                <a href="/cart" className="checkout2-back-link">&lt; Quay về giỏ hàng</a>
                <button
                  type="submit"
                  className="checkout2-order-btn"
                  disabled={shippingTooHeavy}
                  style={shippingTooHeavy ? { opacity: 0.6, cursor: "not-allowed" } : {}}
                >
                  {selectedPayment === "vnpayqr"
                    ? "Xác nhận thanh toán VNPAY"
                    : selectedPayment === "momo"
                    ? "Xác nhận thanh toán MoMo"
                    : "Đặt hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Modal QR VNPAY */}
      <VnpayQrModal
        open={qrModalOpen}
        vnpayUrl={vnpayUrl}
        amount={modalAmount}
        onClose={() => setQrModalOpen(false)}
      />
    </div>
  );
};

export default CheckoutPage;
