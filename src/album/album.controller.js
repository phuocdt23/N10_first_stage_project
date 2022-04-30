const { StatusCodes } = require('http-status-codes');
const { 
  create,
  addAlbumByUserId,
  getAllAlbumUser,
  addAlbum, 
  getOne, 
  getAll, 
  updateOne, 
  deleteOne
} = require('./album.service');

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

const getAllAlbumOfAnUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const rs = await getAllAlbumUser(userId); // return be like [{a}, {b}, {c}]
    if(!rs) return res.status(StatusCodes.NOT_FOUND).json({message: "Not found any album. Maybe create some?"})
    return res.status(StatusCodes.OK).json(rs);
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
  getAllAlbumOfAnUser,
//   getAlbum,
//   updateAlbum,
//   deleteAlbum,
}