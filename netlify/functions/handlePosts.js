const dbConnection = require("./dbConnection");
const express = require("express");
const app = express();
app.use(express.json());
const Posts = require("../functions/models/postsModel");

async function handleDeleteRequest(event) {
  // Split the path and get the last segment
  const pathParts = event.path.split("/");
  const postId = pathParts[pathParts.length - 1];
  //get userId
  const verifiedId = event.headers["x-request-id"];
  try {
    // Step 1: Establish database connection
    await dbConnection();
    const postToDelete = await Posts.findOne({ _id: postId });
    if (!postToDelete) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `post not found` }),
      };
    }
    const postAuthorId = postToDelete.author.toString();
    if (postAuthorId !== verifiedId) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: `no permission to delete` }),
      };
    }
    // Delete the post
    const deletedPost = await Posts.findByIdAndDelete(postId);
    const userPosts = await Posts.find({ author: verifiedId });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `successfully deleted`, deletedPost }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" }),
    };
  }
}

async function handlePostRequest(event) {
  try {
    const userId = event.headers["x-request-id"];
    // Parse JSON body if present
    const { title, category, content, imageUrl, description } = JSON.parse(
      event.body
    );
    if (!title && content && category) {
      return {
        statusCode: 401,
        body: JSON.stringify("supply a title"),
      };
    }
    // Step 1: Establish database connection
    await dbConnection();
    const postToSave = new Posts({
      title,
      category,
      content,
      imageUrl,
      description,
      author: userId,
      timePublished: new Date().toLocaleString(),
    });
    const postSaved = await postToSave.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "POST request received",
        postToSave,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" }),
    };
  }
}

async function handlePutRequest(event) {
  // Split the path and get the last segment
  const pathParts = event.path.split("/");
  const postId = pathParts[pathParts.length - 1];
  //get userId
  const verifiedId = event.headers["x-request-id"];
  // Parse JSON body if present
  const { title, description, content, category, imageUrl } = JSON.parse(
    event.body
  );
  //post to edit
  const newPost = {
    title,
    category,
    imageUrl,
    content,
    description,
    timeUpdated: new Date().toLocaleString(),
  };
  try {
    // Step 1: Establish database connection
    await dbConnection();
    const postToEdit = await Posts.findOne({ _id: postId });
    if (!postToEdit) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "POST not found",
        }),
      };
    }
    //confirm author
    const postAuthorId = postToEdit.author.toString();
    if (postAuthorId !== verifiedId) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: `no permission to edit` }),
      };
    }
    //update the post
    const updatedPost = await Posts.findByIdAndUpdate(
      postId, // ID
      { $set: newPost }, // Update
      { new: true } // Return the updated document
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "POST request received",
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" }),
    };
  }
}
const handler = async function (event, context) {
  // Handle different HTTP methods
  if (event.httpMethod === "GET") {
    return handleGetRequest(event);
  } else if (event.httpMethod === "POST") {
    return handlePostRequest(event);
  } else if (event.httpMethod === "PUT") {
    return handlePutRequest(event);
  } else if (event.httpMethod === "DELETE") {
    return handleDeleteRequest(event);
  }

  // Default response for unsupported methods
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
};
module.exports.handler = handler;
