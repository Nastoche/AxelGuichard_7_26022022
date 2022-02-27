const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, upload.single("post_image"), postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deleteOnePost);
router.put("/:id", auth, postCtrl.updatePost);

// Images
router.get("/image/:id", auth, postCtrl.getOneImage);

// Like / Unlike
router.patch("/:id/likeunlike", auth, postCtrl.likeUnlikePost);
router.post("/:id/postLikedByUser", auth, postCtrl.postLikedByUser);
router.post("/:id/likeunlike", auth, postCtrl.countLikes);

module.exports = router;
