// ----- Botón menú hamburguesa -----
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn.addEventListener('click', () => menu.classList.toggle('hidden'));

// ----- Modal vista previa -----
function mostrarModal(btn) {
  document.getElementById("img-vistaPrevia").src = btn.dataset.img;
  document.getElementById("titulo-infoVistaPrevia").innerText = btn.dataset.titulo;
  document.getElementById("precio").innerText = btn.dataset.precio;
  document.getElementById("familia").innerText = btn.dataset.familia;
  document.getElementById("salida").innerText = btn.dataset.salida;
  document.getElementById("corazon").innerText = btn.dataset.corazon;
  document.getElementById("fondo").innerText = btn.dataset.fondo;
  document.getElementById("descripcion").innerText = btn.dataset.descripcion;

  cantidad = 1;
  cantidadSpan.textContent = cantidad;

  document.getElementById("modalVistaPrevia").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalVistaPrevia").style.display = "none";
}

// ----- Cantidad en modal -----
let cantidad = 1;
const cantidadSpan = document.getElementById("cantidad");

function aumentar() {
  cantidad++;
  cantidadSpan.textContent = cantidad;
}

function disminuir() {
  if (cantidad > 1) {
    cantidad--;
    cantidadSpan.textContent = cantidad;
  }
}

// ----- Carrito lateral -----
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

// ----- Carrito funcional -----
let carrito = [];
let contadorCarrito = 0;
const contadorSpan = document.querySelector(".numeroContadorCantidadProductos");

function actualizarContadorGlobal() {
  contadorCarrito = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contadorSpan.textContent = contadorCarrito;

  if (contadorCarrito > 0) {
    contadorSpan.style.display = "inline-block";
  } else {
    contadorSpan.style.display = "none";
  }
}

function actualizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  const totalSpan = document.getElementById('total-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;

    const li = document.createElement('li');
    li.classList.add('carrito-item');
    li.innerHTML = `
      <div class="producto-contenedor-carritoCompra">
        <div class="caja-img-carrito">
          <img src="${producto.imagenSrc}" alt="${producto.nombre}" class="estilo-img-carrito">
        </div>
        <div class="caja-nombre-carrito">
          <span class="nombreProducto-carrito">${producto.nombre} - ${producto.precio.toLocaleString()} Gs x ${producto.cantidad}</span>
        </div>
      </div>
      <button onclick="eliminarDelCarrito(${index})" class="icono-eliminarProductoCarrito">❌</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toLocaleString();
  actualizarContadorGlobal();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ----- Agregar al carrito desde productos (fuera del modal) -----
document.querySelectorAll('.boton-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const cuadro = btn.closest('.cuadro-perfumes-General');
    const nombre = cuadro.querySelector('h3').textContent.trim();
    const imagenSrc = cuadro.querySelector("img").src;
    const precioTexto = cuadro.querySelector('span').textContent.trim();
    const precio = parseInt(precioTexto.replace(/\D/g, ''));

    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, imagenSrc, cantidad: 1 });
    }

    actualizarCarrito();
    mostrarMensajeCarrito();
  });
});

// ----- Agregar al carrito desde modal -----
document.getElementById("btnAgregarDesdeVistaPrevia").addEventListener("click", () => {
  const nombre = document.getElementById("titulo-infoVistaPrevia").innerText.trim();
  const imagenSrc = document.getElementById("img-vistaPrevia").src;
  const precioTexto = document.getElementById("precio").innerText.trim();
  const precio = parseInt(precioTexto.replace(/\D/g, ''));

  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, imagenSrc, cantidad });
  }

  actualizarCarrito();
  mostrarMensajeCarrito();
  cerrarModal();
});

// ----- Mensaje "Se añadió al carrito" -----
function mostrarMensajeCarrito() {
  const mensaje = document.getElementById("mensajeCarrito");
  mensaje.classList.remove("oculto");
  mensaje.classList.add("visible");

  setTimeout(() => {
    mensaje.classList.remove("visible");
    setTimeout(() => mensaje.classList.add("oculto"), 300);
  }, 1500);
}
