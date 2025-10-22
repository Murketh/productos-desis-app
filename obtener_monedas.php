<?php
header('Content-Type: application/json');
include 'conexion.php';

try {
  $stmt = $conn->query("SELECT id, nombre FROM monedas");
  $monedas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($monedas);
} catch (PDOException $e) {
  echo json_encode(["error" => "Error al obtener las monedas: " . $e->getMessage()]);
}