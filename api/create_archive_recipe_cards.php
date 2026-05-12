<?php
    include("../includes/database.php");
    session_start();
    $username_raw = file_get_contents("php://input");
    $username = json_decode($username_raw);

    
    if($username != "")
        $query = "SELECT * FROM recipe_list WHERE username = '$username'";
    else
        $query = "SELECT * FROM recipe_list";
    $response = mysqli_query($conn, $query);
    
    while($row = mysqli_fetch_assoc($response)){
        $query_creator = "SELECT * FROM users WHERE id = $row[user_id]";
        $response_creator = mysqli_query($conn, $query_creator);
        $row_creator = mysqli_fetch_assoc($response_creator);
?>
    <div class="recipe-card" data-unique_id ="<?php echo $row['id']; ?>">
        <div class="recipe-card-img-container">
            <img src="<?php echo ROOT_URL . 'assets/user-uploads/' . $row['img_link'];?>" alt="">
        </div>
        <div class="recipe-card-body">
            <h3><a href="recipe-page.php?slug=<?php echo $row["slug"]; ?>"><?php echo $row["title"]; ?></a></h3>
            <div class="recipe-card-user">
                <div class="recipe-card-user-img-cont">
                    <?php if(empty($row_creator["img_link"])){ ?>
                    <p class="profile-pic-default"><?php echo strtoupper($row_creator["username"][0]); ?></p>
                    <?php } else{ ?>
                    <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_creator['img_link']; ?>" alt="" class="profile-pic">
                    <?php } ?>
                </div>
                <p class="recipe-card-user-fullname"><a href="profile.php?slug=<?php echo $row_creator["username"]; ?>"><?php echo $row_creator["fullname"]; ?></a></p>
            </div>
        </div>
    </div>

<?php 
    }
?>