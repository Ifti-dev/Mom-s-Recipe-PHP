<?php 
header('Content-Type: application/json');
include("../includes/database.php");
session_start();

if(!empty($_POST)){
    $username = $_POST["username-email-login"];
    $email = $_POST["user-email"];
    $password = $_POST["password-login"];

    
    try{
        $sql = "SELECT * FROM users WHERE username = '$username' OR email = '$username'";
        $result = mysqli_query($conn,$sql);
        $user = mysqli_fetch_assoc($result);
        if(mysqli_num_rows($result) != 0){
            if($user["password"] == $password){
                $_SESSION["user_id"] = $user["id"];
                $_SESSION["username"] = $user["username"];
                $_SESSION["login_time"] = time();
                // $_SESSION["user_role"] = $user["role"]; add it later for authorization
                echo json_encode(["status" => "success"]);

                // header("Location:../dashboard.php"); its not possible cause its sending data to frontend
            }
            else{
                echo json_encode(["status" => "error", "message" => "Password didn't match"]);
            }
        }
        else{
            echo json_encode(["status" => "error", "message" => "User doesn't exists22"]);    
        }
     
        
    }
    catch(mysqli_sql_exception $e){
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        //if there is any database error it will catch it
    }
    
}
else{
    echo json_encode(["status" => "failed"]);
}

mysqli_close($conn);
?>