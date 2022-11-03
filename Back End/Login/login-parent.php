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


$sql = "SELECT Parent_ID, Email,Passcode
        FROM PARENT,PARENT_REG
        WHERE Email = '$Email' AND Passcode='$Password'
        AND PARENT_REG.ID = PARENT.Parent_ID";
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