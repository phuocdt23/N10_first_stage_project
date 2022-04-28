const config = require('./config')
module.exports = {
  HOST: config.host,
  USER: config.userDB,
  PASSWORD: config.passwordDB,
  DB: config.nameDB,
  dialect: config.dialectDB,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
