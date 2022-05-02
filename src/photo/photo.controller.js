const {
    createOne,
    getOne,
    updateOne,
    deleteOne,
    getAllByUserId,
    deleteAllPhotoById,
} = require('./photo.service')
const {StatusCodes} = require('http-status-codes');
const uploadAnPhoto = async (req, res, next) => {
    try{
    const rs = await createOne(
        req.userId, 
        req.params.albumId, 
        req.file.originalname, 
        req.file.path);
    return res.status(StatusCodes.OK).json({rs});
    }catch(err){
        next(err);
    }
}
const getAnPhoto = async (req, res, next) => {
    try{
        const result = await getOne(req.params.id);
        if(!result){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "not found Album"});
        }else{
            res.status(StatusCodes.OK).json({result});
        }
    }catch(err){
        next(err);
    }
}
const updatePhoto = async (req, res, next) => {
    try{
        const rs = await updateOne(req.params.id, req.body.name);
        console.log(rs);
        if(rs){
            return res.status(StatusCodes.OK).json({result: rs});
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"Something went wrong!"})
        }
    }catch(err){
        next(err);
    }
}
const deletePhoto = async (req, res, next) => {
    try{
        const rs = await deleteOne(req.params.id);
        if(rs){
            return res.status(StatusCodes.OK).json({result: rs});
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"Something went wrong!"})
        }
    }catch(err){
        next(err);
    }
}
const getAllPhotoOfUser = async (req, res, next) => {
    try{
        const photoOfAnUser = await getAllByUserId(req.userId);
          return res.status(StatusCodes.OK).json({photoOfAnUser});
    }catch(err){
        next(err);
    }
}
const deleteAllPhotoOfUser = async (req, res, next) => {
    try{
        const result = await deleteAllPhotoById(req.userId);
          return res.status(StatusCodes.OK).json({result});
    }catch(err){
        next(err);
    }
}
const deleteAllPhotoOfAlbum = async (req, res, next) => {
    try{

    }catch(err){
        next(err);
    }
}
const getAllPhotoOfAlbum = async (req, res, next) => {
    try{

    }catch(err){
        next(err);
    }
}



module.exports = {
    uploadAnPhoto,
    getAnPhoto,
    updatePhoto,
    deletePhoto,
    getAllPhotoOfUser,
    deleteAllPhotoOfAlbum,
    getAllPhotoOfAlbum,
    deleteAllPhotoOfUser
}