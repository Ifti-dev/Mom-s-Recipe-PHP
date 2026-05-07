<?php 
    session_start();
    include("../includes/database.php");

    try{
        if(!empty($_SESSION["user_id"])){
            $fullname = $_POST['my-profile-fullname'];
            $email = $_POST['my-profile-email'];
            $id = $_SESSION['user_id'];
            $query = "UPDATE users SET fullname = '$fullname', email = '$email' WHERE id = $id";
            mysqli_query($conn, $query);
            echo json_encode(["status" => "success"]);
        }

    }
    catch(mysqli_sql_exception $e){
        echo $e->getMessage();
    }

?>