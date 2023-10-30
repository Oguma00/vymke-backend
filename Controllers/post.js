const Post = require("../models/post");
const User = require("../models/user");

const addPost = async (req, res) => {
  try {
    // const { postTittle,postDescription,  postProffession,userId,postPrice } = req.body;
    // const newPost = new Post({
    //   postTittle,
    //   postProffession,
    //   postDescription,
    //   // postName,
    //   postPrice,
    //   userId
      
  
    // });
    // const savedPost = await newPost.save();
    // res.status(201).json(savedPost);
    const usersid=req.body.userId
    const user=await User.findById(usersid)
    console.log(user)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const newPost = new Post({
      postTittle:req.body.postTittle,
      postProffession:req.body.postProffession,
      postDescription:req.body.postDescription,
      postPrice:req.body.postPrice,
      userId:user,
      
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);


  } catch (error) {
    res.status(400).json(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate('userId');
    res.status(200).json(post);
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
