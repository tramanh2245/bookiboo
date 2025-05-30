<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userText = $data['prompt'] ?? '';

$apiKey = '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';
$url = "https://openrouter.ai/api/v1/chat/completions";

$postData = [
    "model" => "meta-llama/llama-3-8b-instruct",
    "messages" => [
        ["role" => "user", "content" => $userText]
    ]
];

$headers = [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

if ($result === false) {
    echo json_encode(["error" => "Curl error: " . $curlError]);
    exit;
}

http_response_code($httpCode);
echo $result;
