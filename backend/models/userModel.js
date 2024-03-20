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

    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // avatar: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: '../public/default.jpg'
    // },

    verificationCode: {
        type: DataTypes.INTEGER
    },

    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})