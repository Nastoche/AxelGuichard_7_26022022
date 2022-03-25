const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const multer = require("../middlewares/multer-config");

// Post CRUD
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/image/:id", auth, userCtrl.getProfilPicture);
router.put("/:id", auth, multer, userCtrl.updateOneUser);
router.post("/image", auth, multer, userCtrl.postProfilPicture);

module.exports = router;
