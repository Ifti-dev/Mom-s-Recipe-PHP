<?php
    include("../includes/database.php");
    header("Content-Type: application/json");

    if(!empty($_POST)){
        $img = $_POST["recipe-form-file"];
        if(!empty($_FILES["recipe-form-file"])){

            $target_dir = "../assets/user-uploads/";
            
            $file_name = time() . "_" . basename($_FILES["recipe-form-file"]["name"]);
            $target_file_loc = $target_dir . $file_name;

            if(move_uploaded_file($_FILES["recipe-form-file"]["tmp_name"], $target_file_loc)){
                // $query = "INSERT INTO recipe_list(user_id, username, slug) VALUE()";
                echo json_encode(["status" => "success"]);
            }
             
            else{
                echo json_encode(["status" => "failed"]);
            }
        }


    }
?>