
export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar al carrito
export function agregarAlCarrito(nombre, precio, imagenSrc, cantidad = 1) {
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, imagenSrc, cantidad });
  }

  guardar();
}

// Eliminar del carrito por Índice
export function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardar();
}