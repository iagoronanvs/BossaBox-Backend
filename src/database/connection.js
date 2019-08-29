const Sequelize = require('sequelize');
const sequelize = new Sequelize(`${process.env.DB_DRIVE}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DRIVE
// });

module.exports = sequelize;