const express = require('express');
const router = express.Router()
const {authJwt, uploadSingle} = require('../auth/auth.middleware');
const {
    uploadAnPhoto,
    getAnPhoto,
    updatePhoto,
    deletePhoto,
    getAllPhotoOfUser,
    deleteAllPhotoOfAlbum,
    getAllPhotoOfAlbum,
    deleteAllPhotoOfUser
} = require('./photo.controller');

router 
  .route('/album/:albumId')
    .post(authJwt, uploadSingle, uploadAnPhoto)
  /**
   * @swagger
   * /photo/album/{:albumId}:
   *   post:
   *     summary: upload an photo
   *     tags:
   *       - Photo
   *     parameters:
   *     description: upload an photo into an album
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
    .get(authJwt, getAllPhotoOfAlbum)
  /**
   * @swagger
   * /photo/album/{:albumId}:
   *   get:
   *     summary: get info of all photo of an album
   *     tags:
   *       - Photo
   *     description: get info of all photo of an album
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
    .delete(authJwt, deleteAllPhotoOfAlbum) 
  /**
   * @swagger
   * /photo/album/{:albumId}:
   *   delete:
   *     summary: delete all photo of an album
   *     tags:
   *       - Photo
   *     description: delete all photo of an album
   *     responses:
   *       200:
   *         description:
   *       400:
   *         description: 
   */
router
  .route('/user')
  .get(authJwt, getAllPhotoOfUser)
  /**
   * @swagger
   * /photo/user:
   *   get:
   *     summary: get all infor album of an user
   *     tags:
   *       - Photo
   *     description: get all infor album of an user
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  .delete(authJwt, deleteAllPhotoOfUser)
  /**
   * @swagger
   * /photo/user:
   *   delete:
   *     summary: delete all photo of an user
   *     tags:
   *       - Photo
   *     description: delete all photo of an user
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
router
  .route('/:id')
    .get(authJwt, getAnPhoto) 
  /**
   * @swagger
   * /photo/{:id}:
   *   get:
   *     summary: get info an photo
   *     tags:
   *       - Photo
   *     description: get info an photo
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */


    .patch(authJwt, updatePhoto) 
  /**
   * @swagger
   * /photo/{:id}:
   *   patch:
   *     summary: update name of photo
   *     tags:
   *       - Photo
   *     description: update name of photo
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
    .delete(authJwt, deletePhoto) 
  /**
   * @swagger
   * /photo/{:id}:
   *   delete:
   *     summary: delete an photo of an photo
   *     tags:
   *       - Photo
   *     description: delete an photo of an photo
   *     responses:
   *       200:
   *         description: 
   *       400:
   *         description: 
   */
  module.exports = router;