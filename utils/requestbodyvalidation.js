const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function loginBodyValidation(body) {
    if (Object.keys(body).length === 0) {
        throw new Error("Request Body Missing")
    }

    const allowedBody = ["email", "password"]
    const bodyKeys = Object.keys(body)

    const invalidbody = bodyKeys.filter(key => !allowedBody.includes(key));
    if (invalidbody.length > 0) {
        throw new Error(`Invalid body parameter(s): ${invalidbody.join(', ')}. Only 'email'and 'password' are allowed.`);
    }

    const { email, password } = body

    if (!email) {
        throw new Error("Email is required")
    }

    if (!password) {
        throw new Error("Password is required")
    }
    if (typeof (email) !== "string") {
        throw new Error("Email should be string")
    }

    if (typeof (password) !== "string") {
        throw new Error("Password should be string")
    }

    const userData = await prisma.users.findUnique({
        where: { email: email }
    })

    if (!userData) {
        throw new Error("Invalid email. Please register your email ID.");
    }

    return userData;
}

async function registerBodyValidation(body) {
    if (Object.keys(body).length === 0) {
        throw new Error("Request Body Missing")
    }

    const allowedBody = ["email", "password", "name", "preferences"]
    const bodyKeys = Object.keys(body)

    const invalidbody = bodyKeys.filter(key => !allowedBody.includes(key));
    if (invalidbody.length > 0) {
        throw new Error(`Invalid body parameter(s): ${invalidbody.join(', ')}. Only 'name','email','password'and 'preferences' are allowed.`);
    }

    const { email, password, name, preferences } = body

    if (!email) {
        throw new Error("Email is required")
    }

    if (!password) {
        throw new Error("Password is required")
    }

    if (!name) {
        throw new Error("Name is required")
    }
    if (typeof (email) !== "string") {
        throw new Error("Email should be string")
    }

    if (typeof (password) !== "string") {
        throw new Error("Password should be string")
    }

    if (typeof (name) !== "string") {
        throw new Error("name should be string")
    }

    if (preferences !== undefined) {
        if (typeof preferences !== "string" && !Array.isArray(preferences)) {
            throw new Error("preferences should be string or an array");
        }
    }

    const userData = await prisma.users.findUnique({
        where: { email: email }
    })

    if (userData) {
        throw new Error("An account with this email already exists. Please log in or use a different email.");
    }

    return true
}

const requestBodyValidation = async (body, fnName) => {
    if (fnName === "login") {
        return await loginBodyValidation(body);
    } else if (fnName === "register") {
        return await registerBodyValidation(body);
    } else {
        throw new Error("Invalid validation function name");
    }
};

module.exports = { requestBodyValidation }
