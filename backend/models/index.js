const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const userModel = require('./userModel')

const likeModel = sequelize.define('like')

const commentModel = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN,
    content: {
        type: DataTypes.STRING(450),
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

postModel.belongsToMany(userModel, {
    through: commentModel
})
userModel.belongsToMany(postModel, {
    through: commentModel
})

commentModel.primaryKey

module.exports = {
    userModel,
    postModel,
    commentModel,
    likeModel,
}