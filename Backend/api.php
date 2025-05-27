<?php
// api.php — Main router

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once "./config.php";
include_once "./models/authModel.php";
require_once './models/bookModel.php';
require_once './models/orderModel.php';
require_once './models/userModel.php';
include_once "./helpers/authMiddleware.php";
include_once "./helpers/jwtUtils.php";
require_once __DIR__ . '/models/eventModel.php'; // Đảm bảo eventModel được require sớm

$resource = $_GET['resource'] ?? '';
$action = $_GET['action'] ?? '';

// AUTH routes
if ($resource === 'auth') {
    if ($action === 'register') register();
    if ($action === 'login') login();
    exit;
}

// EVENT routes
if ($resource === 'event' && $action === 'getAll') {
    $events = getAllEvents();
    echo json_encode($events);
    exit;
}
if ($resource === 'event' && $action === 'getDetail' && isset($_GET['id'])) {
    $event = getEventDetail($_GET['id']);
    echo json_encode($event);
    exit;
}

// Các route còn lại
switch ("$resource|$action") {
    // ADMIN
    case 'admin|getBooks':
        require_once "admin/bookAdmin.php";
        if (isset($_GET['id'])) {
            getBook($_GET['id']);
        } else {
            getBooks();
        }
        break;

    case 'admin|addBook':
        require_once "admin/bookAdmin.php";
        addBook();
        break;

    case 'admin|updateBook':
        require_once "admin/bookAdmin.php";
        $_SERVER['REQUEST_METHOD'] = 'PUT';
        updateBook();
        break;

    case 'admin|deleteBook':
        require_once "admin/bookAdmin.php";
        $_SERVER['REQUEST_METHOD'] = 'DELETE';
        deleteBook();
        break;

    case 'admin|getAllCategories':
        require_once "admin/bookAdmin.php";
        getAllCategories();
        break;

    case 'admin|getDashboard':
        require_once "admin/dashboard.php";
        getDashboard();
        break;

    case 'admin|getUsers':
        require_once "admin/userAdmin.php";
        getAllUsers();
        break;

    case 'admin|getUserDetail':
        require_once "admin/userAdmin.php";
        getUserDetail($_GET['id'] ?? null);
        break;

    case 'admin|addUser':
        require_once "admin/userAdmin.php";
        addUser();
        break;

    case 'admin|updateUser':
        require_once "admin/userAdmin.php";
        updateUser();
        break;

    case 'admin|deleteUser':
        require_once "admin/userAdmin.php";
        deleteUser();
        break;

    case 'admin|getOrders':
        require_once "admin/orderAdmin.php";
        getAllOrders();
        break;

    case 'admin|updateOrderStatus':
        require_once "admin/orderAdmin.php";
        updateOrderStatus();
        break;

    case 'admin|deleteOrder':
        require_once "admin/orderAdmin.php";
        deleteOrder();
        break;

    //event
    // EVENT ADMIN (CRUD)
    case 'admin|getEvents':
        require_once "admin/eventAdmin.php";
        getAllEventsAdmin();
        break;

    case 'admin|getEventDetail':
        require_once "admin/eventAdmin.php";
        getEventDetailAdmin($_GET['id'] ?? null);
        break;

    case 'admin|addEvent':
        require_once "admin/eventAdmin.php";
        addEventAdmin();
        break;

    case 'admin|updateEvent':
        require_once "admin/eventAdmin.php";
        updateEventAdmin();
        break;

    case 'admin|deleteEvent':
        require_once "admin/eventAdmin.php";
        deleteEventAdmin();
        break;

    // USER
    case 'user|getBooks':
        require_once "user/bookUser.php";
        getBooksForUser();
        break;

    case 'user|getBookDetail':
        require_once "user/bookUser.php";
        getBookDetail();
        break;

    case 'user|getBooksByCategory':
        require_once "user/bookUser.php";
        getBooksByCategoryForUser();
        break;

    case 'user|placeOrder':
        require_once "user/orderUser.php";
        placeOrder();
        break;

    case 'user|getOrders':
        require_once "user/orderUser.php";
        getUserOrders();
        break;

    case 'user|getProfile':
        require_once "user/profile.php";
        getUserProfile();
        break;

    case 'user|updateProfile':
        require_once "user/profile.php";
        updateUserProfile();
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Invalid route"]);
        break;
}
