const nodemailer = require('nodemailer')
const { email, passwordEmail } = require('../config/config')

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: email,
    pass: passwordEmail
  }
})

module.exports = transporter