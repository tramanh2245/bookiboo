<?php
require_once __DIR__ . '/../config.php';

// Helper response JSON cho admin
function sendEventSuccess($data = [], $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}
function sendEventError($message = 'Error', $statusCode = 400)
{
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// Helper xử lý image_url tuyệt đối
function toAbsoluteImageUrl($url)
{
    $basePath = 'http://localhost:8080/bookiboo/Backend/';
    if ($url && !str_starts_with($url, 'http')) {
        return $basePath . $url;
    }
    return $url;
}

// Lấy tất cả sự kiện
function getAllEvents()
{
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM events ORDER BY date ASC");
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($events as &$event) {
        $event['image_url'] = toAbsoluteImageUrl($event['image_url']);
        $event['speaker_avatar'] = toAbsoluteImageUrl($event['speaker_avatar']);
    }
    return $events;
}

// Lấy chi tiết 1 sự kiện
function getEventDetail($id)
{
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
    $stmt->execute([$id]);
    $event = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($event) {
        $event['image_url'] = toAbsoluteImageUrl($event['image_url']);
        $event['speaker_avatar'] = toAbsoluteImageUrl($event['speaker_avatar']);
    }
    return $event;
}

// Thêm sự kiện mới
function addEvent()
{
    global $pdo;
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $date = trim($_POST['date'] ?? '');
    $image_url = trim($_POST['image_url'] ?? '');
    $location = trim($_POST['location'] ?? '');
    $speaker_name = trim($_POST['speaker_name'] ?? '');
    $speaker_avatar = trim($_POST['speaker_avatar'] ?? '');
    $author = trim($_POST['author'] ?? '');

    // Validate
    if (!$title || !$description || !$date || !$location || !$author) {
        sendEventError("Thiếu thông tin bắt buộc");
    }
    try {
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
        sendEventSuccess(["message" => "Thêm sự kiện thành công"], 201);
    } catch (PDOException $e) {
        sendEventError("Lỗi thêm sự kiện: " . $e->getMessage(), 500);
    }
}

// Sửa sự kiện
function updateEvent()
{
    global $pdo;
    $id = getField('id', null); // <-- Sửa dòng này
    if (!$id || !is_numeric($id)) sendEventError("ID không hợp lệ");

    $fields = [];
    $params = [];

    foreach (['title', 'description', 'date', 'image_url', 'location', 'speaker_name', 'speaker_avatar', 'author'] as $field) {
        $value = getField($field, null); // <-- Đổi sang lấy từ getField
        if ($value !== null) {
            $fields[] = "$field = ?";
            $params[] = $value;
        }
    }
    if (!$fields) sendEventError("Không có dữ liệu để cập nhật", 400);

    $params[] = $id;
    $sql = "UPDATE events SET " . implode(', ', $fields) . " WHERE id = ?";
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        sendEventSuccess(["message" => "Cập nhật sự kiện thành công"]);
    } catch (PDOException $e) {
        sendEventError("Lỗi cập nhật sự kiện: " . $e->getMessage(), 500);
    }
}


// Xóa sự kiện
function deleteEvent()
{
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? ($_GET['id'] ?? null);

    if (!$id || !is_numeric($id)) sendEventError("ID không hợp lệ");

    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            sendEventSuccess(["message" => "Xóa sự kiện thành công"]);
        } else {
            sendEventError("Không tìm thấy sự kiện", 404);
        }
    } catch (PDOException $e) {
        sendEventError("Lỗi xóa sự kiện: " . $e->getMessage(), 500);
    }
}