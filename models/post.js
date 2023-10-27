const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postTittle: { type: String, required: true },
  postProfession: { type: String, required: true },
  postDescription: { type: String, required: true },
});
module.exports = mongoose.model("Post", postSchema);
