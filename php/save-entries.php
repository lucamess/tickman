<?php

require_once "connect-db.php";
require_once "utils.php";

$entries = json_decode($_POST["entries"]);
$grade = json_decode($_POST["grade"]);
$section = json_decode($_POST["section"]);
$date = json_decode($_POST["date"]);

$query  = "DELETE FROM attd_entries WHERE ";
$query .= "`grade` = '" . mysqli_real_escape_string($conn, $grade) . "' AND ";
$query .= "`section` = '" . mysqli_real_escape_string($conn, $section) . "' AND ";
$query .= "`date` = '" . mysqli_real_escape_string($conn, $date) . "'";
mysqli_query($conn, $query);

foreach($entries as $entry) {
	$query = "INSERT INTO attd_entries("
		. " `entryId`, `studentId`, `name`, `grade`, `section`, `note`,"
		. " `img`, `attd`, `date`, `time`"
		. ") VALUES ("
		. "'" . mysqli_real_escape_string($conn, $entry->entryId) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->studentId) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->name) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->grade) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->section) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->note) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->img) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->attd) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->date) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->time) . "')";
	
	mysqli_query($conn, $query);
}

mysqli_close($conn);
die(print_op_success());


?>
