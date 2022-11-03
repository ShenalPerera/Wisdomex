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
 

$Email = mysqli_real_escape_string($conn, trim($data->Email));
$Password = mysqli_real_escape_string($conn, trim($data->Password));


// $last_name = mysqli_real_escape_string($conn, trim($data->last_name));
// $email = mysqli_real_escape_string($conn, trim($data->email));
// $gender = mysqli_real_escape_string($conn, trim($data->gender));
// $phone_number = mysqli_real_escape_string($conn, trim($data->phone_number));
// $teacher_type = mysqli_real_escape_string($conn, trim($data->teacher_type));

$sql = "SELECT Teacher_ID, Email,Passcode
        FROM TEACHER,TEACHER_REG
        WHERE Email = '$Email' AND Passcode='$Password'
        AND TEACHER_REG.ID = TEACHER.Teacher_ID";


$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "Invalid username or password";
    http_response_code(200);
 }

else if($result->num_rows == 1){
     $response = array();

     while($row = mysqli_fetch_assoc($result)){
        $response[] = $row;
     }

     echo json_encode($response);
     http_response_code(202);
}
else{
  echo "Error";
}

$conn->close();

?>













