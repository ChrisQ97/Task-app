<?php 
	include 'database.php';
	$id = $_POST['id'];
	$name = $_POST['name'];
	$description = $_POST['description'];
	$query = "UPDATE task set name = '$name', description = '$description' WHERE id = '$id' ";
	echo $query;
	$result = mysqli_query($connection,$query);
	if(!$result){
		die('Query failed');
	}
	echo "Success";
?>