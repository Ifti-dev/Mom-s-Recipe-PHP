<?php 
    session_start();
    include("../includes/database.php");
    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data,true);
    try{
        if(!empty($_SESSION["user_id"])){
            
            $user_id = $_SESSION['user_id'];
            $recipe_id = $data['recipe_id'];
            $parent_comment_id = $data['parent_id'];
            $comment = $data['comment'];
            if($parent_comment_id == "" or $parent_comment_id == null)
                $query = "INSERT INTO comment_reply(recipe_id,user_id,comment) VALUES('$recipe_id','$user_id','$comment')";
            else
                $query = "INSERT INTO comment_reply(recipe_id,user_id,parent_comment_id,comment) VALUES('$recipe_id','$user_id','$parent_comment_id','$comment')";
            
            mysqli_query($conn, $query);
            echo json_encode(["status" => "success", "p_id"=> "$parent_comment_id"]);
        }

    }
    catch(mysqli_sql_exception $e){
        echo $e->getMessage();
    }

?>