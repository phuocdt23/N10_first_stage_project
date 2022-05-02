const {post, host} = require('../config/config')
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Project Management',
        version: '2.0.0'
      },
      servers: [
        {
          url: `http://${host}:${post}`,
          description: ''
        }
      ]
    },
    apis: ['src/**/**.routes.js']
  }
  
  module.exports = swaggerOptions
  