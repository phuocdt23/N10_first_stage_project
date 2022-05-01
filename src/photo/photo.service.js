const db = require('../config/db.connection');
const Photo = db.photo;
const User = db.user;
const Album = db.album;

const createOne = async (userId, albumId, name, link) => {
 const [user, album] = await Promise.all([
     User.findByPk(userId),
     Album.findByPk(albumId)
 ]);
 const photo = await Photo.create({name, link});
 const rs1 =  user.addPhoto(photo);
 const rs2 =  album.addPhoto(photo);
    return photo;
    // return res.status(StatusCodes.CREATED).json({rs1,rs2});
}
const getOne = async (id) => {
    const result = await Photo.findByPk(id);
    return result;
}
const updateOne = async () => {

}
const deleteOne = async () => {

}


module.exports = {
    createOne,
    getOne,
    updateOne,
    deleteOne,
} 