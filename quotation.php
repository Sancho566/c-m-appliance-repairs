<?php
// Only allow POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method Not Allowed");
}

// Sanitize inputs
$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$location = trim($_POST["location"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$appliance = trim($_POST["applianceType"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validate required fields
if (!$name || !$email || !$location || !$phone || !$appliance || !$message) {
    exit("Please fill in all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// Email settings
$to = "info@primefix.co.za";
$subject = "New Quotation Request - PrimeFix";

// Email body
$body = "
New quotation request:

Name: $name
Email: $email
Phone: $phone
Location: $location
Appliance Type: $appliance

Message:
$message
";

// Headers
$headers = "From: PrimeFix Website <no-reply@primefix.co.za>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// Send mail
if (mail($to, $subject, $body, $headers)) {
    // Success page
    header("Location: thank-you.html");
    exit();
} else {
    echo "Message failed to send. Please try again later.";
}
?>
