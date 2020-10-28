<?php
	session_start();
	require_once 'connect.php';
	$full_name = $_POST['full_name'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$password_confirm = $_POST['password_confirm'];
	if ($password == $password_confirm) {
		$path = ('uploads/'. time() . $_FILES['avatar']['name']);
		if (!move_uploaded_file($_FILES['avatar']['tmp_name'], '../' . $path)) {
			$_SESSION['msg'] = 'Ошибка';
			header('Location: ../index.php');
		}
		mysqli_query($connect, "INSERT INTO `users` (`id`, `full_name`, `password`, `email`, `avatar`) VALUES ( NULL, '$full_name', '$password', '$email', '$path')");
		$_SESSION['msg'] = ' Регестрация прошла успешно.';
		header('Location: ../index.php');
	}else {
		$_SESSION['msg'] = 'Введите верно пароль!';
		header('Location: ../index.php');
	}
?>