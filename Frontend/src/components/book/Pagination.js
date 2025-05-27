// src/components/Pagination.js
import React from "react";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];

  // Hiển thị 1 ... 4 5 6 ... n
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);
  if (currentPage <= 3) end = Math.min(5, totalPages);
  if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination-bar">
      <button className="pagination-nav" disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>
        &laquo;
      </button>
      {start > 1 && (
        <>
          <button className="pagination-page" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="pagination-dot">...</span>}
        </>
      )}
      {pages.map(page => (
        <button
          key={page}
          className={`pagination-page${page === currentPage ? " active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pagination-dot">...</span>}
          <button className="pagination-page" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      <button className="pagination-nav" disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
