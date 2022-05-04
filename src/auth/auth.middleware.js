const jwt = require("jsonwebtoken");
const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const config = require("../config/config.js");
const db = require("../config/db.connection");
const User = db.user;
const checkDuplicateUsernameOrEmail = (req, res, next) => {
  try {
    if(!req.body.username || !req.body.email){
      return res.status(StatusCodes.BAD_REQUEST).json({message: "Does not have a username or email or either"})
    }
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
  } catch (err) {
    next(err);
  }
};
const authJwt = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id
    next();
  });
};
const diskStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'images');
  } ,
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
})
const upload = multer({ storage: diskStorage })
const uploadSingle = upload.single('image')
module.exports = {
  uploadSingle,
  checkDuplicateUsernameOrEmail,
  authJwt
}