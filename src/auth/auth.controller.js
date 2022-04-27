const db = require("../models/index.model");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {getOneUser} = require('../user/user.service');
exports.register = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
      res.status(201).send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = async (req, res) => {
  try{
    const {username, email, password} = req.body;
    const user = await getOneUser({username, email});
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      status: user.status,
      accessToken: token
    })
  // })
    // .catch(err => {
    //   res.status(500).send({ message: err.message });
    // })
  }catch(err) {
    throw err;
  }
    
}
