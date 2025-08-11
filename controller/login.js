const { requestBodyValidation } = require('../utils/requestbodyvalidation')
const bcrypt = require('bcrypt');
const { sendResponse } = require('../utils/responseHandler')
const jwt = require('jsonwebtoken');

const jwtTokenGeneration = async (jwtData) => {
    const SECRET_KEY = process.env.JWT_SECRET || 'kiran_kumar_miskn_special';
    const token = jwt.sign(jwtData, SECRET_KEY, { expiresIn: '2h' });

    return token;
}

const login = async (req, res) => {
    try {
        const userData = await requestBodyValidation(req.body, "login");
        const { password } = req.body
        const isMatch = await bcrypt.compare(password, userData.password)
        const jwtData = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
        if (!isMatch) {
            return sendResponse(res, 401, "Invalid password, Please check the password and try again")
        }
        const token = await jwtTokenGeneration(jwtData)
        sendResponse(res, 200, {token})
    } catch (err) {
        console.log("Error at login fucntion", err)
        sendResponse(res, 400, err.message)
    }
}

module.exports = { login }
