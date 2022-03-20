const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const userCtrl = require("../controllers/auth.controller");

// Auth
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/deactivateAccount/:id", auth, userCtrl.deactivateAccount);
router.get("/deleteAccount/:id", auth, userCtrl.deleteAccount);

module.exports = router;
