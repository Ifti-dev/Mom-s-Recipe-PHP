<?php 
header('Content-Type: application/json');
include("../includes/database.php");

if(!empty($_POST)){
    $username = $_POST["username"];
    $email = $_POST["user-email"];
    $password = $_POST["password"];
    $fullname = $_POST["user-fullname"];

    
    try{
        $sql = "INSERT INTO users(username, email,fullname, password) VALUES('$username','$email','$fullname','$password')";
        mysqli_query($conn,$sql);
        echo json_encode(["status" => "success"]);
    }
    catch(mysqli_sql_exception){
        echo json_encode(["status" => "error", "message" => "User already exists"]);
    }
    
}
else{
    echo json_encode(["status" => "failed"]);
}

mysqli_close($conn);
?>