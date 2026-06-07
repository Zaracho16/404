
import { agregarAlCarrito } from "./carrito.js";

window.agregarAlCarrito = agregarAlCarrito;

window.verProducto = (id) => {
  window.location.href = `producto.html?id=${id}`;
};