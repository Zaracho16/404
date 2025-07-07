
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// ----- Script para mostrar la info por perfume en vista previa -----
function mostrarModal(btn) {
    document.getElementById("img-vistaPrevia").src = btn.dataset.img;
    document.getElementById("titulo-infoVistaPrevia").innerText = btn.dataset.titulo;
    document.getElementById("precio").innerText = btn.dataset.precio;
    document.getElementById("familia").innerText = btn.dataset.familia;
    document.getElementById("salida").innerText = btn.dataset.salida;
    document.getElementById("corazon").innerText = btn.dataset.corazon;
    document.getElementById("fondo").innerText = btn.dataset.fondo;
    document.getElementById("descripcion").innerText = btn.dataset.descripcion;

    document.getElementById("modalVistaPrevia").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalVistaPrevia").style.display = "none"
}


// ----- Script para aumentar el contador en vista previa -----
let cantidad = 1;

const cantidadSpan = document.getElementById("cantidad");

function aumentar() {
  cantidad++;
  cantidadSpan.textContent = cantidad;
}

function disminuir() {
  if(cantidad > 1) {
    cantidad--;
    cantidadSpan.textContent = cantidad;
  }
}
