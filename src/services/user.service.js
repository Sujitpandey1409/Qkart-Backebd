const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { generateAuthTokens } = require('./token.service')


/**
 * Get User by id
 * @param {String} id
 * @returns {Promise<User>}
 */
async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found")
    }

    return user;
}


async function getUserAddressById(id, q) {
    const user = await User.findOne({ _id: id }, { address: 1, email: 1 });
    if (q) {
        return { address: user.address }
    }

    return { _id: id, address: user.address, email: user.email };
}


async function setAddress(userId, address) {
    if (!address) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Address field is required!");
    }
    if (address.length < 20) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Address shouldn't be less than 20 characters");
    }
    const user = await User.findById(userId);
    user.address = address;

    return user.address;
}


/**
 * Get user by email


/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */

async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}



/**
 * Create a user
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 */
const createUser = async(user)=>{
    const isEmailPresent = await User.isEmailTaken(user.email);
    if(isEmailPresent)
        throw new ApiError(httpStatus.OK, "Email already taken");

    const hashedPassword = await hashPassword(user.password);
    const response = await User.create({...user, password: hashedPassword});
    return response;   
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    getUserAddressById,
    setAddress
}
