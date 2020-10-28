<?php
	session_start();
	require_once 'connect.php';

	$email = $_POST['email'];
	$password = $_POST['password'];

	$chech_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `email` = '$email' AND `password` = '$password'");
	if(mysqli_num_rows($chech_user)> 0){

	}else {
		$_SESSION['msg'] = 'Введите верно пароль.';
		header('Location: ../index.php');
	}
	?>