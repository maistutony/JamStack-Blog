const dbConnection = require("./dbConnection");
const express = require("express");
const app = express();
app.use(express.json());
const Users = require("./models/userModel");
const bcrypt = require("bcrypt");

const handler = async function (event, context) {
  const { email, password,username } = JSON.parse(event.body);
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
    if (existingUser) {
      return {
        statusCode: 409, // Conflict status code
        body: JSON.stringify({
          exists: true,
          message:
            existingUser.email === email
              ? "Email already in use"
              : "Username already taken",
        }),
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToSave = new Users({
      password: hashedPassword,
      email: email,
      userName: username,
    });
    const saveUser=await userToSave.save()
    return {
      statusCode: 200,
      body: JSON.stringify({ exists: false }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports.handler = handler;
