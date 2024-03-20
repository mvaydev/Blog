require('dotenv').config()

const Sequelize = require('sequelize')
const {
    DB_NAME, 
    DB_USER, 
    HOST, 
    DB_PORT, 
    DB_PASSWORD
} = process.env


module.exports = new Sequelize(
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, {
    dialect: 'postgres',
    host: HOST,
    port: DB_PORT,
}) 