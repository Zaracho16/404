
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const productsRoutes = require("./routes/products");
const usuariosRoutes = require("./routes/usuarios");

app.use("/productos", productsRoutes);
app.use("/usuarios", usuariosRoutes);



app.get("/", (req, res) => {
    res.json({
        mensaje: "API funcionando"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});