const { PrismaClient } = require('@prisma/client');
const { sendResponse } = require('../utils/responseHandler');
const prisma = new PrismaClient();

const getPreference = async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: { email: req.user.email },
            select: { preferences: true }
        })
        sendResponse(res, 200, { preferences: user.preferences })
    } catch (err) {
        console.log("Error at getPreference at preference function: ", err)
        sendResponse(res, 400, err.message)
    }
}

const putPreference = async (req, res) => {
    try {
        const { preferences } = req.body;
        if (!preferences || (!Array.isArray(preferences) && typeof preferences !== 'string')) {
            return sendResponse(res, 400, 'Preferences should be string or array.')
        }
        let lastestPreferences;

        const userDetails = await prisma.users.findUnique({
            where: { email: req.user.email },
            select: { preferences: true }
        })
        if (typeof (preferences) === 'string') {
            lastestPreferences = userDetails.preferences
            lastestPreferences.push(preferences)

        } else {
            lastestPreferences = [...new Set([...userDetails.preferences, ...preferences])]
        }
        const updatedUser = await prisma.users.update({
            where: { email: req.user.email },
            data: { preferences: lastestPreferences }
        });
        let result = {
            message: "Preferences inserted successfully",
            preferences: updatedUser.preferences
        }
        sendResponse(res, 200, result)
    } catch (err) {
        console.log("Error at putPreference at preference function: ", err)
        sendResponse(res, 400, err.message)
    }
};

module.exports = { getPreference, putPreference }
