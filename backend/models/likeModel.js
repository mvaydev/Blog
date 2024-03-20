const sequelize = require('../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})