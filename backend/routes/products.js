
const express = require("express");

const router = express.Router();

const db = require("../database/database");


router.get("/", (req, res) => {

    db.query("SELECT * FROM productos", (error, productos) => {

        if(error){
            console.log(error);
            return res.status(500).json({
                mensaje: "Error al obtener productos"
            });
        }

        res.json(productos);

    });

});

router.get("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM productos WHERE id = ?",
        [id],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: "Error al buscar producto"
                });
            }


            if(resultado.length === 0){
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }


            res.json(resultado[0]);

        }
    );

});

module.exports = router;