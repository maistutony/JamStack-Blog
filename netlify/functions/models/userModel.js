const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    password:String,
    email:String,
    userName:String
})
module.exports=mongoose.model("users",userSchema)
