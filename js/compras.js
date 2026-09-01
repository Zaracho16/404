
const API_URL = "https://four04-8o6t.onrender.com";

const usuario = JSON.parse(localStorage.getItem("usuario"));

if(!usuario) {
    window.location.href = 'inicioSesion.html';
}

async function cargarPedido() {
    
    try {

        const respuesta = await fetch(
            `${API_URL}/carrito/${usuario.id}`
        );

        const datos = await respuesta.json();

        console.log("Carrito para compras", datos);

        if(!respuesta.ok) {
            console.log("error al obtener carrito");
            return;
        }

        mostrarProductos(datos.productos);


    } catch(error) {

        console.log("error al cargar el pedido: ", error);

    }

}

function mostrarProductos(productos) {

    const contenedorProductos = document.getElementById("lista-productos-compra");
    
    const contenedorSubtotales = document.getElementById("lista-subtotales-compra");

    const totalCompra = document.getElementById("total-compra");

    if (!contenedorProductos || !contenedorSubtotales || !totalCompra) {
        
        console.log("No se encontraron contenedores del pedido");
        return;

    }

    let total = 0;

    productos.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        // producto
        const productoElemento =
            document.createElement("div");

        productoElemento.classList.add("producto-pedido");


        const imagen =
            document.createElement("img");

        imagen.src = producto.imagen;

        imagen.alt = producto.nombre;


        const info =
            document.createElement("div");

        info.classList.add("info-producto-pedido");


        const nombre =
            document.createElement("p");

        nombre.textContent = producto.nombre;


        const cantidad =
            document.createElement("span");

        cantidad.textContent =
            `Cantidad: ${producto.cantidad}`;


        info.appendChild(nombre);

        info.appendChild(cantidad);


        productoElemento.appendChild(imagen);

        productoElemento.appendChild(info);


        // subtotal
        const subtotalElemento =
            document.createElement("div");

        subtotalElemento.classList.add(
            "subtotal-producto-pedido"
        );


        const precio =
            document.createElement("span");

        precio.textContent =
            `${subtotal.toLocaleString("es-PY")} Gs`;


        subtotalElemento.appendChild(precio);


        contenedorProductos.appendChild(
            productoElemento
        );

        contenedorSubtotales.appendChild(
            subtotalElemento
        );

    });

    totalCompra.textContent = total.toLocaleString("es-PY");

}

cargarPedido();