<?php 
    include("../includes/database.php");
    session_start();
    $raw_data = file_get_contents("php://input"); //getting the raw json data
    $recipe_id = json_decode($raw_data,true); //decoding the raw data to get the actual data
    try{      
        $query_get = "SELECT img_link FROM recipe_list WHERE id = '$recipe_id'";
        $response_get = mysqli_query($conn, $query_get);
        $result_get = mysqli_fetch_assoc($response_get);

        if(!empty($result_get["img_link"]))
            unlink("../assets/user-uploads/" . $result_get['img_link']);
        
        $query = "DELETE FROM recipe_list WHERE id = '$recipe_id'";
        $response = mysqli_query($conn, $query);
        echo json_encode(["status" => "success"]);
    }
    catch(mysqli_sql_exception){
        echo json_encode(["status" => "Failed to delete"]);
    }
?>






