const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
   firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String,required:true},
    bio:{type:String,required:true},
    documents:{type:Array},
    isFundi:{type:String}

})
module.exports=mongoose.model("User",userSchema) 