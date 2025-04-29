const jwt=require("jsonwebtoken");
const generated=(id)=>{
    const token=jwt.sign({userId:id},process.env.SECRET_KEY)
    return token;
}
module.exports={generated}
