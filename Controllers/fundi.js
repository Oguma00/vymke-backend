const Post = require("../models/post");
const addPost= async (req, res) => {
    try {
      const {
        fundiImg,
        fundiBody,
        fundiCategory,
        fundiAuthor,
      } = req.body;
      const newfundi = new fundi({
        fundiImg,
        fundiBody,
        fundiCategory,
        fundiAuthor,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(201).json(savedPost);
    }
  }

  const getPosts=  async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  const getPost= async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  const updatePost= async (req, res) => {
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
  }

  const deletePost= async (req,res)=>{
    try {
      const id=req.params.id
      const deletePost=await Post.findByIdAndDelete(id)
      res.status(200).json(deletePost)
    } catch (error) {
      res.status(404).json(error);
    }
  }

  module.exports={addPost,getPosts,getPost,updatePost,deletePost}