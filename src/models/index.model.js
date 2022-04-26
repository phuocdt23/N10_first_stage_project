const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
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
