const {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/Post");
const Post = require("../models/post");
const express = require("express");
const router = express.Router();
// Adding Posts
router.post("/new", addPost);
// Get all Posts
router.get("/", getPosts);
// Get single Post
router.get("/:id", getPost);
// Patch single Post
router.patch("/update/:id", updatePost);
// Delete  Post
router.delete("/delete/:id", deletePost);

module.exports = router;
