<?php
header('Content-Type: application/json');
include 'conexion.php';

$codigo = $_GET['codigo'];

try {
  $stmt = $conn->prepare("SELECT COUNT(*) AS cantidad FROM Productos WHERE codigo = :codigo");
  $stmt->bindParam(':codigo', $codigo, PDO::PARAM_STR);
  $stmt->execute();

  $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($resultado['cantidad'] > 0) {
    echo json_encode(["existe" => true]);
  } else {
    echo json_encode(["existe" => false]);
  }
} catch (PDOException $e) {
  echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}
?>
