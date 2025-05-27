<?php
require_once "config.php";

function getDashboard()
{
    global $pdo;

    $stats = [];

    $stats['total_books'] = $pdo->query("SELECT COUNT(*) FROM books")->fetchColumn();
    $stats['total_users'] = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $stats['total_orders'] = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $stats['total_sales'] = $pdo->query("SELECT SUM(total_price) FROM orders")->fetchColumn();

    echo json_encode($stats);
}
