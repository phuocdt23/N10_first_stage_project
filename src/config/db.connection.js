const config = require('./config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.nameDB,
  config.userDB,
  config.passwordDB,
  {
    host: config.host,
    dialect: config.dialectDB,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../user/user.model.js")(sequelize, Sequelize);
db.album = require("../album/album.model")(sequelize, Sequelize);
db.photo = require("../photo/photo.model")(sequelize, Sequelize);

db.user.belongsToMany(db.album, {
  through: "album_user",
  as: "albums",
  foreignKey: "user_id",
});
db.album.belongsToMany(db.user, {
  through: "album_user",
  as: "users",
  foreignKey: "album_id",
});
db.user.hasMany(db.photo, { as: "photos" });  
db.photo.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
db.album.hasMany(db.photo, { as: "photos" });
db.photo.belongsTo(db.album, {
  foreignKey: "albumId",
  as: "album",
});

module.exports = db;