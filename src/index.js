const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger');
// const { errorHandler } = require('') not written yet
const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions)

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// database
const db = require("./config/db.connection");
db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
// });


// routes
app.use('/auth', require('./auth/auth.routes'));
app.use('/album', require('./album/album.routes'));
app.use('/photo', require('./photo/photo.routes'));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;