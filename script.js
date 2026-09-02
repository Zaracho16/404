
import { carrito, agregarAlCarrito, eliminarDelCarrito, cargarCarrito } from "./js/carrito.js";

window.eliminarDelCarrito = eliminarDelCarrito;

import { obtenerUsuario, cerrarSesion } from "./js/usuario.js";

let cantidad = 1;

window.eliminarDelCarrito = function(index) {

  eliminarDelCarrito(index); 
  actualizarCarrito();  

};

window.mostrarModal = function(btn) {

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

};

window.cerrarModal = function() {

  document.getElementById("modalVistaPrevia").style.display = "none";

};

window.aumentar = function() {

  cantidad++;
  const cantidadSpan = document.getElementById("cantidad");
  if(cantidadSpan) cantidadSpan.textContent = cantidad;

};

window.disminuir = function() {

  if (cantidad > 1) {
    cantidad--;
    const cantidadSpan = document.getElementById("cantidad");
    if(cantidadSpan) cantidadSpan.textContent = cantidad;
  }

};


// FUNCIONES DE INTERFAZ (DOM)

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

    carrito.forEach((producto) => {

        total += producto.precio * producto.cantidad;

        const li = document.createElement('li');

        li.classList.add('carrito-item');

        li.innerHTML = `
            <div class="producto-contenedor-carritoCompra">

                <div class="caja-img-carrito">
                    <img 
                        src="${producto.imagen}" 
                        alt="${producto.nombre}" 
                        class="estilo-img-carrito"
                    >
                </div>

                <div class="caja-nombre-carrito">
                    <span class="nombreProducto-carrito">
                        ${producto.nombre} -
                        ${producto.precio.toLocaleString()} Gs
                        x ${producto.cantidad}
                    </span>
                </div>

            </div>

            <button 
                onclick="eliminarDelCarrito(${producto.producto_id})"
                class="icono-eliminarProductoCarrito"
            >
                ❌
            </button>
        `;

        lista.appendChild(li);

    });

    totalSpan.textContent = total.toLocaleString();

    actualizarContadorGlobal();

}

window.actualizarCarrito = actualizarCarrito;

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

function actualizarUsuario() {

  const usuario = obtenerUsuario();

  const usuarioDesktop = document.getElementById("usuario-desktop");
  const usuarioMobile = document.getElementById("usuario-mobile");

  if(!usuario) {

    console.log("No hay usuario logueado");

    return;

  }

  console.log("Usuario logueado", usuario.nombre);

  if(usuarioDesktop) {

    usuarioDesktop.innerHTML = `
      <div class="flex items-center gap-3">

        <span>
          Hola, ${usuario.nombre}
        </span>

        <button id="cerrar-sesion-desktop" class="cerrarSesion-desktop-estilo">
          Cerrar sesión
        </button>

      </div>
    `;

  }

  if(usuarioMobile) {

    usuarioMobile.innerHTML = `
      <div class="flex items-center gap-3">

        <span>
          Hola, ${usuario.nombre}
        </span>

        <button id="cerrar-sesion-mobile" class="cerrarSesion-mobile-estilo">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>

      </div>
    `;

  }

  const btnCerrarDesktop = document.getElementById("cerrar-sesion-desktop");
  const btnCerrarMobile = document.getElementById("cerrar-sesion-mobile");

  if(btnCerrarDesktop) {
    btnCerrarDesktop.addEventListener("click", cerrarSesion);
  }

  if(btnCerrarMobile) {
    btnCerrarMobile.addEventListener("click", cerrarSesion);
  }

}


// MOSTRAR BIENVENIDA

function mostrarBienvenida() {

  const bienvenida = sessionStorage.getItem("bienvenida");

  if(!bienvenida) {
    return;
  }

  const usuario = obtenerUsuario();

  if(!usuario) {
    return;
  }

  sessionStorage.removeItem("bienvenida");

  const mensajeBienvenida = document.createElement("div");

  mensajeBienvenida.classList.add("mensaje-bienvenida");

  mensajeBienvenida.innerHTML = `
    <h2> Bienvenido, ${usuario.nombre}! </h2>
  `;

  document.body.appendChild(mensajeBienvenida);

  setTimeout(() => {
    mensajeBienvenida.remove();
  }, 4000);

}

