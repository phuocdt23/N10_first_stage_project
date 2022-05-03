const db = require('../config/db.connection.js');
const User = db.user;

const getOne = async (id) => {
    return await User.findByPk(id);
}
const getOneUser = async (filter) => {
    const { email, username } = filter;
    if (email) {
        const user = User.findOne({
            where: { email: email }
        })
        return user;
    } else {
        const user = User.findOne({
            where: { username: username }
        })
        return user;
    }
}

const updateUser = async (params, id) => {
    const rs1 = await User.update({ ...params }, { where: { id } });
    return rs1;
}

module.exports = { getOneUser, updateUser, getOne };