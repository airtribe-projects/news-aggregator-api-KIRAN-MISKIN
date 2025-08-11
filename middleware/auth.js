const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/responseHandler');
const SECRET_KEY = process.env.JWT_SECRET || 'kiran_kumar_miskn_special';


const authentication = (req, res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return sendResponse(res,401,'Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return sendResponse(res,401,'Invalid or expired token.')
  }
};

module.exports = { authentication }
