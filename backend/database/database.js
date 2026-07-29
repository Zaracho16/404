
const mysql = require("mysql2");

const db = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});


db.connect((error) => {

    if(error){
        console.log("Error conectando a la BD:", error);
        return;
    }

    console.log("Base de datos conectada");

});


module.exports = db;