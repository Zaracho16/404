
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

    if(error){
        console.log("Error conectando a la BD:", error);
        return;
    }

    console.log("Base de datos conectada");

    connection.release();

});


module.exports = db;