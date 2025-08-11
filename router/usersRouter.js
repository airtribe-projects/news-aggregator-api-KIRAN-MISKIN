const express = require('express');
const { registerUser } = require('../controller/register');
const {login} = require('../controller/login')
const usersRouter = express.Router();
const {authentication} = require('../middleware/auth');
const { getPreference, putPreference } = require('../controller/preference');


usersRouter.post('/signup', registerUser)
usersRouter.post('/login', login)
usersRouter.get('/preferences', authentication, getPreference)
usersRouter.put('/preferences', authentication, putPreference)

module.exports = usersRouter;
