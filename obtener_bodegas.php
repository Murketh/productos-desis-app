<?php
header('Content-Type: application/json');
include 'conexion.php';

try {
  $stmt = $conn->query("SELECT id, nombre FROM bodegas");
  $bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($bodegas);
} catch (PDOException $e) {
  echo json_encode(["error" => "Error al obtener las bodegas: " . $e->getMessage()]);
}