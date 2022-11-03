<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Wisdomex";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));


$Lesson_Name = mysqli_real_escape_string($conn, trim($data->lesson_name));
$subject_code = mysqli_real_escape_string($conn, trim($data->subject_code));

$sql = "SELECT `Content`
        FROM `NOTES`
        WHERE `Lesson_Name` = '$Lesson_Name'
        AND Subject_Code = $subject_code";


$result = $conn->query($sql);
$response = array();

while($row = mysqli_fetch_assoc($result)){
   $response[] = base64_encode($row["Content"]);
}

echo json_encode($response);


$conn->close();

?>