const dbc = require("../config/db");
const db = dbc.getDB();
const jwt = require("jsonwebtoken");

// CRUD post

exports.createPost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.post_image;
  body = {
    ...body,
    likes: "",
  };

  const sqlInsert = "INSERT INTO posts SET ?";
  db.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  const sql =
    "SELECT message, post_user_id, post_id, date_creation, reported, user_firstname, user_lastname FROM posts INNER JOIN users ON posts.post_user_id = users.user_id ORDER BY date_creation DESC;";
  // "SELECT * FROM posts ORDER BY date_creation DESC;";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOnePost = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetOnePost = `SELECT date_creation, likes, message, post_id, post_user_id, reported, user_firstname, user_lastname FROM posts INNER JOIN users ON posts.post_user_id = users.user_id WHERE post_id = ${postId};`;
  db.query(sqlGetOnePost, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneImage = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetImage = `SELECT * FROM images WHERE images.post_id = ${postId};`;
  db.query(sqlGetImage, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result[0]) {
      result[0].image_url =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/posts/" +
        result[0].image_url;
    }
    res.status(200).json(result);
  });
};

exports.updatePost = (req, res, next) => {
  // let sql = "SELECT * FROM posts ORDER BY date_creation DESC;";
  // let db = dbc.getDB();
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     res.status(404).json({ err });
  //     throw err;
  //   }
  //   res.status(200).json(result);
  // });
};

exports.deleteOnePost = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const { user_id, admin } = decodedToken;
  const { id: post_id } = req.params;

  // const sql = `DELETE FROM posts  INNER JOIN user WHERE post_id = ${post_id} AND post_user_id = ${user_id} OR post_id = ${post_id} AND user.admin = ${admin};`;
  // const sql = `DELETE * FROM posts WHERE post_id = ${post_id} AND post_user_id = ${user_id} OR post_id = ${post_id} AND ${admin} = 1;`;
  const sql = `DELETE p FROM posts AS p
  INNER JOIN users AS u
  ON (u.user_id = p.post_user_id)
  WHERE p.post_id = ${post_id} AND (${admin} = 1 OR u.user_id = ${user_id});`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    console.log(result);
    res.status(200).json(result);
  });
};

exports.deleteOneReportedPost = (req, res, next) => {
  const { jwt: token } = req.cookies;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const { user_id, admin } = decodedToken;
  const { id: post_id } = req.params;

  const sql = `DELETE r FROM reports AS r
  INNER JOIN users AS u
  ON (u.user_id = r.user_id)
  WHERE r.post_id = ${post_id} AND (${admin} = 1 OR u.user_id = ${user_id});`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("erreur");
      res.status(404).json({ err });
      throw err;
    }
    console.log(result);
    res.status(200).json(result);
  });
};

// Like & unlike a post

exports.likeUnlikePost = (req, res) => {
  const { userId, postId } = req.body;
  const sqlSelect = `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId};`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sqlInsert = `INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId});`;
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      const sqlDelete = `DELETE FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId};`;
      db.query(sqlDelete, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json(result);
      });
    }
  });
};

exports.postLikedByUser = (req, res) => {
  const { userId, postId } = req.body;
  const sql = `SELECT post_id, user_id FROM likes WHERE user_id = ${userId} AND post_id = ${postId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.countLikes = (req, res) => {
  // Sert à compter le nombre d'utilisateurs ayant liké ce post
  // Select count = compter le nombre de rows dans une table
  const { postId } = req.body;
  const sqlInsert = `SELECT COUNT(*) AS total FROM likes INNER JOIN users AS u ON (u.user_id = likes.user_id) WHERE likes.post_id = ${postId};`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Manage reports

exports.reportPost = (req, res) => {
  const { postId, userId, isAdmin } = req.body;
  const sqlSelect = `SELECT * FROM posts WHERE posts.post_id = ${postId};`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result[0].reported === 0 && isAdmin == 0) {
      const sqlInsert = `UPDATE posts
      SET reported = 1
      WHERE posts.post_id = ${postId};`;
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else if (result[0].reported === 1 && isAdmin == 1) {
      const sqlInsert = `UPDATE posts
      SET reported = 0
      WHERE posts.post_id = ${postId};`;
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      return;
    }
  });
};

exports.getReportedPosts = (req, res, next) => {
  const { userId } = req.params;
  const sql =
    "SELECT message, post_user_id, post_id, date_creation, user_firstname, user_lastname FROM posts INNER JOIN users ON posts.post_user_id = users.user_id WHERE posts.reported = 1;";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getNumberOfReports = (req, res, next) => {
  const { isAdmin } = req.body;
  const sql = `SELECT COUNT(*) AS total FROM posts WHERE posts.reported = 1;`;
  if (isAdmin === true) {
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    });
  } else {
    return;
  }
};
