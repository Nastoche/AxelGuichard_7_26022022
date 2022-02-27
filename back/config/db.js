const mysql = require("mysql");

// Create connexion
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anker",
  database: "groupomania",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to db !");
});

module.exports.getDB = () => {
  return db;
};
