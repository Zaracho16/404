
const db = require("./database");


db.run(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca TEXT,
        nombre TEXT,
        precio INTEGER,
        imagen TEXT,
        familia TEXT,
        notas TEXT,
        descripcion TEXT
    )
`, (error) => {

    if(error){
        console.log(error);
    } else {
        console.log("Tabla creada");
    }

});