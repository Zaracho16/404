
import { perfumes } from "./data.js";

const contenedor = document.getElementById("grid-productos");

function renderProductos(lista) {
  contenedor.innerHTML = lista.map(p => `
    <div class="card">
      <img src="${p.imagen}" />
      <h3>${p.nombre}</h3>
      <p>${p.marca}</p>
      <span>${p.precio.toLocaleString()} Gs</span>

      <button onclick="verProducto(${p.id})">Ver</button>
      <button onclick="agregarAlCarrito(${p.id})">Carrito</button>
    </div>
  `).join("");
}

renderProductos(perfumes);

// filtro opcional
window.filtrar = (texto) => {
  renderProductos(
    perfumes.filter(p =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    )
  );
};