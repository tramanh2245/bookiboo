import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookList from "./BookList";
import { getBooksByCategory } from "../../server/api"; // Sửa lại đường dẫn cho đúng

const BookCategoryPage = () => {
  const { categoryKey } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooksByCategory(categoryKey).then(setBooks);
  }, [categoryKey]);

  return (
    <div>
      <h2>Sách theo chủ đề</h2>
      <BookList books={books} />
    </div>
  );
};

export default BookCategoryPage;
