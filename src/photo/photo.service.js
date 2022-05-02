const db = require('../config/db.connection');
const Photo = db.photo;
const User = db.user;
const Album = db.album;
const { unlink } = require('fs')
const createOne = async (userId, albumId, name, link) => {
    const [user, album] = await Promise.all([
        User.findByPk(userId),
        Album.findByPk(albumId)
    ]);
    const photo = await Photo.create({ name, link });
    const rs1 = user.addPhoto(photo);
    const rs2 = album.addPhoto(photo);
    return photo;
}
const getOne = async (id) => {
    const result = await Photo.findByPk(id);
    return result;
}
const updateOne = async (id, name) => {
    const photo = await getOne(id);
    photo.name = name;
    photo.save();
    return photo;
}
const deleteOne = async (id) => {
    const photo = await getOne(id);
    unlink(photo.link, (err) => {
        if (err) throw err;
        console.log(`${photo.name} was deleted!`);
    });
    const rs = await Photo.destroy({
        where: { id: id }
       })
    console.log(rs)
    return rs;
}

const getAllByUserId = async (id) => {
    const photoOfUser = await User.findByPk(id, 
        {
        attributes: {exclude: ['password']},
        include: [
            {
                model: Photo,
                as: "photos",
                attributes: ["id", "name", "link", "userId", "albumId"],
            },
        ],
    }
    );
    console.log(photoOfUser);
    return photoOfUser.photos;
}
const deleteAllPhotoById = async (id) => {
    const allPhoto = await getAllByUserId(id);
    for(const photo of allPhoto){
         await deleteOne(photo.id);
    }
}
const getAllPhotoByAlbumId = async (id) => {
    const photoOfAlbum = await Album.findByPk(id, 
        {
        include: [
            {
                model: Photo,
                as: "photos",
                attributes: ["id", "name", "link", "userId", "albumId"],
            },
        ],
    }
    );
    console.log(photoOfAlbum);
    return photoOfAlbum.photos;
}
const deleteAllByAlbumId = async (id) => {
    const allPhoto = await getAllPhotoByAlbumId(id);
    for(const photo of allPhoto){
         await deleteOne(photo.id);
    }
}

module.exports = {
    createOne,
    getOne,
    updateOne,
    deleteOne,
    getAllByUserId,
    deleteAllPhotoById,
    getAllPhotoByAlbumId,
    deleteAllByAlbumId
} 