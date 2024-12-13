const jwt = require("jsonwebtoken");
require("dotenv").config();

//check if user is loged-in by verifying the jwt token
const authUser=async(req,res,next)=>{
    let authToken = req.headers["authorization"];
    if(!authToken){res.json("Not authorized")}else{
      const token = authToken.split(' ')[1];
      try{
        const verified= await jwt.verify(token,process.env.SECRET_KEY);
        if(verified){
          req.userId=verified.userId;
          next();
        }
    }catch(error){
      res.json("invalid token")
    }
    }
    
  
}
module.exports=authUser;