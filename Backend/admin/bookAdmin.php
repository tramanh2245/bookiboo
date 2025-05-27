<?php
// bookAdmin.php - quản lý CRUD cho sách

require 'config.php'; // file phải tạo $pdo
require_once __DIR__ . '/../helpers/uploadHelper.php';

// 1. Header chung
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// 2. Bật lỗi khi dev
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'C:/xampp/php/logs/php_error_log');
error_reporting(E_ALL);

// 3. Helper function
function sendSuccess($data = [], $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}
function sendError($message = 'Error', $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// 5. Hàm thực thi

function getBooks()
{
    global $pdo;
    try {
        $stmt = $pdo->query("SELECT * FROM books ORDER BY created_at DESC");
        $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($books as &$book) {
            if (!empty($book['image_url']) && !str_starts_with($book['image_url'], 'http')) {
                $book['image_url'] = 'http://localhost:8080/bookiboo/Backend/' . str_replace('\\', '/', $book['image_url']);
            }
        }
        sendSuccess($books);
    } catch (PDOException $e) {
        error_log("Lỗi getBooks: " . $e->getMessage());
        sendError('Lỗi khi truy vấn cơ sở dữ liệu', 500);
    }
}

function getBook($id)
{
    global $pdo;
    try {
        if (!is_numeric($id) || $id <= 0) sendError("ID sách không hợp lệ", 400);
        $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
        $stmt->execute([$id]);
        $book = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($book) {
            if (!empty($book['image_url']) && !str_starts_with($book['image_url'], 'http')) {
                $book['image_url'] = 'http://localhost:8080/bookiboo/Backend/' . str_replace('\\', '/', $book['image_url']);
            }
            sendSuccess($book);
        } else {
            sendError("Không tìm thấy sách", 404);
        }
    } catch (PDOException $e) {
        sendError("Lỗi cơ sở dữ liệu", 500);
    }
}

function addBook()
{
    global $pdo;
    try {
        $title = trim($_POST['title'] ?? '');
        $author = trim($_POST['author'] ?? '');
        $price = $_POST['price'] ?? 0;
        $description = trim($_POST['description'] ?? '');
        $category = trim($_POST['category'] ?? '');

        $errors = [];
        if (!$title) $errors[] = "Thiếu tiêu đề";
        if (!$author) $errors[] = "Thiếu tác giả";
        if (!is_numeric($price) || $price <= 0) $errors[] = "Giá phải là số lớn hơn 0";
        if (!$category) $errors[] = "Thiếu danh mục";
        if ($errors) sendError(implode(', ', $errors), 400);

        // --- Dùng hàm upload dùng chung
        $image_url = '';
        try {
            $image_url = handleImageUpload('image'); // 'image' là name của input file bên FE gửi lên
        } catch (Exception $e) {
            // Nếu không upload file hoặc upload lỗi, có thể bỏ qua hoặc gửi lỗi
            if ($_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendError($e->getMessage(), 400);
            }
        }

        $stmt = $pdo->prepare("INSERT INTO books (title, author, price, description, image_url, created_at, category)
                               VALUES (?, ?, ?, ?, ?, NOW(), ?)");
        $stmt->execute([$title, $author, $price, $description, $image_url, $category]);
        $bookId = $pdo->lastInsertId();
        $book = [
            'id' => $bookId,
            'title' => $title,
            'author' => $author,
            'price' => $price,
            'description' => $description,
            'image_url' => $image_url ? 'http://localhost:8080/bookiboo/Backend/' . str_replace('\\', '/', $image_url) : '',
            'category' => $category
        ];
        sendSuccess(["message" => "Thêm sách thành công", "book" => $book], 201);
    } catch (PDOException $e) {
        error_log("Lỗi addBook: " . $e->getMessage());
        sendError("Lỗi server: " . $e->getMessage(), 500);
    }
}

function updateBook()
{
    global $pdo;
    try {
        $id = $_POST['id'] ?? null;
        $title = trim($_POST['title'] ?? '');
        $author = trim($_POST['author'] ?? '');
        $price = $_POST['price'] ?? null;
        $description = trim($_POST['description'] ?? '');
        $category = trim($_POST['category'] ?? '');

        if (!$id || !is_numeric($id) || $id <= 0) sendError("Thiếu hoặc ID sách không hợp lệ", 400);

        $setClauses = [];
        $params = [];

        if ($title) {
            $setClauses[] = "title = ?";
            $params[] = $title;
        }
        if ($author) {
            $setClauses[] = "author = ?";
            $params[] = $author;
        }
        if (is_numeric($price) && $price > 0) {
            $setClauses[] = "price = ?";
            $params[] = $price;
        }
        if ($description !== '') {
            $setClauses[] = "description = ?";
            $params[] = $description;
        }
        if ($category) {
            $setClauses[] = "category = ?";
            $params[] = $category;
        }

        // --- Dùng hàm upload dùng chung
        try {
            $image_url = handleImageUpload('image');
            if ($image_url) {
                $setClauses[] = "image_url = ?";
                $params[] = $image_url;
            }
        } catch (Exception $e) {
            if ($_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendError($e->getMessage(), 400);
            }
        }

        if (!$setClauses) sendError("Không có dữ liệu nào để cập nhật", 400);

        $sql = "UPDATE books SET " . implode(", ", $setClauses) . " WHERE id = ?";
        $params[] = $id;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            // Trả về thông tin sách mới nhất
            $stmt = $pdo->prepare("SELECT * FROM books WHERE id = ?");
            $stmt->execute([$id]);
            $book = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!empty($book['image_url']) && !str_starts_with($book['image_url'], 'http')) {
                $book['image_url'] = 'http://localhost:8080/bookiboo/Backend/' . str_replace('\\', '/', $book['image_url']);
            }
            sendSuccess(["message" => "Cập nhật sách thành công", "book" => $book]);
        } else {
            sendError("Không tìm thấy sách hoặc không có thay đổi", 404);
        }
    } catch (PDOException $e) {
        sendError("Lỗi cơ sở dữ liệu: " . $e->getMessage(), 500);
    }
}

function deleteBook()
{
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? ($_GET['id'] ?? null);

    if (!$id || !is_numeric($id) || $id <= 0) sendError("ID sách không hợp lệ", 400);

    try {
        $stmt = $pdo->prepare("DELETE FROM books WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            sendSuccess(["message" => "Xóa sách thành công"]);
        } else {
            sendError("Không tìm thấy sách", 404);
        }
    } catch (PDOException $e) {
        sendError("Lỗi cơ sở dữ liệu: " . $e->getMessage(), 500);
    }
}

// admin/bookAdmin.php
function getAllCategories()
{
    global $pdo;
    $stmt = $pdo->query("SELECT DISTINCT category FROM books WHERE category IS NOT NULL AND category != '' ORDER BY category ASC");
    $cats = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
    echo json_encode(['success' => true, 'data' => $cats]);
    exit;
}
