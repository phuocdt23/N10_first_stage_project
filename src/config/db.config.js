module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123123",
  DB: "VMO_project",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
