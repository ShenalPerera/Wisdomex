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
$option1 = mysqli_real_escape_string($conn, trim($data->option1));
$option2 = mysqli_real_escape_string($conn, trim($data->option2));
$option3 = mysqli_real_escape_string($conn, trim($data->option3));
$option4 = mysqli_real_escape_string($conn, trim($data->option4));
$answer = (int)mysqli_real_escape_string($conn, trim($data->answer));
$paper_id = mysqli_real_escape_string($conn, trim($data->paper_id));

$sql = "INSERT INTO `MCQ`
         (`Paper_ID`,`Question`,`Correct_Answer`,`Option1`,`Option2`,`Option3`, `Option4`)
         VALUES('$paper_id','$question',$answer,'$option1','$option2','$option3','$option4')";


if ($conn->query($sql) === TRUE){
   echo "MCQ Added Successfully" ;
}
else{
    http_response_code(201);
    echo "Cannot Add MCQ";
}


$conn->close();

?>