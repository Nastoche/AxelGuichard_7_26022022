const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbc = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { user_password: password } = req.body;

    // ====== Password encryption =========
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = "INSERT INTO users SET ?";
    const db = dbc.getDB();
    db.query(sql, user, (err, result) => {
      if (!result) {
        res.status(200).json({ errors: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  } catch (err) {
    res.status(400).json({ errors: "Failed registration", err });
  }
};

exports.login = (req, res) => {
  //===== Check if user exists in DB ======
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT user_firstname, user_lastname, user_password, user_id, admin, active FROM users WHERE user_email=?`;
  const db = dbc.getDB();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err: "Cet email n'existe pas" });
    }

    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].active === 1) {
      try {
        const {
          user_password: hashedPassword,
          user_id,
          user_firstname,
          user_lastname,
          admin,
        } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // If match, generate JWT token
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign(
            { user_id, user_firstname, user_lastname, admin },
            process.env.JWT_TOKEN,
            {
              expiresIn: maxAge,
            }
          );

          // httpOnly: true,
          // maxAge,
          // sameSite: true,
          // secure: true,

          // remove the password key of the response
          delete results[0].user_password;

          res.cookie("jwt", token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign(
              { userId: user_id, user_firstname, user_lastname, admin },
              process.env.JWT_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "Mot de passe incorrect" });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(400).json({
        // A modifier pour que l'utilisateur puisse réactiver le compte
        error: true,
        errorMessage: "Votre compte a été désactivé",
      });
    } else if (!results[0]) {
      res.status(400).json({
        error: true,
        errorMessage: "Mauvaise combinaison email / mot de passe",
      });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

exports.deactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users u SET active=0 WHERE u.user_id = ?`;
  const db = dbc.getDB();
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("DEACTIVATED");
  });
};
