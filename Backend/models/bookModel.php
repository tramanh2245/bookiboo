<?php
require_once "config.php";

// Lấy tất cả sách (dùng cho AllBooks)
function getAllBooks()
{
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM books ORDER BY created_at DESC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Lấy sách theo ID
function getBookById($id)
{
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}







// Lấy sách theo category
function getBooksByCategory($category)
{
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM books WHERE category = :category");
    $stmt->execute(['category' => $category]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
