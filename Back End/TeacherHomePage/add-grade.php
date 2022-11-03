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


$grade = (float)mysqli_real_escape_string($conn, trim($data->grade));
$student_id =mysqli_real_escape_string($conn, trim($data->student_id));
$paper_id=mysqli_real_escape_string($conn, trim($data->paper_id));
$sql = "INSERT INTO `STR_GRADE`
         VALUES('$paper_id','$student_id','$grade')";


if ($conn->query($sql) === TRUE){
   echo "Grade Added Successfully" ;
   http_response_code(200);
}
else{
    http_response_code(201);
    echo "Cannot Add Grade";
}


$conn->close();

?>