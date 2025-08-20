const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const axios = require('axios')
const dotenv = require('dotenv');
const { getFromCache, setInCache } = require('../cache/cache');
dotenv.config();

const checkNewsIdfn = async (id, user, type) => {
    const getFromCacheFn = await getFromCache(id)
    if(getFromCacheFn !== null){
        return getFromCacheFn
    }
    const checkingId = await prisma.news.findMany({
        where: { id }
    })

    if (checkingId.length === 0) {
        return await createNewsAsPerId(id,user.email,type)
    }
    const result = {
        id: checkingId[0].id,
        title: checkingId[0].title,
        description: checkingId[0].description,
        url: checkingId[0].url
    }
    let newEmails = []
    if(type === "read"){
            if (checkingId[0].read !== null) {
        if (!checkingId[0].read.includes(user.email)) {
            newEmails = checkingId[0].read.push(user.email)
        }
        newEmails = checkingId[0].read;
    } else {
        newEmails.push(user.email)
    }
    await prisma.news.update({
        where: { id },
        data: { read: newEmails }
    })
    } else {
            if (checkingId[0].favorite !== null) {
        if (!checkingId[0].favorite.includes(user.email)) {
            newEmails = checkingId[0].favorite.push(user.email)
        }
        newEmails = checkingId[0].favorite;
    } else {
        newEmails.push(user.email)
    }
    await prisma.news.update({
        where: { id },
        data: { favorite: newEmails }
    })
    }
    await setInCache(id,result)
    return result
};

const createNewsAsPerId = async (id, email,type) => {
    try {
        const API_KEY = process.env.API_TOKEN
        const BASE_URL = process.env.UUID_NEWS_URL + id
        const response = await axios.get(BASE_URL, {
            params: {
                api_token: API_KEY,
            }
        });

        const result = {
            id,
            title: response.data.title,
            description: response.data.description,
            url: response.data.url
        }
        let newEmails = []
        newEmails.push(email)
        if(type === "read"){
                    await prisma.news.create({
            data: {
                id,
                title: response.data.title,
                description: response.data.description,
                url: response.data.url,
                read: newEmails
            }
        })
        } else {
                    await prisma.news.create({
            data: {
                id,
                title: response.data.title,
                description: response.data.description,
                url: response.data.url,
                favorite: newEmails
            }
        })

        }
        await setInCache(id,result)
        return result
    } catch (err) {
        throw Error(err.message)
    }
}

module.exports = { checkNewsIdfn }
