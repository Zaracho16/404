
// Funciones globales, afuera del DOMContentLoaded para que sean accesibles desde HTML

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
  const cantidadSpan = document.getElementById("cantidad");
  if(cantidadSpan) cantidadSpan.textContent = cantidad;

  document.getElementById("modalVistaPrevia").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalVistaPrevia").style.display = "none";
}

// Variables para cantidad en modal
let cantidad = 1;

function aumentar() {
  cantidad++;
  const cantidadSpan = document.getElementById("cantidad");
  if(cantidadSpan) cantidadSpan.textContent = cantidad;
}

function disminuir() {
  if (cantidad > 1) {
    cantidad--;
    const cantidadSpan = document.getElementById("cantidad");
    if(cantidadSpan) cantidadSpan.textContent = cantidad;
  }
}

let carrito = [];
let contadorCarrito = 0;

function actualizarContadorGlobal() {
  const contadores = document.querySelectorAll(".numeroContadorCantidadProductos-desktop, .numeroContadorCantidadProductos-mobile");

  if (!contadores.length) return;

  const contadorCarrito = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  contadores.forEach(contadorSpan => {
    contadorSpan.textContent = contadorCarrito;
    contadorSpan.style.display = contadorCarrito > 0 ? "inline-block" : "none";
  });
}


function actualizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  const totalSpan = document.getElementById('total-carrito');
  if (!lista || !totalSpan) return;

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

function mostrarMensajeCarrito() {
  const mensaje = document.getElementById("mensajeCarrito");
  if (!mensaje) return;

  mensaje.classList.remove("oculto");
  mensaje.classList.add("visible");

  setTimeout(() => {
    mensaje.classList.remove("visible");
    setTimeout(() => mensaje.classList.add("oculto"), 300);
  }, 1500);
}

// Espera a cargar DOM para cargar nav y footer y asignar eventos
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar nav.html
    const navResponse = await fetch("../nav.html");
    const navHtml = await navResponse.text();
    document.getElementById("nav").innerHTML = navHtml;

    // Asignar eventos después de cargar nav
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu){
      btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }

    const iconoCarritoDesktop = document.getElementById('icono-carrito-desktop');
    const iconoCarritoMobile = document.getElementById('icono-carrito-mobile');
    const carritoLateral = document.querySelector('.carrito-lateral');
    const botonCerrar = document.getElementById('cerrar-carrito');
    const fondoOscuro = document.getElementById('fondo-oscuro');

    if(iconoCarritoDesktop && iconoCarritoMobile && carritoLateral && botonCerrar && fondoOscuro){
      iconoCarritoDesktop.addEventListener('click', () => {
        carritoLateral.classList.toggle('active');
        fondoOscuro.classList.add('active');
      });
      iconoCarritoMobile.addEventListener('click', () => {
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
    }

    // Agregar al carrito desde productos (botones)
    document.querySelectorAll('.boton-carrito').forEach(btn => {
      btn.addEventListener('click', () => {
        const cuadro = btn.closest('.cuadro-perfumes-General');
        if (!cuadro) return;

        const nombre = cuadro.querySelector('h3')?.textContent.trim();
        const imagenSrc = cuadro.querySelector("img")?.src;
        const precioTexto = cuadro.querySelector('span')?.textContent.trim();
        if (!nombre || !imagenSrc || !precioTexto) return;

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

    // Agregar al carrito desde modal
    const btnAgregarModal = document.getElementById("btnAgregarDesdeVistaPrevia");
    if(btnAgregarModal){
      btnAgregarModal.addEventListener('click', () => {
        const nombre = document.getElementById("titulo-infoVistaPrevia")?.innerText.trim();
        const imagenSrc = document.getElementById("img-vistaPrevia")?.src;
        const precioTexto = document.getElementById("precio")?.innerText.trim();
        if (!nombre || !imagenSrc || !precioTexto) return;

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
    }

    // Filtrar productos por nombre de producto en la tienda
  const inputFiltro = document.getElementById("filtroProducto-desktop");
  const cuadros = document.querySelectorAll(".cuadro-perfumes-General");

  inputFiltro.addEventListener("input", () => {
  const textoFiltro = inputFiltro.value.toLowerCase(); // <-- acá el fix

  cuadros.forEach(cuadro => {
    const nombre = cuadro.querySelector("h3").textContent.toLowerCase();

    if(nombre.includes(textoFiltro)) {
      cuadro.style.display = ""; // mostrar
    } else {
        cuadro.style.display = "none"; // ocultar
      }
    });
  });


    // Cargar footer.html
    const footerResponse = await fetch("../footer.html");
    const footerHtml = await footerResponse.text();
    document.getElementById("footer").innerHTML = footerHtml;

  } catch (err) {
    console.error("Error al cargar nav o footer:", err);
  }
});


