<?php
require_once __DIR__ . '/../config.php';
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

// Helper: Đọc biến dù gửi bằng FormData hay JSON
function getField($key, $default = '')
{
    if (isset($_POST[$key])) return trim((string)$_POST[$key]);
    if (isset($_GET[$key])) return trim((string)$_GET[$key]);
    // Đọc 1 lần rồi dùng lại để không bị "empty string" vì php://input chỉ đọc được 1 lần
    static $json = null;
    if ($json === null) $json = json_decode(true);
    return trim(isset($json[$key]) ? (string)$json[$key] : $default);
}



// 4. Lấy tất cả event
function getAllEventsAdmin()
{
    global $pdo;
    try {
        $stmt = $pdo->query("SELECT * FROM events ORDER BY date DESC, id DESC");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $baseUrl = 'http://localhost:8080/bookiboo/Backend/';
        foreach ($events as &$event) {
            if (!empty($event['image_url']) && !str_starts_with($event['image_url'], 'http')) {
                $event['image_url'] = $baseUrl . str_replace('\\', '/', $event['image_url']);
            }
            if (!empty($event['speaker_avatar']) && !str_starts_with($event['speaker_avatar'], 'http')) {
                $event['speaker_avatar'] = $baseUrl . str_replace('\\', '/', $event['speaker_avatar']);
            }
        }
        sendEventSuccess($events);
    } catch (PDOException $e) {
        sendEventError('Lỗi khi truy vấn cơ sở dữ liệu', 500);
    }
}

// 5. Lấy chi tiết 1 event
function getEventDetailAdmin($id)
{
    global $pdo;
    try {
        if (!is_numeric($id) || $id <= 0) sendEventError("ID event không hợp lệ", 400);
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($event) {
            $baseUrl = 'http://localhost:8080/bookiboo/Backend/';
            if (!empty($event['image_url']) && !str_starts_with($event['image_url'], 'http')) {
                $event['image_url'] = $baseUrl . str_replace('\\', '/', $event['image_url']);
            }
            if (!empty($event['speaker_avatar']) && !str_starts_with($event['speaker_avatar'], 'http')) {
                $event['speaker_avatar'] = $baseUrl . str_replace('\\', '/', $event['speaker_avatar']);
            }
            sendEventSuccess($event);
        } else {
            sendEventError("Không tìm thấy event", 404);
        }
    } catch (PDOException $e) {
        sendEventError("Lỗi cơ sở dữ liệu", 500);
    }
}

// 6. Thêm event mới
function addEventAdmin()
{
    global $pdo;
    try {
        $title = trim($_POST['title'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $date = trim($_POST['date'] ?? '');
        $location = trim($_POST['location'] ?? '');
        $author = trim($_POST['author'] ?? '');
        $speaker_name = trim($_POST['speaker_name'] ?? '');

        if (!$title || !$description || !$date || !$location || !$author) {
            sendEventError("Thiếu thông tin bắt buộc", 400);
        }

        // Xử lý upload ảnh
        $image_url = '';
        $speaker_avatar = '';
        try {
            $image_url = handleImageUpload('image_url');
        } catch (Exception $ex) {
            if (isset($_FILES['image_url']) && $_FILES['image_url']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendEventError($ex->getMessage(), 400);
            }
        }
        try {
            $speaker_avatar = handleImageUpload('speaker_avatar');
        } catch (Exception $ex) {
            if (isset($_FILES['speaker_avatar']) && $_FILES['speaker_avatar']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendEventError($ex->getMessage(), 400);
            }
        }

        $stmt = $pdo->prepare("INSERT INTO events (title, description, date, image_url, location, speaker_name, speaker_avatar, author, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $title,
            $description,
            $date,
            $image_url,
            $location,
            $speaker_name,
            $speaker_avatar,
            $author
        ]);
        sendEventSuccess(["message" => "Thêm event thành công"], 201);
    } catch (PDOException $e) {
        sendEventError("Lỗi server: " . $e->getMessage(), 500);
    }
}

// 7. Sửa event
function updateEventAdmin()
{
    global $pdo;
    try {
        $id = getField('id', null);
        $id = isset($_POST['id']) ? $_POST['id'] : (isset($_GET['id']) ? $_GET['id'] : null);
        if (!$id || !is_numeric($id) || $id <= 0) sendEventError("Thiếu hoặc ID event không hợp lệ", 400);
        $title = getField('title');
        $description = getField('description');
        $date = getField('date');
        $location = getField('location');
        $author = getField('author');
        $speaker_name = getField('speaker_name');

        if (!$id || !is_numeric($id) || $id <= 0) sendEventError("Thiếu hoặc ID event không hợp lệ", 400);

        // Lấy event cũ để giữ lại ảnh nếu không upload mới
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$id]);
        $oldEvent = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$oldEvent) sendEventError("Không tìm thấy event", 404);

        $setClauses = [];
        $params = [];

        if ($title) {
            $setClauses[] = "title = ?";
            $params[] = $title;
        }
        if ($description) {
            $setClauses[] = "description = ?";
            $params[] = $description;
        }
        if ($date) {
            $setClauses[] = "date = ?";
            $params[] = $date;
        }
        if ($location) {
            $setClauses[] = "location = ?";
            $params[] = $location;
        }
        if ($speaker_name !== null) {
            $setClauses[] = "speaker_name = ?";
            $params[] = $speaker_name;
        }
        if ($author) {
            $setClauses[] = "author = ?";
            $params[] = $author;
        }

        // Upload ảnh mới nếu có
        try {
            $image_url = handleImageUpload('image_url');
            if ($image_url) {
                $setClauses[] = "image_url = ?";
                $params[] = $image_url;
            }
        } catch (Exception $ex) {
            if (isset($_FILES['image_url']) && $_FILES['image_url']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendEventError($ex->getMessage(), 400);
            }
        }
        try {
            $speaker_avatar = handleImageUpload('speaker_avatar');
            if ($speaker_avatar) {
                $setClauses[] = "speaker_avatar = ?";
                $params[] = $speaker_avatar;
            }
        } catch (Exception $ex) {
            if (isset($_FILES['speaker_avatar']) && $_FILES['speaker_avatar']['error'] !== UPLOAD_ERR_NO_FILE) {
                sendEventError($ex->getMessage(), 400);
            }
        }

        if (!$setClauses) sendEventError("Không có dữ liệu nào để cập nhật", 400);

        $sql = "UPDATE events SET " . implode(", ", $setClauses) . " WHERE id = ?";
        $params[] = $id;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            sendEventSuccess(["message" => "Cập nhật sự kiện thành công"]);
        } else {
            sendEventError("Không tìm thấy sự kiện hoặc không có thay đổi", 404);
        }
    } catch (PDOException $e) {
        sendEventError("Lỗi cơ sở dữ liệu: " . $e->getMessage(), 500);
    }
}

// 8. Xóa event
function deleteEventAdmin()
{
    global $pdo;
    // Lấy id từ POST
    $id = isset($_POST['id']) ? $_POST['id'] : (isset($_GET['id']) ? $_GET['id'] : null);

    if (!$id || !is_numeric($id) || $id <= 0) sendEventError("ID event không hợp lệ", 400);

    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            sendEventSuccess(["message" => "Xóa sự kiện thành công"]);
        } else {
            sendEventError("Không tìm thấy sự kiện", 404);
        }
    } catch (PDOException $e) {
        sendEventError("Lỗi cơ sở dữ liệu: " . $e->getMessage(), 500);
    }
}