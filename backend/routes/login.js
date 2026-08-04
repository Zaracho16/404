
router.post("/login", async (req, res) => {

    const { email, password } = req.body;


    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;


    db.query(sql, [email], async (error, resultado) => {

        if(error){
            console.log(error);

            return res.status(500).json({
                mensaje: "Error al buscar usuario"
            });
        }


        if(resultado.length === 0){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }


        const usuario = resultado[0];


        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );


        if(!passwordCorrecta){
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }


        res.json({
            mensaje: "Login correcto",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    });

});