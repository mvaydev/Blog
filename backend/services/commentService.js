const { commentModel, userModel } = require('../models')
const ApiError = require('../apiError')

async function mapComment(comment) {
    const user = await userModel.findByPk(comment.userId)

    const mappedComment = {
        ...comment.dataValues,
        userName: user.name
    }

    return mappedComment
}

module.exports = {
    async getAll(postId) {
        const comments = await commentModel.findAll({
            order: [['createdAt', 'DESC']],
            where: {postId}
        })

        const mappedComments = []

        for(let comment of comments) {
            mappedComments.push(await mapComment(comment))
        }

        return mappedComments
    },

    async create(postId, userId, content) {
        return await commentModel.create({
            postId, userId, content
        })
    },
}