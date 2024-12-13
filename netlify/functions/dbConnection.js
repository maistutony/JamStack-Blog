const mongoose=require("mongoose")
require("dotenv").config();
const dbConnection=async ()=>{
    try{
      if(mongoose.connections[0].readyState){
        console.log("already connected")
        return
      }
       await mongoose
       .connect(process.env.URL_STRING, {
         useNewUrlParser: true
       })
       console.log("connected to db")
    }
    catch(err){
          console.log(`error ${err}`)
          process.exit(1)
    }
}
module.exports=dbConnection;