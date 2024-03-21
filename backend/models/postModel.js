const sequelize = require('../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})