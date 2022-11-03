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
 

$student_id = mysqli_real_escape_string($conn, trim($data->student_id));

$sql = "SELECT Subject_Name ,Paper_Name , GRADES.Grade
        FROM PAPER,GRADES,SUBJECT_,STUDENT
       
        where Student.Student_ID = GRADES.Student_ID AND GRADES.Paper_ID = PAPER.Paper_ID and PAPER.Subject_Code = SUBJECT_.Subject_Code
        AND '$student_id' = STUDENT.Student_ID" ;



$result = $conn->query($sql);
$response = array();

while($row = mysqli_fetch_assoc($result)){
   $response[] = $row;
}

echo json_encode($response);

$conn->close();

?>