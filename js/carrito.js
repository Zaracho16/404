
const API_URL = "https://four04-8o6t.onrender.com";

export let carrito = [];


export async function agregarAlCarrito(
    productoId,
    nombre,
    precio,
    imagenSrc,
    cantidad = 1
) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {

        console.log("No hay usuario logueado");

        return;

    }

    try {

        const respuesta = await fetch(`${API_URL}/carrito`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuarioId: usuario.id,
                productoId: productoId,
                cantidad: cantidad
            })

        });

        const datos = await respuesta.json();

        console.log("Respuesta del carrito:", datos);

        if (!respuesta.ok) {

            console.log("Error al agregar producto");

            return;

        }

        console.log("Producto agregado correctamente");

    } catch(error) {

        console.log("Error:", error);

    }

}


export async function cargarCarrito() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {

        carrito = [];

        return;

    }

    try {

        const respuesta = await fetch(
            `${API_URL}/carrito/${usuario.id}`
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            console.log("Error al cargar carrito:", datos);

            return;

        }

        carrito = datos.productos;

        console.log("Carrito cargado desde la BD:", carrito);

    } catch(error) {

        console.log("Error al cargar carrito:", error);

    }

}


export function eliminarDelCarrito(index) {

    console.log("Eliminar del carrito todavía no migrado");

}