<?php 
    include("../includes/database.php");
    $raw_data = file_get_contents("php://input"); //getting the raw json data
    $recipe_id = json_decode($raw_data,true); //decoding the raw data to get the actual data
    //echo json_encode(['status' => 'success', "data" => "$recipe_id"]); //sending data back to fetch as json



    function get_list_data($conn, $table_name,$col_name,$recipe_id){
        $query = "SELECT * FROM `$table_name` WHERE recipe_id = '$recipe_id'";
        $response = mysqli_query($conn, $query);
        $list_data = [];
        if(mysqli_num_rows($response) != 0){
            while($row = mysqli_fetch_assoc($response)){
                array_push($list_data,$row["$col_name"]);
            }
        }
        return $list_data;
    }


    $query = "SELECT * FROM recipe_list WHERE id = '$recipe_id'";
    
    
    $response = mysqli_query($conn, $query);

    if(mysqli_num_rows($response) != 0){
        $result = mysqli_fetch_assoc($response);
        $result_ing = get_list_data($conn,"ingredient_list", "ingredient", $recipe_id);
        $result_ins = get_list_data($conn, "instruction_list", "instruction", $recipe_id);
        echo json_encode(['status' => 'success', "title" => $result['title'], 
        "img_link" => $result['img_link'], "description" => $result['description'], 
        "cook_hour" => $result['cook_hour'], "cook_min" => $result['cook_min'], 
        "total_serving" => $result['total_serving'], "ingredient_list" => $result_ing, 
        "instruction_list" => $result_ins]);
    }
?>