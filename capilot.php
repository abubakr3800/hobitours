<?php
// Read the raw POST data
$str_json = file_get_contents('php://input');

// Decode the JSON string
$data = json_decode($str_json, true); // true for associative array

// Access the data
$operation = $data['operation'];
$amount = $data['amount'];

// Perform any necessary processing
// ...

// Send a response (if needed)
// echo "op is " .$operation . "\n" ;

$con = mysqli_connect('localhost','root','');
mysqli_select_db($con, 'json_trial');


$s = "INSERT INTO `json_table`(`name`, `value`) VALUES ('$operation','$amount')";
mysqli_query($con, $s);
echo 'Received JSON data successfully!';
?>
