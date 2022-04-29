const { StatusCodes } = require('http-status-codes');
const { create,addAlbum, getOne, getAll, updateOne, deleteOne, addAlbumByUserId } = require('./album.service');

// // const { createUserAlbum } = require('../useralbum/useralbum.model')

const createAlbum = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const album = await create(name, description);
    await addAlbumByUserId(req.userId, album.dataValues.id);
    res.status(StatusCodes.OK).json({message:`successful to add ${album.dataValues.name} into album's user (Id: ${req.userId})`});
  } catch (error) {
    next(error)
  }
}

// const getAlbum = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const rs = await getOne({ id })
//   } catch (error) {
//     next(error)
//   }
// }

// const updateAlbum = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const { name, description, status } = req.body
//     const rs = await updateOne(id, name, description, status)
//   } catch (error) {
//     next(error)
//   }
// }

// const getAllAlbumOfAnUser = async (req, res, next) => {
//   try {
//     const { page, ...filter } = req.query
//     const query = {
//       page: page || pagination.page,
//       records: pagination.records,
//       filter
//     }

//     const rs = await getAll(query)

//   } catch (error) {
//     next(error)
//   }
// }
// const inviteContribute = async (req, res, next) => {
//   try {
//     const { userId } = req.body
//     const { id } = req.params
//     const role = 'contribute'
//     const rs = createUserAlbum(userId, id, role)

//   } catch (error) {
//     next(error)
//   }
// }

// const deleteAlbum = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const rs = await deleteOne({ id })
//   } catch (error) {
//     next(error)
//   }
// }

module.exports = {
  createAlbum,
//   getAlbum,
//   updateAlbum,
//   getAllAlbumOfAnUser,
//   deleteAlbum,
}