const postService = require('../services/postService')
const {validationResult } = require('express-validator')
const ApiError = require('../apiError')

module.exports = {
    async getAll(req, res, next) {
        try {
            const posts = await postService.getAll()

            res.json(posts)
        } catch (e) {
            next(e)
        }
    },

    async get(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const post = await postService.get(req.params.id)

            res.json(post)
        } catch (e) {
            next(e)
        }
    },

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const post = await postService.create(req.user.id, req.body)

            res.status(201).json(post)
        } catch (e) {
            next(e)
        }
    },

    async delete(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors'))
            }

            const post = await postService.delete(req.params.id)

            res.json(post)
        } catch (e) {
            next(e)
        }
    },
}