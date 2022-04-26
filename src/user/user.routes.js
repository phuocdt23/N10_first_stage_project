const authJwt = require("../auth/authJwt");
const controller = require("./user.controller");
const express = require("express");
const router = express.Router();

router
  .get("/test/all", controller.allAccess)
  .get(
  "/test/user",
  authJwt.verifyToken,
  controller.userBoard)
  .get(
    "/test/mod",
    authJwt.verifyToken, authJwt.isModerator,
    controller.moderatorBoard
  )
  .get(
    "/test/admin",
    authJwt.verifyToken, authJwt.isAdmin,
    controller.adminBoard
  );

module.exports = router;