const express = require("express");
const { validate } = require("express-validation");
const controller = require("./auth.controller");
const {
  checkDuplicateUsernameOrEmail,
  authJwt } = require("./auth.middleware");
  const router = express.Router();
  const {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    updateValidation,
    forgotPasswordValidation,
    resetPasswordValidation
  } = require('./auth.validation');
  router
  .post('/register',
  validate(registerValidation),
  checkDuplicateUsernameOrEmail,
  controller.register)
    /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: register an user
   *     tags:
   *       - Auth
   *     parameters:
   * 
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            username:
   *              type: string
   *            name:
   *              type: string
   *            password:
   *              type: string
   *        description: register an user
   *     responses:
   *       201:
   *         description: You need to check your email to confirm your account!
   *       400:
   *         description:  Bad Request
   *       409:
   *         description: Failed! Username is already in use!
   */
  .post("/login", validate(loginValidation), controller.login)
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: login by username or email
   *     tags:
   *       - Auth
   *     parameters:
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            username:
   *              type: string
   *            password:
   *              type: string
   *        description: login into server, return infor user & access token
   *     responses:
   *       200:
   *         description: Log in Successfully.
   *       400:
   *         description: Bad Request
   *       401:
   *         description: You need to check your email to confirm account before log in!
   */
  .get("/confirmation/:token", controller.confirmationEmail)
  /**
 * @swagger
 * /auth/confirmation/{token}:
 *   get:
 *     summary: Get confirmation
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: path
 *        name: token 
 *     description: Confirm request from email
 *     responses:
 *       200:
 *         description: Confirmation successfully!!!!!
 *       400:
 *         description: Error:Bad Request
 */
  .post("/change-password", validate(changePasswordValidation), controller.changePassword)
/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: change password
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            newPassword:
 *              type: string
 *        description: change password via email or username
 *     responses:
 *       200: 
 *         description: Successfully change password!
 *       406:
 *         description: Invalid Password!
 *       404:
 *         description: User Not found
 */

  .patch('/update-user', validate(updateValidation), authJwt, controller.updateUser)
  /**
 * @swagger
 * /auth/update-user:
 *   patch:
 *     summary: update information user
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: header
 *        name: x-access-token
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            username:
 *              type: string
 *            password:
 *              type: string
 *            newPassword:
 *              type: string
 *        description: change password via email or username
 *     responses:
 *       200:
 *         description: Successfully change password!
 *       400:
 *         description: 
 *       401: 
 *         description: 
 */

  .post('/forgot-password', validate(forgotPasswordValidation), controller.forgotPassword)
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: post registered email of that user in order to get reset password link via email 
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              required: true
 *        description: post registered email of that user in order to get reset password link via email
 *     responses:
 *       200:
 *         description: please check your email to reset your password
 *       400:
 *         description: something went wrong
 */

  .post('/reset-password/:token', validate(resetPasswordValidation), controller.resetPassword)
 /**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: post a newPassword to reset user's password
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: path
 *        name: token 
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            newPassword:
 *              type: string
 *        description: 
 *     responses:
 *       200:
 *         description: 
 *       400:
 *         description: 
 *       401:
 *         description: 
 */
module.exports = router;

