<?php

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PHP for creating the storyclash database
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	include 'variables.php';

	try {

		// We use the database creation function stored in variables.php
		createDatabase($servername, $username, $password, $database);

		// We connect to the database
        $connection = mysqli_connect($servername, $username, $password, $database) or die("ERROR while connecting to storyclash database");

        // We create the "reports" table in case it does not exist
        mysqli_query($connection, 'create table if not exists reports (id int, name varchar(255), primary key (id))') or die("ERROR while creating reports table");

        // We create the reports table entries
        mysqli_query($connection, 'insert ignore into reports values("'."1".'", "'."Mercedes today".'")') or die("ERROR while inserting entries");
        mysqli_query($connection, 'insert ignore into reports values("'."2".'", "'."Mercedes competitors".'")') or die("ERROR while inserting entries");
        mysqli_query($connection, 'insert ignore into reports values("'."3".'", "'."Mercedes influencers".'")') or die("ERROR while inserting entries");

        // We rename them with their corresponding names
        mysqli_query($connection, 'update reports set name = "'."Mercedes today".'" WHERE id = "'."1".'"') or die("ERROR while updating entries");
        mysqli_query($connection, 'update reports set name = "'."Mercedes competitors".'" WHERE id = "'."2".'"') or die("ERROR while updating entries");
        mysqli_query($connection, 'update reports set name = "'."Mercedes influencers".'" WHERE id = "'."3".'"') or die("ERROR while updating entries");

        // We close the connection
        mysqli_close($connection);

	} catch (Exception $e) {

    }
?>