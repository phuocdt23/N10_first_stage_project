const { Op } = require('sequelize')
const db = require('../models/index.model');
const User = db.user;
const getOneUser = async (filter) => {
    const { email, username } = filter;
    if (email) {
        const user = User.findOne({
            where: { email:email }
        })
        return user;
    } else {
        const user = User.findOne({
            where: { username:username }
        })
        return user;
    }
}

module.exports = { getOneUser };