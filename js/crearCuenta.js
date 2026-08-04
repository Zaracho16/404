
const API_URL = "https://four04-8o6t.onrender.com";


const formulario = document.getElementById("formCrearCuenta");


formulario.addEventListener("submit", async (e) => {

    e.preventDefault();


    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {

        const respuesta = await fetch(`${API_URL}/usuarios/registro`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                email,
                password
            })

        });


        const datos = await respuesta.json();


        console.log(datos);


        alert(datos.mensaje);


    } catch(error) {

        console.log("Error:", error);

    }

});