const commentService = require('../services/commentService')
const tokenService = require('../services/tokenService')
const {validationResult, body } = require('express-validator')
const ApiError = require('../apiError')

module.exports = {
    async getAll(req, res, next) {
        try {
            const comments = await commentService.getAll(req.query.postId)

            res.json(comments)
        } catch (e) {
            next(e)
        }
    },

    async create(req, res, next) {
        try {
            const comment = await commentService.create(req.body.postId, req.user.id, req.body.content)

            res.status(201).json(comment)
        } catch (e) {
            next(e)
        }
    },
}