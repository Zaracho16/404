
const API_URL = "https://four04-8o6t.onrender.com";

const formulario = document.getElementById("login-form");

const cargaLogin = document.getElementById("mensaje-carga-login");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    cargaLogin.style.display = "flex";

    console.log("email: " + email);
    console.log("clave: " + password);

    try {

        const respuesta = await fetch(`${API_URL}/usuarios/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const datos = await respuesta.json();

        console.log("Respuesta del server: ", datos);
        
        if(respuesta.ok) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(datos.usuario)
            );

            sessionStorage.setItem (
                "bienvenida",
                "true"
            );

            window.location.href = "index.html";
 
        } else {

            alert(datos.mensaje);

        }


    } catch(error) {

        console.log("error: ", error);

        alert("no se pudo conectar con el servidor");

    }


});