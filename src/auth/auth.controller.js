const db = require("../config/db.connection");
const { StatusCodes } = require('http-status-codes');
const config = require("../config/config.js");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getOneUser, updateUser } = require('../user/user.service');
const transporter = require('../helper/email')

exports.register = async (req, res, next) => {
  try {
    // Save User to Database
    User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then((user) => {
        //sending email to confirm register
        const token = jwt.sign({ id: user.id }, config.emailSecretKey, {
          expiresIn: 86400 // 24 hours
        });
        const url = `http://localhost:${config.port}/auth/confirmation/${token}`;
        transporter.sendMail(
          {
            from: config.email,
            to: user.email,
            subject: `Confirm Email`,
            html: `Please check this email to confirm your email <a href="${url}">${url}</a>`,
          },
          (err, info) => {
            if (err) {
              res.json(err);
            } else {
              res.json(info);
            }
          })
        res.status(StatusCodes.CREATED).send({ message: "User registered successfully But you need to check your email to confirm!" });

      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
      });
  } catch (err) {
    next(err);
  }

};

exports.login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await getOneUser({ username, email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "User Not found." });
    };
    if (user.status === "unconfirmed") {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: "you need to check your email to confirm account before log in!" });
    }
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: 86400 // 24 hours
    });

    res.status(StatusCodes.OK).send({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      status: user.status,
      accessToken: token
    })
  } catch (err) {
    next(err);
  }
}

exports.confirmationEmail = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { id } = jwt.verify(token, config.emailSecretKey);
    await User.update(
      {
        status: "confirmed",
      },
      {
        where: { id: id },
      }
    );
    res.status(StatusCodes.OK).json({ message: "confirmation successfully!!!!!" })
  } catch (err) {
    next(err);
  }
}
exports.updateUser = async (req, res, next) => {
  try {
    const { email, username, name } = req.body;
    const user = User.findByPk(req.userId);
    if (user) {
      const result = await updateUser({email, username, name}, req.userId);
      console.log(result);
    } else {
      res.status(StatusCodes.CONFLICT).json({ message: "username or email already in use!!!!!" })
    }

  } catch (error) {
    next(error)
  }
}
exports.changePassword = async (req, res, next) => {
  try {
    const { username, email, password, newPassword } = req.body;
    const user = await getOneUser({ username, email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User Not found." });
    };
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const rs = await user.update({ password: bcrypt.hashSync(newPassword, 8) });
    console.log("-------------------------------------");
    console.log(rs);
    res.status(StatusCodes.OK).json({ message: 'successfully change password!' });
  } catch (err) {
    next(err);
  }
}

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { id } = jwt.verify(token, config.emailSecretKey);
    const user = await User.findByPk(id);
    if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid link or expired" });
    try {
      await user.update({ password: bcrypt.hashSync(req.body.newPassword, 8) });
      res.json({ message: "change password successfully!!!!!" });
    }
    catch (err) {
      throw err;
    }
  }
  catch (err) {
    next(err);
  }
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email })
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "email does not exist!" });
    } else {
      //sending email to confirm register
      const token = jwt.sign({ id: user.id }, config.emailSecretKey, {
        expiresIn: 86400 // 24 hours
      });
      const url = `http://localhost:${config.port}/auth/reset-password/${token}`;
      transporter.sendMail(
        {
          from: config.email,
          to: user.email,
          subject: `reset password`,
          html: `Please click this link to reset your password <a href="${url}">${url}</a>`,
        },
        (err, info) => {
          if (err) {
            res.json(err);
          } else {
            res.json(info);
          }
        })
    }

  }
  catch (err) {
    next(err);
  }
}



