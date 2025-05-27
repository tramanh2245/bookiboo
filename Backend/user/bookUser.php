<?php
require_once "config.php";

require_once __DIR__ . '/../models/bookModel.php'; // CHUẨN NHẤT (dùng đúng đường dẫn, models ở ngoài folder user)
function formatCurrencyVND($price)
{
    return number_format((float)$price, 0, ',', '.') . ' ₫';
}



function getBooksForUser()
{
    global $pdo;

    $stmt = $pdo->query("SELECT * FROM books ORDER BY created_at DESC");
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($books as &$book) {
        $book['price_formatted'] = formatCurrencyVND($book['price']);
    }


    echo json_encode($books);
}

function getBookDetail()
{
    global $pdo;

    $bookId = $_GET['book_id'] ?? null;

    if (!$bookId) {
        http_response_code(400);
        echo json_encode(["error" => "Missing book ID"]);
        return;
    }

    $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
    $stmt->execute([$bookId]);

    $book = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$book) {
        http_response_code(404);
        echo json_encode(["error" => "Book not found"]);
        return;
    }
    $book['price_formatted'] = formatCurrencyVND($book['price']);

    echo json_encode($book);
}

function getBooksByCategoryForUser()
{
    $category = $_GET['category'] ?? null;

    if (!$category) {
        http_response_code(400);
        echo json_encode(["error" => "Thiếu category"]);
        return;
    }

    $books = getBooksByCategory($category);
    foreach ($books as &$book) {
        $book['price_formatted'] = formatCurrencyVND($book['price']);
    }

    echo json_encode($books);
}