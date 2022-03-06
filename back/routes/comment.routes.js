const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

// Comments CRUD
router.get("/:id/allcomments", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.post("/:id", auth, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteOneComment);

module.exports = router;
