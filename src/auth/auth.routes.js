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
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - User
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            password:
 *              type: string
 *        description: Created user object
 *     responses:
 *       200:
 *         description: User Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 */
