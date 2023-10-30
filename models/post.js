const mongoose = require("mongoose");
const User = require("./user");

const postSchema = new mongoose.Schema({
  postTittle: { type: String, required: true },
  postProffession: { type: String, required: true },
  postDescription: { type: String, required: true },
  // postName: { type: String, required: true },
  postPrice: { type: String, required: true },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User
  }
  

});
module.exports = mongoose.model("Post", postSchema);
