const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const usersRouter = require('./router/usersRouter');
const newsRouter = require('./router/newsRouter')
const requestLogger = require('./logger/requestLogger')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use logger middleware for all routes
app.use(requestLogger);

app.use('/users', usersRouter)
app.use('/news', newsRouter)

// every 15 minutes clear cache so it gets refreshed
setInterval(() => {
  console.log("♻ Clearing cache to refresh data...");
  clearCache();
}, 15 * 60 * 1000);



module.exports = app;
