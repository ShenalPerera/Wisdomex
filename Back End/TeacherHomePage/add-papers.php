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

$paper_name = mysqli_real_escape_string($conn, trim($data->paper_name));
$subject_code = mysqli_real_escape_string($conn, trim($data->subject_code));

$sql = "INSERT INTO `PAPER`
         (`Paper_Name`,`Subject_Code`)
         VALUES('$paper_name',$subject_code)";


if ($conn->query($sql) === TRUE){
   echo "Paper Added Successfully" ;
}
else{
    http_response_code(201);
    echo "Cannot Add Paper";
}


$conn->close();

?>