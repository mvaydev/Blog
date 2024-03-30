const { postModel, commentModel, likeModel } = require('../models')
const ApiError = require('../apiError')

async function mapPost(post) {
    const comments = await commentModel.count(postModel, {
        where: { id: post.id }
    })

    const likes = await likeModel.count(postModel, {
        where: { id: post.id }
    })

    return {
        ...post.dataValues,
        likes,
        comments
    }
}

module.exports = {
    async getAll() {
        const posts = await postModel.findAll({
            order: [['createdAt', 'ASC']]
        })
        const mappedPosts = []

        for(let post of posts) {
            mappedPosts.push(await mapPost(post))
        }

        return mappedPosts
    },

    async get(id) {
        const post = await postModel.findByPk(id)

        if(!post) throw ApiError.NotFound()

        return await mapPost(post)
    },

    async create(userId, req) {
        const post = await postModel.create({
            title: req.title,
            content: req.content,
            userId
        })

        return post
    },

    async delete(id) {
        const post = await postModel.findByPk(id)

        if(!post) throw ApiError.NotFound()

        await post.destroy()

        return post
    }
}