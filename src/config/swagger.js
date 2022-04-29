const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Project Management',
        version: '2.0.0'
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: ''
        }
      ]
    },
    apis: ['src/**/**.routes.js']
  }
  
  module.exports = swaggerOptions
  