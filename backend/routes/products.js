
const express = require("express");

const router = express.Router();

const db = require("../database/database");


router.get("/", (req, res) => {

    db.all("SELECT * FROM productos", (error, productos) => {

        if(error){
            console.log(error);
            return res.status(500).json({
                mensaje: "Error al obtener productos"
            });
        }

        res.json(productos);

    });

});

module.exports = router;