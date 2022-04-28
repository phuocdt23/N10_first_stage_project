const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");
const config = require("../config/config.js");
const db = require("../models/index.model");
const User = db.user;
exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(StatusCodes.CONFLICT).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(StatusCodes.CONFLICT).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};
exports.authJwt = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};