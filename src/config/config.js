require('dotenv-safe').config()

const port = process.env.PORT
const secretKey = process.env.SECRET_KEY
const emailSecretKey = process.env.EMAIL_SECRET_KEY
const email = process.env.EMAIL
const passwordEmail= process.env.PASSWORD
const userDB = process.env.USER_DB
const passwordDB = process.env.PASSWORD_DB
const hostDB = process.env.HOST_DB
const dialectDB = process.env.DIALECT_DB
const host = process.env.HOST
const nameDB = process.env.NAME_DB
module.exports = {
//   pagination: {
//     page: 1,
//     records: 20
//   },
  port,
  host,
  nameDB,
  userDB,
  passwordDB,
  hostDB,
  dialectDB,
  secretKey,
  emailSecretKey,
  port,
  email,
  passwordEmail,
}
