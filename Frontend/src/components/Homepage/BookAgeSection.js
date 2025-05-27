import React from "react";
import BookCard from "../book/BookCard";

const BookAgeSection = ({ age, books, sectionColor, loading }) => (
  <div className="book-age-section">
    <div className="age-title" style={{ background: sectionColor }}>{age}</div>
    {loading ? (
      <div style={{ textAlign: "center" }}>Đang tải...</div>
    ) : (
      <div className="book-list-grid">
        {books.map(book => <BookCard book={book} key={book.id} />)}
      </div>
    )}
  </div>
);


export default BookAgeSection;
