
const express = require("express");

const router = express.Router();

const db = require ("../database/database");
const { route } = require("./products");

router.post("/registro", (req, res) => {

    const { nombre, email, password } = req.body;


    const sql = `
        INSERT INTO usuarios (nombre, email, password)
        VALUES ( ?, ?, ? );
    `

    db.query(sql, [nombre, email, password], (error, resultado) => {
        
        if(error) {
            console.log(error);

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

module.exports = router;