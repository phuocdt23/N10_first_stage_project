const verifySignUp  = require("./verifySignUp.middleware");
const controller = require("./auth.controller");
const express = require("express");
const router = express.Router();
router
  .post('/register',
   verifySignUp.checkDuplicateUsernameOrEmail,
   controller.register)
  .post("/login", controller.login);

module.exports = router;
