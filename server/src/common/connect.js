var mysql = require("mysql2");
// require("dotenv").config();

var con = mysql.createConnection({
    host: process.env.DB_HOST || "localhost55",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DBNAME || "pbl5",
    port: 3306,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
