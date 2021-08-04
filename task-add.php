<?php 
include 'database.php';
if(isset($_POST['name'])){
	$name = $_POST['name'];
	$description = $_POST['description'];
	$query = "INSERT into task(name, description) values('$name', '$description')";
	$result = mysqli_query($connection,$query);
	if(!$result){
		die('Query error');
	}
	echo "Task Added Successfully";
}

?>