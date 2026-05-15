<?php 
    include("../includes/database.php");
    session_start();
    $raw_data = file_get_contents("php://input"); //getting the raw json data
    $data = json_decode($raw_data,true);
    

    $query_comment = "SELECT * FROM comment_reply WHERE recipe_id = '$data[recipe_id]' AND parent_comment_id IS NULL";
    $response_comment = mysqli_query($conn, $query_comment);
    // for on reload render
    if($data["status"] == "old"){
        while($comments = mysqli_fetch_assoc($response_comment)){
        $query_commenter = "SELECT * FROM users WHERE id = $comments[user_id]";
        $response_commenter = mysqli_query($conn, $query_commenter);
        $row_commenter = mysqli_fetch_assoc($response_commenter);
?>
    <div class="comment" data-id=<?php echo $comments["id"]; ?>>
        <div class="comment-head">

            <?php if(empty($row_commenter["img_link"])){ ?>
            <p class="profile-pic-default"><?php echo strtoupper($row_commenter["username"][0]); ?></p>
            <?php } else{ ?>
            <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_commenter['img_link']; ?>" alt="" class="comment-avater">
            <?php } ?>
        </div>
        <div class="comment-body">
            <p class="comment-full-name"><?php echo $row_commenter["fullname"]; ?></p>
            <p class="comment-text"><?php echo $comments["comment"]; ?></p>
            <div class="comment-footer">
                <span class="comment-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i><!--${comment.likes.length}--></span>
            </div>

            <div class="comment-reply-container">
                <!-- replies are added here -->
                <?php 
                    
                    $query_reply = "SELECT * FROM comment_reply WHERE recipe_id = '$data[recipe_id]' AND parent_comment_id IS NOT NULL";
                    $response_reply = mysqli_query($conn, $query_reply);
                    
                    while($replies = mysqli_fetch_assoc($response_reply)){
                    $query_replier = "SELECT * FROM users WHERE id = $replies[user_id]";
                    $response_replier = mysqli_query($conn, $query_replier);
                    $row_replier = mysqli_fetch_assoc($response_replier);
                    if($replies["parent_comment_id"] == $comments["id"]){ // to check weather the reply is for the current parent comment or  not
                ?>
                    <div class="reply" data-id=<?php echo $replies["id"] ?>>
                        <div class="comment-head">
                            <?php if(empty($row_replier["img_link"])){ ?>
                            <p class="profile-pic-default"><?php echo strtoupper($row_replier["username"][0]); ?></p>
                            <?php } else{ ?>
                            <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_replier['img_link']; ?>" alt="" class="comment-avater">
                            <?php } ?>
                        </div>
                        <div class="comment-body">
                            <p class="comment-full-name"><?php echo $row_replier["fullname"]; ?></p>
                            <p class="comment-text"><?php echo $replies["comment"]; ?></p>
                            <div class="comment-footer">
                                <span class="reply-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                                <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i><!--${reply.likes.length}--></span>
                            </div>
                            <div class="reply-reply-container">
                            
                            </div>
                        </div>
                    </div>
                    <?php } ?>
                <?php } ?>
                <!-- reply end -->
            </div>
        </div>
    </div>
    <!-- comment end -->
<?php } } 
    //comment end condition

    // for real time render
    else if($data["status"] == "new"){ 
        $query_commenter = "SELECT * FROM users WHERE id = $_SESSION[user_id]";
        $response_commenter = mysqli_query($conn, $query_commenter);
        $row_commenter = mysqli_fetch_assoc($response_commenter);

        if($data["type"] == "comment"){
    ?>
    <div class="comment" data-id=<?php echo $data["id"]; ?>>
        <div class="comment-head">

            <?php if(empty($row_commenter["img_link"])){ ?>
            <p class="profile-pic-default"><?php echo strtoupper($row_commenter["username"][0]); ?></p>
            <?php } else{ ?>
            <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_commenter['img_link']; ?>" alt="" class="comment-avater">
            <?php } ?>
        </div>
        <div class="comment-body">
            <p class="comment-full-name"><?php echo $row_commenter["fullname"]; ?></p>
            <p class="comment-text"><?php echo $data["text"]; ?></p>
            <div class="comment-footer">
                <span class="comment-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i><!--${comment.likes.length}--></span>
            </div>

            <div class="comment-reply-container">
                
            </div>
        </div>
    </div>
    
<?php } else if($data["type"] == "reply"){
?>
        <div class="reply" data-id=<?php echo $data["id"]; ?>>
            <div class="comment-head">
                <?php if(empty($row_commenter["img_link"])){ ?>
                <p class="profile-pic-default"><?php echo strtoupper($row_commenter["username"][0]); ?></p>
                <?php } else{ ?>
                <img src="<?php echo ROOT_URL . 'assets/user-images/' . $row_commenter['img_link']; ?>" alt="" class="comment-avater">
                <?php } ?>
            </div>
            <div class="comment-body">
                <p class="comment-full-name"><?php echo $row_commenter["fullname"]; ?></p>
                <p class="comment-text"><?php echo $data["text"]; ?></p>
                <div class="comment-footer">
                    <span class="reply-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                    <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i><!--${reply.likes.length}--></span>
                </div>
                <div class="reply-reply-container">
                
                </div>
            </div>
        </div>
        <?php } ?>
    <?php } ?>
