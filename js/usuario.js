
function obtenerUsuario() {

    const usuarioGuardado = localStorage.getItem("usuario");

    if(!usuarioGuardado) {
        return null;
    }

    return JSON.parse(usuarioGuardado);

}

function cerrarSesion() {

    localStorage.removeItem("usuario");

    window.location.reload();

}


export {
    obtenerUsuario,
    cerrarSesion
};