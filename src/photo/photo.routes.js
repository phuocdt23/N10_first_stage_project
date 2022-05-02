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
    .get(authJwt, getAllPhotoOfAlbum) 
    .delete(authJwt, deleteAllPhotoOfAlbum) 
router
  .route('/user')
   .get(authJwt, getAllPhotoOfUser)
   .delete(authJwt, deleteAllPhotoOfUser)
router
  .route('/:id')
    .get(authJwt, getAnPhoto) 
    .patch(authJwt, updatePhoto) 
    .delete(authJwt, deletePhoto) 

  module.exports = router;