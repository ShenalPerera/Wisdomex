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
 

$id = mysqli_real_escape_string($conn, trim($data->id));

$sql = "SELECT STUDENT.Student_ID, STUDENT.First_Name 
        FROM PARENT, STUDENT 
        WHERE STUDENT.Parent_ID = PARENT.Parent_ID 
        AND $id = PARENT.Parent_ID" ;



$result = $conn->query($sql);
$response = array();

while($row = mysqli_fetch_assoc($result)){
   $response[] = $row;
}

echo json_encode($response);

$conn->close();

?>