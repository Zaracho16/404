
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

router.post("/", (req, res) => {

    const {
        marca,
        nombre,
        precio,
        imagen,
        familia,
        notas,
        descripcion
    } = req.body;


    const sql = `
        INSERT INTO productos
        (marca, nombre, precio, imagen, familia, notas, descripcion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            marca,
            nombre,
            precio,
            imagen,
            familia,
            JSON.stringify(notas),
            descripcion
        ],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: "Error al crear producto"
                });
            }


            res.status(201).json({
                mensaje: "Producto creado",
                id: resultado.insertId
            });

        }
    );

});

router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        marca,
        nombre,
        precio,
        imagen,
        familia,
        notas,
        descripcion
    } = req.body;


    const sql = `
        UPDATE productos
        SET 
            marca = ?,
            nombre = ?,
            precio = ?,
            imagen = ?,
            familia = ?,
            notas = ?,
            descripcion = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            marca,
            nombre,
            precio,
            imagen,
            familia,
            JSON.stringify(notas),
            descripcion,
            id
        ],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: "Error al actualizar producto"
                });
            }


            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }


            res.json({
                mensaje: "Producto actualizado"
            });

        }
    );

});

router.delete("/:id", (req, res) => {

    const id = req.params.id;


    db.query(
        "DELETE FROM productos WHERE id = ?",
        [id],
        (error, resultado) => {

            if(error){
                console.log(error);

                return res.status(500).json({
                    mensaje: "Error al eliminar producto"
                });
            }


            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }


            res.json({
                mensaje: "Producto eliminado"
            });

        }
    );

});

module.exports = router;