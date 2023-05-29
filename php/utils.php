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

function upload_note_image($key) {
	$fileTmpPath = $_FILES[$key]['tmp_name'];
	$fileName = $_FILES[$key]['name'];
	$fileSize = $_FILES[$key]['size'];
	$fileType = $_FILES[$key]['type'];
	$fileNameCmps = explode(".", $fileName);
	$fileExtension = strtolower(end($fileNameCmps));
	$newFileName = $key . '.' . $fileExtension;
	$uploadFileDir = './notes-images/';
	$dest_path = $uploadFileDir . $newFileName;

	move_uploaded_file($fileTmpPath, $dest_path);
}

?>
