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

$id = mysqli_real_escape_string($conn, trim($data->id));

$student_name = mysqli_real_escape_string($conn, trim($data->student_name));
$student_email = mysqli_real_escape_string($conn, trim($data->student_email));



$sql = "SELECT `Student_ID` 
        FROM `STUDENT`
        WHERE '$student_email' = Email AND Parent_ID IS NULL";
    
$result = $conn->query($sql);
//affected

if($result->num_rows == 1){
    $sql = "UPDATE STUDENT SET `Parent_ID`= 
            (SELECT Parent_ID
            FROM PARENT
            WHERE Parent_ID=$id)
            WHERE STUDENT.Email ='$student_email' AND First_Name = '$student_name'";
    
    if($conn->query($sql) === TRUE){
        echo "User Added Successfully";
        http_response_code(200);
    }
}    
else{
    echo "not succesfull";
    http_response_code(201);
}

$conn->close();

?>













