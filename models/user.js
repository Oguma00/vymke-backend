const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
   firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String},
    location:{type:String},
    bio:{type:String},
    documents:{type:Array},
    isFundi:{type:String,default:false},
    image:{type:String},
    proffession:{type:String},

})
module.exports=mongoose.model("User",userSchema) 