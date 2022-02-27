const jwt = require("jsonwebtoken");
const dbc = require("../config/db");

module.exports = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const { user_id: userId } = decodedToken;
      let db = dbc.getDB();
      const sql = `SELECT user_id FROM users WHERE user_id = ${userId}`;
      db.query(sql, (err, result) => {
        if (err) res.status(204).json(err);
        else {
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Unauthorized"});
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};