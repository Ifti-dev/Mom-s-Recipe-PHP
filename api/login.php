<?php 
header('Content-Type: application/json');
include("../includes/database.php");

if(!empty($_POST)){
    $username = $_POST["username-email-login"];
    $email = $_POST["user-email"];
    $password = $_POST["password-login"];

    
    try{
        $sql = "SELECT * FROM users WHERE username = '$username' OR email = '$username'";
        $result = mysqli_query($conn,$sql);
        $user = mysqli_fetch_assoc($result);

        if($user["password"] == $password){
            echo json_encode(["status" => "success"]);
            // header("Location:../dashboard.php"); its not possible cause its sending data to frontend
        }
        else{
            echo json_encode(["status" => "error", "message" => "Password didn't match"]);
        }
        
    }
    catch(mysqli_sql_exception){
        echo json_encode(["status" => "error", "message" => "User doesn't exists"]);
    }
    
}
else{
    echo json_encode(["status" => "failed"]);
}

mysqli_close($conn);
?>