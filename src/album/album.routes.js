// // const { validate } = require('express-validation')
const express = require('express')
const middleware = require("../auth/auth.middleware");
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
    .post(middleware.authJwt, createAlbum)
    .get(middleware.authJwt, getAllAlbumOfAnUser)

router.route('/:id')
  .get(middleware.authJwt, getAlbumById)
  .patch(middleware.authJwt, updateAlbum)
  .delete(middleware.authJwt, deleteAlbum)
router
  .route('/invite/:albumId')
  .post(middleware.authJwt, inviteContributor)
router
  .route('/reply/:accessToken')
  .patch(replyInvitation)
module.exports = router