
const usuario = JSON.parse(localStorage.getItem("usuario"));

if(!usuario) {
    
}

const respuesta = await fetch(
    `https://four04-8o6t.onrender.com/carrito/${usuario.id}`
);

const datos = await respuesta.json();