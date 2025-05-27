// src/pages/AllBooksPage.js
import React, { useEffect, useState } from "react";
import BookList from "../book/BookList";
import Pagination from "./Pagination";
import "./AllBooksPage.css";

const CATEGORIES = [
  { value: "", label: "Tất cả chuyên mục" },
  { value: "lam-quen-voi-sach", label: "Làm quen với sách" },
  { value: "phat-trien-sang-tao", label: "Phát triển sáng tạo" },
  { value: "phat-trien-tu-duy", label: "Phát triển tư duy" },
  { value: "phat-trien-quan-sat", label: "Phát triển quan sát" }
];
const PAGE_SIZE = 16;

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/bookiboo/Backend/api.php?resource=user&action=getBooks")
      .then(res => res.json())
      .then(data => setBooks(Array.isArray(data) ? data : []));
  }, []);

  // Filter hoàn toàn trên frontend
  const filteredBooks = books.filter(book => {
    // Lọc chuyên mục
    const byCat = !category || book.category === category;
    // Lọc tồn kho
    const byStock = !stock || (stock === "in" ? Number(book.stock) > 0 : Number(book.stock) === 0);
    // Lọc giá
    const priceNum = parseFloat(book.price);
    let byPrice = true;
    if (price === "lt40") byPrice = priceNum < 40;
    else if (price === "40-60") byPrice = priceNum >= 40 && priceNum <= 60;
    else if (price === "gt60") byPrice = priceNum > 60;
    return byCat && byStock && byPrice;
  });

  // Pagination
  const totalPage = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const booksPage = filteredBooks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Khi filter đổi, reset về page 1
  useEffect(() => {
    setPage(1);
  }, [category, stock, price]);

  return (
    <div className="allbooks-page">
      <h2>Tất cả sách</h2>
      <div className="book-filter-bar">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select value={stock} onChange={e => setStock(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="in">Còn hàng</option>
          <option value="out">Hết hàng</option>
        </select>
        <select value={price} onChange={e => setPrice(e.target.value)}>
          <option value="">Tất cả giá</option>
          <option value="lt40">Dưới 40.000đ</option>
          <option value="40-60">40.000đ - 60.000đ</option>
          <option value="gt60">Trên 60.000đ</option>
        </select>
      </div>
      <BookList books={booksPage} />
      <Pagination totalPages={totalPage} currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default AllBooksPage;
