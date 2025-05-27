import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../../hooks/useAuth";
import './BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { auth } = useAuth?.() || {};
  const { addToCartContext, showMiniCart } = useCart();

  const imageUrl = book.image_url
    ? `http://localhost:8080/bookiboo/Backend/${book.image_url}`
    : "/img/default-book.png";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCartContext({
      book_id: book.id,
      title: book.title,
      price: book.price,
      cover_image_url: book.image_url,
      quantity: 1,
    });
    if (showMiniCart) showMiniCart();
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!auth?.token) {
      navigate("/login", {
        state: { from: `/book/${book.id}`, redirectTo: "/cart" }
      });
      return;
    }
    handleAddToCart(e);
    setTimeout(() => navigate("/cart"), 150);
  };

  const handleCardClick = () => navigate(`/book/${book.id}`);

  return (
    <div className="book-card" onClick={handleCardClick}>
      <div className="book-card-imgbox">
        <img src={imageUrl} alt={book.title} className="book-image" />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-footer">
      <span className="book-price">
  {book.price_formatted || (Number(book.price).toLocaleString() + " VND")}
</span>

      </div>
      <div className="book-card-actions">
        <button
          className="book-card-cart-btn"
          onClick={e => { e.stopPropagation(); handleAddToCart(e); }}
          title="Thêm vào giỏ"
        >
          🛒
        </button>
        <button
          className="book-card-buy-btn"
          onClick={e => { e.stopPropagation(); handleBuyNow(e); }}
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default BookCard;
