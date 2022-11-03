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

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from Front End
$data = json_decode(file_get_contents("php://input"));

$id = (int)mysqli_real_escape_string($conn, trim($data->id));

$sub_name = mysqli_real_escape_string($conn, trim($data->sub_name));

$sql = "INSERT INTO `SUBJECT_`(`Subject_Name`, `Subject_Type`) 
        SELECT '$sub_name',Teacher_Type
        FROM TEACHER 
        WHERE Teacher_ID =$id";

// $result = $conn->query($sql);
if ($conn->query($sql) === TRUE){
    $last_id = $conn->insert_id;
    http_response_code(201);
    $sql = "INSERT INTO `TEACH`(`Teacher_ID`,`Subject_Code`)
            SELECT Teacher_ID,'$last_id'
            FROM TEACHER
            WHERE Teacher_ID =$id";
    if($conn->query($sql) === TRUE){
        echo "Subject Added Successfully";
        http_response_code(200);
    }
    

}

$conn->close();















