const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const userModel = require('./userModel')

const likeModel = sequelize.define('like')

const commentModel = sequelize.define('comment', {
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

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

userModel.hasMany(postModel)
userModel.hasMany(commentModel)

postModel.hasMany(commentModel)
postModel.belongsTo(userModel)

postModel.belongsToMany(userModel, {through: likeModel})
userModel.belongsToMany(postModel, {through: likeModel})

postModel.belongsToMany(userModel, {through: commentModel})
userModel.belongsToMany(postModel, {through: commentModel})

commentModel.belongsTo(userModel)
commentModel.belongsTo(postModel)

module.exports = {
    userModel,
    postModel,
    commentModel,
    likeModel,
}