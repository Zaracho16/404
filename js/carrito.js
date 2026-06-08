// carrito.js

// Intentamos cargar lo que haya en localStorage, si no, empezamos vacío
export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar al carrito (Soportando la cantidad variable del modal)
export function agregarAlCarrito(nombre, precio, imagenSrc, cantidad = 1) {
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, imagenSrc, cantidad });
  }

  guardar();
}

// Eliminar del carrito por Índice (coincide exactamente con tu HTML actual)
export function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardar();
}