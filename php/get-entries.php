<?php

require_once "connect-db.php";
require_once "utils.php";

$query = "SELECT * FROM attd_entries";
$result = mysqli_query($conn, $query) or die("cheger again abo");
$entries = [];

while($row = mysqli_fetch_assoc($result)) {
	$row = (object) $row;
	array_push($entries, (object) [
		"entryId" => $row->entryId,
		"studentId" => $row->studentId,
		"name" => $row->name,
		"grade" => $row->grade,
		"section" => $row->section,
		"note" => $row->note,
		"img" => $row->img,
		"attd" => $row->attd,
		"date" => $row->date,
		"time" => $row->time,
	]);
}

mysqli_close($conn);
die(print_data_success($entries));

?>
