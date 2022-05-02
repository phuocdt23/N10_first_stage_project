const { StatusCodes } = require('http-status-codes');
const config = require("../config/config.js");
const transporter = require('../helper/email');
const jwt = require("jsonwebtoken");
const { 
  create,
  addAlbumByUserId,
  getAllAlbumUserByUserId,
  updateOne, 
  deleteOne,
  getOneAlbum,
  inviteContributorService
} = require('./album.service');
const {
  getOne,
  getOneUser,
} = require('../user/user.service');
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
    const rs = await getAllAlbumUserByUserId(userId); // return be like [{a}, {b}, {c}]
    if(!rs) return res.status(StatusCodes.NOT_FOUND).json({message: "Not found any album. Maybe create some?"})
    return res.status(StatusCodes.OK).json(rs);
  } catch (error) {
    next(error)
  }
}
const getAlbumById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const albumId = req.params.id;
    // solution 1: handling array
    const allAlbum = await getAllAlbumUserByUserId(userId);
    for(const album of allAlbum){
      if(album.id === albumId){
        return res.status(StatusCodes.OK).json({album:album});
      }
    }
    return res.status(StatusCodes.NOT_FOUND).json({message: "Not found that album"})
    // solution 2: query using sequelize
  } catch (error) {
    next(error)
  }
}

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const rs = await updateOne(id, name, description);
    if(!rs) return res.status(StatusCodes.BAD_REQUEST).json({message: "BAD REQUEST"});
    else{
      return res.status(StatusCodes.OK).json({rs});
    }
  } catch (error) {
    next(error)
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const rs = await deleteOne({ id })
    if(!rs){
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Id's Album"});
    }else{
      return res.status(StatusCodes.OK).json({ message: "Success Delete Album!"});
    }
  } catch (error) {
    next(error)
  }
}
const inviteContributor = async (req, res, next) => {
  try {
    console.log(1);
    const { email } = req.body
    const { albumId } = req.params
    const [owner, contributor, album] = await Promise.all([
      getOne(req.userId),
      getOneUser({email}),
      getOneAlbum(albumId),
    ]);
    
    if(!contributor || !album){
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found album or contributor"});
    }
    console.log(2);
    await inviteContributorService(contributor, album);
    const token = jwt.sign({id: contributor.id}, config.emailSecretKey);
    console.log(4);
    const options = {
      from: config.email,
      to: email,
      subject: `Invitation to the album ${album.name}`,
      html: `<p>${owner.username} invite you to be a contributor album ${album.name}
        <a 
          href=
            'http://${config.host}:${config.port}/albums/${token}?albumid=${album.id}&&status=Active'
        >Accept</a>
        || 
        <a 
          href=
            'http://${config.host}:${config.port}/albums/${token}?albumid=${album.id}&&status=Invalid'
        >Reject</a>
        </p>`
    }

    const resultSendMail = await transporter.sendMail(options);
    console.log(resultSendMail);
    res.status(StatusCodes.OK).json({message: "send invitation successfully"})
  } catch (error) {
    next(error)
  }
}
const replyInvitation = async (req, res, next) => {
  try{

  }catch(err){
    next(err)
  }
}
module.exports = {
  createAlbum,
  getAllAlbumOfAnUser,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  inviteContributor,
  replyInvitation
}