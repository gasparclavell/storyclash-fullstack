<?php

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for deleting a report from the database
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    include 'variables.php';

    $i = $_REQUEST["i"];

    try {

        // We connect to the database
        $connection = mysqli_connect($servername, $username, $password, $database) or die("ERROR while connecting");

        // We delete the matching report
        mysqli_query($connection, 'delete from reports where id ="'.$i.'"') or die("ERROR while deleting entries");

        // We close the connection
        mysqli_close($connection);

    } catch(mysqli_sql_exception $e) {
        
    }    
?>