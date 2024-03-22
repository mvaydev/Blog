const sequelize = require('../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    verificationCode: {
        type: DataTypes.STRING(6)
    },

    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})