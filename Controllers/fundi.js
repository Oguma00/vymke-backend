const mongoose = require("mongoose");
const postSchema=new mongoose.Schema({
    fundiImg:{type:String,required:true},
    fundiBody:{type:String,required:true},
    fundiCategory:{type:String,required:true},
    fundiAuthor:{type:String,required:true},

})
module.exports=mongoose.model("fundi", postSchema)