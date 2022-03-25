const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbc = require("../config/db");
const db = dbc.getDB();
const path = require("path");

// RUD users

exports.getOneUser = (req, res, next) => {
  const { id } = req.params;

  // `SELECT IFNULL( (SELECT * FROM users WHERE users.user_id = ${userId}) , users.user_id = ${localUserId} );`;

  const sqlGetUser = `SELECT * FROM users WHERE users.user_id = ${id};`;

  // const sqlGetUser = `SELECT IF( EXISTS(SELECT * FROM users WHERE user_id = ${id}), user_id = ${id}, 'Non, ça existe pas') ;`;

  // const sqlGetUser = `SELECT * FROM users IFNULL( (users.user_id = ${id}) , (users.user_id = ${clientId}));`;

  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result);
  });
};

exports.updateOneUser = (req, res, next) => {
  // const fileObject = JSON.parse(req.body.file);
  // console.log(fileObject);
  // console.log(
  //   `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  // );

  if (req.file) {
    const { id: user_id } = req.params;
    let { destination, filename } = req.file;
    destination = destination + filename;
    console.log(req.file);

    const sqlInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${user_id}, "${destination}");`;
    db.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
  }
  const { user_firstname, user_lastname, user_description } = req.body;
  const { id: userId } = req.params;
  const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}", user_description= "${user_description}" WHERE users.user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.postProfilPicture = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const { user_id } = decodedToken;

  let { body, file } = req;

  console.log(file);

  const sql = `INSERT INTO images (image_url, user_id) VALUES ("${file.filename}", ${user_id})`;
  const db = dbc.getDB();
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getProfilPicture = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
