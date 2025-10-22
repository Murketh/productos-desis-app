document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const codigoIngresado = document.getElementById("codigo");
  const nombreIngresado = document.getElementById("nombre");
  const selectBodega = document.getElementById("bodega");
  const selectSucursal = document.getElementById("sucursal");
  const selectMoneda = document.getElementById("moneda");
  const precioIngresado = document.getElementById("precio");
  const checkboxesMateriales = document.getElementsByName("material");
  const descripcionIngresada = document.getElementById("descripcion");
  const mensaje = document.getElementById("mensaje");

  // Se obtienen las bodegas
  fetch("../obtener_bodegas.php")
    .then((respuesta) => respuesta.json())
    .then((data) => {
      selectBodega.innerHTML =
        '<option value="">Seleccione una bodega</option>';
      data.forEach((bodega) => {
        const opcion = document.createElement("option");
        opcion.value = bodega.id;
        opcion.textContent = bodega.nombre;
        selectBodega.appendChild(opcion);
      });
    });

  // Se obtienen las sucursales de la bodega
  selectBodega.addEventListener("change", () => {
    const idBodega = selectBodega.value;

    fetch(`../obtener_sucursales.php?id_bodega=${idBodega}`)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        selectSucursal.innerHTML =
          '<option value="">Seleccione una sucursal</option>';
        selectSucursal.disabled = false;

        data.forEach((sucursal) => {
          const opcion = document.createElement("option");
          opcion.value = sucursal.id;
          opcion.textContent = sucursal.nombre;
          selectSucursal.appendChild(opcion);
        });
      });
  });

  // Se obtienen las monedas
  fetch("../obtener_monedas.php")
    .then((respuesta) => respuesta.json())
    .then((data) => {
      selectMoneda.innerHTML =
        '<option value="">Seleccione una moneda</option>';
      data.forEach((moneda) => {
        const opcion = document.createElement("option");
        opcion.value = moneda.id;
        opcion.textContent = moneda.nombre;
        selectMoneda.appendChild(opcion);
      });
    });

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Validaciones del código
    const codigo = codigoIngresado.value.trim();

    if (codigo === "") {
      alert("El código del producto no puede estar en blanco.");
      return;
    }

    if (codigo.length < 5 || codigo.length > 15) {
      alert("El código del producto debe tener entre 5 y 15 caracteres.");
      return;
    }

    const formatoRegex = /^[a-zA-Z0-9]+$/;
    if (!formatoRegex.test(codigo)) {
      alert("El código del producto debe contener letras y números");
      return;
    }

    try {
      const respuesta = await fetch(
        "../validar_codigo_producto.php?codigo=" + encodeURIComponent(codigo)
      );
      const data = await respuesta.json();

      if (data.existe) {
        alert("El código del producto ya está registrado.");
        return;
      }
    } catch (error) {
      alert("Error al verificar el código. Intenta nuevamente.");
      return;
    }

    // Validaciones del nombre
    const nombre = nombreIngresado.value.trim();

    if (nombre === "") {
      alert("El nombre del producto no puede estar en blanco.");
      return;
    }

    if (nombre.length < 2 || nombre.length > 50) {
      alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
      return;
    }

    // Validaciones de la bodega
    if (selectBodega.value === "") {
      alert("Debe seleccionar una bodega.");
      return;
    }

    // Validaciones de la sucursal
    if (selectSucursal.value === "") {
      alert("Debe seleccionar una sucursal para la bodega seleccionada.");
      return;
    }

    // Validaciones de la moneda
    if (selectMoneda.value === "") {
      alert("Debe seleccionar una moneda para el producto.");
      return;
    }

    // Validaciones del precio
    const precio = precioIngresado.value.trim();

    if (precio === "") {
      alert("El precio del producto no puede estar en blanco.");
      return;
    }

    const regexPrecio = /^(?:[1-9]\d*|\d+\.\d{2})$/;
    if (!regexPrecio.test(precio)) {
      alert(
        "El precio del producto debe ser un número positivo con hasta dos decimales."
      );
      return;
    }

    // Validaciones del material
    let materialesSeleccionados = [];

    for (let i = 0; i < checkboxesMateriales.length; i++) {
      if (checkboxesMateriales[i].checked)
        materialesSeleccionados.push(checkboxesMateriales[i].value);
    }

    if (materialesSeleccionados.length < 2) {
      alert("Debe seleccionar al menos dos materiales para el producto.");
      return;
    }

    // Validaciones de la descripción
    const descripcion = descripcionIngresada.value.trim();

    if (descripcion === "") {
      alert("La descripción del producto no puede estar en blanco.");
      return;
    }

    if (descripcion.length < 10 || descripcion.length > 1000) {
      alert(
        "La descripción del producto debe tener entre 10 y 1000 caracteres."
      );
      return;
    }

    // Guardar el producto
    const datosFormulario = new FormData(formulario);
    datosFormulario.append("material", materialesSeleccionados.join(", "));

    fetch("../guardar_producto.php", {
      method: "POST",
      body: datosFormulario,
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (data.exito) {
          mensaje.textContent = data.exito;
          mensaje.style.color = "green";
          formulario.reset();
        } else {
          mensaje.textContent = data.error || "Error al guardar el producto";
          mensaje.style.color = "red";
        }
      });
  });
});
