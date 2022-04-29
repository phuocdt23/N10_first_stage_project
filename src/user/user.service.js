const db = require('../config/db.connection.js');
const User = db.user;
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
    await User.update({ where: { id } }, { ...params });
    await User.update(
        {
          status: "unconfirmed",
        },
        {
          where: { id: id },
        }
      );
}

module.exports = { getOneUser, updateUser };