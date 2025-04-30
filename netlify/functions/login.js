const dbConnection = require("./dbConnection");
const express = require("express");
const app = express();
app.use(express.json());
const Users = require("../functions/models/userModel");
const postModel=require("../functions/models/postsModel")
const bcrypt = require("bcrypt");
const{generated}=require("../functions/controllers/generateToken")

const handler = async function(event, context) {
      const { email, password} =JSON.parse(event.body);
      if (!email || !password) {
        return {
          statusCode: 400, // Conflict status code
          body: JSON.stringify({
            message: JSON.stringify("provide email and password"),
          }),
        };
      }
      try {
         // Step 1: Establish database connection
     await dbConnection();
        const existingUser = await Users.findOne({ email: email });
        if (!existingUser){
           return {
            statusCode: 401, // Conflict status code
            body: JSON.stringify({ 
              message: existingUser.email + "not found"
            })
          };
        }
        const decoded = await bcrypt.compare(password, existingUser.password);

        if (!decoded) {
          return {
            statusCode: 400, // Conflict status code
            body: JSON.stringify({
              message: JSON.stringify("incorrect password"),
            }),
          };
          
        } 
        existingUser.password = undefined;
       const userPosts = await postModel.find({ author: existingUser._id });
        let combinedObject = {
          user: existingUser,
          userPosts: userPosts,
          token: generated(existingUser._id),
        };
        return {
            statusCode: 200,
            body: JSON.stringify(combinedObject)
          };
      } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
          };
      }
    }

module.exports.handler = handler;
