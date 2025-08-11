const axios = require('axios')
const {PrismaClient} = require('@prisma/client');
const { sendResponse } = require('../utils/responseHandler');
const prisma = new PrismaClient();

const news = async(req,res)=>{
try{
    const details = await prisma.users.findUnique({
        where: {email: req.user.email},
        select: {preferences:true}
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
    const news = response.data.data.map((x)=>{
    return {
        title: x.title,
        description: x.description,
        url: x.url
    }
})
    const result = {news}
    sendResponse(res,200,result)
} catch(err){
console.log("Error At news.js: ", err)
sendResponse(res,400,"News API Error. Please try again after some time")
}
}

module.exports= {news}
