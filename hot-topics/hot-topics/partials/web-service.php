
<?php 
//echo "<pre>\$_POST";
//print_r($_POST);
//echo "</pre>";
echo "<p>Thank you {$_POST["full_name"]}!</p>";
echo "<p>Your comments where sent from the email: {$_POST["email"]} with a subject of {$_POST["subject"]}.";
?>