
const express = require("express");
const router = express.Router();

const db = require("../database/database");


router.post("/", (req, res) => {

    const {
        usuarioId,
        nombre,
        apellido,
        direccion,
        ciudad,
        telefono,
        correo,
        cedula,
        metodoPago
    } = req.body;



    const sqlCarrito = `
        SELECT id
        FROM carritos
        WHERE usuario_id = ?
    `;


    db.query(sqlCarrito, [usuarioId], (error, resultadoCarrito) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                mensaje: "Error al buscar carrito"
            });
        }


        if (resultadoCarrito.length === 0) {

            return res.status(400).json({
                mensaje: "El usuario no tiene carrito"
            });

        }


        const carritoId = resultadoCarrito[0].id;

        const sqlProductos = `
            SELECT
                producto_id,
                cantidad,
                productos.precio
            FROM detalle_carrito
            INNER JOIN productos
                ON detalle_carrito.producto_id = productos.id
            WHERE carrito_id = ?
        `;


        db.query(
            sqlProductos,
            [carritoId],
            (error, productos) => {

                if (error) {
                    console.log(error);

                    return res.status(500).json({
                        mensaje: "Error al obtener productos del carrito"
                    });
                }


                if (productos.length === 0) {

                    return res.status(400).json({
                        mensaje: "El carrito está vacío"
                    });

                }



                let total = 0;


                productos.forEach(producto => {

                    total +=
                        producto.precio * producto.cantidad;

                });



                const sqlCompra = `
                    INSERT INTO compras
                    (
                        usuario_id,
                        nombre,
                        apellido,
                        direccion,
                        ciudad,
                        telefono,
                        correo,
                        cedula,
                        metodo_pago,
                        total
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;


                db.query(
                    sqlCompra,
                    [
                        usuarioId,
                        nombre,
                        apellido,
                        direccion,
                        ciudad,
                        telefono,
                        correo,
                        cedula,
                        metodoPago,
                        total
                    ],
                    (error, resultadoCompra) => {

                        if (error) {
                            console.log(error);

                            return res.status(500).json({
                                mensaje: "Error al crear la compra"
                            });
                        }


                        const compraId =
                            resultadoCompra.insertId;


                        let productosProcesados = 0;


                        productos.forEach(producto => {

                            const subtotal =
                                producto.precio *
                                producto.cantidad;


                            const sqlDetalle = `
                                INSERT INTO detalle_compra
                                (
                                    compra_id,
                                    producto_id,
                                    cantidad,
                                    precio_unitario,
                                    subtotal
                                )
                                VALUES (?, ?, ?, ?, ?)
                            `;


                            db.query(
                                sqlDetalle,
                                [
                                    compraId,
                                    producto.producto_id,
                                    producto.cantidad,
                                    producto.precio,
                                    subtotal
                                ],
                                (error) => {

                                    if (error) {
                                        console.log(error);

                                        return res.status(500).json({
                                            mensaje:
                                                "Error al guardar detalle de compra"
                                        });
                                    }


                                    productosProcesados++;


                                    if (
                                        productosProcesados ===
                                        productos.length
                                    ) {

                                        const sqlVaciarCarrito = `
                                            DELETE FROM detalle_carrito
                                            WHERE carrito_id = ?
                                        `;


                                        db.query(
                                            sqlVaciarCarrito,
                                            [carritoId],
                                            (error) => {

                                                if (error) {
                                                    console.log(error);

                                                    return res.status(500).json({
                                                        mensaje:
                                                            "Error al vaciar carrito"
                                                    });
                                                }


                                                res.json({

                                                    mensaje:
                                                        "Compra realizada correctamente",

                                                    compraId,

                                                    total

                                                });

                                            }
                                        );

                                    }

                                }
                            );

                        });

                    }
                );

            }
        );

    });

});


module.exports = router;