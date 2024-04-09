const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const userModel = require('./userModel')

const likeModel = sequelize.define('like')

const commentModel = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(450),
        allowNull: false
    }
})

const postModel = sequelize.define('post', {
    title: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },

    introduction: {
        type: DataTypes.STRING(450),
    },

    contentHtml: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    contentMarkdown: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

userModel.hasMany(postModel)
postModel.belongsTo(userModel)

postModel.belongsToMany(userModel, {through: likeModel})
userModel.belongsToMany(postModel, {through: likeModel})

postModel.belongsToMany(userModel, {through: commentModel})
userModel.belongsToMany(postModel, {through: commentModel})

module.exports = {
    userModel,
    postModel,
    commentModel,
    likeModel,
}