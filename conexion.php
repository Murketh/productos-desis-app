<?php
$host = "localhost";
$port = "5432";
$dbname = "postgres";
$user = "";
$password = "";

try {
  $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;", $user, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Error de conexión: " . $e->getMessage());
}
?>