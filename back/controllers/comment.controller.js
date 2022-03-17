const dbc = require("../config/db");
const db = dbc.getDB();
const jwt = require("jsonwebtoken");

// CRUD comments

exports.deleteOneComment = (req, res) => {
  const { jwt: token } = req.cookies;
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const { user_id, admin } = decodedToken;
  const comment_id = req.params.id;

  const sql = `DELETE c FROM comments AS c
  INNER JOIN users AS u
  ON (u.user_id = c.author_id)
  WHERE c.id = ${comment_id} AND (${admin} = 1 OR u.user_id = ${user_id});`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneComment = (req, res) => {
  const commentId = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.id = ${commentId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// exports.getProfilPicture = (req, res) => {
//   const { id: user_id } = req.params;
//   const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
//   db.query(sqlGetUser, (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     res.status(200).json(result);
//   });
// };

exports.getAllComments = (req, res) => {
  const postId = req.params.id;
  const sql = `SELECT id, message, created_at, updated_at, likes, user_id, user_firstname, user_lastname FROM comments INNER JOIN users ON comments.author_id=users.user_id WHERE comments.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.createComment = (req, res, next) => {
  const { message, post_id, author_id } = req.body;
  if (message.length <= 0 || message.length > 200) return null;

  const sql = `INSERT INTO comments (post_id, author_id, message, created_at, updated_at, likes) VALUES (${post_id}, ${author_id}, "${message}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '0')`;
  db.query(sql, (err, result) => {
    if (err || message.length === 0 || message.length >= 200) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};
