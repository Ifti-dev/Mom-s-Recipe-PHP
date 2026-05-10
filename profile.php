<?php 
    include("includes/database.php");
    session_start();
    $profile = $_GET["slug"];
    $query = "SELECT * FROM users WHERE username = '$profile'";
    $response = mysqli_query($conn, $query);
    $row_creator = mysqli_fetch_assoc($response);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/recipe-archive.css">
    <link rel="stylesheet" href="css/profile.css">
    <title>Document</title>
</head>
<body id="creator-profile-page">
    <header>
        <?php include("partials/header.php") ?>
    </header>
    <main class="main-without-sidebar">
        <div class="wrapper-main creator-profile-wrapper">
            <div class="creator-profile-head">
                <div class="creator-profile-img-container">
                    <?php if(empty($row_creator["img_link"])){ ?>
                    <p class="creator-profile-pic-default"><?php echo strtoupper($row_creator["username"][0]); ?></p>
                    <?php } else{ ?>
                    <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_creator['img_link']; ?>" alt="" id="creator-profile-img">
                    <?php } ?>
                </div>
                <h2 id="creator-profile-fullname"><a href="profile.html?slug=<?php echo $row_creator["username"]; ?>"><?php echo $row_creator["fullname"]; ?></a></h2>
            </div>
            <div class="creator-profile-body">
                <h2>Recipes</h2>
                <hr>
                <div class="recipe-card-container">

                </div>
            </div>
        </div>
    </main>
    <footer>
        <?php include("partials/footer.php") ?>
        <script src="js/header-footer.js"></script>
        <!-- <script src="js/recipe-archive.js"></script> -->
        <script src="js/profile.js"></script>
    </footer>
</body>
</html>