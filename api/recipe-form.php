<?php
    session_start();
    include("../includes/database.php");
    header("Content-Type: application/json");
    


    function slug_creator($conn, $title){
        $text = strtolower($title);
        $text = preg_replace("/[^a-z0-9\s-]/","",$text);
        $text = preg_replace("/[\s-]+/","-",$text);
        $text_tmp = $text;
        $found = true;
        $counter = 1;
        while($found){
            
            $query = "SELECT id FROM recipe_list WHERE slug = '$text_tmp'";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) == 0){
                return $text_tmp; //return tag will stop the loop
            }
            else{
                $text_tmp = $text . "-" . "$counter";
                $counter++;
            }
        }
       
    }
    function upload_img(){
        if(!empty($_FILES["recipe-form-file"])){
            $target_dir = "../assets/user-uploads/";
            
            $file_name = time() . "_" . basename($_FILES["recipe-form-file"]["name"]);
            $target_file_loc = $target_dir . $file_name;

            if(move_uploaded_file($_FILES["recipe-form-file"]["tmp_name"], $target_file_loc)){
                return $target_file_loc;
            }
        }   

    }

    function ing_ins_list($conn,$list_table,$list_type, $recipe_id){
        $list = $_POST["$list_type"];
        foreach($list as $list_data){
            $query = "INSERT INTO $list_table(recipe_id, `$list_type`) VALUES('$recipe_id','$list_data')";
            mysqli_query($conn, $query);
        }
        return "success";
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        //NOTES: 1) you can not add files inside $_POST so use $server req method. 2)Always check if the html code has multiple names, 
        //3)To check error go to networks tab and click on the current php file => response 
        //4)check table data types and limits
        $user_id = $_SESSION["user_id"];
        $username = $_SESSION["username"];
        $title = $_POST["recipe-form-title"];
        $slug = slug_creator($conn, $title);
        $img_link = upload_img();
        $description = $_POST["recipe-form-desc"];
        $cook_hour = $_POST["recipe-form-cook-hour"];
        $cook_min = $_POST["recipe-form-cook-min"];
        $total_serving = $_POST["recipe-form-serving"];

        $query = "INSERT INTO recipe_list(user_id, username, slug, title, img_link, description, cook_hour, cook_min, total_serving) 
            VALUES('$user_id','$username','$slug','$title','$img_link','$description','$cook_hour','$cook_min','$total_serving')";
        

        //It consists
        //1) Img upload ...2) Data upload ...\3) list upload ...
        if($img_link && mysqli_query($conn, $query)){
            //mysqli_insert_id — Returns the value generated for an AUTO_INCREMENT column by the last query
            $recipe_id_updated = mysqli_insert_id($conn);
            
            $ing_upload = ing_ins_list($conn,"ingredient_list","ingredient",$recipe_id_updated);
            $inst_upload = ing_ins_list($conn,"instruction_list","instruction",$recipe_id_updated);
            
            if($ing_upload && $inst_upload)
                echo json_encode(["status" => "success"]);
            else{
                echo json_encode(["status" => "failed list upload"]);
            }
        }
        else{
            echo json_encode(["status" => "failed"]);
        }

    }
?>