function mostrarMensajeCarritoSinLogueo() {

  const mensaje = document.getElementById("mensajeCarritoSesionNoLogueda");

  if(!mensaje) {
    return;
  }

  mensaje.innerHTML = `
    <p> Debe iniciar sesión para añadir productos al carrito </p>
  `;

  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 2300);

}

window.mostrarMensajeCarritoSinLogueo = mostrarMensajeCarritoSinLogueo;

// Mensaje al cerrar sesion
function mensajeCerrarSesion() {

  const nombreUser = sessionStorage.getItem("cerrarSesion");

  if(!nombreUser) {
    return;
  }

  sessionStorage.removeItem("cerrarSesion");

  const mjsCerrarSesion = document.createElement("div");

  mjsCerrarSesion.classList.add("mensaje-cerrar-sesion");

  mjsCerrarSesion.innerHTML = `
    <h2> Sesión cerrada </h2>
  `;

  document.body.appendChild(mjsCerrarSesion);

  setTimeout(() => {
    mjsCerrarSesion.remove();
  }, 4000);

}

// FLUJO PRINCIPAL AL CARGAR EL DOM
document.addEventListener("DOMContentLoaded", async () => {

  try {

    // Cargar nav.html
    const navResponse = await fetch("./components/nav.html");
    const navHtml = await navResponse.text();
    document.getElementById("nav").innerHTML = navHtml;
    
    // verificamos usuario logueado y mostramos mensaje de bienvenida
    actualizarUsuario();
    mostrarBienvenida();
    mensajeCerrarSesion();

    // Renderizar el carrito guardado apenas cargue la pagina
    await cargarCarrito();
    actualizarCarrito();

    // Ocultar buscador si no es tienda.html
    if (!window.location.pathname.includes("tienda.html")) {
      const buscador = document.getElementById("buscador-productos");
      if (buscador) buscador.style.display = "none";
    }

    // Asignar eventos del menú responsive después de cargar nav
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

    if(iconoCarritoDesktop && iconoCarritoMobile && carritoLateral && botonCerrar && fondoOscuro) {

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

// Agregar al carrito desde las tarjetas de productos
document.addEventListener("click", async (e) => {

  if (e.target.classList.contains("boton-carrito")) {

    const cuadro = e.target.closest(".cuadro-perfumes-General");

    if (!cuadro) return;

    const productoId = e.target.dataset.id;

    const nombre = cuadro.querySelector("h3")?.textContent.trim();

    const imagenSrc = cuadro.querySelector("img")?.src;

    const precioTexto = cuadro.querySelector("span")?.textContent.trim();

    if (!productoId || !nombre || !imagenSrc || !precioTexto) return;

    const precio = parseInt(
      precioTexto.replace(/\D/g, '')
    );

    const agregado = await agregarAlCarrito(
      productoId,
      nombre,
      precio,
      imagenSrc,
      1
    );
        
    if(agregado) {
      mostrarMensajeCarrito();
    } else {
      mostrarMensajeCarritoSinLogueo();
    }

  }

});
    
// Agregar al carrito desde el modal de vista previa
const btnAgregarModal = document.getElementById("btnAgregarDesdeVistaPrevia");

if(btnAgregarModal) {

  btnAgregarModal.addEventListener("click", async () => {

    const productoId = btnAgregarModal.dataset.id;

    const nombre= document
      .getElementById("titulo-infoVistaPrevia")
      ?.innerHTML.trim();

    const imagenSrc = document
      .getElementById("img-vistaPrevia")
      ?.src;

    const precioTexto = document
      .getElementById("precio")
      ?.innerText.trim();

    if(!productoId || !nombre || !imagenSrc || !precioTexto) {
      return;
    }

    const precio = parseInt(
      precioTexto.replace(/\D/g, "")
    );

    const cantidad = parseInt(
      document.getElementById("cantidad")?.innerHTML
    ) || 1;

    const agregado = await agregarAlCarrito(
      productoId,
      nombre,
      precio,
      imagenSrc,
      cantidad
    );

    if(agregado) {
      actualizarCarrito();
      mostrarMensajeCarrito();
      cerrarModal();
    }

  });

}

  // Cargar footer.html
  const footerResponse = await fetch("./components/footer.html");
  
  const footerHtml = await footerResponse.text();

  document.getElementById("footer").innerHTML = footerHtml;

  } catch (err) {
    console.error("Error al cargar nav o footer:", err);
  }
  
});