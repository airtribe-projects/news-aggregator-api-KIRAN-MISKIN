const axios = require('axios')
const { PrismaClient } = require('@prisma/client');
const { sendResponse } = require('../utils/responseHandler');
const prisma = new PrismaClient();
const { checkNewsIdfn } = require('../utils/newsDboperations');

const news = async (req, res) => {
  try {
    const details = await prisma.users.findUnique({
      where: { email: req.user.email },
      select: { preferences: true }
    })

    const category = details.preferences.join(" and ")
    const API_KEY = process.env.API_TOKEN
    const BASE_URL = process.env.API_URL
    const response = await axios.get(BASE_URL, {
      params: {
        locale: "in",
        language: "en",
        api_token: API_KEY,
        search: category
      }
    });
    const formattedNews = response.data.data.map((x) => {
      return {
        id: x.uuid,
        title: x.title,
        description: x.description,
        url: x.url
      }
    })
    const result = { news: formattedNews }
    sendResponse(res, 200, result)
  } catch (err) {
    console.log("Error At news.js: ", err)
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

const newsMarkRead = async (req, res) => {
  try {
    const { id } = req.params
    const result = await checkNewsIdfn(id, req.user, "read")
    return sendResponse(res, 200, result)
  } catch (err) {
    console.log("Error at newsMarkRead at news function", err);
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

const newsMarkFavorite = async (req, res) => {
  try {
    const { id } = req.params
    const result = await checkNewsIdfn(id, req.user, "read")
    return sendResponse(res, 200, result)
  } catch (err) {
    console.log("Error at newsMarkFavorite at news function", err);
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

const newsGetRead = async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      return sendResponse(res, 400, "Get Request doesn't accept any body")
    }

    if (Object.keys(req.query).length > 0) {
      return sendResponse(res, 400, "Get Request doesn't accept any Query Parameters")
    }

    let email = req.user.email

    const allNewsItems = await prisma.news.findMany({})

    const readNews = allNewsItems.filter(items=>items.read !== null)
    if(readNews.length === 0){
      return sendResponse(res,404,"No Data Found")
    }

    let result = readNews.filter((items) => {
        if (items.read.includes(email)) {
        return items
      } 
    })
    if(result.length === 0){
      return sendResponse(res,404, "No Data Found")
    }
    result = result.map(x => {
      return {
        id: x.id,
        title: x.title,
        description: x.description,
        url: x.url
      }
    })

    sendResponse(res, 200, result)
  } catch (err) {
    console.log("Error at newsGetRead at news function", err);
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

const newsGetFavorite = async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      return sendResponse(res, 400, "Get Request doesn't accept any body")
    }

    if (Object.keys(req.query).length > 0) {
      return sendResponse(res, 400, "Get Request doesn't accept any Query Parameters")
    }

    let email = req.user.email

    const allNewsItems = await prisma.news.findMany({})
    const readNews = allNewsItems.filter(items=>items.favorite !== null)
    if(readNews.length === 0){
      return sendResponse(res,404,"No Data Found")
    }

    let result = readNews.filter((items) => {
        if (items.favorite.includes(email)) {
        return items
      } 
    })
    if(result.length === 0){
      return sendResponse(res,404, "No Data Found")
    }
    result = result.map(x => {
      return {
        id: x.id,
        title: x.title,
        description: x.description,
        url: x.url
      }
    })

    sendResponse(res, 200, result)
  } catch (err) {
    console.log("Error at newsGetFavorite at news function", err);
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

const newSearch = async (req, res) => {
  try {
    const { keyword} = req.params
     if(keyword === null || keyword === undefined){
      return sendResponse(res,400, "Invalid data sent")
     }

     const API_KEY = process.env.API_TOKEN
    const BASE_URL = process.env.API_URL
    const response = await axios.get(BASE_URL, {
      params: {
        locale: "in",
        language: "en",
        api_token: API_KEY,
        search: keyword
      }
    });
    const news = response.data.data.map((x) => {
      return {
        id: x.uuid,
        title: x.title,
        description: x.description,
        url: x.url
      }
    })
    const result = { news }
    sendResponse(res, 200, result)

  } catch (err) {
    console.log("Error at newSearch at news function", err);
    sendResponse(res, 400, "News API Error. Please try again after some time")
  }
}

module.exports = { news, newsGetFavorite, newsGetRead, newsMarkRead, newsMarkFavorite, newSearch }
