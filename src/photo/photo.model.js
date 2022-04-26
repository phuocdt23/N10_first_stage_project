
module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photos", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("a","b","c"),
            defaultValue: "a",
        }
    });

    return Photo;
};
