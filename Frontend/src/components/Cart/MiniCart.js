import React from 'react';
import styles from './MiniCart.module.css';
import { useCart } from '../Cart/CartContext';
import { Link, useLocation } from 'react-router-dom';

const formatVND = (amount) => {
  if (typeof amount !== "number") amount = Number(amount) || 0;
  return amount.toLocaleString('vi-VN') + '₫';
};

const MiniCart = () => {
  const {
    cartItems,
    isMiniCartVisible,
    hideMiniCart,
    isLoadingCart,
    cartError,
    removeFromCartContext
  } = useCart();
  const location = useLocation();
  if (location.pathname === '/cart') return null;

  // Tính tổng tiền
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return sum + price * quantity;
  }, 0);

  // Không render nếu không hiển thị
  if (!isMiniCartVisible) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={hideMiniCart}>
      <div className={styles.miniCartPanel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Giỏ hàng ({cartItems.length})</h3>
          <button className={styles.closeButton} onClick={hideMiniCart}>
            ×
          </button>
        </div>

        {/* Trạng thái Loading/Error */}
        {isLoadingCart && <div className={styles.statusMessage}>Đang cập nhật giỏ hàng...</div>}
        {cartError && (
          <div className={`${styles.statusMessage} ${styles.errorMessage}`}>
            Lỗi: {cartError} <button onClick={hideMiniCart}>Đóng</button>
          </div>
        )}

        {/* Danh sách sản phẩm trong giỏ hàng */}
        <div className={styles.itemsList}>
          {cartItems.length === 0 && !isLoadingCart && !cartError && (
            <div className={styles.emptyCartMessage}>Giỏ hàng trống.</div>
          )}
          {cartItems.map((item) => (
            <div key={item.cart_item_id || item.book_id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img
                  src={
                    !item.cover_image_url
                      ? '/img/default-book.png'
                      : item.cover_image_url.startsWith('http')
                      ? item.cover_image_url
                      : `http://localhost:8080/bookiboo/Backend/${item.cover_image_url}`
                  }
                  alt={item.title || 'Sách'}
                  onError={(e) => { e.target.src = '/img/default-book.png'; }}
                  style={{ width: 52, height: 68, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemTitle}>{item.title || 'Không có tiêu đề'}</div>
                <div className={styles.itemPrice}>{formatVND(item.price)}</div>
              </div>
              <div className={styles.itemQuantity}>{item.quantity}</div>
              <div className={styles.itemSubtotal}>
                {formatVND((parseFloat(item.price) || 0) * (item.quantity || 1))}
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCartContext(item.book_id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        {/* Footer Mini-Cart */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Tạm tính:</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <Link to="/cart" className={styles.checkoutButton} onClick={hideMiniCart}>
              Thanh toán ({cartItems.length})
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
