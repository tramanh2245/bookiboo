import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import {
  FaCheckCircle, FaBookOpen, FaUsers, FaTags, FaInfoCircle
} from "react-icons/fa";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const qtyRef = useRef(null);

  const { auth } = useAuth();
  const { addToCartContext, showMiniCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:8080/bookiboo/Backend/api.php?resource=user&action=getBookDetail&book_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => setBook({ error: true }));
  }, [id]);

  if (!book) return <div>Đang tải...</div>;
  if (book.error) return <div>Không tìm thấy sách!</div>;

  const handleAddToCart = () => {
    const quantity = parseInt(qtyRef.current.value, 10) || 1;
    addToCartContext({
      book_id: book.id,
      title: book.title,
      price: book.price,
      cover_image_url: book.image_url,
      quantity,
    });
    if (showMiniCart) showMiniCart();
  };

  const imageUrl = book.image_url
    ? (book.image_url.startsWith('http')
      ? book.image_url
      : `http://localhost:8080/bookiboo/Backend/${book.image_url}`)
    : "/img/default-book.png";

  const handleBuyNow = () => {
    if (!auth?.token) {
      navigate("/login", {
        state: { from: `/books/${id}`, redirectTo: "/cart" },
      });
      return;
    }
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 100);
  };

  // Chuẩn bị text tóm tắt tách dòng
  const descriptionLines = (book.description || "").split('\n').filter(Boolean);

  // Thuộc tính sách động
  const bookAttributes = [
    { label: "Nhà xuất bản", value: book.publisher || "N/A" },
    { label: "Tác giả", value: book.author },
    { label: "Năm xuất bản", value: book.year || "2024" },
    { label: "Kích thước", value: book.size || "20 x 20 cm" },
    { label: "Số trang", value: book.pages || "29" },
  ];

  return (
    <div className="book-detail-page">
      <motion.div
        className="book-detail-main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Ảnh */}
        <motion.div
          className="book-detail-imgbox"
          whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img src={imageUrl} alt={book.title} className="book-detail-img" />
          <div className="book-detail-thumb-list">
            <img
              src={imageUrl}
              alt="thumb"
              className="book-detail-thumb active"
            />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          className="book-detail-info"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h1 className="book-detail-title">{book.title}</h1>
          <div className="book-detail-rating">
            {[...Array(5)].map((_, i) => (
              <FaCheckCircle key={i} color="#FFD600" style={{ marginRight: 2 }} />
            ))}
          </div>
          <div className="book-detail-category">
            <FaTags color="#e08513" /> &nbsp;
            <span>Nhóm:</span> <b>{book.category_label || book.category}</b>
          </div>
          <div className="book-detail-desc-short">
            <FaBookOpen color="#3b8be7" /> &nbsp;
            <b>{book.short_desc || ""}</b>
          </div>

          {/* Giá & giảm giá */}
          <div className="book-detail-price-box">
  <span className="book-detail-price">
    {book.price_formatted || (Number(book.price).toLocaleString() + " ₫")}
  </span>
  {book.old_price && (
    <span className="book-detail-old-price">
      {book.old_price_formatted || (Number(book.old_price).toLocaleString() + " VND")}
    </span>
  )}
  {book.old_price && (
    <span className="book-detail-save">
      Tiết kiệm: {(book.save_price_formatted || (Number(book.old_price) - Number(book.price)).toLocaleString() + " ₫")}
    </span>
  )}
</div>


          {/* Hành động */}
          <div className="book-detail-actions">
            <label>
              Số lượng:
              <input
                type="number"
                min="1"
                defaultValue="1"
                ref={qtyRef}
                className="book-detail-qty"
              />
            </label>
            <div className="book-detail-action-btns">
              <motion.button
                className="book-detail-cart-btn"
                onClick={handleAddToCart}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.07 }}
              >
                🛒 Thêm vào giỏ
              </motion.button>
              <motion.button
                className="book-detail-buy-btn"
                onClick={handleBuyNow}
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.07, backgroundColor: "#e32b20" }}
              >
                Mua ngay
              </motion.button>
            </div>
          </div>

          {/* Tóm tắt động từng dòng */}
          <div className="book-detail-summary">
            <motion.b
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.17, duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: 7 }}
            >
              <FaBookOpen /> Tóm tắt:
            </motion.b>
            {descriptionLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.23 + i * 0.13, duration: 0.43 }}
                style={{
                  fontSize: '1.07rem',
                  color: '#2b2b2b',
                  fontWeight: i === 0 ? 600 : 400,
                  margin: "3px 0"
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Mã sách + Đối tượng đọc giả sinh động */}
          <div className="book-detail-meta">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.45 }}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <FaInfoCircle /> <b>Mã sách:</b> {book.code || book.id}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.36, duration: 0.45 }}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <FaUsers /> <b>Đối tượng đọc giả:</b> {book.target || "Trẻ em"}
            </motion.div>
          </div>

          {/* Thông tin về cuốn sách từng dòng */}
          <div className="book-detail-attributes">
            <motion.b
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              style={{ fontSize: "1.07rem" }}
            >
              Thông tin về cuốn sách
            </motion.b>
            {bookAttributes.map((attr, idx) => (
              <motion.div
                key={attr.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.44 + idx * 0.08, duration: 0.39 }}
                style={{ marginBottom: 3 }}
              >
                {attr.label}: {attr.value}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookDetail;
