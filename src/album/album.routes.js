// // const { validate } = require('express-validation')
const express = require('express')
const middleware = require("../auth/auth.middleware");
const {
  createAlbum,
  getAlbum,
//   updateAlbum,
  getAllAlbumOfAnUser,
//   deleteAlbum,
} = require('./album.controller')
const router = express.Router()

router 
  .route('/')
    .post(middleware.authJwt, createAlbum)
    .get(middleware.authJwt, getAllAlbumOfAnUser)

// router.route('/:id')
//   .get(middleware.authJwt, getAlbum)
//   .get(middleware.authJwt, getAllAlbumOfAnUser)
//   .patch(middleware.authJwt, updateAlbum)
//   .delete(middleware.authJwt, deleteAlbum)

module.exports = router