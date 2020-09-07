<?php

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for getting the reports
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    include 'variables.php';

    try {

        // We connect to the database
        $mysqli = new mysqli($servername, $username, $password, $database);
        if ($mysqli -> connect_errno) {
          echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
          exit();
        }

        // We get the reports
        $sql = "SELECT * FROM reports";

        // The array we will share with JavaScript
        $array = [];

        // We store the reports in the array
        if ($result = $mysqli -> query($sql)) {
          while ($row = $result -> fetch_row()) {
            array_push($array, $row);
          }
          $result -> free_result();
        }

        // We sort the array
        sort($array);

        echo json_encode($array);

        // We close the connection
        $mysqli -> close();

    } catch (Exception $e) {

    }
?>