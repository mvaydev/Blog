const { postModel, commentModel, likeModel, userModel } = require('../models')
const ApiError = require('../apiError')
const markdownit  = require('markdown-it')
const mdClass  = require('markdown-it-class')

async function mapPost(post) {
    const comments = await commentModel.count(postModel, {
        where: { id: post.id }
    })

    const likes = await likeModel.count(postModel, {
        where: { id: post.id }
    })

    const user = await post.getUser()

    return {
        ...post.dataValues,
        likes,
        comments,
        userName: user.name
    }
}

module.exports = {
    async getAll() {
        const posts = await postModel.findAll({
            order: [['createdAt', 'DESC']]
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

        const html = md.render(req.content)

        const post = await postModel.create({
            title: req.title,
            contentHtml: html,
            contentMarkdown: req.content,
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