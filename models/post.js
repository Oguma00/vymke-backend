const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postImg: { type: String, required: true },
  postProfession: { type: String, required: true },
  postBooking: { type: String, required: true },
  postName: { type: String, required: true },
});
module.exports = mongoose.model("Post", postSchema);
