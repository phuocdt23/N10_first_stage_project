const db = require('../config/db.connection');
const Album = db.album;
const User = db.user;
// const Albumuser
const { StatusCodes } = require('http-status-codes')
const getOneAlbum = async (id) => {
  const album = await Album.findByPk(id);
  return album;
}
const addAlbumByUserId = async (userId, albumId) => {
  const user = await User.findByPk(userId);
  const album = await Album.findByPk(albumId);
  const rs = user.addAlbum(album, { through: { role: 'Owner', status: "Active" }});
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
const inviteContributorService = async (user, album) => {
  console.log(3);
  await user.addAlbum(album);
}
const replyInvitationService = async (contributorId, albumId, status) => {
  const [user, album] = await Promise.all([
    User.findByPk(contributorId),
    Album.findByPk(albumId)
  ])
  console.log(3);
  return await user.addAlbum(album, { through: { status }})
  //check whether or not run into service
  // const rs = await AlbumUser.update({ status }, { where: { albumId, userId } })
  // return rs
}
module.exports = {
  create,
  addAlbumByUserId,
  getAllAlbumUserByUserId,
  updateOne,
  deleteOne,
  getOneAlbum,
  inviteContributorService,
  replyInvitationService
}
