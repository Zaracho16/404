
import { perfumes } from "./data.js";

export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function agregarAlCarrito(id) {
  const producto = perfumes.find(p => p.id === id);

  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardar();
}

export function eliminar(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardar();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}