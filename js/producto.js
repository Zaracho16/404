import { perfumes } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const producto = perfumes.find(p => p.id === id);

const contenedor = document.getElementById("producto");

if (!producto) {
  contenedor.innerHTML = `
    <h1>Producto no encontrado</h1>
    <p>Revisá el ID en la URL</p>
  `;
} else {
  contenedor.innerHTML = `
    <h1>${producto.nombre}</h1>
    <img src="${producto.imagen}" />
    <p>${producto.descripcion}</p>
    <p>${producto.precio.toLocaleString()} Gs</p>

    <button onclick="agregarAlCarrito(${producto.id})">
      Agregar al carrito
    </button>
  `;
}