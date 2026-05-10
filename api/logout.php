<?php 
    session_start();
    session_destroy();
    json_encode(["status" => "success"]);
?>