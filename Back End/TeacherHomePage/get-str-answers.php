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


$paper_id = mysqli_real_escape_string($conn, trim($data->paper_id));
$student_id = mysqli_real_escape_string($conn, trim($data->student_id));
$subject_code=mysqli_real_escape_string($conn, trim($data->subject_code));

$sql = "SELECT ANSWERING_STRUCTURED.Question_ID,Question,Student_Answer
        FROM ANSWERING_STRUCTURED,STRUCTURED
        WHERE ANSWERING_STRUCTURED.Question_ID= STRUCTURED.Question_ID  AND Student_id='$student_id' AND
        Paper_ID ='$paper_id'";

$result = $conn->query($sql);

$response = array();

while($row = mysqli_fetch_assoc($result)){
   $response[] = $row;
}

echo json_encode($response);


$conn->close();

?>