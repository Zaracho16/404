
const bcrypt = require("bcrypt");

const express = require("express");

const router = express.Router();

const db = require ("../database/database");
const { route } = require("./products");

router.post("/registro", async (req, res) => {

    const { nombre, email, password } = req.body;

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO usuarios (nombre, email, password)
        VALUES ( ?, ?, ? );
    `

    db.query(sql, [nombre, email, passwordEncriptada], (error, resultado) => {
        
        if(error) {
            console.log(error);

            if(error.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    mensaje: "El correo ya está registrado"
                });
            }

            return res.status(500).json({
                mensaje: "Error al registrar usuario"
            });
        }

        res.json({
            mensaje: "Usuario registrado correctamente",
            id: resultado.insertId
        });

    });

});


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

module.exports = router;