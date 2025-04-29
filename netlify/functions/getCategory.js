const dbConnection = require("./dbConnection");
const express = require("express");
const app = express();
app.use(express.json());
const Posts = require("../functions/models/postsModel");

const handler = async function(event, context) {
    const pathParts = event.path.split('/');
    const category= pathParts[pathParts.length - 1];
  try {
    // Step 1: Establish database connection
     await dbConnection();
        // Step 2: Fetch all posts
        const allPosts = await Posts.find({category: category});

        // Step 3: Return successful response if posts are found
        if (allPosts) {
          return {
            statusCode: 200,
            body:JSON.stringify(allPosts),
          };
        } else {
          // Handle case where no posts are found
          return {
            statusCode: 404,
            body: JSON.stringify({ message: "No posts found" }),
          };
        }
      } catch (error) {
        // Step 4: Handle error when fetching posts
        console.error('Error fetching posts:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to fetch posts", details: error.message }),
        };
      }
    } 

module.exports.handler = handler;
