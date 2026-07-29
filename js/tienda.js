
let perfumes = [];

function getMarcaFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("marca");
}

function renderProductos() {
  const contenedor = document.getElementById("productos");
  console.log("URL actual:", window.location.href);
console.log("contenedor:", contenedor);
  if (!contenedor) return;

  const marca = getMarcaFromURL();

  const filtrados = marca
    ? perfumes.filter(p => p.marca === marca)
    : perfumes;
    console.log("productos a mostrar:", filtrados);

  contenedor.innerHTML = filtrados.map(p => `
    <div class="cuadro-perfumes-General">
      <div class="img-con-overlay">
        <img src="${p.imagen}" class="ch-img">
        <div class="overlay">
          <button class="boton-carrito"
            onclick="agregarAlCarrito('${p.nombre}', ${p.precio}, '${p.imagen}')">
            Agregar al carrito
          </button>

          <button class="boton-vista"
            onclick="mostrarModalPerfume(${p.id})">
            Vista previa
          </button>
        </div>
      </div>

      <h3>${p.nombre}</h3>
      <span>${p.precio.toLocaleString()} Gs</span>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", cargarProductos);

function mostrarModalPerfume(id) {
  const perfume = perfumes.find(p => p.id === id);
  if (!perfume) return;

  document.getElementById("titulo-infoVistaPrevia").innerText = perfume.nombre;
  document.getElementById("precio").innerText = perfume.precio.toLocaleString();
  document.getElementById("familia").innerText = perfume.familia;
  document.getElementById("salida").innerText = perfume.notas?.salida || perfume.salida;
  document.getElementById("corazon").innerText = perfume.notas?.corazon || perfume.corazon;
  document.getElementById("fondo").innerText = perfume.notas?.fondo || perfume.fondo;
  document.getElementById("descripcion").innerText = perfume.descripcion;
  document.getElementById("img-vistaPrevia").src = perfume.imagen;

  document.getElementById("modalVistaPrevia").style.display = "flex";
}

window.mostrarModalPerfume = mostrarModalPerfume;

console.log("tienda.js cargado");


const API_URL = "https://four04-8o6t.onrender.com/productos";

async function cargarProductos() {

    console.log("cargando productos...");

    try {

        const respuesta = await fetch(API_URL);

        console.log("respuesta:", respuesta);

        perfumes = await respuesta.json();

        console.log("perfumes recibidos:", perfumes);

        renderProductos();

    } catch(error) {

        console.log("Error:", error);

    }

}

cargarProductos();