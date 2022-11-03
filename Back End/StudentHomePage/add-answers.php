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

$mcq_answers = $data->mcq_answers;
$str_answers = $data->str_answers;
$student_id = (int)$data->student_id;
$paper_id = (int)$data->paper_id;


foreach ($mcq_answers as $answer){
    $qnum = (int)$answer->q_num;
    $answer = (int)$answer->value;
    $sql = "INSERT INTO `ANSWERING_MCQ`
             (`Student_ID`,`Question_ID`,`Student_Answer`)
             VALUES($student_id,$qnum,$answer)";


    if ($conn->query($sql) === TRUE){

    }

    else{
        echo "Cannot Add Answer";
    }
}

foreach ($str_answers as $answer_){

    $qnum = (int)$answer_->q_num;
    $answer = $answer_->value;

    echo $qnum;
    echo $answer;
    $sql = "INSERT INTO `ANSWERING_STRUCTURED`
             (`Student_ID`,`Question_ID`,`Student_Answer`)
             VALUES($student_id,$qnum,'$answer')";


    if ($conn->query($sql) === TRUE){

    }

    else{
        echo "Cannot Add Answer";
    }
}


$correct_ans = array();
$my_ans =array();
$sql = "SELECT Question_ID,Correct_Answer
        FROM MCQ
        WHERE Paper_ID ='$paper_id' ";

$result = $conn->query($sql);
$index =0;
while($row = mysqli_fetch_assoc($result)){
    $correct_ans[$row['Question_ID']]=$row['Correct_Answer'];
    ksort($correct_ans);
    $index++;

}

print_r($my_ans);

$sql = "SELECT Question_ID,Student_Answer
        FROM ANSWERING_MCQ
        WHERE Student_ID='$student_id' AND Question_ID IN
        (SELECT Question_ID FROM MCQ WHERE MCQ.Paper_ID='$paper_id')";

$result = $conn->query($sql);

while($row = mysqli_fetch_assoc($result)){
    $my_ans[$row['Question_ID']]=$row['Student_Answer'];
    ksort($correct_ans);

}


$wrong = count(array_diff_assoc($correct_ans,$my_ans));
$correct = $index - $wrong;
$grade = $correct/$index *100.00;
$sql = "INSERT INTO `GRADES`
        VALUES ('$paper_id','$student_id','$grade')";


if ($conn->query($sql) === TRUE){
   echo "Successfull" ;
}
else{
    echo "Cannot Add";
}




$conn->close();

?>