const { PrismaClient } = require('@prisma/client');
const {requestBodyValidation} = require('../utils/requestbodyvalidation')
const bcrypt = require('bcrypt');
const {sendResponse} = require('../utils/responseHandler')

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    await requestBodyValidation(req.body, "register");
    const { name, email, password } = req.body;
    const preferences1 = req.body.preferences
    let preferences = [];
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    if(typeof(preferences1) === "string"){
      preferences.push(preferences1)
    } else {
      preferences = preferences1;
    }
    const addUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        preferences: preferences && preferences.length > 0 ? preferences : undefined
      }
    });
    sendResponse(res,200,"Successfully Registered")
  } catch (err) {
    console.error("Error at registerUser:", err);
    sendResponse(res,400,err.message)
  }
};

module.exports = { registerUser };
