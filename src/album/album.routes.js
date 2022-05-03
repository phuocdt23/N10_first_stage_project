const express = require('express')
const { validate } = require("express-validation");
const {
  createValidate,
  updateValidate,
  inviteValidate
} = require("./album.validation")
const { authJwt } = require("../auth/auth.middleware");
const {
  createAlbum,
  getAlbumById,
  getAllAlbumOfAnUser,
  updateAlbum,
  deleteAlbum,
  inviteContributor,
  replyInvitation
} = require('./album.controller')
const router = express.Router()

router
  .route('/')
  .post(validate(createValidate),authJwt, createAlbum)
   /**
   * @swagger
   * /album:
   *   post:
   *     summary: create an album
   *     tags:
   *       - Album
   *     parameters:
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *            description:
   *              type: string
   *        description: create an album from user
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  .get(authJwt, getAllAlbumOfAnUser)
   /**
   * @swagger
   * /album:
   *   get:
   *     summary: get all album of an user
   *     tags:
   *       - Album
   *     description: get all album from user
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
router.route('/:id')
  .get(authJwt, getAlbumById)
   /**
   * @swagger
   * /album/:id:
   *   get:
   *     summary: get an album 
   *     tags:
   *       - Album
   *     description: get all album from user
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  .delete(authJwt, deleteAlbum)
   /**
   * @swagger
   * /album/:id:
   *   delete:
   *     summary: delete an album
   *     tags:
   *       - Album
   *     description: delete an album
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  .patch(validate(updateValidate),authJwt, updateAlbum)
     /**
   * @swagger
   * /album/:id:
   *   patch:
   *     summary: update name or description
   *     tags:
   *       - Album
   *     parameters:
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *            description:
   *              type: string
   *        description: update name or description
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
router
  .route('/invite/:albumId')
  .post(validate(inviteValidate), authJwt, inviteContributor)
/**
   * @swagger
   * /album/invite/:albumId:
   *   post:
   *     summary: invite become an contributor of an album
   *     tags:
   *       - Album
   *     parameters:
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *        description: invite become an contributor of an album
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  router
  .route('/reply/:token')
  .get(replyInvitation)
  /**
* @swagger
* /album/reply/:token:
*   get:
*     summary: handle accept or reject reply
*     tags:
*       - Album
*     description: invite become an contributor of an album
*     responses:
*       200:
*         description: 
*       400:
*         description: 
*/
  
module.exports = router