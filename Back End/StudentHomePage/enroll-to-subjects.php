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
$Subject_code = mysqli_real_escape_string($conn, trim($data->sub_code));


$sql = "INSERT INTO `ENROL` (`Student_ID`,`Subject_Code`,`Enrol_Date`)
        SELECT Student_ID,'$Subject_code',CURDATE()
        FROM STUDENT
        WHERE Student_ID='$id'";


if ($conn->query($sql) == TRUE) {
    echo "Succesfully Enrolled";
    http_response_code(200);
 } 


else{
  echo "Error";
}
$conn->close();

?>