<?php

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for adding a new report to the database
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    include 'variables.php';

    $i = $_REQUEST["i"];
    $n = $_REQUEST["n"];

    try {

        // We connect to the database
        $connection = mysqli_connect($servername, $username, $password, $database) or die("ERROR while connecting");

        // We insert the report values
        mysqli_query($connection, 'insert ignore into reports values("'.$i.'", "'.$n.'")') or die("ERROR while inserting entries");

        // We close the connection
        mysqli_close($connection);

    } catch(mysqli_sql_exception $e) {
        
    }
?>