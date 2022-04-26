const verifySignUp  = require("./verifySignUp.middleware");
const controller = require("./auth.controller");
const express = require("express");
const router = express.Router();
router
  .post('/signup',
   verifySignUp.checkDuplicateUsernameOrEmail,
   controller.signup)
  .post("/signin", controller.signin);

module.exports = router;
