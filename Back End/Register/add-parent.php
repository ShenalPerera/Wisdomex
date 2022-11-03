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

$name = mysqli_real_escape_string($conn, trim($data->name));
$email = mysqli_real_escape_string($conn, trim($data->email));
$phone_number = mysqli_real_escape_string($conn, trim($data->phone_number));
$password = mysqli_real_escape_string($conn, trim($data->password));

$sql = "SELECT Email FROM PARENT WHERE Email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $sql = "INSERT INTO `PARENT`(`Parent_Name`, `Email`, `Phone_Number`) 
    VALUES('$name', '$email', '$phone_number')";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "INSERT INTO `PARENT_REG` VALUES ('$password','$last_id')";
        if($conn->query($sql)){
            echo "User Added Successfully";
            http_response_code(201);
        }
        
    }
    else {
        echo "Cannot add user";
        http_response_code(200);
    }
} 

else {
    echo "already exists";
    http_response_code(200);
}
$conn->close();















