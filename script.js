
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

//-----Script para abrir y cerrar el carrito de compras-----
const iconoCarrito = document.getElementById('icono-carrito');
const carritoLateral = document.querySelector('.carrito-lateral');
const botonCerrar = document.getElementById('cerrar-carrito');
const fondoOscuro = document.getElementById('fondo-oscuro');

iconoCarrito.addEventListener('click', () => {
  carritoLateral.classList.toggle('active');
  fondoOscuro.classList.add('active');
});

botonCerrar.addEventListener('click', () => {
  carritoLateral.classList.remove('active');
  fondoOscuro.classList.remove('active');
});

fondoOscuro.addEventListener('click', () => {
  carritoLateral.classList.remove('active');
  fondoOscuro.classList.remove('active');
});



// -----Script para añadir productos al carrito de compras-----

let carrito = [];

document.querySelectorAll('.boton-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const cuadro = btn.closest('.cuadro-perfumes-carolinaHerrera');
    const nombre = cuadro.querySelector('h3').textContent.trim();
    const imagenSrc = cuadro.querySelector("img").src;
    const precioTexto = cuadro.querySelector('span').textContent.trim();
    const precio = parseInt(precioTexto.replace(/\D/g, '')); // Solo números

    carrito.push({ nombre, precio, imagenSrc });
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  const totalSpan = document.getElementById('total-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;
    const li = document.createElement('li');
    li.classList.add('carrito-item'); // clase para estilo

    li.innerHTML = `
    <div class="producto-contenedor-carritoCompra">

      <div class="caja-img-carrito">
        <img src="${producto.imagenSrc}" alt="${producto.nombre}" class="estilo-img-carrito">
      </div>

      <div class="caja-nombre-carrito">
        <span class="nombreProducto-carrito">${producto.nombre} - ${producto.precio.toLocaleString()} Gs </span>
      </div>

    </div>
      
      <button onclick="eliminarDelCarrito(${index})" class="icono-eliminarProductoCarrito">❌</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toLocaleString();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});

