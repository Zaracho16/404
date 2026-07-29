
const productsRoutes = require("./routes/products");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productsRoutes);


app.get("/", (req, res) => {
    res.json({
        mensaje: "API funcionando"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});