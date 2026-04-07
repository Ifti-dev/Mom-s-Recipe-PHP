<?php 
    include("../includes/database.php");
    session_start();
    define('ROOT_URL', 'http://localhost/Mom-s-Recipe-PHP/');
    $user_id = $_SESSION["user_id"];
    $query = "SELECT * FROM recipe_list WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);
    while($recipe = mysqli_fetch_assoc($result)){
?>
    <div class="recipe-dashboard-card" data-unique_id ="<?php echo $recipe["id"]; ?>">
        <div class="recipe-dashboard-card-img">
            <img src="<?php echo ROOT_URL . 'assets/user-uploads/' . $recipe["img_link"]; ?>" alt="">
        </div>
        <div class="recipe-dashboard-card-body">
            <div class="recipe-dashboard-card-info">
                <h3><a href="#"><?php echo $recipe["title"]; ?></a></h3>
                <p>Recipe Id: <span><?php echo $recipe["id"]; ?></span></p>
            </div>
            
            <div class="recipe-dashboard-card-buttons">
                
                <button class="recipe-dashboard-card-edit-btn"><i class="fa-solid fa-trash"></i> Edit</button>
                <button class="recipe-dashboard-card-del-btn"><i class="fa-solid fa-pen"></i> Delete</button>
                
            </div>
            
        </div>
            
    </div>
<?php 
}
?>





