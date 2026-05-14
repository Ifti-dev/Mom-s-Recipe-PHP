<?php
    include("includes/database.php");
    session_start();
 
    $slug = $_GET["slug"];
    $query = "SELECT * FROM recipe_list WHERE slug = '$slug'";
    $response = mysqli_query($conn, $query);
    $recipe = mysqli_fetch_assoc($response);

    $query_ingredient = "SELECT * FROM ingredient_list WHERE recipe_id = '$recipe[id]'";
    $response_ingredient = mysqli_query($conn, $query_ingredient);
    
    $query_instruction = "SELECT * FROM instruction_list WHERE recipe_id = '$recipe[id]'";
    $response_instruction = mysqli_query($conn, $query_instruction);
    
    
    $query_creator = "SELECT * FROM users WHERE id = $recipe[user_id]";
    $response_creator = mysqli_query($conn, $query_creator);
    $row_creator = mysqli_fetch_assoc($response_creator);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/single-recipe.css">
    <script src="https://kit.fontawesome.com/bbf8f18e93.js" crossorigin="anonymous"></script>
    <script>
        const logged_in_user = <?php echo json_encode(!empty($_SESSION['user_id'])? $_SESSION['user_id']: false); ?>;
        const recipe_id = <?php echo json_encode(($recipe['id'])); ?>;
    </script>
    <title>Document</title>
</head>
<body>
    <header>
        <?php 
            include("partials/header.php")
        ?>
    </header>
    <div class="main-with-sidebar">
        <main class="single-recipe-content-container">
        
            <section class="single-recipe-wrapper">
                <nav class="breadcrumbs">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="recipe.html">Recipe</a></li>
                        <li><a href="recipe-page.php?slug=<?php echo $recipe["slug"]; ?>"><?php echo $recipe["title"]; ?></a></li>
                    </ul>
                </nav>
                <div class="recipe-page-top">
                    <h1 class="recipe-title"><?php echo $recipe["title"]; ?></h1>
                    <div class="recipe-meta-data">
                        <div><i class="fa-solid fa-circle-user"></i><a href="profile.php?slug=<?php echo $row_creator["username"]; ?>"><?php echo $row_creator["fullname"]; ?></a></div>
                        <!-- <div><i class="fa-solid fa-comment"></i>${get_currrent_recipe_data.comments.length}</div>
                        <div><i class="fa-solid fa-heart"></i>${get_currrent_recipe_data.wishlist_count.length}</div> -->
                    </div>
                </div>
                <div class="img_container">
                    <img src="<?php echo ROOT_URL . 'assets/user-uploads/' . $recipe["img_link"]; ?>" alt="">
                </div>
                <div class="recipe-page-body"> 
                    <div class="recipe-page-body-top"> 
                        <div class="recipe-time-serve-cont">
                            <div><p>Total Serving:</p><?php echo $recipe["total_serving"]; ?></div>
                            <div><p>Cook Hour:</p><?php echo $recipe["cook_hour"]; ?></div>
                            <div><p>Cook Minute:</p><?php echo $recipe["cook_min"]; ?></div>
                            
                        </div>
                        <div class="wishlist-btn-container">
                                <button id="wishlist-btn">Wishlist</button>
                        </div>
                    </div>
                    <p><?php echo $recipe["description"]; ?></p>
        
                    <h2 class="ingredient-title">Ingredients</h2>
                    <ol id="ingredient_container">
                        <?php while($ingredients = mysqli_fetch_assoc($response_ingredient)){?>
                            <label for=""><input type = "checkbox"><?php echo $ingredients['ingredient'] ?></label>
                        <?php } ?>
                    </ol>

                    <h2 class="instruction-title">Instructions</h2>
                    <ol id="instruction_container">
                         <?php while($instructions = mysqli_fetch_assoc($response_instruction)){?>
                            <label for=""><input type = "checkbox"><?php echo $instructions['instruction'] ?></label>
                        <?php } ?>
                    </ol>
                </div>
            </section>
            <section class="comment-sec-container">
                <div class="comment-sec-wrapper">
                    <h2>Comments:</h2>
                    <hr>
                    <form id="comment-form" class="comment-form" method="post">
                        <label for="comment-input-box-cont" class="comment-input-box-cont"><textarea name="comment-input-box" id="comment-input-box" name="comment-reply-input" placeholder="Add a comment"></textarea></label>
                        <div class="comment-form-btn-container">
                            <input type="reset" value="Cancle">
                            <input type="submit" value="Comment">
                        </div>
                        
                    </form>
                    
                    <div id="comment-container">
                       <!-- comments are added here -->
                        
                    </div>
                </div>

            </section>
        </main>
        
        <aside class="recipe-page-sidebar-container">
                    <h2>Trending Recipes</h2>
                    <div class="sidebar-trending-recipe">
                        
                    </div>

                    <div class="sign-up-box">
                        <h3>Wanna share your Recipe?</h3>
                        <p>Join now</p>
                        <a href="login.php">Sign up</a>
                    </div>

                    <h2>Recent Recipes</h2>
                    <div class="sidebar-recent-recipe">
                        
                    </div>
        </aside>
    </div>
    <footer>
        <?php 
            include("partials/footer.php")
        ?>
        <script src="js/header-footer.js"></script>
        <script src="js/recipe-page.js"></script>
    </footer>
</body>
</html>