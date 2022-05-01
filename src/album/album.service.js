const db = require('../config/db.connection');
const Album = db.album;
const User = db.user;
const { StatusCodes } = require('http-status-codes')

const addAlbumByUserId = async (userId, albumId) => {
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
const getAllAlbumUserByUserId = async (userId) => {
  const albumOfAnUser = await User.findByPk(userId, {
    // attributes: {exclude: ['password']},
    include: [
      {
        model: Album,
        as: "albums",
        attributes: ["id", "name", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
  return albumOfAnUser.albums;
}

const updateOne = async (id, name, description) => {
  const album = await Album.findByPk(id);
  if (!album) return res.status(StatusCodes.NOT_FOUND).json({ message: "invalid id album" });
  else {
    album.name = name;
    album.description = description;
    album.save();
  }
  return album
}

const deleteOne = async (id) => {
  const album = await Album.destroy({ where: id })
  return album
}

module.exports = {
  create,
  addAlbumByUserId,
  getAllAlbumUserByUserId,
  updateOne,
  deleteOne
}
