
const mysql = require("mysql2");

const db = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    ssl: {
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});


db.getConnection((error, connection) => {

    if(error) {
        console.log("Error conectando a la BD:", error);
        return;
    }

    console.log("Base de datos conectada");

    connection.query("SET time_zone = '-03:00'", (error) => {

        if(error) {
            console.log("Error en la configuracion de la zona horaria", error);
            connection.release();
            return;
        }

        console.log("Zona horaria configurada en UTC-3");
        connection.release();

    });

});

module.exports = db;