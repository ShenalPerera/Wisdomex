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

$first_name = mysqli_real_escape_string($conn, trim($data->first_name));
$mid_name = mysqli_real_escape_string($conn, trim($data->mid_name));
$last_name = mysqli_real_escape_string($conn, trim($data->last_name));
$email = mysqli_real_escape_string($conn, trim($data->email));
$age = mysqli_real_escape_string($conn, trim($data->age));
$grade_or_year = mysqli_real_escape_string($conn, trim($data->grade_or_year));
$gender = mysqli_real_escape_string($conn, trim($data->gender));
$phone_number = mysqli_real_escape_string($conn, trim($data->phone_number));
$student_type = mysqli_real_escape_string($conn, trim($data->student_type));
$password = mysqli_real_escape_string($conn, trim($data->password));
$grade = 'NULL';
$year = 'NULL';

if($student_type == "SCL"){
    $grade = (int)$grade_or_year;
}
else{
    $year = (int)$grade_or_year;
}


$sql = "SELECT Email FROM STUDENT WHERE Email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    $sql = "INSERT INTO `STUDENT`(`First_Name`,`Mid_Name`,`Last_Name`,`Email`,`Gender`,`Age`, `Phone_Number`, `Student_Type`,`Grade`, `Year`) 
    VALUES('$first_name','$mid_name','$last_name','$email','$gender','$age','$phone_number','$student_type', $grade, $year)";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        $sql = "INSERT INTO `STUDENT_REG` VALUES ('$password','$last_id')";
        if($conn->query($sql)){
            echo "User Added Successfully";
            http_response_code(201);
        }
        
    }
    else {
        echo "Cannot add user";
        http_response_code(200);
    }
} 

else {
    echo "already exists";
    http_response_code(200);
}
$conn->close();















