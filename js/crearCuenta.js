
const API_URL = "https://four04-8o6t.onrender.com";


const formulario = document.getElementById("registro-form");

const cargaRegistro = document.getElementById("cargaMensaje-registro");

const mensajeRegistroExitoso = document.getElementById("mensaje-registro-exitoso");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();


    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    cargaRegistro.style.display = "flex";

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

        cargaRegistro.style.display = "none";

        if(respuesta.ok) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(datos.usuario)
            );

            sessionStorage.setItem(
                "bienvenida",
                "true"
            );

           window.location.href = "./index.html";

        } else {

            mensajeRegistroExitoso.innerHTML = `
                <div class = "mensaje-registro-error">
                    <p> ${datos.mensaje} </p>
                </div>
            `;

        }


    } catch(error) {

        console.log("Error:", error);

        cargaRegistro.style.display = "none";

        mensajeRegistroExitoso.innerHTML = `
            <div class = "mensaje-registro-error">
                <p> No se pudo conectar con el servidor </p>
            </div>
        `;

    }

});