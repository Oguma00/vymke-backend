const Post = require("../models/post");
const User = require("../models/user");

const updatedUser = async (req, res) => {
    try {
      const id = req.params.id;
      const opition = { new: true };
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  