
// obtener el carrito por usuario

const express = require("express");

const router = express.Router();

const db = require("../database/database");

router.get("/:usuarioId", (req, res) => {

  const usuarioId = req.params.usuarioId;

  const sqlCarrito = `
    SELECT id
    FROM carritos
    WHERE usuario_id = ?
  `;


  db.query(sqlCarrito, [usuarioId], (error, resultado) => {

    if(error) {
      console.log(error);

      return res.status(500).json({
        mensaje: "Error al buscar carrito"
      });
    }

    // verificamos si el usuario no tiene todavia carrito
    if(resultado.length === 0) {
      return res.json({
        carritoId: null,
        productos: []
      });
    }

    const carritoId = resultado[0].id;
    
    
    const sqlProductos = `
      SELECT
          detalle_carrito.producto_id,
          detalle_carrito.cantidad,
          productos.nombre,
          productos.precio,
          productos.imagen

      FROM detalle_carrito

      INNER JOIN productos
        ON detalle_carrito.producto_id = productos.id

      WHERE detalle_carrito.carrito_id = ?
    `;


    db.query(sqlProductos, [carritoId], (error, resultado) => {

      if(error) {

        console.log(error);

        return res.status(500).json({
          mensaje: "Error al obtener productos del carrito"
        });

      }

      res.json({
        carritoId,
        productos: resultado
      });

    });


  });


});

router.post("/", (req, res) => {

    const { usuarioId, productoId, cantidad } = req.body;

    const sqlBuscarCarrito = `
        SELECT id
        FROM carritos
        WHERE usuario_id = ?
    `;

    db.query(sqlBuscarCarrito, [usuarioId], (error, resultado) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                mensaje: "Error al buscar carrito"
            });

        }

        if (resultado.length === 0) {

            const sqlCrearCarrito = `
                INSERT INTO carritos (usuario_id)
                VALUES (?)
            `;

            db.query(sqlCrearCarrito, [usuarioId], (error, resultado) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: "Error al crear carrito"
                    });

                }

                const carritoId = resultado.insertId;

                agregarProducto(carritoId);

            });

        } else {

            const carritoId = resultado[0].id;

            agregarProducto(carritoId);

        }


        function agregarProducto(carritoId) {

            const sqlAgregarProducto = `
                INSERT INTO detalle_carrito
                    (carrito_id, producto_id, cantidad)

                VALUES (?, ?, ?)

                ON DUPLICATE KEY UPDATE
                    cantidad = cantidad + VALUES(cantidad)
            `;

            db.query(
                sqlAgregarProducto,
                [carritoId, productoId, cantidad || 1],
                (error) => {

                    if (error) {

                        console.log(error);

                        return res.status(500).json({
                            mensaje: "Error al agregar producto al carrito"
                        });

                    }

                    res.json({
                        mensaje: "Producto agregado al carrito",
                        carritoId
                    });

                }
            );

        }

    });

});

module.exports = router;