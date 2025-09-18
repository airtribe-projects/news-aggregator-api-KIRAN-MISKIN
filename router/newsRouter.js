const express = require('express');
const newsRouter = express.Router();
const { news, newsGetFavorite, newsGetRead, newsMarkRead, newsMarkFavorite, newSearch } = require('../controller/news');
const {authentication} = require('../middleware/auth');

newsRouter.get('/', authentication, news)
newsRouter.post('/:id/read', authentication, newsMarkRead)
newsRouter.post('/:id/favorite', authentication, newsMarkFavorite)
newsRouter.get('/read', authentication, newsGetRead)
newsRouter.get('/favorites', authentication, newsGetFavorite)
newsRouter.get('/search/:keyword', authentication, newSearch)


module.exports = newsRouter
