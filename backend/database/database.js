
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2025",
    database: "404"
});

module.exports = db;