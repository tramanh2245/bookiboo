import React from "react";
import BookCard from "./BookCard";
import "./BookList.css";

const BookList = ({ books }) => (
  <div>
    {books && books.length > 0
      ? (
        <div className="book-list-grid">
          {books.map(book => <BookCard book={book} key={book.id} />)}
        </div>
      ) : (
        <div style={{ color: "#b08542", textAlign: "center", padding: "60px 0" }}>
          Không có sách nào.
        </div>
      )
    }
  </div>
);

export default BookList;
