const STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
}
module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status:{
      type: Sequelize.ENUM,
      values: Object.values(STATUS),
      allowNull: true,
      defaultValue: 'Public'
    }
  })
  return Album;
};
