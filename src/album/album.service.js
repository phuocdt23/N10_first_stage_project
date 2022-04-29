const db = require('../config/db.connection');
const Album = db.album;
const User = db.user;
const { StatusCodes } = require('http-status-codes')
// const {
//   getAllUserAlbum,
//   getOneUserAlbum
// } = require('../useralbum/useralbum.service')
const addAlbumByUserId = async (userId, albumId) =>{
  const user = await User.findByPk(userId);
  const album = await Album.findByPk(albumId);
  const rs = user.addAlbum(album);
  return rs;
}
const create = async (name, description) => {
  const album = await Album.create({ name, description })
  console.log(album);
  return album;
}
// const getOne = async (id) => {
//   const album = await Album.findOne({ where: id })
//   if (!album) {
//     return res.status(StatusCodes.BAD_REQUEST).json('Invalid album');
//   }

//   const userAlbum = await getOneUserAlbum(albumid)

//   const role = userAlbum.role
//   if (!role.include('owner') || !role.include('contribute')) {
//     throw new APIError(StatusCodes.BAD_REQUEST, 'Do not have permission open album')
//   }

//   return album
// }

// const getAll = async () => {
//   const album = await Album.findAll()
//   return album
// }

// const updateOne = async (id, name, description, status) => {
//   const album = await Album.update({ where: { id } }, { name, description, status })
//   return album
// }

// const deleteOne = async (id) => {
//   const album = await Album.destroy({ where: id })
//   return album
// }

module.exports = {
  create,
  addAlbumByUserId,
  //   getOne,
  //   getAll,
  //   updateOne,
  //   deleteOne
}
