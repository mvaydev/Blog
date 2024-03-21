const sequelize = require('../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
})