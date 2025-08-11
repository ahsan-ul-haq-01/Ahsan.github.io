<?php
// Feedback/save_feedback.php
// Save POSTed feedback into Feedback/feedback_data.txt and redirect back

// Ensure script runs in the Feedback folder
$feedbackDir = __DIR__;
if (!is_dir($feedbackDir)) {
    mkdir($feedbackDir, 0755, true);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // sanitize inputs
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Basic sanitization to avoid newlines injection in headers
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    $entry  = "---- Feedback Entry ----\n";
    $entry .= "Date: " . date("Y-m-d H:i:s") . "\n";
    $entry .= "Name: $name\n";
    $entry .= "Email: $email\n";
    $entry .= "Phone: $phone\n";
    $entry .= "Message:\n$message\n";
    $entry .= "------------------------\n\n";

    $filePath = $feedbackDir . DIRECTORY_SEPARATOR . 'feedback_data.txt';

    if (file_put_contents($filePath, $entry, FILE_APPEND | LOCK_EX) !== false) {
        // redirect back to top-level index (one directory up)
        header("Location: ../index.php?success=1");
        exit;
    } else {
        echo "Error saving feedback. Please check folder permissions.";
    }

} else {
    echo "Invalid request method.";
}
?>
