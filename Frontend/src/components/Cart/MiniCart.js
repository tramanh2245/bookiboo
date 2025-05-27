import React from 'react';
import styles from './MiniCart.module.css';
import { useCart } from '../Cart/CartContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const MiniCart = () => {
  const { cartItems, isMiniCartVisible, hideMiniCart, isLoadingCart, cartError, removeFromCartContext } = useCart();
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
          <h3>Your Basket ({cartItems.length})</h3>
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
      <div className={styles.itemPrice}>{(parseFloat(item.price) || 0).toLocaleString()}₫</div>
    </div>
    <div className={styles.itemQuantity}>{item.quantity}</div>
    <div className={styles.itemSubtotal}>{(parseFloat(item.price) * item.quantity).toLocaleString()}₫</div>
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
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} VND</span>
            </div>
            <Link to="/cart" className={styles.checkoutButton} onClick={hideMiniCart}>
              Checkout ({cartItems.length})
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;