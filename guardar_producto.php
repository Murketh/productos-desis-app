<?php
header('Content-Type: application/json');
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigo = $_POST['codigo'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $id_bodega = $_POST['bodega'] ?? null;
    $id_sucursal = $_POST['sucursal'] ?? null;
    $id_moneda = $_POST['moneda'] ?? null;
    $precio = $_POST['precio'] ?? null;
    $materiales = $_POST['material'] ?? null;
    $descripcion = $_POST['descripcion'] ?? null;

    if (!$codigo || !$nombre || !$id_bodega || !$id_sucursal || !$id_moneda || !$precio || !$materiales || !$descripcion) {
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit;
    }

    $precio_modificado = str_replace(",", ".", $precio);

    try {
        $stmt = $conn->prepare("INSERT INTO productos (codigo, nombre, id_bodega, id_sucursal, id_moneda, precio, materiales, descripcion)
                                VALUES (:codigo, :nombre, :id_bodega, :id_sucursal, :id_moneda, :precio, :materiales, :descripcion)");
        $stmt->execute([
            ':codigo' => $codigo,
            ':nombre' => $nombre,
            ':id_bodega' => $id_bodega,
            ':id_sucursal' => $id_sucursal,
            ':id_moneda' => $id_moneda,
            ':precio' => $precio_modificado,
            ':materiales' => $materiales,
            ':descripcion' => $descripcion
        ]);

        echo json_encode(["exito" => "Producto guardado correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al guardar producto: " . $e->getMessage()]);
    }
}
?>
