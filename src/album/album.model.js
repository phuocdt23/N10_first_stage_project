
module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("albums", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("pending", "active"),
            defaultValue: "active",
        }
    });
    return Album;
};
