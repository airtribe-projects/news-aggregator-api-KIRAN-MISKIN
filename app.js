const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const {authentication} = require('./middleware/auth');
const usersRouter = require('./router/usersRouter');
const { news } = require('./controller/news');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter)
app.get('/news', authentication, news)


module.exports = app;
