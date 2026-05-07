<?php
    include("../includes/database.php");
    session_start();
    try{
        if(!isset($_SESSION["user_id"]))
            echo json_encode(["status" => "erroooorrrr"]);
        $query = "SELECT * FROM users WHERE id = $_SESSION[user_id]";
        $response = mysqli_query($conn, $query);
        
        if(mysqli_num_rows($response) != 0){
            $result = mysqli_fetch_assoc($response);
            echo json_encode(["status" => "success","user_id" => $result["id"], "username" => $result["username"], "fullname" => $result["fullname"],"email" => $result["email"], "password" => $result["password"]]);
        }
    }
    catch(mysqli_sql_exception $e){
        echo $e->getMessage();
    }
    

?>