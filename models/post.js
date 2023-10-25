const mongoose = require("mongoose");
const postSchema=new mongoose.Schema({
    postImg:{type:String,required:true},
    postCategory:{type:String,required:true},

})
module.exports=mongoose.model("Post", postSchema)