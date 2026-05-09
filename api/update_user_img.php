<?php 
    session_start();
    include("../includes/database.php");

    try{

        function upload_img(){
            if(!empty($_FILES["profile-pic-file-input"])){
                $target_folder = "../assets/user-images/";
                $file_name = time() . "_" . basename($_FILES["profile-pic-file-input"]["name"]);
                $target_file_loc = $target_folder . $file_name;
                if(move_uploaded_file($_FILES["profile-pic-file-input"]["tmp_name"], $target_file_loc)){
                    return $file_name;
                }
            }
        }
        if(!empty($_SESSION["user_id"])){
            $id = $_SESSION['user_id'];
            $img_link = upload_img();
            $query = "UPDATE users SET img_link = '$img_link' WHERE id = $id";

            mysqli_query($conn, $query);
            echo json_encode(["status" => "success", "img_link" => "$img_link"]);
        }

    }
    catch(mysqli_sql_exception $e){
        echo $e->getMessage();
    }

?>