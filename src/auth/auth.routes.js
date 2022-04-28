const express = require("express");
const controller = require("./auth.controller");
const middleware = require("./auth.middleware");
const router = express.Router();
router
  .post('/register',
    middleware.checkDuplicateUsernameOrEmail,
    controller.register)
  .post("/login", controller.login)
  .get("/confirmation/:token", controller.confirmationEmail)
  .post("/change-password", controller.changePassword)
  .patch('/update-user', middleware.authJwt, controller.updateUser)
  .post('/forgot-password', controller.forgotPassword)
  .post('/reset-password/:token', controller.resetPassword)
module.exports = router;
