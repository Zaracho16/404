import { agregarAlCarrito } from "./carrito.js";

let perfumes = [];

let textoBusqueda = "";

function getMarcaFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("marca");
}

function renderProductos() {

  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  const marca = getMarcaFromURL();

  const filtrados = perfumes.filter(p => {

    const coincideMarca =
      !marca || p.marca === marca;

    const coincideNombre =
      p.nombre
        .toLowerCase()
        .includes(textoBusqueda.toLowerCase());

    return coincideMarca && coincideNombre;

  });


  if (filtrados.length === 0) {

    contenedor.innerHTML = `
      <div class="producto-no-encontrado-mensaje">
        <h2>Producto no encontrado</h2>
      </div>
    `;

    return;
  }


  contenedor.innerHTML = filtrados.map(p => `
    <div class="cuadro-perfumes-General">

      <div class="img-con-overlay">

        <img src="${p.imagen}" class="ch-img">

        <div class="overlay">

          <button
            class="boton-carrito"
            data-id="${p.id}">
            Agregar al carrito
          </button>

          <button
            class="boton-vista"
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

  const btnAgregarModal = document.getElementById("btnAgregarDesdeVistaPrevia");

  if(btnAgregarModal) {
    btnAgregarModal.dataset.id = perfume.id;
  }

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

const API_URL = "https://four04-8o6t.onrender.com/productos";

const contenedorPerfumesGeneral = document.getElementById("productos");

async function cargarProductos() {

  contenedorPerfumesGeneral.innerHTML = `
    <div class="cargando-productos-tienda">
      <div class="animacion-carga"></div>
      <h2>Cargando productos...</h2>
    </div>
  `;

    try {

        const respuesta = await fetch(API_URL);

        perfumes = await respuesta.json();

        renderProductos();

    } catch(error) {

      contenedorPerfumesGeneral.innerHTML = `
        <div class="error-cargando-productos-tienda">
          <h2>Ocurrió un error al intentar cargar los productos</h2>
        </div>
      `;

      console.log("Error:", error);

    }

}

const inputDesktop = document.getElementById("filtroProducto-desktop");

if(inputDesktop){

    inputDesktop.addEventListener("input", (e)=>{

        textoBusqueda = e.target.value;

        renderProductos();

    });

}
