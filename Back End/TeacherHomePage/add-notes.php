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

$lesson_name = $_POST["lesson_name"];
$subject_code = (int)$_POST["subject_code"];

if(!empty($_FILES["file"]["name"])) {
    // Get file info
    $fileName = basename($_FILES["file"]["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

    // Allow certain file formats
    $allowTypes = array('pdf');

    if(in_array($fileType, $allowTypes)){
        $image = $_FILES['file']['tmp_name'];
        $imgContent = addslashes(file_get_contents($image));
        // echo $imgContent;
        // // Insert image content into database
        $insert = $conn->query("INSERT INTO `NOTES` VALUES ('$lesson_name', '$subject_code' , '$imgContent')");
//
        if($insert){
            $status = 'success';
            $statusMsg = "File uploaded successfully.";
        }else{
            $statusMsg = "File upload failed, please try again.";
            http_response_code(202);
        }
    }else{
        $statusMsg = 'Sorry, only PDF files are allowed to upload.';
        http_response_code(203);
    }
}else{
    $statusMsg = 'Please select a pdf file to upload.';
    http_response_code(204);
}

// echo $statusMsg;


$conn->close();

?>