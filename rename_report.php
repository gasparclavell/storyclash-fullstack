<?php

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for renaming a report in the database
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    include 'variables.php';

    $i = $_REQUEST["i"];
    $n = $_REQUEST["n"];

    try {

        // We connect to the database
        $connection = mysqli_connect($servername, $username, $password, $database) or die("ERROR while connecting");

        // We update the name of the project
        mysqli_query($connection, 'update reports set name = "'.$n.'" WHERE id = "'.$i.'"') or die("ERROR while updating entries");

        // We close the connection
        mysqli_close($connection);

    } catch(mysqli_sql_exception $e) {
        
    }
?>