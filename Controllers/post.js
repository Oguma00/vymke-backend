const Post = require("../models/post");
const addPost = async (req, res) => {
  try {
    const { postImg, postContact, postName, postBooking, postProfession, } = req.body;
    const newPost = new Post({
      postImg,
      postContact,
      postProfession,
      postBooking,
      postName,
  
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const Posts = await Posts.find();
    res.status(200).json(Posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const Post = await Post.findById(id);
    res.status(200).json(Post);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const opition = { new: true };
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletePost);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { addPost, getPosts, getPost, updatePost, deletePost };
