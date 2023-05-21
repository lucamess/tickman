<?php

function print_auth_error() {
	$result = array(
		"success" => false,
		"message" => "AUTH_ERROR"
	);

	return json_encode($result);
}

function print_op_success() {
	$result = array(
		"success" => true
	);

	return json_encode($result);
}

function print_data_success($data) {
	$result = array(
		"success" => true,
		"result" => $data
	);

	return json_encode($result);
}

?>
