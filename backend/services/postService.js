const { postModel, commentModel, likeModel } = require('../models')
const ApiError = require('../apiError')
const markdownit  = require('markdown-it')
const mdClass  = require('markdown-it-class')

function renderMdToHtml(markdown) {
    const mapping = {
        h1: 'md-h1',
        h2: 'md-h2',
        h3: 'md-h3',
        h4: 'md-h4',
        h5: 'md-h5',
        h6: 'md-h6',
        a: 'md-link',
        img: 'md-img',
        hr: 'md-hr'
    }

    const md = markdownit( {
        html: false,
        typographer: true,
        linkify: true,
        breaks: true
    }).use(mdClass, mapping)

    return md.render(markdown)
}

async function mapPost(post, userId = null) {
    const comments = await commentModel.count({
        where: { postId: post.id }
    })

    const likes = await likeModel.count({
        where: { postId: post.id }
    })

    const user = await post.getUser()
    const mappedPost = {
        ...post.dataValues,
        likes,
        comments,
        userName: user.name
    }

    if(userId) {
        const like = await likeModel.findOne({
            where: { userId, postId: post.id }
        })

        mappedPost.isLiked = Boolean(like)
    }

    return mappedPost
}

module.exports = {
    async getAll(query, userId = null) {
        const posts = await postModel.findAll({
            order: [['createdAt', 'DESC']],
            where: {...query}
        })

        const mappedPosts = []

        for(let post of posts) {
            mappedPosts.push(await mapPost(post, userId))
        }

        return mappedPosts
    },

    async get(id, userId = null) {
        const post = await postModel.findByPk(id)

        if(!post) throw ApiError.NotFound()

        return await mapPost(post, userId)
    },

    async create(userId, req) {
        const html = renderMdToHtml(req.content)

        const post = await postModel.create({
            title: req.title,
            introduction: req.introduction,
            contentHtml: html,
            contentMarkdown: req.content,
            userId
        })

        return post
    },

    async update(id, req) {
        const post = await postModel.findByPk(id)

        if(!post) throw ApiError.NotFound()
        if(
            post.title === req.title &&
            post.content === req.content &&
            post.introduction === req.introduction
        ) throw ApiError.BadRequest('No changes')

        const html = renderMdToHtml(req.content)

        await post.update({
            title: req.title,
            introduction: req.introduction,
            contentHtml: html,
            contentMarkdown: req.content
        })

        return post
    },

    async delete(id) {
        const post = await postModel.findByPk(id)

        if(!post) throw ApiError.NotFound()

        await post.destroy()

        return post
    },

    async like(postId, userId) {
        const post = await postModel.findByPk(postId)
        const likeCandidate = await likeModel.findOne({
            where: { postId, userId }
        })

        if(!post) throw ApiError.NotFound()
        if(likeCandidate) throw ApiError.BadRequest('Post has been liked')

        await likeModel.create({ postId, userId })
    },

    async unlike(postId, userId) {
        const post = await postModel.findByPk(postId)

        if(!post) throw ApiError.NotFound()

        const like = await likeModel.findOne({
            where: { postId, userId }
        })

        if(!like) throw ApiError.BadRequest('Post doesnt have like')

        await like.destroy()
    }
}