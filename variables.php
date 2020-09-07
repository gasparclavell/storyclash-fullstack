<?php

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for storing common variables and methods
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $servername = "localhost";

    //$username = "id14800277_storyclash_user";
    $username = "storyclash";

    //$password = "Password2020!";
    $password = "storyclash2020";

    //$database = "id14800277_storyclash";
    $database = "storyclash";

    // Function for creating the database and a user with privileges in case they do not exist
    function createDatabase($servername, $username, $password, $database) {

        try {

            // We open a connection with root user (admin), without entering into a database
            $raw_connection = mysqli_connect("localhost", "root", "", "") or die("ERROR while connecting");

            // If our databse does not exist, it is created
            mysqli_query($raw_connection, 'create database if not exists '.$database.'') or die("ERROR while creating the database");

            // If our user does not exist, it is created
            mysqli_query($raw_connection, 'create user if not exists '.$username.'@'.$servername.' identified by "'.$password.'"');
            // We grant him full privileges regarding the created database
            mysqli_query($raw_connection, 'grant all on '.$database.'.* to '.$username.'@'.$servername.'');

            // We close the connection
            mysqli_close($raw_connection);

        } catch (Exception $e) {

        }  
    }
?>