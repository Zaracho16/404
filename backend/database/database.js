
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/perfumes.db", (error) => {

    if (error) {
        console.log("Error conectando a la BD:", error);
        return;
    }

    console.log("Base de datos conectada");
});


module.exports = db;