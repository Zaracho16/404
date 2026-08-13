
function obtenerUsuario() {

    const usuarioGuardado = localStorage.getItem("usuario");

    if(!usuarioGuardado) {
        return null;
    }

    return JSON.parse(usuarioGuardado);

}

function cerrarSesion() {

    const usuario = obtenerUsuario();

    if(usuario) {
        sessionStorage.setItem("cerrarSesion", usuario.nombre);
    }

    localStorage.removeItem("usuario");

    window.location.reload();

}


export {
    obtenerUsuario,
    cerrarSesion
};