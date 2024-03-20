const userModel = require('./userModel')
const postModel = require('./postModel')
const commentModel = require('./commentModel')
const likeModel = require('./likeModel')

userModel.hasMany(postModel)
userModel.hasMany(commentModel)
userModel.hasMany(likeModel)

postModel.hasMany(commentModel)
postModel.hasMany(likeModel)
postModel.belongsTo(userModel)

commentModel.belongsTo(userModel)
commentModel.belongsTo(postModel)

likeModel.belongsTo(userModel)
likeModel.belongsTo(postModel)

module.exports = {
    userModel,
    postModel,
    commentModel,
    likeModel,
}