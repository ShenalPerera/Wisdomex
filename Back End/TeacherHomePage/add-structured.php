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

$question = mysqli_real_escape_string($conn, trim($data->question));
$paper_id = mysqli_real_escape_string($conn, trim($data->paper_id));

$sql = "INSERT INTO `STRUCTURED`
         (`Paper_ID`,`Question`)
         VALUES('$paper_id','$question')";


if ($conn->query($sql) === TRUE){
   echo "Structured Added Successfully" ;
}
else{
    http_response_code(201);
    echo "Cannot Add Structured";
}


$conn->close();

?>