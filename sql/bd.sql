DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS sucursales CASCADE;
DROP TABLE IF EXISTS monedas CASCADE;
DROP TABLE IF EXISTS bodegas CASCADE;

CREATE TABLE bodegas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE monedas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE sucursales (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_bodega INT NOT NULL,
  FOREIGN KEY (id_bodega) REFERENCES bodegas(id) ON DELETE CASCADE
);

CREATE TABLE productos (
  codigo VARCHAR(20) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_bodega INT NOT NULL,
  id_sucursal INT NOT NULL,
  id_moneda INT NOT NULL,
  precio DECIMAL(12,2) NOT NULL CHECK (precio >= 0),
  materiales TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  FOREIGN KEY (id_bodega) REFERENCES bodegas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_sucursal) REFERENCES sucursales(id) ON DELETE CASCADE,
  FOREIGN KEY (id_moneda) REFERENCES monedas(id) ON DELETE CASCADE
);

INSERT INTO bodegas (nombre) VALUES ('Bodega 1'), ('Bodega 2'), ('Bodega 3');

INSERT INTO monedas (nombre) VALUES ('Dólar estadounidense'), ('Peso chileno'), ('Yen japonés'), ('Peso argentino'), ('Euro');

INSERT INTO sucursales (nombre, id_bodega) VALUES ('Sucursal 1', 1), ('Sucursal 2', 1), ('Sucursal 3', 2), ('Sucursal 4', 2), ('Sucursal 5', 3), ('Sucursal 6', 3); 