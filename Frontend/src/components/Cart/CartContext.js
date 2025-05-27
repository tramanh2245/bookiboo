// src/components/Cart/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Khởi tạo giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState(() => {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  });
  const [isMiniCartVisible, setMiniCartVisible] = useState(false);

  // Lưu cartItems vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm vào giỏ
  const addToCartContext = (item) => {
    setCartItems(prev => {
      const existIdx = prev.findIndex(i => i.book_id === item.book_id);
      if (existIdx !== -1) {
        const clone = [...prev];
        clone[existIdx].quantity += item.quantity;
        return clone;
      }
      return [...prev, { ...item }];
    });
    setMiniCartVisible(true);
  };

  // Xóa
  const removeFromCartContext = (book_id) => {
    setCartItems(prev => prev.filter(i => i.book_id !== book_id));
  };

  // Sửa số lượng
  const updateCartQuantityContext = (book_id, quantity) => {
    setCartItems(prev =>
      prev.map(i => i.book_id === book_id ? { ...i, quantity: Math.max(1, quantity) } : i)
    );
  };

  // Ẩn/hiện minicart
  const showMiniCart = () => setMiniCartVisible(true);
  const hideMiniCart = () => setMiniCartVisible(false);

  // Tổng tiền
  const cartSubtotal = cartItems.reduce((sum, item) =>
    sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0), 0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      isMiniCartVisible,
      addToCartContext,
      removeFromCartContext,
      updateCartQuantityContext,
      showMiniCart,
      hideMiniCart,
      cartSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
