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
    getAllPhotoOfAlbum
} = require('./photo.controller');
router 
  .route('/album/:albumId')
    .post(authJwt, uploadSingle, uploadAnPhoto)
router
  .route('/:id')
    .get(authJwt, getAnPhoto) // 3
    .patch(authJwt, updatePhoto) // 5
    .delete(authJwt, deletePhoto) // 4
router
  .route('/photo/user/:userId')
    .get(authJwt, getAllPhotoOfUser) //2
router
  .route('/photo/album/:albumId')
    .get(authJwt, getAllPhotoOfAlbum) //2
    .delete(authJwt, deleteAllPhotoOfAlbum) // 5
  module.exports = router;