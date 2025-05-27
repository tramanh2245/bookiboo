import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import "./CartPage.css";
import { useAuth } from "../../hooks/useAuth";
import { FiShoppingBag } from "react-icons/fi";

// Hàm xử lý ảnh, giống logic BookDetail
const getCartImageUrl = (img) => {
  if (!img) return "/img/default-book.png";
  if (img.startsWith("http")) return img;
  return `http://localhost:8080/bookiboo/Backend/${img}`;
};

// Hàm định dạng tiền VND
const formatVND = (amount) => {
  if (typeof amount !== "number") amount = Number(amount) || 0;
  return amount.toLocaleString("vi-VN") + "₫";
};

const CartPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { cartItems, removeFromCartContext, updateCartQuantityContext, cartSubtotal } = useCart();

  const handleCheckout = () => {
    if (auth && auth.token) {
      navigate("/checkout");
    } else {
      toast.info("Bạn cần đăng nhập để tiếp tục thanh toán.");
      navigate("/login", { state: { from: "/cart", redirectTo: "/checkout" } });
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <FiShoppingBag size={54} color="#222" style={{ marginBottom: 16 }} />
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Giỏ hàng của bạn đang trống
        </div>
        <div style={{ fontSize: 16, color: "#444" }}>
          Hãy khám phá các <b>Sách Bán Chạy</b>, hoặc xem <b>Gợi Ý Trong Tháng</b> để bắt đầu mua sắm!
        </div>
      </div>
    );
  }

  return (
    <div className="cartpage-container">
      <div className="cart-main">
        <h1 className="cart-title">
          Giỏ hàng <span>({cartItems.length})</span>
        </h1>
        <div className="cart-shipment">
          <div className="shipment-label">Đơn hàng 1</div>
          {cartItems.map((item, idx) => (
            <div className="cart-item" key={item.book_id || idx}>
              <div className="cart-imgbox">
                <img src={getCartImageUrl(item.cover_image_url)} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-author">{item.author}</div>
                <div className="cart-item-isbn">ISBN: <b>{item.isbn || "..."}</b></div>
                <div className="cart-item-meta">
                  <span className="cart-item-meta-item">Bìa cứng</span>
                  <span className="cart-item-meta-item">Mới</span>
                </div>
                <div className="cart-item-action-row">
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCartContext(item.book_id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-price">{formatVND(item.price)}</div>
                <div className="cart-item-qtybox">
                  <button onClick={() => updateCartQuantityContext(item.book_id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantityContext(item.book_id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Order Summary */}
      <div className="cart-summary">
        <h2>Tóm tắt đơn hàng</h2>
        <div className="cart-summary-row">
          <span>Tạm tính</span>
          <span>{formatVND(cartSubtotal)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Phí vận chuyển</span>
          <span>Chưa xác định</span>
        </div>
        <div className="cart-summary-row">
          <span>Thuế</span>
          <span>Chưa xác định</span>
        </div>
        <div className="cart-summary-total">
          <span>Tổng cộng</span>
          <span>{formatVND(cartSubtotal)}</span>
        </div>
        <input className="cart-promo-input" placeholder="Nhập mã giảm giá" />
        <button className="cart-promo-btn">Áp dụng</button>
        <button className="cart-checkout-btn" onClick={handleCheckout}>
          Tiếp tục thanh toán
        </button>
        <div className="cart-summary-note">
          <a href="#">Cần trợ giúp? Liên hệ Bookiboo</a>
          <div className="cart-money-back">
            <b>Bảo đảm hoàn tiền</b>
            <p>
              Tất cả sách mới, đã qua sử dụng và sách hiếm đều được đảm bảo chất lượng đọc tốt.
            </p>
            <p>
              Nếu bạn không hài lòng, chỉ cần hoàn trả sách trong 30 ngày để được hoàn tiền.
            </p>
          </div>
          <div className="cart-policy">
            <a href="#">Điều khoản</a> | <a href="#">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
