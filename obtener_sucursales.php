<?php
header('Content-Type: application/json');
include 'conexion.php';

if (!isset($_GET['id_bodega'])) {
  echo json_encode(["error" => "Falta el parámetro id_bodega"]);
  exit;
}

$id_bodega = intval($_GET['id_bodega']);

try {
  $stmt = $conn->prepare("SELECT id, nombre FROM sucursales WHERE id_bodega = :id_bodega");
  $stmt->bindParam(':id_bodega', $id_bodega, PDO::PARAM_INT);
  $stmt->execute();
  $sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($sucursales);
} catch (PDOException $e) {
  echo json_encode(["error" => "Error al obtener las sucursales: " . $e->getMessage()]);
}
?>