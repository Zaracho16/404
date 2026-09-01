
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

const botonFinalizar =
    document.getElementById("btn-finalizar-compra");


if (botonFinalizar) {

    botonFinalizar.addEventListener("click", async () => {

        const nombre =
            document.querySelector(
                'input[placeholder="Nombre"]'
            ).value.trim();


        const apellido =
            document.querySelector(
                'input[placeholder="Apellido"]'
            ).value.trim();


        const direccion =
            document.querySelector(
                'input[placeholder="Dirección de la calle"]'
            ).value.trim();


        const ciudad =
            document.querySelector(
                'input[placeholder="Ciudad"]'
            ).value.trim();


        const telefono =
            document.querySelector(
                'input[placeholder="Teléfono"]'
            ).value.trim();


        const correo =
            document.querySelector(
                'input[placeholder="Correo electrónico"]'
            ).value.trim();


        const cedula =
            document.querySelector(
                'input[placeholder="Cédula de identidad"]'
            ).value.trim();


        const metodoPago =
            document.querySelector(
                'input[name="metodo-pago"]:checked'
            )?.value;


        // Validar campos

        if (
            !nombre ||
            !apellido ||
            !direccion ||
            !ciudad ||
            !telefono ||
            !correo ||
            !cedula
        ) {

            alert("Completá todos los datos de facturación");

            return;

        }


        if (!metodoPago) {

            alert("Seleccioná un método de pago");

            return;

        }


        try {

            const respuesta = await fetch(
                `${API_URL}/compras`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        usuarioId: usuario.id,

                        nombre,
                        apellido,
                        direccion,
                        ciudad,
                        telefono,
                        correo,
                        cedula,

                        metodoPago

                    })
                }
            );


            const datos = await respuesta.json();


            console.log(
                "Respuesta de compra:",
                datos
            );


            if (!respuesta.ok) {

                alert(
                    datos.mensaje ||
                    "No se pudo realizar la compra"
                );

                return;

            }


            alert(
                `Compra realizada correctamente.\n\nNúmero de compra: ${datos.compraId}\nTotal: ${datos.total.toLocaleString("es-PY")} Gs`
            );


            window.location.href = "index.html";


        } catch (error) {

            console.log(
                "Error al finalizar compra:",
                error
            );

            alert(
                "Ocurrió un error al realizar la compra"
            );

        }

    });

}